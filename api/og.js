import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const BRAND = {
  bg: '#080b12',
  line: '#2b3548',
  gold: '#d9b45d',
  white: '#f7f5ee',
  muted: '#a6adbb',
};

let fontPromise;

function cleanText(value, fallback, maxLength) {
  return String(value || fallback)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function loadFont(req) {
  if (!fontPromise) {
    const fontUrl = new URL('/og-font.ttf', req.url);
    fontPromise = fetch(fontUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Font request failed: ${response.status}`);
      }
      return response.arrayBuffer();
    });
  }

  return fontPromise;
}

const el = (type, style, children) => ({ type, props: { style, children } });

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = cleanText(searchParams.get('title'), 'Infrastructure Contracts Knowledge Hub', 112);
    const tag = cleanText(searchParams.get('tag'), 'FIDIC · EPC · Claims · DAAB · MDB projects', 70);

    let font = null;
    try {
      font = await loadFont(req);
    } catch {
      font = null;
    }

    const tree = el(
      'div',
      {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: BRAND.bg,
        color: BRAND.white,
        fontFamily: font ? 'Manrope' : 'Arial',
        padding: '68px 76px',
      },
      [
        el('div', {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          backgroundColor: BRAND.gold,
        }, ''),
        el('div', {
          position: 'absolute',
          right: '-170px',
          top: '-210px',
          width: '560px',
          height: '560px',
          borderRadius: '560px',
          backgroundColor: 'rgba(217,180,93,0.18)',
        }, ''),
        el('div', {
          position: 'absolute',
          left: '-210px',
          bottom: '-250px',
          width: '610px',
          height: '610px',
          borderRadius: '610px',
          backgroundColor: 'rgba(91,140,255,0.12)',
        }, ''),
        el('div', {
          position: 'absolute',
          right: '76px',
          bottom: '62px',
          width: '300px',
          height: '300px',
          borderRadius: '300px',
          border: `1px solid ${BRAND.line}`,
        }, ''),
        el('div', {
          position: 'absolute',
          right: '158px',
          bottom: '144px',
          width: '136px',
          height: '136px',
          borderRadius: '136px',
          border: `2px solid rgba(217,180,93,0.46)`,
        }, ''),
        el('div', {
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          border: `1px solid rgba(217,180,93,0.32)`,
          borderRadius: '34px',
          backgroundColor: 'rgba(16,23,34,0.76)',
          padding: '46px 52px',
        }, [
          el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
            el('div', { display: 'flex', alignItems: 'center' }, [
              el('div', {
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                border: `2px solid ${BRAND.gold}`,
                marginRight: '16px',
              }, ''),
              el('div', { display: 'flex', fontSize: '34px', fontWeight: 800 }, [
                el('span', { color: BRAND.white }, 'FIDIC'),
                el('span', { color: BRAND.gold }, '.uz'),
              ]),
            ]),
            el('div', {
              display: 'flex',
              color: BRAND.gold,
              fontSize: '22px',
              fontWeight: 800,
              letterSpacing: '7px',
              textTransform: 'uppercase',
            }, 'Bridge Consult'),
          ]),
          el('div', { display: 'flex', flexDirection: 'column', maxWidth: '860px' }, [
            el('div', {
              display: 'flex',
              color: BRAND.gold,
              fontSize: '25px',
              fontWeight: 800,
              letterSpacing: '5px',
              textTransform: 'uppercase',
              marginBottom: '24px',
            }, tag),
            el('div', {
              display: 'flex',
              color: BRAND.white,
              fontSize: title.length > 72 ? '50px' : '60px',
              fontWeight: 800,
              lineHeight: 1.05,
              maxWidth: '900px',
            }, title),
          ]),
          el('div', { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
            el('div', {
              display: 'flex',
              color: BRAND.muted,
              fontSize: '24px',
              lineHeight: 1.35,
            }, 'Infrastructure contracts · FIDIC · EPC · Claims · DAAB'),
            el('div', {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: BRAND.gold,
              fontSize: '24px',
              fontWeight: 800,
              border: `1px solid rgba(217,180,93,0.42)`,
              borderRadius: '999px',
              padding: '14px 22px',
            }, 'fidic.uz'),
          ]),
        ]),
      ],
    );

    const options = { width: 1200, height: 630 };
    if (font) {
      options.fonts = [{ name: 'Manrope', data: font, weight: 800, style: 'normal' }];
    }

    return new ImageResponse(tree, options);
  } catch (error) {
    return new Response(`og error: ${error?.message || 'unknown'}`, { status: 500 });
  }
}
