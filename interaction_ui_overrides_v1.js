(() => {
  'use strict';

  const app = document.querySelector('#app');
  const image = document.querySelector('#sceneImage');
  const hotspotLayer = document.querySelector('#sceneHotspots');
  const choices = document.querySelector('#choices');
  if (!app || !image || !hotspotLayer || !choices) return;

  const mobileQuery = window.matchMedia('(max-width: 720px)');
  let syncRaf = 0;

  const parseFocus = value => {
    const match = String(value || '').match(/([0-9.]+)%\s+([0-9.]+)%/);
    if (!match) return [.5, mobileQuery.matches ? .25 : .5];
    return [Number(match[1]) / 100, Number(match[2]) / 100];
  };

  const imageMetrics = () => {
    if (!image.naturalWidth || !image.naturalHeight) return null;
    const width = app.clientWidth;
    const height = app.clientHeight;
    if (!width || !height) return null;
    const fit = app.dataset.imageFit || 'cover';
    const scale = fit === 'contain'
      ? Math.min(width / image.naturalWidth, height / image.naturalHeight)
      : Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const renderedWidth = image.naturalWidth * scale;
    const renderedHeight = image.naturalHeight * scale;
    const [focusX, focusY] = parseFocus(getComputedStyle(image).objectPosition);
    return {
      renderedWidth,
      renderedHeight,
      offsetX: -(renderedWidth - width) * focusX,
      offsetY: -(renderedHeight - height) * focusY
    };
  };

  const clearCustomHotspots = () => {
    hotspotLayer.querySelectorAll('[data-v58-hotspot]').forEach(node => node.remove());
  };

  const findChoiceButton = text => {
    const buttons = [...choices.querySelectorAll('button.choice-button')];
    return buttons.find(button => String(button.textContent || '').includes(text)) || null;
  };

  const layoutNode = (node, box) => {
    const metrics = imageMetrics();
    if (!metrics || !box) return;
    node.style.left = `${metrics.offsetX + box.x * metrics.renderedWidth}px`;
    node.style.top = `${metrics.offsetY + box.y * metrics.renderedHeight}px`;
    node.style.width = `${box.w * metrics.renderedWidth}px`;
    node.style.height = `${box.h * metrics.renderedHeight}px`;
  };

  const addHotspot = ({ id, label, choiceText, desktop, mobile, tone = 'touch' }) => {
    const target = findChoiceButton(choiceText);
    const box = mobileQuery.matches ? mobile : desktop;
    if (!target || !box) return;

    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.v58Hotspot = id;
    button.className = `v58-interaction-hotspot v58-interaction-hotspot--${tone}`;
    button.setAttribute('aria-label', label);
    button.title = label;
    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      clearCustomHotspots();
      target.click();
    });
    hotspotLayer.append(button);
    layoutNode(button, box);
  };

  const syncFaceChoiceMode = () => {
    const active = app.dataset.scene === 'love.face';
    app.classList.toggle('v58-face-choice-mode', active);
    if (!active) return;
    const hint = choices.querySelector('.scene-interaction-hint');
    const text = '她把距離留給你。直接選你此刻真正會做的第一個動作。';
    if (hint && hint.textContent !== text) hint.textContent = text;
  };

  const syncMobileReactionProtection = () => {
    const actualSrc = String(image.currentSrc || image.src || image.getAttribute('src') || '');
    const needsContain = mobileQuery.matches && [
      'final_complete_dawn.webp',
      'final_refuse_room.webp',
      'love_face_touch.webp',
      'LOVE_lips_mobile.webp'
    ].some(name => actualSrc.endsWith(name));
    app.classList.toggle('v58-finale-landscape-reaction', needsContain);
  };

  const sync = () => {
    cancelAnimationFrame(syncRaf);
    syncRaf = requestAnimationFrame(() => {
      clearCustomHotspots();
      syncFaceChoiceMode();
      syncMobileReactionProtection();
      const scene = app.dataset.scene || '';

      if (scene === 'finale.seal-test') {
        addHotspot({
          id: 'finale-seal-hover',
          label: '把手停在第五印前',
          choiceText: '把手停在第五印前',
          tone: 'seal',
          desktop: { x: .31, y: .34, w: .43, h: .34 },
          mobile: { x: .27, y: .39, w: .54, h: .28 }
        });
      }

      if (scene === 'love.ritual') {
        addHotspot({
          id: 'love-ritual-wrist',
          label: '讓紅線先鬆開',
          choiceText: '先別剪',
          tone: 'thread',
          desktop: { x: .13, y: .34, w: .30, h: .34 },
          mobile: { x: .14, y: .65, w: .42, h: .24 }
        });
      }
    });
  };

  const appObserver = new MutationObserver(sync);
  appObserver.observe(app, {
    attributes: true,
    attributeFilter: ['data-scene', 'data-mode', 'data-layout', 'data-image-fit']
  });

  const choiceObserver = new MutationObserver(sync);
  choiceObserver.observe(choices, {
    subtree: true,
    childList: true
  });

  image.addEventListener('load', sync);
  window.addEventListener('resize', sync, { passive: true });
  mobileQuery.addEventListener?.('change', sync);
  sync();
})();
