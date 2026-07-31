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
const WORKS_GROUP = 'CW';

// Award notices are history, not opportunity, but they are the evidence of what
// the market actually procured, so they are kept and shown separately.
const OPPORTUNITY_TYPES = new Set([
  'Invitation for Bids',
  'Invitation for Prequalification',
  'Request for Expression of Interest',
  'General Procurement Notice',
]);

const ROWS = 300;

async function fetchCountry(country) {
  const url = `${API}?${new URLSearchParams({
    format: 'json',
    rows: String(ROWS),
    project_ctry_name: country,
  })}`;
  const res = await fetch(url, {
    headers: { accept: 'application/json', 'user-agent': 'fidic.uz tender tracker (+https://fidic.uz)' },
    signal: AbortSignal.timeout(45_000),
  });
  if (!res.ok) throw new Error(`${country}: HTTP ${res.status}`);
  const body = await res.json();
  return Array.isArray(body?.procnotices) ? body.procnotices : [];
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
    .filter((r) => r.procurement_group === WORKS_GROUP)
    .map(normalize)
    .filter((r) => r.id && r.title && r.country);

  // De-duplicate: the same notice can surface under more than one country query.
  const byId = new Map();
  for (const n of works) byId.set(n.id, n);

  const all = [...byId.values()].sort((a, b) => (b.noticeDate || '').localeCompare(a.noticeDate || ''));
  const today = new Date().toISOString().slice(0, 10);

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
    // Keep the page a reasonable size; the tail adds nothing a reader will use.
    notices: all.slice(0, 400),
    partial: failures.length ? failures : undefined,
  };

  fs.writeFileSync(OUT, `${JSON.stringify(snapshot, null, 2)}\n`);
  process.stderr.write(
    `\nwrote ${path.relative(ROOT, OUT)}: ${snapshot.notices.length} works notices ` +
      `(${snapshot.counts.open} open, ${snapshot.counts.awards} awards)\n`,
  );
  if (failures.length) process.stderr.write(`partial: ${failures.join('; ')}\n`);
}

main().catch((err) => {
  process.stderr.write(`fetch-tenders failed: ${err.message}\n`);
  process.exitCode = 1;
});
