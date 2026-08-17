# Homepage design QA

## Evidence

- Source visual truth: `.design-qa/source-desktop-00-top.png`, `.design-qa/source-desktop-01.png` through `.design-qa/source-desktop-07.png`, `.design-qa/source-mobile-00-top.png`, and `.design-qa/source-mobile-menu-open.png`.
- Implementation evidence: `.design-qa/implementation-desktop-top-v3.png`, `.design-qa/implementation-desktop-01-v2.png` through `.design-qa/implementation-desktop-09-v2.png`, `.design-qa/implementation-mobile-top-v1.png`, `.design-qa/implementation-mobile-menu-v1.png`, `.design-qa/implementation-dialog-v1.png`, and `.design-qa/implementation-mobile-320-v2.png`.
- Source desktop viewport: 1440 x 900 CSS px, device pixel ratio 1.
- Implementation desktop viewport: 1280 x 720 CSS px, device pixel ratio 1. Desktop captures were not density-normalized because the browser did not retain the requested 1440 x 900 override.
- Source and implementation mobile viewport: 390 x 844 CSS px, device pixel ratio 1.
- Narrow responsive check: 320 x 800 CSS px.
- State: homepage top, section scroll positions, mobile navigation open, and demo-scope dialog open.
- Browser console: no warnings or errors during the completed pass.

## Full-view comparison evidence

The source and implementation were captured from top to bottom in viewport-sized steps. The overall source sequence is preserved: contact/header, hero, services, design philosophy, quality products, project gallery, designers, consultation CTA, and footer. The implementation intentionally changes source contrast, semantic heading structure, navigation behavior, and consultation guidance to meet `scope.md`.

The browser's full-page implementation capture rendered incorrectly as a white image, so viewport-step captures are the reliable full-page evidence. A normalized side-by-side post-fix comparison was not run because the user explicitly limited this task to one visual-check pass and took ownership of the final visual review.

## Focused region evidence

- Header/hero: source desktop top compared with `implementation-desktop-top-v3.png`.
- Responsive navigation: source mobile menu compared with `implementation-mobile-menu-v1.png`.
- Dialog behavior: `implementation-dialog-v1.png` plus browser state checks for focus entry, Escape close, and focus restoration.
- Narrow layout: `implementation-mobile-320-v1.png` exposed overflow; `implementation-mobile-320-v2.png` shows the focused fix.

## Findings and comparison history

- [Fixed P2] The first 320 px capture overflowed horizontally and clipped the long hero heading. The body minimum width was removed and the narrow hero type scale was reduced. The post-fix browser metric reported no horizontal overflow.
- [Fixed P2] The first section review used a source image as a repeating background that rendered as a blue monogram field instead of the source's light treatment. The background was replaced with the approved light-neutral surface.
- [Fixed P2] The design-philosophy and quality-product images were assigned to the opposite sections. Their React references and alternative text were corrected.
- [Fixed P2] Escape did not close the demo-scope dialog during the first interaction check. A scoped Escape listener was added; the subsequent state check confirmed the dialog closed and focus returned to the triggering Kitchen button.
- [Expected limitation] `/contact-us/`, `/privacy-policy/`, and `/accessibility-statement/` are later-phase routes and are not implemented in this homepage-only phase.
- [Open verification] The post-fix desktop and mobile composition, image crops, footer, and consultation region require the user's manual visual pass under the new `AGENTS.md` verification rule.

## Required fidelity surfaces

- Fonts and typography: Playfair Display SC is used for semantic headings and Poppins for body/interface text. Final optical wrapping review is user-owned.
- Spacing and layout rhythm: the source section sequence and alternating image/text rhythm are retained. Final post-fix spacing review is user-owned.
- Colors and visual tokens: all authored colors reference the approved SCSS palette; white normal text is not placed directly on the light-blue surface.
- Image quality and asset fidelity: first-party local source images are used without hotlinks. WordPress Media replacement is intentionally deferred.
- Copy and content: source homepage service, credibility, team, showroom, and contact content is retained or closely paraphrased, with scoped service-area and consultation-expectation remediation.

## Implementation checklist

- [x] Build the static React homepage.
- [x] Add responsive and keyboard-operable navigation.
- [x] Reuse one accessible dialog for out-of-scope destinations.
- [x] Add `noindex, nofollow, noarchive` metadata.
- [x] Eliminate GTM, analytics, image hotlinks, and WordPress runtime dependencies.
- [x] Pass the production build.
- [ ] Complete the user-owned post-fix manual visual review.

final result: blocked
