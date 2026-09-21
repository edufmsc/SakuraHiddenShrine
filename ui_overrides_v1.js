(() => {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 720px)');
  const SAVE_KEY = 'sakura-hidden-shrine-v58';
  const REAL_BIRTH_KEY = 'sakura-v58-real-birth-date';

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
  // 生辰：V58 核心已直接接受所有成年年份，並以真實年月日寫入 profile.birth。
  // 舊版代理年份暫存不再需要，載入時清掉，避免殘留資料影響新局。
  // ---------------------------------------------------------------------------
  sessionStorage.removeItem('sakura-v58-real-birth-date');

  // ---------------------------------------------------------------------------
  // 真結流程：總命牒讀到最後一行後自動進入黎明。
  // 不再要求玩家額外按一次；等待期間也不讓「重看第五卷」搶先形成循環。
  // ---------------------------------------------------------------------------
  if (controls && paper) {
    const finalLabel = '收下命牒・看見黎明';
    let dawnTimer = 0;
    let scheduledButton = null;

    const findFinalButton = () => [...controls.querySelectorAll('button')].find(button =>
      button.textContent.trim() === '走向黎明' ||
      button.textContent.trim() === '走向黎明・櫻隱終幕' ||
      button.textContent.trim() === finalLabel ||
      button.classList.contains('v58-final-accept-control')
    ) || null;

    const cancelDawn = () => {
      clearTimeout(dawnTimer);
      dawnTimer = 0;
      scheduledButton = null;
    };

    updateFinalGate = () => {
      const dawn = findFinalButton();
      if (!dawn) {
        cancelDawn();
        controls.classList.remove('v58-final-reading-gate', 'v58-auto-ending');
        return;
      }

      controls.classList.add('v58-final-reading-gate');
      dawn.classList.add('v58-final-accept-control');
      if (dawn.textContent.trim() !== finalLabel) dawn.textContent = finalLabel;

      const otherButtons = [...controls.querySelectorAll('button')].filter(button => button !== dawn);
      otherButtons.forEach(button => {
        button.disabled = true;
        button.setAttribute('aria-disabled', 'true');
      });

      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      const readToEnd = !scrollable || (paper.scrollHeight - paper.clientHeight - paper.scrollTop) <= 42;

      if (!readToEnd) {
        cancelDawn();
        controls.classList.remove('v58-auto-ending');
        dawn.disabled = true;
        dawn.setAttribute('aria-disabled', 'true');
        dawn.setAttribute('aria-label', '請先讀到命牒最後一行');
        if (prompt) {
          prompt.hidden = false;
          const copy = '先把這一卷看完。滑到最後一行後，門外的天光才會亮起。';
          if (prompt.textContent !== copy) prompt.textContent = copy;
        }
        return;
      }

      dawn.disabled = false;
      dawn.setAttribute('aria-disabled', 'false');
      dawn.setAttribute('aria-label', '命牒讀完後自動進入櫻隱終幕');
      controls.classList.add('v58-auto-ending');

      if (prompt) {
        prompt.hidden = false;
        const copy = '最後一行已經讀完。墨正在乾，門外的天光正慢慢亮起……';
        if (prompt.textContent !== copy) prompt.textContent = copy;
      }

      if (scheduledButton === dawn) return;
      cancelDawn();
      scheduledButton = dawn;
      dawnTimer = setTimeout(() => {
        const target = scheduledButton;
        scheduledButton = null;
        dawnTimer = 0;
        if (!target || !target.isConnected || target.disabled) return;
        target.click();
      }, 1800);
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
