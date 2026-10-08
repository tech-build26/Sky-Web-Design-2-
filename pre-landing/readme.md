# Skyriders pre-landing — portable copy

Snapshot of the current Skyriders root page on 8 October 2026. This folder is independent of the original application: every image/font is a copy, there are no symlinks or references back into `web/`, and moving this entire folder does not affect that app. No Next.js application, build output, npm project or node_modules is included.

## Files

- `index.html`: complete initial scene, both brand choices, inline social/industry SVGs, metadata and departure cover.
- `styles.css`: original pre-landing rules in their original cascade order, browser reset and local font declarations. No Tailwind installation needed.
- `prelanding.js`: message rotation, offscreen/hidden suspension, pointer and keyboard subject movement, and the Skyriders departure cover. No React or animation library needed.
- `images/`: supplied `hero-bg.jpg`, `rope-cutout.png`, `elios_3.png`, latest supplied `sky-logo-20261005.png` and `sky-i-logo-20261005.png`, plus referenced background WebP variants. Master artwork is copied byte-for-byte.
- `fonts/`: Jost and Cormorant variable WOFF2 subsets and their SIL Open Font licences.
- `favicon.ico`: copied current application icon.
- `manifest.sha256`: hashes of the delivered files, excluding the manifest itself.
- `verification.json`: bounded browser verification and comparison evidence.

## Open the standalone page

Copy the **whole folder** to your other system. Open `index.html` to inspect the composition. For normal font loading and real URL navigation, serve this folder using any existing static web server; for example, if Python is already available:

```sh
cd pre-landing
python -m http.server 8080
```

Open `http://localhost:8080/`. Python is optional and only serves files; the page itself needs no install/build step. The existing website's `/home/` page is deliberately outside this package, so that link requires your actual application at the same origin. A standalone preview server will return 404 there.

## Reproduce identically in the existing application

Treat the supplied HTML/CSS/JS as the reference implementation. Do not redesign, rewrite the copy, replace icons/fonts/artwork, add a new scaffold or import the rest of the original website.

1. Keep the image/font directories together with `styles.css` and `prelanding.js`. Their paths are relative to those files and the HTML. Preserve filenames, image transparency, intrinsic HTML image dimensions, CSS selectors and rule order.
2. For a directly served static root, mount this folder at `/` and let the existing application continue serving `/home/`. Do not overwrite your current home page.
3. For an existing React/Next app, copy this folder's runtime assets into `public/pre-landing/`. Place the `<main class="prelanding prelanding--skyriders">…</main>` and adjacent `.brand-entry-overlay` from `index.html` in your existing root page component. Convert HTML attributes to JSX (`className`, `tabIndex`, `strokeWidth`, SVG camelCase attributes, etc.) or render the trusted fixed markup with `dangerouslySetInnerHTML`. Keep all four brand links and the four industry lists. Do not put a second `<html>`, `<head>` or `<body>` inside a page component.
4. Load `/pre-landing/styles.css` once from the existing layout and `/pre-landing/prelanding.js` once as a browser script after the DOM is available. In the copied page markup, rewrite only relative `./images/…` paths to `/pre-landing/images/…`; rewrite favicon/preload links likewise. CSS font/background paths still resolve relative to `/pre-landing/styles.css` without modification. Copy the supplied title, description, language (`en-ZA`), viewport and canonical into your app's existing metadata facilities.
5. The script enhances a rendered scene automatically. For client navigation/remounts, after the script has loaded call `window.SkyridersPrelanding.init(containerElement)` from the component's effect and return its cleanup function. Include both the `<main>` and overlay in that container. Initialization is idempotent for a scene. Do not run it on the server. If typing is needed, declare `window.SkyridersPrelanding` as `{ init(scope?: Document | HTMLElement): () => void }`.
6. Keep ordinary `<a>` and `<img>` elements initially. An image optimiser may change resolution/compression; it must preserve the supplied dimensions, CSS classes, aspect ratios and transparency. Avoid letting your app's global typography/reset override these styles. The copied reset applies globally: use it on a dedicated root layout or scope the reset to the page container if your existing app requires isolation, then compare computed styles.
7. Same-brand choices use `/home/`; all Sky I choices use `https://skyi.co.za/` (the destination root pre-landing). Both logo choices follow those same rules. Canonical is `https://ropeaccess.co.za/`. The supplied Facebook/LinkedIn URLs are real Skyriders account links. For private review on another origin, change the two Sky I links explicitly if needed; restore the public origin before release. No local origin or development environment file is shipped.

### Visual and behavioural contract

- Skyriders is left, Sky I right. Background is `hero-bg.jpg`, with charcoal/ivory/bronze tokens. Current supplied logos are used. Cormorant is the display family and Jost the UI/body family; use the included files, not substitutes.
- One complete scene is immediately available; there is no scroll gate. Keep the vertical site label, right social rail, first message and both destinations present before JavaScript.
- Preserve existing responsive breakpoints at 380/800px and tablet adjustments at 601–800/801–1100px. At mobile sizes content flows vertically; do not force everything into one clipped viewport. Natural mobile scrolling is intentional.
- Intro messages hold for 6500ms, leave for 500ms and arrive for 700ms. Rotation suspends on centre hover, when hidden/offscreen and under reduced motion. The static first message is already in HTML; JavaScript uses the same three current messages.
- Original CSS coordinates technician descent, gentle sway, drone rise/station keeping, and staggered text/logo entrances. Pointer movement composes with CSS transforms. Focus reveals descriptions; touch shows descriptions persistently. Hover/focus softens the opposite subject.
- Industry ticker contains four identical lists; only the first is exposed to assistive technology. The 45-second loop translates by -25%. Hover or keyboard focus pauses it. Reduced motion gives one stationary, horizontally scrollable list. Keep all ten sectors and their included SVGs.
- Ordinary current-brand activation gets the short departure cover (410ms desktop/280ms compact), then native navigation to `/home/`. Sky I root links navigate normally. Modified clicks and reduced motion keep native navigation. Browser Back restores the scene; an 1800ms timeout clears a stalled cover. The receiving `/home/` entrance belongs to your existing application and is not included here.
- Without JavaScript, meaningful content, artwork, links and CSS effects remain; message cycling and pointer enhancement are absent. Reduced motion stops CSS animation and JS movement. No pause button, fabricated telemetry or added effects.

## Check after integration

Compare against this standalone page at 1440×900, 1024×768, 820×1180, 768×1024, 390×844, 320×700 and 667×375. Wait for local fonts and initial image loading, then compare the same message/motion state. Assert no horizontal page overflow, two visible destinations, four working choice links, correct cross-brand root handoffs, social links, caption hover/focus, continuous ticker/pause, message cycling, keyboard/touch, reduced motion, disabled JavaScript, refresh and Back. Use `verification.json` as evidence of this package's checks, not acceptance of the receiving app.

Preserved master assets and layouts are identical to the source. Plain images replace Next's runtime optimisation, so download size and pixel compression can differ. Browser/font rasterisation can also vary between systems. No live deployment or hosting configuration is included.

## Existing publication gates

This faithfully copies the current review draft, including certification/performance wording in its messages. The original project's outstanding evidence/scope approval for those claims still applies before public publication. Images must not imply named-client endorsement; no restricted client identities are included. This handoff does not approve deployment.

## Licences and provenance

Photography, cutouts and logos are owner-supplied project artwork; this copy does not grant new reuse rights. Font licences are included under `fonts/`. Industry icons are inline copies of Lucide's icons, used under the ISC licence in `lucide-LICENSE.txt`.
