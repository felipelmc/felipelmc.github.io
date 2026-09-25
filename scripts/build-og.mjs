// Renders the social-share card (1200×630) to public/img/og-image.jpg: name,
// role and Fig. 1, in the light theme. Run by hand after changing the map or
// the profile (`node scripts/build-og.mjs`); the build only copies the JPEG.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { launch } from './qa/lib.mjs';

const font = (pkg, file) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const astro = await readFile('src/components/figures/BrazilDots.astro', 'utf8');
const svg = astro.slice(astro.lastIndexOf('---') + 3).replace(/class=\{Astro\.props\.class\}/, 'class="map"');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url(${font('geist', 'geist-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Geist Mono'; src: url(${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: Newsreader; src: url(${font('newsreader', 'newsreader-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 200 800; }
:root { --bg: 246 246 243; --line: 222 222 216; --line-strong: 201 201 193;
  --d1: 90 192 171; --d2: 46 157 142; --d3: 24 121 112; --d4: 14 86 82; --d5: 5 53 53; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: rgb(var(--bg)); color: #0E1116; font-family: Geist, sans-serif;
  display: grid; grid-template-columns: 1fr 470px; align-items: center; gap: 40px; padding: 0 72px 0 80px; }
.kicker { font-family: 'Geist Mono', monospace; font-size: 17px; letter-spacing: .08em; text-transform: uppercase; color: #5F656E;
  display: flex; align-items: center; gap: 14px; }
.mark { width: 30px; height: 30px; }
h1 { font-size: 92px; font-weight: 600; letter-spacing: -0.035em; line-height: 1; margin-top: 34px; }
.statement { font-family: Newsreader, serif; font-size: 31px; line-height: 1.35; color: #444A54; margin-top: 26px; max-width: 30ch; }
.url { font-family: 'Geist Mono', monospace; font-size: 18px; color: #0A6F69; margin-top: 40px; }
.map { width: 470px; height: auto; }
.fig-dots { stroke-width: 5.5px; } .fig-graticule { opacity: .7; }
</style></head><body>
<div>
  <p class="kicker">
    <svg class="mark" viewBox="0 0 24 24">${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<circle cx="${4 + c * 8}" cy="${4 + r * 8}" r="3.3" style="fill: rgb(var(--d${r + c + 1}))"/>`)).join('')}</svg>
    Computational political scientist
  </p>
  <h1>Felipe Lamarca</h1>
  <p class="statement">Data scientist and social scientist. Elections, Congress and public opinion in Brazil.</p>
  <p class="url">felipelamarca.com</p>
</div>
${svg}
</body></html>`;

// Load from a file:// URL so the page may read the local font files.
await mkdir('.qa', { recursive: true });
await writeFile('.qa/og.html', html);
const browser = await launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(resolve('.qa/og.html')).href, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const loaded = await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family));
if (loaded.length < 3) throw new Error(`fonts not loaded: ${loaded.join(', ')}`);
const jpeg = await page.screenshot({ type: 'jpeg', quality: 88 });
await browser.close();
await writeFile('public/img/og-image.jpg', jpeg);
console.log(`public/img/og-image.jpg (${jpeg.length} bytes)`);
