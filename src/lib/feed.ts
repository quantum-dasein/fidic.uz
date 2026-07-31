// RSS 2.0 feed builder shared by the per-locale feed endpoints.
//
// Hand-rolled rather than pulling in @astrojs/rss: the feed is a few dozen lines
// of XML and this keeps control over the Atom self-link and the language tag,
// both of which matter for a trilingual site with one feed per locale.

import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { getAuthor } from '../data/authors';
import { type Lang, localizePath, categoryLabel } from '../i18n/ui';

const RSS_LOCALE: Record<Lang, string> = { ru: 'ru-RU', en: 'en-US', uz: 'uz-UZ' };

const FEED_TITLE: Record<Lang, string> = {
  ru: 'FIDIC.uz — база знаний',
  en: 'FIDIC.uz — knowledge base',
  uz: 'FIDIC.uz — bilimlar bazasi',
};

const FEED_DESCRIPTION: Record<Lang, string> = {
  ru: 'Новые материалы о контрактах FIDIC, claims, DAAB и проектах международных банков развития в Узбекистане и Центральной Азии.',
  en: 'New material on FIDIC contracts, claims, DAAB and multilateral development bank projects in Uzbekistan and Central Asia.',
  uz: 'FIDIC shartnomalari, claims, DAAB va Oʻzbekiston hamda Markaziy Osiyodagi xalqaro taraqqiyot banklari loyihalari boʻyicha yangi materiallar.',
};

/** XML text escaping. Applied to every interpolated value without exception. */
function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function buildFeed(lang: Lang): Promise<Response> {
  const articles = (await getCollection('articles'))
    .filter((a) => a.id.startsWith(`${lang}/`))
    .sort((a, b) => (b.data.updated ?? b.data.date).getTime() - (a.data.updated ?? a.data.date).getTime())
    .slice(0, 30);

  const feedPath = lang === 'ru' ? '/rss.xml' : `/${lang}/rss.xml`;
  const feedUrl = `${site.url}${feedPath}`;
  const homeUrl = `${site.url}${localizePath('/', lang)}`;

  const items = articles
    .map((a) => {
      const slug = a.id.slice(lang.length + 1);
      const url = `${site.url}${localizePath(`/knowledge/${slug}`, lang)}`;
      const author = getAuthor(a.data.authorSlug);
      // Feed readers sort on pubDate; use the revision date so a substantive
      // rewrite resurfaces rather than staying buried at its original position.
      const stamp = (a.data.updated ?? a.data.date).toUTCString();
      return [
        '    <item>',
        `      <title>${esc(a.data.title)}</title>`,
        `      <link>${esc(url)}</link>`,
        `      <guid isPermaLink="true">${esc(url)}</guid>`,
        `      <description>${esc(a.data.description)}</description>`,
        `      <pubDate>${stamp}</pubDate>`,
        `      <category>${esc(categoryLabel(a.data.category, lang))}</category>`,
        `      <dc:creator>${esc(author.name[lang])}</dc:creator>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(FEED_TITLE[lang])}</title>
    <link>${esc(homeUrl)}</link>
    <description>${esc(FEED_DESCRIPTION[lang])}</description>
    <language>${RSS_LOCALE[lang]}</language>
    <atom:link href="${esc(feedUrl)}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
