// Internal link check for a built site: every internal href/src/srcset on every
// sitemap page (plus the redirects in astro.config.mjs) must resolve to 200,
// and every #fragment must exist as an id on its target page. With --external,
// also HEAD-checks external links (report only; many sites block bots).
//
//   node scripts/qa/links.mjs [--dir docs] [--external]
import { readFile } from 'node:fs/promises';
import { launch, parseArgs, serve, sitemapPaths } from './lib.mjs';

const args = parseArgs();
const server = await serve(args.dir ?? 'docs', Number(args.port ?? 4420));
const base = server.base;
const paths = await sitemapPaths(base);

// Redirect sources from astro.config.mjs, so the legacy URLs are checked too.
const config = await readFile('astro.config.mjs', 'utf8');
const redirectBlock = config.match(/redirects:\s*{([\s\S]*?)}/)?.[1] ?? '';
const redirects = [...redirectBlock.matchAll(/'([^']+)':\s*'([^']+)'/g)].map((m) => ({ from: m[1], to: m[2] }));

const browser = await launch();
const page = await browser.newPage();
const internal = new Map(); // url (no hash) -> Set(fragments)
const external = new Set();
const record = (raw, from) => {
  const u = new URL(raw, base + from);
  if (u.origin !== base) { if (/^https?:/.test(u.protocol)) external.add(u.href); return; }
  const key = u.pathname + u.search;
  if (!internal.has(key)) internal.set(key, new Map());
  if (u.hash) internal.get(key).set(decodeURIComponent(u.hash.slice(1)), from);
};

for (const path of paths) {
  await page.goto(base + path, { waitUntil: 'domcontentloaded' });
  const refs = await page.evaluate(() => [
    ...[...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ...[...document.querySelectorAll('[src]')].map((e) => e.getAttribute('src')),
    ...[...document.querySelectorAll('[srcset]')].flatMap((e) => e.getAttribute('srcset').split(',').map((s) => s.trim().split(/\s+/)[0])),
    ...[...document.querySelectorAll('link[href]')].filter((l) => !/canonical|alternate/.test(l.rel)).map((l) => l.getAttribute('href')),
  ].filter((h) => h && !h.startsWith('mailto:') && !h.startsWith('javascript:')));
  refs.forEach((r) => record(r, path));
}

const problems = [];
for (const [url, fragments] of internal) {
  const res = await fetch(base + url, { redirect: 'follow' });
  if (res.status !== 200) { problems.push(`${res.status}  ${url}`); continue; }
  if (fragments.size) {
    await page.goto(base + url, { waitUntil: 'domcontentloaded' });
    for (const [frag, from] of fragments) {
      const ok = await page.evaluate((id) => !!document.getElementById(id), frag);
      if (!ok) problems.push(`#${frag} missing on ${url} (linked from ${from})`);
    }
  }
}

for (const { from, to } of redirects) {
  const res = await page.goto(base + from, { waitUntil: 'load' });
  await page.waitForURL((u) => !u.pathname.startsWith(from) || from === '/', { timeout: 3000 }).catch(() => {});
  const landed = new URL(page.url());
  const target = new URL(to, base);
  const ok = landed.pathname.replace(/\/$/, '') === target.pathname.replace(/\/$/, '');
  if (!ok || (res && res.status() >= 400)) problems.push(`redirect ${from} → expected ${to}, landed ${landed.pathname}${landed.hash}`);
  if (target.hash && !(await page.evaluate((id) => !!document.getElementById(id), target.hash.slice(1)))) {
    problems.push(`redirect ${from} → ${to}: fragment missing on target`);
  }
}

console.log(`${paths.length} pages, ${internal.size} internal URLs, ${redirects.length} redirects, ${external.size} external links`);
problems.forEach((p) => console.log('  ✗', p));

if (args.external) {
  const list = [...external];
  const bad = [];
  for (let i = 0; i < list.length; i += 4) {
    await Promise.all(list.slice(i, i + 4).map(async (href) => {
      try {
        const r = await fetch(href, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
        if (r.status >= 400) bad.push(`${r.status}  ${href}`);
      } catch (e) { bad.push(`ERR  ${href}  (${e.name})`); }
    }));
  }
  console.log(`\nexternal: ${bad.length} of ${list.length} not OK (report only)`);
  bad.forEach((b) => console.log('  ?', b));
}

await browser.close();
server.close();
process.exitCode = problems.length ? 1 : 0;
