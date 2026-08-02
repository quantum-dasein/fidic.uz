#!/usr/bin/env node
/**
 * Refresh the Central Asia / Caucasus tender snapshot from the World Bank
 * Procurement Notices API.
 *
 *   node scripts/fetch-tenders.mjs
 *
 * Writes src/data/tenders.json, which the build renders statically so the page
 * is indexable. Run it on a schedule and commit the result; the page is then as
 * fresh as the last run.
 *
 * Deliberately World Bank only. ADB returns 403 to automated clients and EBRD
 * publishes no usable feed, so claiming to cover them would be a lie on the
 * page. If either opens up, add a source here and to SOURCES below.
 *
 * The script never throws on network failure: a build must not break because an
 * upstream API had a bad minute. It exits non-zero so a scheduled run reports
 * the failure, but leaves the existing snapshot untouched.
 *
 * The snapshot is CUMULATIVE. Each run merges the API response into what is
 * already on disk instead of replacing it, because the upstream response is a
 * moving window: a notice that scrolls out of the API's rows is gone for good,
 * and the award history is the part of this dataset nobody else in the region
 * publishes. Merging also means a partial outage — one country failing — can no
 * longer silently delete that country's notices from the site.
 *
 * Each record carries `firstSeen` — when it entered this archive. Nothing else
 * is stamped per run: a `lastSeen` on every live record would rewrite all
 * ~3,000 of them daily and turn a two-line change into a two-thousand-line
 * commit, and a "gone from source" flag proved to be noise — paging the API
 * without a stable sort drops a couple of records at random on each run, which
 * is indistinguishable from a genuine withdrawal.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'src', 'data', 'tenders.json');

const API = 'https://search.worldbank.org/api/v2/procnotices';

// Countries where FIDIC-based works contracts are actually procured in the
// region this site covers.
const COUNTRIES = [
  'Uzbekistan',
  'Kazakhstan',
  'Kyrgyz Republic',
  'Tajikistan',
  'Turkmenistan',
  'Georgia',
  'Azerbaijan',
  'Armenia',
];

// CW = civil works, the group FIDIC forms govern. GO/CS/NC are goods,
// consulting and non-consulting services — out of scope for this page.
//
// This filters SERVER-SIDE. It used to be applied to the response instead,
// which quietly capped the dataset: `rows=300` returned 300 notices of every
// category, of which ~108 were works, and the rest of the country's works
// history was never requested. Uzbekistan alone has 1005.
const WORKS_GROUP = 'CW';

/**
 * How far back the archive goes. Procurement older than this is of no use to
 * anyone bidding today, and the file is committed on every refresh — the limit
 * is what keeps that from growing without end.
 */
const ARCHIVE_FROM = '2019-01-01';

// Award notices are history, not opportunity, but they are the evidence of what
// the market actually procured, so they are kept and shown separately.
const OPPORTUNITY_TYPES = new Set([
  'Invitation for Bids',
  'Invitation for Prequalification',
  'Request for Expression of Interest',
  'General Procurement Notice',
]);

const ROWS = 500;
/** Guard against a runaway loop if the API ever stops honouring `os`. */
const MAX_PAGES = 12;

async function fetchPage(country, offset) {
  const url = `${API}?${new URLSearchParams({
    format: 'json',
    rows: String(ROWS),
    os: String(offset),
    project_ctry_name: country,
    procurement_group: WORKS_GROUP,
  })}`;
  const res = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'fidic.uz tender tracker (+https://fidic.uz)' },
    signal: AbortSignal.timeout(45_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  return {
    rows: Array.isArray(body?.procnotices) ? body.procnotices : [],
    total: Number(body?.total) || 0,
  };
}

async function fetchCountry(country) {
  const out = [];
  let total = Infinity;
  for (let page = 0; page < MAX_PAGES && out.length < total; page++) {
    const { rows, total: reported } = await fetchPage(country, page * ROWS);
    if (page === 0) total = reported;
    if (rows.length === 0) break;
    out.push(...rows);
  }
  return out;
}

/** "17-Jul-2026" -> "2026-07-17"; anything unparseable becomes null. */
function isoFromNoticeDate(value) {
  if (!value) return null;
  const m = /^(\d{2})-([A-Za-z]{3})-(\d{4})$/.exec(String(value).trim());
  if (!m) return null;
  const months = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
  const mm = months[m[2].toLowerCase()];
  return mm ? `${m[3]}-${mm}-${m[1]}` : null;
}

function normalize(raw) {
  const deadline = raw.submission_deadline_date ? String(raw.submission_deadline_date).slice(0, 10) : null;
  return {
    id: raw.id,
    country: raw.project_ctry_name || null,
    projectId: raw.project_id || null,
    projectName: raw.project_name || null,
    title: (raw.bid_description || '').replace(/\s+/g, ' ').trim() || null,
    reference: raw.bid_reference_no || null,
    noticeType: raw.notice_type || null,
    method: raw.procurement_method_name || null,
    noticeDate: isoFromNoticeDate(raw.noticedate),
    deadline,
    deadlineTime: raw.submission_deadline_time || null,
    url: raw.id ? `https://projects.worldbank.org/en/projects-operations/procurement-detail/${raw.id}` : null,
    projectUrl: raw.project_id ? `https://projects.worldbank.org/en/projects-operations/project-detail/${raw.project_id}` : null,
  };
}

/** The snapshot already on disk, or an empty one on a first run. */
function readExisting() {
  try {
    const parsed = JSON.parse(fs.readFileSync(OUT, 'utf8'));
    return { notices: Array.isArray(parsed.notices) ? parsed.notices : [] };
  } catch {
    return { notices: [] };
  }
}

async function main() {
  const collected = [];
  const failures = [];

  for (const country of COUNTRIES) {
    try {
      const rows = await fetchCountry(country);
      collected.push(...rows);
      process.stderr.write(`  ${country}: ${rows.length}\n`);
    } catch (err) {
      failures.push(`${country}: ${err.message}`);
      process.stderr.write(`  ${country}: FAILED (${err.message})\n`);
    }
  }

  if (collected.length === 0) {
    throw new Error(`no notices retrieved; snapshot left untouched. ${failures.join('; ')}`);
  }

  const works = collected
    // Belt and braces: the server filter is authoritative, this catches a
    // silently ignored parameter rather than trusting it.
    .filter((r) => r.procurement_group === WORKS_GROUP)
    .map(normalize)
    .filter((r) => r.id && r.title && r.country)
    .filter((r) => !r.noticeDate || r.noticeDate >= ARCHIVE_FROM);

  const today = new Date().toISOString().slice(0, 10);

  // Start from what is already on disk, then let this run's response overwrite
  // it field by field. Anything the API no longer returns keeps its last known
  // state and its original `firstSeen`.
  const byId = new Map();
  for (const n of readExisting().notices) byId.set(n.id, n);

  let added = 0;
  for (const n of works) {
    // The same notice surfaces under more than one country query; the second
    // hit must not count as new.
    const previous = byId.get(n.id);
    if (!previous) added++;
    byId.set(n.id, { ...previous, ...n, firstSeen: previous?.firstSeen ?? today });
  }

  const all = [...byId.values()]
    .filter((n) => !n.noticeDate || n.noticeDate >= ARCHIVE_FROM)
    .sort((a, b) => (b.noticeDate || '').localeCompare(a.noticeDate || ''));

  const snapshot = {
    generatedAt: new Date().toISOString(),
    source: {
      name: 'World Bank Procurement Notices',
      url: 'https://projects.worldbank.org/en/projects-operations/procurement',
      api: API,
    },
    countries: COUNTRIES,
    counts: {
      total: all.length,
      open: all.filter((n) => n.deadline && n.deadline >= today && OPPORTUNITY_TYPES.has(n.noticeType)).length,
      awards: all.filter((n) => n.noticeType === 'Contract Award').length,
    },
    archiveFrom: ARCHIVE_FROM,
    notices: all,
    partial: failures.length ? failures : undefined,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  process.stderr.write(
    `\nwrote ${path.relative(ROOT, OUT)}: ${snapshot.notices.length} works notices ` +
      `(${added} new this run, ${snapshot.counts.open} open, ${snapshot.counts.awards} awards)\n`,
  );
  if (failures.length) process.stderr.write(`partial: ${failures.join('; ')}\n`);
}

main().catch((err) => {
  process.stderr.write(`fetch-tenders failed: ${err.message}\n`);
  process.exitCode = 1;
});
