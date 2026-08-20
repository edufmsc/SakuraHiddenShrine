(() => {
  'use strict';

  const SAVE_KEY = 'sakura-hidden-shrine-v58';

  // ---------------------------------------------------------------------------
  // 命牒：可見捲動狀態＋逐字自動跟隨
  // ---------------------------------------------------------------------------
  const paper = document.getElementById('destinyPaper');
  const ink = document.getElementById('destinyInk');
  const reader = document.getElementById('destinyReader');
  const controls = document.getElementById('destinyControls');

  if (paper && ink && reader) {
    let autoFollow = true;
    let programmatic = false;
    let followFrame = 0;

    const distanceFromBottom = () => Math.max(0, paper.scrollHeight - paper.clientHeight - paper.scrollTop);

    const updateScrollableState = () => {
      paper.classList.toggle('scene-lock-v1-can-scroll', paper.scrollHeight > paper.clientHeight + 4);
    };

    const followLatestInk = () => {
      cancelAnimationFrame(followFrame);
      followFrame = requestAnimationFrame(() => {
        updateScrollableState();
        if (reader.hidden || !autoFollow) return;
        programmatic = true;
        paper.scrollTop = paper.scrollHeight;
        requestAnimationFrame(() => { programmatic = false; });
      });
    };

    paper.addEventListener('scroll', () => {
      updateScrollableState();
      if (programmatic) return;
      autoFollow = distanceFromBottom() <= 80;
    }, { passive: true });

    const readerObserver = new MutationObserver(() => {
      if (!reader.hidden) {
        autoFollow = true;
        paper.scrollTop = 0;
        updateScrollableState();
      }
    });
    readerObserver.observe(reader, { attributes: true, attributeFilter: ['hidden', 'class'] });

    const inkObserver = new MutationObserver(followLatestInk);
    inkObserver.observe(ink, {
      childList: true,
      subtree: true,
      characterData: true
    });

    window.addEventListener('resize', updateScrollableState, { passive: true });
    updateScrollableState();
  }

  // ---------------------------------------------------------------------------
  // 生辰年份相容修正：核心舊版曾把年份鎖成「18～90歲」。
  // 正式規則只有「必須成年」，不應有最高年齡。
  //
  // 為了不重寫整個主流程，本層只在玩家輸入超過舊 90 歲限制時做相容橋接：
  // 1. 畫面保留玩家真正輸入的年份。
  // 2. 舊核心暫時用同閏年型態的成年年份完成三枚銅錢流程。
  // 3. 三枚完成後，以真正生日重算 fortuneSeed 並回寫存檔，再進下一幕。
  // 一般 18～90 歲玩家完全不受影響。
  // ---------------------------------------------------------------------------
  const birthCompat = {
    realYear: null,
    month: null,
    day: null,
    surrogateYear: null,
    pendingFinalize: false
  };

  const isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  const hash = text => {
    let value = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      value ^= text.charCodeAt(index);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  };

  const getSavedState = () => {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    } catch {
      return null;
    }
  };

  const chooseSurrogateYear = realYear => {
    const nowYear = new Date().getFullYear();
    const min = nowYear - 90;
    const max = nowYear - 18;
    const wantedMod = ((realYear % 4) + 4) % 4;
    const wantedLeap = isLeapYear(realYear);
    for (let year = min; year <= max; year += 1) {
      if (((year % 4) + 4) % 4 === wantedMod && isLeapYear(year) === wantedLeap) return year;
    }
    return min;
  };

  const patchBirthVisual = () => {
    if (!birthCompat.realYear) return;
    const yearCoin = document.querySelector('.birth-coin[data-coin="year"] small');
    if (yearCoin && birthCompat.surrogateYear && yearCoin.textContent.trim() === String(birthCompat.surrogateYear)) {
      yearCoin.textContent = String(birthCompat.realYear);
    }

    document.querySelectorAll('.beat-text').forEach(node => {
      if (!birthCompat.surrogateYear) return;
      const text = node.textContent || '';
      if (text.includes(String(birthCompat.surrogateYear))) {
        node.textContent = text.replaceAll(String(birthCompat.surrogateYear), String(birthCompat.realYear));
      }
    });
  };

  // Capture phase runs before script.js form listener. Only intervene when the year is older
  // than the legacy 90-year ceiling; otherwise the original flow handles everything.
  document.addEventListener('submit', event => {
    const form = event.target.closest?.('.birth-ritual');
    if (!form || form.classList.contains('birth-ritual--complete')) return;
    const input = form.querySelector('input[name="value"]');
    const activeCoin = form.querySelector('.birth-coin.is-active')?.dataset.coin;
    if (!input || !activeCoin) return;

    const raw = Number(input.value);
    if (!Number.isInteger(raw)) return;

    if (activeCoin === 'year') {
      const nowYear = new Date().getFullYear();
      const latestAdultYear = nowYear - 18;
      if (raw > latestAdultYear) return; // native handler will show the underage error.

      const oldLegacyMin = nowYear - 90;
      if (raw < oldLegacyMin) {
        birthCompat.realYear = raw;
        birthCompat.surrogateYear = chooseSurrogateYear(raw);
        sessionStorage.setItem('sakura-v58-real-birth-year', String(raw));
        input.min = '1';
        input.value = String(birthCompat.surrogateYear);
        requestAnimationFrame(patchBirthVisual);
      }
      return;
    }

    if (!birthCompat.realYear) {
      const cached = Number(sessionStorage.getItem('sakura-v58-real-birth-year'));
      if (Number.isInteger(cached)) {
        birthCompat.realYear = cached;
        birthCompat.surrogateYear = chooseSurrogateYear(cached);
      }
    }

    if (activeCoin === 'month') birthCompat.month = raw;
    if (activeCoin === 'day') {
      birthCompat.day = raw;
      birthCompat.pendingFinalize = Boolean(birthCompat.realYear);
    }
  }, true);

  const finalizeOldBirth = () => {
    if (!birthCompat.pendingFinalize || !birthCompat.realYear || !birthCompat.month || !birthCompat.day) return;
    const saved = getSavedState();
    if (!saved?.profile) return;

    const y = birthCompat.realYear;
    const m = birthCompat.month;
    const d = birthCompat.day;
    const date = new Date(y, m - 1, d);
    const valid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age -= 1;
    if (!valid || age < 18) return;

    saved.profile.fortuneSeed = hash(`${saved.profile.alias || ''}|${y}-${m}-${d}`);
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
    birthCompat.pendingFinalize = false;
    sessionStorage.removeItem('sakura-v58-real-birth-year');
  };

  // After the native completion button saves and advances, rewrite the seed with the real
  // old birth year and reload once so the private in-memory state matches localStorage exactly.
  document.addEventListener('click', event => {
    if (!birthCompat.realYear) return;
    const button = event.target.closest?.('.choice-button--story-lead');
    if (!button || !document.querySelector('.birth-ritual--complete')) return;
    setTimeout(() => {
      finalizeOldBirth();
      if (!birthCompat.pendingFinalize) location.reload();
    }, 0);
  });

  const birthObserver = new MutationObserver(() => {
    const yearInput = document.querySelector('.birth-ritual .birth-coin[data-coin="year"].is-active')
      ?.closest('.birth-ritual')?.querySelector('input[name="value"]');
    if (yearInput) yearInput.min = '1';
    patchBirthVisual();
  });
  birthObserver.observe(document.body, { childList: true, subtree: true });

  // ---------------------------------------------------------------------------
  // 真結流程：玩家真正需要作出的最後行為是「落下第五印」。
  // 第五印落下、總命牒墨乾後，自動進黎明與「櫻隱・終」，不再要求多按一次。
  // ---------------------------------------------------------------------------
  if (controls) {
    let dawnTimer = 0;

    const syncFinalControl = () => {
      clearTimeout(dawnTimer);
      const buttons = [...controls.querySelectorAll('button')];
      const dawn = buttons.find(button => button.textContent.trim() === '走向黎明' || button.textContent.trim() === '走向黎明・櫻隱終幕');
      if (!dawn) {
        controls.classList.remove('v58-auto-ending');
        return;
      }

      controls.classList.add('v58-auto-ending');
      dawn.textContent = '黎明將至';
      dawn.classList.add('v58-dawn-ending-control');
      dawn.setAttribute('aria-label', '命牒墨乾後自動進入櫻隱終幕');
      dawn.disabled = true;

      const prompt = document.getElementById('destinyPrompt');
      if (prompt) prompt.textContent = '墨乾了。門外的天光正慢慢亮起……';

      dawnTimer = setTimeout(() => {
        dawn.disabled = false;
        dawn.click();
      }, 1800);
    };

    const controlObserver = new MutationObserver(syncFinalControl);
    controlObserver.observe(controls, { childList: true, subtree: true });
    syncFinalControl();
  }

  // ---------------------------------------------------------------------------
  // 手機功能選單
  // ---------------------------------------------------------------------------
  const app = document.getElementById('app');
  const menu = document.getElementById('menuBtn');
  const toolbarActions = document.getElementById('toolbarActions');

  if (app && menu && toolbarActions) {
    const syncMenuLabel = () => {
      const open = app.classList.contains('menu-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? '收合命館功能' : '展開命館功能');
      menu.title = open ? '收合命館功能' : '展開命館功能';
    };

    const closeMenu = ({ restoreFocus = false } = {}) => {
      if (!app.classList.contains('menu-open')) return;
      app.classList.remove('menu-open');
      syncMenuLabel();
      if (restoreFocus) menu.focus({ preventScroll: true });
    };

    menu.addEventListener('click', () => requestAnimationFrame(syncMenuLabel));

    document.addEventListener('pointerdown', event => {
      if (!app.classList.contains('menu-open')) return;
      if (menu.contains(event.target) || toolbarActions.contains(event.target)) return;
      closeMenu();
    }, { passive: true });

    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !app.classList.contains('menu-open')) return;
      event.preventDefault();
      closeMenu({ restoreFocus: true });
    });

    const mobileQuery = window.matchMedia('(max-width: 720px)');
    const handleViewportChange = event => {
      if (!event.matches) closeMenu();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);

    syncMenuLabel();
  }
})();
