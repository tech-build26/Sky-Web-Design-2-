# Approved division gateway integration — 8 October 2026

The site root (`/`) now serves the supplied pre-landing scene. Both Skyriders choices retain their original `/home/` href and departure animation, then reach the existing Skyriders hero. Next.js normalizes `/home/` to `/home`. Both Sky I choices retain `https://skyi.co.za/`. Existing website section anchors remain relative to `/home`, including navigation, services, contact, and back to top.

The subsequent requested Sky I visibility fix uses a circular `#f3f8ff` backing and 8px image padding, matching the main landing page. This small override lives in `src/app/(prelanding)/prelanding.css`; supplied runtime files and logo artwork remain unchanged. Browser comparisons mask only that logo link to allow this approved difference.

## Permanent files

- `src/app/(prelanding)/layout.tsx`: separate gateway root layout, supplied stylesheet/font preloads and metadata.
- `src/app/(prelanding)/page.tsx`: root gateway route.
- `src/components/prelanding/scene.ts`: fixed supplied body markup; only image paths changed to `/pre-landing/images/`.
- `src/components/prelanding/Prelanding.tsx`: server-rendered scene plus client initialization/cleanup of the supplied enhancement script.
- `public/pre-landing/`: 16 byte-identical runtime assets, including original CSS, script, fonts, artwork, favicon and licenses.
- `src/app/(website)/layout.tsx`: moved existing layout, with relative font/style imports adjusted and canonical/Open Graph URL set to `/home` when `SITE_URL` is configured.
- `src/app/(website)/home/page.tsx`: moved existing page without changing its components or content.
- `src/app/sitemap.ts`: includes both the gateway and website when `SITE_URL` is configured.
- `scripts/verify-production.mjs`: existing website checks now request `/home/`.

No additional application dependencies or environment variables are required. The existing `SITE_URL` deployment configuration and preview noindex behavior remain. The original `pre-landing/` folder is untouched and no application import/read depends on it. It can be removed after the user's approval. No commit or publication was performed.

## Verification

`npm.cmd run lint`, `npm.cmd run typecheck`, and `npm.cmd run build` passed. The production website verifier passed with 53 internal fragment links and 92 resource checks, including contact validation and unchanged existing logos.

`docs/qa/prelanding-integration.json` records comparison with the standalone handoff in installed Chrome. All eight layouts had zero geometry difference and zero changed pixel channels (threshold: 2/255) in a matched reduced-motion state: 1918×911, 1440×900, 1024×768, 820×1180, 768×1024, 390×844, 320×700, and 667×375. No horizontal page overflow or missing artwork occurred. Desktop and mobile screenshots are `docs/qa/prelanding-1918x911.png` and `docs/qa/prelanding-390x844.png`. Hover, pointer position and animation phase can change the subject positions/blur and captions in ordinary motion, as they do in the approved source.

Browser checks passed for both Skyriders links reaching the hero; all four brand destinations; keyboard caption reveal; reduced motion; message rotation and hover pause; ticker focus pause; pointer motion; modified clicks; animated desktop and mobile departure; touch captions; refresh; browser Back; and desktop/mobile navigation with JavaScript disabled. No browser console errors or page exceptions were observed. The external Sky I URL was verified as the supplied link destination; no remote availability or deployment claim is made.

To reproduce while the handoff folder is retained, start the production application (for example on port 3012), and serve the source with `python -m http.server 3013 --bind 127.0.0.1 --directory pre-landing`. Run `node scripts/verify-prelanding.mjs http://127.0.0.1:3012 http://127.0.0.1:3013` using an available Playwright runtime (`PLAYWRIGHT_MODULE` may point to its installed package) and Chrome (`CHROME_PATH` may override the default Windows Chrome path). This QA runtime is separate from application dependencies.
