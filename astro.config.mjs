// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';

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
      // Weight the key SEO surfaces higher than deep/utility pages so crawlers
      // spend budget where it matters. lastmod = build time.
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/^\/(en|uz)(?=\/|$)/, '') || '/';
        let priority = 0.6;
        let changefreq = 'monthly';
        if (path === '/') { priority = 1.0; changefreq = 'weekly'; }
        else if (/^\/(clauses|glossary|knowledge|tools)\/?$/.test(path)) { priority = 0.9; changefreq = 'weekly'; }
        else if (path.startsWith('/clauses/') || path.startsWith('/knowledge/')) { priority = 0.8; changefreq = 'weekly'; }
        else if (path.startsWith('/tools/') || path === '/mdb-project-cases/' || path === '/certification/') { priority = 0.7; changefreq = 'monthly'; }
        else if (path.startsWith('/verify') || path.startsWith('/admin')) { priority = 0.2; changefreq = 'yearly'; }
        item.priority = priority;
        item.changefreq = changefreq;
        item.lastmod = new Date().toISOString();
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
