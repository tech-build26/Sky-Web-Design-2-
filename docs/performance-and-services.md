# Performance and capabilities update — 12 October 2026

The landing page’s “Explore all services” dialog now opens a six-service explorer. Each choice updates a photographic preview, three relevant capabilities and links to the full service and a preselected project enquiry. Industrial access also links to the netting section. The presentation uses navy, paper and blue, with no radial glows or lighting effects.

The explorer loads only when opened. The expertise section renders on the server. The launcher waits until its interaction handlers are ready. Native dialog focus containment, autofocus, Escape, backdrop dismissal, closing animation, focus restoration and scroll restoration are retained. Arrow keys and Home/End select the service tabs; reduced-motion preferences remove transitions.

## Performance changes

- Internal page links use the Next router, preserving the shared layout. General links have prefetch disabled to avoid fetching entire pages just because footer/service links become visible. External links, telephone/email actions and same-page anchors retain native behaviour.
- Shared logos use responsive image optimisation. Supplied original logo PNGs remain untouched.
- The opening page uses smaller delivery derivatives and a valid responsive WebP background declaration, with a matching media-specific preload. The previous CSS `image-set()` used width descriptors that are not valid for that syntax and fell back to the JPEG.
- The safety artwork has a smaller delivery derivative; the three planning icons are individual 90px crops instead of three instances of the full artwork. Original source artwork is retained.
- Alternate hero photographs load after the initial render, with low fetch priority. A photograph must finish loading before autoplay or manual selection displays it. Tile transitions use 24 fragments instead of 96.
- The decorative rope technician updates on scroll/resize instead of running an idle animation loop. The contractor marquee stops its frame loop off screen, in a hidden document and for reduced motion, and caches its group width outside the frame loop.
- Scroll reveals no longer hide content that is already visible during hydration. Reveal and hover timings are shorter. Reveal and back-to-top observers refresh after route changes.
- Public imagery and gateway fonts have one-day caching with stale revalidation; they are not marked immutable because their paths are not content hashes.

## Measured asset changes

| Asset | Previous delivery | New delivery | Reduction |
| --- | ---: | ---: | ---: |
| Gateway primary logo | 549,789 bytes | 56,058 bytes | 90% |
| Gateway Sky I logo | 244,791 bytes | 78,324 bytes | 68% |
| Gateway technician cutout | 492,705 bytes | 104,448 bytes | 79% |
| Safety artwork | 1,208,702 bytes | 107,100 bytes | 91% |

The three gateway assets together are approximately 81% smaller. Mobile gateway background delivery is 71,948 bytes instead of the 597,674-byte JPEG. The production image endpoint delivered the main header logo at 384px as a 21,702-byte WebP, versus the former unoptimised 549,789-byte PNG.

These are file/HTTP payload measurements. Local server response timings are recorded in `docs/qa/performance-audit.json`; they are not a claim about hosted Lighthouse scores, Core Web Vitals or real-device/mobile-network performance.

## Validation

Passed:

- `npm run build`, `npm run lint`, `npm run typecheck` and `git diff --check`.
- `npm run audit:website -- http://localhost:3001`: ten routes, 122 resources, zero link/resource/heading/duplicate-ID problems. Invalid endpoint requests were rejected.
- `node scripts/audit-performance.mjs http://localhost:3001`: production route and image responses, delivery sizes and static-image cache headers.
- `node scripts/verify-production.mjs http://localhost:3001`: 126 resources and original logo integrity passed.
- `node scripts/test-services-explorer.mjs`: all six previews and destinations, keyboard wrapping, close/Escape/backdrop handling, focus restoration, immediate scroll restoration on navigation and cleanup on unmount. Dynamic chunk loading was checked separately in the real browser.
- `node scripts/verify-contact.mjs`: validation, delivery outcomes, rate limiting and honeypot handling; provider responses are mocked and no emails were sent. Its stale harness was updated to support the existing bounded-body helper.
- `npm run test:consent`: existing cookie consent regression suite passed.
- Production browser checks at 390px and 1440px for `/`, `/home`, `/about`, `/industries`, both service pages, `/contact`, `/cookie-policy` and `/careers`: one main heading, no horizontal overflow or detected broken images, and no captured console errors.
- Real browser service selection, Home/End navigation, exact drone service anchor arrival, mobile enquiry navigation with “Drone inspection” selected, Escape close/focus/scroll restoration, and responsive gateway asset selection.

Screenshots: `docs/qa/services-explorer-desktop.png` and `docs/qa/services-explorer-mobile.png`.

The build retains the existing metadataBase warning for the standalone metadata image route when no production origin is configured. Careers administration continues to report that recruitment is not configured. Supabase, careers functionality, hosting, commit and publication are outside this update.

The existing cookie-consent work present at the start of this task was preserved.
