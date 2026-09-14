(() => {
  'use strict';

  const mobileQuery = window.matchMedia('(max-width: 720px)');
  const SAVE_KEY = 'sakura-hidden-shrine-v58';
  const REAL_BIRTH_KEY = 'sakura-v58-real-birth-date';

  // ---------------------------------------------------------------------------
  // 命牒：閱讀保護
  // ---------------------------------------------------------------------------
  const paper = document.getElementById('destinyPaper');
  const ink = document.getElementById('destinyInk');
  const reader = document.getElementById('destinyReader');
  const controls = document.getElementById('destinyControls');
  const prompt = document.getElementById('destinyPrompt');

  let updateFinalGate = () => {};

  if (paper && ink && reader) {
    let autoFollow = !mobileQuery.matches;
    let programmatic = false;
    let followFrame = 0;

    const distanceFromBottom = () => Math.max(0, paper.scrollHeight - paper.clientHeight - paper.scrollTop);

    const updateScrollableState = () => {
      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      paper.classList.toggle('scene-lock-v1-can-scroll', scrollable);
      return scrollable;
    };

    const followLatestInk = () => {
      cancelAnimationFrame(followFrame);
      followFrame = requestAnimationFrame(() => {
        updateScrollableState();
        updateFinalGate();
        if (reader.hidden || !autoFollow || mobileQuery.matches) return;
        programmatic = true;
        paper.scrollTop = paper.scrollHeight;
        requestAnimationFrame(() => { programmatic = false; });
      });
    };

    paper.addEventListener('scroll', () => {
      updateScrollableState();
      if (!programmatic) autoFollow = !mobileQuery.matches && distanceFromBottom() <= 80;
      updateFinalGate();
    }, { passive: true });

    const readerObserver = new MutationObserver(() => {
      if (!reader.hidden) {
        autoFollow = !mobileQuery.matches;
        paper.scrollTop = 0;
        updateScrollableState();
        requestAnimationFrame(updateFinalGate);
      }
    });
    readerObserver.observe(reader, { attributes: true, attributeFilter: ['hidden', 'class'] });

    const inkObserver = new MutationObserver(followLatestInk);
    inkObserver.observe(ink, { childList: true, subtree: true, characterData: true });

    const handleViewportChange = () => {
      autoFollow = !mobileQuery.matches;
      updateScrollableState();
      updateFinalGate();
    };
    mobileQuery.addEventListener?.('change', handleViewportChange);
    window.addEventListener('resize', handleViewportChange, { passive: true });
    updateScrollableState();
  }

  // ---------------------------------------------------------------------------
  // 生辰相容：正式規則只有「必須成年」，不設 90 歲上限。
  // 舊核心仍限制 90 年，因此舊年份只在提交瞬間使用同閏年型態的代理年份通過舊驗證；
  // 真實生日會寫回存檔，fortuneSeed 也永遠以真實生日重算。
  // ---------------------------------------------------------------------------
  const birthCompat = {
    realYear: null,
    surrogateYear: null,
    month: null,
    day: null
  };

  const destinyMarks = [
    { name: '水鏡命種', glyph: '澄', line: '先感覺，再替感覺尋找證據。' },
    { name: '櫻木命種', glyph: '生', line: '擅長讓關係與事情延續，也容易多撐一段。' },
    { name: '狐火命種', glyph: '燄', line: '能在強烈裡迅速決定，必須留意退潮後還剩什麼。' },
    { name: '玄金命種', glyph: '刃', line: '會追問規則與真相，答案清楚後要記得落刀。' },
    { name: '門土命種', glyph: '守', line: '能承接、能守住，真正的課題是知道何時關門。' }
  ];

  const hash = text => {
    let value = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      value ^= text.charCodeAt(i);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  };

  const isLeapYear = year => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

  const chooseSurrogateYear = realYear => {
    const nowYear = new Date().getFullYear();
    const min = nowYear - 90;
    const max = nowYear - 18;
    const wantedMod = ((realYear % 4) + 4) % 4;
    const wantedLeap = isLeapYear(realYear);
    for (let year = min; year <= max; year += 1) {
      if (((year % 4) + 4) % 4 === wantedMod && isLeapYear(year) === wantedLeap) return year;
    }
    return min;
  };

  const readSavedState = () => {
    try {
      return JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    } catch {
      return null;
    }
  };

  const readCachedBirth = () => {
    try {
      const cached = JSON.parse(sessionStorage.getItem(REAL_BIRTH_KEY) || 'null');
      if (cached && Number.isInteger(cached.year)) return cached;
    } catch {}
    const saved = readSavedState();
    const birth = saved?.profile?.birth;
    if (birth && Number.isInteger(birth.year)) return birth;
    return null;
  };

  const cacheBirth = () => {
    if (!Number.isInteger(birthCompat.realYear)) return;
    const birth = {
      year: birthCompat.realYear,
      month: Number.isInteger(birthCompat.month) ? birthCompat.month : null,
      day: Number.isInteger(birthCompat.day) ? birthCompat.day : null
    };
    sessionStorage.setItem(REAL_BIRTH_KEY, JSON.stringify(birth));
  };

  const restoreBirthCache = () => {
    if (Number.isInteger(birthCompat.realYear)) return;
    const cached = readCachedBirth();
    if (!cached) return;
    birthCompat.realYear = cached.year;
    birthCompat.surrogateYear = chooseSurrogateYear(cached.year);
    birthCompat.month = Number.isInteger(cached.month) ? cached.month : null;
    birthCompat.day = Number.isInteger(cached.day) ? cached.day : null;
  };

  const validBirth = birth => {
    if (!birth || !Number.isInteger(birth.year) || !Number.isInteger(birth.month) || !Number.isInteger(birth.day)) return false;
    const date = new Date(birth.year, birth.month - 1, birth.day);
    return date.getFullYear() === birth.year && date.getMonth() === birth.month - 1 && date.getDate() === birth.day;
  };

  const calculateTrueSeed = (state, birth) => {
    if (!validBirth(birth)) return null;
    const alias = String(state?.profile?.alias || '').trim();
    if (!alias) return null;
    let seed = hash(`${alias}|${birth.year}-${birth.month}-${birth.day}`);
    const period = state?.profile?.period;
    if (period) seed = hash(`${seed}|${period}`);
    const omen = state?.profile?.omen;
    if (omen) seed = hash(`${seed}|${omen}`);
    return seed;
  };

  const rewriteSavedState = raw => {
    try {
      const state = JSON.parse(raw);
      if (!state || typeof state !== 'object') return raw;
      const birth = readCachedBirth();
      if (!validBirth(birth)) return raw;
      state.profile = { ...(state.profile || {}), birth: { ...birth } };
      const seed = calculateTrueSeed(state, birth);
      if (Number.isInteger(seed)) state.profile.fortuneSeed = seed;
      return JSON.stringify(state);
    } catch {
      return raw;
    }
  };

  // 所有後續核心 save 都會保留真生日 seed，避免代理年份再次覆蓋。
  const nativeSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function(key, value) {
    if (this === localStorage && key === SAVE_KEY) {
      return nativeSetItem.call(this, key, rewriteSavedState(String(value)));
    }
    return nativeSetItem.call(this, key, value);
  };

  const trueDestinyMark = () => {
    const saved = readSavedState();
    const birth = saved?.profile?.birth || readCachedBirth();
    const seed = calculateTrueSeed(saved, birth);
    return Number.isInteger(seed) ? destinyMarks[seed % destinyMarks.length] : null;
  };

  const patchDestinyMarkVisuals = () => {
    const mark = trueDestinyMark();
    if (!mark) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      let text = node.nodeValue || '';
      let next = text;
      destinyMarks.forEach(old => {
        next = next
          .replaceAll(`${old.name}｜${old.line}`, `${mark.name}｜${mark.line}`)
          .replaceAll(`${old.name}・${old.line}`, `${mark.name}・${mark.line}`);
      });
      if (next !== text) node.nodeValue = next;
    });
  };

  const patchBirthVisual = () => {
    restoreBirthCache();
    if (!Number.isInteger(birthCompat.realYear) || !Number.isInteger(birthCompat.surrogateYear)) return;

    const yearCoin = document.querySelector('.birth-coin[data-coin="year"] small');
    if (yearCoin && yearCoin.textContent.trim() === String(birthCompat.surrogateYear)) {
      yearCoin.textContent = String(birthCompat.realYear);
    }

    document.querySelectorAll('.beat-text').forEach(node => {
      const text = node.textContent || '';
      if (text.includes(String(birthCompat.surrogateYear))) {
        node.textContent = text.replaceAll(String(birthCompat.surrogateYear), String(birthCompat.realYear));
      }
    });
  };

  document.addEventListener('submit', event => {
    const form = event.target.closest?.('.birth-ritual');
    if (!form || form.classList.contains('birth-ritual--complete')) return;

    const input = form.querySelector('input[name="value"]');
    const activeCoin = form.querySelector('.birth-coin.is-active')?.dataset.coin;
    const note = form.querySelector('.form-note');
    if (!input || !activeCoin) return;

    const raw = Number(input.value);
    if (!Number.isInteger(raw)) return;

    if (activeCoin === 'year') {
      const nowYear = new Date().getFullYear();
      const latestAdultYear = nowYear - 18;
      if (raw > latestAdultYear || raw < 1) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (note) note.textContent = raw > latestAdultYear
          ? '命館只替成年人開卷；請輸入已滿 18 歲的出生年份。'
          : '請輸入有效的出生年份。';
        input.focus();
        return;
      }

      birthCompat.realYear = raw;
      birthCompat.surrogateYear = chooseSurrogateYear(raw);
      birthCompat.month = null;
      birthCompat.day = null;
      cacheBirth();

      const legacyMin = nowYear - 90;
      if (raw < legacyMin) {
        input.min = '1';
        input.value = String(birthCompat.surrogateYear);
        requestAnimationFrame(patchBirthVisual);
      }
      return;
    }

    restoreBirthCache();

    if (activeCoin === 'month') {
      birthCompat.month = raw;
      cacheBirth();
      return;
    }

    if (activeCoin === 'day') {
      birthCompat.day = raw;
      cacheBirth();
      if (!Number.isInteger(birthCompat.realYear) || !Number.isInteger(birthCompat.month)) return;

      const date = new Date(birthCompat.realYear, birthCompat.month - 1, raw);
      const valid = date.getFullYear() === birthCompat.realYear
        && date.getMonth() === birthCompat.month - 1
        && date.getDate() === raw;
      if (!valid) {
        event.preventDefault();
        event.stopImmediatePropagation();
        if (note) note.textContent = '這一天不存在。前兩枚已保留，只要重新輸入正確的日期。';
        input.value = '';
        birthCompat.day = null;
        cacheBirth();
        input.focus();
      }
    }
  }, true);

  // 完成生日後讓核心先 save；下一個 event loop 再清 session 快取。
  // 真生日已經被 Storage 攔截器寫進 profile.birth，所以不會遺失。
  document.addEventListener('click', event => {
    const button = event.target.closest?.('.choice-button--story-lead');
    if (!button || !document.querySelector('.birth-ritual--complete')) return;
    setTimeout(() => {
      sessionStorage.removeItem(REAL_BIRTH_KEY);
      birthCompat.realYear = null;
      birthCompat.surrogateYear = null;
      birthCompat.month = null;
      birthCompat.day = null;
      patchDestinyMarkVisuals();
    }, 0);
  }, true);

  const birthObserver = new MutationObserver(() => {
    const yearInput = document.querySelector('.birth-ritual .birth-coin[data-coin="year"].is-active')
      ?.closest('.birth-ritual')?.querySelector('input[name="value"]');
    if (yearInput) yearInput.min = '1';
    patchBirthVisual();
    patchDestinyMarkVisuals();
  });
  birthObserver.observe(document.body, { childList: true, subtree: true, characterData: true });

  // ---------------------------------------------------------------------------
  // 真結流程：玩家完整讀完總命牒後，才解鎖一次具有戲劇意義的終幕操作。
  // ---------------------------------------------------------------------------
  if (controls && paper) {
    const finalLabel = '收下命牒・看見黎明';

    const findFinalButton = () => [...controls.querySelectorAll('button')].find(button =>
      button.textContent.trim() === '走向黎明' ||
      button.textContent.trim() === '走向黎明・櫻隱終幕' ||
      button.classList.contains('v58-final-accept-control')
    ) || null;

    updateFinalGate = () => {
      const dawn = findFinalButton();
      if (!dawn) {
        controls.classList.remove('v58-final-reading-gate');
        return;
      }

      controls.classList.add('v58-final-reading-gate');
      dawn.classList.add('v58-final-accept-control');
      if (dawn.textContent.trim() !== finalLabel) dawn.textContent = finalLabel;

      const scrollable = paper.scrollHeight > paper.clientHeight + 4;
      const readToEnd = !scrollable || (paper.scrollHeight - paper.clientHeight - paper.scrollTop) <= 42;
      dawn.disabled = !readToEnd;
      dawn.setAttribute('aria-disabled', String(!readToEnd));
      dawn.setAttribute('aria-label', readToEnd ? '收下命牒並進入櫻隱終幕' : '請先讀到命牒最後一行');

      if (prompt) {
        prompt.hidden = false;
        const copy = readToEnd
          ? '最後一行已經讀完。這一夜只剩你自己願不願意把它收下。'
          : '先把這一卷看完。滑到最後一行後，門外的天光才會亮起。';
        if (prompt.textContent !== copy) prompt.textContent = copy;
      }
    };

    const controlObserver = new MutationObserver(() => requestAnimationFrame(updateFinalGate));
    controlObserver.observe(controls, { childList: true });
    paper.addEventListener('scroll', updateFinalGate, { passive: true });
    requestAnimationFrame(updateFinalGate);
  }

  // ---------------------------------------------------------------------------
  // 手機功能選單：單字圖章旁提供完整功能名稱。
  // ---------------------------------------------------------------------------
  const app = document.getElementById('app');
  const menu = document.getElementById('menuBtn');
  const toolbarActions = document.getElementById('toolbarActions');

  if (app && menu && toolbarActions) {
    const labels = {
      soundBtn: '音樂',
      sceneryBtn: '只看場景',
      galleryBtn: '藏景',
      reportBtn: '命牒',
      homeBtn: '回四門',
      resetBtn: '重新起盤'
    };

    Object.entries(labels).forEach(([id, label]) => {
      const button = document.getElementById(id);
      if (button) button.dataset.mobileLabel = label;
    });

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

    mobileQuery.addEventListener?.('change', event => {
      if (!event.matches) closeMenu();
    });

    syncMenuLabel();
  }
})();
