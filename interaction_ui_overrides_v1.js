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

  const sync = () => {
    cancelAnimationFrame(syncRaf);
    syncRaf = requestAnimationFrame(() => {
      clearCustomHotspots();
      const scene = app.dataset.scene || '';

      // love.face 的舊座標尚未完成像素校正。保留三個文字選擇，先停用錯位觸點，
      // 避免玩家明明碰臉卻觸發到另一個答案。
      app.classList.toggle('v58-face-hotspot-fallback', scene === 'love.face');

      if (scene === 'finale.seal-test') {
        // 新 9:16 圖實際第五印約落在原圖 x 22–84%、y 40–68%。
        // Desktop 保留較大的中央安全框；第二個「收回手」仍由下方文字按鈕操作。
        addHotspot({
          id: 'finale-seal-hover',
          label: '把手停在第五印前',
          choiceText: '把手停在第五印前',
          tone: 'seal',
          desktop: { x: .31, y: .34, w: .43, h: .34 },
          mobile: { x: .22, y: .40, w: .62, h: .28 }
        });
      }

      if (scene === 'love.ritual') {
        // 正式圖裡唯一能穩定對應選項的劇情物件是玩家腕線。
        // 剪線與門環沒有在 Desktop/Mobile 兩張圖中同時穩定出現，因此不製造假 hotspot。
        addHotspot({
          id: 'love-ritual-wrist',
          label: '讓紅線先鬆開',
          choiceText: '先別剪',
          tone: 'thread',
          desktop: { x: .17, y: .33, w: .27, h: .34 },
          mobile: { x: .08, y: .64, w: .48, h: .28 }
        });
      }
    });
  };

  const observer = new MutationObserver(sync);
  observer.observe(app, {
    subtree: true,
    childList: true,
    attributes: true,
    attributeFilter: ['data-scene', 'data-mode', 'data-layout', 'src', 'srcset', 'style']
  });

  image.addEventListener('load', sync);
  window.addEventListener('resize', sync, { passive: true });
  mobileQuery.addEventListener?.('change', sync);
  sync();
})();
