import { chromium } from 'playwright';
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const server = spawn('python3', ['-m', 'http.server', '4173', '--bind', '127.0.0.1'], { stdio: 'ignore' });
await new Promise(resolve => setTimeout(resolve, 1200));

const devices = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 }
];

fs.mkdirSync('qa-artifacts', { recursive: true });
const report = { generatedAt: new Date().toISOString(), runs: [] };
const browser = await chromium.launch({ headless: true });
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function waitForSceneImage(page) {
  await page.waitForFunction(() => {
    const img = document.querySelector('#sceneImage');
    if (!img) return true;
    return img.complete && img.naturalWidth > 0;
  }, { timeout: 3500 }).catch(() => {});
}

async function snapshot(page) {
  await waitForSceneImage(page);
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
      imageNatural: [img?.naturalWidth || 0, img?.naturalHeight || 0],
      overflowX: document.documentElement.scrollWidth > innerWidth + 2,
      readerVisible: visible(document.querySelector('#destinyReader')),
      doorVisible: visible(document.querySelector('#doorStage')),
      missingImages: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
      bodyText: document.body.innerText.slice(0, 1600)
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
        await sleep(120);
        return true;
      }
    }
  }
  return false;
}

async function fillVisibleForm(page, log) {
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
    await sleep(120);
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

async function progressOne(page, log) {
  if (await fillVisibleForm(page, log)) return true;

  const appMode = await page.locator('#app').getAttribute('data-mode').catch(() => '');
  if (appMode === 'hub' || await page.locator('#doorStage').isVisible().catch(() => false)) {
    if (await chooseDoor(page, log)) return true;
  }

  if (await page.locator('#destinyReader').isVisible().catch(() => false)) {
    const paper = page.locator('#destinyPaper');
    if (await paper.count()) await paper.evaluate(el => { el.scrollTop = el.scrollHeight; });
    await sleep(80);
    if (await clickFirst(page, ['#destinyControls button:not([disabled])'])) {
      log.push('destiny control');
      return true;
    }
  }

  if (await clickFirst(page, ['#continueBtn:not([hidden])'])) {
    log.push('continue');
    return true;
  }
  if (await clickFirst(page, ['#choices .choice-button--primary', '#choices .choice-button', '#choices button'])) {
    log.push('choice');
    return true;
  }
  if (await clickFirst(page, ['#finalDoorBtn:not([hidden])'])) {
    log.push('final door direct');
    return true;
  }
  return false;
}

async function runDevice(device) {
  const context = await browser.newContext({ viewport: { width: device.width, height: device.height } });
  const page = await context.newPage();
  const consoleErrors = [];
  const requestFailures = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push(String(err)));
  page.on('requestfailed', req => requestFailures.push(`${req.method()} ${req.url()} :: ${req.failure()?.errorText || 'failed'}`));

  await page.goto('http://127.0.0.1:4173/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.reload({ waitUntil: 'networkidle' });

  const log = [];
  const states = [];
  const seenScenes = new Set();
  let stalled = false;
  let imageFailure = false;

  for (let step = 0; step < 620; step += 1) {
    const s = await snapshot(page);
    states.push({ step, mode:s.mode, scene:s.scene, title:s.title, image:s.image.split('/').pop(), overflowX:s.overflowX });
    if (s.scene) seenScenes.add(s.scene);

    if (s.imageNatural[0] === 0 || s.missingImages.length) {
      imageFailure = true;
      log.push(`image failure at ${s.scene || s.mode}: ${s.missingImages.join(', ') || s.image}`);
      break;
    }
    if (s.overflowX) log.push(`horizontal overflow at ${s.scene || s.mode}`);

    const saved = await page.evaluate(() => {
      try { return JSON.parse(localStorage.getItem('sakura-hidden-shrine-v58') || '{}'); } catch { return {}; }
    });
    if (saved?.finale?.completed && saved?.flags?.finalDawnSeen) {
      log.push('completed finale and dawn');
      break;
    }

    const progressed = await progressOne(page, log);
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
    await sleep(100);
  }

  const finalState = await page.evaluate(() => {
    try { return JSON.parse(localStorage.getItem('sakura-hidden-shrine-v58') || '{}'); } catch { return {}; }
  });

  await page.screenshot({ path: `qa-artifacts/${device.name}-final.png`, fullPage: true });
  fs.writeFileSync(`qa-artifacts/${device.name}-states.json`, JSON.stringify(states, null, 2));

  const completedRoutes = ['love','career','life','forbidden'].filter(id => finalState.routes?.[id]?.completed);
  const result = {
    device: device.name,
    viewport: [device.width, device.height],
    stalled,
    imageFailure,
    completedRoutes,
    finaleCompleted: Boolean(finalState.finale?.completed),
    finalDawnSeen: Boolean(finalState.flags?.finalDawnSeen),
    seenSceneCount: seenScenes.size,
    seenScenes: [...seenScenes],
    consoleErrors,
    requestFailures,
    log
  };

  await context.close();
  return result;
}

try {
  for (const device of devices) report.runs.push(await runDevice(device));
} finally {
  await browser.close();
  server.kill('SIGTERM');
}

fs.writeFileSync('qa-artifacts/report.json', JSON.stringify(report, null, 2));
const md = ['# Main Full Browser QA', ''];
for (const run of report.runs) {
  md.push(`## ${run.device}`);
  md.push(`- Stalled: ${run.stalled}`);
  md.push(`- Image failure: ${run.imageFailure}`);
  md.push(`- Completed routes: ${run.completedRoutes.join(', ') || 'none'}`);
  md.push(`- Finale completed: ${run.finaleCompleted}`);
  md.push(`- Dawn seen: ${run.finalDawnSeen}`);
  md.push(`- Scenes reached: ${run.seenSceneCount}`);
  md.push(`- Console errors: ${run.consoleErrors.length}`);
  md.push(`- Failed requests: ${run.requestFailures.length}`);
  md.push(`- Last log: ${run.log.slice(-10).join(' | ')}`);
  md.push('');
}
fs.writeFileSync('qa-artifacts/report.md', md.join('\n'));

const failures = [];
for (const run of report.runs) {
  if (run.stalled) failures.push(`${run.device}: flow stalled`);
  if (run.imageFailure) failures.push(`${run.device}: image failed`);
  if (run.completedRoutes.length !== 4) failures.push(`${run.device}: only ${run.completedRoutes.length}/4 routes completed`);
  if (!run.finaleCompleted) failures.push(`${run.device}: finale not completed`);
  if (!run.finalDawnSeen) failures.push(`${run.device}: dawn not reached`);
  failures.push(...run.consoleErrors.map(e => `${run.device}: console ${e}`));
  failures.push(...run.requestFailures.filter(x => !x.includes('.ogg')).map(e => `${run.device}: request ${e}`));
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
}
