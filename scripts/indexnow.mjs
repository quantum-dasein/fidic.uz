#!/usr/bin/env node
/**
 * Notify IndexNow that pages changed.
 *
 *   node scripts/indexnow.mjs                 # every indexable URL in the sitemap
 *   node scripts/indexnow.mjs <url> [url...]  # just these
 *
 * One POST reaches Bing, Yandex, Seznam and Naver — they share the protocol.
 * Both Bing Webmaster Tools and Yandex Webmaster recommend it as the fastest way
 * to get changes crawled, which is the exact problem this site has: pages sit in
 * "Discovered — currently not indexed" waiting for a crawl that never comes.
 *
 * Google does not participate. Its equivalent is Search Console, and there is no
 * supported API for ordinary pages — so this does nothing for Google, and the
 * output says so rather than implying broader coverage.
 *
 * Requires dist/ (run `npm run build` first) unless URLs are passed explicitly.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'fidic.uz';
const KEY = 'fc3f093ad45e181286389596bdfea018';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** IndexNow accepts at most 10,000 URLs per request; stay well under. */
const BATCH = 500;

function urlsFromSitemap() {
  const file = path.join(ROOT, 'dist', 'sitemap-0.xml');
  if (!fs.existsSync(file)) {
    throw new Error('dist/sitemap-0.xml not found — run `npm run build` first');
  }
  const xml = fs.readFileSync(file, 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function submit(urlList) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
    signal: AbortSignal.timeout(45_000),
  });
  // 200 accepted, 202 accepted but key still being validated. Both are fine.
  return { status: res.status, body: (await res.text()).slice(0, 200) };
}

async function main() {
  const args = process.argv.slice(2);
  const explicit = args.filter((a) => a.startsWith('http'));
  // `--match <substring>` submits the sitemap URLs whose path contains it. Used
  // by the daily tender refresh so it does not have to keep its own copy of the
  // country-slug list: the sitemap already knows which pages were built.
  const matchIndex = args.indexOf('--match');
  const match = matchIndex >= 0 ? args[matchIndex + 1] : null;

  let urls = explicit.length ? explicit : urlsFromSitemap();
  if (match) {
    urls = urls.filter((u) => new URL(u).pathname.includes(match));
    if (urls.length === 0) throw new Error(`no sitemap URL matches "${match}"`);
  }

  if (urls.length === 0) throw new Error('no URLs to submit');

  // The key file must be reachable or every submission is rejected. Check once
  // rather than discovering it from an opaque 403 on the batch.
  const probe = await fetch(KEY_LOCATION, { signal: AbortSignal.timeout(20_000) });
  const served = probe.ok ? (await probe.text()).trim() : '';
  if (served !== KEY) {
    throw new Error(`key file at ${KEY_LOCATION} returned "${served || probe.status}" — deploy it before submitting`);
  }
  process.stderr.write(`key file OK\nsubmitting ${urls.length} URL(s)\n`);

  let failed = 0;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    const { status, body } = await submit(batch);
    const ok = status === 200 || status === 202;
    if (!ok) failed++;
    process.stderr.write(`  batch ${i / BATCH + 1}: ${batch.length} URLs -> HTTP ${status}${ok ? '' : ` ${body}`}\n`);
  }

  process.stderr.write(
    failed
      ? `\n${failed} batch(es) rejected\n`
      : '\nsubmitted to Bing, Yandex, Seznam and Naver. Google is not part of IndexNow — use Search Console for it.\n',
  );
  if (failed) process.exitCode = 1;
}

main().catch((err) => {
  process.stderr.write(`indexnow failed: ${err.message}\n`);
  process.exitCode = 1;
});
