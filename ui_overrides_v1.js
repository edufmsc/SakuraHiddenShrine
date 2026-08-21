(() => {
  'use strict';

  const SAVE_KEY = 'sakura-hidden-shrine-v58';
  const mobileQuery = window.matchMedia('(max-width: 720px)');

  // ---------------------------------------------------------------------------
  // 命牒：可見捲動狀態＋閱讀保護
  // Desktop 可在玩家仍靠近底部時跟隨新墨跡；Mobile 預設不自動把玩家拖走，
  // 讓標題與前段文字能照自己的速度閱讀。
  // ---------------------------------------------------------------------------
  const paper = document.getElementById('destinyPaper');
  const ink = document.getElementById('destinyInk');
  const reader = document.getElementById('destinyReader');
  const controls = document.getElementById('destinyControls');
  const prompt = document.getElementById('destinyPrompt');

  let updateFinalGate = () => {};

  if (paper && ink && reader) {
    let autoFollow = !mobileQuery.matches;
    let programmatic = false;
    let followFrame = 0;

    const distanceFromBottom = () => Math.max(0, paper.scrollHeight - paper.clientHeight - paper.scrollTop);

    const updateScrollableState = () => {
      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      paper.classList.toggle('scene-lock-v1-can-scroll', scrollable);
      return scrollable;
    };

    const followLatestInk = () => {
      cancelAnimationFrame(followFrame);
      followFrame = requestAnimationFrame(() => {
        updateScrollableState();
        updateFinalGate();
        if (reader.hidden || !autoFollow || mobileQuery.matches) return;
        programmatic = true;
        paper.scrollTop = paper.scrollHeight;
        requestAnimationFrame(() => { programmatic = false; });
      });
    };

    paper.addEventListener('scroll', () => {
      updateScrollableState();
      if (!programmatic) autoFollow = !mobileQuery.matches && distanceFromBottom() <= 80;
      updateFinalGate();
    }, { passive: true });

    const readerObserver = new MutationObserver(() => {
      if (!reader.hidden) {
        autoFollow = !mobileQuery.matches;
        paper.scrollTop = 0;
        updateScrollableState();
        requestAnimationFrame(updateFinalGate);
      }
    });
    readerObserver.observe(reader, { attributes: true, attributeFilter: ['hidden', 'class'] });

    const inkObserver = new MutationObserver(followLatestInk);
    inkObserver.observe(ink, {
      childList: true,
      subtree: true,
      characterData: true
    });

    const handleViewportChange = () => {
      autoFollow = !mobileQuery.matches;
      updateScrollableState();
      updateFinalGate();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);
    window.addEventListener('resize', () => {
      updateScrollableState();
      updateFinalGate();
    }, { passive: true });
    updateScrollableState();
  }

  // ---------------------------------------------------------------------------
  // 生辰年份相容修正：舊核心把年份鎖成 18～90 歲；正式規則只有「必須成年」。
  // 另外攔下不存在的日期，錯一天只重填「日」，不把已輸入的年／月一起清掉。
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

  const readCoinValue = (form, coin) => {
    const text = form.querySelector(`.birth-coin[data-coin="${coin}"] small`)?.textContent?.trim();
    const value = Number(text);
    return Number.isInteger(value) ? value : null;
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
    const note = form.querySelector('.form-note');
    if (!input || !activeCoin) return;

    const raw = Number(input.value);
    if (!Number.isInteger(raw)) return;

    if (activeCoin === 'year') {
      const nowYear = new Date().getFullYear();
      const latestAdultYear = nowYear - 18;
      if (raw > latestAdultYear) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (note) note.textContent = '命館只替成年人開卷；請輸入已滿 18 歲的出生年份。';
        input.focus();
        return;
      }

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
    if (activeCoin === 'month') {
      birthCompat.month = raw;
      return;
    }

    if (activeCoin === 'day') {
      const realYear = birthCompat.realYear || readCoinValue(form, 'year');
      const month = birthCompat.month || readCoinValue(form, 'month');
      if (realYear && month) {
        const date = new Date(realYear, month - 1, raw);
        const valid = date.getFullYear() === realYear && date.getMonth() === month - 1 && date.getDate() === raw;
        if (!valid) {
          event.preventDefault();
          event.stopImmediatePropagation();
          if (note) note.textContent = '這一天不存在。前兩枚已經保留，只要重新輸入正確的日期。';
          input.value = '';
          input.focus();
          return;
        }
      }
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
  // 真結流程：不再倒數自動跳劇終。
  // 玩家先完整讀完總命牒；若命牒可捲動，只有滑到最後一段後終幕按鈕才會解鎖。
  // 最後一次操作是「收下命牒・看見黎明」，點下後才進「天亮了。／櫻隱・終」。
  // ---------------------------------------------------------------------------
  if (controls && paper) {
    let finalButton = null;

    const findFinalButton = () => [...controls.querySelectorAll('button')].find(button =>
      button.textContent.trim() === '走向黎明' ||
      button.textContent.trim() === '走向黎明・櫻隱終幕' ||
      button.classList.contains('v58-final-accept-control')
    ) || null;

    updateFinalGate = () => {
      const dawn = findFinalButton();
      if (!dawn) {
        finalButton = null;
        controls.classList.remove('v58-final-reading-gate');
        return;
      }

      finalButton = dawn;
      controls.classList.add('v58-final-reading-gate');
      dawn.classList.add('v58-final-accept-control');
      dawn.textContent = '收下命牒・看見黎明';

      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      const readToEnd = !scrollable || (paper.scrollHeight - paper.clientHeight - paper.scrollTop) <= 42;
      dawn.disabled = !readToEnd;
      dawn.setAttribute('aria-disabled', String(!readToEnd));
      dawn.setAttribute('aria-label', readToEnd ? '收下命牒並進入櫻隱終幕' : '請先讀到命牒最後一行');

      if (prompt) {
        prompt.hidden = false;
        prompt.textContent = readToEnd
          ? '最後一行已經讀完。這一夜只剩你自己願不願意把它收下。'
          : '先把這一卷看完。滑到最後一行後，門外的天光才會亮起。';
      }
    };

    const controlObserver = new MutationObserver(() => requestAnimationFrame(updateFinalGate));
    controlObserver.observe(controls, { childList: true, subtree: true });
    paper.addEventListener('scroll', updateFinalGate, { passive: true });
    requestAnimationFrame(updateFinalGate);
  }

  // ---------------------------------------------------------------------------
  // 手機功能選單：除了單字圖章，也提供完整功能名稱，第一次玩的玩家不用猜。
  // ---------------------------------------------------------------------------
  const app = document.getElementById('app');
  const menu = document.getElementById('menuBtn');
  const toolbarActions = document.getElementById('toolbarActions');

  if (app && menu && toolbarActions) {
    const labels = {
      soundBtn: '音樂',
      sceneryBtn: '只看場景',
      galleryBtn: '藏景',
      reportBtn: '命牒',
      homeBtn: '回四門',
      resetBtn: '重新起盤'
    };

    Object.entries(labels).forEach(([id, label]) => {
      const button = document.getElementById(id);
      if (!button) return;
      button.dataset.mobileLabel = label;
    });

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

    const handleViewportChange = event => {
      if (!event.matches) closeMenu();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);

    syncMenuLabel();
  }
})();
