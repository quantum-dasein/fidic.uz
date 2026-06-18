// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://fidic.uz',
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
