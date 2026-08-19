(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  if (!STORY?.routes) return;

  const findScene = (routeId, sceneId) => STORY.routes?.[routeId]?.scenes?.find(scene => scene?.id === sceneId) || null;
  const findFinaleScene = sceneId => STORY.finale?.scenes?.find(scene => scene?.id === sceneId) || null;
  const patchArt = (scene, patch) => {
    if (scene?.art) Object.assign(scene.art, patch);
  };

  // Pixel QA 2026-08-19：只調整實際看過圖片後確定的文字區與焦點。
  patchArt(findScene('love', 'love.silence'), {
    side: 'left-top',
    desktopFocus: '60% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findScene('love', 'love.turn'), {
    side: 'left-top',
    desktopFocus: '58% 49%',
    mobileFocus: '50% 31%'
  });

  patchArt(findScene('love', 'love.ritual'), {
    side: 'left-top',
    desktopFocus: '59% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findScene('career', 'career.borrowed'), {
    side: 'left-top',
    desktopFocus: '54% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findScene('life', 'life.turn'), {
    side: 'right-bottom',
    desktopFocus: '50% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findScene('forbidden', 'forbidden.ending'), {
    side: 'left-top',
    desktopFocus: '56% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findFinaleScene('finale.gate'), {
    side: 'right-bottom',
    desktopFocus: '50% 49%',
    mobileFocus: '50% 30%'
  });

  patchArt(findFinaleScene('finale.confession'), {
    side: 'left-top',
    desktopFocus: '52% 48%',
    mobileFocus: '50% 29%'
  });

  // 新總命牒源圖的空白紙面與舊圖位置完全不同。
  // 座標來自實際像素檢查，避免最後文字寫到九尾或背景上。
  const finalScrollBox = {
    scrollBoxDesktop: { x: .15, y: .31, w: .30, h: .38, rotate: 0 },
    scrollBoxMobile: { x: .13, y: .42, w: .30, h: .30, rotate: 0 }
  };

  patchArt(findFinaleScene('finale.ending'), finalScrollBox);
  if (STORY.totalScrollArt) Object.assign(STORY.totalScrollArt, finalScrollBox);

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    pixelQaApplied: true,
    pixelQaRevision: '2026-08-19-a',
    pixelQaChanges: [
      'love.silence.safe-left-top',
      'love.turn.safe-left-top',
      'love.ritual.safe-left-top',
      'career.borrowed.safe-left-top',
      'life.turn.safe-right-bottom',
      'forbidden.ending.safe-left-top',
      'finale.gate.safe-right-bottom',
      'finale.confession.safe-left-top',
      'finale.ending.scroll-box'
    ]
  };
})();
