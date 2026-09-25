// Content-parity check between two builds (by default the classic site
// snapshot and the current docs/). For each locale it collects, from every
// sitemap page of the OLD build, the external hrefs and the "salient" strings
// (headings, item titles, emphasized titles, link texts), and reports the ones
// that appear nowhere in the NEW build of the same locale. Deliberate removals
// go in scripts/qa/parity-allow.json with a reason.
//
//   node scripts/qa/parity.mjs [--old .qa/classic-site/docs] [--new docs]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { launch, parseArgs, serve, sitemapPaths } from './lib.mjs';

const args = parseArgs();
const oldDir = args.old ?? '.qa/classic-site/docs';
const newDir = args.new ?? 'docs';

const norm = (s) => s.toLowerCase().normalize('NFC')
  .replace(/[“”«»"]/g, '"').replace(/[‘’]/g, "'").replace(/[–—]/g, '-')
  .replace(/\s+/g, ' ').replace(/[\s.,;:→↗↓★]+$/u, '').replace(/^[\s★]+/u, '').trim();
const localeOf = (path) => (path.startsWith('/pt-br') ? 'pt-br' : 'en');

async function collect(dir, port) {
  const server = await serve(dir, port);
  const paths = await sitemapPaths(server.base);
  const browser = await launch();
  const page = await browser.newPage();
  const byLocale = { en: { text: '', hrefs: new Set(), salient: new Map() }, 'pt-br': { text: '', hrefs: new Set(), salient: new Map() } };
  for (const path of paths) {
    await page.goto(server.base + path, { waitUntil: 'domcontentloaded' });
    const data = await page.evaluate(() => {
      const root = document.querySelector('main') ?? document.body;
      // textContent (not innerText) so closed <details>/<dialog> content counts.
      const text = [root.textContent, document.querySelector('footer')?.textContent ?? ''].join(' ');
      const hrefs = [...document.querySelectorAll('a[href]')].map((a) => a.href);
      const sel = 'h1,h2,h3,h4,em,code,.font-medium,a';
      const salient = [...root.querySelectorAll(sel)].map((el) => el.textContent.trim()).filter((s) => s.length > 3);
      return { text, hrefs, salient };
    });
    const bucket = byLocale[localeOf(path)];
    bucket.text += ' ' + data.text;
    data.hrefs.filter((h) => !h.startsWith(server.base)).forEach((h) => bucket.hrefs.add(h));
    data.salient.forEach((s) => { if (!bucket.salient.has(norm(s))) bucket.salient.set(norm(s), { raw: s, path }); });
  }
  await browser.close();
  server.close();
  return byLocale;
}

let allow = { hrefs: {}, strings: {} };
try { allow = JSON.parse(await readFile('scripts/qa/parity-allow.json', 'utf8')); } catch {}

const [oldSite, newSite] = [await collect(oldDir, 4410), await collect(newDir, 4411)];
const result = {};
let missingCount = 0;
for (const locale of ['en', 'pt-br']) {
  const newText = norm(newSite[locale].text);
  const missingHrefs = [...oldSite[locale].hrefs].filter((h) => !newSite[locale].hrefs.has(h) && !allow.hrefs[h]);
  const missingStrings = [...oldSite[locale].salient.entries()]
    .filter(([n]) => !newText.includes(n) && !allow.strings[n])
    .map(([n, v]) => ({ normalized: n, raw: v.raw, from: v.path }));
  result[locale] = { missingHrefs, missingStrings };
  missingCount += missingHrefs.length + missingStrings.length;
  console.log(`\n=== ${locale}: ${missingHrefs.length} external hrefs and ${missingStrings.length} strings missing`);
  missingHrefs.forEach((h) => console.log('  href  ', h));
  missingStrings.forEach((s) => console.log(`  text   ${s.from}  «${s.raw.slice(0, 110)}»`));
}
await mkdir('.qa', { recursive: true });
await writeFile('.qa/parity.json', JSON.stringify(result, null, 2));
process.exitCode = missingCount ? 1 : 0;
