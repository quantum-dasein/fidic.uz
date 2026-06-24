#!/usr/bin/env node
/**
 * Issue a new certificate into the FIDIC.uz registry.
 *
 * Usage:
 *   node scripts/issue-cert.mjs "Иванов Иван Иванович" [options]
 *
 * Options:
 *   --name-en "Ivan Ivanov"     Latin spelling of the name (optional)
 *   --course-date 2026-06-24    ISO date the course was held (default: today)
 *   --issue-date  2026-06-24    ISO date of issue (default: today)
 *   --site https://fidic.uz     Base URL for the QR (default: https://fidic.uz)
 *
 * What it does:
 *   1. Generates an unguessable verification code (XXXX-XXXX).
 *   2. Assigns the next registry number YYYY-NNN.
 *   3. Appends the entry to src/data/certificates.json.
 *   4. Writes a QR PNG to certs-output/<number>.png (if `qrcode` is installed),
 *      otherwise prints the npx command to generate it.
 *
 * After running: commit certificates.json and redeploy. Paste the QR + the
 * printed number/code into the Canva certificate.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const registryPath = join(root, 'src', 'data', 'certificates.json');
const outDir = join(root, 'certs-output');

// --- parse args ---
const argv = process.argv.slice(2);
const name = argv.find((a) => !a.startsWith('--'));
function opt(flag, def) {
  const i = argv.indexOf(flag);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
}
if (!name) {
  console.error('Ошибка: укажи ФИО. Пример:\n  node scripts/issue-cert.mjs "Иванов Иван Иванович"');
  process.exit(1);
}
const today = new Date().toISOString().slice(0, 10);
const nameEn = opt('--name-en', '');
const courseDate = opt('--course-date', today);
const issueDate = opt('--issue-date', today);
const siteUrl = opt('--site', 'https://fidic.uz').replace(/\/$/, '');

// --- unguessable code: Crockford base32, no ambiguous chars ---
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
function makeCode() {
  const bytes = randomBytes(8);
  let out = '';
  for (let i = 0; i < 8; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return `${out.slice(0, 4)}-${out.slice(4)}`;
}

// --- load registry ---
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
registry.certificates = registry.certificates || [];

// next registry number for the current year
const year = issueDate.slice(0, 4);
const nums = registry.certificates
  .map((c) => c.number)
  .filter((n) => typeof n === 'string' && n.startsWith(year + '-'))
  .map((n) => parseInt(n.split('-')[1], 10))
  .filter((n) => !Number.isNaN(n));
const next = (nums.length ? Math.max(...nums) : 0) + 1;
const number = `${year}-${String(next).padStart(3, '0')}`;

// unique code
let code;
do { code = makeCode(); } while (registry.certificates.some((c) => c.code === code));

const entry = { number, code, name, courseDate, issueDate };
if (nameEn) entry.nameEn = nameEn;

registry.certificates.push(entry);
writeFileSync(registryPath, JSON.stringify(registry, null, 2) + '\n', 'utf8');

const verifyUrl = `${siteUrl}/verify/${code}/`;

// --- QR (optional) ---
let qrNote = '';
try {
  const QR = await import('qrcode');
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  const file = join(outDir, `${number}.png`);
  await QR.toFile(file, verifyUrl, { width: 600, margin: 2 });
  qrNote = `QR-картинка: ${file}`;
} catch {
  qrNote =
    'QR не сгенерирован (пакет "qrcode" не установлен). Сгенерируй так:\n' +
    `  npx qrcode -o certs-output/${number}.png "${verifyUrl}"`;
}

console.log('\n✅ Сертификат добавлен в реестр:\n');
console.log(`  Номер:        ${number}`);
console.log(`  Код проверки: ${code}`);
console.log(`  ФИО:          ${name}${nameEn ? ` (${nameEn})` : ''}`);
console.log(`  Дата курса:   ${courseDate}`);
console.log(`  Дата выдачи:  ${issueDate}`);
console.log(`  Ссылка QR:    ${verifyUrl}`);
console.log(`\n  ${qrNote}\n`);
console.log('Дальше: закоммить src/data/certificates.json и сделай redeploy.');
console.log('На сертификат в Canva вставь: номер, код проверки и QR-картинку.\n');
