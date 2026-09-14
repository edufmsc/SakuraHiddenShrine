(() => {
  'use strict';

  const SAVE_KEY = 'sakura-hidden-shrine-v58';
  const REAL_BIRTH_KEY = 'sakura-v58-real-birth-date';

  const hash = text => {
    let value = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      value ^= text.charCodeAt(i);
      value = Math.imul(value, 16777619);
    }
    return value >>> 0;
  };

  const readBirth = object => {
    const direct = object?.profile?.birth;
    if (direct && Number.isInteger(direct.year) && Number.isInteger(direct.month) && Number.isInteger(direct.day)) return direct;
    try {
      const cached = JSON.parse(sessionStorage.getItem(REAL_BIRTH_KEY) || 'null');
      if (cached && Number.isInteger(cached.year) && Number.isInteger(cached.month) && Number.isInteger(cached.day)) return cached;
    } catch {}
    try {
      const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
      const birth = saved?.profile?.birth;
      if (birth && Number.isInteger(birth.year) && Number.isInteger(birth.month) && Number.isInteger(birth.day)) return birth;
    } catch {}
    return null;
  };

  const validBirth = birth => {
    if (!birth) return false;
    const date = new Date(birth.year, birth.month - 1, birth.day);
    return date.getFullYear() === birth.year && date.getMonth() === birth.month - 1 && date.getDate() === birth.day;
  };

  const trueSeed = (object, birth) => {
    if (!validBirth(birth)) return null;
    const alias = String(object?.profile?.alias || '').trim();
    if (!alias) return null;
    let seed = hash(`${alias}|${birth.year}-${birth.month}-${birth.day}`);
    const period = object?.profile?.period;
    if (period) seed = hash(`${seed}|${period}`);
    const omen = object?.profile?.omen;
    if (omen) seed = hash(`${seed}|${omen}`);
    return seed;
  };

  const nativeStringify = JSON.stringify.bind(JSON);
  JSON.stringify = function(value, replacer, space) {
    try {
      const storyVersion = window.SHRINE_STORY?.version;
      const looksLikeShrineState = value
        && typeof value === 'object'
        && value.profile
        && value.routes
        && value.finale
        && (storyVersion == null || value.version === storyVersion);

      if (looksLikeShrineState) {
        const birth = readBirth(value);
        const seed = trueSeed(value, birth);
        if (validBirth(birth)) value.profile.birth = { ...birth };
        if (Number.isInteger(seed)) value.profile.fortuneSeed = seed;
      }
    } catch (error) {
      console.warn('真生日命種同步失敗，沿用原狀態。', error);
    }
    return nativeStringify(value, replacer, space);
  };
})();
