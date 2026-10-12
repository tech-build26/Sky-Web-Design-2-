import fs from 'node:fs/promises';
import sharp from 'sharp';

// Keep supplied artwork intact and create small delivery derivatives.
const conversions = [
  ['public/pre-landing/images/sky-logo-20261005.png', 'public/pre-landing/images/variants/sky-logo-480.webp', 480],
  ['public/pre-landing/images/sky-i-logo-20261005.png', 'public/pre-landing/images/variants/sky-i-logo-420.webp', 420],
  ['public/pre-landing/images/rope-cutout.png', 'public/pre-landing/images/variants/rope-cutout-560.webp', 560],
];
const report = [];
for (const [source, destination, width] of conversions) {
  await sharp(source).resize({ width, withoutEnlargement: true }).webp({ lossless: source.includes('/sky-logo-'), quality: 90, alphaQuality: 100, effort: 6 }).toFile(destination);
  report.push({ source, destination, originalBytes: (await fs.stat(source)).size, deliveredBytes: (await fs.stat(destination)).size });
}
const source = 'public/images/safety/safety-quality-artwork.webp';
const destination = 'public/images/safety/safety-quality-display.webp';
await sharp(source).webp({ quality: 82, effort: 6 }).toFile(destination);
report.push({ source, destination, originalBytes: (await fs.stat(source)).size, deliveredBytes: (await fs.stat(destination)).size });
for (const [index, left] of [124, 510, 875].entries()) {
  await sharp(source).extract({ left, top: 442, width: 90, height: 90 }).webp({ quality: 90, effort: 6 }).toFile(`public/images/safety/planning-${index + 1}.webp`);
}
await fs.mkdir('docs/qa', { recursive: true });
await fs.writeFile('docs/qa/asset-optimisation.json', JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
