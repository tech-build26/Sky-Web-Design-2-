# About reference reconstruction

User reference: unchanged `about-reference.jpg`, 2752 × 1536. The visible design is normalized to 2048 × 1143 below. User instructions override the image: photography belongs on the left, text on the right, and the button reads **Explore** and links to the services overview.

This is live HTML and separate photographs. No reference wording is treated as an instruction or a source of new credentials. The existing brochure-supported About copy and the requested Since 1999 badge are retained. The official site's indexed introduction mentions 1998; the supplied brochure and this user-approved image use 1999. Do not turn the badge into a claim about a safety record.

## Geometry

Mirror only each design coordinate with `new x = 2048 − original x`. Do not flip readable text, logos or technicians. Artwork occupies the first 1094 reference pixels; its SVG uses `viewBox="0 0 1094 1143"`.

| Layer | Mirrored reference coordinates |
| --- | --- |
| Navy collage outer shape | (0,0), (537,0), (735,1040), (0,1040) |
| Main concrete window | (270,156), (794,156), (966,910), (459,910) |
| Inset frame | x156, y430, width336, height368 |
| Inset border / inner space | 2px border, 15px horizontal / 27px vertical space at 2048 |
| Since 1999 badge | centre (973,906), diameter166; dashed guide diameter200 |
| Blue upper accent | (789,233), (855,233), (913,442), (848,442) |
| Blue inset accent | (245,358), (320,358), (449,862), (402,892) |
| Grey side accent | (807,504), (912,504), (948,641), (844,641) |
| Grey base accent | (516,910), (811,910), (823,937), (533,937) |
| Text column | x1057, width827, top about128 |
| Explore pill | width408, height86; same proportions as the reference action |

Fine horizontal/vertical/diagonal dashed construction lines and circular guides are separate SVG paths. Navy photographic shading is a CSS gradient overlay. The inset frame remains square-cornered. The original pale grey canvas and layered slanted silhouettes are retained.

At a 2048 × 1143 browser viewport, the 15px scrollbar leaves a 2033px stage. Main landmarks scale by 2033/2048. The expected inset bounds are x154.86, y426.85, width333.54 and height365.30. The main window's bounds are x268.02, y154.86, width690.90 and height748.48. Measured positions are saved in `docs/qa/about-final-geometry.json`.

## Typography and responsive changes

Archivo supplies the heavy headings. Two fixed desktop title lines and a two-line statement have separately tuned horizontal widths. Arial supplies the body to approximate the reference's more compact paragraph texture. The source typeface is unknown; exact glyph identity is not claimed. Photography is newly generated and consequently differs from the reference.

Above 1250px the normalized composition retains its proportions. At 701–1250px the artwork and text become a two-column flow with readable 18px copy, without reducing the entire reference to tiny text. At 700px and below the artwork appears first, followed by the text and Explore action. Guide geometry scales with the artwork; text stays at readable sizes. The minimum mobile pill target is 210 × 56px.

Explore has a passing blue/white contrast, arrow translation, a sheen sweep and a small lift for hover and keyboard focus. Reduced motion disables these transforms/transitions through the shared CSS rule. The small About eyebrow blue differs by one channel step from the sampled family to meet 4.5:1 contrast at its 14px mobile size.
