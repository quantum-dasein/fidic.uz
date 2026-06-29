export const config = { runtime: 'edge' };

const WIDTH = 1200;
const HEIGHT = 630;

function cleanText(value, fallback, maxLength) {
  return String(value || fallback)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(value, maxChars = 28, maxLines = 3) {
  const words = value.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);

  if (lines.length > maxLines) {
    const visible = lines.slice(0, maxLines);
    visible[maxLines - 1] = `${visible[maxLines - 1].replace(/[.,;:!?-]+$/, '')}...`;
    return visible;
  }

  return lines;
}

function textLines(lines, x, y, size, lineHeight, color, weight = 800) {
  return lines
    .map((line, index) => (
      `<text x="${x}" y="${y + index * lineHeight}" font-family="Manrope, Inter, Arial, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`
    ))
    .join('');
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const title = cleanText(searchParams.get('title'), 'Infrastructure Contracts Knowledge Hub', 120);
  const tag = cleanText(searchParams.get('tag'), 'FIDIC · EPC · Claims · DAAB · MDB projects', 72);
  const titleLines = wrapText(title, title.length > 76 ? 28 : 31, 3);

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(title)}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080b12"/>
      <stop offset="58%" stop-color="#111722"/>
      <stop offset="100%" stop-color="#2a2419"/>
    </linearGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#f0cf78"/>
      <stop offset="100%" stop-color="#b88b36"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#263247" stroke-width="1" opacity="0.42"/>
    </pattern>
    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="26"/>
    </filter>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grid)" opacity="0.42"/>
  <rect width="${WIDTH}" height="8" fill="url(#gold)"/>

  <circle cx="1060" cy="38" r="310" fill="#d9b45d" opacity="0.14" filter="url(#softGlow)"/>
  <circle cx="70" cy="560" r="330" fill="#5b8cff" opacity="0.12" filter="url(#softGlow)"/>
  <circle cx="970" cy="430" r="118" fill="none" stroke="#405171" stroke-width="1" opacity="0.58"/>
  <circle cx="970" cy="430" r="48" fill="none" stroke="#d9b45d" stroke-width="2" opacity="0.42"/>

  <rect x="76" y="68" width="1048" height="494" rx="34" fill="#101722" opacity="0.82" stroke="#d9b45d" stroke-opacity="0.35"/>

  <rect x="130" y="116" width="46" height="46" rx="10" fill="none" stroke="#d9b45d" stroke-width="2"/>
  <text x="192" y="151" font-family="Manrope, Inter, Arial, sans-serif" font-size="35" font-weight="800" fill="#f7f5ee">FIDIC</text>
  <text x="293" y="151" font-family="Manrope, Inter, Arial, sans-serif" font-size="35" font-weight="800" fill="#d9b45d">.uz</text>
  <text x="785" y="146" font-family="Manrope, Inter, Arial, sans-serif" font-size="22" font-weight="800" letter-spacing="7" fill="#d9b45d">BRIDGE CONSULT</text>

  <text x="130" y="224" font-family="Manrope, Inter, Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="5" fill="#d9b45d">${escapeXml(tag.toUpperCase())}</text>
  ${textLines(titleLines, 130, 294, titleLines.length > 2 ? 56 : 64, titleLines.length > 2 ? 66 : 74, '#f7f5ee')}

  <text x="130" y="494" font-family="Manrope, Inter, Arial, sans-serif" font-size="24" fill="#a6adbb">Infrastructure contracts · FIDIC · EPC · Claims · DAAB</text>
  <rect x="944" y="456" width="128" height="58" rx="29" fill="#101722" stroke="#d9b45d" stroke-opacity="0.55"/>
  <text x="968" y="493" font-family="Manrope, Inter, Arial, sans-serif" font-size="24" font-weight="800" fill="#d9b45d">fidic.uz</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
