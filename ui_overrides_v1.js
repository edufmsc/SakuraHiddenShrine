(() => {
  'use strict';

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
  // 最終命牒：黎明不是隱藏彩蛋，而是正式終幕。
  // 將原本「走向黎明」改成更清楚的「走向黎明・櫻隱終幕」。
  // ---------------------------------------------------------------------------
  if (controls) {
    const syncFinalControl = () => {
      [...controls.querySelectorAll('button')].forEach(button => {
        if (button.textContent.trim() === '走向黎明') {
          button.textContent = '走向黎明・櫻隱終幕';
          button.classList.add('v58-dawn-ending-control');
          button.setAttribute('aria-label', '走向黎明，進入櫻隱終幕');
          button.title = '進入真正結局：天亮了・櫻隱終';
        }
      });
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
