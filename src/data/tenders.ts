// Typed access to the tender snapshot produced by scripts/fetch-tenders.mjs.
//
// The JSON is committed so the build never depends on an upstream API being
// reachable. Refresh it on a schedule; the page is as fresh as the last run.

import snapshot from './tenders.json';
import type { Lang } from '../i18n/ui';

export interface TenderNotice {
  id: string;
  /** Date this notice entered the archive, not the date it was published. */
  firstSeen?: string;
  country: string;
  projectId: string | null;
  projectName: string | null;
  title: string;
  reference: string | null;
  noticeType: string | null;
  method: string | null;
  noticeDate: string | null;
  deadline: string | null;
  deadlineTime: string | null;
  url: string | null;
  projectUrl: string | null;
}

export interface TenderSnapshot {
  generatedAt: string;
  source: { name: string; url: string; api: string };
  countries: string[];
  counts: { total: number; open: number; awards: number };
  /** Earliest notice date the archive keeps, as ISO date. */
  archiveFrom?: string;
  notices: TenderNotice[];
  partial?: string[];
}

export const tenders = snapshot as TenderSnapshot;

/** Notice types that represent an opportunity rather than a completed award. */
const OPPORTUNITY_TYPES = new Set([
  'Invitation for Bids',
  'Invitation for Prequalification',
  'Request for Expression of Interest',
  'General Procurement Notice',
]);

export function isOpportunity(n: TenderNotice): boolean {
  return !!n.noticeType && OPPORTUNITY_TYPES.has(n.noticeType);
}

/**
 * Still accepting submissions as at `today`.
 *
 * `today` is passed in rather than read from the clock so the value is fixed at
 * build time — otherwise the rendered page and the schema could disagree.
 */
export function openNotices(today: string): TenderNotice[] {
  return tenders.notices
    .filter((n) => isOpportunity(n) && n.deadline && n.deadline >= today)
    .sort((a, b) => (a.deadline || '').localeCompare(b.deadline || ''));
}

export function recentAwards(limit = 40): TenderNotice[] {
  return tenders.notices
    .filter((n) => n.noticeType === 'Contract Award')
    .sort((a, b) => (b.noticeDate || '').localeCompare(a.noticeDate || ''))
    .slice(0, limit);
}

export function countryCounts(): { country: string; count: number }[] {
  const map = new Map<string, number>();
  for (const n of tenders.notices) map.set(n.country, (map.get(n.country) || 0) + 1);
  return [...map.entries()]
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);
}

/**
 * URL slug per country. Written out rather than derived from the source name:
 * the World Bank publishes "Kyrgyz Republic", but nobody searches for that —
 * the slug has to be the word people type.
 */
const countrySlugs: Record<string, string> = {
  Uzbekistan: 'uzbekistan',
  Kazakhstan: 'kazakhstan',
  'Kyrgyz Republic': 'kyrgyzstan',
  Tajikistan: 'tajikistan',
  Turkmenistan: 'turkmenistan',
  Georgia: 'georgia',
  Azerbaijan: 'azerbaijan',
  Armenia: 'armenia',
};

export function countrySlug(country: string): string | null {
  return countrySlugs[country] ?? null;
}

/**
 * Countries worth their own page. A country the snapshot has no notices for
 * would render an empty listing — thin content on a URL that promises data —
 * so the floor is checked against the data, not against the country list.
 * Turkmenistan sits at zero today and simply gets no page until it does not.
 */
const MIN_NOTICES = 5;

export function countryPages(): { country: string; slug: string; count: number }[] {
  return countryCounts()
    .filter((c) => c.count >= MIN_NOTICES && countrySlugs[c.country])
    .map((c) => ({ country: c.country, slug: countrySlugs[c.country], count: c.count }));
}

export function countryBySlug(slug: string): string | null {
  return Object.keys(countrySlugs).find((c) => countrySlugs[c] === slug) ?? null;
}

export function noticesFor(country: string): TenderNotice[] {
  return tenders.notices.filter((n) => n.country === country);
}

/**
 * Notices per calendar year, oldest first. The archive is cumulative, so this
 * grows on its own — it is the one view of this data that gets more useful with
 * every refresh rather than just newer.
 */
export function yearCounts(country?: string): { year: string; count: number }[] {
  const source = country ? noticesFor(country) : tenders.notices;
  const map = new Map<string, number>();
  for (const n of source) {
    if (!n.noticeDate) continue;
    const year = n.noticeDate.slice(0, 4);
    map.set(year, (map.get(year) || 0) + 1);
  }
  return [...map.entries()].map(([year, count]) => ({ year, count })).sort((a, b) => a.year.localeCompare(b.year));
}

/** Projects the country's notices belong to, busiest first. */
export function projectsFor(country: string): { id: string | null; name: string; url: string | null; count: number }[] {
  const map = new Map<string, { id: string | null; name: string; url: string | null; count: number }>();
  for (const n of noticesFor(country)) {
    if (!n.projectName) continue;
    const key = n.projectId ?? n.projectName;
    const hit = map.get(key);
    if (hit) hit.count++;
    else map.set(key, { id: n.projectId, name: n.projectName, url: n.projectUrl, count: 1 });
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

/** Country names as published by the source, localized for display only. */
const countryNames: Record<string, Record<Lang, string>> = {
  Uzbekistan: { ru: 'Узбекистан', en: 'Uzbekistan', uz: 'Oʻzbekiston' },
  Kazakhstan: { ru: 'Казахстан', en: 'Kazakhstan', uz: 'Qozogʻiston' },
  'Kyrgyz Republic': { ru: 'Кыргызстан', en: 'Kyrgyz Republic', uz: 'Qirgʻiziston' },
  Tajikistan: { ru: 'Таджикистан', en: 'Tajikistan', uz: 'Tojikiston' },
  Turkmenistan: { ru: 'Туркменистан', en: 'Turkmenistan', uz: 'Turkmaniston' },
  Georgia: { ru: 'Грузия', en: 'Georgia', uz: 'Gruziya' },
  Azerbaijan: { ru: 'Азербайджан', en: 'Azerbaijan', uz: 'Ozarbayjon' },
  Armenia: { ru: 'Армения', en: 'Armenia', uz: 'Armaniston' },
};

export function localizeCountry(country: string, lang: Lang): string {
  return countryNames[country]?.[lang] ?? country;
}

/**
 * The country in the "in <country>" form — Russian prepositional case, Uzbek
 * locative. Headings read "Тендеры в Узбекистане", not "Тендеры в Узбекистан",
 * and no amount of string concatenation gets there from the nominative.
 */
const countryIn: Record<string, Record<Lang, string>> = {
  Uzbekistan: { ru: 'Узбекистане', en: 'Uzbekistan', uz: 'Oʻzbekistonda' },
  Kazakhstan: { ru: 'Казахстане', en: 'Kazakhstan', uz: 'Qozogʻistonda' },
  'Kyrgyz Republic': { ru: 'Кыргызстане', en: 'the Kyrgyz Republic', uz: 'Qirgʻizistonda' },
  Tajikistan: { ru: 'Таджикистане', en: 'Tajikistan', uz: 'Tojikistonda' },
  Turkmenistan: { ru: 'Туркменистане', en: 'Turkmenistan', uz: 'Turkmanistonda' },
  Georgia: { ru: 'Грузии', en: 'Georgia', uz: 'Gruziyada' },
  Azerbaijan: { ru: 'Азербайджане', en: 'Azerbaijan', uz: 'Ozarbayjonda' },
  Armenia: { ru: 'Армении', en: 'Armenia', uz: 'Armanistonda' },
};

export function localizeCountryIn(country: string, lang: Lang): string {
  return countryIn[country]?.[lang] ?? localizeCountry(country, lang);
}

const noticeTypeNames: Record<string, Record<Lang, string>> = {
  'Invitation for Bids': { ru: 'Приглашение к торгам', en: 'Invitation for Bids', uz: 'Tenderga taklif' },
  'Invitation for Prequalification': { ru: 'Предквалификация', en: 'Invitation for Prequalification', uz: 'Oldindan malaka' },
  'Request for Expression of Interest': { ru: 'Запрос выражения интереса', en: 'Request for Expression of Interest', uz: 'Qiziqish bildirish soʻrovi' },
  'General Procurement Notice': { ru: 'Общее закупочное уведомление', en: 'General Procurement Notice', uz: 'Umumiy xarid xabarnomasi' },
  'Contract Award': { ru: 'Контракт присуждён', en: 'Contract Award', uz: 'Shartnoma berildi' },
};

export function localizeNoticeType(type: string | null, lang: Lang): string {
  if (!type) return '—';
  return noticeTypeNames[type]?.[lang] ?? type;
}
