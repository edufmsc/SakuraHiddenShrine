(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  if (!STORY?.finale?.scenes) return;

  const scene = id => STORY.finale.scenes.find(item => item?.id === id) || null;
  const patchArt = (id, patch) => {
    const target = scene(id);
    if (!target?.art) return;
    Object.assign(target.art, patch);
  };

  patchArt('finale.gate', {
    desktop: 'assets/images/active/05_fifth/FINALE_GATE_01_fifth_door_desktop.webp',
    mobile: 'assets/images/active/05_fifth/FINALE_GATE_01_fifth_door_mobile.webp',
    side: 'left-top',
    mobileSide: 'bottom',
    desktopFocus: '50% 50%',
    mobileFocus: '50% 28%',
    galleryTitle: '第五門・無字之門',
    heroPresence: 'large'
  });

  // 這一幕的核心是「反證／鏡回」，不是再次展示四件命痕。
  // 恢復原本不同畫面，避免 finale.relics → finale.cross 連續重複同一張圖。
  patchArt('finale.cross', {
    desktop: 'assets/images/active/03_life/life_mirror_mismatch.webp',
    mobile: 'assets/images/active/04_forbidden/forbidden_023.webp',
    side: 'left-top',
    mobileSide: 'bottom',
    desktopFocus: '50% 50%',
    mobileFocus: '50% 18%',
    galleryTitle: '真命卷・鏡中反證',
    heroPresence: 'medium',
    needsDedicatedArt: false
  });

  patchArt('finale.confession', {
    desktop: 'assets/images/active/05_fifth/FINALE_CONFESSION_01_vulnerable_seal_desktop.webp',
    mobile: 'assets/images/active/05_fifth/FINALE_CONFESSION_01_vulnerable_seal_mobile.webp',
    side: 'right-top',
    mobileSide: 'bottom',
    desktopFocus: '50% 50%',
    mobileFocus: '50% 28%',
    galleryTitle: '真命卷・九尾坦白',
    heroPresence: 'large'
  });
})();
