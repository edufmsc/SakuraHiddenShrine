(() => {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 720px)');

  // ---------------------------------------------------------------------------
  // 命牒：閱讀保護
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
    inkObserver.observe(ink, { childList: true, subtree: true, characterData: true });

    const handleViewportChange = () => {
      autoFollow = !mobileQuery.matches;
      updateScrollableState();
      updateFinalGate();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);
    window.addEventListener('resize', handleViewportChange, { passive: true });
    updateScrollableState();
  }

  // ---------------------------------------------------------------------------
  // 生辰相容：正式規則只有「必須成年」，不設 90 歲上限。
  // 核心目前仍以 90 年範圍驗證年份，因此舊年份只在提交瞬間轉成同閏年型態的代理年份，
  // 畫面繼續顯示玩家真正輸入的年份。重要：絕不 reload，避免 intake 被重置回首頁。
  // ---------------------------------------------------------------------------
  const birthCompat = {
    realYear: null,
    surrogateYear: null,
    month: null,
    day: null
  };

  const isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

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
    if (!birthCompat.realYear || !birthCompat.surrogateYear) return;

    const yearCoin = document.querySelector('.birth-coin[data-coin="year"] small');
    if (yearCoin && yearCoin.textContent.trim() === String(birthCompat.surrogateYear)) {
      yearCoin.textContent = String(birthCompat.realYear);
    }

    document.querySelectorAll('.beat-text').forEach(node => {
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
      if (raw > latestAdultYear || raw < 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (note) note.textContent = raw > latestAdultYear
          ? '命館只替成年人開卷；請輸入已滿 18 歲的出生年份。'
          : '請輸入有效的出生年份。';
        input.focus();
        return;
      }

      const legacyMin = nowYear - 90;
      if (raw < legacyMin) {
        birthCompat.realYear = raw;
        birthCompat.surrogateYear = chooseSurrogateYear(raw);
        sessionStorage.setItem('sakura-v58-real-birth-year', String(raw));
        input.min = '1';
        input.value = String(birthCompat.surrogateYear);
        requestAnimationFrame(patchBirthVisual);
      } else {
        birthCompat.realYear = null;
        birthCompat.surrogateYear = null;
        sessionStorage.removeItem('sakura-v58-real-birth-year');
      }
      return;
    }

    restoreBirthCache();

    if (activeCoin === 'month') {
      birthCompat.month = raw;
      return;
    }

    if (activeCoin === 'day') {
      birthCompat.day = raw;
      if (!birthCompat.realYear || !birthCompat.month) return;

      const date = new Date(birthCompat.realYear, birthCompat.month - 1, raw);
      const valid = date.getFullYear() === birthCompat.realYear
        && date.getMonth() === birthCompat.month - 1
        && date.getDate() === raw;
      if (!valid) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (note) note.textContent = '這一天不存在。前兩枚已保留，只要重新輸入正確的日期。';
        input.value = '';
        input.focus();
      }
    }
  }, true);

  // 完成生日後只清理相容快取，絕不重新整理頁面。
  document.addEventListener('click', event => {
    const button = event.target.closest?.('.choice-button--story-lead');
    if (!button || !document.querySelector('.birth-ritual--complete')) return;
    sessionStorage.removeItem('sakura-v58-real-birth-year');
    birthCompat.realYear = null;
    birthCompat.surrogateYear = null;
    birthCompat.month = null;
    birthCompat.day = null;
  }, true);

  const birthObserver = new MutationObserver(() => {
    const yearInput = document.querySelector('.birth-ritual .birth-coin[data-coin="year"].is-active')
      ?.closest('.birth-ritual')?.querySelector('input[name="value"]');
    if (yearInput) yearInput.min = '1';
    patchBirthVisual();
  });
  birthObserver.observe(document.body, { childList: true, subtree: true });

  // ---------------------------------------------------------------------------
  // 真結流程：玩家完整讀完總命牒後，才解鎖一次具有戲劇意義的終幕操作。
  // ---------------------------------------------------------------------------
  if (controls && paper) {
    const finalLabel = '收下命牒・看見黎明';

    const findFinalButton = () => [...controls.querySelectorAll('button')].find(button =>
      button.textContent.trim() === '走向黎明' ||
      button.textContent.trim() === '走向黎明・櫻隱終幕' ||
      button.classList.contains('v58-final-accept-control')
    ) || null;

    updateFinalGate = () => {
      const dawn = findFinalButton();
      if (!dawn) {
        controls.classList.remove('v58-final-reading-gate');
        return;
      }

      controls.classList.add('v58-final-reading-gate');
      dawn.classList.add('v58-final-accept-control');
      if (dawn.textContent.trim() !== finalLabel) dawn.textContent = finalLabel;

      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      const readToEnd = !scrollable || (paper.scrollHeight - paper.clientHeight - paper.scrollTop) <= 42;
      dawn.disabled = !readToEnd;
      dawn.setAttribute('aria-disabled', String(!readToEnd));
      dawn.setAttribute('aria-label', readToEnd ? '收下命牒並進入櫻隱終幕' : '請先讀到命牒最後一行');

      if (prompt) {
        prompt.hidden = false;
        const copy = readToEnd
          ? '最後一行已經讀完。這一夜只剩你自己願不願意把它收下。'
          : '先把這一卷看完。滑到最後一行後，門外的天光才會亮起。';
        if (prompt.textContent !== copy) prompt.textContent = copy;
      }
    };

    const controlObserver = new MutationObserver(() => requestAnimationFrame(updateFinalGate));
    controlObserver.observe(controls, { childList: true });
    paper.addEventListener('scroll', updateFinalGate, { passive: true });
    requestAnimationFrame(updateFinalGate);
  }

  // ---------------------------------------------------------------------------
  // 手機功能選單：單字圖章旁提供完整功能名稱。
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
      if (button) button.dataset.mobileLabel = label;
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

    mobileQuery.addEventListener?.('change', event => {
      if (!event.matches) closeMenu();
    });

    syncMenuLabel();
  }
})();
