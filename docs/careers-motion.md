# Careers motion and layout refinement

12 October 2026.

## Changes

- Careers uses the shared ScrollReveals, RopeTechnician and ScrollToTop components, matching the site's existing entrances, heading reveals and navigation effects. Hero copy, the three introductory points, board heading, empty state, hiring steps, FAQ and footer reveal progressively.
- The hero now has a stage capped at the same `--stage-max` as other pages. The shared header height uses stage width (`clamp(72px, 5.625cqw, 104px)`) rather than a percentage of each differently sized hero. Logo and nav typography remain the shared SiteHeader styles; existing tablet/mobile overrides remain intact. Removed the Careers mobile hero's duplicated top spacing and kept its dropdown within the shorter hero.
- Added a restrained transform-only photograph drift, animated blueprint trace, CTA sweep/arrow effects and hiring-step rules. Photo movement and ambient geometry pause offscreen. Reduced-motion preferences disable those effects and JS height transitions.
- Public vacancies have staggered entrances, blue/teal/violet accents, availability labels, qualification/contract/industry chips, hover/focus treatment and smooth detail expansion. The same VacancyCard renders the administrator advert preview, labelled Preview only and with no application action.
- FAQ category changes animate the panel height and incoming content, with colour transitions on tabs. Answers use measured native-details height transitions and rotating indicators. Rapid reversals start from the currently rendered height; cancelled animations restore intrinsic sizing. Answers close one at a time. Closing content becomes inert immediately, and resizing or changing motion preferences settles active transitions.
- The shared reveal observer now registers newly inserted content and releases removed elements. It uses one shared reveal observer plus a child-list-only MutationObserver, supporting filters/new cards without a per-card scroll listener or animation loop. Content remains visible if enhancement is unavailable. No animation package was added to the runtime.

## Verification

`npm run test:careers:motion` runs the actual React FAQ, VacancyCard, AnimatedDisclosure and ScrollReveals components in an isolated jsdom document. It checks rapid opening/closing reversal, interrupted categories, no retained inline height, exclusive answers, Arrow/Home/End tab navigation, reduced-motion changes, resize settlement, missing-WAAPI fallback, application action, escaped advert content, preview isolation, inserted-card registration and observer cleanup. Geometry and animation timing are mocked; this is interaction-logic verification, not actual browser rendering or frame-rate measurement.

Lint, TypeScript and Next production build passed. The existing metadataBase fallback warning remains for the preview configuration. No recruitment authentication, PDF validation, email recipients, database policies or live provider settings were changed.

The browser tool rejected access to `http://localhost:3000/careers` under its URL policy. No alternate browser surface or indirect browser automation was used. Fresh screenshots, pixel measurements across viewport sizes, visual easing/contrast checks and real-device performance verification could not be completed in this turn. Previous screenshots belong to the earlier design and must not be presented as evidence of these changes. Review the current page at 320/390, 768/1024, 1440 and 1920 pixels before visual sign-off, including the shared header on other pages and an administrator advert preview.

jsdom is a development-only test dependency. Motion tests were verified with the current Node 24 runtime; jsdom 29 requires Node 20.19+, 22.13+ or 24+ in its supported version ranges.
