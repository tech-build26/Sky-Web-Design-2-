# Safety & quality reference

User-supplied source: `Safety & Quality_ Planned Excellence.png`, 1778 × 885. An intact project copy is retained as `docs/reference/safety-quality-reference.png`.

The desktop stage uses the reference's 1778:885 ratio. Coordinates are traced from the supplied image rather than interpreted as a new layout:

| Element | Reference coordinates |
| --- | --- |
| Main copy | x 122, y 115 |
| Upper photo diagonal | (1029, 0) to (863, 394) |
| Lower paper outline | (863, 394), (944, 394), (977, 430), (1184, 430), (1355, 751), (1276, 885) |
| Planning icons | (124, 442), (510, 442), (875, 442); 90px square |
| Planning copy | x 240, 623, 988 |
| CTA | x 123, y 726; approximately 375 × 58 |

The supplied technician photograph and right-hand panel graphics are reused directly from the reference, with the existing left-hand content masked by traced SVG paper geometry and replaced with live HTML text. The exact supplied planning icons are displayed through CSS windows into the same asset. The heading uses the site's Archivo variable font with line-specific horizontal adjustments; body copy uses Arial to match the reference's proportions. The contact CTA is a live link to `#contact`.

The public asset `public/images/safety/safety-quality-artwork.webp` is encoded losslessly with the project's pinned Sharp runtime. Decoded pixels were compared against the original and are identical. Delivered size: 1,208,702 bytes; dimensions: 1778 × 885. Pixel SHA-256: `60220de4f23895b7f5ebc55c10c42fb9620480f98e58c92e9cde5fbf47033c13`. No image generation or retouching was used.

At widths up to 1100px, the layout adapts to readable live copy, a CSS crop of the same technician photograph, and three planning columns. At widths up to 700px, the photo, heading, steps and CTA stack. Native text and the contact link remain available without JavaScript. The photograph and decorative captions are described for assistive technology; the icon crops are decorative.

## Verification

- Lint, TypeScript and production build pass.
- Production HTTP verification passes for 33 unique IDs, 61 fragment links and 40 resources, including the new safety artwork; report: `docs/qa/production-http-checks.json`.
- Browser review covers the reference-width desktop composition, 1024px tablet layout, 390px mobile and 320px narrow mobile. No horizontal overflow; all three process steps remain available.
- The CTA was clicked and verified to navigate to the existing `#contact` section.
- Current browser captures: `docs/qa/safety-quality-desktop.jpg` and `docs/qa/safety-quality-mobile.jpg`. The earlier `safety-reference-first-pass.jpg` is draft evidence, before typography refinements.
