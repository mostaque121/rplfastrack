# Project docs: start here

Planning for the 2026 revamp of rplfastrack.com. Read in this order:

| Doc | What it covers |
|---|---|
| [PROJECT_PLAN.md](./PROJECT_PLAN.md) | Overview, goals, code audit, design direction (incl. colour/contrast), **roadmap (Phase 0 → 4)**, dependency cleanup and updates, Tiptap spec, Vercel Hobby guardrails |
| [ANALYSIS.md](./ANALYSIS.md) | Search Console / PageSpeed / DB findings, priority list, DB field changes |
| [CONTENT_STRATEGY.md](./CONTENT_STRATEGY.md) | Keyword strategy, page templates, guides, content waves, research workflow |
| [ADMIN_PLAN.md](./ADMIN_PLAN.md) | Admin rebuild: what's kept or removed, `Lead` model, course editor, login lockdown |
| [CONVENTIONS.md](./CONVENTIONS.md) | Folder structure, naming, constants vs env, caching rules |
| [content/qualification-list.md](./content/qualification-list.md) | Existing vs 64 new qualifications, new sections |

`data/` holds private exports (Search Console, PageSpeed) and is git-ignored.

## Fixed decisions
- Primary domain: **https://www.rplfastrack.com**
- No prices, no RTO names or logos, no review/rating structured data
- Course, section and guide content lives in the DB (admin panel); no MDX
- Never change an existing course URL (if a slug changes, a 301 is created automatically)
- HubSpot and Expo: removed. Custom CRM and the team notification email: kept
- Admin login: Google only, existing DB users with the admin role; no sign-up
- Vercel Hobby: no time-based `revalidate` on public pages, only tag-based invalidation

## Next step
Phase 0 is on branch `phase-0` (2026-11-04). Before merging: apply the `add_redirect` migration, remove `HUBSPOT_ACCESS_TOKEN` from Vercel, mark `generate_lead` as a GA4 key event. Then follow the **fast build order** in PROJECT_PLAN §7: no calendar timeline, independent tracks run in parallel.
