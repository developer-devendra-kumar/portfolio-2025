# Content Authoring Checklist

Use this checklist when updating portfolio content via config files.

## Before Editing
- Confirm target file:
  - `src/content/site-content.json` (local)
  - or remote content JSON endpoint
- Keep `version` and `lastUpdated` updated.

## During Editing
- Keep all required top-level sections present under `data`.
- Ensure `navigation.sectionId` values match section IDs used in UI.
- Ensure URLs are absolute where required (`canonicalUrl`, `ogImage`, social links).
- Use valid email format for contact.
- If testimonials are not approved, set `featureFlags.showTestimonials` to `false`.
- If FAQ is not ready, set `featureFlags.showFaq` to `false`.

## Validation
1. Run:
```bash
npm run validate:content
```
2. Run:
```bash
npm run lint
```
3. Run:
```bash
npm run build
```

## Publish
- If using remote source, publish updated JSON to the configured content URL.
- Verify homepage loads and key sections render.
- Verify fallback warning is not shown (unless intentionally testing fallback).

## Post-Publish Spot Checks
- Hero headline, CTAs, and navigation links.
- Contact email and external links.
- SEO metadata values (title/description/canonical/OpenGraph/Twitter).
