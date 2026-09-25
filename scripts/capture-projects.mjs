// Screenshots of each live project for the Projects page: a 1440×900 viewport
// at 2× (raw PNG in .shots-raw/, gitignored), encoded to 16:10 WebP in
// public/img/projects/ (1600×1000) and public/img/projects/thumbs/ (800×500).
//
// Manual only — never part of `npm run build`:
//
//   npm run shots                               # every target
//   npm run shots -- --only relicaria,abcp-2026 # a subset
//   npm run shots -- --headed                   # visible browser; you can click along
//   npm run shots -- --keep-going               # don't stop on unexpected errors
//   npm run shots -- --config other.json        # another target list
//
// Targets live in scripts/projects.capture.json:
//   { slug, url, kind: 'streamlit' | 'static',
//     waitFor?: selector that must be visible,
//     waitForHidden?: selector that must disappear (e.g. a loading bar),
//     hide?: selectors hidden with injected CSS,
//     clickBefore?: selectors clicked in order (one click into a tab/section),
//     scrollTo?: selector scrolled to the top of its scroll container,
//     delayMs?: extra settle time before the capture,
//     clock?: ISO datetime to freeze Date at (for time-dependent pages),
//     seed?: integer seeding Math.random (for layouts that are random per load),
//     timeoutMs?: per-wait timeout (default 120 s),
//     note?: free text, ignored }
// Selectors are Playwright selectors, so `text=…`, `:has-text()` and
// `>> visible=true` work too.
//
// A capture FAILS (the existing WebP is kept, the run continues, exit code 1)
// when the viewport shows sleeping/error text or the image is nearly uniform.
// Unexpected errors (a selector that never appears, a navigation timeout) stop
// the run unless --keep-going is passed; either way the exit code is 1.
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { launch, parseArgs } from './qa/lib.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const RAW_DIR = join(ROOT, '.shots-raw');
const OUT_DIR = join(ROOT, 'public', 'img', 'projects');
const SIZES = [
  { label: '1600', dir: OUT_DIR, width: 1600, height: 1000, quality: 82 },
  { label: '800', dir: join(OUT_DIR, 'thumbs'), width: 800, height: 500, quality: 80 },
];

const VIEWPORT = { width: 1440, height: 900 };
const SCALE = 2;
const DEFAULT_TIMEOUT = 120_000;
const WAKE_TIMEOUT = 5 * 60_000;
const MIN_STDEV = 6;
const BAD_TEXT = /\b(gone to sleep|oven|error|exception|traceback|404|not found)\b/i;
const SLEEP_TEXT = /gone to sleep|waking up|in the oven|zzzz|just a sec|spinning up/i;
const WAKE_BUTTON = /get this app back up|wake/i;

// Streamlit's own chrome plus Streamlit Community Cloud's (Manage app button,
// profile/crown badge). Hover-only controls are included so the pointer
// position can't leak into the shot.
const STREAMLIT_CHROME = [
  '[data-testid="stHeader"]',
  '[data-testid="stToolbar"]',
  '[data-testid="stDecoration"]',
  '[data-testid="stStatusWidget"]',
  '[data-testid="stAppDeployButton"]',
  '[data-testid="manage-app-button"]',
  '[data-testid="stSidebarCollapseButton"]',
  '[data-testid="stElementToolbar"]',
  '[data-testid="stHeaderActionElements"]',
  'footer',
  '#MainMenu',
  '.stDeployButton',
  '[class*="viewerBadge"]',
  '[class*="profileContainer"]',
  '.modebar-container',
];

class CaptureFailure extends Error {}

const args = parseArgs();
const CONFIG = typeof args.config === 'string' ? args.config : join(ROOT, 'scripts', 'projects.capture.json');
const headed = !!args.headed;
const keepGoing = !!args['keep-going'];
const log = (msg) => console.log(`  ${msg}`);

const all = JSON.parse(await readFile(CONFIG, 'utf8'));
let targets = all;
if (args.only) {
  const wanted = String(args.only).split(',').map((s) => s.trim()).filter(Boolean);
  const unknown = wanted.filter((s) => !all.some((t) => t.slug === s));
  if (unknown.length) {
    console.error(`Unknown slug(s): ${unknown.join(', ')}\nKnown: ${all.map((t) => t.slug).join(', ')}`);
    process.exit(2);
  }
  targets = all.filter((t) => wanted.includes(t.slug));
}

await mkdir(RAW_DIR, { recursive: true });
for (const s of SIZES) await mkdir(s.dir, { recursive: true });

const browser = await launch({ headless: !headed });
await prewake(targets.filter((t) => t.kind === 'streamlit'));

const results = [];
let aborted = false;
for (const target of targets) {
  if (aborted) {
    results.push({ slug: target.slug, status: 'SKIPPED', ...(await existingSizes(target.slug)) });
    continue;
  }
  const t0 = Date.now();
  console.log(`\n→ ${target.slug} (${target.kind}) ${target.url}`);
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'pt-BR',
    timezoneId: 'America/Sao_Paulo',
  });
  const page = await context.newPage();
  page.setDefaultTimeout(target.timeoutMs ?? DEFAULT_TIMEOUT);
  try {
    if (target.clock) {
      await page.clock.setFixedTime(new Date(target.clock));
      log(`clock frozen at ${target.clock}`);
    }
    if (target.seed != null) {
      // mulberry32, so force-directed layouts land the same way every run.
      await context.addInitScript((seed) => {
        let a = seed >>> 0;
        Math.random = () => {
          a = (a + 0x6d2b79f5) >>> 0;
          let t = Math.imul(a ^ (a >>> 15), 1 | a);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      }, target.seed);
    }
    if (target.kind === 'streamlit') await prepareStreamlit(page, target);
    else if (target.kind === 'static') await prepareStatic(page, target);
    else throw new Error(`unknown kind "${target.kind}"`);

    const png = await page.screenshot({ animations: 'disabled', caret: 'hide' });
    await writeFile(join(RAW_DIR, `${target.slug}.png`), png);
    log(`title: ${JSON.stringify(await page.title())} · ${page.url()}`);
    await guard(page, png);
    const sizes = await encode(png, target.slug);
    results.push({ slug: target.slug, status: 'ok', ...sizes, secs: secs(t0) });
    log(`✓ ${fmt(sizes['1600'])} B / ${fmt(sizes['800'])} B in ${secs(t0)} s`);
  } catch (err) {
    const soft = err instanceof CaptureFailure;
    console.error(`  ✗ ${soft ? 'FAILED' : 'ERROR'}: ${err.message.split('\n')[0]}`);
    results.push({ slug: target.slug, status: soft ? 'FAILED' : 'ERROR', ...(await existingSizes(target.slug)), secs: secs(t0) });
    if (!soft && !keepGoing) {
      console.error('  stopping (pass --keep-going to continue past errors)');
      aborted = true;
    }
  } finally {
    await context.close();
  }
}
await browser.close();

printSummary(results);
process.exitCode = results.every((r) => r.status === 'ok') ? 0 : 1;

// ---------------------------------------------------------------------------

/** Kick every sleeping Streamlit app at once so they boot in parallel. */
async function prewake(streamlitTargets) {
  if (!streamlitTargets.length) return;
  const context = await browser.newContext({ viewport: VIEWPORT });
  await Promise.all(streamlitTargets.map(async (t) => {
    const page = await context.newPage();
    try {
      await page.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60_000 });
      const wake = page.getByRole('button', { name: WAKE_BUTTON });
      await wake.waitFor({ state: 'visible', timeout: 8_000 });
      await wake.click();
      await page.waitForTimeout(3_000); // let the wake request go out before the page closes
      console.log(`  (${t.slug} was asleep — wake-up requested)`);
    } catch {
      // Awake already, or not reachable yet; the real pass handles both.
    }
  }));
  await context.close();
}

async function prepareStreamlit(page, t) {
  await wakeStreamlit(page, t);

  // Load the app itself instead of the Community Cloud wrapper page: same
  // origin, no iframe, no Manage-app button, and the light theme forced.
  const app = new URL('/~/+/', t.url);
  app.search = 'embed=true&embed_options=light_theme';
  await page.goto(app.href, { waitUntil: 'domcontentloaded' });
  await page.locator('[data-testid="stAppViewContainer"]').waitFor({ state: 'visible', timeout: WAKE_TIMEOUT });
  await streamlitIdle(page);
  await settle(page);

  for (const sel of t.clickBefore ?? []) {
    await click(page, sel);
    await streamlitIdle(page);
    await settle(page);
  }
  await hideSelectors(page, [...STREAMLIT_CHROME, ...(t.hide ?? [])]);
  await finish(page, t);
  await streamlitIdle(page);
}

async function wakeStreamlit(page, t) {
  await page.goto(t.url, { waitUntil: 'domcontentloaded' });
  const deadline = Date.now() + WAKE_TIMEOUT;
  let clicked = false;
  let lastNote = Date.now();
  while (Date.now() < deadline) {
    const wake = page.getByRole('button', { name: WAKE_BUTTON });
    if (await wake.isVisible().catch(() => false)) {
      await wake.click().catch(() => {});
      if (!clicked) log('app is asleep — clicked the wake-up button');
      clicked = true;
    }
    // Community Cloud serves the app in an iframe at /~/+/; it's up once that
    // frame renders Streamlit's view container and the wrapper stops showing
    // its sleeping/"oven" screen.
    const frame = page.frames().find((f) => f.url().includes('/~/+/'));
    const ready = frame && (await frame.locator('[data-testid="stAppViewContainer"]').count().catch(() => 0)) > 0;
    const wrapperText = await page.locator('body').innerText().catch(() => '');
    if (ready && !SLEEP_TEXT.test(wrapperText)) return;
    if (Date.now() - lastNote > 30_000) {
      log('still waiting for the app to wake…');
      lastNote = Date.now();
    }
    await page.waitForTimeout(2_000);
  }
  throw new CaptureFailure('app still asleep / in the oven after 5 min');
}

/** Resolve once Streamlit has shown no running script, spinner or skeleton for ~2 s. */
async function streamlitIdle(page, timeout = DEFAULT_TIMEOUT) {
  const deadline = Date.now() + timeout;
  let calm = 0;
  while (Date.now() < deadline) {
    const idle = await page.evaluate(() => {
      const shown = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
      if (!document.querySelector('[data-testid="stAppViewContainer"]')) return false;
      const busy = document.querySelectorAll('[data-testid="stSpinner"], [data-testid="stSkeleton"], [data-testid="stAppSkeleton"]');
      if ([...busy].some(shown)) return false;
      const status = document.querySelector('[data-testid="stStatusWidget"]');
      if (status && /running|connecting|stop/i.test(status.textContent ?? '')) return false;
      return !document.querySelector('[data-stale="true"]');
    }).catch(() => false);
    calm = idle ? calm + 1 : 0;
    if (calm >= 4) return;
    await page.waitForTimeout(500);
  }
  throw new Error('Streamlit app never went idle');
}

async function prepareStatic(page, t) {
  await page.goto(t.url, { waitUntil: 'load' });
  await settle(page);
  for (const sel of t.clickBefore ?? []) {
    await click(page, sel);
    await settle(page);
  }
  if (t.hide?.length) await hideSelectors(page, t.hide);
  await finish(page, t);
}

async function finish(page, t) {
  if (t.waitFor) await page.locator(t.waitFor).first().waitFor({ state: 'visible' });
  if (t.waitForHidden) await page.locator(t.waitForHidden).first().waitFor({ state: 'hidden' });
  if (t.scrollTo) {
    await page.locator(t.scrollTo).first().evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
    log(`scrolled to ${t.scrollTo}`);
  }
  // Park the pointer where it can't trigger hover states.
  await page.mouse.move(VIEWPORT.width - 1, VIEWPORT.height - 1);
  await settle(page);
  await plotlyMapsReady(page);
  if (t.delayMs) await page.waitForTimeout(t.delayMs);
}

/**
 * Plotly map charts (choroplethmap, scattermapbox, …) draw the base tiles
 * first and add the data layers seconds later, so "the chart exists" isn't
 * enough. Wait until every visible map trace has its source in the MapLibre
 * style and the map reports everything loaded, steadily for ~2 s.
 */
async function plotlyMapsReady(page, timeout = DEFAULT_TIMEOUT) {
  const probe = () => {
    const plots = [...document.querySelectorAll('.js-plotly-plot')].filter((gd) => gd.getClientRects().length);
    let maps = 0;
    for (const gd of plots) {
      const layout = gd._fullLayout;
      if (!layout) return { ready: false, maps, why: 'plot not laid out' };
      const traces = (gd._fullData ?? []).filter((d) => d.visible === true && /^(scatter|choropleth|density)map(box)?$/.test(d.type));
      const subplots = [...(layout._subplots?.map ?? []), ...(layout._subplots?.mapbox ?? [])];
      for (const key of subplots) {
        maps++;
        const map = layout[key]?._subplot?.map;
        if (!map) return { ready: false, maps, why: `${key}: no map instance` };
        const sources = map.getStyle()?.sources ?? {};
        const missing = traces.filter((d) => (d.subplot ?? key) === key && !(`source-${d.uid}` in sources));
        if (missing.length) return { ready: false, maps, why: `${key}: ${missing.length} trace layer(s) not added yet` };
        if (!map.loaded()) return { ready: false, maps, why: `${key}: sources still loading` };
        if (!map.areTilesLoaded()) return { ready: false, maps, why: `${key}: tiles still loading` };
        if (map.isMoving()) return { ready: false, maps, why: `${key}: still moving` };
      }
    }
    return { ready: true, maps, why: '' };
  };
  const deadline = Date.now() + timeout;
  let calm = 0;
  let maps = 0;
  let why = '';
  while (Date.now() < deadline) {
    const state = await page.evaluate(probe).catch((err) => ({ ready: false, maps: -1, why: err.message.split('\n')[0] }));
    maps = state.maps;
    why = state.why;
    if (maps === 0) return; // no Plotly maps on screen
    calm = state.ready ? calm + 1 : 0;
    if (calm >= 4) {
      log(`${maps} Plotly map(s) fully drawn`);
      return;
    }
    await page.waitForTimeout(500);
  }
  throw new Error(`Plotly map(s) never finished drawing (${maps} found; ${why})`);
}

/** Click, and if that navigates — even belatedly, e.g. from a setTimeout — wait for the new page. */
async function click(page, sel) {
  const navigated = page
    .waitForEvent('framenavigated', { predicate: (f) => f === page.mainFrame(), timeout: 3_000 })
    .then(() => true, () => false);
  await page.locator(sel).first().click();
  log(`clicked ${sel}`);
  if (await navigated) await page.waitForLoadState('load');
}

/** Load, network, fonts and on-screen images settled; retried if a navigation lands mid-way. */
async function settle(page) {
  for (let attempt = 1; ; attempt++) {
    try {
      await page.waitForLoadState('load');
      await page.waitForLoadState('networkidle', { timeout: 30_000 }).catch(() => log('network never went idle; continuing'));
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => [...document.images].every((img) => {
        const r = img.getBoundingClientRect();
        const onScreen = r.bottom > 0 && r.right > 0 && r.top < innerHeight && r.left < innerWidth;
        return !onScreen || img.complete;
      }), null, { timeout: 30_000 }).catch((err) => {
        if (/context was destroyed|navigat/i.test(err.message)) throw err;
        log('some on-screen images never finished loading');
      });
      return;
    } catch (err) {
      if (attempt >= 3 || !/context was destroyed|navigat/i.test(err.message)) throw err;
    }
  }
}

async function hideSelectors(page, selectors) {
  await page.addStyleTag({ content: `${selectors.join(',\n')} { display: none !important; }` });
}

async function guard(page, png) {
  const text = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (!n.textContent.trim()) continue;
      range.selectNodeContents(n);
      const r = range.getBoundingClientRect();
      if (!r.width || !r.height || r.bottom <= 0 || r.right <= 0 || r.top >= innerHeight || r.left >= innerWidth) continue;
      const style = getComputedStyle(n.parentElement);
      if (style.visibility === 'hidden' || Number(style.opacity) === 0) continue;
      out.push(n.textContent.trim());
    }
    return out.join(' ');
  });
  const bad = text.match(BAD_TEXT);
  if (bad) throw new CaptureFailure(`viewport shows "${bad[0]}": …${excerpt(text, bad.index)}…`);

  const { channels } = await sharp(png).stats();
  const stdev = channels.slice(0, 3).reduce((sum, c) => sum + c.stdev, 0) / 3;
  if (stdev < MIN_STDEV) throw new CaptureFailure(`image is nearly uniform (mean channel stdev ${stdev.toFixed(2)})`);

  const { width, height } = await sharp(png).metadata();
  if (width !== VIEWPORT.width * SCALE || height !== VIEWPORT.height * SCALE) {
    throw new CaptureFailure(`unexpected raw size ${width}×${height}`);
  }
}

/** Encode both sizes first, then swap them in, so a failure never leaves a mismatched pair. */
async function encode(png, slug) {
  const encoded = await Promise.all(SIZES.map(async (s) => ({
    s,
    buf: await sharp(png)
      .resize(s.width, s.height, { fit: 'cover', position: 'top', kernel: 'lanczos3' })
      .webp({ quality: s.quality, effort: 6, smartSubsample: false })
      .toBuffer(),
  })));
  const sizes = {};
  for (const { s, buf } of encoded) {
    const file = join(s.dir, `${slug}.webp`);
    await writeFile(`${file}.tmp`, buf);
    await rename(`${file}.tmp`, file);
    sizes[s.label] = buf.length;
  }
  return sizes;
}

async function existingSizes(slug) {
  const sizes = {};
  for (const s of SIZES) {
    sizes[s.label] = await stat(join(s.dir, `${slug}.webp`)).then((st) => st.size, () => null);
  }
  return sizes;
}

function printSummary(rows) {
  const w = Math.max(4, ...rows.map((r) => r.slug.length));
  const size = (r, k) => (r[k] == null ? '—' : fmt(r[k]) + (r.status === 'ok' ? '' : ' (kept)'));
  console.log(`\n${'slug'.padEnd(w)}  ${'status'.padEnd(7)}  ${'1600×1000 B'.padStart(16)}  ${'800×500 B'.padStart(16)}  time`);
  for (const r of rows) {
    console.log(`${r.slug.padEnd(w)}  ${r.status.padEnd(7)}  ${size(r, '1600').padStart(16)}  ${size(r, '800').padStart(16)}  ${r.secs != null ? r.secs + ' s' : ''}`);
  }
  const bad = rows.filter((r) => r.status !== 'ok').length;
  console.log(bad ? `\n${bad} of ${rows.length} not captured; existing images left untouched.` : `\nAll ${rows.length} captured.`);
}

function excerpt(text, i) {
  return text.slice(Math.max(0, i - 40), i + 60).replace(/\s+/g, ' ');
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

function secs(t0) {
  return Math.round((Date.now() - t0) / 1000);
}
