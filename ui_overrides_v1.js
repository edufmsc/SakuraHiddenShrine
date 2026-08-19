(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // 命牒：可見捲動狀態＋逐字自動跟隨
  // ---------------------------------------------------------------------------
  const paper = document.getElementById('destinyPaper');
  const ink = document.getElementById('destinyInk');
  const reader = document.getElementById('destinyReader');

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

    // 玩家若主動往上讀舊內容，就暫停自動跟隨；回到底部後自動恢復。
    paper.addEventListener('scroll', () => {
      updateScrollableState();
      if (programmatic) return;
      autoFollow = distanceFromBottom() <= 80;
    }, { passive: true });

    // 每次新命牒開啟時，重新啟用自動跟隨。
    const readerObserver = new MutationObserver(() => {
      if (!reader.hidden) {
        autoFollow = true;
        paper.scrollTop = 0;
        updateScrollableState();
      }
    });
    readerObserver.observe(reader, { attributes: true, attributeFilter: ['hidden', 'class'] });

    // 逐字寫入改變內容高度時，只要玩家沒有刻意往上讀，就跟著最新一行。
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
  // 手機功能選單：補齊關閉方式與語意，不改原本版型
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

    // script.js 負責原本的按鈕開關；這裡只同步文字狀態。
    menu.addEventListener('click', () => requestAnimationFrame(syncMenuLabel));

    // 點選單外側即收合，手機單手操作更直覺。
    document.addEventListener('pointerdown', event => {
      if (!app.classList.contains('menu-open')) return;
      if (menu.contains(event.target) || toolbarActions.contains(event.target)) return;
      closeMenu();
    }, { passive: true });

    // 鍵盤／外接鍵盤可用 Esc 關閉並回到「選」。
    document.addEventListener('keydown', event => {
      if (event.key !== 'Escape' || !app.classList.contains('menu-open')) return;
      event.preventDefault();
      closeMenu({ restoreFocus: true });
    });

    // 從手機切回桌機寬度時，避免殘留 menu-open 狀態。
    const mobileQuery = window.matchMedia('(max-width: 720px)');
    const handleViewportChange = event => {
      if (!event.matches) closeMenu();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);

    syncMenuLabel();
  }
})();
