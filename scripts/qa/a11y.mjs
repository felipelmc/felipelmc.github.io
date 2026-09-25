// axe-core accessibility scan of every sitemap page in both themes. Fails on
// serious or critical violations; prints the rest as a summary.
//
//   node scripts/qa/a11y.mjs [--dir docs]
import { AxeBuilder } from '@axe-core/playwright';
import { THEMES, VIEWPORTS, launch, newThemedContext, parseArgs, serve, sitemapPaths } from './lib.mjs';

const args = parseArgs();
const server = await serve(args.dir ?? 'docs', Number(args.port ?? 4430));
const paths = await sitemapPaths(server.base);
const browser = await launch();
let failures = 0;

for (const theme of THEMES) {
  const context = await newThemedContext(browser, { theme, viewport: VIEWPORTS.desktop });
  for (const path of paths) {
    const page = await context.newPage();
    await page.goto(server.base + path, { waitUntil: 'networkidle' });
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    failures += serious.length;
    const line = violations.map((v) => `${v.impact}:${v.id}(${v.nodes.length})`).join(' ');
    console.log(`${serious.length ? '✗' : '✓'} ${theme.padEnd(5)} ${path}  ${line}`);
    for (const v of serious) {
      for (const n of v.nodes.slice(0, 3)) console.log(`     ${v.id}: ${n.target.join(' ')} — ${n.failureSummary?.split('\n')[1]?.trim() ?? ''}`);
    }
    await page.close();
  }
  await context.close();
}

await browser.close();
server.close();
console.log(`\n${failures} serious/critical violation type(s)`);
process.exitCode = failures ? 1 : 0;
