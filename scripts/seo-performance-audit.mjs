import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const root = process.argv[2] || 'dist';
const maxAssetKb = Number(process.env.MAX_ASSET_KB || 350);
const maxHtmlKb = Number(process.env.MAX_HTML_KB || 220);
const maxScriptsPerPage = Number(process.env.MAX_SCRIPTS_PER_PAGE || 10);

if (!existsSync(root)) {
  console.error(`Audit target not found: ${root}. Run npm run build first.`);
  process.exit(1);
}

const walk = (dir, files = []) => {
  for (const name of readdirSync(dir)) {
    const file = join(dir, name);
    const stat = statSync(file);
    if (stat.isDirectory()) walk(file, files);
    else files.push(file);
  }
  return files;
};

const files = walk(root);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const assets = files.filter((file) => !file.endsWith('.html') && !file.endsWith('.xml') && !file.endsWith('.txt') && !file.endsWith('.json'));

const issues = [];
const warn = (type, file, detail) => issues.push({ type, file: relative(root, file).replaceAll('\\', '/'), detail });

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const sizeKb = statSync(file).size / 1024;
  const scripts = [...html.matchAll(/<script\b/gi)].length;
  const hasCanonical = /rel=["']canonical["']/i.test(html);
  const hasHreflang = /hreflang=/i.test(html);
  const hasSchema = /application\/ld\+json/i.test(html);
  const hasTitle = /<title>[^<]{12,}<\/title>/i.test(html);
  const hasDescription = /name=["']description["']/i.test(html);

  if (sizeKb > maxHtmlKb) warn('heavy-html', file, `${sizeKb.toFixed(0)} KB`);
  if (scripts > maxScriptsPerPage) warn('script-count', file, `${scripts} script tags`);
  if (!hasCanonical) warn('missing-canonical', file, 'canonical link absent');
  if (!hasHreflang && !file.includes('404')) warn('missing-hreflang', file, 'hreflang links absent');
  if (!hasSchema) warn('missing-schema', file, 'JSON-LD absent');
  if (!hasTitle) warn('weak-title', file, 'title missing or too short');
  if (!hasDescription) warn('missing-description', file, 'meta description absent');
}

const heavyAssets = assets
  .map((file) => ({ file, kb: statSync(file).size / 1024 }))
  .filter((entry) => entry.kb > maxAssetKb)
  .sort((a, b) => b.kb - a.kb)
  .slice(0, 30);

for (const entry of heavyAssets) warn('heavy-asset', entry.file, `${entry.kb.toFixed(0)} KB`);

const summary = {
  target: root,
  htmlPages: htmlFiles.length,
  assets: assets.length,
  issues: issues.length,
  byType: issues.reduce((acc, issue) => {
    acc[issue.type] = (acc[issue.type] || 0) + 1;
    return acc;
  }, {}),
  topIssues: issues.slice(0, 80),
};

console.log(JSON.stringify(summary, null, 2));
process.exit(issues.some((issue) => issue.type === 'missing-canonical' || issue.type === 'heavy-asset') ? 1 : 0);
