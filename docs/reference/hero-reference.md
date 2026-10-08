# Hero reference measurement record

Inspected 7 October 2026. Source: unchanged `SkyRiders_ Access Beyond Limits.png`, 1672 × 941 RGB PNG; no browser chrome. Coordinates below use source pixels. Bounds are approximate visual measurements (typically within 5–10 pixels), not subpixel tracing or completed render verification. Divide x by 1672 and y by 941 for normalized anchors.

## Retained live content

- Navigation, in order: Services (chevron), Industries (chevron), Our Work, About, Insights, Hub. Utility CTA: Get in Touch → `#contact`. Only implement dropdowns with actual meaningful content.
- Eyebrow: PEOPLE / ACCESS / HIGHER STANDARDS.
- H1: ACCESS / BEYOND / LIMITS, three lines. ACCESS and LIMITS are near-black; BEYOND is bright blue. Wide, heavy extended sans; exact font cannot be confirmed from pixels. Avoid naming a guessed font as verified.
- Supporting text: “Rope access, inspections and maintenance for the world’s most demanding structures.”
- Primary CTA: Our Services → `#services`.
- Small adjacent caption: SPECIALIST ACCESS SOLUTIONS FOR SOUTH AFRICA’S TOUGHEST ENVIRONMENTS.
- Right rail: DIFFICULT PLACES DEMAND A HIGHER STANDARD; 01 / 03 and three dots.
- Integrated panel: OUR SERVICES and VIEW ALL; tiles Industrial Access, Inspection & NDT, Facade Maintenance. Map Industrial Access to installations/access systems; other tiles to supported inspection and maintenance sections.
- Industry strip: Buildings & Facades; Infrastructure & Civil; Energy & Renewables; Industrial & Process; Mining & Petrochemical. These are reference labels; reconcile service/sector claims with the brochure before publication.
- Lower-right caption: INNOVATION / PRECISION / ACCESS / A HIGHER / TOMORROW.
- Search and story-video controls are absent in this supplied reference.

## Measured bounds

| Layer | x, y | width, height | Notes |
| --- | --- | --- | --- |
| Header band | 33, 0 | 1614, 94 | Fine horizontal divider at y=93; outer guides at x=33 and x=1647. |
| Mockup header mark | 56, 18 | 326, 53 | Replace with user-approved full `sky-logo.png`; adapt region to its 6:5 proportions and white lettering. |
| Navigation | 438, 43 | 520, 15 | Labels above, with Services/Industries chevrons. |
| Get in Touch | 1460, 25 | 177, 47 | Blue pill, arrow at right. |
| Eyebrow | 64, 128 | 440, 11 | Rule from approximately x=396 to x=504. |
| Headline | 61, 165 | 530, 224 | Baselines about y=232, 309, 386; approximately 88px heavy extended letterforms. |
| Supporting copy | 64, 416 | 520, 48 | Two lines, about 23px; dark on light. |
| Main CTA | 64, 492 | 211, 58 | Rounded blue pill. |
| Caption beside headline | 566, 370 | 192, 57 | Narrow tracked uppercase, no overlap with title. |
| Main photo boundary | 692, 0 | 980, 941 | Diagonal start at x≈936,y=0 to x≈692,y=584; white bottom wedge reaches x≈946,y=941. |
| Supporting window 1 | 1325, 245 | 235, 119 | Tower technician; rounded trapezoid, upper-left shifted left. |
| Supporting window 2 | 1389, 371 | 254, 122 | Separate drone/skyline image; same slanted silhouette. |
| Service panel | 30, 584 | 854, 232 | Sloped ends, rounded corners, light outline. |
| Tile 1 | 64, 625 | 251, 168 | Photo top ≈104px; title/arrow in lower pale band. |
| Tile 2 | 330, 625 | 250, 168 | Same height; independent infrastructure photo. |
| Tile 3 | 595, 625 | 249, 168 | Same height; facade technician photo. |
| Industry strip | 64, 846 | 819, 39 | Five icons/labels alongside TRUSTED ACROSS KEY INDUSTRIES. |
| Unverified metrics panel | 1346, 521 | 296, 183 | Do not publish the displayed numbers without actual evidence. |
| Sky I panel in image | 947, 718 | 725, 223 | Dark angular mountain panel with electric-blue rim and logo; circle requirement overrides this shape. |

## Silhouette paths and layering

These paths describe observed large edges in source-pixel coordinates for implementation planning. Tune corners and joins during phase D; no final pixel match has been claimed.

- Primary photo field silhouette: `M 936 0 L 1672 0 L 1672 941 L 946 941 L 874 584 L 692 584 Z`. The city/main technician photograph extends behind right supporting cards and the lower-right overlays; the white sloping edge is the dominant negative-space shape.
- Services envelope: `M 51 584 H 857 Q 871 584 875 601 L 895 786 Q 897 807 875 816 H 45 Q 30 816 30 800 V 734 L 16 624 L 34 593 Q 40 584 51 584 Z`. Approximate stepped/sloped left edge must be traced against the image before final use.
- Tower window: `M 1342 245 H 1510 Q 1519 245 1523 255 L 1559 351 Q 1564 364 1551 364 H 1360 Q 1350 364 1346 350 L 1325 260 Q 1321 245 1342 245 Z`.
- Drone window: `M 1406 371 H 1595 Q 1605 371 1609 382 L 1642 481 Q 1646 493 1632 493 H 1429 Q 1419 493 1415 480 L 1389 387 Q 1385 371 1406 371 Z`.
- Observed Sky I panel upper edge: `(947,941) → (1041,765)`, round into `(1060,753)`, horizontal to `(1271,753)`, then chamfer/round into `(1302,718)`, then slope toward `(1672,772)`. Use the requested circle for the division presentation, keeping its lower-right role and logo clear space.
- Headline ornament: thin blue curve approximately `M 546 362 C 592 353 626 319 632 266 L 632 234`, with a 12px-radius circle near `(632,254)`. Decorative only.
- Layer order: main photo → white angled canvas/seams → supporting windows → live title/copy → services/industry strip → right overlays → header. Keep logo lettering and focus outlines outside clips.

## Photo count and crop record

The screenshot contains **one main photograph and five supporting photo placements**: two right windows and three service tiles. The facade tile resembles the main scene; unique source identity cannot be proved from the flattened reference. Main pagination 01/03 implies three slides, but only slide one is visible. Generate/select three main images per the brief, with independent supporting assets where required.

- Main: Johannesburg-like skyline with tower; near technician around `(1205,278)` and colleague around `(1220,554)`, ropes vertical on right. Preserve the working subject, harness and tool contact. Default main focal point approximately 67% x / 37% y in the visible photo region; establish precise crops when separate photo assets exist. No city river is visible.
- Right window 1 / tile 1: rope-access technician beside a concrete industrial tower; preserve ropes and hands near the central/right task area.
- Right window 2: outdoor quadcopter over city; central upper drone focal point. Do not use this as evidence of a specific drone model.
- Tile 2: elevated concrete infrastructure; retain deck/column context.
- Tile 3: facade technician/glass building; preserve technician left of center and vertical lines.

The foreground worker is part of the main photo; this image does not establish a separate transparent technician cutout. Do not add one by assumption.

## Explicit deviations and unresolved facts

Use `sky-logo.png`, not the screenshot's triangular mark. Use the required circular Sky I feature, without guessed people/solutions/safety ring text (none appears here). Do not copy 0.0 LTIs, 100% safety focused or 250+ projects: no evidence supplied for those metrics. The exact typeface, unseen slides, source-photo filenames and actual component paths cannot be recovered from the screenshot. Final fidelity, mask refinements and responsive QA remain phases D–G.
