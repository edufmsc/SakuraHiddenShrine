(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  if (!STORY?.routes) return;

  const findScene = (routeId, sceneId) => STORY.routes?.[routeId]?.scenes?.find(scene => scene?.id === sceneId) || null;
  const findFinaleScene = sceneId => STORY.finale?.scenes?.find(scene => scene?.id === sceneId) || null;
  const patchArt = (scene, patch) => {
    if (scene?.art) Object.assign(scene.art, patch);
  };

  // Pixel QA：只調整實際人工驗收後確認的文字安全區與焦點。
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

  patchArt(findScene('love', 'love.evidence'), {
    side: 'right-top',
    desktopFocus: '50% 49%',
    mobileFocus: '50% 28%'
  });

  // 業卷借名：人物與棋盤主事件在左／中央，文字固定右上。
  patchArt(findScene('career', 'career.borrowed'), {
    side: 'right-top',
    desktopFocus: '52% 49%',
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

  // 天亮以前：人物在左，正式文字固定右下。
  patchArt(findFinaleScene('finale.choice'), {
    side: 'right-bottom',
    desktopFocus: '48% 52%',
    mobileFocus: '50% 31%'
  });

  const finalScrollBox = {
    scrollBoxDesktop: { x: .15, y: .31, w: .30, h: .38, rotate: 0 },
    scrollBoxMobile: { x: .13, y: .42, w: .30, h: .30, rotate: 0 }
  };

  patchArt(findFinaleScene('finale.ending'), finalScrollBox);
  if (STORY.totalScrollArt) Object.assign(STORY.totalScrollArt, finalScrollBox);

  STORY.sceneLockV1 = {
    ...(STORY.sceneLockV1 || {}),
    pixelQaApplied: true,
    pixelQaRevision: '2026-08-20-b',
    pixelQaChanges: [
      'love.silence.safe-left-top',
      'love.turn.safe-left-top',
      'love.ritual.safe-left-top',
      'love.evidence.safe-right-top',
      'career.borrowed.safe-right-top',
      'life.turn.safe-right-bottom',
      'forbidden.ending.safe-left-top',
      'finale.gate.safe-right-bottom',
      'finale.confession.safe-left-top',
      'finale.choice.safe-right-bottom',
      'finale.ending.scroll-box'
    ]
  };
})();
