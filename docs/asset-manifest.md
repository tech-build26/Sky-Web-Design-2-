# Supplied asset manifest

Verified 7 October 2026. All original supplied files remain unchanged. User-supplied company artwork is for this Skyriders website; no independent licensing declaration has been obtained.

| File | Role/source | Dimensions / alpha | Production use |
| --- | --- | --- | --- |
| `sky-logo.png` | Official primary logo designated by user | 1500 × 1250, RGBA, transparent | Identical copy in `public/images/brand/sky-logo.png`; contain entire artwork on dark backing, no recolor/crop. |
| `sky-i-logo.png` | Supplied Sky I division artwork | 1254 × 1254, RGBA, transparent | Identical copy in `public/images/brand/sky-i-logo.png`; contain with ring and clear space intact. |
| `SkyRiders_ Access Beyond Limits.png` | Supplied hero design reference | 1672 × 941, RGB, opaque | Reference only; do not ship as a flattened website or claim illustrative workers as actual projects. |
| `docs/reference/about-reference.jpg` | New user-supplied About reference, unchanged copy from Downloads | 2752 × 1536, opaque | Reference only; mirror geometry into live code, use new photos and live text. |

SHA-256 integrity checks (original and public copy identical):

- `sky-logo.png`: `F7A86C03621D7073C45E0148EB7E673C653F1A9A9899037F78E055738C49E0AF`
- `sky-i-logo.png`: `DA083AF12E6CB4ED9E49EE95E81B080FE17F2B233ADC3F68D800971B1F148F40`

## Phase C photographs — 7 October 2026

Seven accepted illustrative photographs were produced with the built-in `image_gen` tool and reviewed visually. They are not actual Skyriders project records and must not be attributed to a named client. Prompts are in [photography-prompts.md](photography-prompts.md); paths/dimensions/derivative sizes are in `photo-source-inputs.json` and `photo-metadata.json`. Accepted originals are now copied intact with descriptive filenames to `assets/source/hero/`, with source hashes in `hero-source-integrity.json`; original tool copies also remain. Website derivatives are under `public/images/hero/`.

| Final filename | Role and review | Delivered dimensions / size | CSS crop priorities |
| --- | --- | --- | --- |
| `hero-sa-urban-facade-01.webp` | Main facade photo; Black foreground inspector, white colleague, inland city; no invented waterway | 1672 × 941 / 294 KiB | Desktop 69% 50%; mobile 67% 50%. Preserve helmet, task, harness and colleague. |
| `hero-sa-industrial-tower-02.webp` | Main concrete tower; white foreground inspector and Black colleague at inland industrial plant | 1672 × 941 / 273 KiB | Desktop 64% 50%; mobile 65% 50%. Preserve hands, gauge and connected harness. |
| `hero-sa-steel-structure-03.webp` | Main steel structure; Black foreground technician and white colleague on distinct rigging | 1672 × 941 / 255 KiB | Desktop 63% 50%; mobile 62% 50%. Preserve both helmets and beam/tool contact. |
| `hero-support-inspection.webp` | Independent close inspection scene; initial coastal background rejected and replaced with inland highveld plant context | 1400 × 788 / 140 KiB | Supporting window 57% 45%; service tile 60% 38%. Keep the inspector and tool in frame. |
| `hero-support-team.webp` | Independent facade inspection/team scene; Black foreground technician using a hand tool and white colleague | 1400 × 788 / 116 KiB | Tile 57% 34%; preserve head, gloved task and visible harness. |
| `hero-support-drone.webp` | Independent outdoor quadcopter/industrial-tower scene; no named equipment model claimed | 1400 × 788 / 124 KiB | Supporting window 57% 45%; centered drone with plant context. |
| `hero-support-infrastructure.webp` | Independent inland concrete viaduct; strong deck/column detail for inspection preview | 1400 × 788 / 127 KiB | Tile 50% 52%; retain deck, supports and railing. |

The generator delivered 1672 × 941 originals despite larger requested targets; no artificial upscaling or claim of 3200px output is made. Main-photo resolution is adequate for the current approximately 980px desktop photo field; final high-density/wide-device sharpness remains phase G QA. Main originals are retained at native resolution; supporting assets are resized to 1400px and encoded as WebP. Combined production source files are approximately 1.3 MiB. `next/image` serves additional responsive variants. Only the first main photo is preloaded; lower-page photography is lazy-loaded.

Encoding only is performed by `scripts/optimize-photos.mjs`, using pinned Sharp 0.35.5; photographs are not retouched or cropped by that script. The supplied logos are still the unchanged original PNG bytes. Generated images are opaque, so no foreground cutout/alpha edge repair is required. A separate technician cutout was correctly omitted because the reference does not establish one.

Visual review covers natural skin, coherent limbs/hands, navy/blue workwear, helmets, visible harnesses/connectors, plausible working/backup lines, task-facing poses, industrial structures and inland South African context. Black and white technicians both have foreground prominence across the set. This is an illustration plausibility review, not a technical safety certification or evidence of actual company jobs.

## Logo surface review and font provenance

The unchanged logos were browser-rendered on white, deep blue `#001870` and navy `#071C35`; evidence is `docs/qa/logo-backings.jpg`. Skyriders' white lettering needs the navy backing. Sky I's blue lettering reads most clearly on a pale inner disk, inside the required blue circular feature. The inner disk is a CSS background behind the complete PNG; no filter, recolor or image clipping is applied. The outer feature leaves roughly 12% horizontal clear space around the image host.

Heading font: Archivo variable, Latin normal, full width/weight axes, sourced from `@fontsource-variable/archivo@5.3.0`. Body font: Inter variable, Latin normal weight axis, sourced from `@fontsource-variable/inter@5.3.0`. Selected WOFF2 files are vendored in `src/app/fonts/` and served by `next/font/local`, without runtime Google requests. Both use SIL OFL 1.1; complete attribution/licenses are retained in `docs/licenses/`. Archivo is an approximation to the unknown reference typeface; line breaks, cap height and word widths were tuned against the reference rather than asserting a verified exact font identity.

## About photographs — final page revision, 7 October 2026

Two accepted built-in imagegen portrait photographs. Native sources are labelled in `assets/source/about/`; every consumed derivative is in `public/images/about/`. Complete prompts, encoding inputs and exact metadata are in `docs/about-photography-prompts.md`, `docs/about-photo-inputs.json` and `docs/about-photo-metadata.json`.

| File | Role | Native and delivered size | Review/crop |
| --- | --- | --- | --- |
| `about-concrete-rope-access.webp` | Main About window | 1024 × 1536; 290,542 bytes | White technician, concrete viaduct, navy PPE; object position 52% 51%. |
| `about-johannesburg-facade.webp` | Framed About inset | 1024 × 1536; 213,626 bytes | Black technician, inland Johannesburg facade; 60% 50%, CSS 1.2 crop scale around 65% 46%. |

Both were visually checked for credible anatomy, visible harness/rope lines, full-body poses, appropriate blue workwear and local context. This is photographic illustration review, not a safety diagram/certification. The inset CSS crop increases subject prominence without editing the file. No photographs, faces, words or logos are flipped. The navy collage reuses existing separately labelled team/facade/steel photographs with a CSS shade.

About photo derivatives total 504,168 bytes. All nine photography files total about 1.8 MiB. Main hero scenes were reviewed across the final wide/mobile matrix; native-resolution limits on unusually dense displays remain documented in `docs/final-qa.md`. Social preview/icon are generated by code-native Next ImageResponse layouts showing the official primary PNG intact on navy; they do not replace or alter the supplied logo files.

## Safety & quality artwork — 8 October 2026

The user-supplied `Safety & Quality_ Planned Excellence.png` is retained unchanged at `docs/reference/safety-quality-reference.png`. The native 1778 × 885 artwork supplies the technician photograph, right-hand decorative panels and three planning icons. A lossless WebP is delivered as `public/images/safety/safety-quality-artwork.webp` (1,208,702 bytes); decoded pixel equality with the supplied PNG was verified. Main copy, process descriptions, left-panel geometry and the contact CTA are rebuilt in HTML/SVG/CSS. Measurements and details are in `docs/reference/safety-quality-reference.md`. No new image generation was used for this section.

## Onsite assessment photograph — 11 October 2026

`public/images/about/onsite-assessment.webp` is a 1672 × 941, 168,634-byte WebP derivative of one built-in ImageGen output retained under the Codex generated-images directory. It illustrates a ground-level site walkdown with one client, two technical managers, a plan, and an industrial smokestack. It is illustrative campaign photography, not an actual Skyriders client visit or a safety record. The scene was visually reviewed for a clear pointing gesture, plausible PPE, a readable plan discussion, and a crop that works on desktop and mobile.

Final generation prompt: “Create a single photorealistic editorial photograph for a premium South African industrial rope access company's About page. Scene: a genuine free onsite technical assessment at a large inland South African industrial facility, with a tall concrete and brick smokestack clearly visible in the background. In the foreground, one client representative in smart workwear and two Skyriders technical managers in navy/blue industrial workwear, white hard hats and appropriate site PPE stand together safely on the ground beside a site plan or clipboard. One technical manager points up toward a specific area of the smokestack while the client follows the gesture; the other manager discusses the scope using the plan. Their interaction must clearly communicate collaborative site scoping before a quotation, not a rope access operation. Diverse South African professionals with natural expressions and believable hands/poses. Wide landscape composition 16:9, participants primarily on the right half with some clean architectural space on the left for a website crop. Warm bright highveld daylight, realistic textures, refined blue-grey neutral grading, premium documentary photography, physically credible plant infrastructure. No visible company logos, signs, words, watermark, UI, borders, dramatic smoke, hazards, fake PPE, or extra people.”

## Trust-page redesign imagery — 11 October 2026

The three supplied PNG mockups in Downloads were used as visual layout references. Their text is not treated as instructions or as independent evidence for safety claims. The live sections use HTML, CSS, and four new built-in ImageGen photographs, with native PNG outputs retained in `assets/source/about/` and optimized WebP copies in `public/images/about/`.

| WebP file | Scene and use | Dimensions / bytes |
| --- | --- | --- |
| `partner-safety-technician.webp` | Rope technician against an industrial tank in the blue safety card | 1672 × 941 / 127,982 |
| `partner-industrial-silo.webp` | Pale concrete silo and railings in the competence card | 1672 × 941 / 210,508 |
| `partner-rope-technician.webp` | Vertical technician on a silo at the right edge of the partner section | 1024 × 1536 / 290,240 |
| `assessment-architecture.webp` | Dramatic close industrial structure behind the onsite assessment panel and subtly in the insurance card | 1672 × 941 / 200,700 |

The earlier `onsite-assessment.webp` forms the background of section 01, Safety & compliance guarantee, immediately after the About hero. The generated scenes illustrate technical access and industrial assets; they do not document an actual Skyriders job or prove a safety outcome. Prompts emphasized plausible two-line rope systems and PPE where technicians appear, South African inland industrial context, clean composition for text overlays, and no logos, words, or UI.

## Contact page hero — 11 October 2026

`assets/source/contact/contact-industrial-rope-hero.png` is the native built-in ImageGen output. `public/images/contact/contact-industrial-rope-hero.webp` is its 1600 × 800 Sharp-encoded derivative (165,842 bytes). The user-supplied contact page mockup guided its composition: close industrial steelwork, rigging lines and a rope-access technician in a restrained navy/blue palette. The photograph is illustrative and has no company logos or text. It was visually checked for believable rigging and an effective crop behind the diagonal hero mask.

## Industries hero

`public/images/industries/industries-bridge-access.webp` is a 1672 × 941, 317,258-byte WebP derivative of a built-in ImageGen photograph. The native PNG remains in the Codex generated image store. It illustrates two rope access technicians inspecting a concrete viaduct in a dry South African landscape. It is illustrative imagery, not a record of a Skyriders project.
