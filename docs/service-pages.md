# Service pages — 11 October 2026

The six existing navigation services are grouped into two pages with native fragment destinations:

| Page | Services |
| --- | --- |
| `/services/inspection-concrete-access` | `#inspection-ndt`, `#concrete-services`, `#installations` |
| `/services/maintenance-confined-space-drone` | `#maintenance`, `#confined-space`, `#drone-inspection` |

The header, mobile navigation, home service cards, home hero service tiles and footer link to the new destinations. The service index on each page links to all six sections. Each section's enquiry link opens the contact form with its service choice preselected. Direct fragment navigation uses an immediate landing position; scroll reveal, ambient details and the left-hand rope technician remain active, with reduced-motion support.

## Source review

- Local company profile: `Skyriders Access Specialists Pty Ltd - Brochure - 2026.pdf`, especially pages 3–8 for the six service families. The brochure's PDF text layer omits parts of the concrete and installations pages; the live official descriptions below supplied the relevant detail.
- [Official Skyriders concrete services](https://ropeaccess.co.za/services/concrete-services/) lists visual and structural surveys, cover meter and carbonation tests, core drilling, repairs, inhibitors and barrier coatings.
- [Official Skyriders installations](https://ropeaccess.co.za/services/installations/) lists steel erection, bolting, torque verification, platforms, nets, rigging and height safety systems.
- [Official Skyriders confined spaces](https://ropeaccess.co.za/services/confined-spaces/) lists rescue, standby, training and consulting. The 2026 brochure specifically lists rescue standby and consultation, so the new page stays with those two core offerings and site-specific planning.
- [Official Skyriders drone inspections](https://ropeaccess.co.za/services/drone-inspection/) lists indoor boiler/duct inspection and outdoor asset surveys; the brochure describes collision-tolerant indoor drones.
- [Official Skyriders site](https://ropeaccess.co.za/) documents industrial vacuum cleaning, painting, NDT, height safety and deluge system maintenance project examples. The brochure lists high-pressure washing, UHP, grit blasting, facade work, coatings and related maintenance tasks.

Page imagery is illustrative, not a record of a Skyriders job or an assertion about a pictured procedure's technical compliance. Copy avoids claims about certification validity and current licenses; these must be verified before publication if they are added.

## Imagery

Six service-specific photographs were generated with the built-in `image_gen` tool after reviewing the brochure and official service descriptions. Native PNGs are saved in `assets/source/services/`; Sharp 0.35.5 encoded WebP derivatives in `public/images/services/` without cropping, retouching or upscaling. All six were visually reviewed before integration. `next/image` supplies responsive variants.

| Subject / files (PNG and WebP share the stem) | Native dimensions | WebP size | Visual focus |
| --- | ---: | ---: | --- |
| `inspection-ndt` | 1672 × 941 | 198,434 bytes | Ultrasonic probe and gauge testing a steel pipe spool |
| `concrete-services` | 1672 × 941 | 262,016 bytes | Concrete core specimens and cover meter survey |
| `industrial-access` | 1672 × 941 | 272,046 bytes | Bolted inspection platform, anchor points and torque tool |
| `maintenance-cleaning` | 1774 × 887 | 299,406 bytes | High-pressure cleaning on an industrial tank surface |
| `confined-space` | 1774 × 887 | 220,206 bytes | Rescue tripod, retrieval system and standby specialist |
| `drone-inspection` | 1672 × 941 | 224,842 bytes | Caged drone inside an industrial boiler or duct |

### Final generation prompts

1. **Inspection & NDT:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for Inspection & NDT service. Editorial close-up of an ultrasonic thickness testing session on a heavy steel pipe spool in an industrial inspection bay: gloved South African inspector's hands press a small ultrasonic transducer to clean steel while a believable handheld gauge and measured pipe surface are sharply visible; clipboard with unreadable blank grid in soft background. The image must communicate non-destructive testing itself, not generic rope access. Wide landscape crop, premium technical photography, natural cool industrial daylight, fine material detail, realistic instruments. No dangling workers, no ropes as main subject, no legible text, numbers, branding, graphics, logos or watermark.”
2. **Concrete Services:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for Concrete Services. A precise concrete inspection and testing work surface at an industrial structure: several extracted cylindrical concrete core samples and rectangular concrete blocks arranged on a clean inspection table beside a real cover meter scanning a weathered reinforced-concrete slab, visible aggregate, one subtle marked sampling point and gloved hands carrying out the test. Make the concrete blocks, core specimens and diagnostic process the unmistakable subject. Wide landscape technical editorial photograph, South African industrial context, cool natural daylight, restrained navy and concrete grey palette, extremely believable materials. No person suspended on a wall, no generic ropes, no legible text, logo, graphics or watermark.”
3. **Industrial Access:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for Industrial Access and Installations. Close architectural view of a newly installed galvanized steel inspection platform, secure grating, bolted brackets and engineered height-safety anchor points on a vast industrial steel structure; one technician's gloved hands operating a calibrated torque wrench on structural bolts in the foreground. The installed hardware and mechanical detail are the subject, with no dangling technicians. Wide landscape, premium documentary photography, accurate plausible construction geometry, crisp cool daylight, navy steel tones. No legible text, logo, graphics or watermark.”
4. **Maintenance & Cleaning:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for Maintenance & Cleaning. Editorial close view of maintenance on a large industrial storage tank surface: clearly visible before-and-after band where ultra high pressure water cleaning has removed accumulated residue and prepared steel for protective coating, gloved operator hands controlling a professional water-jet lance from a safe work platform, realistic water spray and steel texture. The cleaning process and treated surface are the focal point, no hanging rope access technician. Wide landscape premium industrial documentary photography, cool natural light and controlled navy-blue shadows. No legible text, logos, graphics or watermark.”
5. **Confined Space:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for Confined Space rescue standby and consultation. At the open hatch of an industrial tank or utility chamber, a carefully staged confined-space entry station: sturdy rescue tripod and retrieval winch above the hatch, atmospheric monitor, harness and hard-hatted standby specialist checking equipment from outside. Focus on rescue readiness, risk controls and equipment rather than a person dangling or an actual emergency. Plausible South African industrial site, wide landscape premium editorial photography, muted steel blue daylight, precise clean composition. No legible text, logos, graphics or watermark.”
6. **Drone Inspection:** “Use case: photorealistic-natural. Asset type: high resolution website photograph for industrial Drone Inspection. A compact collision tolerant inspection drone with protective circular cage and mounted lights flying inside a large, dark power-station boiler or steel duct, inspecting corroded interior walls and structural ribs; believable on-board lights reveal texture, no people. The protected drone and confined internal inspection environment are unmistakable. Wide landscape premium technical editorial photography, deep navy shadows, restrained cyan highlights, realistic industrial scale, sharp details. No legible text, logos, graphics or watermark.”

The production build includes both routes, page-specific titles/descriptions/canonicals/social previews, service structured data when `SITE_URL` is configured, and sitemap entries. The existing robots rule deliberately keeps preview builds out of search until the verified production origin is set.
