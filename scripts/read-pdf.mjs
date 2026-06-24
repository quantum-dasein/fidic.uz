import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const path = process.argv[2];
const buffer = fs.readFileSync(path);
const parser = new PDFParse({ data: new Uint8Array(buffer) });
const res = await parser.getText();
const lines = res.text.split('\n').map((l) => l.trim()).filter(Boolean);
console.log(lines.slice(0, 45).join('\n'));
await parser.destroy();
