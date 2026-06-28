// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

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
    rehypePlugins: [rehypeInternalTrailingSlash],
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
    }),
  ],
  vite: {
    cacheDir: '.astro/vite',
    optimizeDeps: {
      disabled: true,
      exclude: ['aria-query', 'axobject-query', 'astro/runtime/client/dev-toolbar/entrypoint.js'],
    },
    plugins: [tailwindcss()],
  },
});
