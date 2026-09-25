// Full-page screenshots of every sitemap route × theme × viewport, plus basic
// layout checks (horizontal overflow, console errors, missing canonical or
// hreflang). Writes PNGs and report.json under --out.
//
//   node scripts/qa/snap.mjs --dir docs --out .qa/new [--only /projects/] [--themes light] [--viewports desktop]
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { THEMES, VIEWPORTS, launch, newThemedContext, parseArgs, serve, sitemapPaths, slugForPath } from './lib.mjs';

const args = parseArgs();
const dir = args.dir ?? 'docs';
const out = args.out ?? '.qa/new';
const port = Number(args.port ?? 4400);
const themes = args.themes ? args.themes.split(',') : THEMES;
const viewports = args.viewports ? args.viewports.split(',') : Object.keys(VIEWPORTS);

const server = await serve(dir, port);
let paths = await sitemapPaths(server.base);
if (args.extra) paths.push(...args.extra.split(','));
if (args.only) paths = paths.filter((p) => args.only.split(',').includes(p));

await mkdir(join(out, 'shots'), { recursive: true });
const browser = await launch();
const report = [];

for (const theme of themes) {
  for (const vp of viewports) {
    const context = await newThemedContext(browser, { theme, viewport: VIEWPORTS[vp] });
    for (const path of paths) {
      const page = await context.newPage();
      const errors = [];
      page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
      page.on('pageerror', (e) => errors.push(String(e)));
      const res = await page.goto(server.base + path, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      const checks = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        scrollWidth: document.documentElement.scrollWidth,
        canonical: !!document.querySelector('link[rel="canonical"]'),
        hreflang: document.querySelectorAll('link[rel="alternate"][hreflang]').length,
        title: document.title,
      }));
      const file = `${slugForPath(path)}--${theme}--${vp}.png`;
      await page.screenshot({ path: join(out, 'shots', file), fullPage: true });
      report.push({ path, theme, viewport: vp, status: res?.status(), file, errors, ...checks });
      const flags = [checks.overflow && `OVERFLOW(${checks.scrollWidth})`, errors.length && `${errors.length} console error(s)`,
        !checks.canonical && 'no canonical', checks.hreflang < 3 && 'hreflang<3'].filter(Boolean);
      console.log(`${res?.status()} ${theme.padEnd(5)} ${vp.padEnd(7)} ${path}${flags.length ? '  ⚠ ' + flags.join(', ') : ''}`);
      await page.close();
    }
    await context.close();
  }
}

await browser.close();
server.close();
await writeFile(join(out, 'report.json'), JSON.stringify(report, null, 2));
const bad = report.filter((r) => r.overflow || r.errors.length || r.status !== 200);
console.log(`\n${report.length} screenshots, ${bad.length} with problems → ${out}`);
process.exitCode = bad.length ? 1 : 0;
