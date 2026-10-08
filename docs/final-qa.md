# Final local QA — 7 October 2026

The landing-page implementation is complete. This record distinguishes executed local checks from external publication/device checks. Historical C/D screenshots remain in `docs/qa`; filenames beginning `final-`, `production-`, or `about-final-` identify the completed-page review.

## Executed checks

- `npm run lint`, `npm run typecheck`, `npm run build`: passed after final UI/accessibility changes; production routes are statically generated. Next.js remains pinned to 16.4.0.
- Development preview loads on port 3000. Final production server started on port 3001. Browser reported no captured production warnings/errors.
- `node scripts/verify-production.mjs`: homepage 200; all referenced local resources, all nine photo derivatives and metadata endpoints returned non-empty 200 responses. Thirty unique HTML/SVG IDs, 58 working fragment links, original logo SHA-256 hashes identical. Actual response timings/resource bytes are in `qa/production-http-checks.json`.
- Optional deployment-origin validation: unset value, valid HTTPS origin, rejected insecure protocol/path/credentials/query. No real domain was invented or enabled. Preview robots remain noindex; canonical is withheld.
- Nine viewports: 1920 × 1080, 1672 × 941, 1600 × 900, 1440 × 900, 1280 × 720, 1024 × 768, 768 × 1024, 390 × 844 and 320 × 568. No horizontal overflow, missing anchors or About actions outside section bounds. Saved numeric evidence: `qa/final-viewport-checks.json`.
- 200% reflow equivalent: a 720 × 450 CSS viewport, corresponding to a 1440 × 900 viewport at 200% zoom. Menu remained usable; no horizontal overflow; About button remained inside its section. This tests the relevant layout width, not native browser-chrome zoom controls.
- All three main hero scenes selected and inspected on desktop/mobile after loading. Alt/pressed state correct. Manual selection pauses autoplay. Stable transition endpoints read opacity 0/0/1.
- Automatic eight-second advance observed in production. Explicit Pause displayed the Play action. Playback uses an action label, while photo selectors expose pressed state. Play resumed when pointer/focus left the hero while it was still in view. Offscreen state stopped autoplay; user pause is retained independently of observer/event pause conditions.
- Mobile menu opened with Enter, showed the exact Hub URL, closed with Escape and returned focus to its summary. About selection closed the menu and reached its section. Desktop disclosure/slideshow Enter/Escape behavior and visible keyboard outline checked.
- Hero View all and About Explore lead to the actual services overview; destinations are focusable for keyboard anchor navigation. The skip link targets the focusable hero heading after the navigation. Every internal destination exists.
- Phone/email actions checked as hrefs against brochure and indexed official contacts. No unconfigured form, placeholder enquiry action, search or story-video controls. External Hub was not opened or authenticated.
- Normal-text contrast samples: About mobile eyebrow 4.56:1; shared white/blue action 5.14:1; muted body 5.86:1; footer 9.53:1; Since year 5.04:1. Large statement/headline accents meet the large-text threshold. Photograph-backed captions use a dark shade; primary navigation was reviewed across all three scenes.
- Source review: local font loading and licences retained, no secrets or temporary review HTML, unchanged original inputs/logos, no commit/push/publication. The Git branch is still unborn main.

## About visual acceptance

The 2752 × 1536 source is preserved unchanged in `reference/about-reference.jpg`. The composition is traced at normalized 2048 × 1143 coordinates and reversed horizontally as requested. SVG guide lines/accent shapes, navy collage silhouette, main-photo window, inset frame, badge and text/action positions are recorded in `reference/about-reference.md` and `qa/about-final-geometry.json`.

Two accepted built-in imagegen photographs have complete native PNG sources under `assets/source/about/`, labelled WebP derivatives under `public/images/about/`, full prompts in `about-photography-prompts.md` and dimensions/bytes in `about-photo-metadata.json`. They total 504,168 bytes. All seven hero originals are also labelled and hash-verified under `assets/source/hero/`, making the encoding inputs portable. Together the nine public photography derivatives are about 1.8 MiB before Next responsive variants. Text, shapes and button are live code, not generated into a flattened section.

Desktop preserves the reference composition; tablet changes to a readable two-column flow; mobile places artwork first and text second. Explore retains the original pill proportions, with sheen/arrow/lift on hover and equivalent keyboard focus feedback. Logos retain the previously requested smaller sizes.

## Limits and publication prerequisites

- The source typeface is unknown. Archivo/Arial approximate its glyphs and measured widths; the new generated photographs differ from the reference. Exact pixel identity across all fonts/photos is not claimed.
- Native reduced-motion and hidden-tab emulation are not exposed by this browser control surface. The CSS media rules, matchMedia/visibility subscriptions, timer cleanup and persistent pause gating were reviewed; OS-level runtime emulation remains a real-device check. All motion is disabled by the shared reduced-motion CSS rule, and autoplay is gated by the preference subscription.
- Local HTTP timings are workstation/server measurements. No Lighthouse score, throttled mobile trace, field LCP/CLS/INP result or screen-reader/real-touch certification is claimed. Generated main hero sources are 1672 × 941 and About sources 1024 × 1536; very high-density displays can exceed native photo detail.
- Both offices/email/phones are corroborated by the indexed [official contact page](https://ropeaccess.co.za/contact/), crawled about three weeks before the check. Direct fetch still timed out. The [certification index](https://ropeaccess.co.za/certifications/) lists 2025 modification dates, which do not establish current validity. Unverified credential, regulatory and safety-record badges remain absent.
- The reference/brochure request uses Since 1999; the indexed old homepage says operations began in 1998. This page follows the user-approved reference and does not use that year to make a safety-record assurance.
- A verified `SITE_URL` and hosting choice are needed before deployment. Git CLI authentication is needed before a future push. Commit, push and publication require the user's explicit request.
