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
@font-face { font-family: 'Source Sans 3'; src: url(${font('source-sans-3', 'source-sans-3-latin-wght-normal.woff2')}) format('woff2'); font-weight: 200 900; }
@font-face { font-family: 'Source Serif 4'; src: url(${font('source-serif-4', 'source-serif-4-latin-opsz-normal.woff2')}) format('woff2'); font-weight: 200 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; background: #FFFFFF; color: #16181E; font-family: 'Source Sans 3', sans-serif;
  display: grid; grid-template-columns: 1fr 380px; align-items: center; gap: 64px; padding: 0 88px 0 84px;
  border-top: 10px solid #27507F; }
.kicker { font-size: 19px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; color: #626874; }
h1 { font-family: 'Source Serif 4', serif; font-size: 92px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; margin-top: 26px; }
.statement { font-family: 'Source Serif 4', serif; font-size: 32px; line-height: 1.38; color: #3E4450; margin-top: 30px; max-width: 30ch; }
.url { font-size: 21px; font-weight: 600; letter-spacing: .02em; color: #27507F; margin-top: 40px; }
.portrait { width: 380px; height: 380px; border-radius: 50%; object-fit: cover; }
</style></head><body>
<div>
  <p class="kicker">Computational political scientist</p>
  <h1>Felipe Lamarca</h1>
  <p class="statement">Statistical and computational methods to understand political and social phenomena.</p>
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
if (loaded.length < 2) throw new Error(`fonts not loaded: ${loaded.join(', ')}`);
if (!(await page.evaluate(() => document.querySelector('img.portrait').naturalWidth > 0))) throw new Error('portrait not loaded');
const jpeg = await page.screenshot({ type: 'jpeg', quality: 88 });
await browser.close();
await writeFile('public/img/og-image.jpg', jpeg);
console.log(`public/img/og-image.jpg (${jpeg.length} bytes)`);
