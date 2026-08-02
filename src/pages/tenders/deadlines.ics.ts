// Submission deadlines as a subscribable calendar.
//
// The 28-day rule is the site's recurring theme, and a tender deadline is the
// same class of problem one step earlier: miss it and nothing else you did
// matters. A calendar a bid team can subscribe to puts the date in the place
// where they already look, instead of on a page they have to remember to open.
//
// All-day events on the deadline date. The source publishes a submission time
// for some notices but not reliably enough to promise an hour.
import type { APIRoute } from 'astro';
import { tenders, openNotices, localizeCountry, localizeNoticeType } from '../../data/tenders';
import { site } from '../../data/site';

export const prerender = true;

/** RFC 5545: escape, then fold lines at 75 octets. */
const esc = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

/**
 * RFC 5545 folds at 75 OCTETS, not characters — and Cyrillic is two bytes per
 * character in UTF-8, so counting characters would produce lines twice over the
 * limit. Split on the encoded length, never mid-character.
 */
const fold = (line: string) => {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const out: string[] = [];
  let current = '';
  let budget = 75;
  // Iterate by code point so surrogate pairs stay intact.
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (encoder.encode(current).length + size > budget) {
      out.push(current);
      current = char;
      budget = 74; // continuation lines start with a space
    } else {
      current += char;
    }
  }
  if (current) out.push(current);
  return out[0] + out.slice(1).map((part) => `\r\n ${part}`).join('');
};

const stamp = (iso: string) => iso.replace(/[-:]/g, '').replace(/\.\d+/, '');
const dateOnly = (iso: string) => iso.replace(/-/g, '');

export const GET: APIRoute = () => {
  const today = new Date(tenders.generatedAt).toISOString().slice(0, 10);
  const open = openNotices(today);
  const dtstamp = stamp(new Date(tenders.generatedAt).toISOString().slice(0, 19)) + 'Z';

  const events = open
    .filter((n) => n.deadline)
    .flatMap((n) => {
      const start = dateOnly(n.deadline!);
      // DTEND is exclusive for all-day events, so it is the day after.
      const end = dateOnly(new Date(new Date(n.deadline!).getTime() + 86_400_000).toISOString().slice(0, 10));
      const summary = `Тендер · ${localizeCountry(n.country, 'ru')}: ${n.title}`;
      const description = [
        localizeNoticeType(n.noticeType, 'ru'),
        n.projectName ? `Проект: ${n.projectName}` : null,
        n.reference ? `Референс: ${n.reference}` : null,
        n.method ? `Метод: ${n.method}` : null,
        n.deadlineTime ? `Время подачи по уведомлению: ${n.deadlineTime}` : null,
        n.url ?? `${site.url}/tenders/`,
        'Всегда сверяйтесь с оригинальным уведомлением: дата могла измениться после последнего обновления.',
      ]
        .filter(Boolean)
        .join('\n');

      return [
        'BEGIN:VEVENT',
        `UID:tender-${n.id}@fidic.uz`,
        `DTSTAMP:${dtstamp}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        fold(`SUMMARY:${esc(summary)}`),
        fold(`DESCRIPTION:${esc(description)}`),
        n.url ? fold(`URL:${n.url}`) : null,
        'TRANSP:TRANSPARENT',
        // A day before is the last useful moment to notice; on the day itself it
        // is usually too late to assemble a bid.
        'BEGIN:VALARM',
        'TRIGGER:-P1D',
        'ACTION:DISPLAY',
        fold(`DESCRIPTION:${esc(`Завтра дедлайн: ${n.title}`)}`),
        'END:VALARM',
        'END:VEVENT',
      ].filter(Boolean);
    });

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FIDIC.uz//Tender deadlines//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    fold('X-WR-CALNAME:FIDIC.uz — дедлайны тендеров (Всемирный банк)'),
    fold('X-WR-CALDESC:Дедлайны подачи по открытым тендерам на работы в Центральной Азии и на Кавказе'),
    'X-PUBLISHED-TTL:PT12H',
    ...events,
    'END:VCALENDAR',
  ];

  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
