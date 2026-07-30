import { ImageResponse } from '@vercel/og';
import { readFile } from 'node:fs/promises';

export const config = { runtime: 'nodejs' };

const WIDTH = 1200;
const HEIGHT = 630;

// Fonts are vendored in api/fonts/ (SIL OFL) so the function does not depend
// on a transitive node_modules path that may disappear. Liberation Sans
// covers Cyrillic, so RU/UZ titles render correctly.
const regularFontPromise = readFile(new URL('./fonts/LiberationSans-Regular.ttf', import.meta.url));
const boldFontPromise = readFile(new URL('./fonts/LiberationSans-Bold.ttf', import.meta.url));

function cleanText(value, fallback, maxLength) {
  return String(value || fallback)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function h(type, props, ...children) {
  const childValue = children.length === 0
    ? props?.children
    : children.length === 1 ? children[0] : children;

  return {
    type,
    props: {
      ...(props || {}),
      children: childValue,
    },
  };
}

// Step the title down as it gets longer so three wrapped lines always clear the
// card's inner height. Thresholds are character counts at maxWidth 850.
function titleFontSize(title) {
  const n = title.length;
  if (n > 104) return 46;
  if (n > 82) return 52;
  if (n > 62) return 58;
  return 64;
}

function lineClampStyle(lines) {
  return {
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  };
}

async function createImageResponse(url) {
  const { searchParams } = new URL(url);
  const title = cleanText(searchParams.get('title'), 'Infrastructure Contracts Knowledge Hub', 130);
  const tag = cleanText(searchParams.get('tag'), 'FIDIC · EPC · Claims · DAAB · MDB projects', 80);
  const [regularFontData, boldFontData] = await Promise.all([regularFontPromise, boldFontPromise]);

  return new ImageResponse(
    h(
      'div',
      {
        style: {
          width: `${WIDTH}px`,
          height: `${HEIGHT}px`,
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #080b12 0%, #111722 58%, #2a2419 100%)',
          color: '#f7f5ee',
          fontFamily: 'Liberation Sans',
        },
      },
      h('div', {
        style: {
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(217,180,93,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(217,180,93,.08) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          background: 'linear-gradient(90deg, #f0cf78, #b88b36)',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          width: 560,
          height: 560,
          borderRadius: 999,
          right: -150,
          top: -230,
          background: 'radial-gradient(circle, rgba(217,180,93,.28), transparent 66%)',
        },
      }),
      h('div', {
        style: {
          position: 'absolute',
          width: 620,
          height: 620,
          borderRadius: 999,
          left: -260,
          bottom: -270,
          background: 'radial-gradient(circle, rgba(91,140,255,.18), transparent 66%)',
        },
      }),
      h(
        'div',
        {
          style: {
            position: 'absolute',
            left: 76,
            top: 68,
            width: 1048,
            height: 494,
            display: 'flex',
            flexDirection: 'column',
            padding: '48px 54px',
            borderRadius: 34,
            border: '1px solid rgba(217,180,93,.36)',
            background: 'rgba(16,23,34,.86)',
          },
        },
        h(
          'div',
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
          },
          h(
            'div',
            { style: { display: 'flex', alignItems: 'center', gap: 16 } },
            h('div', {
              style: {
                width: 46,
                height: 46,
                borderRadius: 10,
                border: '2px solid #d9b45d',
              },
            }),
            h(
              'div',
              { style: { display: 'flex', fontSize: 35, fontWeight: 800, letterSpacing: -1 } },
              h('span', null, 'FIDIC'),
              h('span', { style: { color: '#d9b45d' } }, '.uz'),
            ),
          ),
          h('div', {
            style: {
              fontSize: 22,
              fontWeight: 800,
              letterSpacing: 7,
              color: '#d9b45d',
              textTransform: 'uppercase',
            },
            children: 'BRIDGE CONSULT',
          }),
        ),
        h('div', {
          style: {
            marginTop: 40,
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 5,
            color: '#d9b45d',
            textTransform: 'uppercase',
            maxWidth: 900,
            ...lineClampStyle(1),
          },
          children: tag,
        }),
        h('div', {
          style: {
            marginTop: 20,
            // The card gives 398px of inner height and the surrounding rows eat
            // ~164 of it, so three title lines have to fit in ~230px. At the old
            // flat 64px the third line overflowed and the footer collided with
            // it — visible on any title that wrapped to three lines.
            fontSize: titleFontSize(title),
            lineHeight: 1.06,
            fontWeight: 800,
            letterSpacing: -2,
            maxWidth: 850,
            ...lineClampStyle(3),
          },
          children: title,
        }),
        h(
          'div',
          {
            style: {
              marginTop: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#a6adbb',
              fontSize: 24,
            },
          },
          h('div', null, 'Infrastructure contracts · FIDIC · EPC · Claims · DAAB'),
          h('div', {
            style: {
              display: 'flex',
              padding: '13px 24px',
              borderRadius: 999,
              border: '1px solid rgba(217,180,93,.55)',
              color: '#d9b45d',
              fontWeight: 800,
            },
            children: 'fidic.uz',
          }),
        ),
      ),
    ),
    {
      width: WIDTH,
      height: HEIGHT,
      fonts: [
        {
          name: 'Liberation Sans',
          data: regularFontData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Liberation Sans',
          data: boldFontData,
          style: 'normal',
          weight: 800,
        },
      ],
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    },
  );
}

export default async function handler(req, res) {
  const rawUrl = typeof req?.url === 'string' ? req.url : '/api/og';
  const header = (name) => {
    if (typeof req?.headers?.get === 'function') return req.headers.get(name);
    return req?.headers?.[name];
  };
  const host = header('host') || 'fidic.uz';
  const protocol = header('x-forwarded-proto') || 'https';
  const pathname = rawUrl.startsWith('/') ? rawUrl : `/${rawUrl}`;
  const requestUrl = rawUrl.startsWith('http') ? rawUrl : `${protocol}://${host}${pathname}`;
  const image = await createImageResponse(requestUrl);

  if (res && typeof res.setHeader === 'function') {
    image.headers.forEach((value, key) => res.setHeader(key, value));
    res.statusCode = image.status || 200;
    res.end(Buffer.from(await image.arrayBuffer()));
    return;
  }

  return image;
}
