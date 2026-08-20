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
  // 生辰年份相容修正：舊核心把年份鎖成 18～90 歲；正式規則只有「必須成年」。
  // 超過 90 歲時，畫面保留真實年份，舊核心暫用同閏年型態的成年年份跑完銅錢流程；
  // 完成後再用真實生日重算 fortuneSeed 並重新載入下一幕。
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

  const restoreBirthCache = () => {
    if (birthCompat.realYear) return;
    const cached = Number(sessionStorage.getItem('sakura-v58-real-birth-year'));
    if (!Number.isInteger(cached)) return;
    birthCompat.realYear = cached;
    birthCompat.surrogateYear = chooseSurrogateYear(cached);
  };

  const patchBirthVisual = () => {
    restoreBirthCache();
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
      if (raw > latestAdultYear) return;

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

    restoreBirthCache();
    if (activeCoin === 'month') birthCompat.month = raw;
    if (activeCoin === 'day') {
      birthCompat.day = raw;
      birthCompat.pendingFinalize = Boolean(birthCompat.realYear);
    }
  }, true);

  const finalizeOldBirth = () => {
    if (!birthCompat.pendingFinalize || !birthCompat.realYear || !birthCompat.month || !birthCompat.day) return false;
    const saved = getSavedState();
    if (!saved?.profile) return false;

    const y = birthCompat.realYear;
    const m = birthCompat.month;
    const d = birthCompat.day;
    const date = new Date(y, m - 1, d);
    const valid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
    const today = new Date();
    let age = today.getFullYear() - y;
    if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age -= 1;
    if (!valid || age < 18) return false;

    saved.profile.fortuneSeed = hash(`${saved.profile.alias || ''}|${y}-${m}-${d}`);
    localStorage.setItem(SAVE_KEY, JSON.stringify(saved));
    birthCompat.pendingFinalize = false;
    sessionStorage.removeItem('sakura-v58-real-birth-year');
    return true;
  };

  // Capture the completion click while the birth-complete DOM still exists.
  // The core handler then advances/saves; our zero-delay task rewrites the exact real-year seed
  // and reloads so the in-memory state also matches the corrected localStorage.
  document.addEventListener('click', event => {
    restoreBirthCache();
    if (!birthCompat.realYear || !birthCompat.pendingFinalize) return;
    const button = event.target.closest?.('.choice-button--story-lead');
    if (!button || !document.querySelector('.birth-ritual--complete')) return;
    setTimeout(() => {
      if (finalizeOldBirth()) location.reload();
    }, 0);
  }, true);

  const birthObserver = new MutationObserver(() => {
    const yearInput = document.querySelector('.birth-ritual .birth-coin[data-coin="year"].is-active')
      ?.closest('.birth-ritual')?.querySelector('input[name="value"]');
    if (yearInput) yearInput.min = '1';
    patchBirthVisual();
  });
  birthObserver.observe(document.body, { childList: true, subtree: true });

  // ---------------------------------------------------------------------------
  // 真結流程：真正的最後操作是「落下第五印」。
  // 墨乾後自動進入黎明與「櫻隱・終」，不再要求額外點擊。
  // ---------------------------------------------------------------------------
  if (controls) {
    let dawnTimer = 0;
    let scheduledButton = null;

    const syncFinalControl = () => {
      const buttons = [...controls.querySelectorAll('button')];
      const dawn = buttons.find(button =>
        button.classList.contains('v58-dawn-ending-control') ||
        button.textContent.trim() === '走向黎明' ||
        button.textContent.trim() === '走向黎明・櫻隱終幕'
      );

      if (!dawn) {
        clearTimeout(dawnTimer);
        dawnTimer = 0;
        scheduledButton = null;
        controls.classList.remove('v58-auto-ending');
        return;
      }

      controls.classList.add('v58-auto-ending');
      dawn.classList.add('v58-dawn-ending-control');
      dawn.setAttribute('aria-label', '命牒墨乾後自動進入櫻隱終幕');

      const prompt = document.getElementById('destinyPrompt');
      if (prompt) prompt.textContent = '墨乾了。門外的天光正慢慢亮起……';

      if (scheduledButton === dawn && dawnTimer) return;
      clearTimeout(dawnTimer);
      scheduledButton = dawn;
      dawnTimer = setTimeout(() => {
        dawnTimer = 0;
        if (!document.body.contains(dawn)) return;
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
