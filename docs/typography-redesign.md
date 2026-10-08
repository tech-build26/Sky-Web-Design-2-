# Landing-page typography — 8 October 2026

Approved by the user after a typography plan covering the entire landing page. Scope is type, typographic colour, associated copy labels and text-only motion.

## System

- Archivo handles headlines and selected editorial emphasis. Inter handles body copy, navigation, forms, buttons and supporting labels.
- Added a genuine locally hosted Archivo variable italic face from the installed font package. The accompanying SIL OFL licence is retained in `src/app/fonts/Archivo-OFL.txt`.
- Removed every explicit Arial declaration from `src/`, including font shorthands and fallbacks. Disabled Next local-font automatic Arial metric fallback; configured Segoe UI / generic sans-serif fallback instead.
- Removed artificial horizontal stretching and inconsistent width-axis settings from headings. Shared family, label size/tracking and reading-text leading are declared in `src/app/globals.css`.
- Body copy remains still and readable. Heading lines have a restrained arrival animation that repeats when revisiting a section. Reduced-motion preferences disable these effects; content is visible without JavaScript.

## Section direction

| Area | Result |
| --- | --- |
| Hero | Strong solid Archivo headline with a blue, unfilled outlined Beyond. |
| Who we are | Natural headline proportions, lighter editorial statement, blue italic access and Inter paragraphs. |
| How we help | Smaller Expertise at lead, italic every and larger softly graded elevation. |
| Safety & quality | Structured uppercase headings, natural-weight process titles and unified supporting copy. Image-side captions are rendered in live typography over the old caption areas. |
| Industries | Confident first line and calmer second line, with cyan italic attention. |
| Sky I | Lighter italic perspective paired with bold precision. |
| Contact | Smaller lead followed by an expressive blue headline and italic reach it; practical Inter form text. |
| Footer | Small uppercase brand lead and larger limits, with clearer navigation/supporting text. |

## Names

About us becomes Who we are. Our services becomes How we help in the section, hero action, hero panel and footer. Header Services remains the conventional catalogue navigation label; About becomes Who we are. No Our Offerings terminology is introduced. Existing anchor IDs are retained.

## Validation

Source scan found no Arial declarations or horizontal text scaling. ESLint, TypeScript and the final production build passed. Browser computed styles identify Archivo for headings and Inter for supporting text, with genuine italic styles on emphasis. All six main section labels measured 11px with the shared body font. Desktop review covered the hero, About, Safety and Industries; the process descriptions fit above the Safety CTA. Mobile review at 390px and 320px found no horizontal overflow. The Services reveal was active when visible and reset after leaving.

The production HTTP check passed for 93 resources, working internal destinations, contact-route validation and both unchanged supplied logos. Delivered production CSS was checked for the absence of Arial, including Next's generated font fallbacks, and presence of an italic font face. Updated section names were verified in production HTML. Screenshot evidence is under `docs/qa/typography-*`.
