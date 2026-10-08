# Implementation notes

## 7 October 2026 — phases A and B

### Input audit

- Original workspace: `design.md`, `sky-logo.png`, `sky-i-logo.png`, `SkyRiders_ Access Beyond Limits.png`; no application, lockfile or Git metadata. No applicable workspace/ancestor `AGENTS.md` existed initially. Next.js generated `AGENTS.md` on first dev startup; it was read and retained for future implementation.
- Visually reviewed both supplied logos and hero reference. Metadata confirms primary logo 1500 × 1250 RGBA, Sky I 1254 × 1254 RGBA, and hero reference 1672 × 941 RGB. Logo copies preserve exact original bytes (SHA-256 in `docs/asset-manifest.md`).
- `design.md` now mandates `sky-logo.png` and a dark backing for its white lettering. Updated reference availability, retained navigation, registry status and outdated unresolved-input notes.
- Measured reference bounds, approximate shape paths, visible photo placements and crop priorities recorded in `docs/reference/hero-reference.md`. Those are implementation planning measurements, not final curve/render acceptance. The reference's angular Sky I panel and earlier explicit circle requirement are reconciled as a required design variation. Reference metrics remain unverified and must not be copied.
- Brochure is absent locally; the specification's earlier brochure-review evidence was preserved rather than falsely reporting a new review.

### Contact and claims verification

The official [contact page](https://ropeaccess.co.za/contact/) indexed result (crawled approximately three weeks before this check) corroborates the Midrand/eMalahleni addresses, both phone numbers and `info@ropeaccess.co.za`. It adds “Shop 2 & 6” to eMalahleni and calls the Midrand estate “Kyalami Business Park.” Live page retrieval timed out, so no direct current company confirmation is claimed. Phone dialing has not been tested on actual devices.

The official [certification page](https://ropeaccess.co.za/certifications/) lists BEE, ISO and aviation documents with 21 January 2025 modification dates. This index does not establish current expiry/validity, BEE level, zero-fatality statistics or Sky I legal/regulatory linkage. Current badges and reference metrics are excluded. The phase A current-claims acceptance item remains unchecked pending current evidence; this does not block the local foundation.

### Repository verification

- Initial and user-requested retry of `git ls-remote` returned “Repository not found” because command-line Git cannot currently access the private repository.
- Authenticated GitHub connector `get_repo` succeeded: full name `tech-build26/Sky-Web-Design-2-`, repository ID `1408394001`, private visibility, size `0`, default branch `main`, authorized account has pull/push permissions.
- Connector branch search returned an empty list. There is no remote branch/history to clone. Initialized local Git on unborn `main` and set exact origin `https://github.com/tech-build26/Sky-Web-Design-2-.git`; verified status/remotes. No commits, staging, pushes or publication performed.
- Before future fetch/push, configure command-line GitHub authentication. The connector connection does not provide a local CLI credential.

### Dependency preflight and configuration

- `npm view next@16.4.0 version engines peerDependencies --json` confirmed version 16.4.0, Node >=20.9.0 and compatible React/React DOM ^19.0.0 (also ^18.2.0).
- `npm view react version` and corresponding React DOM metadata returned 19.3.0; pinned both exactly. `eslint-config-next@16.4.0` accepts ESLint >=9 and TypeScript >=3.3.1. Used TypeScript 5.9.3, ESLint 9.39.5 and matching React type packages.
- Runtime: Node 24.13.1; npm 11.8.0. Dependencies installed successfully (346 packages) with one npm lockfile. Installer warns ESLint 9 is no longer supported; installed Next config compatibility and the actual lint command pass. A future tooling upgrade can be verified separately.
- Configured App Router under `src/app`, strict TypeScript, ESLint flat config, dev/build/start/lint/typecheck commands and ignore rules. No private credentials, environment variables or `.env.example` are needed for this static local foundation. No deployment URL/provider or integrations have been invented.
- Initial homepage intentionally contains only the supplied primary logo, headline, descriptive line and exact Hub link. It verifies the runtime and asset handling; it is not the finished reference hero. Development metadata disables indexing pending deployment setup. README documents setup and operation.

### Validation evidence

- `npm run lint`: passed, zero warnings/errors.
- `npm run build`: passed with Next.js 16.4.0/Turbopack; homepage and not-found page statically generated; build's TypeScript stage passed.
- `npm run typecheck`: passed independently, exit 0.
- `npm run dev -- --hostname 127.0.0.1 --port 3000`: started successfully, ready in 533ms, without required configuration.
- `npm run start -- --hostname 127.0.0.1 --port 3001`: production server started successfully, ready in 147ms.
- Production browser smoke: homepage displayed correct title, complete supplied logo on navy, headline and exact Hub href. Logo fully loaded with natural dimensions 1500 × 1250; no captured browser console errors. The Hub was not opened/probed.
- Both public original PNG copies match source SHA-256 hashes. Final hero/responsive/animation validation remains phases D–G; no full-site acceptance is claimed.

### Remaining work

- Obtain direct current contact/claim evidence before prominent certification, regulatory or safety publication; leave unsupported claims out meanwhile.
- Configure local Git authentication before future fetch/push, if requested.
- Complete phases C–G: distinct photography, final tokens, measured live hero, reference navigation, meaningful lower sections, motion, responsive layouts and final functional/visual QA. Only the logo-copy item in C has already been completed as part of runtime verification.

## 7 October 2026 — phases C and D implementation

The earlier remaining-work list records phase A/B status at that time. C and D are now implemented and verified as described below; the living checklist is the current task authority.

### Result and scope

- Built the hero as live semantic content and separate assets: three-line headline, measured diagonal photo boundary, supporting trapezoidal windows, SVG guide/curve details, integrated three-tile service panel, industry strip, retained desktop navigation and circular Sky I feature.
- Primary logo uses the exact supplied `sky-logo.png` on a navy backing. Both public PNG files still match the source SHA-256 hashes. Tested logo rendering on light, deep-blue and navy surfaces. Sky I uses a pale inner CSS backing inside the blue feature for readable blue lettering; full PNG artwork remains unclipped and unchanged.
- Added local Archivo/Inter fonts, license attribution, shared color/spacing/type/motion tokens and source-coordinate geometry. The reference typeface is not identifiable, so Archivo's width axis and per-word scaling approximate its measured cap widths/line breaks without claiming exact font identity.
- Seven accepted generated photos: three main scenes (urban facade, concrete tower, steel structure), and independent inspection, facade team, drone and concrete infrastructure photos. Tool delivered 1672 × 941 source files; supporting derivatives are 1400 × 788. Sources/provenance, actual file sizes, crop priorities and full built-in `image_gen` prompts are recorded in the asset manifest. All website-consumed files are in the workspace. A coastal supporting background was rejected and corrected with the built-in image editor. No technician cutout was needed.
- Manual photo buttons have labels and pressed state. Autoplay is intentionally absent at this phase. Supporting photos remain independent when the selected main photo changes.
- Retained navigation order: Services, Industries, Our Work, About, Insights, Hub, followed by Get in Touch. Services/Industries use native disclosures with keyboard Escape behavior. Mobile uses a native disclosure rather than a modal. All internal targets contain meaningful content; no blank hrefs or invented project records. The external Hub was not opened or probed.
- Implemented concise About, six service groups, industries/capabilities, Sky I, existing-company information links, offices/enquiry actions and a semantic footer as necessary destinations. Current badge/regulatory/safety claims remain omitted; dedicated safety and final deployment/canonical acceptance remain unfinished. This supporting content does not imply all phase F/G requirements are complete.

### Static reference comparison

Production browser viewport **1672 × 941**; actual stage **1657 × 932.55** after the 15px vertical scrollbar. Reference image resized to the measured stage for comparison. Saved `docs/qa/hero-desktop.jpg`, `geometry.json` and a 50% `reference-overlay.jpg`; visually reviewed the overlay and refined the heading word widths and paragraph/CTA offsets. The final desktop review screenshot was refreshed from the equivalent development layout after confirming every visible photo and both PNG logos were loaded; it includes the development-only Next indicator. The short-desktop screenshot was captured from production.

Measured service envelope: x=29.72, y=578.75, width=846.39, height=229.91. Scaling the recorded source rectangle (30,584,854,232) by 1657/1672 yields approximately (29.73,578.76,846.34,229.92). Tower-window origin (1313.17,242.83) and drone-window origin (1376.47,367.70) closely follow source anchors. Headline word widths are approximately 526.43, 527.95 and 401.31px. Primary CTA top is 487.88px, matching source y=492 at the stage scale.

The macro silhouettes, panel anchors and headline footprint were compared at matching dimensions. Approved differences are the full supplied primary logo/header backing, the circular Sky I feature with readable inner backing, different illustrative photos, and omission of unverified metrics. Service-envelope corner tracing and exact font/photo identity are not described as a pixel-perfect reconstruction. Complete viewport-matrix acceptance remains phase G.

### Actual checks and corrections

- Final `npm run lint`, `npm run typecheck`, and `npm run build` all passed after implementation/refinements.
- Started final production server on port 3001; homepage and local photos/fonts/logos loaded. No captured production browser console errors or broken visible images.
- Desktop Services disclosure opened with all supported links; Escape closed it and returned control to the summary. Mobile menu retained all labels, exact Hub href and Escape behavior. Native details/anchors provide the no-JS fallback.
- All desktop/mobile/footer Hub hrefs equal `https://skyadmin.ropeaccess.co.za/dashboard`, with safe new-tab attributes. No Hub network/authentication work performed.
- Every internal href resolves to an actual ID. View all click reaches `#services`; after native smooth scrolling settled, the mobile services heading was at y=124.09–204.72 within the 844px viewport. Sky I badge reaches `#sky-i`.
- Main images were selected on desktop and mobile, then inspected after network completion. Active image alt/src and button pressed state were checked. A first rapid screenshot caught the old image during fetch; final image checks used loaded sources rather than treating that transient frame as verified.
- At 390 × 844 and 320 × 568, no horizontal overflow; main PPE/task crops, supplied logo, linked tiles and both supporting windows remained usable. Found and fixed a mobile SVG issue: hiding the root SVG also hid clip definitions. Mobile now hides only decorative paths/groups and preserves the definitions.
- At 1280 × 720, no horizontal overflow; primary CTA bottom approximately 415.94 and service panel bottom 617.34 are within the viewport. Saved short-desktop screenshot. Broader responsive/zoom matrix is still pending.
- Search/story-video controls are absent from source, rendered DOM and focusable UI. Generated photos are labelled as illustrative capability photography instead of actual client jobs.
- Source originals, reference and logos preserved. No commit, push or publication performed. The temporary logo-review HTML was removed after capturing the backing comparison.

### Remaining E–G work

Entrance/transition motion and optional effects; further responsive/zoom and keyboard/contrast checks across every image; a dedicated evidence-based safety section; current contact/certification/regulatory confirmation; verified deployment/canonical/social configuration; realistic performance measurements and complete final screenshot/functional acceptance. Git CLI authentication still needs configuration before future fetch/push.

## 7 October 2026 — smaller Sky I branding

User requested a substantially smaller Sky I logo. Reduced the hero circle from 18.9% to 12.5% of the desktop stage (approximately 313px → 207px at the reference viewport), from 28% to 18.5% on smaller desktops, and from 280px to 185px on mobile. Capped the division-section circle at 260px desktop / 200px mobile. PNG artwork, pale backing, aspect ratio and `#sky-i` destination remain intact. Block image display removes inline baseline space so circle hosts stay square. Browser checked desktop/mobile dimensions, loaded original 1254px logo, and no horizontal overflow. Latest review screenshot: `docs/qa/hero-sky-i-smaller.jpg`; earlier geometry/screenshot records describe the previous sizing. Lint, typecheck and production build re-run for this revision.

## 7 October 2026 — remaining implementation and mirrored About

The latest user request supersedes the interim About layout. It is now reconstructed from the new supplied 2752 × 1536 reference as photo-left/text-right live content. Main window, inset border, navy collage silhouette, blue/grey accents, dashed guide lines and circular Since 1999 badge use normalized traced geometry. The Explore pill preserves the reference action footprint and adds sheen/arrow/lift on hover/focus. Typography is tuned to the reference's line widths; exact unknown source-font identity is not claimed.

Generated two separate portrait photographs with built-in imagegen and visually reviewed both. Labelled native PNGs are in assets/source/about, optimized WebPs in public/images/about, and complete prompts/metadata in docs. Existing supporting hero photos form the tinted background collage. Native image files are not mirrored/recoloured. Source reference copied unchanged into docs/reference/about-reference.jpg.

Completed coordinated hero entrances, one-time lower-section arrivals, eight-second autoplay with 950ms crossfade, manual Pause/Play and persistent explicit/manual pause. Hover, focus, offscreen, hidden-document and reduced-motion signals gate the timer; subscriptions/observers/intervals clean up on unmount. All content renders visibly without JS, and shared reduced-motion CSS disables animation/transition. Optional continuous parallax/ring effects omitted to preserve logo stability and the precise reference lines.

Added supported safety/quality process content, finished footer branding/navigation/contact routes, focusable section/service anchors and a skip link past navigation to the hero heading. Added code-native social/icon previews and optional validated SITE_URL metadata/robots/sitemap configuration. No verified deployment origin/provider has been supplied; preview stays noindex and no canonical is fabricated.

Final lint, independent TypeScript and build pass. Production browser and HTTP checks pass. Nine viewport widths, 200% equivalent reflow, all three desktop/mobile hero crops, menus/keyboard focus, active/pressed state, autoplay advance/resume and About geometry reviewed. Scripts verify all delivered photo resources, metadata endpoints, referenced scripts/styles/fonts, internal targets, unique IDs and unchanged logo hashes. Source inventory and Git status reviewed; no secret/temporary review pages, commits, pushes or publication.

Detailed executed checks, timings and remaining runtime limits are in docs/final-qa.md. Native OS reduced-motion/hidden-tab emulation, true browser-chrome zoom and real-device/throttled-network/Core Web Vitals measurements remain unclaimed. Live official fetches still time out; indexed contacts corroborate the existing data. Current certificates/regulatory/safety-record claims stay omitted. Since 1999 follows the brochure/user reference even though the indexed old homepage says 1998; no safety-record assurance is derived from it.
