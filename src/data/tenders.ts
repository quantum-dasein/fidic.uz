// Typed access to the tender snapshot produced by scripts/fetch-tenders.mjs.
//
// The JSON is committed so the build never depends on an upstream API being
// reachable. Refresh it on a schedule; the page is as fresh as the last run.

import snapshot from './tenders.json';
import type { Lang } from '../i18n/ui';

export interface TenderNotice {
  id: string;
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
