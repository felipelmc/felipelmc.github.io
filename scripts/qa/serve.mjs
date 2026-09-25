// Minimal static server that behaves like GitHub Pages for a built site:
// `/x` redirects to `/x/` when `x/index.html` exists, `/x/` serves
// `x/index.html`, and unknown paths get `404.html` with status 404.
//
//   node scripts/qa/serve.mjs docs 4400
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const root = resolve(process.argv[2] ?? 'docs');
const port = Number(process.argv[3] ?? 4400);

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript',
  '.mjs': 'text/javascript', '.json': 'application/json', '.xml': 'application/xml',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.txt': 'text/plain',
};

async function isFile(p) {
  try { return (await stat(p)).isFile(); } catch { return false; }
}

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const rel = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join(root, rel);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }

  if (rel.endsWith('/')) file = join(file, 'index.html');
  else if (!(await isFile(file)) && (await isFile(join(file, 'index.html')))) {
    res.writeHead(301, { Location: url.pathname + '/' + url.search }).end();
    return;
  }

  if (await isFile(file)) {
    res.writeHead(200, { 'Content-Type': TYPES[extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
    return;
  }
  const notFound = join(root, '404.html');
  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end((await isFile(notFound)) ? await readFile(notFound) : 'Not found');
}).listen(port);
