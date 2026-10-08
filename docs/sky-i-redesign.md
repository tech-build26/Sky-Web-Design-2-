# Sky I division — 8 October 2026

Removed the entire Our Work / Capability at height section and its header navigation entry. The hero slideshow still uses the existing photographs.

The Sky I section now uses a short panoramic industrial interior, copy on the left and the supplied transparent Elios 3 on the right. A one-time entrance from the right starts at 20% viewport intersection; a gentle hover follows. Mouse movement within this section adds up to 12px horizontal / 8px vertical displacement and 1.2 degrees of roll. Leaving resets the offset. Hover pauses outside the viewport; a pause/resume control and reduced-motion preference are supported. Content and drone remain visible without JavaScript.

The independent Visit Sky I CTA uses a pale cyan angular body, a dark arrow tile and an animated diagonal arrow. Destination is the existing hero badge URL, `http://skyi.co.za/`.

## Verification

- ESLint, TypeScript and Next.js production build passed.
- Production HTTP checks passed on a temporary local server: 42 resources loaded, all internal fragment destinations resolved, original brand logos unchanged.
- Browser review at desktop (1440 × 900) and mobile (390 × 844): no horizontal overflow; both section images loaded; Our Work absent; correct external CTA.
- Desktop section measured 512px high. Cursor movement changed the scoped offsets; leaving reset all offsets to zero. Pause/resume updated the pressed state correctly. No browser warnings or errors captured.
- Reduced-motion behavior is implemented in CSS and in the pointer handler; no-JavaScript layout remains visible by default. These fallback modes were reviewed in source, not emulated in the browser.
- Screenshots: `docs/qa/sky-i-redesign-desktop.png`, `docs/qa/sky-i-redesign-mobile.png`.

## Assets

- Supplied original moved unchanged to `public/images/sky-i/elios_3.png` (1600 × 1000, transparent PNG).
- Generated original: `public/images/sky-i/inspection-panorama-source.png` (2172 × 724).
- Delivered background: `public/images/sky-i/inspection-panorama.webp` (2172 × 724, quality 88, approximately 298 KB).
- Generated with the built-in imagegen tool. Illustrative industrial interior; not a documented company project.

## Final generation prompt

Use case: photorealistic-natural. Asset type: panoramic website section background, ultra-wide landscape approximately 3:1 aspect ratio. Create a cinematic professional photograph inside a large industrial steel vessel / boiler inspection chamber, looking horizontally along its interior. Curved ribbed steel walls, weathered metal textures, overhead structural beams, pipework and a distant rectangular maintenance opening with soft daylight. Wide-angle lens, believable industrial engineering, subtle atmospheric depth, cool blue-grey tones, selective warm industrial lights. Left half darker and visually quiet to support white website text; right half shows more detailed curved metal and a softly illuminated open area where a separately composited inspection drone will be placed. Keep all important structure around the middle horizontal band so it works in a short 480px-high website banner. No drone anywhere, no people, no aircraft, no robots, no text, no logo, no UI, no watermark. The scene is illustrative inspection photography, not a named real site. Produce a single panoramic photograph only.
