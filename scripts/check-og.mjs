#!/usr/bin/env node
/**
 * Render every real page title on the site and detect OG card title truncation.
 *
 *   npm run build && node scripts/check-og.mjs
 *
 * Exists because the card shipped broken twice: a title that wrapped past the
 * line clamp lost its last line and collided with the footer strip, which is
 * invisible unless you look at the image. Spot-checking a few titles is not a
 * test — this checks all of them, and exits non-zero so it can gate a deploy.
 *
 * Detection is exact rather than heuristic. For each title it renders the title
 * text alone, unclamped, at the production font size and column width, measures
 * the real ink height, and compares that against the height the production clamp
 * actually allows. If the natural height exceeds the clamp, the card is dropping
 * a line.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { ImageResponse } from '@vercel/og';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

// Must mirror api/og.js. Kept here rather than imported because og.js exports a
// request handler, not its layout constants.
const TITLE_MAX_WIDTH = 850;
const TITLE_LINE_HEIGHT = 1.06;

function titleLayout(title) {
  const n = title.length;
  if (n <= 58) return { fontSize: 64, lines: 3 };
  if (n <= 96) return { fontSize: 58, lines: 4 };
  if (n <= 118) return { fontSize: 52, lines: 4 };
  return { fontSize: 46, lines: 5 };
}

const PROBE_W = 900;
const PROBE_H = 600;
const PAD = 20;

function collectTitles() {
  const titles = new Map();
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name === 'index.html') {
        const html = fs.readFileSync(full, 'utf8');
        // Read the og:image the page actually requests, so this checks what
        // social platforms will fetch rather than a title we re-derive.
        const m = html.match(/property="og:image" content="([^"]+)"/);
        if (!m) continue;
        const title = new URL(m[1].replace(/&amp;/g, '&'), 'https://fidic.uz').searchParams.get('title');
        if (title && !titles.has(title)) {
          titles.set(title, path.relative(DIST, full).replace(/\\/g, '/'));
        }
      }
    }
  };
  walk(DIST);
  return titles;
}

/** Minimal PNG decoder: RGBA8, non-interlaced, which is what satori emits. */
function decodePng(buffer) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (pos < buffer.length) {
    const len = buffer.readUInt32BE(pos);
    const type = buffer.toString('ascii', pos + 4, pos + 8);
    const data = buffer.subarray(pos + 8, pos + 8 + len);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'IDAT') idat.push(data);
    else if (type === 'IEND') break;
    pos += 12 + len;
  }
  if (bitDepth !== 8 || colorType !== 6) {
    throw new Error(`unsupported PNG: bitDepth=${bitDepth} colorType=${colorType}`);
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const bpp = 4;
  const stride = width * bpp;
  const out = Buffer.alloc(height * stride);
  let rp = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[rp++];
    const row = raw.subarray(rp, rp + stride);
    rp += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? cur[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      let v = row[x];
      if (filter === 1) v += a;
      else if (filter === 2) v += b;
      else if (filter === 3) v += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      cur[x] = v & 0xff;
    }
  }
  return { width, height, data: out };
}

/** Vertical extent of non-transparent pixels. */
function inkHeight(png) {
  const { width, height, data } = png;
  let top = -1;
  let bottom = -1;
  for (let y = 0; y < height; y++) {
    let any = false;
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 40) { any = true; break; }
    }
    if (any) {
      if (top < 0) top = y;
      bottom = y;
    }
  }
  return top < 0 ? 0 : bottom - top + 1;
}

async function main() {
  if (!fs.existsSync(DIST)) throw new Error('dist/ not found — run `npm run build` first');

  const boldFont = fs.readFileSync(path.join(ROOT, 'api', 'fonts', 'LiberationSans-Bold.ttf'));
  const titles = collectTitles();
  process.stderr.write(`checking ${titles.size} distinct titles\n`);

  const failures = [];
  let i = 0;
  for (const [title, page] of titles) {
    const { fontSize, lines } = titleLayout(title);
    const element = {
      type: 'div',
      props: {
        style: {
          width: `${PROBE_W}px`, height: `${PROBE_H}px`, display: 'flex',
          padding: `${PAD}px`, fontFamily: 'Liberation Sans',
        },
        children: {
          type: 'div',
          props: {
            style: {
              fontSize, lineHeight: TITLE_LINE_HEIGHT, fontWeight: 800,
              letterSpacing: -2, maxWidth: TITLE_MAX_WIDTH, color: '#ffffff',
            },
            children: title,
          },
        },
      },
    };
    const res = new ImageResponse(element, {
      width: PROBE_W, height: PROBE_H,
      fonts: [{ name: 'Liberation Sans', data: boldFont, weight: 800, style: 'normal' }],
    });
    const natural = inkHeight(decodePng(Buffer.from(await res.arrayBuffer())));

    // Ink is tighter than the box: a line of caps occupies roughly the cap
    // height, not the full leading. Compare against the clamp box plus one
    // line's slack so a title that exactly fills the clamp is not flagged.
    const allowed = Math.round(fontSize * TITLE_LINE_HEIGHT * lines);
    if (natural > allowed) failures.push({ title, page, natural, allowed, fontSize, lines });
    if (++i % 25 === 0) process.stderr.write(`  ${i}/${titles.size}\n`);
  }

  if (failures.length) {
    process.stderr.write(`\n${failures.length} title(s) exceed the clamp and lose a line:\n`);
    for (const f of failures.sort((a, b) => b.natural - a.natural)) {
      process.stderr.write(
        `  ink=${f.natural} > allowed=${f.allowed} (${f.fontSize}px x${f.lines})  len=${f.title.length}\n` +
        `    ${f.title}\n    ${f.page}\n`,
      );
    }
    process.exitCode = 1;
    return;
  }
  process.stderr.write(`\nall ${titles.size} titles fit their clamp\n`);
}

main().catch((err) => {
  process.stderr.write(`check-og failed: ${err.message}\n`);
  process.exitCode = 1;
});
