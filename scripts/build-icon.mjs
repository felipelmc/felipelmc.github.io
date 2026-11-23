// Draws the site icon and writes it in the three forms browsers ask for:
//   public/icon.svg              modern browsers (inverts for dark browser chrome)
//   public/favicon.ico           16, 32 and 48 px, for Safari and anything that asks for /favicon.ico
//   public/apple-touch-icon.png  180 px, for phone home screens
// Run by hand after changing the drawing (`node scripts/build-icon.mjs`); the build only copies the files.
//
// The icon is two overlapping distributions on the navy of the dissertation's
// figures: the picture of an estimate next to another (polls, ideal points).
// Felipe chose it among four ideas in November 2026.
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const LIGHT = { tile: '#27507F', front: '#FFFFFF', back: '#7D96B2' };
const DARK = { tile: '#8AB0DE', front: '#0C182E', back: '#5D799F' };

// The drawing lives in a 64 × 64 box. Both curves sit on a baseline at y = 48, a
// multiple of 4, so its top edge falls on a pixel row at 16, 32 and 48 px.
const BASE = 48;
const LEFT = 3;
const RIGHT = 61;
const n = (v) => String(Math.round(v * 100) / 100);

// A bell curve centred on `mu`, `height` tall. It closes a little below the
// baseline's top edge, under the baseline, so no seam shows between the two.
// It is drawn as 16 cubic segments whose handles follow the curve's slope.
function bell(mu, sigma, height) {
  const y = (x) => BASE - height * Math.exp(-((x - mu) ** 2) / (2 * sigma ** 2));
  const slope = (x) => ((BASE - y(x)) * (x - mu)) / sigma ** 2;
  const step = (RIGHT - LEFT) / 16;
  let d = `M${LEFT} ${n(y(LEFT))}`;
  for (let x = LEFT; x < RIGHT - 0.001; x += step) {
    const x1 = x + step;
    d += `C${n(x + step / 3)} ${n(y(x) + (slope(x) * step) / 3)} ${n(x1 - step / 3)} ${n(y(x1) - (slope(x1) * step) / 3)} ${n(x1)} ${n(y(x1))}`;
  }
  return `${d}L${RIGHT} ${BASE + 1.2}L${LEFT} ${BASE + 1.2}Z`;
}
const back = bell(40.5, 8.2, 26);
const front = bell(23.5, 6.6, 32);
const baseline = `x="${LEFT}" y="${BASE}" width="${RIGHT - LEFT}" height="2.4"`;

// The SVG browsers load: colours in a style block, so dark browser chrome gets the inverted tile.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <!-- The site icon: two overlapping distributions on the navy of the dissertation's figures; inverted for dark browser chrome. Drawn by scripts/build-icon.mjs. -->
  <style>
    .tile { fill: ${LIGHT.tile}; } .front { fill: ${LIGHT.front}; } .back { fill: ${LIGHT.back}; }
    @media (prefers-color-scheme: dark) {
      .tile { fill: ${DARK.tile}; } .front { fill: ${DARK.front}; } .back { fill: ${DARK.back}; }
    }
  </style>
  <rect class="tile" width="64" height="64" rx="10"/>
  <path class="back" d="${back}"/>
  <path class="front" d="${front}"/>
  <rect class="front" ${baseline}/>
</svg>
`;
await writeFile('public/icon.svg', svg);

// The same drawing as a PNG of a given size, in the light colours. `radius` is
// the tile's corner radius: 0 for the phone icon, which the phone rounds itself.
function png(size, radius) {
  const flat = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
    <rect fill="${LIGHT.tile}" width="64" height="64" rx="${radius}"/>
    <path fill="${LIGHT.back}" d="${back}"/>
    <path fill="${LIGHT.front}" d="${front}"/>
    <rect fill="${LIGHT.front}" ${baseline}/>
  </svg>`;
  return sharp(Buffer.from(flat)).png({ compressionLevel: 9 }).toBuffer();
}

await writeFile('public/apple-touch-icon.png', await png(180, 0));

// An .ico file is a small directory followed by one PNG per size.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) => png(size, 10)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const entry = 6 + 16 * i;
  header.writeUInt8(size, entry); // width
  header.writeUInt8(size, entry + 1); // height
  header.writeUInt16LE(1, entry + 4); // colour planes
  header.writeUInt16LE(32, entry + 6); // bits per pixel
  header.writeUInt32LE(images[i].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[i].length;
});
await writeFile('public/favicon.ico', Buffer.concat([header, ...images]));

console.log(`public/icon.svg (${svg.length} bytes), public/favicon.ico (${offset} bytes), public/apple-touch-icon.png`);
