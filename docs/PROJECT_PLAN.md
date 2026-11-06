# RPL Fast Track — Revamp Plan

> Living document. Update the checkboxes and "Status" lines as work progresses.
> Last updated: 2026-11-04

---

## 1. Project overview

**What it is:** A lead-generation website for **RPL Fast Track** (rplfastrack.com). It helps people in Australia turn their work experience into a nationally recognised qualification through Recognition of Prior Learning (RPL).

**How it makes money:** Visitors land on a qualification or industry page (mostly from Google, some from Facebook ads). They fill in either:

- the **Response form** (name, email, phone, message), shown in the hero of every page, or
- the multi-step **Eligibility form** (industry → qualification → experience → state → contact details), opened in a dialog.

Each lead is saved to Postgres, sent to HubSpot and the CRM, and emailed to the team. The admin panel (`/admin`) manages courses, sections, reviews, leads, payments, invoices and analytics.

**Stack (installed versions):**

| Area | Tech |
|---|---|
| Framework | Next.js 16.2 (App Router), React 19.2 |
| Styling | Tailwind CSS 4.3, shadcn/ui (Radix) |
| Data | Prisma 6.19 + PostgreSQL (Accelerate) |
| Auth | better-auth 1.6 (Google), Upstash Redis |
| Media | Cloudinary (course images), `/public` JPGs (page heroes) |
| Leads | HubSpot, custom CRM (`lib/crm.ts`), Brevo email |
| Analytics | GA4 (`@next/third-parties`), Search Console |
| Hosting | Vercel **Hobby** plan |

### Current numbers (late Oct 2026)

| Source | Metric | Value |
|---|---|---|
| GA4 (365 d) | Sessions / Users / Page views | 15.9K / 13.8K / 23.9K |
| GA4 (365 d) | Bounce rate | 42.7% |
| Search Console | Clicks / Impressions | 11K / 575K |
| Search Console | **Average CTR** | **1.9%** (low) |
| Search Console | **Average position** | **22.6** (page 2–3) |
| Vercel (30 d) | ISR reads | 484K / 1M (**48% — the tightest limit**) |
| Vercel (30 d) | Fast origin transfer | 4.09 GB / 10 GB |
| Vercel (30 d) | Fast data transfer | 15.7 GB / 100 GB |

**What the numbers say:**

- Google shows the site a lot (575K impressions) but few people click (1.9%). The average position is 22.6, so most impressions are on page 2–3. **The biggest gain is moving pages that rank 8–20 onto page 1 and making titles and descriptions more clickable.**
- Search Console clicks peaked around the middle of the period and are now falling. Impressions are falling with them, so this is a ranking drop, not only a CTR problem.
- Pages per session is about 1.5 (23.9K views / 15.9K sessions), so most visitors see one page and leave. Internal linking and engagement need work.
- On Vercel, ISR reads are the limit to watch. Every change must keep them flat or lower them.

---

## 2. Goals

1. **Rank higher.** Move the main qualification pages from positions 10–25 to the top 10.
2. **Increase CTR** from 1.9% to 3%+ with better titles, meta descriptions and rich results (FAQ, breadcrumbs, reviews).
3. **Get more leads per visitor.** Keep the hero form, but make it lower-friction and more visible on mobile.
4. **Make it faster.** Pass Core Web Vitals on mobile (LCP < 2.5 s, INP < 200 ms, CLS < 0.1).
5. **Look modern and trustworthy.** Fresh, professional design with real images and strong trust signals.
6. **Keep the code clean.** A predictable folder structure and constants in one place, so any developer can find things.
7. **Stay on Vercel Hobby.** No usage limit should go above about 60%.

---

## 3. Audit findings (from the code)

### 3.1 Performance (high impact)

| # | Finding | Where | Fix |
|---|---|---|---|
| P1 | **Every page ships every course's full content.** The root layout calls `getAllSections()`, which uses `include: { courses: true }`, so each course's `description`, `coreUnits`, `electiveUnits`, `jobOpportunity` and the rest comes back. The whole result goes to the client `RPLProvider`, so all of that HTML is serialised into **every page**, including admin pages. The TS type `Section` hides this because it only lists a few fields. | `app/layout.tsx`, `app/(main)/action/courses.ts`, `contexts/rpl-context.tsx` | Use `select` with only `id, title, link, index, imageUrl`. This should be the single biggest page-weight win, and it also lowers Fast Origin Transfer. |
| P2 | The root layout is shared by `(main)`, `(admin)` and `(auth)`, so the public site loads admin things such as `react-quill` CSS, and admin loads the public sections. | `app/layout.tsx` | Move `RPLProvider`, the Quill CSS and the JSON-LD into the layouts that need them. |
| P3 | `getCourseByLink` is not cached and runs twice per request, once in `generateMetadata` and once in the page. `getSectionByLink` runs again on the same page. | `courses/[link]/page.tsx` | Wrap the reads in React `cache()` plus a tagged cache (`'use cache'` / `cacheTag`). |
| P4 | Hero and section images in `/public` are large JPGs (`recognition.jpg` 1.25 MB, `introduction-bg.jpg` 640 KB, `industry.jpg` 560 KB). | `public/` | Re-export as AVIF/WebP at about 1920 px wide, under 200 KB each, and set `sizes` on every `<Image fill>`. |
| P5 | The home hero is a full-bleed background photo with a 70% dark overlay. LCP is a photo nobody can really see. | `home-hero.tsx` | New hero design (see §5). The LCP element should be the H1 text or a small, optimised image. |
| P6 | Every page renders the Eligibility dialog, Select and Radix code even before anyone opens it. | `eligibility-form.tsx` | Load the dialog content with `next/dynamic` when the user clicks. |

### 3.2 Correctness / caching bugs

| # | Finding | Fix |
|---|---|---|
| B1 | Admin actions call `revalidatePath('/category/...')` and `revalidatePath('/qualifications/...')`. **Those routes don't exist.** The real routes are `/section/[link]` and `/courses/[link]`. Course page edits may not show until the next deploy (the `section:all` tag only covers the shared list). | Use tags per entity (`course:{link}`, `section:{link}`) and invalidate those. |
| B2 | `revalidatePath("admin/review")` is missing its leading `/`. | Fix the path. |
| B3 | `app/generated/prisma/*` is in `.gitignore` but **29 generated files are still tracked**, including `.tmp` files and a Windows `.dll.node`. | `git rm -r --cached app/generated`, then move the output to `src/generated/` or `node_modules`. |
| B4 | `/cookie-policy` has no canonical, so it inherits `canonical: "/"` from the layout and tells Google it is the home page. | Add a canonical. Better: generate canonicals from one helper. |
| B5 | `app/(auth)/test/page.tsx` is a leftover test route that is publicly reachable. | Delete it. |

### 3.3 SEO

| # | Finding | Fix |
|---|---|---|
| S1 | The home H1 is "Accelerate your skills recognition", which contains no keyword. | Use something like "Get a Nationally Recognised Qualification Through RPL in Australia", worded to match the top query. |
| S2 | `openGraph.locale` is `en_US`. The audience is Australian. | `en_AU` and `<html lang="en-AU">`. |
| S3 | `keywords` meta is long and ignored by Google. | Remove it. Put the effort into content instead. |
| S4 | Course pages are thin and similar to each other (same template, same shared sections). Google may see them as near-duplicates. | Add unique content to each course: who it suits, job outcomes and salary, evidence examples, FAQs, typical time to complete (no prices: broker model). |
| S5 | No `FAQPage` schema on course pages, no `AggregateRating`, and `Course.offers` has no price. | Add `FAQPage`. No review/rating markup (see ANALYSIS §8). No price in `Offer` (we don't publish prices). |
| S6 | No blog or guide content, so the site can't rank for informational queries such as "how to get a white card through RPL" or "RPL vs apprenticeship". | Add `/guides` or `/blog` (see §4). |
| S7 | The sitemap has hard-coded `lastModified` dates and lists `/write-review`. | Use real `updatedAt` values. Remove low-value URLs or set them to `noindex`. |
| S8 | URLs are hard-coded as `https://rplfastrack.com` in about 30 places. | One `SITE_URL` constant plus an `absoluteUrl()` helper. |

### 3.4 Code quality

- Folder names have typos: `scheema/`, `permisssion.ts`, `our-Industry.tsx`. Casing is mixed (`ReviewForm.tsx` vs `review-form.tsx`).
- Contact details, URLs and the GA ID come from `NEXT_PUBLIC_*` env vars. They are not secrets, so they should be **constants**.
- Server actions in `app/(main)/action/` are used for reads (`getAllSections`). Reads should be plain server functions in a data layer. Keep `"use server"` for mutations only.
- `app/(admin)/lib/` mixes server helpers (`send-mail`) with client hooks (`use-dashboard-data`).
- `lucide-react` is at 0.508 and `recharts` at 2.x, both behind current releases (see §8).
- The README is still the create-next-app default.

---

## 4. New features

Ordered by impact on leads and SEO.

| Feature | Why | Effort |
|---|---|---|
| **Quick eligibility quiz in the hero.** Three taps (industry → years of experience → state), then a contact step showing "Good news — you may be eligible for X". | A quiz starts with commitment rather than a form. It usually converts better than an empty form. It reuses the existing Eligibility data model. | M |
| **Sticky mobile CTA bar** ("Check eligibility" + WhatsApp/Call) | Most ad and Google traffic is on mobile. The hero form scrolls out of view. | S |
| **Course page FAQs** (stored per course, with `FAQPage` schema) | Unique content and rich results, which help both ranking and CTR. | M |
| **Guides / blog** (`/guides/[slug]`, in the DB like courses, statically built with tag invalidation) | Ranks for informational queries and links internally to course pages. Cached like course pages, so reads happen only after an edit. | M |
| **Trust bar**: years in business, number of graduates | Credibility for a high-trust purchase. | S |
| **Course comparison / "Which qualification suits me?"** | Engagement, more pages per session. | L (later) |
| **UTM and source capture on leads** (gclid, fbclid, utm_*) saved with each Response/Eligibility | Shows which Google queries and FB ads actually bring paying students. | S |
| **GA4 conversion events** (`form_start`, `form_submit`, `whatsapp_click`, `call_click`) | We can't improve what we don't measure. | S |

---

## 5. Design direction

**Goal:** clean, modern and trustworthy. Think of a modern fintech or education site, not a template.

- **Hero (every page):** a light or soft-gradient background instead of a dark photo overlay. Keyword H1 on the left, three short benefit bullets with icons, and trust chips ("Nationally recognised", "Free eligibility check", "100% online assessment"). On the right, a **compact form card**: 2 fields first, then the rest (see below). On mobile the form comes straight after the H1, not far down the page.
- **Form design without adding clutter:**
  - Fewer visible fields at first: *Name + Phone*, then expand *Email + Message* after the first field is filled. Or use the quiz.
  - Floating labels, large touch targets (48 px), inline validation, and a phone input with an `+61` prefix.
  - Microcopy under the button: "Free assessment · Reply within 1 business hour · No obligation".
  - The success state should give a next step ("Chat on WhatsApp now"), not just a check mark.
  - Fix the copy: "Get your free consultants!" should be "Get your free consultation".
- **Typography and colour:** keep emerald as the brand colour, add a deep navy as the secondary colour and one warm accent for CTAs. Use a single display font for headings (e.g. *Plus Jakarta Sans* or *Inter Tight*) with Geist for body text. Put the colour palette in Tailwind `@theme` tokens, not one-off classes like `bg-emerald-600`.
- **Sections to add or redesign on the home page:**
  1. Trust bar (logos and stats), directly under the hero.
  2. "Popular qualifications" grid with duration and a CTA.
  3. A visual 4-step "How it works" timeline (replacing the current text-heavy process).
  4. Student stories (photo, qualification, quote).
  5. An "RPL vs. study" comparison table (time, cost, exams).
  6. FAQ (with schema).
  7. A final CTA band.
- **Imagery:** replace stock-looking photos with **real Australian tradespeople and workplace photos**. Licensed stock from Unsplash/Pexels filtered for Australia, or better, your own students' photos with permission. Optimise everything (AVIF, under 200 KB). Add simple illustrated icons for industries.
- **Colour and contrast (measured, WCAG AA needs 4.5:1 for normal text):**

  | Current pair (uses) | Contrast | Result |
  |---|---|---|
  | White text on `emerald-600` buttons (24 uses) | 3.77 | ✗ normal text (large-text only) |
  | White on `emerald-500` (15) | 2.54 | ✗ fail |
  | `emerald-600` text on white (**147 uses**, links and headings) | 3.77 | ✗ normal text |
  | `emerald-600` on `#F5F7FA` hero background | 3.51 | ✗ normal text |
  | `emerald-500` / `emerald-400` text on white (48) | 2.54 / 1.92 | ✗ fail |
  | `gray-400` text on white (31) | 2.54 | ✗ fail |
  | `emerald-700` on white / white on `emerald-700` | 5.48 | ✓ |
  | `gray-500`, theme `muted-foreground` on white | 4.8 / 4.7 | ✓ |

  **Fix:** define a brand palette as `@theme` tokens: `brand` (≈ emerald-700 for text, links and buttons), `brand-strong` (hover), `brand-soft` (tinted backgrounds), plus a deep navy `ink` for headings and one warm accent for the primary CTA. Then replace the about 300 hard-coded `emerald-*`/`gray-*` classes with tokens. The leftover unused blue tokens (`--color-theme #008fff`, `--color-theme2`, `--color-custom-gradient`) and the unused `.dark` theme are removed. Every token pair is checked for ≥ 4.5:1 (≥ 3:1 for large text and UI borders) before it's used. A small `docs/DESIGN_TOKENS.md` records the final palette.
- **Motion:** subtle CSS fade and slide on scroll only (no heavy animation libraries). Respect `prefers-reduced-motion`.
- **Accessibility:** colour contrast AA, visible focus rings, a label on every input, and `alt` text describing the image (not "Background Image").

---

## 6. What I need from you

### 6.1 Search Console data (most important)

These tell us exactly which pages are close to page 1 and which queries to target.

**How to export:**

1. Open [Google Search Console](https://search.google.com/search-console), select the rplfastrack.com property, and go to **Performance → Search results**.
2. Set **Date: Last 16 months**. Tick **all four** metrics (Clicks, Impressions, CTR, Position).
3. Click **Export (top right) → Download CSV** (or Excel). The download is a zip containing `Queries.csv`, `Pages.csv`, `Countries.csv`, `Devices.csv`, `Dates.csv` and more.
4. Then do a **comparison export**: Date → **Compare** → "Last 3 months vs previous period" → Export again. This shows exactly which queries and pages are losing traffic.
5. Put the files in `docs/data/search-console/` (I'll add that folder to `.gitignore`), or paste them here.

Also useful from Search Console:

- **Pages → Indexing**: a screenshot or export of "Why pages aren't indexed".
- **Experience → Core Web Vitals**: mobile and desktop report.
- **Enhancements**: any structured-data errors.
- **Links**: the "Top linking sites" export.

### 6.2 Google Analytics 4

- **Reports → Engagement → Landing page**: last 12 months, exported as CSV (sessions, engagement rate, key events per landing page).
- **Acquisition → Traffic acquisition**: by session source/medium.
- **Devices**: mobile vs desktop share.
- Do you have form submission set up as a **key event** in GA4? If not, we add it in Phase 1.

### 6.3 Business inputs

- [ ] **Top 10 qualifications by revenue or leads** (the pages we should push first).
- [x] ~~Prices / RTO names~~: **not shown.** RPL Fast Track is a referral partner working with multiple RTOs.
- [ ] Real numbers: years in business, students certified, average completion time.
- [ ] **Real photos**: students (with consent), the team, the office. These build more trust than stock photos.
- [ ] **Main competitors** (3–5 sites that outrank you on your top queries).
- [ ] Facebook ads: which landing pages they point to, and the cost per lead.
- [ ] Brand assets: logo SVG, any brand colours or fonts you want to keep.

### 6.4 Access (optional, speeds things up)

- PageSpeed Insights results for `/`, one course page and one section page (https://pagespeed.web.dev). Paste the mobile score and the "Opportunities" list.

---

## 7. Roadmap

**No calendar timeline: we build everything as fast as possible.** The phases below are a build *order*, not a schedule. Each step starts as soon as the one it depends on is done, and independent tracks run at the same time. We deploy in batches as soon as a batch works, instead of waiting to measure each phase first.

**Fast build order:**

| Step | What | Depends on | Runs in parallel with |
|---|---|---|---|
| 1 | Ship Phase 0 (migration, Vercel env, GA4 key event, merge, deploy) | — | Step 2 |
| 2 | Phase 1: `src/` move, config constants, data layer, renames, dependency step 1 | — | Step 1; content writing (4c) |
| 3 ✓ | Schema batch: `Lead` model + new course fields (ANALYSIS §6: FAQs, duration, …) in **one** migration | Step 2 | Design tokens (4a) |
| 4a | Phase 2: tokens, hero, forms, quiz, sticky CTA, home sections | Step 2 | 4b, 4c |
| 4b | Phase 1b: admin rebuild, Tiptap editor with FAQs/duration, Quill HTML migration | Step 3 | 4a, 4c |
| 4c | Phase 3 content: Wave 1 courses and guides 1–10 drafted as files in `docs/content/`, then imported with a script (no waiting on the editor) | Nothing (import needs Step 3) | Everything |
| 5 | Course/section page template with the new content blocks + `FAQPage` JSON-LD + internal links; import Waves 1–4 | 3, 4a, 4c | — |
| 6 | Dependency majors (§8 step 2), Prisma 7 last | Step 5 deployed | — |

Ship order for deploys: **Phase 0 → Phase 1 → (design + admin + content together) → Waves 2–4 + majors.**

> Build speed is in our hands; ranking speed isn't. Google usually takes about 4–8 weeks to re-rank a page after a content change, so measuring (Phase 4) runs alongside everything else from the first deploy on.

### Phase 0 — Foundation and quick wins

Low risk, immediate SEO and performance gains, no visual change.
Priorities come from [ANALYSIS.md §5](./ANALYSIS.md#5-priority-list-what-we-fix-in-order).

- [x] **www canonical fix** (ANALYSIS T2): one `SITE_URL` constant, `https://www.rplfastrack.com`.
- [x] **Redirects for old course slugs** (ANALYSIS T3) and a `Redirect` model.
- [x] Image `sizes` everywhere, and disallow `/_next/image` in robots (ANALYSIS T4).
- [x] Fix **P1**: slim `getAllSections` with `select`, and stop shipping course HTML to every page.
- [x] Fix **P2**: split root layout responsibilities (public vs admin vs auth).
- [x] Fix **B1–B5**: revalidation paths and tags, tracked generated files, cookie canonical, test route.
- [x] Found during Phase 0: `requireAdmin()` in every admin Server Action (11 of 13 files had no check), and missing courses/sections returned 200 (soft 404) because of `loading.tsx` streaming.
- [x] **Lock down auth** (ADMIN_PLAN §6a): disable email/password sign-up (currently open), Google sign-in only for users already in the DB (`disableSignUp`), admin role required, rate limit.
- [x] **Remove HubSpot sync** from both lead actions and the `HUBSPOT_ACCESS_TOKEN` env (the custom CRM stays). Keep the team notification email.
- [x] Remove all Expo code: plugin, `trustedOrigins` deep-link origins, and the `@better-auth/expo` package. The `rplfastrack://` origin is trusted in production today.
- [x] Fix **S2, S3, S7**: `en-AU`, remove keywords meta, sitemap dates.
- [x] Re-encode `/public` images (AVIF/WebP), add `sizes`.
- [x] Add GA4 conversion events and UTM/gclid capture on both forms. *`generate_lead` done; landing page, UTM, gclid, fbclid and device are stored on each `Lead` (schema batch).*
- [~] Record baseline: PageSpeed scores and CWV, plus a Search Console snapshot. *Pre-change baseline is the Nov 2 data in ANALYSIS.md and `data/`; re-run after deploy.*

### Phase 1 — Structure and conventions

- [x] Move to the `src/` structure in [CONVENTIONS.md](./CONVENTIONS.md).
- [x] `src/config/` constants: site, contact, social, navigation, SEO defaults. Remove `NEXT_PUBLIC_*` for non-secrets. *No `NEXT_PUBLIC_*` left. Navigation and SEO defaults come with the Phase 2 navbar/footer and `buildMetadata`.*
- [x] `src/server/` data layer with cached reads (`'use cache'` + `cacheTag`), and `actions/` for mutations only. *Server infra in `src/server/`; public reads in `features/{courses,reviews}/queries.ts` (`unstable_cache` + per-item tags + React `cache()`; `'use cache'` waits for `cacheComponents`), mutations in `features/{leads,reviews}/actions.ts`. Admin reads stay in `app/(admin)/action/` until Phase 1b.*
- [x] Validate env with Zod at startup (`src/env.ts`).
- [x] Rename typo'd files and folders. Use kebab-case everywhere.
- [x] Dependency cleanup (see §8): remove, update, add. *Done 2026-11-06: step 2 majors applied (lucide 1.x, recharts 3, react-day-picker 10, GA data 7, resolvers 7, dropzone 20, schema-dts 2, nodemailer 10, Prisma 7 with the pg driver adapter; react-icons and the timeline package removed). Step 1 done (bumps; axios, next-themes, @types/bcrypt, depcheck removed). react-icons + lucide 1.x, timeline, Quill go with the redesign/Tiptap; majors are step 2.*
- [x] Replace Quill with the limited Tiptap editor, plus `RichText` renderer and HTML migration script (see §8a).
- [x] Add Prettier and an ESLint import-order rule.
- [x] Rewrite the README (setup, env, scripts, deploy).

### Phase 1b — Admin rebuild

See [ADMIN_PLAN.md](./ADMIN_PLAN.md). Covers the minimal `Lead` model, removing payments/business overview/notifications, the new course/section editor (Draft/Published, FAQs, redirects, completeness score) and the GA4 + Search Console dashboard.

### Phase 2 — Design system and new hero/forms

- [x] Tailwind `@theme` tokens (colours, radius, shadows, fonts). *Colours + display font done 2026-11-05, see [DESIGN_TOKENS.md](./DESIGN_TOKENS.md); public classes swapped to tokens, dark theme removed, CTA colour on lead-form buttons.*
- [x] New hero component (one component, props per page). *`components/sections/page-hero.tsx` + breadcrumbs, used by the inner pages; home keeps its own hero.*
- [x] New lead form: progressive fields, better success state. *Eligibility quiz is progressive; the hero card and home contact form share `form/lead-success.tsx` (thanks + phone we'll call + next steps + call button), no success toast.* *Phone: visitors type any format; `formatAuPhone` (`src/lib/phone.ts`) turns it into `+61…` only in the CRM payload, the Lead row keeps the raw value (decided 2026-11-06).*
- [x] Hero quiz version of the eligibility check (A/B test against the current form if traffic allows). *The eligibility form is now a 5-step quiz (industry → qualification → experience → background → contact) with a success state; no A/B test.*
- [x] Sticky mobile CTA bar. *`(main)/components/sticky-mobile-cta.tsx`: call, WhatsApp, "Check my eligibility" (opens the quiz); slides in after 480px of scroll, phones only; the floating WhatsApp button is desktop only; footer has `max-md:pb-20`.*
- [x] Redesign home page sections (§5). *`react-icons` is gone from the whole codebase.*
- [-] ~~New photography~~ *skipped: no real photos available (2026-11-06).* Industry icons are covered by `Section.icon`.

### Phase 3 — SEO content

*The Search Console export is in `docs/data/`, so this starts now, in parallel with Phases 1 and 2.*

- [x] Map each top query to a target page. Find "striking-distance" pages (position 8–20, high impressions). *`scripts/seo-query-map.mjs` → [data/search-console/query-map.md](./data/search-console/query-map.md). Biggest find: "cert 4 in plumbing" and its variants have ~10,000 impressions at position 10–17 with almost no clicks.*
- [x] Rewrite `metaTitle` and `metaDescription` for the top 20 pages to raise CTR. *`docs/content/seo-meta.json` + `scripts/apply-seo-meta.mts` (applied to the DB and the course JSONs 2026-11-06). Titles now lead with how people search ("Cert IV in Plumbing & Services Fast Track RPL"), code last; course and section titles are `absolute`, so the site suffix no longer pushes them past 60 characters. Home, reviews and contact retitled too.*
- [x] Add unique content blocks per course: FAQs, outcomes, evidence examples, duration. *Built (editor + page template) and imported for all courses.*
- [x] Add `FAQPage` to the JSON-LD. No review/rating markup. *Course, section, guide, home and FAQ pages. Structured data was also rebuilt: see "Structured data" below.*
- [x] Internal linking: related courses (same section), guide ↔ course links, courses without a linked guide fall back to the general RPL guides, section pages list guides. *(2026-11-06)*
- [x] Launch `/guides` with 5–8 articles targeting informational queries. (8 guides, in the DB, 2026-11-06)
- [x] Structured data (2026-11-06): one `ProfessionalService` + `WebSite` graph in the layout with `@id`s, address and opening hours (the old Organization marked a mobile number as `TollFree`); pages refer to it by `@id`. Course pages are one `@graph` (WebPage, Course with AQF level, BreadcrumbList) with no `Offer` (a price-less Offer is invalid and we publish no prices) and no `courseWorkload: PT0S`. The generic Service is gone from course pages; its description now says what we do (eligibility check and RPL support), not that we issue qualifications. All JSON-LD goes through `components/seo/json-ld.tsx`, which escapes `<`. Fake Twitter handles removed.
- [ ] After deploy: Rich Results Test on one course, one section and the home page; request indexing for the top 20; re-export Search Console after 4 weeks and compare CTR.

### Phase 4 — Measure and iterate (from the first deploy, ongoing)

- [ ] Weekly: Search Console clicks, CTR and position for target pages.
- [ ] Monthly: Vercel usage check (ISR reads must stay below 60%).
- [ ] Monthly: leads per landing page (GA4 key events and CRM).
- [ ] Iterate on weak pages.

---

## 8. Dependency cleanup

Usage was checked by searching the source code (2026-11-04).

### Remove

| Package | Used in | Replace with |
|---|---|---|
| `react-quill-new` | `rich-text-editor.tsx`, invoice preview, and **its CSS is imported in the root layout** (loaded on every public page) | **Tiptap** (see §8a) |
| `axios` | 2 upload components in `write-review/` | Native `fetch` |
| HubSpot code (no package, just `fetch` + env) | `app/(main)/action/response.ts`, `eligibility.ts` | Removed; the custom CRM (`lib/crm.ts`) stays |
| `react-icons` | 17 files, about 21 icons (stars, WhatsApp, phone, chevrons…) | `lucide-react` (already installed). WhatsApp as one inline SVG component. |
| `react-vertical-timeline-component` + its `@types` | `courses/components/process-of-rpl.tsx` | A small Tailwind timeline (also part of the redesign) |
| `next-themes` | Only `components/ui/sonner.tsx` (shadcn default). The site has no dark mode. | Hard-code `theme="light"` in the Toaster |
| `@types/bcrypt` | Nothing (bcrypt isn't installed) | — |
| `depcheck` | Dev tool | Run once with `npx depcheck`; no need to keep it installed |
| `@better-auth/expo` | `lib/auth.ts`: import, `expo()` plugin, `trustedOrigins` (`rplfastrack://`, `exp://…`) | **Confirmed: remove completely** (the app experiment was abandoned). Keep the better-auth 1.6 upgrade and the `kysely` pin from that period. |

### Keep (they do a real job)

`@react-pdf/renderer` (invoices), `exceljs` (exports), `recharts` (admin charts), `@tanstack/react-query` (admin), `react-dropzone` + `react-advanced-cropper` (image upload and crop), `react-day-picker` + `date-fns`, `cmdk` (site search modal), `react-select` (course selector; could move to shadcn Combobox later), `schema-dts`, `striptags`, `cloudinary`, `nodemailer` + Brevo transport, `@upstash/redis`, `@google-analytics/data`, Prisma + Accelerate, `kysely` (pinned override for better-auth; keep the pin).

### Update (checked with `npm outdated`, 2026-11-04)

**Step 1 — safe minor/patch bumps (one commit, build + smoke test):**
`next` 16.2 → **16.4**, `eslint-config-next` and `@next/third-parties` → 16.4, `react`/`react-dom` 19.2 → **19.3**, `better-auth` 1.6 → **1.7** (check the required `kysely` version and update the pin to match), all `@radix-ui/*`, `zod` 4.6, `react-hook-form` 7.91, `@hookform/resolvers` 5.9, `tailwindcss`/`@tailwindcss/postcss` 4.3.4, `@react-pdf/renderer` 4.9, `@upstash/redis`, `cloudinary`, `sonner`, `tailwind-merge`, `tsx`, `@types/react*`.

**Step 2 — majors, one per commit, each tested:**
| Package | From → to | Watch out for |
|---|---|---|
| `lucide-react` | 0.508 → **1.x** | Some icons renamed; done together with the `react-icons` removal |
| `recharts` | 2.15 → **3.x** | Chart API changes (admin analytics only) |
| `react-day-picker` | 9 → **10** | shadcn `calendar.tsx` must be regenerated |
| `@google-analytics/data` | 5 → **7** | Client constructor and response types |
| `@hookform/resolvers` | 5 → **7** | Only if it supports our `zod` 4 + RHF 7 combination |
| `react-dropzone` | 14 → **20** | Hook API changes in the upload components |
| `schema-dts` | 1 → **2** | Types only |
| `nodemailer` + `@types/nodemailer` | 7 → **10** / 8 | Check that `nodemailer-brevo-transport` still works, or send through Brevo's HTTP API with `fetch` instead (one less dependency) |
| `prisma` / `@prisma/client` + `@prisma/extension-accelerate` | 6.19 → **7.x** / 3.x | New `prisma.config.ts`, generator output, driver setup. Own step, after the schema changes. **Not 8** (still RC). |

**Hold for now:**
- `typescript` 7: the new native compiler. Wait until Next.js officially supports it.
- `eslint` 10: wait until `eslint-config-next` supports it.
- `@types/node`: match the Vercel Node runtime version (22/24), not 26.

### Add

| Package | Why |
|---|---|
| `@tiptap/react`, `@tiptap/pm`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-table` (+ row, cell, header) | Admin rich-text editor |
| `sanitize-html` (server only) | Clean HTML on save in admin actions, allowing only the tags in §8a |
| `@tailwindcss/typography` (optional) | Base for the `prose` styles, customised to our design. Alternatively hand-written CSS; we decide during the design phase. |

---

## 8a. Rich text: Tiptap, limited to what our content needs

**Principle:** the editor can only produce what our page design can display well. The admin panel can't add random colours, font sizes or images that break the design.

### Allowed content (the editor schema)

| Element | Why we need it |
|---|---|
| Paragraph, **bold**, *italic* | Basic text |
| Heading **H2, H3** only | The page template owns the H1. H2/H3 give the structure Google and AI Overviews read. |
| Bullet and numbered lists | Evidence lists, steps, job roles |
| Link (internal and external, `rel` set automatically) | Internal linking between courses and guides |
| Table (simple: header row plus rows, no merged cells) | "Which qualification is right for me?", unit lists, comparisons |
| **Callout** (custom node: `info` / `tip` / `warning`) | Licensing notes ("In VIC you also need…"), important notices |
| Hard break, undo/redo, clear formatting | Editing basics |

**Not allowed:** colours, background colours, font family and size, underline/strike, sub/superscript, code blocks, images, video, indent, alignment. Pasting from Word or Google Docs strips anything outside the schema automatically.

### Pieces

```
src/components/rich-text/
├─ editor.tsx           # "use client" — Tiptap editor + toolbar (admin only, loaded with next/dynamic)
├─ toolbar.tsx          # H2 · H3 · B · I · • list · 1. list · link · table · callout · undo/redo · clear
├─ extensions.ts        # The shared schema (used by the editor and the sanitiser allow-list)
├─ callout-extension.ts # Custom node → <aside data-callout="info">…</aside>
└─ rich-text.tsx        # Server component for public pages: renders stored HTML inside our `.prose-rpl` styles
```

- **Storage:** stays **HTML** in the existing DB string fields. No schema change, the HTML is already in the static page, and the public pages ship **zero editor JavaScript**.
- **Public rendering:** `<RichText html={course.description} />` applies the `.prose-rpl` styles: heading sizes, list markers, table style and callout colours, all from the design tokens. One place to change the look of all content.
- **Sanitising:** admin actions run `sanitize-html` with the same allow-list before saving.
- **Migrating existing Quill HTML:** a one-time script cleans the 67 courses: it removes `ql-*` classes, inline colours and empty paragraphs, and turns `ql-indent` into nested lists. It runs as a dry run first, showing a diff report, then writes.
- The editor preview uses the same `.prose-rpl` styles as the public page, so what the admin sees matches the live page.

---

## 9. Vercel Hobby guardrails

- Public pages are **statically generated**. Data changes go through **tag-based invalidation**, not short `revalidate` timers.
- Never add `revalidate = 60`-style timers on public pages. They increase ISR reads directly.
- Keep `prefetch={false}` on large link lists (menus, footers). Prefetch only the main CTA paths.
- Guides are **in the DB** (changed from MDX on 2026-11-06 so they can be edited in the admin): statically built, invalidated by tag on save, no time-based revalidate.
- Images: serve `/public` assets as pre-optimised AVIF, so they don't use up Image Optimization transformations (833 / 5K). Use Cloudinary `f_auto,q_auto` URLs for course images.
- Check the usage dashboard after each phase deploys.
