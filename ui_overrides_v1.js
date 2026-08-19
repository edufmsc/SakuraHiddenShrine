(() => {
  'use strict';

  const paper = document.getElementById('destinyPaper');
  const ink = document.getElementById('destinyInk');
  const reader = document.getElementById('destinyReader');
  if (!paper || !ink || !reader) return;

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

  // 逐字寫入會改變 text node；只要玩家沒有刻意往上讀，就跟著最新一行。
  const inkObserver = new MutationObserver(followLatestInk);
  inkObserver.observe(ink, {
    childList: true,
    subtree: true,
    characterData: true
  });

  window.addEventListener('resize', updateScrollableState, { passive: true });
  updateScrollableState();
})();
