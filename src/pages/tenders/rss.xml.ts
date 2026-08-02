// RSS for the open tender list.
//
// The tender tracker is the one thing on this site people ask for rather than
// have to be sold, and until now the only way to use it was to remember to open
// the page. A feed means a contractor's reader, a Telegram bot or a Slack
// integration can watch it instead — which is also how the page gets shared
// into places a backlink might follow.
//
// Open opportunities only: an award notice is history, and nobody wants it
// arriving as an alert.
import type { APIRoute } from 'astro';
import { tenders, openNotices, localizeCountry, localizeNoticeType } from '../../data/tenders';
import { site } from '../../data/site';

export const prerender = true;

const esc = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = () => {
  const today = new Date(tenders.generatedAt).toISOString().slice(0, 10);
  const open = openNotices(today);

  const items = open
    .map((n) => {
      const link = n.url ?? `${site.url}/tenders/`;
      const parts = [
        `Страна: ${localizeCountry(n.country, 'ru')}`,
        `Тип: ${localizeNoticeType(n.noticeType, 'ru')}`,
        n.deadline ? `Дедлайн подачи: ${n.deadline}` : null,
        n.projectName ? `Проект: ${n.projectName}` : null,
        n.reference ? `Референс: ${n.reference}` : null,
        n.method ? `Метод закупки: ${n.method}` : null,
      ].filter(Boolean);
      // The deadline is what makes an item worth acting on, so it leads the title.
      const title = `${localizeCountry(n.country, 'ru')} · ${n.title}`;
      return `    <item>
      <title>${esc(title)}</title>
      <link>${esc(link)}</link>
      <guid isPermaLink="false">fidic.uz-tender-${esc(n.id)}</guid>
      ${n.noticeDate ? `<pubDate>${new Date(`${n.noticeDate}T00:00:00Z`).toUTCString()}</pubDate>` : ''}
      <category>${esc(localizeCountry(n.country, 'ru'))}</category>
      <description>${esc(parts.join(' · '))}</description>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>FIDIC.uz — открытые тендеры на работы (Всемирный банк)</title>
    <link>${site.url}/tenders/</link>
    <atom:link href="${site.url}/tenders/rss.xml" rel="self" type="application/rss+xml" />
    <description>Открытые тендеры на строительные работы в проектах Всемирного банка по Центральной Азии и Кавказу. Обновляется ежедневно.</description>
    <language>ru</language>
    <lastBuildDate>${new Date(tenders.generatedAt).toUTCString()}</lastBuildDate>
    <ttl>720</ttl>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
