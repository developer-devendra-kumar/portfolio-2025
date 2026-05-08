# Portfolio Change Log

Use this file to log every meaningful code/content update.

## Entry Template

```md
## YYYY-MM-DD - Short title
- Goal:
- Files changed:
  - path/to/file
- What changed:
- Validation:
  - [ ] npm run lint
  - [ ] npm run build
  - [ ] Manual check (desktop + mobile)
- Notes/Risks:
```

## 2026-05-08 - Baseline scan and tracker setup
- Goal:
  - Establish a change-tracking system and capture current project state.
- Files changed:
  - `docs/tracking/FILE_MAP.md`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added file ownership map.
  - Added prioritized backlog with validation checklist.
  - Added reusable change log template.
- Validation:
  - [x] `npm run lint` (pass with warnings)
  - [x] `npm run build` (success)
  - [ ] Manual check (desktop + mobile)
- Notes/Risks:
  - Lint warnings still present in `Header.tsx` and `MyJourney.tsx`.

## 2026-05-08 - Client showcase improvement planning
- Goal:
  - Create an implementation-ready plan to improve client conversion and move content to dynamic config files.
- Files changed:
  - `docs/tracking/CLIENT_SHOWCASE_PLAN.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added section-by-section improvement recommendations.
  - Added new sections to make the portfolio stronger for clients.
  - Added a config-first dynamic content architecture and phased execution plan.
- Validation:
  - [ ] N/A (documentation-only update)
  - [ ] Manual review
- Notes/Risks:
  - Final implementation depends on selected content source (GitHub repo, S3, or CMS).

## 2026-05-08 - Config-driven portfolio implementation (Phase 1 + core sections)
- Goal:
  - Start implementation of the client showcase plan with dynamic content loading and section wiring.
- Files changed:
  - `src/types/content.ts`
  - `src/content/site-content.json`
  - `src/content/loadSiteContent.ts`
  - `src/app/page.tsx`
  - `src/app/globals.css`
  - `src/components/Header.tsx`
  - `src/components/Intro2.tsx`
  - `src/components/About.tsx`
  - `src/components/MyJourney.tsx`
  - `src/components/Experience.tsx`
  - `src/components/Services.tsx`
  - `src/components/CaseStudies.tsx`
  - `src/components/WorkProcess.tsx`
  - `src/components/Testimonials.tsx`
  - `src/components/Certificates.tsx`
  - `src/components/Training.tsx`
  - `src/components/SocialLinks.tsx`
  - `src/components/Contact.tsx`
  - `src/components/Faq.tsx`
  - `src/components/UI/SectionTitle.tsx`
  - `docs/tracking/FILE_MAP.md`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CONTENT_SOURCE_SETUP.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Replaced hardcoded section content with typed config-driven content.
  - Added central loader with optional remote content URL and local fallback.
  - Added client-facing sections (services, case studies, testimonials, process, FAQ) and wired them in page flow.
  - Moved navigation to dynamic config and fixed anchor targeting.
  - Added dynamic page metadata generation from content.
- Validation:
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check (desktop + mobile)
- Notes/Risks:
  - Current contact/social URLs and testimonial data are placeholders and must be replaced before production use.

## 2026-05-08 - Stability hotfix after runtime break report
- Goal:
  - Restore reliable runtime behavior after "nothing is working" report.
- Files changed:
  - `src/components/About.tsx`
  - `src/components/MyJourney.tsx`
  - `src/components/UI/SectionTitle.tsx`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Replaced fragile pinned-scroll GSAP implementations with stable static rendering for About and Journey sections.
  - Fixed optional `id` handling in `SectionTitle` to avoid invalid id output.
  - Reproduced and cleared transient dev `module-not-found` errors by restarting the dev server after file replacement.
- Validation:
  - [x] `npm run lint`
  - [x] `npm run build`
  - [x] Dev server request returns `200` for `/`
- Notes/Risks:
  - This hotfix prioritizes reliability over advanced motion; animation polish can be reintroduced incrementally.

## 2026-05-08 - GSAP animations restored (stable mode)
- Goal:
  - Bring animations back while avoiding fragile scroll pinning behavior.
- Files changed:
  - `src/components/About.tsx`
  - `src/components/MyJourney.tsx`
  - `src/components/UI/Paragraph.tsx`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Restored GSAP entrance/scroll animations for About section.
  - Restored GSAP timeline reveal animations for Journey section with animated central line.
  - Added optional `className` prop to `Paragraph` for animation targeting.
- Validation:
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check (desktop + mobile)
- Notes/Risks:
  - Uses lightweight ScrollTrigger animations (`once: true`) to reduce runtime instability.

## 2026-05-08 - Content validation and fallback diagnostics
- Goal:
  - Improve content operations safety for config-driven updates.
- Files changed:
  - `src/content/validateSiteContent.ts`
  - `src/content/loadSiteContent.ts`
  - `src/app/page.tsx`
  - `scripts/validate-site-content.mjs`
  - `package.json`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CONTENT_SOURCE_SETUP.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added reusable content validation helpers.
  - Added `npm run validate:content` and `npm run check`.
  - Updated content loader to return source and fallback warnings.
  - Added on-page warning banner when remote content fails and local fallback is used.
- Validation:
  - [x] `npm run validate:content`
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check (remote failure scenario)
- Notes/Risks:
  - CI wiring for validation enforcement is still pending.

## 2026-05-08 - Config-driven SEO metadata wiring
- Goal:
  - Make SEO and social preview metadata editable through content config.
- Files changed:
  - `src/types/content.ts`
  - `src/content/site-content.json`
  - `src/content/validateSiteContent.ts`
  - `scripts/validate-site-content.mjs`
  - `src/app/page.tsx`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added optional SEO config fields: `canonicalUrl`, `ogImage`, `twitterCard`.
  - Wired Next metadata generation for canonical, OpenGraph, and Twitter cards from config.
  - Extended content validation to cover new SEO fields.
- Validation:
  - [x] `npm run validate:content`
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check (social preview URLs)
- Notes/Risks:
  - Default SEO URLs in content file are placeholders and should be replaced with production values.

## 2026-05-08 - CI quality gate added
- Goal:
  - Enforce config/content and build quality checks on every push/PR.
- Files changed:
  - `.github/workflows/quality-checks.yml`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added GitHub Actions workflow to run `npm ci`, `npm run validate:content`, `npm run lint`, and `npm run build`.
  - Marked CI validation enforcement as completed in backlog.
- Validation:
  - [ ] Workflow execution pending first push/PR run
  - [x] Local commands pass
- Notes/Risks:
  - Workflow assumes npm lockfile and Node 20 support.

## 2026-05-08 - Content authoring checklist added
- Goal:
  - Standardize safe non-code content updates for portfolio maintenance.
- Files changed:
  - `docs/tracking/CONTENT_AUTHORING_CHECKLIST.md`
  - `docs/tracking/README.md`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added a practical authoring checklist covering pre-edit, validation, publish, and post-publish checks.
  - Marked backlog checklist item as completed.
- Validation:
  - [x] Documentation-only change
  - [ ] Team/process adoption pending
- Notes/Risks:
  - Checklist is only effective if followed before every remote content publish.

## 2026-05-09 - Inquiry backend, CTA analytics, and reduced-motion accessibility
- Goal:
  - Complete remaining conversion and accessibility engineering tasks.
- Files changed:
  - `src/app/api/inquiry/route.ts`
  - `src/components/Contact.tsx`
  - `src/components/Intro2.tsx`
  - `src/components/CaseStudies.tsx`
  - `src/components/Header.tsx`
  - `src/components/About.tsx`
  - `src/components/MyJourney.tsx`
  - `src/components/UI/Paragraph.tsx`
  - `src/hooks/useReducedMotion.ts`
  - `src/utils/analytics.ts`
  - `src/app/globals.css`
  - `docs/tracking/BACKLOG.md`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added backend inquiry API (`POST /api/inquiry`) with payload validation and optional webhook forwarding via `INQUIRY_WEBHOOK_URL`.
  - Added contact inquiry form UI and submit states.
  - Added analytics event tracking for navigation and CTA clicks (hero, contact, case studies).
  - Added reduced-motion support in GSAP animation components and global CSS fallback behavior.
- Validation:
  - [x] `npm run validate:content`
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check for inquiry webhook delivery in staging
- Notes/Risks:
  - Inquiry delivery to external systems requires `INQUIRY_WEBHOOK_URL` configuration.

## 2026-05-09 - Professional animation polish pass
- Goal:
  - Upgrade motion design to feel more premium and technically advanced while preserving stability.
- Files changed:
  - `src/components/SiteMotionEnhancer.tsx`
  - `src/app/page.tsx`
  - `src/components/Intro2.tsx`
  - `src/components/About.tsx`
  - `src/components/MyJourney.tsx`
  - `src/components/Experience.tsx`
  - `src/components/Services.tsx`
  - `src/components/CaseStudies.tsx`
  - `src/components/WorkProcess.tsx`
  - `src/components/Testimonials.tsx`
  - `src/components/Certificates.tsx`
  - `src/components/Training.tsx`
  - `src/components/SocialLinks.tsx`
  - `src/components/Contact.tsx`
  - `src/components/Faq.tsx`
  - `docs/tracking/CHANGELOG.md`
- What changed:
  - Added a centralized GSAP motion enhancer for section reveals, hover lift interactions, and magnetic-link micro-interactions.
  - Upgraded hero animation choreography with layered timeline sequencing, floating visual shell, and rotating accent rings.
  - Improved journey timeline with scroll-scrubbed progress line and per-card directional reveal.
  - Added motion data hooks (`data-reveal-section`, `data-reveal-item`, `data-hover-lift`, `data-magnetic-link`) across showcase sections.
- Validation:
  - [x] `npm run lint`
  - [x] `npm run build`
  - [ ] Manual check (desktop + mobile animation quality)
- Notes/Risks:
  - Motion density is intentionally higher; if needed, durations/staggers can be tuned per section after visual review.
