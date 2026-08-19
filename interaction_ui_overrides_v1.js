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

  const applyFaceFallbackCopy = () => {
    const hint = choices.querySelector('.scene-interaction-hint');
    if (!hint) return;
    const fallbackText = '這一幕先用下方三個選項回答。臉頰／唇前的圖上觸點會在實機校準後再開啟。';
    if (hint.textContent !== fallbackText) hint.textContent = fallbackText;
  };

  const syncFinaleMobileProtection = () => {
    const src = String(image.getAttribute('src') || '');
    const isLandscapeReaction = [
      'final_complete_dawn.webp',
      'final_scroll_desktop.webp',
      'final_refuse_room.webp'
    ].some(name => src.endsWith(name));
    app.classList.toggle('v58-finale-landscape-reaction', mobileQuery.matches && isLandscapeReaction);
  };

  const sync = () => {
    cancelAnimationFrame(syncRaf);
    syncRaf = requestAnimationFrame(() => {
      clearCustomHotspots();
      syncFinaleMobileProtection();
      const scene = app.dataset.scene || '';

      // love.face 的舊座標已確認會偏到額頭／眼睛。
      // 在第二階段實機校準前，停用舊圖上熱區並改提示文案；三個文字選項完整保留。
      const faceFallback = scene === 'love.face';
      app.classList.toggle('v58-face-hotspot-fallback', faceFallback);
      if (faceFallback) applyFaceFallbackCopy();

      if (scene === 'finale.seal-test') {
        // 依正式 9:16 圖重新量過：第五印主圓約位於 x 27–81%、y 39–67%。
        // 圖上只提供「停在印前」；「收回手」仍保留下方文字選項，避免互相重疊。
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
        // 依 Desktop / Mobile 正式圖重新量過玩家腕線，縮小點擊區以免誤吃到祭壇或九尾手部。
        // 剪線與門環沒有在兩張圖中同時穩定出現，因此仍不製造假的圖上按鈕。
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

  // 只監看真正會改變互動狀態的來源。
  // 不監看整棵 app 的 childList / style，避免本檔新增或定位 hotspot 時反過來觸發自己。
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
