import { chromium } from 'playwright';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], { stdio: 'ignore' });
await new Promise(resolve => setTimeout(resolve, 1200));

const devices = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];
const choiceOffsets = [0, 1, 2, 3];

fs.mkdirSync('qa-artifacts', { recursive: true });
const report = { generatedAt: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const hash = text => {
  let value = 2166136261;
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
};

const expectedSeed = state => {
  let seed = hash(`${state.profile.alias}|1877-8-18`);
  if (state.profile.period) seed = hash(`${seed}|${state.profile.period}`);
  if (state.profile.omen) seed = hash(`${seed}|${state.profile.omen}`);
  return seed;
};

async function settleSceneImage(page) {
  const before = await page.locator('#sceneImage').getAttribute('src').catch(() => '');
  await sleep(100);
  await page.waitForFunction(previous => {
    const img = document.querySelector('#sceneImage');
    if (!img) return true;
    const src = img.getAttribute('src') || '';
    return src !== previous || img.complete;
  }, before, { timeout: 4500 }).catch(() => {});
  await page.locator('#sceneImage').evaluate(async img => {
    if (!img) return;
    try {
      if (typeof img.decode === 'function') await Promise.race([
        img.decode(), new Promise(resolve => setTimeout(resolve, 1800))
      ]);
    } catch {}
  }).catch(() => {});
  await sleep(40);
}

async function snapshot(page) {
  await settleSceneImage(page);
  return page.evaluate(() => {
    const app = document.querySelector('#app');
    const img = document.querySelector('#sceneImage');
    const visible = el => !!el && !el.hidden && getComputedStyle(el).display !== 'none' && getComputedStyle(el).visibility !== 'hidden';
    return {
      mode: app?.dataset.mode || '',
      scene: app?.dataset.scene || '',
      layout: app?.dataset.layout || '',
      title: document.querySelector('#sceneTitle')?.textContent?.trim() || '',
      image: img?.currentSrc || img?.src || '',
      imageAttr: img?.getAttribute('src') || '',
      imageComplete: Boolean(img?.complete),
      imageNatural: [img?.naturalWidth || 0, img?.naturalHeight || 0],
      overflowX: document.documentElement.scrollWidth > innerWidth + 2,
      readerVisible: visible(document.querySelector('#destinyReader')),
      doorVisible: visible(document.querySelector('#doorStage'))
    };
  });
}

async function clickFirst(page, selectors) {
  for (const selector of selectors) {
    const items = page.locator(selector);
    const count = await items.count();
    for (let i = 0; i < count; i += 1) {
      const item = items.nth(i);
      if (await item.isVisible().catch(() => false) && await item.isEnabled().catch(() => false)) {
        await item.click({ timeout: 2500 }).catch(() => {});
        await sleep(115);
        return true;
      }
    }
  }
  return false;
}

async function clickChoiceByOffset(page, offset, log) {
  const items = page.locator('#choices .choice-button');
  const usable = [];
  const count = await items.count();
  for (let i = 0; i < count; i += 1) {
    const item = items.nth(i);
    if (await item.isVisible().catch(() => false) && await item.isEnabled().catch(() => false)) usable.push(item);
  }
  if (!usable.length) return false;
  const index = offset % usable.length;
  const label = (await usable[index].textContent().catch(() => '') || '').trim().replace(/\s+/g, ' ');
  await usable[index].click({ timeout: 2500 }).catch(() => {});
  log.push(`choice[${index + 1}/${usable.length}] ${label}`);
  await sleep(125);
  return true;
}

async function fillVisibleForm(page, log, flags) {
  const alias = page.locator('input[name="alias"]:visible');
  if (await alias.count()) {
    await alias.fill('測試者');
    await alias.locator('xpath=ancestor::form').evaluate(form => form.requestSubmit());
    log.push('filled alias');
    await sleep(120);
    return true;
  }

  const birth = page.locator('.birth-ritual input[name="value"]:visible');
  if (await birth.count()) {
    const active = await page.locator('.birth-coin.is-active').getAttribute('data-coin').catch(() => '');
    const value = active === 'year' ? '1877' : active === 'month' ? '8' : '18';
    await birth.fill(value);
    await birth.locator('xpath=ancestor::form').evaluate(form => form.requestSubmit());
    log.push(`filled birth ${active}=${value}`);
    if (active === 'day') flags.birthDaySubmitted = true;
    await sleep(135);
    return true;
  }
  return false;
}

async function chooseDoor(page, log) {
  const state = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('sakura-hidden-shrine-v58') || '{}'); } catch { return {}; }
  });
  for (const id of ['love','career','life','forbidden']) {
    if (!state.routes?.[id]?.completed) {
      const btn = page.locator(`[data-route-target="${id}"]`);
      if (await btn.isVisible().catch(() => false)) {
        await btn.click();
        log.push(`door ${id}`);
        await sleep(140);
        return true;
      }
    }
  }
  const finalDoor = page.locator('#finalDoorBtn');
  if (await finalDoor.isVisible().catch(() => false) && await finalDoor.isEnabled().catch(() => false)) {
    await finalDoor.click();
    log.push('final door');
    await sleep(140);
    return true;
  }
  return false;
}

async function progressDestinyReader(page, log) {
  const reader = page.locator('#destinyReader');
  if (!await reader.isVisible().catch(() => false)) return false;

  const paper = page.locator('#destinyPaper');
  if (await paper.count()) {
    const written = await paper.evaluate(el => el.classList.contains('is-written')).catch(() => true);
    if (!written) {
      await paper.click({ position: { x: 24, y: 24 } }).catch(() => {});
      log.push('skip destiny handwriting');
      await sleep(130);
    }
    await paper.evaluate(el => { el.scrollTop = el.scrollHeight; });
  }

  await page.waitForFunction(() => [...document.querySelectorAll('#destinyControls button')]
    .some(button => !button.disabled && getComputedStyle(button).display !== 'none'), { timeout: 2500 }).catch(() => {});

  if (await clickFirst(page, ['#destinyControls button:not([disabled])'])) {
    log.push('destiny control');
    return true;
  }
  return false;
}

async function progressOne(page, log, flags, choiceOffset, choiceHistory) {
  if (await fillVisibleForm(page, log, flags)) return true;

  const birthComplete = page.locator('.birth-ritual--complete');
  if (await birthComplete.count() && await birthComplete.isVisible().catch(() => false)) flags.birthCompleteSeen = true;

  const app = page.locator('#app');
  const appMode = await app.getAttribute('data-mode').catch(() => '');
  const scene = await app.getAttribute('data-scene').catch(() => '');

  if (appMode === 'hub' || await page.locator('#doorStage').isVisible().catch(() => false)) {
    if (await chooseDoor(page, log)) return true;
  }

  if (await progressDestinyReader(page, log)) return true;

  if (await clickFirst(page, ['#continueBtn:not([hidden])'])) {
    log.push('continue');
    return true;
  }

  // 每個故事場景第一次依矩陣測第 N 個選項；若副功能（例如重看命牒）回到同一幕，
  // 第二次改走第 1 個主線選項，避免 QA 自己製造無限回顧循環。
  if (appMode === 'route' || appMode === 'finale') {
    const key = `${appMode}:${scene}`;
    const effectiveOffset = choiceHistory.has(key) ? 0 : choiceOffset;
    if (await clickChoiceByOffset(page, effectiveOffset, log)) {
      choiceHistory.add(key);
      return true;
    }
  } else if (await clickFirst(page, ['#choices .choice-button--primary', '#choices .choice-button', '#choices button'])) {
    log.push(`intake choice at ${scene}`);
    return true;
  }

  if (await clickFirst(page, ['#finalDoorBtn:not([hidden])'])) {
    log.push('final door direct');
    return true;
  }
  return false;
}

async function runScenario(device, choiceOffset) {
  const scenario = `${device.name}-choice${choiceOffset + 1}`;
  const context = await browser.newContext({ viewport: { width: device.width, height: device.height } });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  const badResponses = [];

  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(String(err)));
  page.on('requestfailed', req => requestFailures.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText || 'failed'}`));
  page.on('response', response => { if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`); });

  await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: 'networkidle' });

  const log = [];
  const states = [];
  const seenScenes = new Set();
  const choiceHistory = new Set();
  const flags = { birthDaySubmitted:false, birthCompleteSeen:false, birthReturnedToCover:false };
  let stalled = false;
  let brokenImage = false;
  let horizontalOverflow = false;

  for (let step = 0; step < 320; step += 1) {
    const s = await snapshot(page);
    states.push({ step, mode:s.mode, scene:s.scene, title:s.title, image:s.image.split('/').pop(), imageComplete:s.imageComplete, imageNatural:s.imageNatural, overflowX:s.overflowX });
    if (s.scene) seenScenes.add(s.scene);

    if (s.overflowX) { horizontalOverflow = true; log.push(`horizontal overflow at ${s.scene || s.mode}`); }
    const matchingBadImage = badResponses.find(entry => {
      const name = (s.imageAttr || s.image).split('/').pop();
      return name && entry.includes(name);
    });
    if (matchingBadImage) {
      brokenImage = true;
      log.push(`broken image at ${s.scene || s.mode}: ${matchingBadImage}`);
      break;
    }

    if (flags.birthDaySubmitted && s.mode === 'cover') {
      flags.birthReturnedToCover = true;
      log.push('BIRTH BUG: returned to cover after birthday submission');
      break;
    }

    const saved = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('sakura-hidden-shrine-v58') || '{}'); } catch { return {}; }
    });
    if (saved?.finale?.completed && saved?.flags?.finalDawnSeen) {
      log.push('completed finale and dawn');
      break;
    }

    const progressed = await progressOne(page, log, flags, choiceOffset, choiceHistory);
    if (!progressed) {
      const fallback = await clickFirst(page, [
        '.story-panel button:not([hidden]):not([disabled])',
        '.final-coda button:not([disabled])',
        '#doorStage button:not([hidden]):not([disabled])'
      ]);
      if (!fallback) {
        stalled = true;
        log.push(`STALLED at mode=${s.mode} scene=${s.scene} title=${s.title}`);
        break;
      }
    }
    await sleep(95);
  }

  const finalState = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('sakura-hidden-shrine-v58') || '{}'); } catch { return {}; }
  });
  const birth = finalState.profile?.birth || null;
  const trueBirthSaved = birth?.year === 1877 && birth?.month === 8 && birth?.day === 18;
  const expected = finalState.profile ? expectedSeed(finalState) : null;
  const seedMatchesTrueBirth = Number.isInteger(expected) && finalState.profile?.fortuneSeed === expected;

  await page.screenshot({ path: `qa-artifacts/${scenario}-final.png`, fullPage: true });
  fs.writeFileSync(`qa-artifacts/${scenario}-states.json`, JSON.stringify(states, null, 2));

  const completedRoutes = ['love','career','life','forbidden'].filter(id => finalState.routes?.[id]?.completed);
  const result = {
    scenario,
    device: device.name,
    choiceOffset,
    stalled,
    brokenImage,
    horizontalOverflow,
    birth: flags,
    trueBirthSaved,
    seedMatchesTrueBirth,
    actualSeed: finalState.profile?.fortuneSeed ?? null,
    expectedSeed: expected,
    period: finalState.profile?.period || null,
    omen: finalState.profile?.omen || null,
    finalChoice: finalState.finale?.choice || null,
    finalEnding: finalState.finale?.ending || null,
    completedRoutes,
    finaleCompleted: Boolean(finalState.finale?.completed),
    finalDawnSeen: Boolean(finalState.flags?.finalDawnSeen),
    seenSceneCount: seenScenes.size,
    seenScenes: [...seenScenes],
    consoleErrors,
    requestFailures,
    badResponses,
    log
  };
  await context.close();
  return result;
}

try {
  for (const device of devices) {
    for (const choiceOffset of choiceOffsets) report.runs.push(await runScenario(device, choiceOffset));
  }
} finally {
  await browser.close();
  server.kill('SIGTERM');
}

fs.writeFileSync('qa-artifacts/report.json', JSON.stringify(report, null, 2));
const md = ['# Main Choice Matrix Browser QA', ''];
for (const run of report.runs) {
  md.push(`## ${run.scenario}`);
  md.push(`- Stalled: ${run.stalled}`);
  md.push(`- Broken image: ${run.brokenImage}`);
  md.push(`- Horizontal overflow: ${run.horizontalOverflow}`);
  md.push(`- Birth returned to cover: ${run.birth.birthReturnedToCover}`);
  md.push(`- True birth saved: ${run.trueBirthSaved}`);
  md.push(`- Seed matches true birth: ${run.seedMatchesTrueBirth}`);
  md.push(`- Period / omen: ${run.period} / ${run.omen}`);
  md.push(`- Final choice / ending: ${run.finalChoice} / ${run.finalEnding}`);
  md.push(`- Completed routes: ${run.completedRoutes.join(', ') || 'none'}`);
  md.push(`- Finale / dawn: ${run.finaleCompleted} / ${run.finalDawnSeen}`);
  md.push(`- Scenes reached: ${run.seenSceneCount}`);
  md.push(`- Console errors / failed requests / bad HTTP: ${run.consoleErrors.length} / ${run.requestFailures.length} / ${run.badResponses.length}`);
  md.push(`- Last log: ${run.log.slice(-10).join(' | ')}`);
  md.push('');
}
fs.writeFileSync('qa-artifacts/report.md', md.join('\n'));

const failures = [];
for (const run of report.runs) {
  if (run.stalled) failures.push(`${run.scenario}: flow stalled`);
  if (run.brokenImage) failures.push(`${run.scenario}: broken image`);
  if (run.horizontalOverflow) failures.push(`${run.scenario}: horizontal overflow`);
  if (run.birth.birthReturnedToCover) failures.push(`${run.scenario}: birthday returned to cover`);
  if (!run.birth.birthDaySubmitted) failures.push(`${run.scenario}: birthday day was never submitted`);
  if (!run.trueBirthSaved) failures.push(`${run.scenario}: real birth was not persisted`);
  if (!run.seedMatchesTrueBirth) failures.push(`${run.scenario}: fortuneSeed does not match real birth`);
  if (run.completedRoutes.length !== 4) failures.push(`${run.scenario}: only ${run.completedRoutes.length}/4 routes completed`);
  if (!run.finaleCompleted) failures.push(`${run.scenario}: finale not completed`);
  if (!run.finalDawnSeen) failures.push(`${run.scenario}: dawn not reached`);
  failures.push(...run.consoleErrors.map(e => `${run.scenario}: console ${e}`));
  failures.push(...run.requestFailures.filter(x => !x.includes('.ogg')).map(e => `${run.scenario}: request ${e}`));
  failures.push(...run.badResponses.filter(x => !x.includes('.ogg') && !x.includes('favicon')).map(e => `${run.scenario}: HTTP ${e}`));
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
