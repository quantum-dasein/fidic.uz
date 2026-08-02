#!/usr/bin/env node
/**
 * Map changed source files to the public URLs they render, one per line.
 *
 *   git diff --name-only HEAD~1 HEAD | node scripts/changed-urls.mjs
 *   node scripts/changed-urls.mjs src/content/articles/en/daab-explained.mdx
 *
 * Feeds scripts/indexnow.mjs so a deploy announces the pages that actually
 * changed. The alternative — submitting the whole sitemap on every push — tells
 * the crawlers "all 313 pages changed" every time someone fixes a typo in a
 * component, which is the same lie as stamping build time into every lastmod.
 *
 * Deliberately conservative: a file it cannot map to a specific URL produces
 * nothing rather than a guess. Shared components (a layout, the header) touch
 * every page and map to none — for those, run the workflow by hand with the
 * `all` scope.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGIN = 'https://fidic.uz';
const LOCALES = new Set(['ru', 'en', 'uz']);

/** Pages that render `noindex` and are kept out of the sitemap; never announce them. */
const EXCLUDED = /^\/(admin|verify)(\/|$)/;

const localize = (canonical, lang) => (lang === 'ru' ? canonical : `/${lang}${canonical}`);

function fromArticle(file) {
  // src/content/articles/en/daab-explained.mdx → /en/knowledge/daab-explained/
  const m = file.match(/^src\/content\/articles\/(ru|en|uz)\/(.+)\.mdx?$/);
  if (!m) return [];
  return [localize(`/knowledge/${m[2]}/`, m[1])];
}

function fromPage(file) {
  // src/pages/en/tenders.astro → /en/tenders/ ; src/pages/index.astro → /
  const m = file.match(/^src\/pages\/(.+)\.astro$/);
  if (!m) return [];
  const parts = m[1].split('/');
  // Dynamic routes ([slug]) expand to many URLs that this diff cannot name.
  if (parts.some((p) => p.includes('[') || p.includes(']'))) return [];
  if (parts[parts.length - 1] === 'index') parts.pop();
  const route = parts.length ? `/${parts.join('/')}/` : '/';
  return [route];
}

/**
 * Page components are shared across all three locales, so one edit means three
 * URLs. The map is explicit rather than derived: guessing wrong would announce
 * a URL that does not exist.
 */
const SHARED_COMPONENTS = {
  'src/components/pages/Home.astro': '/',
  'src/components/pages/TendersPage.astro': '/tenders/',
  'src/components/pages/GlossaryPage.astro': '/glossary/',
  'src/components/pages/KnowledgePage.astro': '/knowledge/',
  'src/components/pages/ClausesIndexPage.astro': '/clauses/',
  'src/components/pages/ToolsPage.astro': '/tools/',
  'src/components/pages/ResourcesPage.astro': '/resources/',
  'src/components/pages/CertificationPage.astro': '/certification/',
  'src/components/pages/MdbCasesPage.astro': '/mdb-project-cases/',
};

function fromSharedComponent(file) {
  const canonical = SHARED_COMPONENTS[file];
  if (!canonical) return [];
  return ['ru', 'en', 'uz'].map((lang) => localize(canonical, lang));
}

/**
 * The per-country tender pages come from a dynamic route, so a diff cannot name
 * them. Read the countries back out of the build instead of keeping a second
 * copy of the slug list that would rot the moment the data changes.
 */
function fromCountryTemplate(file) {
  if (file !== 'src/components/pages/TenderCountryPage.astro') return [];
  const dir = path.join(ROOT, 'dist', 'tenders');
  let slugs = [];
  try {
    slugs = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name);
  } catch {
    return [];
  }
  return slugs.flatMap((slug) => ['ru', 'en', 'uz'].map((lang) => localize(`/tenders/${slug}/`, lang)));
}

function urlsFor(file) {
  const normalized = file.replaceAll('\\', '/').trim();
  if (!normalized) return [];
  return [
    ...fromArticle(normalized),
    ...fromPage(normalized),
    ...fromSharedComponent(normalized),
    ...fromCountryTemplate(normalized),
  ];
}

function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8');
  } catch {
    return '';
  }
}

const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : readStdin().split('\n');

const routes = new Set();
for (const file of files) {
  for (const route of urlsFor(file)) {
    if (!EXCLUDED.test(route)) routes.add(route);
  }
}

// A route only counts if the build actually produced it — a deleted or renamed
// page would otherwise be announced as changed and answer 404.
const dist = path.join(ROOT, 'dist');
const built = fs.existsSync(dist);
const exists = (route) => fs.existsSync(path.join(dist, route.slice(1), 'index.html'));

const out = [...routes]
  .filter((route) => !built || route === '/' || exists(route))
  .sort()
  .map((route) => ORIGIN + route);

if (out.length) process.stdout.write(out.join('\n') + '\n');
process.stderr.write(`changed-urls: ${out.length} URL(s) from ${files.filter(Boolean).length} file(s)\n`);
