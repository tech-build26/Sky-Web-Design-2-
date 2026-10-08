import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

// Encoding only: photographs are not retouched or cropped by this script.
async function main() {
  const manifest = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const outputFolder = process.argv[3] || 'public/images/hero';
  const output = path.resolve(outputFolder);
  fs.mkdirSync(output, { recursive: true });
  const records = await Promise.all(manifest.map(async ({ name, source, width, quality }) => {
    const input = await sharp(source).metadata();
    const destination = path.join(output, `${name}.webp`);
    const encoded = await sharp(source).resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(destination);
    return { name, source, sourceWidth: input.width, sourceHeight: input.height, destination: `${outputFolder}/${name}.webp`, width: encoded.width, height: encoded.height, bytes: encoded.size };
  }));
  fs.writeFileSync(process.argv[4] || 'docs/photo-metadata.json', JSON.stringify(records, null, 2) + '\n');
  console.log(JSON.stringify(records, null, 2));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
