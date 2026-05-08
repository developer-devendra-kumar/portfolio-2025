# Dynamic Content Source Setup

## Current Behavior
- If no env var is set, app uses local file:
  - `src/content/site-content.json`
- If env var is set, app fetches remote JSON content:
  - `PORTFOLIO_CONTENT_URL`
  - or `NEXT_PUBLIC_PORTFOLIO_CONTENT_URL`

## Required Remote JSON Shape
- Remote file must match the same structure as:
  - `src/content/site-content.json`

## Validation Command
- Validate content before publishing:
```bash
npm run validate:content
```

- Full quality check:
```bash
npm run check
```

## Example `.env.local`
```bash
PORTFOLIO_CONTENT_URL=https://your-domain.com/content/site-content.json
```

## Publishing Flow (No Code Edit)
1. Update remote `site-content.json`.
2. Validate JSON shape (`npm run validate:content`).
3. Publish JSON to remote location.
4. App picks up updates via revalidation in `loadSiteContent.ts`.

## Runtime Fallback Behavior
- If remote fetch fails, app automatically uses local fallback content.
- A warning banner is shown on page so fallback usage is visible.

## Inquiry Backend Optional Env
- To forward inquiry submissions to an external system:
```bash
INQUIRY_WEBHOOK_URL=https://your-endpoint.com/inquiry
```

- Without this env var, `/api/inquiry` works in local-capture mode and logs submission details on the server.
