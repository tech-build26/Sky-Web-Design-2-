# Skyriders website

Completed Next.js landing page: reference hero/navigation, intact supplied logos, accessible three-image slideshow, mirrored About with generated portraits and animated Explore, cinematic services section, safety, industries, capabilities, Sky I, insights, contacts and footer. The services section features one unchanged cooling-tower interior photograph across the full section, three frosted glass tiles, and an Explore all services button that opens the full catalogue; the dedicated services page is deferred. Services design, image prompt and provenance are in `docs/services-design.md`. Evidence and limits are in `docs/final-qa.md`; `design.md` contains the current checklist.

Safety & quality follows the supplied “Planned Excellence” reference with its original technician photograph, right-hand graphics and planning icons, traced panel geometry, live heading/process copy, and a working contact CTA. Reference measurements, lossless asset provenance and current verification are in `docs/reference/safety-quality-reference.md`.

## Requirements and commands

Node.js >=20.9.0; verified with Node 24.13.1 and npm 11.8.0. Use npm and the single `package-lock.json`.

```powershell
npm.cmd ci
npm.cmd run dev
```

Visit http://localhost:3000. To use another port: `npm.cmd run dev -- --port 3001`.

```powershell
npm.cmd run lint
npm.cmd run typecheck
npm.cmd run build
npm.cmd run start
```

Run typecheck after the initial build or dev startup if Next's generated route types are absent. Build must finish before starting production. Use `npm.cmd run start -- --port 3001` for a different production port.

No environment variables or private credentials are required for the preview. The Hub is a fixed link. For deployment, copy `.env.example` to `.env.local` and set `SITE_URL` to the verified HTTPS origin before building. This enables canonical, sitemap and production indexing; without it the preview stays noindex. No provider/domain has been selected and nothing has been published.

## Inputs

- Primary Skyriders artwork: `sky-logo.png`, unchanged; public copy at `public/images/brand/sky-logo.png`. White lettering needs a dark backing.
- Sky I artwork: `sky-i-logo.png`, unchanged; public copy at `public/images/brand/sky-i-logo.png`.
- Hero reference: `SkyRiders_ Access Beyond Limits.png`, 1672 × 941; measurements in `docs/reference/hero-reference.md`.
- About reference: `docs/reference/about-reference.jpg`, 2752 × 1536; reversed composition and paths in `docs/reference/about-reference.md`.
- Evidence and unresolved requirements: `docs/implementation-notes.md`.

## Assets and verification

Photos are AI-generated illustrations, not actual company project records. Optimized files live in `public/images/hero/`; provenance/crops are in `docs/asset-manifest.md`, and the built-in tool prompt set is in `docs/photography-prompts.md`. The seven delivered photo files total approximately 1.3 MiB. Logos retain their original PNG bytes. Archivo and Inter are self-hosted via `next/font/local`, with licenses in `docs/licenses/`.

Reference comparison and screenshots are in `docs/qa/`. Recreate the final hero overlay with `node scripts/reference-overlay.mjs docs/qa/final-hero-1672x941.jpg docs/qa/final-reference-overlay.jpg`. All seven accepted hero originals are now labelled in `assets/source/hero/`; re-encode from these portable project sources with `node scripts/optimize-photos.mjs docs/photo-source-inputs.json`. Website visitors receive optimized public derivatives.

About photography has labelled native sources in `assets/source/about/`, WebP derivatives in `public/images/about/`, prompts in `docs/about-photography-prompts.md` and metadata in `docs/about-photo-metadata.json`. Re-encode with `node scripts/optimize-photos.mjs docs/about-photo-inputs.json public/images/about docs/about-photo-metadata.json`.

The slideshow crossfades every eight seconds when visible and unengaged. Explicit pause persists until Play; manual selection pauses it. Focus, hover, offscreen, hidden-document and reduced-motion conditions stop autoplay. Reduced motion disables transitions/entrances. Native disclosures/anchors work without JS; all text starts visible in server HTML. Unsupported metrics, credential badges, search and story-video controls are absent.

After starting production on port 3001, run `node scripts/verify-production.mjs` to verify page/assets, internal destinations and intact logos. Measurements go to `docs/qa/production-http-checks.json`; these are local checks, not real-device Core Web Vitals benchmarks.

The folder initially had no Git checkout. The authenticated GitHub connector verified the private repository `tech-build26/Sky-Web-Design-2-` is empty with no branches. Local Git now uses an unborn `main` branch and the exact URL as `origin`. Command-line Git authentication is not configured and returns “Repository not found” for this private repository; configure GitHub access before future fetch/push work. No commits, pushes or publication are authorized by the phase A/B request.
