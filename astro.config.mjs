// @ts-check
import fs from 'node:fs';
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

// Real per-article lastmod, read from MDX frontmatter (`updated` if present,
// otherwise `date`). Anything we cannot date honestly gets NO lastmod at all:
// stamping every URL with the build time tells Google the whole site changed on
// every deploy, which is how a site trains crawlers to ignore the field.
function articleLastmodMap() {
  const base = new URL('./src/content/articles/', import.meta.url);
  const map = new Map();
  for (const lang of ['ru', 'en', 'uz']) {
    const dir = new URL(`${lang}/`, base);
    let files;
    try {
      files = fs.readdirSync(dir);
    } catch {
      continue;
    }
    for (const file of files) {
      if (!/\.mdx?$/.test(file)) continue;
      // Some of these files carry a UTF-8 BOM; Astro's loader strips it, so it
      // stays invisible until a raw read like this one silently misses `^---`.
      const source = fs.readFileSync(new URL(file, dir), 'utf8').replace(/^\uFEFF/, '');
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
      if (!frontmatter) continue;
      const field = (key) => frontmatter[1].match(new RegExp(`^${key}:\\s*(\\S+)`, 'm'))?.[1];
      const stamp = new Date(field('updated') ?? field('date') ?? '');
      if (Number.isNaN(stamp.getTime())) continue;
      const prefix = lang === 'ru' ? '' : `/${lang}`;
      map.set(`${prefix}/knowledge/${file.replace(/\.mdx?$/, '')}/`, stamp.toISOString());
    }
  }
  return map;
}

// /tenders/ is regenerated daily from the World Bank API, but the "articles
// only" rule above left the one page that actually changes every day without a
// lastmod at all — so crawlers had no way to tell it was fresh. The snapshot
// carries an honest `generatedAt`, which is exactly what the field is for.
// Matched by path rather than enumerated, so the per-country pages inherit it
// automatically as countries come and go from the snapshot.
function tendersGeneratedAt() {
  try {
    const stamp = new Date(JSON.parse(fs.readFileSync(new URL('./src/data/tenders.json', import.meta.url), 'utf8')).generatedAt);
    return Number.isNaN(stamp.getTime()) ? null : stamp.toISOString();
  } catch {
    // No snapshot, no claim — same rule as the articles above.
    return null;
  }
}

const articleLastmod = articleLastmodMap();
const tendersLastmod = tendersGeneratedAt();

// Add a trailing slash to internal links inside Markdown/MDX bodies so they
// match `trailingSlash: 'always'` and avoid 308 redirects. Skips external
// links, anchors, query strings, and file URLs.
function rehypeInternalTrailingSlash() {
  const fix = (href) => {
    if (typeof href !== 'string') return href;
    if (!href.startsWith('/') || href.startsWith('//')) return href;
    if (href.includes('#') || href.includes('?')) return href;
    if (href.endsWith('/')) return href;
    if (/\.[a-z0-9]+$/i.test(href)) return href;
    return `${href}/`;
  };
  const walk = (node) => {
    if (node.type === 'element' && node.tagName === 'a' && node.properties) {
      node.properties.href = fix(node.properties.href);
    }
    if (node.children) node.children.forEach(walk);
  };
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://fidic.uz',
  trailingSlash: 'always',
  markdown: {
    processor: unified({
      rehypePlugins: [rehypeInternalTrailingSlash],
    }),
  },
  devToolbar: { enabled: false },
  build: {
    // Every page ships the big shared Layout stylesheet plus one or two small
    // page-level ones. Three render-blocking stylesheets means three ways to
    // half-fail: on a flaky mobile connection the shared sheet can arrive while
    // a page-level one does not, and the page renders with its layout intact
    // and every component stripped of its borders, padding and backgrounds —
    // which reads as "the site is broken" rather than "a request failed".
    // 'auto' inlines any stylesheet under vite's assetsInlineLimit, raised
    // below for CSS only, so the page-level sheets travel inside the HTML and
    // cannot arrive separately. The shared Layout sheet stays external and
    // immutably cached, which is where the caching value actually is.
    inlineStylesheets: 'auto',
  },
  i18n: {
    locales: ['ru', 'en', 'uz'],
    defaultLocale: 'ru',
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'ru',
        locales: { ru: 'ru', en: 'en', uz: 'uz' },
      },
      // /admin and /verify render `noindex, nofollow`. Listing a noindex URL in
      // a sitemap is a contradictory signal and Search Console reports it as an
      // error indefinitely; the certificate pages also carry holder names, which
      // have no business being advertised to crawlers.
      filter: (page) => !/\/(admin|verify)(\/|$)/.test(new URL(page).pathname),
      // Weight the key SEO surfaces higher than deep/utility pages so crawlers
      // spend budget where it matters.
      serialize(item) {
        const pathname = new URL(item.url).pathname;
        // /ka/ is a standalone Georgian page, not a locale. The i18n grouping
        // above only knows ru/en/uz, so it reads the path as a default-locale
        // URL and annotates it hreflang="ru" — a wrong signal on the one page
        // whose language is the entire point. It has no alternates; say so.
        if (pathname.startsWith('/ka/')) delete item.links;
        const path = pathname.replace(/^\/(en|uz)(?=\/|$)/, '') || '/';
        let priority = 0.6;
        let changefreq = 'monthly';
        if (path === '/') { priority = 1.0; changefreq = 'weekly'; }
        // Refreshed by the daily Action, and the only pages here whose value is
        // the freshness itself. The per-country pages sit just under the hub.
        else if (path === '/tenders/') { priority = 0.9; changefreq = 'daily'; }
        else if (path.startsWith('/tenders/')) { priority = 0.8; changefreq = 'daily'; }
        else if (/^\/(clauses|glossary|knowledge|tools)\/?$/.test(path)) { priority = 0.9; changefreq = 'weekly'; }
        // Per-term glossary pages: definitional long-tail, stable content.
        else if (path.startsWith('/glossary/')) { priority = 0.7; changefreq = 'monthly'; }
        else if (path.startsWith('/clauses/') || path.startsWith('/knowledge/')) { priority = 0.8; changefreq = 'weekly'; }
        else if (path.startsWith('/tools/') || path === '/mdb-project-cases/' || path === '/certification/') { priority = 0.7; changefreq = 'monthly'; }
        else if (path.startsWith('/about/')) { priority = 0.6; changefreq = 'yearly'; }
        item.priority = priority;
        item.changefreq = changefreq;
        const lastmod = path.startsWith('/tenders/') ? tendersLastmod : articleLastmod.get(pathname);
        if (lastmod) item.lastmod = lastmod;
        else delete item.lastmod;
        return item;
      },
    }),
  ],
  vite: {
    cacheDir: 'node_modules/.vite-fidic',
    optimizeDeps: {
      // Kept for this Windows/Codex workspace: without the explicit disable,
      // Astro/Vite tries to prebundle dev-toolbar a11y deps and hits a sandbox
      // access error. Vite may warn, but the production build stays stable.
      disabled: true,
      noDiscovery: true,
      include: [],
      exclude: ['aria-query', 'axobject-query', 'astro/runtime/client/dev-toolbar/entrypoint.js'],
    },
    build: {
      // CSS only: page-level stylesheets up to 24kB get inlined into the HTML
      // (see build.inlineStylesheets above). Everything else — images, fonts —
      // keeps vite's 4kB default, so this does not start base64-ing assets.
      assetsInlineLimit: (filePath, content) =>
        filePath.endsWith('.css') ? content.length <= 24_000 : undefined,
      // Three.js is intentionally isolated and lazy-loaded only on 3D pages.
      // Keep the warning focused on accidental large app chunks.
      chunkSizeWarningLimit: 800,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules/three')) return 'vendor-three';
            if (id.includes('node_modules/lenis')) return 'vendor-lenis';
            if (id.includes('node_modules/@vercel/og')) return 'vendor-og';
          },
        },
      },
    },
    plugins: [tailwindcss()],
  },
});
