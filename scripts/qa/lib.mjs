// Shared helpers for the QA scripts in scripts/qa/. None of this runs during
// `npm run build`; these are local, manual checks against a served build.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

export const LOCALES = ['en', 'pt-br'];
export const THEMES = ['light', 'dark'];
export const VIEWPORTS = {
  mobile: { width: 390, height: 844 },
  desktop: { width: 1440, height: 900 },
};

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) args[key] = true;
    else { args[key] = next; i++; }
  }
  return args;
}

/** Prefer the installed Google Chrome; fall back to Playwright's cached Chromium. */
export async function launch(opts = {}) {
  try {
    return await chromium.launch({ channel: 'chrome', ...opts });
  } catch {
    return await chromium.launch(opts);
  }
}

/** Serve a directory with scripts/qa/serve.mjs and resolve once it answers. */
export async function serve(dir, port) {
  const proc = spawn(process.execPath, ['scripts/qa/serve.mjs', dir, String(port)], { stdio: 'ignore' });
  const base = `http://localhost:${port}`;
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(base + '/');
      if (res.ok) return { base, close: () => proc.kill() };
    } catch {}
    await sleep(100);
  }
  proc.kill();
  throw new Error(`server for ${dir} did not start on ${port}`);
}

/** Every page path listed in the served sitemap, sorted, as site-relative paths. */
export async function sitemapPaths(base) {
  const index = await (await fetch(base + '/sitemap-0.xml')).text();
  const locs = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set(locs)].sort();
}

/** Page context with the theme preset before any page script runs. */
export async function newThemedContext(browser, { theme, viewport, ...rest }) {
  const context = await browser.newContext({ viewport, reducedMotion: 'reduce', ...rest });
  await context.addInitScript((t) => {
    try { localStorage.setItem('theme', t); } catch {}
  }, theme);
  return context;
}

export function slugForPath(path) {
  const s = path.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  return s || 'home';
}
