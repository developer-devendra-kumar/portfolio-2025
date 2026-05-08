# Portfolio Backlog

Last updated: 2026-05-09

## Completed in Current Pass
- [x] Converted page content from hardcoded strings to config-driven structure.
- [x] Added centralized content loader with local fallback and optional remote URL source.
- [x] Wired major sections into the homepage with real components.
- [x] Fixed navigation anchors by driving menu links from content config.
- [x] Cleared lint warnings and verified production build.
- [x] Restored GSAP animations in stable mode for About and Journey sections.
- [x] Added content validation command: `npm run validate:content`.
- [x] Added runtime fallback warning banner when remote content fetch fails.
- [x] Added inquiry backend endpoint and inquiry form flow.
- [x] Added CTA analytics tracking for hero, case studies, contact, and navigation.
- [x] Added reduced-motion support in GSAP components and global motion fallback.

## P0 - Must Do Next
- [ ] Replace placeholder contact/social URLs and email in `src/content/site-content.json` with real production values.
- [ ] Add real case-study metrics (numbers, outcomes, timeline) to strengthen client trust.
- [ ] Add real testimonial quotes and attributions (or disable testimonials flag until approved quotes are ready).
- [ ] QA mobile behavior for journey milestone layout and long-text cards on small screens.

## P1 - Dynamic Content Operations
- [ ] Move content source from local JSON to a remote managed JSON endpoint (GitHub raw/S3/CMS).
  - Env var:
    - `PORTFOLIO_CONTENT_URL`
    - or `NEXT_PUBLIC_PORTFOLIO_CONTENT_URL`
- [x] Enforce content validation in CI (validation command already added).
- [x] Create a content authoring checklist for non-code updates.
- [x] Add fallback UI notice if remote content is unavailable.

## P2 - Conversion and SEO Polish
- [x] Add OpenGraph/Twitter image metadata fields and social preview assets.
- [x] Add project inquiry form backend flow (if required beyond mailto).
- [x] Add analytics events for CTA clicks (case studies/contact).
- [x] Improve accessibility labels and reduced-motion behavior for animation-heavy sections.

## Validation Checklist
- [x] `npm run lint` has zero warnings/errors.
- [x] `npm run build` succeeds.
- [ ] Navigation links verified manually on desktop and mobile.
- [ ] Dark/light mode verified manually across sections.
- [ ] Remote content URL tested in staging.
