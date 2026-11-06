# Admin Panel Rebuild

> Goal: a small, fast admin that does only what this website needs. Leads, sales and payments live in the CRM, so they're removed here.
> Last updated: 2026-11-04

---

## 1. Keep / remove

| Area today | Decision | Notes |
|---|---|---|
| Web analytics (GA4) | **Keep, improve** | Add Search Console data (§4) |
| Sections and courses | **Keep, rebuild** | The main job of the admin (§3) |
| Reviews | **Keep** (content) | Simple list and edit |
| Invoices (create, edit, PDF, email) | **Keep** | Move to `features/invoices`, minimal UI changes |
| Responses + eligibility submissions | **Merge into one minimal `Lead`** | Saved as a backup copy; the CRM is the system of record (§5) |
| Lead stages, notes, lead cards | **Remove** | Handled in the CRM |
| Payments, payment parts, payment analytics | **Remove** | Including the `Payment`/`PaymentPart` tables (after exporting the data, §7) |
| Business overview (revenue, profit, enrollments) | **Remove** | |
| Home dashboard (total course/enrollment/review/visitor cards) | **Replace** | With a small, useful dashboard (§2) |
| In-app notifications (`Notification` model, bell) | **Remove** | The CRM notifies the team about leads |
| Users | **Keep, minimal** | "Team" page: invite, role, ban (better-auth admin plugin) |

Roughly **40% of admin code and 3 DB models are deleted**, along with packages only they used (§8).

---

## 2. Information architecture

```
/admin                       Dashboard
/admin/analytics             Traffic (GA4) · Search (Search Console)
/admin/content/courses       Course list → /admin/content/courses/[id]   (editor)
/admin/content/sections      Section list → /admin/content/sections/[id]
/admin/content/reviews       Reviews
/admin/content/redirects     Redirects (auto-created on slug change, editable)
/admin/leads                 Lead backup log + CSV export + CRM sync status
/admin/invoices              Invoices → /create, /[id]/edit
/admin/team                  Admin users
```

**Dashboard** (one screen, nothing decorative):
- Leads today / 7 days / 30 days, plus a small chart, split by form (hero form vs eligibility).
- **CRM sync failures** (if any), each with a "Retry" button.
- Search Console: clicks and average position over the last 28 days vs the previous 28.
- Top 5 landing pages (GA4) and top 5 lead pages.
- **Content to-do**: courses with missing SEO fields (from the completeness score, §3).

---

## 3. Content management (the core)

### Course list
- Table: title · code · section · **status** (Draft / Published) · **completeness** (e.g. 7/10) · last updated.
- Search, filter by section and status, sort. Filters live in the **URL** (`?section=…&q=…`), so the back button and shared links work.
- Bulk action: publish, or move to a section.

### Course editor: one page with tabs and a sticky Save bar
| Tab | Fields |
|---|---|
| **Basics** | Title, code, section, slug (locked, with a warning; changing it auto-creates a 301), one cover image (optional on courses: the page falls back to the section's image), image alt, popular flag, status |
| **Content** | Intro · Who it's for · Evidence examples · Licensing · Description · Job opportunities · Entry requirements · Packaging rules · Core units · Elective units (all Tiptap, limited schema) · Duration |
| **FAQs** | Add, reorder (drag) and edit Q&A pairs |
| **SEO** | Meta title and description with **length counters** and a **Google snippet preview**; search aliases; **live Search Console stats for this URL** (clicks, position, top queries) |
| **Preview** | The real public page template rendered with unsaved data |

**Completeness score** (shown in the list and the editor): intro ✓, who it's for ✓, evidence ✓, ≥ 4 FAQs ✓, meta title 30–60 chars ✓, meta description 120–155 chars ✓, image alt ✓, duration ✓, licensing (trades) ✓ … This turns the content strategy into a checklist.

**Draft / Published:** new courses (e.g. the 64 imported ones) start as **Draft**. Drafts are not in the sitemap, return 404 publicly, and can be previewed by admins. Publishing calls `updateTag(course)`, `updateTag(section)` and `updateTag(sitemap)`. There is no time-based revalidation (Hobby-safe).

Sections get the same editor in a smaller form: Basics, Intro, FAQs, SEO.

---

## 4. Analytics

- **Traffic tab (GA4)**: keep the current reports (overview, top pages, referrers, devices, countries), plus **lead conversions per landing page** (GA4 key events, added in Phase 0).
- **Search tab (Search Console API)**, new: clicks, impressions, CTR and position trend; top queries; top pages; **striking-distance list** (position 8–20, high impressions). This is the same analysis as `docs/ANALYSIS.md`, but live.
  - Setup: add the existing Google service account email as a **user on the Search Console property** (Settings → Users and permissions → Add user, "Restricted" is enough). There is no new key.
- All Google API results are **cached for 6 hours** (`'use cache'` + `cacheLife`), so the admin is fast and the API quota stays low.

---

## 5. Minimal lead model

One table replaces `Response`, `EligibilitySubmission`, `Note` and `Notification`:

```prisma
enum LeadForm { HERO RESPONSE ELIGIBILITY CONTACT }
enum CrmSyncStatus { PENDING SYNCED FAILED }

model Lead {
  id          String        @id @default(cuid())
  form        LeadForm
  name        String
  email       String
  phone       String
  interest    String?       // qualification / course title
  message     String?
  details     Json?         // eligibility answers: industry, years, state…
  // attribution
  landingPage String?
  utmSource   String?
  utmMedium   String?
  utmCampaign String?
  gclid       String?
  fbclid      String?
  // CRM
  crmStatus   CrmSyncStatus @default(PENDING)
  crmError    String?
  createdAt   DateTime      @default(now())

  @@index([createdAt])
  @@index([crmStatus])
}
```

- The flow on submit: **save the Lead → respond to the user immediately → sync to the CRM in `after()`**, setting `SYNCED` or `FAILED`. Nothing is lost if the CRM is down, and the dashboard shows failures with a retry button.
- The admin `/admin/leads` page is **read-only**: search, date filter, CSV export, sync status. No stages and no notes.
- Existing `Response` and `EligibilitySubmission` rows are migrated into `Lead`, so history is kept.

---

## 6. How it's built (Next.js best practice for this setup)

| Concern | Approach |
|---|---|
| Rendering | **Server Components** fetch data directly. The admin is dynamic, so it never touches ISR quota. Client components are only for interactive parts (editor, tables, dialogs). |
| Mutations | **Server Actions** in `features/*/actions.ts`, each one calling `requireAdmin()` first (not relying only on `proxy.ts`), validating with Zod, then `updateTag()`. |
| Forms | react-hook-form + the same Zod schema as the action; sticky Save bar; **unsaved-changes warning**; toast on save. |
| Lists | Server-side pagination, search and filters through URL `searchParams`; shadcn Table. |
| Data fetching on the client | Mostly none. `@tanstack/react-query` is **removed**; server components plus `router.refresh()`/`useOptimistic` cover it. |
| Loading | `loading.tsx` skeletons per route, `Suspense` around slow Google API panels. |
| Navigation | shadcn Sidebar (collapsible), breadcrumbs, **⌘K command palette** (jump to any course, invoice or page; `cmdk` is already installed). |
| Heavy client libraries | Tiptap, the PDF renderer and charts are loaded with `next/dynamic` on the pages that use them only. |
| Auth | better-auth (Google + email), `role = admin`; `proxy.ts` for redirects, `requireAdmin()` in every action and route handler. |
| Mobile | Usable on a phone for quick checks (leads, dashboard); content editing is desktop-first. |
| Structure | `src/app/(admin)/admin/...` routes only; logic in `src/features/{courses,sections,reviews,leads,invoices,analytics}` (see CONVENTIONS.md). |

---

## 6a. Login: invite-only, Google only

**Today:** `emailAndPassword.enabled: true`, so `/api/auth/sign-up/email` lets **anyone** create an account (role `user`), even though the login page only shows Google. Google sign-in also auto-creates any Google account.

**New rules** (in `src/server/auth.ts`):
| Rule | How |
|---|---|
| No email/password at all | `emailAndPassword: { enabled: false }`. The existing credential account is deleted in the migration. |
| Only existing users can sign in | Google provider `disableSignUp: true`: a Google account that isn't already a user in the DB is rejected. **The users already in the database keep working** (confirmed 2026-11-04). |
| Admins only | `databaseHooks.session.create.before` rejects sessions for users whose role isn't `admin` or who are banned. |
| Brute force / abuse | better-auth `rateLimit` with the existing Upstash Redis storage. |
| Every admin action protected | `requireAdmin()` in each Server Action and route handler (not only `proxy.ts`). |

Adding a team member: on the Team page, an admin **creates the user** (email + role) with the better-auth admin plugin. On their first Google sign-in the Google account is linked to that user (`account.accountLinking` with `trustedProviders: ["google"]`). The Team page can also ban users and revoke sessions. No code change or deploy is needed.

**Login page redesign** (`/signin`): split layout, brand panel (logo, short tagline, soft gradient) on the left, a card on the right with one **"Continue with Google"** button, clear error states ("This Google account isn't authorised"), and loading state. No sign-up link, `noindex`. Remove the leftover `/test` route.

## 7. Data removal (needs your OK when we get there)

Dropping tables is **permanent**, so before the migration:
1. Export `Payment` + `PaymentPart` (and `Response`, `EligibilitySubmission`, `Note`) to an **Excel file** you keep.
2. Migrate `Response` and `EligibilitySubmission` into `Lead`.
3. Then drop `Payment`, `PaymentPart`, `Note`, `Notification`, `Response` and `EligibilitySubmission` in one reviewed Prisma migration.

## 8. Packages this frees

`@tanstack/react-query`, `recharts` (only if the new dashboard uses simple CSS bars; otherwise it stays for analytics), and `react-select` (replaced by a shadcn combobox). Final check with `npx depcheck` after the rebuild.

## 9. Order of work

Runs **after Phase 1** (structure + Tiptap) and **before Phase 3** content, because the content work needs the new course editor.

1. Lead model, attribution, sync status, data migration (also used by the public forms).
2. Remove payments, business overview and notifications (after the export).
3. Course and section editor, plus Draft/Published, FAQs, redirects and completeness.
4. Dashboard and Analytics (GA4 + Search Console).
5. Invoices moved into the new structure; Team page.
