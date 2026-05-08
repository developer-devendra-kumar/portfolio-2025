# Tracking Workflow

## Files
- `FILE_MAP.md`: where each feature/section lives.
- `BACKLOG.md`: prioritized work to complete and improve the site.
- `CHANGELOG.md`: history of all changes made.
- `CONTENT_SOURCE_SETUP.md`: remote content URL setup for config-driven updates.
- `CONTENT_AUTHORING_CHECKLIST.md`: checklist for safe content-only updates.

## How to use
1. Pick one unchecked item from `BACKLOG.md`.
2. Make the change in the listed files.
3. Run checks:
   - `npm run lint`
   - `npm run build`
4. Add an entry in `CHANGELOG.md`.
5. Mark backlog item as done.
