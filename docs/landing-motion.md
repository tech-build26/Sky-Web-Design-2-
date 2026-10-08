# Landing page motion

Implemented 8 October 2026. The existing layout, photographs and hero geometry are preserved.

| Area | Choreography |
| --- | --- |
| Header | Logo drops in first; navigation follows at 120 ms intervals; CTA arrives last. Link underlines and disclosure chevrons respond to interaction. |
| Hero | Headline lines uncover from below at 170 ms intervals. Copy, button, captions, service cards and industry links follow. Blueprint lines draw into place. |
| Hero photos | Advance every 6 seconds while the photo is on screen. Transitions alternate a 96-tile flip wave lasting about 2.9 seconds, a 2.3-second crossfade and a 2.5-second diagonal reveal. Each photograph slowly zooms from 100% to 104.5% until the next change. There are no pause controls or hover pauses. Photo dots still select an image and restart the automatic interval. |
| Who we are | Backdrop and primary photograph arrive from the left; inset comes from the right. Individual SVG shapes enter at different delays and drift gently. Since 1999 scales into view with a breathing halo. |
| Services | Background, label, heading and introduction arrive separately. Cards follow at 130 ms intervals and lift/enlarge on hover or keyboard focus within. The catalogue also staggers its rows. |
| Safety & quality | Artwork enters from the right, typography uncovers, and the three planning steps arrive separately. Icons and rules respond to hover; blueprint strokes travel gently. |
| Industries | Each industry arrives separately. Icons respond to hover and background contours drift slowly. |
| Sky I | Copy, application labels, CTA and reticle arrive separately alongside the existing drone flight. Reticle corners breathe, a light scan crosses the frame, and application markers glow. |
| Contact | Heading and introduction precede the direct-contact card and enquiry form. Office details follow independently. Card lift, field focus, button highlights and logo hover effects finish the section. |
| Footer | Invitation, logo, navigation, contact details, division and final row arrive in stages. Links, arrows and logos respond to hover and keyboard focus. |

Entrances last about 0.95–1.2 seconds, with supporting details staggered by 130–170 ms. Scroll entrances run once per visit, leaving reading content settled afterward. Animation fill is backwards only so completed entrances do not override hover transforms.

Motion respects `prefers-reduced-motion`, including preference changes during a visit. Content remains visible without JavaScript, and focusing a hidden reveal immediately brings its content into view. The slideshow stops automatically when its photograph is off screen or the document is hidden; continuous decorative animations stop when their sections leave the viewport.

Validation: ESLint, standalone TypeScript check, production build, and the existing production HTTP/asset/link checks passed. Browser inspection covers the desktop and mobile landing page and its reveal sequences.

## Button refinements

The hero Get in Touch action uses faizanullah1999's Uiverse split frame and diagonal background sweep, adapted to the site palette. The hero Our expertise and About Explore links share mrhyddenn's skewed face and counter-skewed label, with a dark filling sweep. The Services catalogue button has its own technical frame, rising blue face and arrow box. Safety uses vinodjangid07's expanding circle pattern with the site's arrow and existing contact destination. Its full width is reserved to avoid layout shifts; the label is visible on touch devices and narrow screens. Keyboard focus triggers the same effects as hover. Credits are retained in the shared CSS module. The Sky I, Contact and Footer buttons retain their earlier treatments.

## Navigation and transition refinements

Desktop Services and Industries disclosures open on mouse hover and stay open while travelling into their links. A 160 ms leave grace period precedes a 260 ms animated dismissal. Escape closes the panel and returns focus to its summary; native click/Enter disclosure controls remain available, including the mobile menu. Link colours and arrows transition smoothly. About points to #about in desktop and mobile navigation. Our expertise replaces How we help in the hero CTA, hero service panel, service-section label and footer. Hero photographs have a restrained cool gradient, and the 12 × 8 flip grid uses cells half the former width and height.

## Five-tile Services layout

Concrete Services and Confined Space sit beside the heading above the original Industrial Access, Inspection & NDT, and Maintenance & Cleaning row, following the supplied screenshot. All five reuse one tile component and its original styling and animations. The upper row extends slightly into available right-side space on wide desktops; below 1100 px the heading sits above the two new tiles, and below 700 px all five cards stack. The new cards have their own existing service IDs, so their navigation links now land directly on the card rather than opening the catalogue. The catalogue remains available for all six services.

## Scroll to top

A compact navy circular arrow appears at the bottom right once the hero has completely left the viewport. It fades/slides into view, remains available throughout later sections, and hides when the hero returns. Its size is 46 px on desktop and 44 px on mobile, with device safe-area spacing. Activating it smoothly scrolls to the top and focuses the hero heading without jumping the viewport. Reduced-motion users return instantly. Hidden controls are disabled and removed from keyboard and assistive-technology navigation. Visibility uses an IntersectionObserver rather than a scroll listener.
