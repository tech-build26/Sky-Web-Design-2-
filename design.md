# Skyriders website — design and implementation specification

> **8 October 2026 approved revision:** Remove the entire Our Work / Capability at height section and its navigation entry. Replace the lower Sky I section with a compact panoramic inspection interior, supplied transparent Elios 3 on the right, viewport-triggered entrance, continuous hover and scoped mouse response. The CTA reads **Visit Sky I** and uses the existing hero destination. This revision supersedes earlier requirements for that section and navigation entry. Assets, generation prompt and verification: `docs/sky-i-redesign.md`.

> **Project:** Skyriders Access Specialists (Pty) Ltd, South Africa  
> **Companion division:** Sky I — industrial drone inspection  
> **Repository:** https://github.com/tech-build26/Sky-Web-Design-2-  
> **Requested framework:** Next.js **16.4.0**, App Router, TypeScript  
> **Primary hero headline:** **Access Beyond Limits**  
> **Deliverable governed by this document:** A polished, responsive company website that faithfully reproduces the supplied hero reference and develops a coherent page beneath it.  
> **Current delivery, 7 October 2026:** Landing-page implementation is complete, including the mirrored About reference, generated photography, animated Explore, accessible slideshow, responsive sections, safety content, footer and deployment-aware metadata. Local QA and its limits are in `docs/final-qa.md`. Current certificate validity, a production origin, native OS motion/hidden-tab emulation and real-device/network measurements remain external verification items. No commit, push or publication performed.

## 1. Read this first

This is the implementation brief for Codex. Read the entire document before changing the project. Inspect any applicable `AGENTS.md`, the existing repository, the supplied visual reference, the company brochure, and the supplied logos before selecting implementation details.

The user explicitly wants the existing hero design reproduced, including its curves, photo composition, typography hierarchy, layering, and overall proportions. Preserve everything in that reference except the changes listed in section 2. A generic navigation bar above a rectangular background photograph will not satisfy this brief.

### 1.1 Reference availability and fidelity

**Updated 7 October 2026:** The hero reference is available locally as `SkyRiders_ Access Beyond Limits.png`, **1672 × 941 pixels**, with no browser chrome. It has been visually inspected. Its retained copy, navigation, approximate measured bounds, silhouettes, and photo focal points are recorded in `docs/reference/hero-reference.md`. Preserve the original file unchanged.

The available reference uses a diagonal white/photo boundary, rounded trapezoidal supporting windows, a sloped services panel, and an angular lower-right Sky I panel. It does **not** show the previously described circular word ring. Use these observed silhouettes for reconstruction; the explicit requirement for a lower-right blue circular Sky I feature remains an approved variation from this image. Do not invent ring wording. The reference's triangular header mark is superseded by the user's supplied official `sky-logo.png`.

The brochure was inspected during specification preparation but is not present in this workspace at the phase A/B audit. Its recorded facts remain attributed to that earlier review; current claims require separate verification.

Accordingly:

- Treat the available hero image as the authority for its geometry and retained content, subject to explicit user requirements.
- Use `docs/reference/hero-reference.md` ahead of the obsolete provisional baseline in section 6.3.
- Do not claim an exact visual match until the original reference has been inspected and compared with a rendered implementation.
- If the reference is missing, proceed with repository setup, content, assets, component structure, and provisional styling. Record visual fidelity as unresolved; obtain the reference before signing off that criterion.
- If the reference exists elsewhere in the repository or accessible conversation attachments, reuse it. Do not repeatedly request a file that is already accessible.

### 1.2 Priority order

1. Explicit user requirements in section 2.
2. Original hero reference for all retained design details.
3. Supplied logos for brand artwork and brochure for company facts.
4. This document's detailed implementation and accessibility requirements.
5. Provisional visual measurements and proposed copy where the reference is silent or unavailable.

Never silently substitute a different design because it is faster to implement.

## 2. Non-negotiable requirements

| Item | Required outcome |
| --- | --- |
| Hero headline | Keep the words **Access Beyond Limits** exactly. Preserve the reference's casing, line breaks, and emphasis once inspected. |
| Overall hero | Modern, clean, ambitious, futuristic, premium, and editorial. Maintain the reference's distinctive curved composition and several photographic layers. |
| Orientation | Design desktop first with a wide, horizontal hero. Provide complete tablet and mobile adaptations. |
| Search | Remove the search button and icon entirely, including from mobile navigation and keyboard focus order. |
| Story video | Remove “Watch our story,” its play/video icon, and any related modal or empty space. There is no story video. |
| Hub | Add a clearly visible **Hub** navigation link to **https://skyadmin.ropeaccess.co.za/dashboard**. Do not implement the Hub itself or change the destination. |
| Hero services panel | Retain **Our Services** as part of the hero. **View all** must navigate to the actual page section with `id="services"`. |
| Sky I | Place the supplied Sky I logo in the lower-right blue circular feature. Preserve the logo artwork and proportions. |
| Primary brand | Use the supplied **`sky-logo.png`** for Skyriders. Preserve its complete artwork and proportions. Sky I is a division, not the replacement brand for the site. |
| Photography | South African context; credible work at height and industrial settings. No implausible waterways running through a Johannesburg/Midrand city scene. |
| People | Meaningful, balanced representation of Black and white South African technicians across the image set. Portray both as skilled colleagues doing real technical work. |
| PPE | Blue/navy overalls; credible helmets, full-body harnesses, ropes, anchors, and equipment. |
| Hero imagery | Approximately three distinct main hero photographs. Preserve separate supporting photo windows/cutouts wherever the reference includes them. |
| Motion | Intentional entrance, photo transitions, hover/focus feedback, and restrained depth effects. Include reduced-motion support. |
| Stack | Target Next.js **16.4.0**. Verify package availability and compatible dependencies before installation; do not silently replace the requested version. |
| Environment | Codex handles project configuration and documented environment variables needed for a working app. Never invent credentials. |
| Git | Work against the specified repository. Commit and push **only when the user explicitly requests it**. Do not auto-commit after finishing a task. |
| Checklist | Keep tasks as `[ ]` until their acceptance criteria have been verified, then mark them `[x]`. |

## 3. Company facts and content boundaries

### 3.1 Source material

The supplied **Skyriders Access Specialists Pty Ltd - Brochure - 2026.pdf** has 11 physical PDF pages. Its printed page numbers do not consistently match those physical page numbers; use physical pages when locating evidence.

| Physical PDF page | Relevant content |
| --- | --- |
| 1–2 | Primary branding, company introduction, sectors, safety statement, certifications, office contacts. |
| 3 | Inspection and NDT. |
| 4 | Concrete inspections, maintenance, and repairs. |
| 5 | Installations, rigging, platforms, and height safety systems. |
| 6 | Maintenance, cleaning, protective coatings, and window washing. |
| 7 | Confined space consultation and rescue standby. |
| 8 | Drone inspections under the brochure's SkyEye branding. |
| 9 | Client logos. |
| 10–11 | Further work photographs, branding, certification imagery, and contacts. |

The brochure describes Skyriders as South African based, operating since **1999**, and serving power generation, petrochemical, mining, heavy industry, construction, and facilities maintenance sectors.

The brochure uses the tagline **“ROPE ACCESS, BEYOND EXPECTATIONS.”** This can inform lower-page brand content, but it must not replace the requested hero headline **Access Beyond Limits**.

### 3.2 Proposed short copy

The following is newly written website copy grounded in the service descriptions. It is not a verbatim extraction or a claim that the reference used these words. Preserve original reference copy where the user asked for it to remain.

- **Eyebrow:** Industrial rope access • South Africa
- **Headline:** Access Beyond Limits
- **Supporting copy:** Precision inspection, maintenance and access solutions for demanding industrial environments. Built on technical expertise and a commitment to safety.
- **Primary CTA:** Explore our services → `#services`
- **Secondary CTA:** Discuss your project → `#contact`
- **About heading:** Expertise where access is the challenge.
- **Sky I descriptor, if space permits:** Industrial drone inspection.

Avoid filling the hero with a long company history, certification lists, or paragraphs of technical acronyms. The hero should communicate confidence and access capability immediately.

### 3.3 Facts that require a current check before prominent publication

The brochure reports Level 2 BEE status, a zero-fatality record since 1999, ISO 9001:2015 and ISO 45001:2018 accreditations, and drone regulatory identifiers. These are brochure statements, not independently verified current records. Keep a source entry for each and confirm current wording and validity before making them headline badges, legal assurances, or current certification claims. If confirmation is unavailable, omit the badge and continue with the rest of the page.

Do not invent project counts, customer ratings, employees, success percentages, accreditations, award wins, response guarantees, or updated safety statistics. Avoid dynamic “27 years” badges; **Since 1999** is less likely to become stale.

Do not automatically rename historical **SkyEye** certification or regulatory references to **Sky I**. The user identifies Sky I as a division; that does not prove a regulatory entity/name change. Use Sky I for the new division presentation and verify any legal linkage separately.

### 3.4 Contact information from the brochure

| Office | Details to use, subject to a final current-contact check |
| --- | --- |
| Midrand | 44 Monte Carlo Crescent, Kyalami Park, Midrand, 1685. Telephone: +27 (0) 861 000 SKY (759), i.e. 0861 000 759. Email: info@ropeaccess.co.za. |
| eMalahleni | 24 Langa Crescent, Corridor Hill, Zeekoewater, eMalahleni (Witbank), 1035. Telephone: +27 (0) 13 692 5219. |
| Main website | https://ropeaccess.co.za |
| Hub | https://skyadmin.ropeaccess.co.za/dashboard |

Use a readable South African display format. For machine dialing, normalize the Midrand number to `tel:+27861000759` and eMalahleni to `tel:+27136925219`; verify the Midrand service-number dialing behavior on actual devices. Use `mailto:info@ropeaccess.co.za`. Fax numbers do not need prominent website placement.

**7 October 2026 verification:** The official [contact page](https://ropeaccess.co.za/contact/) search index (crawled about three weeks earlier) corroborates both street addresses, both listed phone numbers, and the email. It calls the Midrand estate **Kyalami Business Park** and adds **Shop 2 & 6** for eMalahleni. Direct page retrieval timed out; treat this as indexed corroboration, not a live company confirmation. The official [certification index](https://ropeaccess.co.za/certifications/) lists ISO/BEE/aviation files modified 21 January 2025, which does not establish their validity in October 2026. Omit current badge claims and the reference's unverified metrics until supported by current documents.

## 4. Brand system

### 4.1 Logo handling

- Keep the supplied Sky I PNG intact. Do not redraw, recolor, replace lettering, crop the circular ring, stretch, or apply a filter that changes it.
- The inspected Sky I image is **1254 × 1254 pixels** and has an alpha channel. It contains deep blue, electric blue, cyan highlights, drones, and a circular ring. Its pixels include translucent artwork; apparent dark areas must not be automatically treated as removable backgrounds.
- Test the logo on light, deep blue, and navy surfaces before choosing the circular feature's inner backing. Use a calm backing inside the existing feature if it improves contrast; do not edit the file.
- Keep at least 10–12% of the displayed logo width clear around the artwork. Show the complete image with `object-fit: contain`.
- Typical provisional display width in the lower-right feature: 145–190 px at a 1600 px desktop viewport; tune to the reference and preserve legibility. Do not squeeze it into a tiny generic icon.
- **7 October 2026 size revision:** User requested a substantially smaller Sky I logo. Hero feature reduced by approximately one third in diameter: 12.5% of the desktop stage, 18.5% on smaller desktops and 185 px on mobile. Division-section artwork is capped at 260 px desktop / 200 px mobile. Preserve complete artwork, circular proportions and the existing destination.
- **Use `sky-logo.png` as the official primary Skyriders logo**, as explicitly instructed by the user on 7 October 2026. The supplied original is **1500 × 1250 pixels**, RGBA with transparency. Production path: `public/images/brand/sky-logo.png`. Do not substitute the mockup's triangular mark, extract a competing brochure logo, imitate it with text, recolor it, crop it, stretch it, or apply filters.
- The supplied primary logo has white “SKYRIDERS / INDUSTRIAL ROPE ACCESS” lettering. Display it intact on a navy/deep-blue backing with sufficient contrast and clear space. Adapt the header logo region to the artwork's natural 6:5 aspect ratio; the provisional wide wordmark dimensions are not suitable for this asset.
- For accessibility, a linked primary logo needs an accessible name such as “Skyriders home.” A linked division logo needs “Sky I industrial drone inspection.”

### 4.2 Color tokens

The following values are proposed CSS tokens informed by the brochure's cyan and sampled blue color families in the supplied Sky I logo. They are **not certified brand-book hex values**. Preserve reference colors unless the user's blue/brand requirement calls for an adjustment.

| Token | Provisional value | Purpose |
| --- | --- | --- |
| `--color-brand` | `#0050F0` | Primary blue actions and selected details. |
| `--color-brand-deep` | `#001870` | Deep logo-compatible blue, strong blue surfaces. |
| `--color-brand-cyan` | `#00B0F0` | Secondary highlight inspired by the brochure/logo. |
| `--color-ink` | `#111827` | Headings and body text on light backgrounds. |
| `--color-navy` | `#071C35` | Dark photo overlays and dark sections. |
| `--color-paper` | `#F5F7FA` | Quiet canvas if the reference uses a light background. |
| `--color-white` | `#FFFFFF` | Cards and inverse text. |
| `--color-muted` | `#556274` | Supporting text. |
| `--color-line` | `#D9E1EA` | Fine separators and subdued borders. |

Do not use bright cyan for small text on white without testing contrast. Favor deep blue for readable links and reserve cyan for lines, decoration, or sufficiently dark surfaces. Maintain at least 4.5:1 contrast for normal text and 3:1 for large text and meaningful graphical controls.

The visual finish should be engineered, clean, and premium. Keep glows localized. Avoid excessive neon, random gradients, purple accents, glass panels everywhere, or decorative HUD graphics that overwhelm the real work.

### 4.3 Typography

First match the original reference. If its font cannot be identified, use a high-quality geometric sans such as **Manrope** for headings and a highly readable sans such as **Inter** for supporting text. Prefer self-hosted local font files or a verified build-compatible `next/font` setup.

- Heading fallback at large desktop: approximately 80–104 px, weight 650–750, line-height 0.98–1.04, slightly tight tracking.
- Supporting copy: 16–19 px, line-height 1.55–1.65; approximately 40–48 characters per line in the hero.
- Navigation: 14–15 px, medium weight, stable width; no all-caps labels unless the reference uses them.
- Eyebrow: 11–13 px, medium weight, restrained tracking.
- Service titles: 15–18 px; clear hierarchy against a quiet description.
- Use fluid `clamp()` sizing. Do not put forced non-breaking spaces in the headline to conceal responsive problems.
- Font loading must not create a large layout shift or break builds in a network-restricted environment. If using local files, verify licensing and include only needed weights.

## 5. Page structure and functional mapping

The hero is the focal point. The rest of the page must be finished enough for hero links to lead somewhere meaningful; it must not undermine the quality of the first screen.

| Section / control | Identifier or destination | Required behavior |
| --- | --- | --- |
| Main hero | `#home` | Preserves reference composition with approved changes. |
| About | `#about` | Concise company introduction and relevant industrial sectors. |
| Services | `#services` | Real service overview with headings/descriptions, not an empty anchor. |
| Sky I division | `#sky-i` | Drone inspection offering, supplied logo, credible imagery. |
| Projects / experience | `#projects`, if represented in reference navigation | Authentic, sourced project material or an honestly labeled capabilities section. |
| Safety / quality | `#safety` | Evidence-based process and technical expertise; current claims only. |
| Contact | `#contact` | Offices, working phone/email actions, a clear project enquiry route. |
| Hub | External exact URL above | Opens the existing Hub. Recommended: a new tab with `rel="noopener noreferrer"` and an accessible indication. |
| Hero “View all” | `#services` | Scrolls to the services section without routing to an invented page. |
| Sky I circular logo | `#sky-i`, unless a verified division URL is supplied | Leads to the division section; no invented external destination. |
| Brochure action, if included | Actual approved PDF file | Opens/downloads the brochure; no placeholder `href="#"`. |

Preserve the inspected reference's navigation labels and order: **Services, Industries, Our Work, About, Insights, Hub**, followed by **Get in Touch**. Hub is already present in the supplied image; wire it to the exact destination. Dropdown chevrons appear beside Services and Industries; implement them only with meaningful content. Resolve Our Work and Insights with authentic material before adding their destinations; do not invent projects or articles. See `docs/reference/hero-reference.md` for all retained labels.

Internal anchors must work without JavaScript. Account for a sticky header with `scroll-margin-top`. Apply smooth scroll only when the visitor has not requested reduced motion. Preserve visible focus and meaningful browser history behavior.

Do not reproduce, probe, or authenticate to the external Hub during website development. Its required role here is a link.

## 6. Hero architecture and precise geometry workflow

### 6.1 Design intent

The first screen must feel like a composed visual system: strong type, real technical photography, several related curved surfaces, overlapping elements, clear depth, and a service preview integrated into the hero. Maintain breathing room around the headline. The scene should suggest access capability and precision, not a stock photo banner.

Use live HTML for text and controls. Build the curves with SVG/CSS and place real photo assets inside masks. Do not generate the whole webpage as a flattened image; that would make links, responsiveness, typography, accessibility, and animation unreliable.

### 6.2 Reconstruct the reference before refining

When the original image becomes available:

1. Record its pixel dimensions, intended viewport, and whether browser chrome is included. Do not count browser chrome as part of the design.
2. Identify the major layers: base canvas, header, title, primary photo, supporting photo windows, white/blue sweeps, service panel, circular lower-right feature, labels, and controls.
3. Measure each layer's bounds and anchor points as percentages of the original width and height. Record them in a geometry table next to this document or in a dedicated data file.
4. Trace the dominant curve silhouettes as Bézier paths in a shared viewBox. Preserve the inflection points, tangent directions, crescent thickness, photo edges, and negative-space shapes.
5. Measure type size, line breaks, baseline positions, tracking, nav spacing, overlap offsets, and outer gutters.
6. Record each photograph's crop and focal point independently. Distinct supporting images should not become accidental duplicates of the main photo.
7. Implement masks and plain layout first. Compare a motion-disabled screenshot with the reference before adding polish.
8. Iterate on the silhouette and spacing until the large shapes align. Then tune typography, image crops, fine lines, shadows, and motion.

This measurement workflow takes precedence over the provisional coordinates below.

### 6.3 Provisional desktop construction baseline

Only use this baseline if the original mockup is still unavailable. It is a practical starting composition, not evidence of the original's exact layout.

- Working canvas: **1600 × 900** design units, with a full-width desktop hero.
- Desktop gutters: approximately 64 px, scaling to 40–72 px across 1280–1920 px.
- Header zone: approximately 96–112 px tall.
- Hero content may grow vertically for shorter screens or enlarged text. Never clip controls to force a screenshot-sized fit.
- On wide screens, center a composed inner stage with an approximate 1760–1840 px maximum content width while allowing intentional background bleed.

| Layer | Provisional x / y | Provisional width / height | Notes |
| --- | --- | --- | --- |
| Primary logo | 64 / 30 | 220 / 54 | Keep natural logo proportions; exact placement from reference. |
| Navigation zone | 570 / 35 | 680 / 48 | Align with logo; Hub joins this system. |
| Utility CTA | 1310 / 30 | 226 / 52 | Only if the reference contains a comparable CTA. |
| Headline block | 64 / 200 | 560 / 290 | Proposed left-side placement; override to match reference. |
| Supporting copy / actions | 68 / 510 | 450 / 130 | Avoid interference with service panel. |
| Main curved photo field | 600 / 110 | 920 / 650 | Large asymmetric silhouette, not a rounded rectangular card. |
| Supporting photo window A | 760 / 575 | 300 / 235 | Position and silhouette subject to the reference. |
| Supporting photo window B | 1110 / 470 | 220 / 175 | Optional only if present in the reference. |
| Hero services panel | 64 / 705 | 970 / 155 | Integrated lower region; allow reflow rather than truncation. |
| Blue circular division feature | 1210 / 625 | 280 / 280 | Known lower-right feature; exact circle size/overlap to be measured. |

The service panel and circle may extend across the hero's visual lower boundary if the reference does so. Ensure the next section reserves real space for that overlap. Do not position a 280 px feature over text or hide it under the following section.

### 6.4 Shape construction rules

- Use a shared SVG coordinate system for curves that meet or run parallel. Avoid mismatched individual ellipses whose seams become visible.
- Use `<clipPath>` for crisp photographic silhouettes; use `<mask>` only when actual transparency/feathering is required.
- For normalized clipping paths, use `clipPathUnits="objectBoundingBox"` and coordinates from 0 to 1. For pixel-coordinate paths, supply an appropriate `userSpaceOnUse` viewBox/container. Never mix the two coordinate systems accidentally.
- Stable, unique SVG IDs are required if more than one hero/component instance is rendered.
- Reference paths belong in code-native SVG, not in baked image assets, so they remain sharp at every viewport.
- Preserve circles as circles. Keep their hosts square with `aspect-ratio: 1`; do not allow a flex layout to squash them.
- A simple `border-radius: 50%` ellipse is insufficient for a compound crescent or wave. Trace the relevant curve with cubic Bézier segments.
- For a concave photo silhouette, use one coherent closed path; avoid a collection of circles that exposes slivers between layers.
- Preserve the reference's tangent continuity. At a smooth join, adjacent control handles must maintain the same tangent direction.
- Keep any white crescent, curved gutter, or blue rim consistent in optical thickness. An outline created by scaling an entire asymmetric path can distort its spacing; compare it visually or author a separate offset path.
- Provide a rounded, usable fallback if a mask is unsupported; the page must remain readable and functional.
- Desktop curves can change proportion on tablet/mobile, but maintain the recognizable visual identity. Do not stretch the desktop stage until the technician looks distorted.

### 6.5 Suggested layer order

| Stack | Element | Implementation constraint |
| --- | --- | --- |
| 0 | Canvas color / subtle background tone | Static base. |
| 10 | Primary photographic field | Clipped; pointer-inert except explicit controls. |
| 20 | Curved base sweeps and separators | Decorative; `aria-hidden="true"`. |
| 30 | Supporting photo windows / technician cutout | Preserve crop and believable overlap. |
| 40 | Headline, copy, live hero controls | Never covered by a decorative element. |
| 50 | Services panel and Sky I circular feature | Isolated stacking contexts; keyboard-accessible links. |
| 70 | Header / sticky header | Above hero decor; focus rings remain visible. |
| 100 | Mobile menu layer | Above all hero content; appropriate focus management. |

Use `isolation: isolate` on the hero. Decorative overlays need `pointer-events: none`. Do not fix stacking bugs by continually increasing arbitrary z-index values.

### 6.6 Lower-right Sky I feature

The supplied reference has an angular lower-right Sky I panel. The explicit brief requires a blue circular feature instead; implement that deliberate variation with the unchanged supplied logo in its inner region. It should read as a deliberate division feature, not as a sticker floating over the page. No people/solutions/safety outer ring wording is visible in this reference; do not add guessed wording.

- If people/solutions/safety text occupies an outer ring, keep it outside the logo's clear space. Reproduce exact wording from the original when it is available; do not invent the remaining words from “etc.”
- Keep the logo itself stable. If the reference includes rotational motion, rotate the decorative outer ring slowly, not the logo or readable wordmark.
- A optional ring rotation should take at least 45–60 seconds per revolution, be decorative, and stop for reduced motion and offscreen states.
- If there is insufficient room at smaller widths, keep the logo legible and move the outer text into a simple caption below. Do not remove Sky I from mobile.
- Make the entire intended feature a clear link to `#sky-i`, with focus visible outside any clip.

### 6.7 Hero “Our Services” panel

Keep the panel within the hero composition as shown in the reference. Reuse the reference's service tile count and layout if visible. **Provisional fallback:** three concise previews: Inspection & NDT, Maintenance & Repairs, and Drone Inspections, followed by View all.

- “View all” must be a real anchor to `#services`, not a button with an empty handler.
- Tiles may link to matching service detail IDs in the services section.
- Match the reference's borders, dividers, corners, overlap, and padding. Avoid turning the panel into an unrelated set of generic floating cards.
- Do not put invented metrics inside the panel.
- Preserve complete service titles at mobile widths and 200% zoom. Reflow tiles vertically or to two columns rather than hiding text.

## 7. Photography, asset generation, and South African authenticity

### 7.1 Required asset set

Asset names below are planned repository names, not assertions that these files have already been generated.

| Asset | Target specification | Purpose |
| --- | --- | --- |
| `hero-sa-urban-facade-01` | 3200 × 1800 or greater if supported; wide landscape | South African urban work at height. |
| `hero-sa-industrial-tower-02` | Matching wide landscape ratio | Industrial tower/silo/cooling-tower access. |
| `hero-sa-steel-structure-03` | Matching wide landscape ratio | Steel structure inspection/maintenance. |
| `hero-support-inspection` | High-resolution portrait or landscape crop, reference dependent | Separate supporting photo window. |
| `hero-support-team` | High-resolution crop, reference dependent | Genuine team competence and balanced representation. |
| `hero-technician-cutout`, only if reference uses one | Transparent PNG/WebP, usable subject detail | Foreground depth; do not add if absent in reference. |
| `sky-logo.png` | Supplied official 1500 × 1250 RGBA PNG; unchanged artwork | Required primary company identity. |
| `sky-i-logo.png` | Supplied original, 1254 × 1254, alpha channel | Lower-right circular division feature. |

Approximately three main hero images are enough. Do not generate dozens of interchangeable stock images. Additional supporting photos are only to preserve the reference's simultaneous multi-image composition and finish the necessary lower sections.

Maintain an asset manifest recording filename, role, source, generation prompt when relevant, dimensions, crop focal point, license/ownership notes, and whether the image is illustrative or an actual company project photograph.

Prefer suitable genuine company photography when its resolution, permission, and composition work. Generated images must be treated as illustrative; do not label generated scenes as completed Skyriders projects or name fictional clients.

### 7.2 Master photography prompt

Use the available image-generation tool to create photographic assets, then build the live interface separately. Do not ask the generator to draw the website navigation, text, logos, buttons, curves, service panel, or layout.

**Prompt foundation:**

> Create an exceptionally realistic, high-resolution professional editorial photograph for a South African industrial rope-access and work-at-height company. Wide horizontal composition, approximately 16:9, photographed as if with a modern full-frame professional camera. Authentic Gauteng or South African industrial surroundings, believable architecture, natural daylight, accurate materials, crisp PPE and rigging details, restrained premium color grading, blue and navy technician overalls. Depict competent technicians focused on an actual inspection or maintenance task, with helmets, properly fitted full-body harnesses, a clearly credible work rope and separate safety line, plausible anchors above frame, coherent rope continuity, correctly connected equipment, and realistic body mechanics. Preserve enough contextual structure to convey height and scale. Place critical faces, hands, tools, and harnesses comfortably inside the crop; do not cut them off at the source image edge. Keep a quieter area wherever the intended mask/reference requires room for live typography. No logos, no lettering, no watermarks, no interface elements. No impossible hands, extra limbs, floating carabiners, ropes passing through bodies, melted steelwork, duplicated faces, or artificial plastic textures. Natural South African human representation and professional working interaction.

Add a scene-specific prompt below. Set image-generation parameters to a supported high-resolution landscape output, then inspect the actual result rather than assuming an exact pixel size was delivered.

### 7.3 Image 1 — urban facade

> Photograph a skilled Black South African rope-access technician working on the glass-and-steel facade of a contemporary commercial building in the Johannesburg/Midrand area. A white South African colleague may appear farther along the facade as part of the same professional team. The main technician wears clean blue/navy overalls, a white or yellow safety helmet, full-body harness, and credible twin-rope rigging, facing the facade and inspecting or maintaining its surface. Show a believable highveld urban environment with roads, office blocks, trees, and distant dryland development. No river, canal, waterfront promenade, harbor, or invented waterway through the city. Bright highveld daylight or warm late-afternoon rim light, realistic glass reflections, premium documentary photography. Position the main technician to fit the measured reference photo window, with the building and ropes reinforcing its curves and vertical scale. Keep the subject's whole harness and hand-tool interaction clear.

### 7.4 Image 2 — industrial tower

> Photograph a skilled white South African rope-access technician in blue/navy industrial overalls inspecting the external concrete surface of a large silo, cooling tower, or industrial chimney at a believable inland South African industrial facility. Include a Black South African teammate where the framing naturally supports it; both appear equally competent. Real concrete texture, steel ladders or industrial pipework in the wider context, taut and mechanically plausible working and backup lines, correctly fitted helmets and harnesses, a real inspection tool in use, grounded lighting and restrained blue/grey grading. Emphasize structural scale and technical precision. No unsafe stunt posing, fictional foreign skyline, giant city waterway, or irrelevant scenery. Avoid intrusive smoke effects. Frame the technician to fit the original hero mask and preserve the task-facing orientation.

### 7.5 Image 3 — steel structure

> Photograph two South African industrial rope-access technicians, one Black and one white, carrying out an inspection or maintenance task on a substantial steel framework, plant gantry, or industrial support structure. Both wear blue/navy protective overalls, helmets, full-body harnesses, and credible independently anchored rigging. At least one technician is close enough for detailed tools, gloves, connectors, and fabric texture to be visible. Capture practical teamwork rather than people posing toward the camera. Steel beams form a strong architectural composition, with natural skylight and realistic South African industrial context. Precise geometry, believable height, sophisticated editorial clarity, no cinematic sparks unless the task actually requires welding, no logos, no readable text, no bizarre machinery or decorative waterway. Match the exposure, blue grading, and overall photographic realism of the other two hero assets.

### 7.6 Supporting photos and optional cutout

Create separate inspection and teamwork crops only as required by the reference. Distribute foreground prominence between Black and white technicians across the entire set; do not make one group consistently background observers. Use the brochure's real blue-overall photographs as wardrobe/material references where useful.

If the original hero includes a foreground transparent technician:

- Generate or extract a separate clean cutout with an actual transparent background.
- Preserve the complete body, relevant rope segments, connectors, tool, and helmet.
- Keep the technician facing the work area and physically supported by the rigging.
- Match lighting direction and scale with the background.
- Do not apply dramatic wobble or swings that suggest unsafe movement.
- Inspect edges on both light and dark surfaces for halos, jagged ropes, and missing thin gear.

For Sky I lower-page photography, use genuine or accurately referenced drone equipment. An Elios-type confined-space image belongs indoors; an outdoor quadcopter belongs in a plausible exterior inspection setting. Do not claim an invented drone is a named real model. Do not imply window-cleaning drone services are in the brochure unless separately confirmed.

### 7.7 Image review checklist

Reject and regenerate or correct images with broken rigging, implausible body support, extra limbs, malformed PPE, distorted tools, unsuitable national context, artificial faces, clipped critical details, or visible unwanted lettering. Keep equipment physically credible without presenting generated imagery as a technical safety diagram.

Export suitable optimized photographic derivatives in AVIF or WebP where supported. Keep PNG for the supplied logo or cutouts if it preserves edge quality better. Never generate text-heavy overlays into the images.

## 8. Motion and interaction specification

Motion must enhance the reference composition. The page must remain attractive and usable at its final static state.

| Element | Proposed motion | Timing / constraints |
| --- | --- | --- |
| Header | Gentle opacity and 8–12 px upward settling | 400–600 ms on first appearance; no repeated entrance on every scroll. |
| Headline | Block or line reveal with a small upward translation | 650–850 ms; 70–100 ms stagger; keep accessible text intact. |
| Curved photograph | Subtle reveal or scale settle inside a fixed mask | 900–1200 ms; mask silhouette remains stable. |
| Supporting photos | Small staggered opacity/position reveal | 600–800 ms; no distracting spin. |
| Services panel | Gentle upward settle | 500–700 ms after title; do not alter its final position. |
| Sky I feature | Fade/scale from about 0.97 to 1 | 600–900 ms; logo stays readable. |
| Buttons and links | Color, border, underline, and a restrained arrow shift | 160–220 ms; equivalent focus state. |
| Main-photo slide | Crossfade inside existing hero silhouette | 800–1100 ms, after approximately 7–9 seconds per image. |
| Optional photo depth | Very small pointer/scroll translation | Maximum roughly 6–12 px desktop; no movement of text. |
| Lower sections | One-time reveal when entering viewport | 450–650 ms; 12–24 px travel; no content hidden indefinitely. |

Use one animation approach rather than overlapping large libraries. A small client component using a compatible Motion library plus CSS transitions is suitable; CSS alone is enough for simple hover/opacity effects. Use a single coherent easing curve, such as a smooth ease-out, rather than elastic bounces.

### 8.1 Three-image hero behavior

- The main photo slot may rotate through the three main photographs. Supporting slots remain independent, preserving a multi-image hero even between transitions.
- Keep headline, navigation, masks, and service panel stable. Do not animate the entire composition to a new layout each time the photo changes.
- Provide clearly visible previous/next or three labeled pagination controls and a pause/resume control that fit the design. If the reference has no acceptable space for autoplay controls, use manual image changes instead of inaccessible autoplay.
- Pause automatic changes when the hero has keyboard focus, on hover where applicable, when the tab is hidden, and when the hero is offscreen.
- Explicit manual pause persists until the user resumes it; leaving the hero must not restart a user-paused slideshow.
- Under `prefers-reduced-motion: reduce`, disable autoplay, parallax, ring rotation, and large entrance transforms. Manual changes should be immediate or use a very short non-disorienting fade.
- Keep inactive images/control states from appearing as duplicate announcements. Do not announce every automatic slide change through an assertive live region.
- Keep alt text for meaningful photographs concise and scene-specific. Decorative copies use empty alt text.
- First-frame photography and text must render from initial HTML without waiting for an animation library.

### 8.2 Performance and reliability

Animate primarily `transform` and `opacity`. Avoid continual layout changes, large animated blur effects, or continuously morphing complex masks on mobile. Do not leave `will-change` on every element permanently. Use `requestAnimationFrame` for pointer work if needed and clean up listeners, observers, timers, and animation frames on unmount. Avoid hydration mismatch by keeping viewport and motion-preference reads out of server render decisions.

## 9. Responsive behavior

| Range | Required adaptation |
| --- | --- |
| 1440 px and above | Closest visual match to desktop reference. Preserve overlapping curves, supporting images, integrated services, and lower-right Sky I circle. |
| 1024–1439 px | Reduce gaps and headline size; tune crop focal points; retain composition while allowing a taller hero. |
| 768–1023 px | Simplify overlaps, move service previews below the primary content if needed, and adjust circle position. Navigation can collapse when its actual content no longer fits. |
| Below 768 px | Use a readable vertical flow. Keep headline, primary action, curved photo, service previews, and Sky I feature. Remove decorative clutter before removing meaningful content. |
| 320–375 px | No horizontal overflow, complete labels, visible touch controls, legible logos, and stable hero height. |

- Breakpoints are content-driven; the table is a starting range, not a rigid device list.
- Use CSS grid/flex for live content. Restrict absolute positioning to the composed desktop photo/decorative stage.
- Main content must not depend on an arbitrary fixed `100vh` height. Use sensible min-height, normal document flow, and `svh`/`dvh` only where appropriate and supported.
- Provide mobile-specific crops/focal points so the technician, harness, and task remain visible. Do not merely shrink the entire 1600 × 900 canvas.
- Keep a recognizable curved photo boundary and blue circular division motif on mobile, even when they move into the flow.
- If the reference includes a foreground cutout, adapt its positioning or use a simpler crop on mobile without blocking copy.
- Body text must remain at least approximately 16 px. Touch targets should generally be 44–48 px.
- Do not make information accessible only through hover. Support keyboard, touch, and pointer use.
- At 200% zoom, content and navigation must reflow; do not hide the headline or CTAs behind overflow clipping.

## 10. Services and lower-page content

### 10.1 Services taxonomy

Use the brochure to create a structured service dataset. Keep the public overview concise, with more details only where they help a prospect understand the offering.

| Service group | Brochure-supported examples |
| --- | --- |
| Inspection & NDT | Visual/thermal inspection; boroscope/endoscope; UT wall thickness and flaw detection; dye penetrant; magnetic particle; steel/concrete integrity and coating assessment. |
| Concrete Services | Concrete inspections, cover meter surveys, carbonation testing, core sampling, repairs, structural strengthening, corrosion inhibitors, barrier coatings, expansion joint sealing. |
| Installations & Access Systems | Steel structure erection, rigging, bolting, torque verification, temporary/permanent platforms, work platform nets, height safety systems. |
| Maintenance & Cleaning | High-pressure washing, welding, waterproofing, facade maintenance, window washing, silo cleaning, protective coatings, grit blasting, ducting/compensator work. |
| Confined Space | Consultation and rescue standby. |
| Drone Inspection — Sky I division | Indoor/confined-space and outdoor visual inspection applications, subject to verified operating and regulatory details. |

Use stable IDs such as `inspection-ndt`, `concrete-services`, `installations`, `maintenance`, `confined-space`, and `drone-inspection`. Hero tiles should link to the corresponding IDs when appropriate.

### 10.2 Lower-page visual continuity

- Use the same type system, blue accents, controlled curves, and industrial photography as the hero.
- Alternate calm sections with intentional visual emphasis. Do not repeat the exact hero mask in every block.
- About: concise company context, technical experience, industrial sectors, and Since 1999 when used.
- Services: readable cards or panels, each with a meaningful description and working enquiry route.
- Sky I: supplied logo, division description, indoor/outdoor inspection use cases, and a clear contact action.
- Safety/quality: process, planning, experienced technicians, and verified credentials where available.
- Experience/projects: use real approved examples. If insufficient material exists, use “Industries we serve” with capability imagery instead of fabricated project case studies.
- Contact: both offices, email/telephone links, and a straightforward project enquiry action.
- Footer: primary company identity, relevant anchors, Hub link, and contact details; actual policy links only.

The brochure includes client logos. Do not recreate or alter those brands, imply a fresh endorsement, or display a low-resolution collage extracted from a PDF page. Use approved suitable originals if a client strip is included; otherwise omit it.

### 10.3 User-approved About reference — 7 October 2026

Recreate `Gemini_Generated_Image_95u0ve95u0ve95u0.jpg` with the **image stack on the left and text on the right**. Mirror design coordinates only; never flip technicians, text or logos. Preserve the slanted navy backdrop, concrete window, framed facade inset, blue/grey accents, dashed construction lines, circular guide and Since 1999 badge. Retain the displayed About copy. Replace Discuss your structure with a blue **Explore** pill linking to `#services`, with sheen, arrow and hover/focus animation. Mobile uses artwork-first flow and readable text. The unchanged reference and measurement record are in `docs/reference/about-reference.jpg` and `docs/reference/about-reference.md`. Label generated sources in `assets/source/about/`, web derivatives in `public/images/about/`, and prompts/metadata in `docs/`.

### 10.3 Enquiry behavior

Use functioning phone/email links as the baseline. If a form is added, it must submit to a real configured service or server route, validate inputs server-side, and show real success/error responses. Never display “Message sent” from a mock timeout. If delivery credentials are unavailable, use a clear email/phone enquiry path and leave the form integration task unchecked.

Do not require a database, login, or dashboard for this brochure-style public page unless a later user instruction adds that scope.

## 11. Next.js implementation and file organization

### 11.1 Dependency preflight

The requested version is **Next.js 16.4.0**. On 7 October 2026, `npm view next@16.4.0` confirmed availability, Node.js **>=20.9.0**, and React/React DOM **^19.0.0** compatibility (also ^18.2.0). The local foundation pins Next.js 16.4.0 and matching React/React DOM 19.3.0, with TypeScript 5.9.3 and ESLint 9.39.5. Node 24.13.1 and npm 11.8.0 are installed. Lint runs separately from build.

At implementation time:

1. Inspect the existing `package.json`, lockfile, Node version, and package manager before changing dependencies.
2. Check `next@16.4.0` package metadata and peer dependencies through the available registry/network.
3. If it exists, pin it exactly as requested and choose supported React/React DOM versions together.
4. If it cannot be resolved, distinguish a missing version from a network/authentication problem. Report the blocker and proposed supported version; do not silently downgrade or pretend 16.4.0 is installed.
5. If a working existing version is already present, independent UI work can continue without relabeling it as the requested version. Keep the version acceptance task unresolved.
6. Use one package manager and retain one authoritative lockfile. Avoid `@latest` commands that can overshoot the requested version.

Do not scaffold over existing user files. Preserve unrelated edits. Resolve routine reversible configuration work autonomously within the requested scope.

### 11.2 Architecture

Use App Router, TypeScript, and semantic components. Keep most page content in server components. Use small client components for the hero slideshow, mobile menu, and interaction/motion only.

Recommended paths, adapted to existing repository conventions:

| Path | Role |
| --- | --- |
| `design.md` | This living specification and task checklist. |
| `src/app/layout.tsx` | Root layout, metadata defaults, font setup. |
| `src/app/page.tsx` | Server-rendered page section composition. |
| `src/app/globals.css` | Tokens, reset/base styles, global anchors, accessibility helpers. |
| `src/components/site/SiteHeader.tsx` | Primary brand and desktop navigation. |
| `src/components/site/MobileNavigation.tsx` | Interactive responsive menu. |
| `src/components/hero/Hero.tsx` | Hero content/stage composition. |
| `src/components/hero/HeroMedia.tsx` | Three-image controls and image transitions. |
| `src/components/hero/HeroCurves.tsx` | Code-native reference masks/sweeps. |
| `src/components/hero/HeroServices.tsx` | Integrated Our Services panel and anchors. |
| `src/components/hero/SkyIBadge.tsx` | Supplied logo in lower-right circular feature. |
| `src/components/hero/hero.module.css` | Hero geometry, masks, crops, and responsive rules. |
| `src/components/sections/` | About, services, Sky I, safety, and contact. |
| `src/components/site/SiteFooter.tsx` | Footer and contact/navigation links. |
| `src/lib/site-content.ts` | Typed service, office, navigation, and image data. |
| `src/lib/hero-geometry.ts` | Measured reference coordinates/focal points, if useful. |
| `public/images/hero/` | Optimized real/generated hero assets. |
| `public/images/brand/` | Official primary logo and unchanged `sky-i-logo.png`. |
| `public/documents/` | Approved public brochure, if download is included. |
| `docs/reference/` | Original hero/reference material where appropriate and approved for repository storage. |
| `docs/asset-manifest.md` | Image provenance, prompts, dimensions, and crop notes. |
| `docs/implementation-notes.md` | Verification evidence and outstanding blockers. |
| `.env.example` | Documented safe placeholders/defaults only. |

Keep JSX/TypeScript, stylesheet rules, and reusable data separate. Use CSS Modules or the existing project's consistent styling approach. Do not put giant style strings, generated image data, or hardcoded asset base64 inside component code. In Next.js, rely on framework module imports rather than manually adding a script tag at the end of rendered HTML.

Add concise comments around important geometry sections, configurable animation parameters, reduced-motion behavior, and reference-specific offsets. Explain why unusual code exists; avoid comments that merely repeat the next line.

### 11.3 Image and asset implementation

- Use `next/image` or the exact version's recommended supported equivalent for photographic assets where appropriate.
- Set dimensions/aspect ratios and accurate `sizes`. Avoid layout shift.
- Use the installed Next.js version's appropriate preload/LCP mechanism for the first visible hero image only. Do not preload all three large slides and every supporting photo.
- Lazy-load lower-page imagery and defer nonessential slides. Preload/decode the next slide when sensible, not the entire original-resolution set.
- Crop with `object-fit: cover` and per-image focal points. Logos use `contain`.
- Prefer local assets for reliable builds. If remote imagery is necessary, configure narrow allowed host/pattern entries instead of allowing every domain.
- Target roughly 250–500 KB for a delivered desktop hero photo where quality permits; supporting windows can be smaller. These are budgets, not reasons to accept visibly damaged imagery.
- Keep source originals only where needed and avoid needlessly committing huge generated intermediates.

## 12. Environment variables and app operation

The public page should render without external secrets. Do not introduce environment variables for values that are simply static site content. Codex is responsible for configuration, example files, validation, and startup/build verification; actual private credentials must come from an authorized source.

| Variable / value | Need | Handling |
| --- | --- | --- |
| Canonical site URL | Recommended for canonical metadata/sitemap | A validated deployment value such as `SITE_URL`. Use https://ropeaccess.co.za only when this is confirmed as the deployment target; it is the existing company domain, not proof of where this new build will launch. |
| Hub destination | Required fixed link | Store exact URL in typed site config; an environment variable is unnecessary. |
| `PORT` | Host-dependent | Let Next.js/hosting runtime provide it. Verify against actual host startup instructions. |
| `NODE_ENV` | Runtime-controlled | Standard development/production modes; do not repurpose it. |
| Email provider key | Only if a real enquiry form is implemented | Server-only secret. Never prefix with `NEXT_PUBLIC_`. |
| Contact recipient | Only for form delivery | Validated server-side config. Public email links can use the brochure address directly. |
| Analytics identifier | Optional only if requested/configured | Document provider, data behavior, and safe public ID; do not add tracking by default. |

- Use `.env.local` or the host's authorized secret store for local/private values and exclude it from git.
- Commit `.env.example` with names, comments, and safe placeholders only when env variables actually exist.
- Validate required values early with descriptive errors; optional integrations must not crash the public homepage.
- No secrets in client bundles, logs, screenshots, asset filenames, markdown notes, git history, or public URLs.
- Do not invent a Supabase project, API token, analytics account, Hub credential, or email password.
- Keep an operational README with install, dev, build, start, lint, typecheck, and relevant configuration instructions.
- After a successful build, start the production server and confirm the actual homepage renders with local assets and required navigation.
- Verify hosting compatibility before adding custom servers, standalone output, or static-export settings. Do not assume cPanel, Vercel, Netlify, or another platform is the target.

## 13. Accessibility, SEO, and quality requirements

### 13.1 Accessibility

- One meaningful `<h1>`: Access Beyond Limits; sequential section headings.
- Semantic header, nav, main, sections, and footer.
- Skip-to-content link and visible keyboard focus.
- Accessible labels for icon-only controls; no decorative icons announced as content.
- Meaningful alt text for informative photography; empty alt for purely decorative duplicates.
- No keyboard traps. A modal mobile menu must manage focus appropriately, close on Escape, and return focus to its trigger. A simple disclosure menu may use a simpler accessible pattern.
- Slideshow controls expose selected state and accessible names; pause behavior follows section 8.
- Contrast checked over every rotating hero image, not just the first.
- Content and links remain usable when JavaScript fails or animations are disabled.
- Respect reduced motion and do not flash or create large continuous background movement.

### 13.2 SEO and content integrity

- Use accurate title and description for Skyriders Access Specialists and its South African industrial services.
- Canonical URL and social preview assets must use the verified deployment configuration.
- Use Open Graph metadata with a clean preview image; do not expose private repository URLs or staging addresses as the public brand domain.
- Add Organization/LocalBusiness structured data only for verified company/contact information; no fabricated ratings or reviews.
- Sitemap/robots behavior must match actual deployment status; keep nonpublic staging out of public indexing where configured.
- No broken internal links, invented policies, placeholder projects, lorem ipsum, or misleading generated project claims.

### 13.3 Performance targets

Aim for good Core Web Vitals on representative devices: LCP at or below roughly 2.5 seconds, CLS at or below 0.1, and INP at or below roughly 200 ms. These are targets; report actual available measurements and distinguish local lab tests from real-user field data.

Avoid large client bundles for a brochure site. Keep unnecessary animation libraries, autoplay video, WebGL, and heavy scroll frameworks out unless the reference and user requirements justify them. Do not sacrifice layout fidelity for speculative optimization before measuring the real bottleneck.

## 14. Verification and visual acceptance

### 14.1 Functional checks

1. Homepage starts in development and production modes.
2. Hub href is exactly `https://skyadmin.ropeaccess.co.za/dashboard` on desktop and mobile.
3. Hero View all reaches `#services`, with its heading visible below the sticky header.
4. Primary/secondary CTAs and service links reach meaningful destinations.
5. Search and story-video controls are absent from the DOM, visual UI, and focus order.
6. The supplied Sky I logo appears intact in the lower-right desktop feature and remains legible on mobile.
7. Slideshow manual controls, pause/resume, visibility pause, and reduced-motion behavior work.
8. Mobile menu supports keyboard and touch use.
9. Telephone/email actions use real data. A form, if present, sends through a real configured backend or clearly reports integration failure.
10. No missing image/font requests, hydration errors, broken SVG IDs, or unexpected client/server console errors.

### 14.2 Visual QA matrix

Capture representative screenshots after fonts/images have loaded, with motion frozen to a stable state:

| Viewport | Primary checks |
| --- | --- |
| Original reference dimensions | Required overlay comparison once reference exists. |
| 1920 × 1080 | Wide composition, capped content scale, image sharpness. |
| 1600 × 900 | Provisional baseline; headline/services/circle relationships. |
| 1440 × 900 | Standard desktop fidelity and nav spacing. |
| 1280 × 720 | Short-screen behavior; no clipped CTAs or service panel. |
| 1024 × 768 | Smaller desktop/tablet composition. |
| 768 × 1024 | Portrait tablet reflow. |
| 390 × 844 | Mobile content order, crop, controls, logos. |
| 320 × 568 | Narrow screen legibility and absence of overflow. |
| 200% desktop zoom | Text reflow, focus visibility, navigable controls. |

Inspect each of the three hero images in its final mask on desktop and mobile. A good full source image can still have an unusable crop.

At the original reference size, overlay the reference and rendered screenshot at about 50% opacity or use a difference comparison. Check major curve landmarks, photo silhouettes, circle center/radius, service panel position, title baseline, nav placement, and gutters. Proposed tolerance: key non-photographic geometry within approximately 4–8 px at a 1600 px reference width, while explicitly accounting for the approved removed/added controls. Use visual judgment for photographic detail because new generated photos will differ.

Do not use a generic similarity score as the only acceptance criterion. A headline or circle in the wrong place can matter more than many small matching background pixels.

### 14.3 Code checks

- Run the repository's lint command separately; do not assume `next build` runs ESLint.
- Run TypeScript checking and a production build.
- Run existing applicable tests and focused interaction checks where useful. Avoid writing tests that simply mirror decorative CSS values.
- A focused browser smoke check for Hub/View all/menu/slideshow is more valuable than snapshots of every CSS declaration.
- Report what ran and what could not run. Do not mark a check complete based on an intended command alone.

## 15. Git and delivery workflow

- Verify the checkout/remotes correspond to **https://github.com/tech-build26/Sky-Web-Design-2-** before repository operations.
- Review `git status` before editing. Preserve the user's unrelated changes.
- Work locally and keep the result reviewable. Do not make commits, push branches, merge PRs, or publish the site unless the user requests that action.
- When the user requests a commit, review the final diff, update task states honestly, exclude secrets/temp files, run relevant checks, and create a clear commit reflecting the final work.
- Push only in the authorized scope. Never force-push or overwrite unrelated work without explicit authorization.
- Final implementation handoff should state the concrete result, checks run, outstanding limitations, and where the preview/repository changes can be reviewed.
- Website hosting and deployment are a separate action from writing this brief or building locally. Do not infer a deployment provider or publish automatically.

## 16. Living implementation checklist

**Checklist rule:** `[x]` means completed and verified with evidence. `[ ]` means pending, incomplete, blocked, or unverified. Keep unresolved dependencies visible in notes. Do not mark an entire phase complete when only one task passed. Add concise dated evidence to `docs/implementation-notes.md` during implementation.

### A. Specification and inputs

- [x] Capture the requested headline, exclusions, Hub destination, Sky I placement, diversity requirements, image count, framework target, and git constraint in this document.
- [x] Read the supplied company brochure and identify supported service groups and office contacts.
- [x] Inspect the supplied Sky I logo, its dimensions, transparency, and dominant blue color families.
- [x] Distinguish verified source facts from proposed copy/colors/geometry and unresolved current claims.
- [x] Create a detailed implementation specification with tasks, acceptance criteria, and three main image prompts.
- [x] Locate or obtain the original hero mockup and preserve its usable reference dimensions. Evidence: unchanged local PNG, 1672 × 941; see `docs/reference/hero-reference.md`.
- [x] Inspect the original hero visually; record retained copy, nav labels, shape paths, photo count, crops, and geometry. Evidence: visual review and measured reconstruction notes in `docs/reference/hero-reference.md`; final render comparison remains phase G.
- [x] Obtain or extract a production-quality official primary Skyriders logo. Evidence: user-approved `sky-logo.png`, 1500 × 1250 RGBA; no extraction needed.
- [ ] Confirm current contact details and any desired certification/safety/regulatory claims before prominent publication. Indexed official contacts corroborated; live page timed out and certification index dates do not prove current validity. Unsupported badges/metrics excluded; see `docs/implementation-notes.md`.

### B. Repository and runtime

- [x] Inspect `AGENTS.md`, repository structure, git status, and remotes. Evidence: no initial applicable `AGENTS.md`; Next.js generated one at dev startup, read and retained. Original folder contained four inputs and no `.git`/app. Local Git initialized after confirming remote was empty.
- [x] Confirm the requested repository checkout. Evidence: authenticated GitHub connector confirms private `tech-build26/Sky-Web-Design-2-`, ID 1408394001, size 0, default `main`, no branches; local `main` initialized with exact `origin`. No remote history exists to clone; CLI authentication still needs configuration for future fetch/push.
- [x] Verify registry availability of `next@16.4.0` and compatible React/React DOM/Node versions. Evidence: exact registry metadata and local versions in `docs/implementation-notes.md`.
- [x] Install or configure dependencies without overwriting existing work or silently changing the framework target. Evidence: successful npm install; Next.js pinned to 16.4.0, original inputs preserved.
- [x] Use a single lockfile/package manager and working dev/build/start/lint/typecheck commands. Evidence: `package-lock.json` only; lint, typecheck, production build and both server startups passed.
- [x] Configure only necessary environment variables, safe examples, and ignore rules. Evidence: static foundation requires no env values/credentials; `.gitignore` excludes dependencies, build artifacts, secrets and logs; README documents configuration.
- [x] Confirm the initial app starts without missing required configuration. Evidence: dev at port 3000, production at port 3001; browser verified loaded logo/headline/Hub and no captured console errors. Full hero remains phases C–G.

### C. Brand and imagery

- [x] Copy the official Skyriders logo and supplied unchanged Sky I logo into suitable project asset paths. Evidence: both public copies match original SHA-256 hashes; see `docs/asset-manifest.md`.
- [x] Define shared color, spacing, type, motion, and geometry tokens. Evidence: `src/app/globals.css`, local Archivo/Inter fonts with OFL licenses, and `src/lib/hero-geometry.ts`.
- [x] Generate/select and visually inspect the South African urban-facade photograph. Evidence: generated native 1672 × 941 source, optimized WebP, desktop/mobile crop review.
- [x] Generate/select and visually inspect the South African industrial-tower photograph. Evidence: generated source, optimized WebP, loaded desktop/mobile selection checks.
- [x] Generate/select and visually inspect the South African steel-structure photograph. Evidence: generated source, optimized WebP, loaded desktop/mobile selection checks.
- [x] Verify balanced Black/white representation, blue overalls, believable PPE, credible rigging, and local context across the set. Evidence: visual plausibility review in `docs/asset-manifest.md`; illustration only, not safety certification or actual project evidence.
- [x] Create/select separate supporting photographs required by the reference. Evidence: inspection, team, outdoor drone and infrastructure assets serving both right windows and all three service tiles.
- [x] Create a transparent foreground technician asset only if the reference requires one. Verified not applicable: the reference contains no established separate cutout; none added.
- [x] Reject defective anatomy/equipment/city scenery and produce usable replacements where needed. Evidence: supporting inspection's coastal background rejected and corrected to inland industrial/highveld context; accepted set visually reviewed.
- [x] Optimize photographic assets, check alpha edges, and document provenance and crop focal points. Evidence: seven WebP files approximately 1.3 MiB total; unchanged PNG hashes, three-backing alpha review, prompts and metadata/crops in `docs/asset-manifest.md`.

### D. Hero and navigation

- [x] Implement the reference's live semantic header and navigation, preserving retained labels/order. Evidence: Services, Industries, Our Work, About, Insights, Hub, Get in Touch; working native disclosures and meaningful destinations.
- [x] Add the exact Hub link on desktop and mobile. Evidence: browser DOM confirms exact href on both; new-tab indication and safe rel attributes; external Hub not probed.
- [x] Implement the headline **Access Beyond Limits** with reference-matched typography/line breaks. Evidence: three uppercase lines, blue Beyond, tuned extended Archivo word widths; actual source font remains unknown, so no exact typeface claim.
- [x] Implement measured SVG/CSS curves, photo masks, negative spaces, and intentional overlap. Evidence: normalized objectBoundingBox clips, shared 1672 × 941 SVG stage, stable unique IDs and reference-measured positions.
- [x] Implement all supporting photo windows/cutout layers present in the reference. Evidence: two slanted supporting windows plus three photographic service tiles; no separate cutout required.
- [x] Remove search and Watch our story controls completely. Evidence: absent from app source and rendered DOM/focusable controls.
- [x] Implement the integrated Our Services panel. Evidence: sloped live panel, three complete linked previews with independent photographs and reference labels.
- [x] Connect View all to the real `#services` section. Evidence: click updates hash and reaches the real service overview; mobile heading measured at y=124 after smooth scroll settled.
- [x] Integrate the supplied Sky I logo in the lower-right blue circular feature without changing its artwork. Evidence: unchanged PNG, navy/blue outer circle, pale inner CSS backing for legibility, full artwork and visible focus; mobile also retains the feature.
- [x] Preserve any known outer-ring wording and resolve unknown wording from the reference. Verified no word ring appears in the available reference; no invented ring copy added; retained innovation/precision caption used on desktop.
- [x] Verify the hero's static geometry against the original at matching viewport dimensions. Evidence: 1672 × 941 browser screenshot, scrollbar-adjusted 50% overlay, measured panel/window anchors in `docs/qa/geometry.json`; comparison findings in `docs/implementation-notes.md`. Supplied-logo/circle and unsupported-metrics variations are documented; this is not a pixel-perfect photo/font claim.

### E. Motion and responsive behavior

- [x] Implement restrained, coordinated entrance animations. CSS hero entrances and once-only lower-content arrivals; content stays visible without JS.
- [x] Implement three distinct main hero images with accessible manual controls. Active alt, pressed state and loaded crops checked on desktop/mobile; manual selection pauses autoplay.
- [x] Add autoplay only with pause/resume and required pause conditions. Eight-second interval, 950ms crossfade, visible Pause/Play; automatic advance and explicit resume observed in production.
- [x] Respect explicit pause, offscreen/document-hidden, hover/focus and reduced motion. Persistent pause state and observer/event/media subscriptions implemented; native hidden-tab/reduced-motion emulation is a documented runtime QA limit.
- [x] Implement button/link hover and focus feedback. Explore sheen/arrow/lift, service-card/link feedback, visible focus, focusable anchors and a heading-targeted skip link.
- [x] Evaluate optional parallax/ring effects. Continual depth/ring motion deliberately omitted to keep logos and fine geometry stable; coordinated arrivals, crossfades and action feedback provide movement.
- [x] Implement desktop, tablet, mobile and narrow-mobile adaptations. Nine widths from 320 to 1920; no horizontal overflow and all About CTAs fit.
- [x] Verify short viewports and 200% equivalent reflow. 1280 × 720, 320 × 568 and a 720 × 450 CSS viewport equivalent to 1440 × 900 at 200%; native browser-chrome zoom was not controlled independently. No stretched logos or covered controls observed.

### F. Page completion

- [x] Implement the About section from the user's new reference. Mirrored photo-left/text-right geometry, two generated portraits, layered shapes/lines, Since 1999 and animated Explore; desktop/mobile reviewed.
- [x] Implement the services section with supported groups and meaningful hero destinations. Six service groups and stable detail IDs; all anchor targets exist.
- [x] Implement the Sky I division section with accurate scope and supplied artwork. Indoor/outdoor inspection scope and working enquiry anchor; no unverified regulatory linkage claimed.
- [x] Implement evidence-based safety/quality content. Site understanding, planning/rescue requirements and assessment methods; unsupported credentials and safety-record promises excluded.
- [x] Implement authentic experience content or a clearly labeled industries/capabilities section. Work is explicitly a capability overview; photographs labelled illustrative, with no invented projects/clients.
- [x] Implement both office contacts and working phone/email actions. Correct brochure/indexed contact data and tel/mailto hrefs; live contact confirmation/device dialing remain phase A/G limitations.
- [x] Implement actual enquiry submission if a form is included; otherwise provide a clear working email/phone route. No form included; clear email and telephone routes provided.
- [x] Complete footer and deployment-aware metadata. Brand/navigation/contact footer, icon/social image, robots/sitemap and validated optional SITE_URL. Canonical/indexing withheld until a verified production origin is supplied; no provider/domain invented.

### G. Verification and handoff

- [x] Pass lint, TypeScript and production build. Re-run for the completed page; see final QA record.
- [x] Start production and confirm homepage/assets load. Browser and HTTP verifier check delivered photographs, referenced scripts/fonts/styles and metadata endpoints.
- [x] Complete available functional checks in section 14.1. Hub, View all, Explore, anchors, menus, slideshow and phone/email hrefs checked. Device dialling, Hub authentication and OS preference emulation are outside local verification.
- [x] Complete viewport/photo screenshot QA. Nine layout viewports, three desktop/mobile crops and About reference/tablet/mobile evidence; 200% equivalent reflow checked.
- [x] Complete reference visual comparison. Hero overlay reviewed; About silhouettes, inset, accents/guides and text footprint compared with approved reversal. Source font and new photos are not pixel-identical claims.
- [x] Verify available keyboard, focus, contrast, slideshow and mobile navigation. Enter/Escape, pressed/focus state and normal-text contrast checked; reduced-motion implementation reviewed. Native OS motion/hidden-tab event tests remain external runtime checks.
- [x] Measure local production response/assets and document limits. Repeat HTTP measurements and resource sizes; no fabricated Lighthouse/Core Web Vitals or mobile-network score.
- [x] Review source, assets and Git status. Original inputs/logo hashes retained; no secrets, temporary review pages, commits or unrelated writes added.
- [x] Record evidence and unresolved issues. See docs/final-qa.md, manifest, prompts, geometry and HTTP records.
- [x] Deliver a reviewable local implementation. README/design updated and dev preview retained.
- [ ] **Only after an explicit user request:** commit the verified changes to the specified repository.
- [ ] **Only if requested/authorized:** push or publish the finished site.

## 17. Copy-ready implementation instruction for Codex

> Build the Skyriders Access Specialists website governed by this `design.md`. Inspect the existing repository and `SkyRiders_ Access Beyond Limits.png` first; use the measurement record in `docs/reference/hero-reference.md`. Reproduce the reference's observed silhouettes, negative space, photographic layers, typography hierarchy, and embedded Our Services panel with live HTML, code-native SVG/CSS masks, and separate photographic assets. Use **`sky-logo.png`** intact as the primary Skyriders logo, with a dark backing for its white lettering. Keep **Access Beyond Limits** exactly. Remove search and Watch our story/video controls. Add **Hub** linking exactly to **https://skyadmin.ropeaccess.co.za/dashboard**. Hero **View all** must link to the actual `#services` section. Integrate the unchanged supplied **Sky I** logo into the explicitly required lower-right blue circle (an approved variation from the available reference's angular Sky I panel); do not invent ring words. Use three main high-quality South African hero photographs with blue/navy overalls, balanced Black/white technician representation, authentic local settings, and credible PPE/rigging. Generate photographs as assets rather than generating a flattened website image. Add restrained entrance effects, accessible photo transitions, hover/focus feedback, and reduced-motion support. Complete responsive layouts and meaningful lower-page sections using the brochure's supported services and contacts. Target **Next.js 16.4.0**, verify its availability and peer/runtime requirements, and handle necessary configuration without inventing secrets. Keep this document's checklist accurate, marking tasks `[x]` only after verified completion. Preserve unrelated repository work. **Do not commit, push, or publish until the user requests it.**

## 18. Sources and verification notes

- User's supplied requirements and earlier hero conversation: authoritative for headline, retained design, removal requests, Hub URL, Sky I integration, diversity, image count, stack target, repository, and commit timing.
- Supplied **Skyriders Access Specialists Pty Ltd - Brochure - 2026.pdf**: read locally and visually reviewed; authoritative source for the brochure's company descriptions, service categories, and recorded contacts. Time-sensitive claims remain subject to current confirmation.
- Supplied **sky-i-logo.png**: visually inspected and sampled locally; unchanged original artwork is the required division asset.
- Supplied **sky-logo.png**: user-designated official primary logo on 7 October 2026; visually inspected, 1500 × 1250 RGBA; unchanged artwork is mandatory.
- Supplied **SkyRiders_ Access Beyond Limits.png**: inspected on 7 October 2026, 1672 × 941; see `docs/reference/hero-reference.md` for geometry and retained content.
- [Next.js App Router installation documentation](https://nextjs.org/docs/app/getting-started/installation): reviewed for Node baseline and separate lint/build behavior. Verify the exact requested release during dependency preflight.
- [Next.js deployment documentation](https://nextjs.org/docs/app/getting-started/deploying): reviewed for build/start and deployment compatibility principles. No hosting provider has been chosen by this document.

**Final local delivery:** Remaining implementation items and available local QA are complete. Unsupported current certificate/regulatory/safety-record claims remain omitted. Live official-page fetches time out, but indexed official contacts corroborate displayed details. Native OS motion/hidden-tab emulation, true browser-chrome zoom and real-device/throttled-network measurements are not claimed. SITE_URL/hosting await a deployment request; Git CLI access is needed before a future push. No commit, push or publication performed.
