# Kitchens & Baths by Herzenberg Demo — Project Scope

## 1. Purpose and authority

This repository contains a **candidate-assessment demonstration** for Envision Marketing Group. It is a focused WordPress and
React/TypeScript rebuild of selected Kitchens & Baths by Herzenberg experiences, intended to show practical UX, accessibility, frontend,
and headless-WordPress implementation skills.

It is not an attempt to copy, complete, or operate the entire production website. It must not be represented as the client’s production
site, legal policy, accessibility certification, or a complete replacement for the existing website.

This document is the binding scope authority for work in `kbh-demo/`. Direct instructions from the user may amend it. When that happens,
update this document before—or as part of—the approved scope-expanding implementation.

### Source-material boundary

- The rapid UX evaluation is evidence and design input. Its findings inform this demonstration; it does not independently authorize
  features, routes, integrations, legal claims, or changes beyond this document.
- The original Kitchens & Baths by Herzenberg website is the visual/content fidelity baseline for user-scoped edits. Preserve unaffected
  source treatments as-is; depart from them only for findings described by the rapid UX evaluation or for another explicit user instruction.
- This fidelity direction does not expand the route, integration, or content-model boundaries in this document.
- User-supplied, manually saved images are the approved image source for this demonstration. Do not generate replacement imagery unless
  the user explicitly requests it.

## 2. Product objective and success path

### Business objective

Demonstrate an improved, accessible conversion journey for homeowners considering a kitchen, bathroom, or related residential
remodeling/new-build project in Western Massachusetts or Connecticut.

### Primary user journey

1. A visitor lands on the homepage.
2. They understand the service, audience, geographic area, credibility signals, and immediate next action.
3. They choose **Request/Book a Design Consultation**.
4. They reach `/contact-us/`, understand the practical next step, complete the consultation form, and receive an accessible outcome
   message from the selected WordPress form implementation.

Telephone, email, and showroom/map links may remain direct contact affordances when their final business data is supplied. They are
contact actions rather than additional internal content pages. All other out-of-scope internal homepage destinations follow the
demo-popover rule below.

## 3. Explicit route scope

Only these public routes are in scope:

| Route                       | Role                                      | Required implementation boundary                                                                                                               |
| --------------------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | Homepage                                  | Static React-composed demonstration homepage. It does not parse or render WordPress block content for its sections.                            |
| `/contact-us/`              | Conversion page                           | Consultation destination, contact information, and selected WordPress form integration.                                                        |
| `/privacy-policy/`          | Supporting legal-information page         | A short, organization-specific demo page. It must contain no template placeholders or unrelated-company content.                               |
| `/accessibility-statement/` | Supporting accessibility-information page | A truthful, organization-specific demo page with a valid support route. It must make no unverified WCAG-conformance or legal-compliance claim. |

### Out-of-scope destinations

All other internal destinations represented by the homepage—including service, gallery, process, about, testimonial, designer, and other
content pages—are out of scope. Do not create routes, placeholder pages, API queries, or content models for them.

The existing development frontend may contain older route/navigation examples. They are superseded by this route table and must be removed
or changed only when the user explicitly begins implementation.

## 4. Reusable demo-popover rule

Every out-of-scope internal homepage link must open the same reusable **demo-scope popover/dialog** instead of navigating to a new route.

Approved baseline message:

> This destination is outside the scope of this demonstration. This prototype focuses on applying the UX and accessibility recommendations
> identified for the homepage and consultation journey.

The final wording may be refined for tone, but it must remain clear that the unavailable destination is intentionally outside the
demonstration.

### Dialog requirements

- Use a semantic, accessible dialog pattern.
- Give the dialog an accessible name and description.
- Move focus into the dialog when it opens.
- Trap focus only while the dialog is open; never create a keyboard trap after it closes.
- Support Escape and an explicit close control.
- Restore focus to the triggering link/control after close.
- Ensure the dialog, close control, and trigger have visible focus indicators.
- Do not use a dead `href`, a silent no-op, or a fake “coming soon” route.
- Build it once and reuse it for every out-of-scope internal homepage link.

## 5. Content ownership and WordPress boundary

### WordPress responsibilities

Use standard WordPress **Pages**, not a custom post type for the homepage. WordPress is responsible for the four route-level pages and the
selected form integration.

- Configure the WordPress Home page as the site’s front page if required by the WordPress installation.
- Create standard pages with the route slugs in section 3.
- Do not create a homepage CPT, gallery CPT, services CPT, designers CPT, or other speculative content model.
- WordPress must supply the final form plugin/endpoint contract after the user chooses the plugin or custom solution.
- Keep credentials, API URLs, and environment-specific values out of source control. The React client reads its backend base URL from the
  documented `VITE_WORDPRESS_URL` environment value.

### React responsibilities

React is the presentation and interaction layer. The static homepage composition is intentionally owned by React for this assessment.

The following are static reusable React components, not WordPress-managed page sections for the first demo iteration:

- header and responsive navigation;
- homepage section composition and copy;
- consultation CTA pattern and concise expectation-setting;
- “View Our Project Gallery” strip;
- footer and contact-detail treatment;
- reusable demo-scope popover/dialog;
- shared controls, visual states, and layout primitives.

Do not add a generic WordPress block renderer to make the homepage editable. A future editorial need can be modeled deliberately after the
assessment demonstration is complete.

### Contact form decision point

The user will identify the chosen WordPress form plugin or custom form implementation before frontend submission work begins. Until then:

- do not install a form plugin;
- do not invent a REST endpoint or submission payload;
- do not assume field names, validation behavior, spam protection, confirmation text, or email-delivery settings;
- keep the form UI/API contract explicitly pending.

The eventual contract must define required fields, labels, input types, autocomplete values, client/server validation, error messages,
loading/submitting state, success state, failure state, and the endpoint/authentication/CORS requirements.

## 6. UX and accessibility outcomes to demonstrate

This demo exists to visibly address the following evaluation findings within the narrow route scope.

### Homepage clarity and decision support

- State the service area—Western Massachusetts and Connecticut—within or immediately adjacent to the opening service proposition.
- Clearly identify the service: kitchen, bathroom, and related residential remodeling/design work.
- Provide one primary consultation CTA and a coherent secondary exploration pattern that uses the demo dialog for out-of-scope
  destinations.
- Place concise consultation expectation-setting near the conversion CTA. Explain enough to answer “what happens next?” without
  duplicating a full process page.
- Retain credible signals appropriate to the source material, such as longevity, named team members, product expertise, or showroom
  details, only when final content is supplied and accurate.

### Navigation and keyboard use

- Every interactive element must be reachable and operable by keyboard.
- Focus must always be visible, persistent, clearly distinguishable, and not obscured.
- If the responsive navigation uses expandable menus, the menus must be operable with keyboard and pointer, expose correct expanded state,
  and allow users to reach/leave every item.
- Do not reproduce the source site’s displaced mouse dropdown behavior.
- Use an approved compact/responsive brand treatment at constrained widths rather than allowing the full mark to dominate the mobile
  header.

### Semantics and accessible names

- Use one meaningful page-level `h1` per page and a logical heading hierarchy thereafter.
- Render “View Our Project Gallery” as one semantic heading; visual line breaks are presentation, not separate headings.
- Give every functional image and image-only link a meaningful accessible name. Use empty alternative text only for images that are
  genuinely decorative or redundant.
- Use real links for destinations and real buttons for in-page actions/dialog triggers.
- Header telephone numbers must be actionable `tel:` links when a phone number is displayed.

### Form and feedback

- Provide persistent programmatic labels for all fields; placeholders never replace labels.
- Identify required fields before submission.
- Describe validation errors in text and associate them with the relevant control.
- Announce form submission success/failure accessibly without losing entered values after a recoverable error.
- Do not claim production delivery success until it has been verified in an authorized environment.

### Responsive, performance, and SEO baseline

- Support small mobile widths through large desktop widths without horizontal overflow, hidden essential content, or clipped controls.
- Verify relevant pages at 320 CSS pixels and at 400% browser zoom.
- Reserve image dimensions/aspect ratios to reduce layout shift, serve appropriately sized saved image assets, and use meaningful image
  alternatives.
- Use semantic page titles, one meaningful `h1`, and sensible document landmarks. Do not add SEO plugins, tracking, analytics, caching
  services, or hosting configuration unless separately approved.

## 7. Visual system

### Typography

Load the approved Google font families with preconnect hints for `fonts.googleapis.com` and `fonts.gstatic.com`.

| Usage                                          | Font family         | Approved variants                                         |
| ---------------------------------------------- | ------------------- | --------------------------------------------------------- |
| Semantic headings                              | Playfair Display SC | 400, 700, 900; normal and italic where intentionally used |
| Body copy, buttons, and large non-heading text | Poppins             | 100–900; normal and italic where intentionally used       |

- Apply Playfair Display SC to headings only.
- Apply Poppins to body copy, button labels, form labels, navigation, and visually large text that is not a structural heading.
- Choose weights deliberately; do not load or use every variant merely because it is available.
- Preserve semantic hierarchy regardless of visual typography.

### Palette and contrast rules

| Token role     | Colour    | Permitted use                                                                                                         |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------- |
| Dark primary   | `#244E66` | Primary interactive controls and dark foreground treatment with white text where the tested contrast passes.          |
| Dark secondary | `#80654D` | Secondary interactive/accent controls and dark foreground treatment with white text where the tested contrast passes. |
| Blue surface   | `#A2B9C7` | Decorative/surface background; use a sufficiently dark tested foreground. Do not use white normal-sized text on it.   |
| Warm surface   | `#D8C5B4` | Decorative/surface background; use a sufficiently dark tested foreground. Do not use white normal-sized text on it.   |
| Light neutral  | `#F0F1F2` | Light surface/background; use a sufficiently dark tested foreground.                                                  |

The two darker additions exist to correct the evaluation’s contrast problem. Test actual foreground/background pairs in every rendered
state—default, hover, focus, active, disabled, error, and text-over-image—against the applicable WCAG AA threshold. Never assume that a
palette swatch alone proves a component is compliant.

## 8. Approved implementation technology

| Area              | Decision                                                                    |
| ----------------- | --------------------------------------------------------------------------- |
| Frontend          | React with TypeScript and Vite, in `frontend/`                              |
| Backend           | WordPress, in `wp/`                                                         |
| Styling           | Hand-authored SCSS with responsive CSS; no UI framework                     |
| Icons             | `lucide-react` only for iconography unless the user approves another source |
| Package manager   | Yarn 4, pinned through `packageManager` with `node-modules` linking         |
| UI construction   | Semantic React components and native HTML controls                          |
| Content transport | Explicit documented WordPress REST/API contract; no hidden coupling         |

### Dependency policy

- Do not introduce a UI framework, component library, CSS framework, icon library other than `lucide-react`, analytics, tracking, hosting,
  CI/CD, or unrelated dependencies.
- `lucide-react` is approved for installation when implementation begins; it is not permission to add other packages.
- Prefer native HTML features and small local components over dependencies.

### Styling policy

- Use SCSS for authored styles. Do not add a CSS-in-JS system or utility-CSS framework.
- Keep visual tokens in `frontend/src/styles/_variables.scss`. Define colours, typography, spacing, layout, radii, elevations, motion, breakpoints, and layering there; authored global/component SCSS must reference those token variables instead of repeating literal design values.
- Load `global.scss` from the React entry point as the global SCSS composition layer. Create additional partials only when a component or concern has enough dedicated styling to warrant one.
- Use responsive layout rules rather than separate device-specific page copies.
- Provide visible keyboard-focus styles independently of hover styles.
- Respect reduced-motion preferences for non-essential animation.

## 9. Non-goals and prohibited expansion

The following are explicitly out of scope unless the user confirms a scope amendment:

- rebuilding any route other than the four routes in section 3;
- creating real versions of service, gallery, design, about, process, testimonial, or designer pages;
- copying the full source website’s content structure or interaction inventory;
- a custom homepage CPT or speculative custom post types;
- additional WordPress plugins or integrations beyond the user-selected form solution;
- image generation, stock-image procurement, or replacement branding work;
- user accounts, e-commerce, search, blog/news, newsletter, CRM, analytics, tracking, SEO tooling, localization, and social integrations;
- deployment, hosting, CI/CD, production database changes, or production form submissions;
- legal review, legal-policy drafting beyond accurate supplied demo information, or unverified accessibility-compliance claims.

## 10. Completion criteria for the assessment demo

The project is ready for a review only when:

- the four in-scope routes are present and no extra content routes have been created;
- the homepage drives the intended consultation journey;
- out-of-scope homepage links consistently use the accessible reusable dialog;
- WordPress/React responsibilities follow section 5;
- visual typography and palette follow section 7, with tested component contrast;
- keyboard, focus, semantic-heading, functional-image-name, responsive-navigation, and form-feedback requirements have been verified;
- the legal/support pages contain accurate supplied organization information and no copied/template placeholders;
- the repository contains no credentials or environment values; and
- the final handoff clearly distinguishes verified behavior, known limitations, and user actions still required.
