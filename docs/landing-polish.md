# Landing page polish — 8 October 2026

## Implemented

- Removed Insights and its navigation entry; Our Work stays removed.
- Removed the Elios 3 equipment caption and motion toggle. The drone now floats through a 25px vertical range, 14px horizontal range and ±1.8° roll on a 4.8-second loop after its entrance. Cursor displacement is now ±24px / ±16px. The animation continues after entry, with the existing reduced-motion fallback.
- Visit Sky I now uses the page's blue, cyan, navy and white on hover/focus.
- Industries preserves its existing heading, five items, spacing and responsive layout. Its background uses the sampled Safety & Quality navy (`#06192d`) with native SVG contour lines continuing the visual theme across the entire section, following the user's full-width revision.
- Subsequent refinement softens Industries to thin, widely spaced, asymmetric flowing curves. A gradient fades the line ink from 8.5% to 17% opacity so the artwork stays quiet behind the content.
- Contact features a full project enquiry form, direct project-manager WhatsApp card, email and both office contacts.
- User-confirmed project number `+27 83 289 0077` is WhatsApp only. Both contact and footer use a prefilled `https://wa.me/27832890077` link. The number is never a telephone link.
- WhatsApp icon and WhatsApp actions use green `#25d366`, following the user's color revision.
- All 45 supplied contractor logos appear in a seamless right-to-left carousel at the end of Contact. Hover/focus stops travel, dragging and native touch scrolling browse either direction, keyboard arrows remain available. Visible arrow buttons and helper text were removed at the user's request. Fractional travel is accumulated to support high-refresh displays. Duplicate logos are hidden from assistive technology.
- Footer includes a brand statement, clear navigation, contact routes and the unchanged supplied Sky I logo on the right linking to `http://skyi.co.za/`.
- Fixed rope technician uses a white silhouette with `mix-blend-mode: difference`: dark against light paper and light against dark sections. The ropes use the same adaptive treatment. No repeated DOM or image sampling is required.

## Form delivery

Recipient: `info@ropeaccess.co.za`. The complete form validates required fields and consent, and currently prepares a mailto message for the visitor to review and send. It does not report delivery when no email was sent.

The server handler at `src/app/api/contact/route.ts` supports direct delivery using [Resend's send-email API](https://resend.com/docs/api-reference/emails/send-email). Configure `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` with a verified sender before rebuilding. The key stays server-side. The route validates payloads, rejects cross-origin submissions, discards the honeypot, limits repeated submissions per process, times out delivery and returns useful errors. For multi-instance public hosting, configure a shared rate limit at the hosting edge. No actual emails or WhatsApp messages were sent during verification.

The form preserves the visitor's entries when delivery fails and offers the prepared email as a fallback. Without JavaScript, the contact email and WhatsApp links remain available.

## Assets

Supplied contractor files remain unchanged in `public/images/contractors/`. `src/lib/contractors.ts` is the explicit inventory and accessible company labels. `public/images/brand/inspection-contours.svg` and `public/images/brand/industries-contours.svg` are code-native decorative artwork. Both supplied brand logos remain intact.

## Verification

- ESLint and production build / TypeScript passed.
- `node scripts/verify-contact.mjs` passed: malformed/oversized payloads, cross-origin rejection, invalid fields and consent, unconfigured delivery, honeypot, recipient and reply-to mapping, provider failure/timeout and rate limiting. Provider responses are mocked; no email is sent.
- Browser form verification prepared the expected recipient, site, service, timeframe and scope. It presented a review/send email action without reporting successful delivery.
- Browser carousel checks confirmed manual 200px arrow travel and 300px drag travel, plus keyboard navigation and pause on focus/hover.
- After the follow-up revision, browser checks confirmed zero visible carousel arrow buttons and zero helper-text elements. Automatic travel and keyboard/drag behavior remain.
- Browser review confirmed full-section Industries contour lines and adaptive white silhouette on dark sections. Desktop and mobile checks found no horizontal page overflow.
- Final production HTTP verification passed (91 resources and working contact-route validation); subsequent contour artwork also returned HTTP 200. Final Next.js build passed after the contour and WhatsApp color revisions.
