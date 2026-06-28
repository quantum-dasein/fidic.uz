// Dynamic Open Graph image generator — /api/og?title=...&tag=...
// Renders a branded 1200x630 PNG for social/link previews. Edge runtime.
// Does NOT affect SEO (og:image is for social cards/rich results, not ranking).
import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

let fontPromise;
function loadFont() {
  if (!fontPromise) {
    fontPromise = fetch(new URL('./og-font.ttf', import.meta.url)).then((r) => r.arrayBuffer());
  }
  return fontPromise;
}

const h = (type, style, children) => ({ type, props: { style, children } });

export default async function handler(req) {
  try {
    const { searchParams } = new URL(req.url);
    const title = (searchParams.get('title') || 'Центр знаний по контрактам FIDIC').slice(0, 110);
    const tag = (searchParams.get('tag') || 'FIDIC · EPC · Claims · DAAB · МФО').slice(0, 64);
    const font = await loadFont();

    const tree = h('div', {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#0a0c11',
      backgroundImage:
        'radial-gradient(circle at 82% 12%, rgba(201,164,92,0.20), transparent 55%), radial-gradient(circle at 10% 92%, rgba(91,140,255,0.14), transparent 55%)',
      borderTop: '8px solid #c9a45c',
      padding: '72px',
      fontFamily: 'Manrope',
    }, [
      // brand row
      h('div', { display: 'flex', alignItems: 'center' }, [
        h('div', {
          width: '46px',
          height: '46px',
          borderRadius: '10px',
          border: '2px solid #c9a45c',
          marginRight: '16px',
        }, ''),
        h('div', { display: 'flex', fontSize: '36px', fontWeight: 700 }, [
          h('div', { color: '#eef1f6' }, 'FIDIC'),
          h('div', { color: '#c9a45c' }, '.uz'),
        ]),
      ]),
      // title block
      h('div', { display: 'flex', flexDirection: 'column' }, [
        h('div', { fontSize: '30px', color: '#c9a45c', marginBottom: '20px' }, tag),
        h('div', {
          display: 'flex',
          fontSize: title.length > 60 ? '56px' : '66px',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1.06,
          letterSpacing: '-0.5px',
        }, title),
      ]),
      // footer
      h('div', { fontSize: '26px', color: '#8a93a3', display: 'flex' }, 'Bridge Consult · Центр знаний по контрактам FIDIC'),
    ]);

    return new ImageResponse(tree, {
      width: 1200,
      height: 630,
      fonts: [{ name: 'Manrope', data: font, weight: 700, style: 'normal' }],
    });
  } catch (e) {
    return new Response('og error: ' + (e && e.message), { status: 500 });
  }
}
