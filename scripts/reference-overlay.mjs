import fs from 'node:fs/promises';
import sharp from 'sharp';

// Comparison only: account for the browser's 15px vertical scrollbar.
const width = 1657;
const height = 933;
const reference = await sharp('SkyRiders_ Access Beyond Limits.png').resize(width, height).toBuffer();
const rendered = await sharp(process.argv[2] || 'docs/qa/hero-desktop.jpg').extract({ left: 0, top: 0, width, height }).ensureAlpha(.5).png().toBuffer();
await fs.mkdir('docs/qa', { recursive: true });
await sharp(reference).composite([{ input: rendered }]).jpeg({ quality: 90 }).toFile(process.argv[3] || 'docs/qa/reference-overlay.jpg');
console.log(`Saved reference overlay at ${width} × ${height}.`);
