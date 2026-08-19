(() => {
  'use strict';

  const STORY = window.SHRINE_STORY;
  const CONFIG = window.SHRINE_CONFIG || {};
  const SAVE_KEY = 'sakura-hidden-shrine-v58';
  const LEGACY_SAVE_KEYS = ['sakura-hidden-shrine-v57', 'sakura-hidden-shrine-v56', 'sakura-hidden-shrine-v55', 'sakura-hidden-shrine-v54', 'sakura-hidden-shrine-v53', 'sakura-hidden-shrine-v52', 'sakura-hidden-shrine-v51', 'sakura-hidden-shrine-v50', 'sakura-hidden-shrine-v49', 'sakura-hidden-shrine-v48', 'sakura-hidden-shrine-v47', 'sakura-hidden-shrine-v46', 'sakura-hidden-shrine-v45'];
  const nowYear = new Date().getFullYear();
  const behaviorKeys = ['approach', 'retreat', 'trust', 'challenge', 'wait', 'agency', 'hold', 'change', 'restraint', 'control'];
  const periodLabels = { week: '七天內', month: '一個月內', season: '三個月內' };
  const periodShort = { week: '七日', month: '一月', season: '三月' };
  const omenLabels = { azure: '蒼燄', violet: '幽燄', crimson: '血燄' };
  const destinyMarks = [
    { name: '水鏡命種', glyph: '澄', line: '先感覺，再替感覺尋找證據。' },
    { name: '櫻木命種', glyph: '生', line: '擅長讓關係與事情延續，也容易多撐一段。' },
    { name: '狐火命種', glyph: '燄', line: '能在強烈裡迅速決定，必須留意退潮後還剩什麼。' },
    { name: '玄金命種', glyph: '刃', line: '會追問規則與真相，答案清楚後要記得落刀。' },
    { name: '門土命種', glyph: '守', line: '能承接、能守住，真正的課題是知道何時關門。' }
  ];
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];

  const el = {
    app: $('#app'), image: $('#sceneImage'), mobile: $('#mobileSource'), panel: $('#storyPanel'), scroll: $('.panel-scroll'),
    kicker: $('#kicker'), title: $('#sceneTitle'), dialogue: $('#dialogue'), choices: $('#choices'), next: $('#continueBtn'),
    loading: $('#loading'), petals: $('#petals'), sound: $('#soundBtn'), scenery: $('#sceneryBtn'), restore: $('#restoreTextBtn'),
    gallery: $('#galleryBtn'), report: $('#reportBtn'), home: $('#homeBtn'), reset: $('#resetBtn'), brand: $('#brandBtn'), toast: $('#saveToast'),
    doors: $('#doorStage'), finalDoor: $('#finalDoorBtn'), whisperTitle: $('#doorWhisperTitle'), whisperText: $('#doorWhisperText'),
    confirm: $('#confirmDialog'), galleryDialog: $('#galleryDialog'), galleryGrid: $('#galleryGrid'), galleryEmpty: $('#galleryEmpty'),
    galleryClose: $('#galleryCloseBtn'), viewer: $('#galleryViewer'), viewerImage: $('#viewerImage'), viewerCaption: $('#viewerCaption'),
    viewerClose: $('#viewerCloseBtn'), viewerPrev: $('#viewerPrevBtn'), viewerNext: $('#viewerNextBtn'),
    menu: $('#menuBtn'), toolbarActions: $('#toolbarActions'), scrollOverlay: $('#scrollOverlay'), scrollPaper: $('#scrollPaper'), hotspots: $('#sceneHotspots'),
    destinyReader: $('#destinyReader'), destinyPaper: $('#destinyPaper'), destinyGlyph: $('#destinyGlyph'), destinyEyebrow: $('#destinyEyebrow'),
    destinyTitle: $('#destinyTitle'), destinyInk: $('#destinyInk'), destinyPrompt: $('#destinyPrompt'), destinyControls: $('#destinyControls'),
    destinyScribeImage: $('#destinyScribeImage'), destinyScribeCaption: $('#destinyScribeCaption')
  };

  const audio = new Audio();
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.34;
  let audioSource = '';
  let audioUnlocked = false;
  let audioTimer = 0;
  let nextAction = null;
  let loadTimer = 0;
  let toastTimer = 0;
  let galleryItems = [];
  let galleryIndex = 0;
  let reportView = 'latest';
  let reportPrivate = false;
  let memoryReturn = null;
  let birthDraft = { stage: 'year', year: null, month: null, day: null, echo: null, finished: false };
  let scrollResizeTimer = 0;
  let currentArtData = null;
  let autoAdvanceTimer = 0;
  let dialogueAdvance = null;
  let destinyWriteTimer = 0;
  let destinySequenceNonce = 0;

  function routeFresh(route) {
    return {
      started: false, completed: false, playthroughs: 0, result: null,
      scene: 0, beat: 0, phase: 'story', reaction: [], reactionArt: null, carryReaction: false, choices: [], scratchDone: {},
      reportOpened: false, scrollStep: 0, scrollConfirmed: null, scrollScratchDone: false,
      scores: Object.fromEntries(route.scoreKeys.map(key => [key, 0]))
    };
  }

  function freshState() {
    return {
      version: STORY.version,
      started: false,
      ageAccepted: false,
      mode: 'cover',
      intakeScene: 0,
      route: null,
      profile: { alias: '', fortuneSeed: 0, period: 'month', omen: null },
      completedOrder: [],
      flags: {},
      sound: true,
      behavior: Object.fromEntries(behaviorKeys.map(key => [key, 0])),
      seen: [], reportLast: null, decisionTrail: [],
      routes: Object.fromEntries(STORY.routeOrder.map(id => [id, routeFresh(STORY.routes[id])])),
      finale: { unlocked: false, completed: false, scene: 0, beat: 0, phase: 'story', reaction: [], reactionArt: null, carryReaction: false, scratchDone: {}, choice: null, ending: null, reportOpened: false, scrollStep: 0, scrollConfirmed: null, scrollScratchDone: false }
    };
  }

  function loadState() {
    const base = freshState();
    try {
      const raw = localStorage.getItem(SAVE_KEY) || LEGACY_SAVE_KEYS.map(key => localStorage.getItem(key)).find(Boolean);
      const saved = JSON.parse(raw);
      if (!saved || ![45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, STORY.version].includes(saved.version)) return base;
      saved.version = STORY.version;
      const loaded = { ...base, ...saved };
      loaded.profile = { ...base.profile, ...(saved.profile || {}) };
      loaded.behavior = { ...base.behavior, ...(saved.behavior || {}) };
      loaded.flags = { ...(saved.flags || {}) };
      loaded.seen = Array.isArray(saved.seen) ? saved.seen.filter(item => item && item.src).slice(-180) : [];
      loaded.decisionTrail = Array.isArray(saved.decisionTrail) ? saved.decisionTrail.slice(-240) : [];
      loaded.completedOrder = Array.isArray(saved.completedOrder) ? saved.completedOrder.filter(id => STORY.routes[id]) : [];
      loaded.routes = base.routes;
      STORY.routeOrder.forEach(id => {
        const prior = saved.routes?.[id] || {};
        loaded.routes[id] = { ...routeFresh(STORY.routes[id]), ...prior };
        loaded.routes[id].scores = { ...routeFresh(STORY.routes[id]).scores, ...(prior.scores || {}) };
        loaded.routes[id].choices = Array.isArray(prior.choices) ? prior.choices : [];
        loaded.routes[id].scratchDone = { ...(prior.scratchDone || {}) };
      });
      loaded.finale = { ...base.finale, ...(saved.finale || {}) };
      loaded.finale.scratchDone = { ...(saved.finale?.scratchDone || {}) };
      loaded.finale.choice = normalizeFinalChoice(loaded.finale.choice);
      loaded.finale.ending = normalizeFinalChoice(loaded.finale.ending);
      if (!loaded.started) loaded.mode = 'cover';
      if (loaded.mode === 'route' && !STORY.routes[loaded.route]) loaded.mode = 'hub';
      loaded.finale.unlocked = STORY.routeOrder.filter(id => loaded.routes?.[id]?.completed).length === STORY.routeOrder.length;
      return loaded;
    } catch (error) {
      console.warn('命痕讀取失敗，改以新局開啟。', error);
      return base;
    }
  }

  let state = loadState();

  const clamp = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));
  const completedCountFor = target => STORY.routeOrder.filter(id => target.routes?.[id]?.completed).length;
  const completedCount = () => completedCountFor(state);

  function save(show = false) {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(state));
      if (show) showToast('命痕已留下');
    } catch {
      showToast('此瀏覽器無法保存命痕');
    }
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    el.toast.textContent = message;
    el.toast.hidden = false;
    toastTimer = setTimeout(() => { el.toast.hidden = true; }, 1800);
  }

  function palette(id = 'none') {
    const colors = STORY.palettes[id] || STORY.palettes.none;
    document.documentElement.style.setProperty('--accent', colors.accent);
    document.documentElement.style.setProperty('--accent-rgb', colors.rgb);
    el.app.dataset.route = id;
  }

  function unlockArt(artData, fallbackTitle = '') {
    if (!artData?.desktop) return;
    const item = {
      src: artData.desktop,
      mobile: artData.mobile || artData.desktop,
      title: artData.galleryTitle || fallbackTitle || '命館藏景',
      route: state.route || (state.mode === 'finale' ? 'finale' : state.mode)
    };
    const index = state.seen.findIndex(seen => seen.src === item.src);
    if (index < 0) state.seen.push(item);
    else state.seen[index] = { ...state.seen[index], ...item };
    save(false);
  }

  function setArt(artData, alt = '') {
    if (!artData) return;
    currentArtData = artData;
    el.app.dataset.imageFit = artData.fit || 'cover';
    const safeZones = ['left', 'left-top', 'left-center', 'left-bottom', 'right', 'right-top', 'right-center', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right'];
    const side = safeZones.includes(artData.side) ? artData.side : 'left';
    const mobileSide = ['top', 'bottom'].includes(artData.mobileSide) ? artData.mobileSide : 'bottom';
    el.app.dataset.safe = side;
    el.app.dataset.mobileSafe = mobileSide;
    el.app.dataset.hero = artData.heroPresence || 'medium';
    el.panel.className = `story-panel safe-${side}`;
    el.app.style.setProperty('--desktop-focus', artData.desktopFocus || '50% 50%');
    el.app.style.setProperty('--mobile-focus', artData.mobileFocus || '50% 25%');
    el.mobile.srcset = artData.mobile || artData.desktop;
    el.image.alt = alt || artData.galleryTitle || '';
    unlockArt(artData, alt);
    if (el.image.getAttribute('src') !== artData.desktop) {
      clearTimeout(loadTimer);
      loadTimer = setTimeout(() => { el.loading.hidden = false; }, 180);
      el.image.onload = () => { clearTimeout(loadTimer); el.loading.hidden = true; requestAnimationFrame(updateScrollPaperPosition); };
      el.image.onerror = () => {
        clearTimeout(loadTimer);
        el.loading.hidden = true;
        console.warn(`缺少圖片：${artData.desktop}`);
      };
      el.image.src = artData.desktop;
    }
    el.app.classList.remove('scene-enter');
    requestAnimationFrame(updateScrollPaperPosition);
    requestAnimationFrame(() => el.app.classList.add('scene-enter'));
  }

  function frame({ mode, route = 'none', art: artData, kicker = '', title = '', layout = 'dialogue', sceneId = '' }) {
    stopScratch();
    hideScrollOverlay();
    hideDestinyReader();
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = 0;
    dialogueAdvance = null;
    clearSceneHotspots();
    el.app.querySelector('.final-coda')?.remove();
    el.app.classList.remove('final-still');
    el.app.dataset.mode = mode;
    el.app.dataset.layout = layout;
    el.app.dataset.scene = sceneId;
    el.app.dataset.beatPage = '0';
    el.app.classList.toggle('hub-mode', mode === 'hub');
    el.app.classList.remove('menu-open');
    el.menu?.setAttribute('aria-expanded', 'false');
    palette(route);
    setArt(artData, title);
    el.kicker.textContent = kicker;
    el.title.textContent = title;
    el.dialogue.onclick = null;
    el.dialogue.replaceChildren();
    el.choices.replaceChildren();
    el.choices.className = `choices choices--${layout}`;
    hideNext();
    el.panel.hidden = false;
    el.doors.hidden = true;
    el.report.hidden = availableReports().length === 0;
    el.home.hidden = ['cover', 'intake'].includes(mode);
    el.scroll.scrollTop = 0;
  }

  function speakerName(id) {
    if (id === 'player') return state.profile.alias ? `你・${state.profile.alias}` : '你';
    return STORY.speakers[id] || '';
  }

  function topBehavior() {
    const entries = Object.entries(state.behavior);
    const max = Math.max(...entries.map(([, value]) => Number(value || 0)));
    const tied = entries.filter(([, value]) => Number(value || 0) === max).map(([key]) => key);
    if (tied.length <= 1) return tied[0] || 'agency';
    for (let index = state.decisionTrail.length - 1; index >= 0; index -= 1) {
      const keys = state.decisionTrail[index]?.behavior || [];
      const hit = keys.find(key => tied.includes(key));
      if (hit) return hit;
    }
    return behaviorKeys.find(key => tied.includes(key)) || tied[0] || 'agency';
  }

  function echoLine() {
    return ({
      wait: '你在不同問題裡做了同一件事：先等別人決定，再把等待解釋成體貼。',
      hold: '你總在事情快掉下去時伸手。久了，所有人都忘了那原本不是你的東西。',
      approach: '你並不怕靠近。你怕的是靠近後，發現只有自己往前。',
      retreat: '你很會在受傷前退開。可有些答案，也因此永遠追不上你。',
      challenge: '你一直逼答案說清楚。真正危險的是：清楚以後，你敢不敢照著做。',
      agency: '四卷都在同一刻亮起：你開始把決定從別人與命運手裡拿回來。',
      change: '你今晚不是只想知道。你其實準備停止一個每次都讓你回到原地的動作。',
      trust: '你願意把手交出去，但正在學：信任與替別人承擔，從來不是同一件事。',
      restraint: '你忍住了幾次立即反應。現實因此第一次有機會自己說話。',
      control: '你想先知道全部才肯動。可安全也可以來自：你知道自己隨時能停。'
    })[topBehavior()] || '四個答案正在指出同一個動作。';
  }

  function relicSummary() {
    return STORY.routeOrder.map(id => {
      const route = STORY.routes[id];
      const ritual = state.flags[`${id}Ritual`];
      const ritualName = route.ritualNames?.[ritual] || route.relic;
      const result = route.results[state.routes[id]?.result]?.title || '未判';
      return `${route.glyph}卷留下「${ritualName}」，判名「${result}」`;
    }).join('；') + '。';
  }

  function replaceTokens(value) {
    return String(value ?? '')
      .replaceAll('{{name}}', state.profile.alias || '你')
      .replaceAll('{{period}}', periodLabels[state.profile.period] || '近期')
      .replaceAll('{{omen}}', omenLabels[state.profile.omen] || '狐火')
      .replaceAll('{{echo}}', echoLine())
      .replaceAll('{{relics}}', relicSummary());
  }

  function addBeat(data, order = 0) {
    if (!data) return;
    if (typeof data === 'string') data = { speaker: 'fox', text: data };
    const speakerId = String(data.speaker || 'narrator').replace(/[^a-z-]/gi, '') || 'narrator';
    const renderedText = replaceTokens(data.text);
    const previous = el.dialogue.lastElementChild;
    if (previous?.dataset?.speaker === speakerId) {
      const priorText = previous.querySelector('.beat-text');
      if (priorText) priorText.textContent = `${priorText.textContent} ${renderedText}`.trim();
      return previous;
    }
    const node = document.createElement('article');
    node.className = `beat beat--${speakerId}`;
    node.dataset.speaker = speakerId;
    node.style.setProperty('--beat-order', String(Math.max(0, Number(order) || 0)));
    const name = speakerName(data.speaker);
    if (name) {
      const tag = document.createElement('span');
      tag.className = 'speaker';
      tag.textContent = name;
      node.append(tag);
    }
    const text = document.createElement('span');
    text.className = 'beat-text';
    text.textContent = renderedText;
    node.append(text);
    el.dialogue.append(node);
    return node;
  }


  const scrollBoxDesktop = { x: .598, y: .525, w: .225, h: .265, rotate: 4 };
  const scrollBoxMobile = { x: .338, y: .342, w: .355, h: .168, rotate: 1 };
  const activeHotspots = [];

  function parseFocus(value, fallbackX = .5, fallbackY = .5) {
    const parts = String(value || '').match(/([0-9.]+)%\s+([0-9.]+)%/);
    return parts ? [Number(parts[1]) / 100, Number(parts[2]) / 100] : [fallbackX, fallbackY];
  }

  function renderedImageMetrics() {
    if (!el.image.naturalWidth || !el.image.naturalHeight) return null;
    const mobile = matchMedia('(max-width: 720px)').matches;
    const width = el.app.clientWidth;
    const height = el.app.clientHeight;
    const naturalWidth = el.image.naturalWidth;
    const naturalHeight = el.image.naturalHeight;
    const fit = currentArtData?.fit || 'cover';
    const scale = fit === 'contain' ? Math.min(width / naturalWidth, height / naturalHeight) : Math.max(width / naturalWidth, height / naturalHeight);
    const renderedWidth = naturalWidth * scale;
    const renderedHeight = naturalHeight * scale;
    const [focusX, focusY] = parseFocus(getComputedStyle(el.image).objectPosition, .5, mobile ? .14 : .16);
    const offsetX = -(renderedWidth - width) * focusX;
    const offsetY = -(renderedHeight - height) * focusY;
    return { mobile, renderedWidth, renderedHeight, offsetX, offsetY };
  }

  function layoutSceneHotspots() {
    if (!activeHotspots.length) return;
    const metrics = renderedImageMetrics();
    if (!metrics) return;
    activeHotspots.forEach(({ node, x, y, w, h }) => {
      node.style.left = `${metrics.offsetX + x * metrics.renderedWidth}px`;
      node.style.top = `${metrics.offsetY + y * metrics.renderedHeight}px`;
      node.style.width = `${w * metrics.renderedWidth}px`;
      node.style.height = `${h * metrics.renderedHeight}px`;
    });
  }

  function updateScrollPaperPosition() {
    if (!el.scrollOverlay || el.scrollOverlay.hidden) {
      layoutSceneHotspots();
      return;
    }
    const metrics = renderedImageMetrics();
    if (!metrics) return;
    const box = (metrics.mobile ? currentArtData?.scrollBoxMobile : currentArtData?.scrollBoxDesktop) || (metrics.mobile ? scrollBoxMobile : scrollBoxDesktop);
    el.scrollOverlay.style.left = `${metrics.offsetX + box.x * metrics.renderedWidth}px`;
    el.scrollOverlay.style.top = `${metrics.offsetY + box.y * metrics.renderedHeight}px`;
    el.scrollOverlay.style.width = `${box.w * metrics.renderedWidth}px`;
    el.scrollOverlay.style.height = `${box.h * metrics.renderedHeight}px`;
    el.scrollOverlay.style.transform = `rotate(${box.rotate}deg)`;
    layoutSceneHotspots();
  }

  function clearSceneHotspots() {
    activeHotspots.length = 0;
    el.hotspots?.replaceChildren();
  }

  function hideScrollOverlay() {
    if (!el.scrollOverlay) return;
    el.scrollOverlay.hidden = true;
    el.scrollOverlay.className = 'scroll-overlay';
    el.scrollPaper.replaceChildren();
    el.scrollOverlay.removeAttribute('style');
  }

  function showScrollOverlay(data, items, options = {}) {
    if (!el.scrollOverlay) return null;
    el.scrollOverlay.hidden = false;
    el.scrollOverlay.className = `scroll-overlay${options.total ? ' scroll-overlay--total' : ''}${options.memory ? ' scroll-overlay--memory' : ''}${options.interactive ? ' scroll-overlay--interactive' : ''}${options.scrollable ? ' scroll-overlay--scrollable' : ''}`;
    el.scrollPaper.replaceChildren();
    el.scrollPaper.scrollTop = 0;
    el.scrollPaper.tabIndex = options.interactive || options.scrollable ? 0 : -1;
    const head = document.createElement('header');
    head.className = 'scroll-paper__head';
    head.innerHTML = `<span>${escapeHtml(data.glyph)}</span><strong>${escapeHtml(data.title)}</strong>`;
    el.scrollPaper.append(head);
    items.forEach(([label, text], index) => {
      const line = document.createElement('p');
      line.className = 'scroll-ink-line';
      line.style.setProperty('--ink-order', String(index));
      line.innerHTML = `<b>${escapeHtml(label)}</b>${escapeHtml(replaceTokens(text))}`;
      el.scrollPaper.append(line);
    });
    if (options.finalLine) {
      const final = document.createElement('p');
      final.className = 'scroll-ink-line scroll-ink-line--final';
      final.style.setProperty('--ink-order', String(items.length + 1));
      final.innerHTML = `<b>末</b>${escapeHtml(options.finalLine)}`;
      el.scrollPaper.append(final);
    }
    if (options.seal) {
      const seal = document.createElement('span');
      seal.className = 'scroll-paper__seal';
      seal.textContent = data.glyph;
      seal.title = options.seal;
      el.scrollPaper.append(seal);
    }
    requestAnimationFrame(updateScrollPaperPosition);
    return el.scrollPaper;
  }

  function appendScrollQuestion(text) {
    if (!text) return null;
    const node = document.createElement('p');
    node.className = 'scroll-paper__question';
    node.textContent = replaceTokens(text);
    el.scrollPaper.append(node);
    return node;
  }

  function appendScrollChoiceList(items, onChoose) {
    const list = document.createElement('div');
    list.className = 'scroll-choice-list';
    items.forEach(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'scroll-choice';
      button.textContent = item.label;
      button.addEventListener('click', () => onChoose(item));
      list.append(button);
    });
    el.scrollPaper.append(list);
    return list;
  }

  function appendScrollActions(actions) {
    const row = document.createElement('div');
    row.className = 'scroll-action-row';
    actions.forEach(action => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `scroll-action${action.primary ? ' is-primary' : ''}`;
      button.textContent = action.label;
      button.addEventListener('click', action.onClick);
      row.append(button);
    });
    el.scrollPaper.append(row);
    return row;
  }

  let scrollDrag = null;
  el.scrollPaper?.addEventListener('pointerdown', event => {
    if (!el.scrollOverlay?.classList.contains('scroll-overlay--scrollable')) return;
    if (event.target.closest('button')) return;
    scrollDrag = { y: event.clientY, top: el.scrollPaper.scrollTop, id: event.pointerId };
    el.scrollPaper.setPointerCapture?.(event.pointerId);
    el.scrollPaper.classList.add('is-dragging');
  });
  el.scrollPaper?.addEventListener('pointermove', event => {
    if (!scrollDrag || scrollDrag.id !== event.pointerId) return;
    const delta = event.clientY - scrollDrag.y;
    el.scrollPaper.scrollTop = scrollDrag.top - delta;
  });
  const stopScrollDrag = event => {
    if (!scrollDrag || (event?.pointerId != null && scrollDrag.id !== event.pointerId)) return;
    scrollDrag = null;
    el.scrollPaper?.classList.remove('is-dragging');
  };
  el.scrollPaper?.addEventListener('pointerup', stopScrollDrag);
  el.scrollPaper?.addEventListener('pointercancel', stopScrollDrag);

  function hideDestinyReader() {
    clearTimeout(destinyWriteTimer);
    destinyWriteTimer = 0;
    destinySequenceNonce += 1;
    if (!el.destinyReader) return;
    el.destinyReader.hidden = true;
    el.destinyReader.className = 'destiny-reader';
    if (el.destinyPaper) {
      el.destinyPaper.onclick = null;
      el.destinyPaper.classList.remove('is-written');
    }
    el.destinyInk?.replaceChildren();
    el.destinyControls?.replaceChildren();
    if (el.destinyPrompt) {
      el.destinyPrompt.hidden = true;
      el.destinyPrompt.textContent = '';
    }
  }

  function destinyButton(label, onClick, options = {}) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `destiny-control${options.primary ? ' is-primary' : ''}${options.choice ? ' is-choice' : ''}`;
    button.textContent = label;
    button.disabled = Boolean(options.disabled);
    button.addEventListener('click', onClick);
    return button;
  }

  function fitDestinyPaper() {
    const paper = el.destinyPaper;
    if (!paper || paper.hidden) return;
    paper.classList.remove('is-compact', 'is-tight');
    requestAnimationFrame(() => {
      if (paper.scrollHeight > paper.clientHeight + 2) paper.classList.add('is-compact');
      requestAnimationFrame(() => {
        if (paper.scrollHeight > paper.clientHeight + 2) paper.classList.add('is-tight');
      });
    });
  }

  function showDestinyReader({ data, lines = [], visibleCount = 0, writingIndex = -1, total = false, memory = false, prompt = '', controls = [], scribeCaption = '', scribeImage = 'assets/images/active/07_shared/v52_scribe_right.webp', scribeFocus = '50% 50%', theme = '' }) {
    if (!el.destinyReader) return;
    hideScrollOverlay();
    clearSceneHotspots();
    el.panel.hidden = true;
    el.destinyReader.hidden = false;
    el.destinyReader.className = `destiny-reader${total ? ' destiny-reader--total' : ''}${memory ? ' destiny-reader--memory' : ''}${theme ? ` destiny-reader--${theme}` : ''}`;
    el.destinyReader.dataset.route = state.route || (total ? 'finale' : reportView || 'none');
    el.destinyGlyph.textContent = data.glyph || '命';
    el.destinyTitle.textContent = data.title || '九尾手書命牒';
    el.destinyEyebrow.textContent = total ? '櫻隱命館・總命牒' : '九尾手書命牒';
    el.destinyScribeImage.src = scribeImage;
    el.destinyScribeImage.style.removeProperty('object-position');
    el.destinyScribeImage.style.setProperty('--destiny-focus', scribeFocus || '50% 50%');
    el.destinyScribeImage.style.setProperty('--destiny-focus-mobile', scribeFocus || '50% 28%');
    el.destinyScribeCaption.textContent = scribeCaption || (total ? '她把四卷放到一旁，只留下最後一張紙。' : '她沒有催你。筆尖只停在下一句之前。');
    el.destinyInk.replaceChildren();

    const shown = lines.slice(0, Math.max(0, visibleCount));
    shown.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = `destiny-ink-line${index === writingIndex ? ' is-writing' : ' is-set'}${item.final ? ' is-final' : ''}`;
      if (item.label) {
        const label = document.createElement('small');
        label.textContent = item.label;
        article.append(label);
      }
      const text = document.createElement('p');
      text.textContent = replaceTokens(item.text || '');
      article.append(text);
      el.destinyInk.append(article);
    });

    if (!shown.length) {
      const blank = document.createElement('p');
      blank.className = 'destiny-ink-blank';
      blank.textContent = '紙面還是空的。她把筆尖懸在第一句之前。';
      el.destinyInk.append(blank);
    }

    el.destinyPrompt.textContent = prompt ? replaceTokens(prompt) : '';
    el.destinyPrompt.hidden = !prompt;
    el.destinyControls.replaceChildren();
    controls.forEach(control => {
      el.destinyControls.append(destinyButton(control.label, control.onClick, control));
    });

    fitDestinyPaper();

    if (writingIndex >= 0) {
      const interactive = [...el.destinyControls.querySelectorAll('button')];
      interactive.forEach(button => { button.disabled = true; });
      clearTimeout(destinyWriteTimer);
      destinyWriteTimer = setTimeout(() => {
        interactive.forEach(button => { button.disabled = false; });
      }, total ? 1900 : 1600);
    }
  }

  function writeDestinySequence({ data, lines = [], total = false, prompt = '', controls = [], scribeCaption = '', scribeImage = 'assets/images/active/07_shared/v52_scribe_right.webp', scribeFocus = '50% 50%', theme = '', charDelay = 52, linePause = 560 }) {
    if (!el.destinyReader) return;
    const nonce = ++destinySequenceNonce;
    const baseCaption = scribeCaption || (total ? '她把四卷放到一旁，只留下最後一張紙。' : '她沒有催你。筆尖只停在下一句之前。');
    showDestinyReader({ data, lines: [], visibleCount: 0, total, prompt: '', controls: [], scribeCaption: baseCaption, scribeImage, scribeFocus, theme });
    el.destinyInk.replaceChildren();
    el.destinyPrompt.hidden = true;
    el.destinyControls.replaceChildren();

    const finish = () => {
      if (nonce !== destinySequenceNonce) return;
      el.destinyPrompt.textContent = prompt ? replaceTokens(prompt) : '';
      el.destinyPrompt.hidden = !prompt;
      controls.forEach(control => el.destinyControls.append(destinyButton(control.label, control.onClick, control)));
      el.destinyPaper?.classList.add('is-written');
      el.destinyScribeCaption.textContent = baseCaption;
      fitDestinyPaper();
    };

    const renderFullLine = item => {
      const article = document.createElement('article');
      article.className = `destiny-ink-line is-set${item.final ? ' is-final' : ''}`;
      if (item.label) {
        const label = document.createElement('small');
        label.textContent = item.label;
        article.append(label);
      }
      const text = document.createElement('p');
      text.textContent = replaceTokens(item.text || '');
      article.append(text);
      el.destinyInk.append(article);
    };

    const writeLine = index => {
      if (nonce !== destinySequenceNonce) return;
      if (index >= lines.length) {
        finish();
        return;
      }
      const item = lines[index] || {};

      const beginInk = () => {
        if (nonce !== destinySequenceNonce) return;
        el.destinyScribeCaption.textContent = baseCaption;
        const article = document.createElement('article');
        article.className = `destiny-ink-line is-writing${item.final ? ' is-final' : ''}`;
        if (item.label) {
          const label = document.createElement('small');
          label.textContent = item.label;
          article.append(label);
        }
        const text = document.createElement('p');
        text.textContent = '';
        article.append(text);
        el.destinyInk.append(article);
        fitDestinyPaper();
        const full = replaceTokens(item.text || '');
        let cursor = 0;

        const tick = () => {
          if (nonce !== destinySequenceNonce) return;
          cursor += 1;
          text.textContent = full.slice(0, cursor);
          if (cursor === full.length || cursor % 18 === 0) fitDestinyPaper();
          if (cursor < full.length) {
            destinyWriteTimer = setTimeout(tick, charDelay);
            return;
          }
          article.classList.remove('is-writing');
          article.classList.add('is-set');
          destinyWriteTimer = setTimeout(() => writeLine(index + 1), item.afterPause ?? linePause);
        };
        destinyWriteTimer = setTimeout(tick, Math.min(520, linePause));
      };

      if (item.pauseBefore) {
        const thinking = document.createElement('div');
        thinking.className = 'destiny-thinking';
        thinking.setAttribute('aria-label', '九尾停筆思考');
        thinking.innerHTML = '<span></span><span></span><span></span>';
        el.destinyInk.append(thinking);
        if (item.pauseCaption) el.destinyScribeCaption.textContent = replaceTokens(item.pauseCaption);
        destinyWriteTimer = setTimeout(() => {
          thinking.classList.add('is-fading');
          setTimeout(() => {
            thinking.remove();
            beginInk();
          }, 380);
        }, item.pauseDuration || 1700);
        return;
      }
      beginInk();
    };

    const skip = () => {
      if (nonce !== destinySequenceNonce) return;
      clearTimeout(destinyWriteTimer);
      el.destinyInk.replaceChildren();
      lines.forEach(renderFullLine);
      fitDestinyPaper();
      finish();
    };

    el.destinyPaper.onclick = event => {
      if (event.target.closest('button')) return;
      if (!el.destinyPaper.classList.contains('is-written')) skip();
    };
    el.destinyPaper.classList.remove('is-written');
    writeLine(0);
  }
  window.addEventListener('resize', fitDestinyPaper);

  function rememberDecision(effects = {}) {
    const behavior = Object.entries(effects.behavior || {}).filter(([, value]) => Number(value) > 0).map(([key]) => key);
    const scores = Object.entries(effects.scores || {}).filter(([, value]) => Number(value) > 0).map(([key]) => key);
    if (behavior.length || scores.length) state.decisionTrail.push({ behavior, scores, at: Date.now() });
    if (state.decisionTrail.length > 240) state.decisionTrail.splice(0, state.decisionTrail.length - 240);
  }

  function makeButton(label, hint, onClick, className = 'choice-button') {
    const node = document.createElement('button');
    node.type = 'button';
    node.className = className;
    const strong = document.createElement('strong');
    strong.textContent = label;
    node.append(strong);
    if (hint) {
      const small = document.createElement('small');
      small.textContent = hint;
      node.append(small);
    }
    node.addEventListener('click', onClick);
    return node;
  }

  function showNext(label, action) {
    nextAction = action;
    el.next.firstChild.textContent = `${label} `;
    el.next.hidden = false;
  }

  function hideNext() {
    nextAction = null;
    el.next.hidden = true;
  }

  function scheduleAdvance(action, delay = 6200) {
    // V50 keeps this helper only for legacy compatibility. Main story progression no longer calls it.
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = 0;
    return { action, delay };
  }

  function compactBeatFlow(beats = []) {
    const clean = (beats || []).filter(item => item?.text).map(item => ({ ...item, text: String(item.text).trim() }));
    const merged = [];
    clean.forEach(item => {
      const last = merged[merged.length - 1];
      if (last && last.speaker === item.speaker) last.text = `${last.text} ${item.text}`;
      else merged.push({ ...item });
    });
    return merged;
  }

  function sceneLeadText(scene, routeId = '') {
    const title = String(scene?.title || '').replace(/[。？！?！]+$/g, '').trim();
    const hay = `${scene?.id || ''} ${scene?.kicker || ''} ${title}`;
    if (/鏡|倒影|水鏡/.test(hay)) return ['鏡裡有東西先動了', ''];
    if (/紅線|纏腕|線室|線/.test(hay)) return ['紅線又動了一下', ''];
    if (/棋|成果|署名|名字/.test(hay)) return ['她翻過下一枚棋子', ''];
    if (/封印|第五印|心印|印記/.test(hay)) return ['那道印記忽然亮了', ''];
    if (/狐面|面具/.test(hay)) return ['狐面停在你面前', ''];
    if (/命牒|判詞|判讀|結果/.test(hay)) return ['她把紙往你面前推', ''];
    if (/門|終|餘韻/.test(hay)) return ['門縫裡吹進一點風', ''];
    if (title) return [title, ''];
    return ['她的視線移向下一處', ''];
  }

  function addStoryLead(label, hint, action) {
    const button = makeButton(label, '', action, 'choice-button choice-button--story-lead');
    el.choices.append(button);
    return button;
  }

  function addSceneHint(text) {
    if (!text) return;
    const hint = document.createElement('p');
    hint.className = 'scene-interaction-hint';
    hint.textContent = text;
    el.choices.append(hint);
  }

  function addSceneHotspot({ label, x, y, w, h, onClick, tone = 'touch' }) {
    if (!el.hotspots || !onClick) return null;
    const node = document.createElement('button');
    node.type = 'button';
    node.className = `scene-hotspot scene-hotspot--${tone}`;
    node.setAttribute('aria-label', label || '觸碰畫面');
    node.title = label || '';
    node.addEventListener('click', event => {
      event.preventDefault();
      clearSceneHotspots();
      onClick();
    });
    activeHotspots.push({ node, x: x / 100, y: y / 100, w: w / 100, h: h / 100 });
    el.hotspots.append(node);
    requestAnimationFrame(layoutSceneHotspots);
    return node;
  }

  function playBeatPages(beats, onDone, options = {}) {
    const clean = compactBeatFlow(beats);
    dialogueAdvance = null;
    el.dialogue.onclick = null;
    clean.forEach((beat, index) => addBeat(beat, index));
    el.app.dataset.beatPage = clean.length ? 'complete' : '0';
    onDone?.();
  }

  function stopScratch() {
    el.app.classList.remove('scratch-active');
    el.app.classList.remove('scroll-scratch-active');
  }

  function drawCover(context, image, width, height, focus = '50% 28%') {
    const [focusX, focusY] = String(focus).split(/\s+/).map(value => clamp(parseFloat(value), 0, 100) / 100);
    const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const x = -(drawWidth - width) * (Number.isFinite(focusX) ? focusX : .5);
    const y = -(drawHeight - height) * (Number.isFinite(focusY) ? focusY : .28);
    context.drawImage(image, x, y, drawWidth, drawHeight);
  }

  function currentTrack() {
    if (!state.sound) return '';
    if (state.mode === 'route' && state.route) {
      const route = STORY.routes[state.route];
      const scene = route?.scenes[state.routes[state.route]?.scene || 0];
      return scene?.deep ? route.deepAudio : route?.audio;
    }
    if (state.mode === 'finale') return STORY.finale.audio;
    return 'assets/audio/intro.ogg';
  }

  function fadeTo(source, force = false) {
    if (!state.sound || !source) return;
    if (force) audioUnlocked = true;
    if (!audioUnlocked) {
      el.app.dataset.audio = 'blocked';
      el.sound.textContent = '啟';
      el.sound.title = '點一下開啟音樂';
      return;
    }
    clearInterval(audioTimer);
    const start = () => {
      if (audioSource !== source) {
        audioSource = source;
        audio.src = source;
      }
      audio.volume = 0.05;
      const promise = audio.play();
      if (promise?.catch) {
        promise.then(() => {
          el.app.dataset.audio = 'playing';
          el.sound.textContent = '音';
          el.sound.title = '關閉音樂';
          audioTimer = setInterval(() => {
            audio.volume = Math.min(0.34, audio.volume + 0.035);
            if (audio.volume >= 0.34) clearInterval(audioTimer);
          }, 35);
        }).catch(() => {
          audioUnlocked = false;
          el.app.dataset.audio = 'blocked';
          el.sound.textContent = '啟';
          el.sound.title = '瀏覽器已阻擋播放，點一下開啟';
        });
      }
    };
    if (audioSource && audioSource !== source && !audio.paused) {
      audioTimer = setInterval(() => {
        audio.volume = Math.max(0, audio.volume - 0.055);
        if (audio.volume <= 0.01) {
          clearInterval(audioTimer);
          audio.pause();
          start();
        }
      }, 28);
    } else start();
  }

  function refreshTrack(force = false) {
    fadeTo(currentTrack(), force);
  }

  function pauseAudio() {
    clearInterval(audioTimer);
    audio.pause();
    el.app.dataset.audio = 'muted';
    el.sound.textContent = '靜';
    el.sound.title = '開啟音樂';
  }

  function renderCover() {
    state.mode = 'cover';
    state.route = null;
    frame({ mode: 'cover', art: STORY.cover.art, kicker: '櫻隱命館・雨夜', title: '「先別推門。」', layout: 'ritual', sceneId: 'opening-rain' });
    if (state.started) {
      addBeat({ speaker: 'narrator', text: '雨聲仍停在門外。你留下的命痕沒有被沖淡，她也沒有假裝忘記。' });
      addBeat({ speaker: 'fox', text: '回來了？那就別讓我把同一句話等到天亮。' });
      el.choices.append(
        makeButton('讓她接著上次那句', '回到尚未說完的場景；命痕只留在這台裝置。', () => {
          audioUnlocked = true;
          refreshTrack(true);
          renderRecovered();
        }, 'choice-button choice-button--primary'),
        makeButton('直接回到四道門', '不清除任何答案；已見場景仍在「藏」。', () => {
          audioUnlocked = true;
          state.mode = 'hub';
          save(false);
          renderHub();
          refreshTrack(true);
        })
      );
    } else {
      if (state.flags.entryPaused) {
        addBeat({ speaker: 'narrator', text: '你的手離開門把。門縫裡的紅光也跟著闔上，沒有追問。' });
        addBeat({ speaker: 'fox', text: '很好。能在想進來時仍選擇離開，這也算一種答案。' });
        el.choices.append(makeButton('我改變主意，再把手放回去', '雨還沒停，門也沒有鎖。', () => {
          delete state.flags.entryPaused;
          save(false);
          renderCover();
        }, 'choice-button choice-button--primary'));
      } else {
        addBeat({ speaker: 'narrator', text: '畫面全黑，只剩雨敲在木門上的聲音。門後的人沒有露面。' });
        addBeat({ speaker: 'fox', text: '把聲音留給自己……你身後，還有人嗎？' });
        const enter = context => {
          state.flags.entryContext = context;
          state.mode = 'intake';
          state.intakeScene = 0;
          audioUnlocked = true;
          save(false);
          renderIntake();
          refreshTrack(true);
        };
        el.choices.append(
          makeButton('只有我。', '讓雨聲與她的聲音留在你耳邊。', () => enter('alone'), 'choice-button choice-button--primary'),
          makeButton('有人，但對方聽不見。', '不必獨處；只要你能自己作答。', () => enter('private')),
          makeButton('今晚先不進去。', '門會關上，不記錄任何回答。', () => {
            state.flags.entryPaused = true;
            audioUnlocked = true;
            save(false);
            refreshTrack(true);
            renderCover();
          })
        );
      }
    }
    refreshTrack(false);
  }

  function renderRecovered() {
    if (state.mode === 'route' && STORY.routes[state.route]) return renderRoute();
    if (state.mode === 'finale' && state.finale.unlocked && state.finale.completed && state.flags.finalDawnSeen) return renderDawnCoda();
    if (state.mode === 'finale' && state.finale.unlocked) return renderFinale();
    if (state.mode === 'intake') return renderIntake();
    return renderHub();
  }

  function options(start, end, chosen, suffix = '') {
    let html = '';
    for (let n = start; n <= end; n += 1) html += `<option value="${n}"${n === chosen ? ' selected' : ''}>${n}${suffix}</option>`;
    return html;
  }

  function renderIntake() {
    state.mode = 'intake';
    const index = clamp(state.intakeScene, 0, STORY.intake.length - 1);
    state.intakeScene = index;
    const scene = STORY.intake[index];
    frame({ mode: 'intake', art: scene.art, kicker: scene.kicker, title: scene.title, layout: 'ritual', sceneId: scene.id });
    if (scene.type !== 'profile-birth') compactBeatFlow(scene.beats).forEach(addBeat);
    if (scene.type === 'age-gate') renderAgeStep();
    else if (scene.type === 'profile-name') renderNameStep();
    else if (scene.type === 'profile-birth') renderBirthStep(scene);
    else if (scene.type === 'profile-horizon') renderHorizonStep();
    else renderOmenStep();
    refreshTrack(false);
  }

  function renderAgeStep() {
    if (state.flags.entryContext === 'private') addBeat({ speaker: 'fox', text: '不必把誰趕走。只要接下來的答案，確實由你自己說。' });
    el.choices.append(
      makeButton('我已成年，推門。', '成年確認後，她才會碰你的手。', () => {
        state.ageAccepted = true;
        state.intakeScene += 1;
        save(true);
        renderIntake();
      }, 'choice-button choice-button--primary'),
      makeButton('鬆手離開。', '命館不留下這次來訪。', () => {
        state.ageAccepted = false;
        state.flags.entryPaused = true;
        state.mode = 'cover';
        save(false);
        renderCover();
      })
    );
  }

  function renderNameStep() {
    const form = document.createElement('form');
    form.className = 'alias-ritual';
    form.innerHTML = `
      <label class="alias-line"><span>今晚讓她怎麼叫你</span><input name="alias" maxlength="12" autocomplete="nickname" aria-label="暱稱" required></label>
      <p class="form-note" role="alert">只留稱呼，不需要真名；資料只保存在這台裝置。</p>
      <button class="reply-submit" type="submit">把名字留在掌心 <span>→</span></button>`;
    form.elements.alias.value = state.profile.alias || '';
    form.addEventListener('submit', event => {
      event.preventDefault();
      const alias = String(new FormData(form).get('alias') || '').trim();
      const note = form.querySelector('.form-note');
      if (!alias) {
        note.textContent = '至少留一個你願意回頭的稱呼。';
        form.elements.alias.focus();
        return;
      }
      state.profile.alias = alias;
      state.intakeScene += 1;
      birthDraft = { stage: 'year', year: null, month: null, day: null, echo: null, finished: false };
      save(true);
      renderIntake();
    });
    el.choices.append(form);
  }

  function birthInsight(stage, value) {
    if (stage === 'year') {
      const lines = [
        '這枚錢落得很穩。你多半先把事情撐住，等沒人看見時才承認自己也會累。',
        '這枚錢回聲很慢。你不是沒有答案，只是常讓答案在心裡多住一晚。',
        '這枚錢先亮邊緣。你很早就察覺氣氛變了，卻不一定很早替自己做決定。',
        '這枚錢撞得很清。你能往前，但真正難的是走了一步後，不替別人把剩下的路也走完。'
      ];
      return `「${value}。」她用指甲敲了敲第一枚銅錢。${lines[Math.abs(value) % lines.length]}`;
    }
    if (stage === 'month') {
      const lines = [
        '這一枚偏向你不肯說出口的那邊。關係一靠近，你會先觀察自己是不是給得太多。',
        '這一枚帶著很強的回聲。你會記得細節，也因此容易替細節補出尚未發生的後半句。',
        '這一枚停得很快。你不喜歡拖，可真正重要的事反而可能因為太在意而多想一層。',
        '這一枚落在邊線。你需要自由，也需要知道有人真的會在你鬆手後留下。'
      ];
      return `第二枚停在「${value}月」。${lines[(value - 1) % lines.length]}`;
    }
    const sum = String(value).split('').reduce((n, ch) => n + Number(ch), 0);
    const lines = [
      '最後這枚沒有替你下結論，只把一件事照亮：你真正要練的，是在心跳很快時仍保有選擇。',
      '最後這枚貼著紅線停下。你不是不能信任，只是要學會讓信任和界線同時存在。',
      '最後這枚轉了半圈才停。你會反覆確認，但今晚真正有用的答案會藏在你做過的動作裡。',
      '最後這枚正面朝上。你比自己承認的更有主見，只是常等到不得不選時才把它拿回來。'
    ];
    return `「${value}日。」她沒有立刻碰第三枚。${lines[sum % lines.length]}`;
  }

  function renderBirthStep(scene) {
    const stages = ['year', 'month', 'day'];
    const labels = { year: '年', month: '月', day: '日' };
    if (!birthDraft.year && !birthDraft.month && !birthDraft.day && !birthDraft.echo) {
      addBeat(scene?.beats?.[0] || { speaker: 'fox', text: '{{name}}，別一次把生日交給我。先給我第一枚。' });
    }
    if (birthDraft.echo) addBeat({ speaker: 'fox', text: birthInsight(birthDraft.echo.stage, birthDraft.echo.value) }, 1);

    const currentStage = stages.includes(birthDraft.stage) ? birthDraft.stage : 'year';
    const coinMarkup = key => {
      const isSet = Boolean(birthDraft[key]);
      const isActive = !birthDraft.finished && key === currentStage;
      return `<span class="birth-coin${isSet ? ' is-set' : ''}${isActive ? ' is-active' : ''}" data-coin="${key}"><b>${labels[key]}</b><small>${birthDraft[key] || '・'}</small></span>`;
    };

    if (birthDraft.finished) {
      const wrap = document.createElement('div');
      wrap.className = 'birth-ritual birth-ritual--complete';
      wrap.innerHTML = `<div class="birth-coins" aria-label="生辰三枚銅錢">${coinMarkup('year')}${coinMarkup('month')}${coinMarkup('day')}</div><p class="birth-complete-line">第三枚落穩。她把三枚錢推成一線，卻沒有鬆開你的手。</p>`;
      el.choices.append(wrap);
      addBeat({ speaker: 'fox', text: '日期到這裡就夠了。真正要留下的，是你接下來怎麼靠近、怎麼停、又在哪一刻把手收回。' }, 2);
      addStoryLead('看她把三枚錢推成一線', '銅錢邊緣正一起亮起；起盤從這裡開始。', () => {
        birthDraft = { stage: 'year', year: null, month: null, day: null, echo: null, finished: false };
        state.intakeScene += 1;
        save(true);
        renderIntake();
      });
      return;
    }

    const stage = currentStage;
    const limits = { year: [nowYear - 90, nowYear - 18], month: [1, 12], day: [1, 31] };
    const [min, max] = limits[stage];
    const form = document.createElement('form');
    form.className = 'birth-ritual';
    form.innerHTML = `
      <div class="birth-coins" aria-label="生辰三枚銅錢">${coinMarkup('year')}${coinMarkup('month')}${coinMarkup('day')}</div>
      <label class="coin-entry"><span>${stage === 'year' ? '先告訴第一枚：你從哪一年來' : stage === 'month' ? '她推來第二枚：只說月份' : '最後一枚：只差這一天'}</span><input name="value" type="number" inputmode="numeric" min="${min}" max="${max}" placeholder="${stage === 'year' ? '1996' : stage === 'month' ? '8' : '17'}" required></label>
      <p class="form-note" role="alert">${stage === 'year' ? '她只看這一枚，不急著問完。' : stage === 'month' ? '第一枚的回聲還在；第二枚現在才靠近。' : '前兩枚都已經留下回聲，只剩最後一天。'}</p>
      <button class="reply-submit" type="submit">${stage === 'year' ? '把年份留在第一枚' : stage === 'month' ? '讓第二枚停下' : '讓最後一枚落穩'} <span>→</span></button>`;
    const input = form.elements.value;
    form.addEventListener('submit', event => {
      event.preventDefault();
      const value = Number(input.value);
      const note = form.querySelector('.form-note');
      if (!Number.isInteger(value) || value < min || value > max) {
        note.textContent = `${labels[stage]}的數值不在可接受範圍。`;
        input.focus();
        return;
      }
      birthDraft[stage] = value;
      birthDraft.echo = { stage, value };
      const index = stages.indexOf(stage);
      if (index < stages.length - 1) {
        birthDraft.stage = stages[index + 1];
        renderIntake();
        return;
      }
      const y = birthDraft.year;
      const m = birthDraft.month;
      const d = birthDraft.day;
      const date = new Date(y, m - 1, d);
      const valid = date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
      const today = new Date();
      let age = today.getFullYear() - y;
      if (today.getMonth() + 1 < m || (today.getMonth() + 1 === m && today.getDate() < d)) age -= 1;
      if (!valid || age < 18) {
        note.textContent = '日期無效，或尚未成年；命館不會替未成年人開卷。';
        birthDraft = { stage: 'year', year: null, month: null, day: null, echo: null, finished: false };
        return;
      }
      state.profile.fortuneSeed = hash(`${state.profile.alias}|${y}-${m}-${d}`);
      birthDraft.finished = true;
      renderIntake();
    });
    el.choices.append(form);
  }

  function renderHorizonStep() {
    [
      ['week', '只看七天', '讓她貼近看一個最先發生的動作。'],
      ['month', '看一個月', '足以看一次靠近、交換或反覆有沒有留下。'],
      ['season', '看三個月', '不替你保證結局，只驗一個完整循環是否改變。']
    ].forEach(([value, label, hint]) => {
      el.choices.append(makeButton(label, hint, () => {
        state.profile.period = value;
        state.profile.fortuneSeed = hash(`${state.profile.fortuneSeed}|${value}`);
        state.intakeScene += 1;
        save(true);
        renderIntake();
      }, 'choice-button ritual-choice'));
    });
  }

  function renderOmenStep() {
    if (state.profile.omen) {
      const omen = state.profile.omen;
      const mark = destinyMark();
      addBeat({ speaker: 'fox', text: ({ azure: '蒼燄先回應。你擅長讀空氣，今晚要小心別替沉默補完。', violet: '幽燄貼上指尖。你在答案前會先找隱藏規則，今晚別忘了自己也能定規則。', crimson: '血燄沒有躲。你不怕強烈，只怕強烈退去後什麼都沒留下。' })[omen] });
      addBeat({ speaker: 'oracle', text: `${mark.name}｜${mark.line} 這是起盤底色，不是結論；之後每一個選擇仍會改寫判詞。` });
      addStoryLead('讓四道門認出你的氣息', '狐火已經留下底色；接下來由你挑第一扇門。', () => {
        state.started = true;
        state.mode = 'hub';
        save(true);
        renderHub();
      });
      return;
    }
    [
      ['azure', '碰蒼燄', '像水，也像一句沒說完的話。'],
      ['violet', '碰幽燄', '像鏡，也像躲在規則後的眼睛。'],
      ['crimson', '碰血燄', '像心跳，也像警報。']
    ].forEach(([value, label, hint]) => {
      el.choices.append(makeButton(label, hint, () => {
        state.profile.omen = value;
        state.profile.fortuneSeed = hash(`${state.profile.fortuneSeed}|${value}`);
        save(true);
        renderIntake();
      }, 'choice-button ritual-choice'));
    });
  }

  function hash(text) {
    let value = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      value ^= text.charCodeAt(i);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  }

  function hubLine(count) {
    return [
      ['碰一扇門。', '每卷都會給完整判讀；不必一次走完四卷。'],
      ['第一道命痕還在發熱。', '另一扇門似乎已經聽見你剛才的回答。'],
      ['兩件命痕開始互相指認。', echoLine()],
      ['只剩最後一道普通的門。', '她沒有催你。牆後卻多了一次不屬於四門的呼吸。'],
      ['四道門都已回答。', '現在，九尾身後那扇沒有名字的門只認你。']
    ][count] || ['碰一扇門。', '她在門後等你。'];
  }

  function renderHub() {
    state.mode = 'hub';
    state.route = null;
    state.finale.unlocked = completedCount() === STORY.routeOrder.length;
    frame({ mode: 'hub', art: STORY.hub.art, kicker: '', title: '', layout: 'hub' });
    el.panel.hidden = true;
    el.doors.hidden = false;
    const line = state.finale.completed
      ? ['第五卷已封。那道裂縫還留著。', '你可以重走第五卷；真正的結局仍停在黎明。']
      : hubLine(completedCount());
    el.whisperTitle.textContent = line[0];
    el.whisperText.textContent = line[1];
    $$('.door-hotspot').forEach(node => {
      const id = node.dataset.routeTarget;
      const route = STORY.routes[id];
      const rs = state.routes[id];
      node.classList.toggle('completed', rs.completed);
      node.classList.toggle('started', rs.started && !rs.completed);
      node.querySelector('.door-name').textContent = rs.completed ? `${route.label}・已封卷` : route.door;
      node.setAttribute('aria-label', rs.completed ? `重走${route.label}` : `進入${route.door}`);
    });
    el.finalDoor.hidden = !state.finale.unlocked;
    if (state.finale.unlocked) {
      const title = el.finalDoor.querySelector('span');
      const sub = el.finalDoor.querySelector('small');
      if (title) title.textContent = state.finale.completed ? '重看第五卷' : '無字之門';
      if (sub) sub.textContent = state.finale.completed ? '裂縫仍在；可以重新走一次真命卷' : '四道命痕已經認出你';
      el.finalDoor.setAttribute('aria-label', state.finale.completed ? '重看第五卷' : '進入第五卷');
    }
    save(false);
    refreshTrack(false);
  }

  function previewDoor(id) {
    const route = STORY.routes[id];
    const rs = state.routes[id];
    if (!route) return;
    el.whisperTitle.textContent = rs.completed ? `${route.label}已封卷。` : route.door;
    el.whisperText.textContent = rs.completed ? `判詞仍在「藏」裡；推門可從頭重走，得到另一種回答。` : route.teaser;
  }

  function openRoute(id) {
    const old = state.routes[id];
    if (!old.started || old.completed) {
      state.routes[id] = { ...routeFresh(STORY.routes[id]), started: true, completed: old.completed, playthroughs: old.playthroughs };
    }
    state.route = id;
    state.mode = 'route';
    save(true);
    renderRoute();
  }

  function renderRoute() {
    const route = STORY.routes[state.route];
    const rs = state.routes[state.route];
    if (!route || !rs) return renderHub();
    rs.scene = clamp(rs.scene, 0, route.scenes.length - 1);
    const scene = route.scenes[rs.scene];
    const sceneArt = scene.type === 'ending'
      ? scene.art
      : (rs.phase === 'reaction' && rs.reactionArt)
      ? rs.reactionArt
      : (scene.variantArt?.[dominantScoreKey(route, rs)] || scene.art);
    frame({ mode: 'route', route: route.id, art: sceneArt, kicker: scene.kicker, title: scene.title, layout: scene.layout || scene.type || 'dialogue', sceneId: scene.id });
    refreshTrack(false);
    if (rs.carryReaction && rs.reaction?.length) {
      const carry = compactBeatFlow(Array.isArray(rs.reaction) ? rs.reaction : [rs.reaction]);
      if (scene.type === 'ending') rs.endingEcho = carry.map(item => replaceTokens(item.text)).join(' ');
      else carry.forEach(item => addBeat(item));
      rs.carryReaction = false;
      rs.reaction = [];
      save(false);
    }
    if (scene.type === 'result') renderResult(route, rs);
    else if (scene.type === 'ritual') renderRitual(route, rs, scene);
    else if (scene.type === 'ending') renderEnding(route, rs);
    else if (scene.type === 'scratch-reveal') renderScratchRouteScene(route, rs, scene);
    else renderStoryScene(route, rs, scene);
    preload(route.scenes[rs.scene + 1]?.art);
  }

  function renderStoryScene(route, rs, scene) {
    if (rs.phase === 'reaction') {
      const reaction = compactBeatFlow(Array.isArray(rs.reaction) ? rs.reaction : [rs.reaction]);
      const nextScene = route.scenes[rs.scene + 1];
      const [label, hint] = sceneLeadText(nextScene, route.id);
      playBeatPages(reaction, () => addStoryLead(label, hint, () => advanceRoute(rs)), { keep: 2 });
      return;
    }
    const branchKey = dominantScoreKey(route, rs);
    const branchLine = scene.branchEcho && rs.choices.length ? route.branchLines?.[branchKey] : '';
    const dynamicEcho = scene.dynamicEcho?.[branchKey];
    let beats = scene.beats || [];
    if (dynamicEcho) beats = [...beats, { speaker: 'fox', text: dynamicEcho }];
    if (branchLine) beats = [...beats, { speaker: 'oracle', text: `${route.method}回照｜${branchLine}` }];

    const renderActions = () => {
      rs.beat = beats.length;
      if (scene.id === 'love.face' && scene.choices?.length >= 3) {
        const cheek = scene.choices.find(item => item.id === 'touch-cheek');
        const lips = scene.choices.find(item => item.id === 'stop-before-lips');
        const withdraw = scene.choices.find(item => item.id === 'withdraw-hand');
        preload(cheek?.reactionArt); preload(lips?.reactionArt); preload(withdraw?.reactionArt);
        if (cheek) addSceneHotspot({ label: '碰她的臉頰', x: 59, y: 18, w: 13, h: 18, onClick: () => choose(route, rs, scene, cheek) });
        if (lips) addSceneHotspot({ label: '停在她唇前', x: 59, y: 34, w: 13, h: 9, onClick: () => choose(route, rs, scene, lips), tone: 'pause' });
        addSceneHint('她沒有躲。臉頰與唇前會各亮一下；你也可以直接用下方文字回答。');
        if (cheek) el.choices.append(makeButton(cheek.label, cheek.hint, () => choose(route, rs, scene, cheek), 'choice-button'));
        if (lips) el.choices.append(makeButton(lips.label, lips.hint, () => choose(route, rs, scene, lips), 'choice-button'));
        if (withdraw) el.choices.append(makeButton(withdraw.label, withdraw.hint, () => choose(route, rs, scene, withdraw), 'choice-button choice-button--quiet'));
        return;
      }

      if (scene.id === 'forbidden.wrist' && scene.choices?.length) {
        const pullFree = scene.choices.find(item => item.id === 'pull-free');
        if (pullFree) {
          addSceneHotspot({ label: '從紅線裡抽回手腕', x: 34, y: 67, w: 18, h: 16, onClick: () => choose(route, rs, scene, pullFree), tone: 'thread' });
          addSceneHint('紅線沒有打死結。你自己的手腕先亮了一下；下方文字也能直接回答。');
          el.choices.append(makeButton(pullFree.label, pullFree.hint, () => choose(route, rs, scene, pullFree), 'choice-button'));
        }
        scene.choices.filter(item => item.id !== 'pull-free').forEach(item => el.choices.append(makeButton(item.label, item.hint, () => choose(route, rs, scene, item))));
        return;
      }

      if (scene.id === 'love.last-proof' && scene.choices?.length) {
        const touch = scene.choices[0];
        addSceneHotspot({ label: '碰一下桌上的紅線', x: 42, y: 48, w: 18, h: 16, onClick: () => choose(route, rs, scene, touch), tone: 'thread' });
        addSceneHint('九尾沒有再問。桌上的紅線自己亮了一次。');
        return;
      }

      if (scene.choices?.length) {
        scene.choices.forEach(item => preload(item.reactionArt));
        scene.choices.forEach(item => el.choices.append(makeButton(item.label, item.hint, () => choose(route, rs, scene, item))));
      } else {
        const [label, hint] = scene.lead || sceneLeadText(route.scenes[rs.scene + 1], route.id);
        addStoryLead(label, hint, () => advanceRoute(rs));
      }
    };

    playBeatPages(beats, renderActions, { pageSize: 2 });
  }

  function renderScratchRouteScene(route, rs, scene) {
    renderStoryScene(route, rs, scene);
  }

  function applyEffects(rs, effects = {}) {
    Object.entries(effects.scores || {}).forEach(([key, value]) => { rs.scores[key] = (rs.scores[key] || 0) + Number(value); });
    Object.entries(effects.behavior || {}).forEach(([key, value]) => { state.behavior[key] = (state.behavior[key] || 0) + Number(value); });
    Object.assign(state.flags, effects.flags || {});
  }

  function choose(route, rs, scene, item) {
    applyEffects(rs, item.effects);
    rememberDecision(item.effects);
    rs.choices.push({
      scene: scene.id, choice: item.id, label: item.label,
      scores: Object.entries(item.effects?.scores || {}).filter(([, value]) => Number(value) > 0).map(([key]) => key),
      behavior: Object.entries(item.effects?.behavior || {}).filter(([, value]) => Number(value) > 0).map(([key]) => key)
    });
    rs.reaction = Array.isArray(item.reaction) ? item.reaction : [{ speaker: 'fox', text: item.reaction?.text || item.reaction || '' }];
    rs.reactionArt = item.reactionArt || null;
    rs.beat = 0;
    if (item.reactionArt) {
      rs.phase = 'reaction';
      rs.carryReaction = false;
      save(true);
      renderRoute();
      return;
    }
    // V50 pacing: ordinary answers do not create a separate click-only reaction screen.
    rs.scene += 1;
    rs.phase = 'story';
    rs.carryReaction = true;
    save(true);
    renderRoute();
  }

  function advanceRoute(rs) {
    rs.scene += 1;
    rs.beat = 0;
    rs.phase = 'story';
    rs.reaction = [];
    rs.reactionArt = null;
    rs.carryReaction = false;
    save(false);
    renderRoute();
  }

  function dominantScoreKey(route, rs) {
    const entries = route.scoreKeys.map(key => [key, Number(rs.scores[key] || 0)]);
    const max = Math.max(...entries.map(([, value]) => value));
    const tied = entries.filter(([, value]) => value === max).map(([key]) => key);
    if (tied.length <= 1) return tied[0] || route.scoreKeys[0];
    for (let index = rs.choices.length - 1; index >= 0; index -= 1) {
      const scoreKeys = Array.isArray(rs.choices[index]?.scores) ? rs.choices[index].scores : [];
      const hit = scoreKeys.find(key => tied.includes(key));
      if (hit) return hit;
    }
    return route.scoreKeys.find(key => tied.includes(key)) || tied[0];
  }

  function resultKey(route, rs) {
    if (rs.result && route.results[rs.result]) return rs.result;
    rs.result = dominantScoreKey(route, rs);
    save(false);
    return rs.result;
  }

  function renderResult(route, rs) {
    if (route.id === 'love') {
      renderLoveResultDestiny(route, rs);
      return;
    }
    const key = resultKey(route, rs);
    const result = route.results[key];
    el.title.textContent = result.title;
    const beatsByRoute = {
      career: [
        { speaker: 'narrator', text: '九尾把你的玄棋翻成名字朝上，指甲在棋面輕敲兩下。' },
        { speaker: 'fox', text: `「${result.title}。」${result.verdict}` }
      ],
      life: [
        { speaker: 'narrator', text: '她把鏡片轉向你。這一次，鏡裡沒有多出任何人。' },
        { speaker: 'fox', text: `「${result.title}。」${result.verdict}` }
      ],
      forbidden: [
        { speaker: 'narrator', text: '狐面停在桌上。九尾沒有替你戴回去。' },
        { speaker: 'fox', text: `「${result.title}。」${result.verdict}` }
      ]
    };
    const beats = beatsByRoute[route.id] || [{ speaker: 'fox', text: result.verdict }];
    rs.beat = beats.length;
    const [leadLabel, leadHint] = sceneLeadText(route.scenes[rs.scene + 1], route.id);
    playBeatPages(beats, () => addStoryLead(leadLabel, leadHint, () => advanceRoute(rs)), { keep: 2 });
  }
  function loveDestinyLines(route, rs) {
    const key = resultKey(route, rs);
    const result = route.results[key];
    const period = state.profile.period;
    const future = route.futures?.[key]?.[period] || result.sign;
    return [
      { label: '緣判', text: result.verdict },
      { label: '你沒有看錯', text: result.lines[0] },
      { label: '真正要確認', text: result.lines[1], pauseBefore: true, pauseDuration: 1850, pauseCaption: '筆尖停住。她盯著紙看了很久，像有一句話不想太快寫下來。' },
      { label: '接下來只看', text: future },
      { label: '留在現實', text: result.action, final: true }
    ];
  }

  function renderLoveResultDestiny(route, rs) {
    const key = resultKey(route, rs);
    const data = buildReportData(route.id);
    data.title = `${route.label}・${route.results[key].title}`;
    data.subtitle = '九尾手書命牒';
    el.app.dataset.layout = 'destiny-reading';
    el.kicker.textContent = '';
    el.title.textContent = '';
    const lines = loveDestinyLines(route, rs);
    writeDestinySequence({
      data,
      lines,
      theme: 'love',
      scribeImage: 'assets/images/active/01_love/love_destiny_wide.webp',
      scribeFocus: '50% 50%',
      scribeCaption: '紅線垂在筆桿旁。她沒有看你，只讓墨一個字一個字長出來。',
      prompt: '最後一筆乾了。紅線從紙邊滑回桌面。',
      controls: [{
        label: '看她把紅線放回桌上',
        primary: true,
        onClick: () => advanceRoute(rs)
      }],
      charDelay: 58,
      linePause: 620
    });
  }

  function renderRitual(route, rs, scene) {
    if (rs.phase === 'reaction') {
      const reaction = Array.isArray(rs.reaction) ? rs.reaction : [rs.reaction];
      const [label, hint] = sceneLeadText(route.scenes[rs.scene + 1], route.id);
      playBeatPages(reaction, () => addStoryLead(label, hint, () => advanceRoute(rs)), { keep: 2 });
      return;
    }
    const beats = scene.beats || [];
    const showChoices = () => scene.choices.forEach(item => el.choices.append(makeButton(item.label, item.hint, () => choose(route, rs, scene, item), 'choice-button ritual-choice')));
    playBeatPages(beats, showChoices, { keep: 2 });
  }

  function endingCrossLine(count) {
    if (count === 1) return '她把第一件命痕收入袖中。布料下傳來一聲不屬於四門的輕響。';
    if (count === 2) return `${echoLine()} 第二件命痕聽見後，朝同一面空牆偏了一下。`;
    if (count === 3) return '三件命痕同時朝九尾身後偏轉。那裡沒有門，卻吹進一縷外面的雨。';
    return '四件命痕沒有合成護身符。它們一起指出九尾身後，一扇原本不存在的門。';
  }

  function exitLabel(routeId) {
    return ({
      love: '把紅線繞上門環，回到四門',
      career: '收起署名玄棋，回到四門',
      life: '讓鏡片照著路，回到四門',
      forbidden: '摘下面具，回到四門'
    })[routeId] || '回到四門';
  }

  const routeScrollCopy = {
    love: {
      question: '最後一筆，你要留哪一句？',
      choices: [
        ['wait-other', '我還在等對方。', '等一次由對方完成的靠近，不再等一句好聽的話。'],
        ['resent', '我只是不甘心。', '不甘心不是愛。先把被拖住的時間拿回來。'],
        ['leave', '其實我準備走了。', '離開不是輸，是把紅線還給現實。']
      ], seal: '紅線印'
    },
    career: {
      question: '最後一手。你要把哪一枚棋留下？',
      choices: [
        ['be-seen', '把名字留在成果上。', '下一次交付以前，先讓角色與署名一起落地。'],
        ['exchange', '把價格留在責任旁。', '下一次答應以前，先讓交換被說出來。'],
        ['exit', '把出口留在袖裡。', '出口從今天開始，不等最後一次失望批准。']
      ], seal: '玄棋印'
    },
    life: {
      question: '最後一筆，你想先把哪一扇門關上？',
      choices: [
        ['stop-work', '今晚先不再值班。', '讓休息第一次有真正的開始與結束。'],
        ['stop-blame', '安靜時，不再先責怪自己。', '恢復不需要先證明你夠累。'],
        ['return-duty', '把一件責任交回去。', '讓世界證明少了你一隻手也不會立刻倒下。']
      ], seal: '水鏡印'
    },
    forbidden: {
      question: '面具只剩最後一筆。你要留下哪個新動作？',
      choices: [
        ['same-person', '先認行為，不認心跳。', '下一次先看對方做了什麼，不讓強度替安全作證。'],
        ['same-action', '先把需要說出口。', '不再用退開、沉默或試探叫別人猜。'],
        ['first-step', '第一個不舒服出現時就停。', '不必等到結局夠痛，才准自己換路。']
      ], seal: '狐面印'
    }
  };

  function sectionText(data, label) {
    return data.sections.find(([name]) => name === label)?.[1] || '';
  }

  function routeScrollItems(data) {
    const compact = value => {
      const text = replaceTokens(String(value || '')).replace(/\s+/g, ' ').trim();
      return text.length > 42 ? `${text.slice(0, 41)}…` : text;
    };
    return [
      ['判', compact(data.verdict)],
      ['兆', compact(sectionText(data, '問期內可能發生'))],
      ['做', compact(sectionText(data, '只做一件事'))],
      ['避', compact(sectionText(data, '最容易誤讀'))],
      ['痕', compact(sectionText(data, '你帶走的命痕'))]
    ];
  }

  function routeDestinySpec(route, data) {
    const rs = state.routes[route.id];
    const key = rs?.result || dominantScoreKey(route, rs);
    const result = route.results[key];
    const period = state.profile.period;
    const future = route.futures?.[key]?.[period] || result.sign;
    const visual = route.destinyVisual || {};
    const sharedFinal = { label: '只留這一件', text: result.action, final: true };

    if (route.id === 'career') return {
      theme: 'career', scribeImage: visual.image, scribeFocus: visual.focus || '50% 50%', scribeCaption: visual.caption,
      charDelay: 48, linePause: 520,
      lines: [
        { label: '落子', text: result.verdict },
        { label: '署名', text: result.lines[0] },
        { label: '下一手', text: future, pauseBefore: true, pauseDuration: 1450, pauseCaption: '她沒有落筆，先把玄棋轉成名字朝上。棋面輕敲了一下桌面。' },
        sharedFinal
      ]
    };
    if (route.id === 'life') return {
      theme: 'life', scribeImage: visual.image, scribeFocus: visual.focus || '50% 50%', scribeCaption: visual.caption,
      charDelay: 66, linePause: 720,
      lines: [
        { label: '照見', text: result.verdict },
        { label: '身體先說', text: result.lines[0] },
        { label: '……', text: result.lines[1], pauseBefore: true, pauseDuration: 2050, pauseCaption: '水紋停了。她看著鏡面沒有動，像在等你的身體先把那句話承認。' },
        { label: '接下來只看', text: future },
        sharedFinal
      ]
    };
    if (route.id === 'forbidden') return {
      theme: 'forbidden', scribeImage: visual.image, scribeFocus: visual.focus || '50% 50%', scribeCaption: visual.caption,
      charDelay: 56, linePause: 580,
      lines: [
        { label: '狐面', text: result.verdict },
        { label: '你最熟的那一步', text: result.lines[0] },
        { label: '下次', text: future, pauseBefore: true, pauseDuration: 1750, pauseCaption: '狐火在紙邊縮了一下。她的手停住，沒有急著替你把罪名寫滿。' },
        sharedFinal
      ]
    };
    return {
      theme: route.id, scribeImage: visual.image, scribeFocus: visual.focus || '50% 50%', scribeCaption: visual.caption,
      charDelay: 58, linePause: 620,
      lines: [
        { label: '判', text: result.verdict },
        { label: '照見', text: result.lines[0] },
        { label: '接下來只看', text: future, pauseBefore: true },
        sharedFinal
      ]
    };
  }
  function renderScrollSheet(data, items, step, options = {}) {
    const stage = document.createElement('section');
    stage.className = `scroll-stage${options.total ? ' scroll-stage--total' : ''}${options.complete ? ' is-complete' : ''}`;
    const visible = items.slice(0, clamp(step, 0, items.length));
    stage.innerHTML = `
      <header class="scroll-stage__header">
        <span class="scroll-stage__glyph">${escapeHtml(data.glyph)}</span>
        <div><small>${escapeHtml(data.subtitle)}</small><h2>${escapeHtml(data.title)}</h2></div>
      </header>
      <div class="scroll-stage__ink" aria-live="polite">
        ${visible.length ? visible.map(([label, text], index) => `
          <article style="--ink-order:${index}"><h3>${escapeHtml(label)}</h3><p>${escapeHtml(replaceTokens(text))}</p></article>`).join('') : '<p class="scroll-stage__blank">紙上仍是空的。她的筆尖停在你回答過的地方。</p>'}
        ${options.finalLine ? `<article class="scroll-stage__final"><h3>最後一筆</h3><p>${escapeHtml(options.finalLine)}</p></article>` : ''}
      </div>
      ${options.seal ? `<footer class="scroll-stage__seal"><span>${escapeHtml(data.glyph)}</span><p>${escapeHtml(options.seal)}</p></footer>` : ''}`;
    el.dialogue.append(stage);
    return stage;
  }

  function completeRouteScroll(route, rs) {
    const firstCompletion = !rs.completed;
    rs.completed = true;
    if (!state.completedOrder.includes(route.id)) state.completedOrder.push(route.id);
    if (!rs.scrollCompletionCounted) {
      rs.playthroughs += 1;
      rs.scrollCompletionCounted = true;
    }
    state.finale.unlocked = completedCount() === STORY.routeOrder.length;
    state.reportLast = route.id;
    el.report.hidden = false;
    if (firstCompletion) save(true);
    else save(false);
  }

  function renderEnding(route, rs) {
    if (route.id === 'love') {
      renderLoveEnding(route, rs);
      return;
    }
    const copy = routeScrollCopy[route.id];
    const data = buildReportData(route.id);
    const spec = routeDestinySpec(route, data);
    const lines = spec.lines;
    const finalChoice = copy.choices.find(([id]) => id === rs.scrollConfirmed);
    const finalLine = finalChoice?.[2] || '';
    el.app.dataset.layout = 'destiny-reading';
    el.kicker.textContent = '';
    el.title.textContent = '';

    if (!rs.scrollConfirmed) {
      writeDestinySequence({
        data,
        lines,
        theme: spec.theme,
        scribeImage: spec.scribeImage,
        scribeFocus: spec.scribeFocus || '50% 50%',
        scribeCaption: spec.scribeCaption,
        charDelay: spec.charDelay,
        linePause: spec.linePause,
        prompt: copy.question,
        controls: copy.choices.map(([id, label]) => ({
          label,
          choice: true,
          onClick: () => {
            rs.scrollConfirmed = id;
            state.flags[`${route.id}ScrollConfirm`] = id;
            completeRouteScroll(route, rs);
            save(true);
            renderRoute();
          }
        }))
      });
      return;
    }

    completeRouteScroll(route, rs);
    const completedLines = [...lines, { label: '末筆', text: finalLine, final: true }];
    showDestinyReader({
      data,
      lines: completedLines,
      visibleCount: completedLines.length,
      theme: spec.theme,
      scribeImage: spec.scribeImage,
      scribeCaption: route.id === 'career'
        ? '玄棋停在她指尖。這一局已經不是替誰證明，而是你手裡多了一步。'
        : route.id === 'life'
          ? '鏡面安靜下來。她沒有叫你變回以前，只讓你把自己帶走。'
          : '狐面留在桌角。她沒有替你燒掉慾望，只把出口留了下來。',
      prompt: endingCrossLine(completedCount()),
      controls: [
        {
          label: state.finale.unlocked ? '跟著那道光去看第五扇門' : '把這卷收回命館',
          primary: true,
          onClick: () => { state.mode = 'hub'; state.route = null; save(true); renderHub(); }
        },
        {
          label: '再看一次她剛寫下的這卷',
          onClick: () => renderRoute()
        }
      ]
    });
  }
  function renderLoveEnding(route, rs) {
    completeRouteScroll(route, rs);
    const ritual = state.flags.loveRitual;
    const ritualLine = route.ritualEndings?.[ritual] || '';
    const beats = [
      ...(rs.endingEcho ? [{ speaker: 'fox', text: rs.endingEcho }] : []),
      ...(ritualLine ? [{ speaker: 'narrator', text: ritualLine }] : []),
      { speaker: 'fox', text: '緣卷封了。別急著問準不準，等現實自己來證明。只是……你真的以為，讓你一直回到原地的只有感情？' }
    ];
    rs.endingEcho = '';
    playBeatPages(beats, () => {
      el.choices.append(
        makeButton(state.finale.unlocked ? '讓她推開第五道門' : '讓她打開另外三道門', state.finale.unlocked ? '四卷都已封。那扇原本不存在的門正在等你。' : '緣卷先收好。業、命、禁還在等你。', () => {
          state.mode = 'hub';
          state.route = null;
          save(true);
          renderHub();
        }, 'choice-button choice-button--primary'),
        makeButton('再看一次緣卷命牒', '只重看命牒，不改剛才的選擇。', () => {
          showLoveDestinyMemory(route, rs);
        })
      );
    }, { keep: 2 });
  }

  function showLoveDestinyMemory(route, rs) {
    const key = resultKey(route, rs);
    const data = buildReportData(route.id);
    data.title = `${route.label}・${route.results[key].title}`;
    data.subtitle = '九尾手書命牒';
    const lines = loveDestinyLines(route, rs);
    el.app.dataset.layout = 'destiny-reading';
    showDestinyReader({
      data,
      lines,
      visibleCount: lines.length,
      memory: true,
      theme: 'love',
      scribeImage: 'assets/images/active/01_love/love_destiny_wide.webp',
      scribeFocus: '50% 50%',
      scribeCaption: '墨已乾。她沒有替你改寫剛才的答案。',
      controls: [{
        label: '回到緣卷餘韻',
        primary: true,
        onClick: () => renderRoute()
      }]
    });
  }

  function openFinale() {
    if (!state.finale.unlocked) return;
    if (state.finale.completed) {
      const ending = state.finale.ending;
      state.finale = { unlocked: true, completed: true, scene: 0, beat: 0, phase: 'story', reaction: [], reactionArt: null, carryReaction: false, scratchDone: {}, choice: null, ending, reportOpened: false, scrollStep: 0, scrollConfirmed: null, scrollScratchDone: false };
    }
    state.flags.finalDawnSeen = false;
    state.mode = 'finale';
    state.route = null;
    save(true);
    renderFinale();
  }

  function replayFinale() {
    const ending = state.finale.ending;
    state.flags.finalDawnSeen = false;
    state.finale = { unlocked: true, completed: true, scene: 0, beat: 0, phase: 'story', reaction: [], reactionArt: null, carryReaction: false, scratchDone: {}, choice: null, ending, reportOpened: false, scrollStep: 0, scrollConfirmed: null, scrollScratchDone: false };
    state.mode = 'finale';
    state.route = null;
    save(true);
    renderFinale();
  }

  function advanceFinale() {
    state.finale.scene += 1;
    state.finale.beat = 0;
    state.finale.phase = 'story';
    state.finale.reaction = [];
    state.finale.reactionArt = null;
    save(false);
    renderFinale();
  }

  function renderFinale() {
    const fs = state.finale;
    fs.scene = clamp(fs.scene, 0, STORY.finale.scenes.length - 1);
    const scene = STORY.finale.scenes[fs.scene];
    const ending = scene.type === 'final-ending' && fs.choice ? STORY.finale.endings[normalizeFinalChoice(fs.choice)] : null;
    const sceneArt = fs.phase === 'reaction' && fs.reactionArt ? fs.reactionArt : (scene.type === 'final-ending' ? (STORY.totalScrollArt || ending?.art || scene.art) : (ending?.art || scene.art));
    frame({ mode: 'finale', route: 'finale', art: sceneArt, kicker: scene.kicker, title: ending?.title || scene.title, layout: scene.layout || scene.type || 'dialogue', sceneId: scene.id });
    refreshTrack(false);
    if (scene.type === 'four-verdicts') renderFourVerdicts();
    else if (scene.type === 'seal-test') renderSealTest(scene);
    else if (scene.type === 'true-question') renderTrueQuestion();
    else if (scene.type === 'final-choice') renderFinalChoice();
    else if (scene.type === 'final-ending') renderFinalEnding();
    else renderFinaleScene(scene);
    preload(STORY.finale.scenes[fs.scene + 1]?.art);
  }

  function renderFinaleScene(scene) {
    const fs = state.finale;
    if (fs.phase === 'reaction') {
      const reaction = compactBeatFlow((Array.isArray(fs.reaction) ? fs.reaction : [fs.reaction]).filter(Boolean));
      const [label, hint] = sceneLeadText(STORY.finale.scenes[fs.scene + 1], 'finale');
      playBeatPages(reaction, () => addStoryLead(label, hint, advanceFinale), { keep: 2 });
      return;
    }
    const beats = scene.beats || [];
    const showActions = () => {
      fs.beat = beats.length;
      if (scene.choices?.length) scene.choices.forEach(item => el.choices.append(makeButton(item.label, item.hint, () => chooseFinaleScene(item))));
      else {
        const explicitLead = {
          'finale.gate': ['推開那道原本不存在的門', '第五卷不在四道門裡。'],
          'finale.relics': ['看清楚四件命痕在認誰', '這一次，它們沒有指向你。'],
          'finale.cross': ['讓她把漏掉的那件事說完', '四卷的判詞沒有作假，但她確實隱瞞了自己的目的。'],
          'finale.confession': ['看向她停住的第五印', '她第一次叫你別碰。那道印還在兩人之間發亮。'],
          'finale.withdrawal': ['先看著她留下的空位', '房間安靜了；紅線、狐面與命牒還在替她說話。']
        }[scene.id];
        const [label, hint] = explicitLead || sceneLeadText(STORY.finale.scenes[fs.scene + 1], 'finale');
        addStoryLead(label, hint, advanceFinale);
      }
    };
    playBeatPages(beats, showActions, { keep: 2 });
  }

  function chooseFinaleScene(item) {
    Object.entries(item.effects?.behavior || {}).forEach(([key, value]) => { state.behavior[key] = (state.behavior[key] || 0) + Number(value); });
    rememberDecision(item.effects);
    Object.assign(state.flags, item.effects?.flags || {});
    state.finale.reaction = Array.isArray(item.reaction) ? item.reaction : [{ speaker: 'fox', text: item.reaction?.text || item.reaction || '' }];
    state.finale.reactionArt = item.reactionArt || null;
    state.finale.phase = 'reaction';
    save(true);
    renderFinale();
  }

  function renderFourVerdicts() {
    const fs = state.finale;
    const beats = [
      { speaker: 'narrator', text: '紅線先往九尾腕上收；玄棋翻成無字面；鏡片裡她慢了一拍；狐面自己裂開。' },
      { speaker: 'fox', text: '「……不對。」' },
      { speaker: 'narrator', text: '四件命痕沒有再指向你。它們第一次，同時在認她。' }
    ];
    fs.beat = beats.length;
    playBeatPages(beats, () => addStoryLead('她終於沒有先替你解釋', '', advanceFinale), { keep: 2 });
  }
  function renderSealTest(scene) {
    const fs = state.finale;
    const beats = [
      { speaker: 'narrator', text: '四卷殘痕在她身前合成第五印。狐火猛地亮起，像在催你立刻把手按下去。' },
      { speaker: 'fox', text: '「別碰。」' },
      { speaker: 'narrator', text: '她自己退了半步。這是今晚第一次，九尾不是把你往前引，而是真的替你留下距離。' }
    ];
    fs.beat = beats.length;
    playBeatPages(beats, () => addStoryLead('她退開了。第五印還在亮', '狐火沒有再催你。九尾只是看著那道光自己變化。', advanceFinale), { keep: 2 });
  }
  function trueQuestionText() {
    return ({
      wait: ['如果沒有人先給你答案，你敢不敢替自己停止等待？', '你一直問還要多久。真正能定期限的人，從來不是命。'],
      hold: ['如果你不再接住所有東西，還相信自己值得被留下嗎？', '你把有用活成了被愛。今晚，把兩件事拆開。'],
      approach: ['你敢靠近想要的人；對方沒有往前時，你敢不敢也相信自己的眼睛？', '勇敢有時是看見只有一雙腳印後，不再替第二個人走。'],
      retreat: ['若你先說出需要，再讓別人自由決定，你承受得了那個答案嗎？', '你怕的不是拒絕，是拒絕後再也不能靠想像保留可能。'],
      challenge: ['答案清楚以後，你會照著做，還是再問一次？', '你擅長審問真相。下一步，是停止讓真相只停在嘴上。'],
      agency: ['如果命卷不替你決定，你會把自己放去哪裡？', '四卷都看見你把手伸回自己的命。第五問，只差你承認。'],
      change: ['你真正想停下的，是哪個每次讓你受傷、卻被你叫成個性的動作？', '命是你每次都在同一刻，替重複找理由。'],
      trust: ['你能不能信任一個人，同時保留離開的權利？', '交出一隻手，不等於交出整條命。'],
      restraint: ['焦慮再叫你立刻做點什麼時，你願不願意先讓現實自己說一句？', '忍住的那一秒，是把真相從衝動裡放出來。'],
      control: ['不知道全部時，你能不能靠界線保護自己，而不是靠控制換安全？', '安全不是每次都猜中，是猜錯時你仍知道怎麼停。']
    })[topBehavior()] || ['如果命卷不替你決定，你會把自己放去哪裡？', '答案一直在你伸回來的手上。'];
  }

  function renderTrueQuestion() {
    const fs = state.finale;
    const question = trueQuestionText();
    const beats = [
      { speaker: 'fox', text: question[0] },
      { speaker: 'narrator', text: '她沒有碰你。這一次，連誘惑都被收回，讓問題完整留在你面前。' },
      { speaker: 'fox', text: question[1] }
    ];
    fs.beat = beats.length;
    playBeatPages(beats, () => addStoryLead('把答案留在第五印前', '九尾不再追問；第五印只等你自己伸手。', advanceFinale), { keep: 2 });
  }

  function renderFinalChoice() {
    const fs = state.finale;
    if (fs.phase === 'reaction') {
      const ending = STORY.finale.endings[normalizeFinalChoice(fs.choice) || 'scroll-only'];
      playBeatPages([
        { speaker: 'narrator', text: ending.line },
        { speaker: 'fox', text: ending.actor }
      ], () => addStoryLead('房間裡只剩你剛才的決定', '', advanceFinale), { keep: 2 });
      return;
    }
    addBeat({ speaker: 'narrator', text: '第五印停在你們之間。她沒有再伸手，也沒有替任何一條路說好話。' });
    addBeat({ speaker: 'fox', text: '「這一次，你只替自己選。」' });
    const options = [
      ['complete', '替她完成。'],
      ['scroll-only', '把第五印留在命牒。'],
      ['refuse', '到這裡就好。']
    ];
    options.forEach(([id, label]) => {
      el.choices.append(makeButton(label, '', () => {
        fs.choice = id;
        fs.reaction = [];
        fs.reactionArt = STORY.finale.endings[id].art;
        fs.phase = 'reaction';
        const behavior = id === 'refuse' ? { agency: 2, restraint: 1 } : id === 'scroll-only' ? { agency: 1, trust: 1 } : { approach: 1, trust: 1 };
        Object.entries(behavior).forEach(([key, value]) => { state.behavior[key] = (state.behavior[key] || 0) + value; });
        rememberDecision({ behavior });
        save(true);
        renderFinale();
      }, 'choice-button ritual-choice final-choice-line'));
    });
  }
  function unlockFinalRewards() {
    STORY.finale.rewards.forEach(item => {
      const artData = { desktop: item.src, mobile: item.mobile, galleryTitle: item.title };
      unlockArt(artData, item.title);
    });
  }

  function normalizeFinalChoice(value) {
    if (['complete', 'scroll-only', 'refuse'].includes(value)) return value;
    return ({ contract: 'complete', take: 'scroll-only', burn: 'refuse' })[value] || null;
  }

  function finalChoiceLabel(key) {
    return ({
      complete: '替她完成第五印',
      'scroll-only': '把完整符號只留在命牒上',
      refuse: '拒絕完成封印'
    })[normalizeFinalChoice(key)] || '把最後一筆留給自己決定';
  }

  function contradictionLine() {
    const candidates = [
      ['approach', 'retreat', '你幾次主動靠近，也幾次在真正會被看見以前先收手。靠近與退開都不是假的；矛盾在於你常替別人保留退路，卻沒有替自己留下期限。'],
      ['trust', 'control', '你願意交出信任，卻又想先算準對方的下一步。你要的不是掌控人，而是不再毫無準備地受傷。'],
      ['wait', 'agency', '你說想等一個更確定的答案，卻在幾次關鍵選擇裡把手伸回自己。你不是不能決定，只是不習慣承認決定也會有代價。'],
      ['hold', 'change', '你很會把事情接住，也已經在嘗試交還不屬於你的重量。舊習慣仍在，但它不再是唯一的走法。'],
      ['restraint', 'challenge', '你既能停一秒，也會追問真相。真正拉扯你的，是知道答案後要不要照著做。']
    ];
    const scored = candidates
      .map(item => ({ item, score: Math.min(Number(state.behavior[item[0]] || 0), Number(state.behavior[item[1]] || 0)) }))
      .sort((a, b) => b.score - a.score);
    if (scored[0]?.score > 0) return scored[0].item[2];
    return ({
      approach: '你敢先靠近，卻未必替靠近設定停損。今晚最清楚的反證，是你曾在想要時仍保留選擇。',
      retreat: '你擅長先退一步保護自己；可今晚幾次停下，不全是逃走，也是在確認什麼值得再靠近。',
      trust: '你願意相信感覺，但今晚留下的證據提醒你：信任可以存在，界線也可以同時存在。',
      challenge: '你不輕易接受判詞；矛盾是你有時把追問當成延後行動。今晚至少有一次，你問完便做了選擇。',
      wait: '你習慣等更多訊號，卻也已做出幾個不靠保證的決定。你缺的未必是答案，而是一個自己願意遵守的期限。',
      agency: '你多次把決定拿回來，卻仍想知道這是不是「對的」。命牒只能證明你怎麼選，不能替你免除代價。',
      hold: '你很能承接，也容易把撐住誤認為唯一價值。今晚真正不同的是，你曾讓一件事不由自己接完。',
      change: '你想切斷重複，卻仍對熟悉的痛保留解釋。改變不是一次狠心，而是下一次少做一個舊動作。',
      restraint: '你能忍住衝動，但也可能把沉默拖成等待。停一下應該換來觀察，不是讓自己永遠不開口。',
      control: '你靠掌握細節換安全，卻也在今晚接受過一次不完整的答案。真正的安全，是猜錯時仍知道怎麼停。'
    })[topBehavior()] || '你說過的答案並不完全一致；那不是失敗，而是命牒判斷你仍有選擇的證據。';
  }

  function hiddenTruthLine(key) {
    const ending = ({
      complete: '你仍選擇替她補上第五印，但這次是在知道代價之後。',
      'scroll-only': '你把力量留在卷上，沒有替她決定自由應該長成什麼樣子。',
      refuse: '你拒絕完成封印；四卷的判讀沒有因此作廢，她也不能用需要向你追討結局。'
    })[normalizeFinalChoice(key)] || '';
    return `她先前沒有說：你每收下一張小命牒，四枚殘印就替她取回一道開門的力量。她確實讀了你，也利用了你的回答。${ending}`;
  }

  function finalScrollItems(data) {
    const compact = value => {
      const text = replaceTokens(String(value || '')).replace(/\s+/g, ' ').trim();
      return text.length > 72 ? `${text.slice(0, 71)}…` : text;
    };
    const preferred = [
      ['四卷同指', '四卷共同模式'],
      ['你最矛盾的地方', '前後矛盾'],
      ['真正該停的', '真正優先處理'],
      ['問期', '原問期時間窗口'],
      ['明天第一步', '一項具體行動'],
      ['她沒說的真相', '九尾先前沒有說的真相']
    ];
    return preferred.map(([label, section], index) => ({
      label,
      text: compact(sectionText(data, section)),
      final: index === preferred.length - 1,
      pauseBefore: index === 2 || index === 5,
      pauseDuration: index === 5 ? 2300 : 1850,
      pauseCaption: index === 5
        ? '筆尖停得比前面都久。九尾抬眼看你，像終於要把最不想承認的那一句寫下來。'
        : '她沒有立刻往下寫。四卷攤在旁邊，彼此像在等同一個答案。'
    }));
  }
  function renderFinalEnding() {
    const fs = state.finale;
    const key = normalizeFinalChoice(fs.choice || fs.ending) || 'scroll-only';
    fs.choice = key;
    fs.ending = key;
    const data = buildReportData('finale');
    const lines = finalScrollItems(data);
    const finalLine = finalPrivateLine(key);
    const scribeImage = 'assets/images/active/05_fifth/finale_destiny.webp';
    el.app.dataset.layout = 'destiny-reading';
    el.kicker.textContent = '';
    el.title.textContent = '';

    if (!fs.scrollConfirmed) {
      writeDestinySequence({
        data,
        lines,
        total: true,
        theme: 'finale',
        scribeImage,
        scribeFocus: '50% 50%',
        scribeCaption: '四卷攤在她手邊。這一次，她寫得比前面任何一卷都慢。',
        charDelay: 66,
        linePause: 720,
        prompt: '第五印停在最後一行。這次，她沒有替你壓下去。',
        controls: [{
          label: '落下第五印',
          primary: true,
          onClick: () => {
            fs.scrollConfirmed = key;
            fs.completed = true;
            state.reportLast = 'finale';
            unlockFinalRewards();
            save(true);
            renderFinale();
          }
        }]
      });
      return;
    }

    fs.completed = true;
    state.reportLast = 'finale';
    unlockFinalRewards();
    save(false);
    const completedLines = [...lines, { label: '封卷', text: finalLine, final: true }];
    showDestinyReader({
      data,
      lines: completedLines,
      visibleCount: completedLines.length,
      total: true,
      theme: 'finale',
      scribeImage,
      prompt: '墨乾了。第五卷已經封完；真正的結局在門外。',
      controls: [
        { label: '走向黎明', primary: true, onClick: renderDawnCoda },
        { label: '重看第五卷', onClick: replayFinale }
      ],
      scribeCaption: '她把筆放下。這一次，沒有再替任何一句話補上解釋。'
    });
  }

  function renderDawnCoda() {
    const existingCoda = el.app.querySelector('.final-coda');
    if (existingCoda) existingCoda.remove();
    const artData = { desktop: 'assets/images/active/06_ending/final_dawn.webp', mobile: 'assets/images/active/06_ending/final_dawn.webp', side: 'left-top', mobileSide: 'bottom', desktopFocus: '50% 50%', mobileFocus: '50% 36%', galleryTitle: '黎明真正終幕', heroPresence: 'empty' };
    frame({ mode: 'finale', route: 'finale', art: artData, kicker: '', title: '', layout: 'ending-still', sceneId: 'finale.dawn' });
    state.finale.completed = true;
    state.flags.finalDawnSeen = true;
    state.reportLast = 'finale';
    save(false);
    unlockArt(artData, '黎明真正終幕');
    el.panel.hidden = true;
    el.doors.hidden = true;
    el.app.classList.add('final-still');

    const coda = document.createElement('section');
    coda.className = 'final-coda';
    coda.setAttribute('aria-label', '櫻隱終幕');
    coda.innerHTML = '<p class="final-coda__dawn">天亮了。</p><strong class="final-coda__title">櫻隱・終</strong><div class="final-coda__actions"></div>';
    el.app.append(coda);

    const actions = coda.querySelector('.final-coda__actions');
    const back = document.createElement('button');
    back.type = 'button';
    back.textContent = '回到命館';
    back.addEventListener('click', () => {
      state.flags.finalDawnSeen = false;
      state.mode = 'hub';
      state.route = null;
      save(true);
      renderHub();
    });
    const restart = document.createElement('button');
    restart.type = 'button';
    restart.textContent = '重新起盤';
    restart.addEventListener('click', restartFortune);
    actions.append(back, restart);
    requestAnimationFrame(() => coda.classList.add('is-visible'));
  }


  function restartFortune() {
    const seen = [...state.seen];
    const sound = state.sound;
    state = freshState();
    state.seen = seen;
    state.sound = sound;
    state.ageAccepted = true;
    state.mode = 'intake';
    state.intakeScene = 1;
    save(true);
    renderIntake();
  }

  function renderFinalGate() {
    const panel = document.createElement('section');
    panel.className = 'final-gate';
    const title = document.createElement('strong');
    title.textContent = '狐信收藏室・只在真結之後';
    const text = document.createElement('p');
    if (!CONFIG.newsletterEndpoint) {
      text.textContent = '測試版不傳送也不保存 Email。正式公開版接上受保護服務後，這裡才會收信並寄出新作通知與一次性限定圖連結。';
      const preview = document.createElement('div');
      preview.className = 'newsletter-preview';
      preview.innerHTML = '<input type="email" placeholder="正式公開版才可留信" disabled><button type="button" disabled>尚未開封</button>';
      panel.append(title, text, preview);
      el.dialogue.append(panel);
      return;
    }
    text.textContent = '留下 Email，只用於新作品與真結後續通知。';
    const form = document.createElement('form');
    form.className = 'newsletter-form';
    form.innerHTML = '<label><span>Email</span><input type="email" name="email" autocomplete="email" required placeholder="you@example.com"></label><button type="submit">封入狐信</button><p role="status"></p>';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const status = form.querySelector('[role="status"]');
      status.textContent = '正在封信……';
      try {
        const response = await fetch(CONFIG.newsletterEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.elements.email.value, source: 'sakura-hidden-shrine-v58', ending: state.finale.ending })
        });
        if (!response.ok) throw new Error('request failed');
        status.textContent = '狐信已封。';
        form.elements.email.disabled = true;
        form.querySelector('button').disabled = true;
      } catch {
        status.textContent = '暫時無法封信，請稍後再試。';
      }
    });
    panel.append(title, text, form);
    el.dialogue.append(panel);
  }

  function destinyMark() {
    return destinyMarks[(state.profile.fortuneSeed || 0) % destinyMarks.length];
  }

  function ritualLabel(routeId) {
    const route = STORY.routes[routeId];
    const key = state.flags[`${routeId}Ritual`];
    return route.ritualNames?.[key] || route.relic;
  }

  function availableReports() {
    const list = STORY.routeOrder.filter(id => state.routes[id]?.completed);
    if (state.finale.completed) list.push('finale');
    return list;
  }

  function finalPrivateLine(choice = state.finale.ending) {
    return ({
      complete: '「你替我把門打開，卻沒有把自己關進來。下次見面，我想看你不靠受傷也敢靠近。」',
      'scroll-only': '「你肯幫我，卻不替我決定。這一筆很難看……也比順從漂亮得多。」',
      refuse: '「你沒有欠我結局。記住今晚抽回手的速度，別只在我面前做得到。」'
    })[normalizeFinalChoice(choice)] || '「命牒不是主人。你才是。」';
  }

  function buildReportData(target) {
    const frameData = STORY.periodFrames[state.profile.period] || STORY.periodFrames.month;
    const mark = destinyMark();
    const alias = reportPrivate ? '無名來客' : (state.profile.alias || '無名來客');
    if (target !== 'finale') {
      const route = STORY.routes[target];
      const rs = state.routes[target];
      const key = rs.result || dominantScoreKey(route, rs);
      const result = route.results[key];
      const future = route.futures?.[key]?.[state.profile.period] || result.sign;
      return {
        target, alias, accent: route.accent, glyph: route.glyph, label: route.label,
        title: `${route.label}・${result.title}`,
        subtitle: `${frameData.label}｜${route.method}｜${omenLabels[state.profile.omen] || '狐火'}起盤`,
        mark: `${mark.name}・${mark.line}`,
        verdict: result.verdict,
        sections: [
          ['問期內可能發生', `${frameData.timing}。${future}`],
          ['先兆', result.sign],
          ['最容易誤讀', result.caution],
          ['只做一件事', result.action],
          ['你帶走的命痕', `${ritualLabel(target)}｜${route.ritualEndings[state.flags[`${target}Ritual`]] || route.relic}`],
          ['九尾私語', `「${route.branchLines[key]}」`]
        ],
        seal: frameData.rule,
        image: 'assets/images/active/08_props/SCROLL_GENERIC_mobile_v47.webp'
      };
    }
    const pattern = STORY.finale.patterns[topBehavior()] || STORY.finale.patterns.agency;
    const challenge = STORY.routes[state.flags.finaleChallenge]?.label || '你最想證明命館看錯的那一卷';
    const routeVerdicts = STORY.routeOrder.map(id => {
      const route = STORY.routes[id];
      return `${route.glyph}・${route.results[state.routes[id].result].title}`;
    }).join('　');
    const endingKey = normalizeFinalChoice(state.finale.ending || state.finale.choice) || 'scroll-only';
    return {
      target: 'finale', alias, accent: STORY.finale.accent, glyph: '牒', label: '真命卷',
      title: `四痕合判・${pattern.title}`,
      subtitle: `${frameData.label}｜九尾手書｜只寫今夜實測內容`,
      mark: `${mark.name}・${mark.line}`,
      verdict: pattern.verdict,
      sections: [
        ['四卷共同模式', `${echoLine()} 四卷判名：${routeVerdicts}`],
        ['前後矛盾', contradictionLine()],
        ['真正優先處理', `${pattern.verdict} 先從${challenge}留下的現實動作開始，不再追加一輪提問。`],
        ['原問期時間窗口', `${frameData.timing}。${pattern.event}`],
        ['一項具體行動', pattern.action],
        ['若維持原模式', `${pattern.event} 但最容易再次把訊號讀成：${pattern.caution}`],
        ['九尾先前沒有說的真相', `${hiddenTruthLine(endingKey)} 四件命痕：${relicSummary()}`],
        ['本次手書結語', finalPrivateLine(endingKey)]
      ],
      seal: `${frameData.rule} 本牒不顯示其他問期，也不替未測的未來補字。`,
      image: 'assets/images/active/08_props/SCROLL_GENERIC_mobile_v47.webp'
    };
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]);
  }


  function renderMemoryScroll() {
    const available = availableReports();
    if (!available.length) return render();
    if (!available.includes(reportView)) reportView = available.includes(state.reportLast) ? state.reportLast : available.at(-1);
    const data = buildReportData(reportView);
    const isFinal = reportView === 'finale';
    const route = isFinal ? null : STORY.routes[reportView];
    const spec = !isFinal && reportView !== 'love' ? routeDestinySpec(route, data) : null;
    const lines = isFinal
      ? finalScrollItems(data)
      : reportView === 'love'
        ? loveDestinyLines(route, state.routes.love)
        : spec.lines;
    const finalLine = isFinal
      ? finalPrivateLine(state.finale.ending)
      : (routeScrollCopy[reportView]?.choices.find(([id]) => id === state.routes[reportView]?.scrollConfirmed)?.[2] || '');
    frame({ mode: 'memory-scroll', route: isFinal ? 'finale' : reportView, art: isFinal ? (STORY.totalScrollArt || STORY.scrollArt) : STORY.scrollArt, kicker: '', title: '', layout: 'destiny-reading', sceneId: 'memory.scroll' });
    const displayLines = finalLine ? [...lines, { label: isFinal ? '封卷' : '末筆', text: finalLine, final: true }] : lines;
    const actions = [
      { label: reportPrivate ? '顯示稱呼' : '隱去稱呼', onClick: () => { reportPrivate = !reportPrivate; renderMemoryScroll(); } }
    ];
    available.forEach(id => {
      if (id === reportView) return;
      actions.push({ label: id === 'finale' ? '看總命牒' : `看${STORY.routes[id].glyph}卷命牒`, onClick: () => { reportView = id; state.reportLast = id; save(false); renderMemoryScroll(); } });
    });
    actions.push({ label: '收回命館', primary: true, onClick: () => {
      const back = memoryReturn || { mode: 'hub', route: null };
      memoryReturn = null;
      state.mode = back.mode === 'memory-scroll' ? 'hub' : back.mode;
      state.route = back.route && STORY.routes[back.route] ? back.route : null;
      if (state.mode === 'route' && !state.route) state.mode = 'hub';
      save(false); render();
    }});

    const theme = isFinal ? 'finale' : reportView === 'love' ? 'love' : spec.theme;
    const scribeImage = isFinal
      ? 'assets/images/active/05_fifth/finale_destiny.webp'
      : reportView === 'love'
        ? 'assets/images/active/01_love/love_destiny_wide.webp'
        : spec.scribeImage;
    const scribeCaption = isFinal
      ? '墨已乾。她只是把那一夜重新攤開，沒有替你改掉任何一句。'
      : reportView === 'love'
        ? '墨已乾。她沒有替你改寫剛才的答案。'
        : '她沒有重寫，只把那一卷已經乾掉的墨重新攤在你面前。';

    showDestinyReader({
      data,
      lines: displayLines,
      visibleCount: displayLines.length,
      writingIndex: -1,
      total: isFinal,
      memory: true,
      prompt: reportPrivate ? '稱呼已經藏起來；命牒內容沒有改。' : '這張只保留你今晚真的走過的結果。',
      controls: actions,
      scribeCaption,
      scribeImage,
      scribeFocus: isFinal ? '50% 50%' : (reportView === 'love' ? '50% 50%' : (spec?.scribeFocus || '50% 50%')),
      theme
    });
  }

  function renderReport() {
    renderMemoryScroll();
  }

  function openReport(target = state.reportLast) {
    const available = availableReports();
    if (!available.length) return;
    reportView = available.includes(target) ? target : available.at(-1);
    state.reportLast = reportView;
    memoryReturn = { mode: state.mode, route: state.route };
    state.mode = 'memory-scroll'; state.route = null;
    save(false); renderMemoryScroll();
  }

  function wrapCanvasText(context, text, x, y, maxWidth, lineHeight, maxLines = 5) {
    const chars = [...String(text)];
    let line = '';
    let lines = 0;
    for (let index = 0; index < chars.length; index += 1) {
      const test = line + chars[index];
      if (context.measureText(test).width > maxWidth && line) {
        context.fillText(line, x, y + lines * lineHeight);
        line = chars[index];
        lines += 1;
        if (lines >= maxLines) break;
      } else line = test;
    }
    if (lines < maxLines && line) context.fillText(line, x, y + lines * lineHeight);
    return y + (Math.min(lines + 1, maxLines) * lineHeight);
  }

  function preload(artData) {
    if (!artData) return;
    new Set([artData.desktop, artData.mobile]).forEach(source => {
      if (!source) return;
      const image = new Image();
      image.src = source;
    });
  }

  function toggleSound() {
    if (!state.sound || !audioUnlocked || audio.paused) {
      state.sound = true;
      audioUnlocked = true;
      refreshTrack(true);
    } else {
      state.sound = false;
      pauseAudio();
    }
    save(false);
  }

  function toggleScenery(forceShow = false) {
    const hidden = forceShow ? false : !el.app.classList.contains('scenery-mode');
    el.app.classList.toggle('scenery-mode', hidden);
    el.scenery.setAttribute('aria-pressed', String(hidden));
    el.restore.hidden = !hidden;
  }

  function openGallery() {
    renderGallery();
    el.viewer.hidden = true;
    el.galleryDialog.showModal();
  }

  function galleryCatalog() {
    const items = [];
    const add = (artData, route = 'none') => {
      if (!artData?.desktop || items.some(item => item.src === artData.desktop)) return;
      items.push({ src: artData.desktop, mobile: artData.mobile || artData.desktop, title: artData.galleryTitle || '命館藏景', route });
    };
    add(STORY.cover.art, 'none');
    STORY.intake.forEach(scene => add(scene.art, 'none'));
    add(STORY.hub.art, 'none');
    STORY.routeOrder.forEach(id => STORY.routes[id].scenes.forEach(scene => {
      add(scene.art, id);
      Object.values(scene.variantArt || {}).forEach(variant => add(variant, id));
      (scene.choices || []).forEach(item => add(item.reactionArt, id));
    }));
    STORY.finale.scenes.forEach(scene => add(scene.art, 'finale'));
    Object.values(STORY.finale.endings).forEach(ending => add(ending.art, 'finale'));
    STORY.finale.rewards.forEach(item => add({ desktop: item.src, mobile: item.mobile, galleryTitle: item.title }, 'finale'));
    return items;
  }

  function renderGallery() {
    const seenSources = new Set(state.seen.map(item => item.src));
    const catalog = galleryCatalog();
    galleryItems = catalog.filter(item => seenSources.has(item.src));
    el.galleryGrid.replaceChildren();
    el.galleryEmpty.hidden = catalog.length > 0;
    catalog.forEach(item => {
      const revealed = seenSources.has(item.src);
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `gallery-tile${revealed ? '' : ' gallery-tile--sealed'}`;
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = revealed ? item.title : '尚未親眼走過的鎖印藏景';
      image.loading = 'lazy';
      const caption = document.createElement('span');
      caption.textContent = revealed ? item.title : `${item.route === 'finale' ? '真命卷' : STORY.routes[item.route]?.label || '命館'}・鎖印未解`;
      tile.append(image, caption);
      if (revealed) tile.addEventListener('click', () => openViewer(galleryItems.findIndex(seen => seen.src === item.src)));
      else {
        tile.setAttribute('aria-label', `${caption.textContent}，需在故事中親眼走過才會顯影`);
        tile.addEventListener('click', () => showToast('這段記憶還沒被你走過。'));
      }
      el.galleryGrid.append(tile);
    });
  }

  function openViewer(index) {
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[galleryIndex];
    el.viewerImage.src = item.src;
    el.viewerImage.alt = item.title;
    el.viewerCaption.textContent = item.title;
    el.viewer.hidden = false;
  }

  function closeViewer() {
    el.viewer.hidden = true;
    el.viewerImage.removeAttribute('src');
  }

  function render() {
    el.app.classList.remove('scenery-mode');
    el.restore.hidden = true;
    el.sound.setAttribute('aria-pressed', String(state.sound));
    el.sound.textContent = state.sound ? (audioUnlocked ? '音' : '啟') : '靜';
    el.report.hidden = availableReports().length === 0;
    if (state.mode === 'intake') renderIntake();
    else if (state.mode === 'hub') renderHub();
    else if (state.mode === 'route') renderRoute();
    else if (state.mode === 'finale' && state.finale.unlocked) renderFinale();
    else if (state.mode === 'memory-scroll') renderMemoryScroll();
    else renderCover();
  }

  el.next.addEventListener('click', () => nextAction?.());
  el.sound.addEventListener('click', toggleSound);
  el.scenery.addEventListener('click', () => toggleScenery());
  el.restore.addEventListener('click', () => toggleScenery(true));
  el.gallery.addEventListener('click', openGallery);
  el.report.addEventListener('click', () => openReport(state.reportLast));
  el.menu?.addEventListener('click', () => {
    const open = !el.app.classList.contains('menu-open');
    el.app.classList.toggle('menu-open', open);
    el.menu.setAttribute('aria-expanded', String(open));
  });
  el.galleryClose.addEventListener('click', () => el.galleryDialog.close());
  el.viewerClose.addEventListener('click', closeViewer);
  el.viewerPrev.addEventListener('click', () => openViewer(galleryIndex - 1));
  el.viewerNext.addEventListener('click', () => openViewer(galleryIndex + 1));
  el.home.addEventListener('click', () => {
    if (!state.started) return renderCover();
    state.mode = 'hub';
    state.route = null;
    save(true);
    renderHub();
  });
  el.brand.addEventListener('click', () => {
    state.mode = 'cover';
    save(false);
    renderCover();
  });
  el.reset.addEventListener('click', () => el.confirm.showModal());
  el.confirm.addEventListener('close', () => {
    if (el.confirm.returnValue !== 'confirm') return;
    pauseAudio();
    localStorage.removeItem(SAVE_KEY);
    LEGACY_SAVE_KEYS.forEach(key => localStorage.removeItem(key));
    state = freshState();
    audioSource = '';
    audioUnlocked = false;
    renderCover();
  });
  el.finalDoor.addEventListener('click', openFinale);
  $$('.door-hotspot').forEach(node => {
    node.addEventListener('mouseenter', () => previewDoor(node.dataset.routeTarget));
    node.addEventListener('focus', () => previewDoor(node.dataset.routeTarget));
    node.addEventListener('click', () => openRoute(node.dataset.routeTarget));
  });
  el.galleryDialog.addEventListener('click', event => {
    if (event.target === el.galleryDialog) el.galleryDialog.close();
  });

  window.addEventListener('resize', () => {
    clearTimeout(scrollResizeTimer);
    scrollResizeTimer = setTimeout(updateScrollPaperPosition, 80);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && el.app.classList.contains('scenery-mode')) return toggleScenery(true);
    if (event.key === 'Escape' && !el.viewer.hidden) return closeViewer();
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement?.tagName) || el.confirm.open || el.galleryDialog.open) return;
    if ((event.key === 'Enter' || event.key === ' ') && !el.next.hidden) {
      event.preventDefault();
      el.next.click();
      return;
    }
    if (/^[1-4]$/.test(event.key)) {
      const buttons = [...el.choices.querySelectorAll('button:not(:disabled)')];
      buttons[Number(event.key) - 1]?.click();
    }
  });

  function petal() {
    if (document.hidden || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = document.createElement('i');
    node.className = 'petal';
    node.style.left = `${Math.random() * 100}%`;
    node.style.setProperty('--fall', `${7 + Math.random() * 6}s`);
    node.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
    el.petals.append(node);
    node.addEventListener('animationend', () => node.remove(), { once: true });
  }

  setInterval(petal, 1250);
  render();
})();
