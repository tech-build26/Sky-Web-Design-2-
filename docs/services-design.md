# Services section — 8 October 2026

The section uses the original cooling-tower photograph across its entire width and height, with a straight rectangular top edge. Three frosted glass tiles feature Industrial Access, Inspection & NDT, and Maintenance & Cleaning. All three descriptions are visible; the tiles have restrained hover and focus feedback.

The tiles use translucent gradients, fine pale borders and an 18px backdrop blur. Archivo headings, cyan accents and the existing blue action color connect the section to the landing page. A labelled “Explore all services” button opens the full catalogue. The standalone services page remains deferred.

On mobile the three tiles stack over the same continuous background image. Existing service fragment destinations lead to their tile or open the catalogue for an additional service. The catalogue retains native modal focus containment, Escape, explicit close, backdrop dismissal and contact links; page scrolling is locked while it is open.

## Image provenance

The image was generated with the built-in image_gen tool on 8 October 2026. It is illustrative industrial photography. The accepted 1672 × 941 PNG is preserved in `assets/source/services/services-cooling-tower.png`, and the production WebP is `public/images/services/services-cooling-tower.webp`. Both files are unchanged during the glass-tile revision.

- WebP SHA-256: `D1C45DCFCED44AE0919E030C70A2EBA8CC1E292EDB2631284D889CBAB3F86779`.
- Source PNG SHA-256: `9098E58CF5CE6BF46DD9BDF0303D14E4F4B3BE71FB5B0D795B7D6B01988F4B1D`.

Encoding inputs remain in `docs/services-photo-inputs.json`; no re-encoding or image editing was performed for this revision.

## Original generation prompt

```text
Use case: photorealistic-natural.
Asset type: one cinematic industrial architectural background photograph for the Skyriders specialist rope-access website services section. Wide landscape 2560 x 1440 composition.
Primary request: an unexpected, monumental view looking upward from deep INSIDE an enormous concrete cooling tower. A beautiful elliptical opening to the sky sits in the upper-right quadrant, at approximately 72% horizontal and 30% vertical. Ribbed concrete walls curve gracefully up toward the opening, emphasizing breathtaking scale and precision. A fine steel maintenance catwalk crosses the right side of the structure at mid-height, a few neatly tensioned rope access lines run vertically beside it. NO people; let the architecture tell the story of difficult access. This is a plausible industrial environment, not science fiction.
Composition: leftmost 45% is naturally dark textured concrete with low contrast and no sky so white website headings can be overlaid. All architectural detail and the luminous opening are concentrated in the right 55%; lower portion fades into naturally deep navy shadows. Wide architectural lens, restrained dramatic perspective. Unbroken single photograph, no collage.
Lighting/mood: cool atmospheric daylight filters from the opening, soft shafts of pale cyan light reveal concrete texture; refined industrial editorial photography. Dark navy and concrete blue-grey palette, controlled pale sky blue highlights, subtle photographic grain and realistic surface weathering. Rich contrast but not crushed blacks. Stunning premium architecture campaign, believable rather than fantasy.
Constraints: photograph only; absolutely no text, lettering, watermarks, logos, UI, borders, graphic overlays, workers, roads, city skyline or vehicles. No orange sunset. Preserve useful dark negative space on the left.
```

## Verification

- Lint, TypeScript and the production build pass.
- Browser checks confirm three tiles, a working full-catalogue button, keyboard closing and restored focus.
- The backdrop blur is verified in the browser as `blur(18px)`; vendor-prefixed CSS precedes the standard declaration so Next.js retains the standard property.
- Responsive layout review confirms the background matches the entire section's width and height on mobile, and the tiles stack without horizontal overflow.
- Revised screenshots: `docs/qa/services-glass-desktop.jpg` and `docs/qa/services-glass-mobile.jpg`.
- Reduced motion uses the existing global preference rule and local CSS.
