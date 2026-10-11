// Renders the social-share card (1200×630) to public/img/og-image.jpg: name,
// role, statement and the portrait, in the light theme. Run by hand after
// changing the portrait or the profile (`node scripts/build-og.mjs`); the build
// only copies the JPEG.
import { mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { launch } from './qa/lib.mjs';

const font = (pkg, file) => pathToFileURL(resolve('node_modules/@fontsource-variable', pkg, 'files', file)).href;
const portrait = pathToFileURL(resolve('public/img/profilepic/me_at_iesp-lg.webp')).href;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Geist; src: url(${font('geist', 'geist-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: 'Geist Mono'; src: url(${font('geist-mono', 'geist-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
@font-face { font-family: Newsreader; src: url(${font('newsreader', 'newsreader-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 200 800; }
:root { --bg: 246 246 243; --line: 222 222 216;
  --d1: 90 192 171; --d2: 46 157 142; --d3: 24 121 112; --d4: 14 86 82; --d5: 5 53 53; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: rgb(var(--bg)); color: #0E1116; font-family: Geist, sans-serif;
  display: grid; grid-template-columns: 1fr 400px; align-items: center; gap: 56px; padding: 0 88px 0 80px; }
.kicker { font-family: 'Geist Mono', monospace; font-size: 17px; letter-spacing: .08em; text-transform: uppercase; color: #5F656E;
  display: flex; align-items: center; gap: 14px; }
.mark { width: 30px; height: 30px; }
h1 { font-size: 92px; font-weight: 600; letter-spacing: -0.035em; line-height: 1; margin-top: 34px; }
.statement { font-family: Newsreader, serif; font-size: 31px; line-height: 1.35; color: #444A54; margin-top: 26px; max-width: 30ch; }
.url { font-family: 'Geist Mono', monospace; font-size: 18px; color: #0A6F69; margin-top: 40px; }
.portrait { width: 400px; height: 400px; border-radius: 50%; object-fit: cover; box-shadow: 0 0 0 1px rgb(var(--line)); }
</style></head><body>
<div>
  <p class="kicker">
    <svg class="mark" viewBox="0 0 24 24">${[0, 1, 2].flatMap((r) => [0, 1, 2].map((c) => `<circle cx="${4 + c * 8}" cy="${4 + r * 8}" r="3.3" style="fill: rgb(var(--d${r + c + 1}))"/>`)).join('')}</svg>
    Computational political scientist
  </p>
  <h1>Felipe Lamarca</h1>
  <p class="statement">Data scientist and social scientist. Elections, public opinion and data for public policy in Brazil.</p>
  <p class="url">felipelamarca.com</p>
</div>
<img class="portrait" src="${portrait}" alt="">
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
if (!(await page.evaluate(() => document.querySelector('img.portrait').naturalWidth > 0))) throw new Error('portrait not loaded');
const jpeg = await page.screenshot({ type: 'jpeg', quality: 88 });
await browser.close();
await writeFile('public/img/og-image.jpg', jpeg);
console.log(`public/img/og-image.jpg (${jpeg.length} bytes)`);
