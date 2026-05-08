# Portfolio File Map

Last scanned: 2026-05-09

## App Shell
- `src/app/layout.tsx`
  - Root layout and global font setup.
- `src/app/page.tsx`
  - Main portfolio composition.
  - Loads all section content from the content loader.
  - Generates page metadata dynamically from content config.
- `src/app/globals.css`
  - Theme tokens + shared classes.
  - Includes `app-bg` gradient utility for light/dark page background and reduced-motion global fallback.

## API Endpoints
- `src/app/api/inquiry/route.ts`
  - Inquiry submission endpoint.
  - Validates payload and optionally forwards to `INQUIRY_WEBHOOK_URL`.

## Dynamic Content Layer
- `src/content/site-content.json`
  - Default content source for all sections.
  - Contains navigation, hero, about, journey, services, case studies, testimonials, process, certifications, training, contact, social links, FAQ, feature flags, SEO.
- `src/content/loadSiteContent.ts`
  - Central loader for content.
  - Uses remote URL via env var when provided:
    - `PORTFOLIO_CONTENT_URL`
    - `NEXT_PUBLIC_PORTFOLIO_CONTENT_URL`
  - Falls back to local `site-content.json` with warning diagnostics.
- `src/content/validateSiteContent.ts`
  - Shared runtime validation helpers for content shape checks.
- `src/types/content.ts`
  - TypeScript interfaces for all content schemas.

## Theme and Navigation
- `src/components/Header.tsx`
  - Dynamic navigation links from content config.
  - Dark mode toggle with persisted theme in localStorage.
  - Mobile menu with GSAP animation and reduced-motion-safe fallback.

## Core Animated Sections
- `src/components/Intro2.tsx`
  - Config-driven hero section with metrics, CTA buttons, and analytics tracking.
- `src/components/About.tsx`
  - Config-driven about text and skill cards with GSAP reveal animation.
- `src/components/MyJourney.tsx`
  - Config-driven journey milestones with GSAP timeline reveal animation.

## Client Showcase Sections
- `src/components/Experience.tsx`
- `src/components/Services.tsx`
- `src/components/CaseStudies.tsx`
  - Includes tracked CTA to contact section.
- `src/components/WorkProcess.tsx`
- `src/components/Testimonials.tsx`
- `src/components/Certificates.tsx`
- `src/components/Training.tsx`
- `src/components/SocialLinks.tsx`
- `src/components/Contact.tsx`
  - Contact details + inquiry form connected to `/api/inquiry`.
- `src/components/Faq.tsx`

## Reusable UI
- `src/components/UI/SectionTitle.tsx`
- `src/components/UI/Paragraph.tsx`
- `src/components/UI/MyJourneyCard.tsx`

## Shared Client Utilities
- `src/hooks/useReducedMotion.ts`
  - Detects user reduced-motion preference for animation-safe rendering.
- `src/utils/analytics.ts`
  - Sends client-side CTA/navigation/inquiry events to `dataLayer` and `gtag` when available.

## Legacy/Unused (Currently Not Wired)
- `src/hooks/useSystemTheme.tsx`
- `src/components/Intro.tsx`
- `src/components/Intro3.tsx`

## Assets
- `src/assets/images/*`
  - Logo and profile image assets.
- `src/assets/lottieFiles/*`
  - Lottie JSON animation files.
- `src/assets/certificates/*`
  - Certificate images.
- `src/assets/files/devendra-resume-updated-5-sept.pdf`
  - Resume PDF.
