# SEO & Performance Analysis

> Based on: Search Console (last 16 months + last 3 months vs previous 3, page exports for `/` and TAE40122), Search Console screenshots (indexing, CWV, enhancements), PageSpeed mobile runs (Nov 2, 2026), and a **read-only** look at the production database (67 courses, 9 sections, 33 approved reviews).
> Date: 2026-11-02

---

## 1. Headline: what's going on

**Traffic peaked in Apr–Jun 2026 and has since fallen by about 45%.**

| Month | Clicks | Impressions | CTR | Avg position |
|---|---|---|---|---|
| 2025-07 | 538 | 58.7K | 0.9% | 51 |
| 2025-10 | 732 | 28.6K | 2.6% | 20 |
| 2026-03 | 889 | 51.3K | 1.7% | 18 |
| 2026-04 | 1,159 | 58.5K | 2.0% | 18 |
| **2026-05** | **1,214** | 63.1K | 1.9% | 20 |
| 2026-06 | 1,212 | 70.2K | 1.7% | 22 |
| 2026-07 | 1,124 | 60.4K | 1.9% | 24 |
| 2026-08 | 931 | 47.0K | 2.0% | 28 |
| 2026-09 | 733 | 34.6K | 2.1% | 24 |
| **2026-10** | **656** | 35.2K | 1.9% | 28 |

- **CTR has stayed about the same (around 2%). Average position has dropped about 10 places** (18 → 28). So this is a **ranking problem, not a snippet problem**. Google trusts the pages less than it did, or competitors have improved.
- The git history from May to August only shows admin and invoice work, so the drop wasn't caused by a site change. The most likely explanation is a Google update plus competitors with better content. Our pages haven't changed in a long time: the median course page has **178 words**.
- **Mobile does much better than desktop**: position 13.6 vs 33.8, CTR 3.8% vs 1.05%. Most of your leads come from mobile.
- Part of the recent rise in "rpl fast track" brand clicks comes from **Bangladesh** (home page: 91 clicks at 78% CTR). That is probably your own team searching, so real Australian brand growth is smaller than it looks.

## 2. Where the site wins and where it loses

### It wins on "fast track" queries
You rank **#2–7** for "[qualification] fast track" searches, because the brand name matches the query:

| Query | Clicks | Pos |
|---|---|---|
| cert iv training and assessment fast track | 235 | 5.4 |
| cert 4 building and construction fast track | 102 | 2.6 |
| tae40122 fast track | 79 | 3.7 |
| fast track electrician course | 62 | 2.2 |
| fast track carpentry course | 50 | 3.5 |

About two-thirds of all non-anonymised clicks contain "fast track". **Protect this.** Keep "Fast Track" in every title, and target "fast track" variants for every qualification.

### It loses on bigger generic and "rpl" queries
The site reaches page 1–2 for these but gets almost no clicks:

| Query group | Impressions (16 mo) | Pos | CTR |
|---|---|---|---|
| **Cert IV plumbing** (≈12 variants: "cert 4 plumbing", "certificate iv in plumbing", "plumbing cert 4"…) | **≈ 20,000** | 7–17 | 0.1–1.3% |
| rpl chef / rpl aged care | 5,000 | 17–19 | < 0.2% |
| rpl electrician / electrical licence | 3,600 | 8–11 | 1.5–2.3% |
| fast track cert 3 childcare / aged care | 3,400 | 9–13 | 1–1.5% |
| rpl (generic) / rpl certificate / rpl courses australia | 11,000 | 33–40 | ~0.1% |
| certificate iv in ageing support / aged care | 8,000 | **70–76** | 0% |

**Cert IV Plumbing is the biggest single opportunity.** `/courses/cpc40920-…` has 44K impressions at position 11 but only 1.09% CTR. Getting it into the top 5 could add roughly 100+ clicks a month on its own.

### Pages losing the most clicks (last 3 months vs previous 3)

| Page | Clicks now / before | Position now / before |
|---|---|---|
| CHC33021 Cert III Individual Support | 116 / 293 | 15.5 / 15.4 (impressions halved) |
| UEE30820 Electrician | 132 / 269 | 15.5 / **10.1** |
| TAE40122 Cert IV Training & Assessment | 216 / 326 | 43.5 / 38.0 |
| UEE32225 Air Conditioning | 80 / 169 | 26.1 / **13.7** |
| CPC40920 Cert IV Plumbing | 30 / 89 | 13.4 / 9.0 |
| AUR30620 Light Vehicle | 46 / 84 | 18.6 / 13.6 |
| CPC32420 Cert III Plumbing | 41 / 85 | 15.2 / 11.5 |

These are your **top revenue-type pages**. They get rewritten first.

## 3. Technical findings from the data

| # | Finding | Evidence | Fix |
|---|---|---|---|
| T1 | **Section pages get no Google traffic.** Not one `/section/*` URL appears in the 113 top pages. | GSC Pages export | Give each section real content (intro, comparison table, FAQs) and a keyword title such as "RPL Community Services Qualifications — Fast Track". The current title is just "Community Service". |
| T2 | **The `www` / non-www canonical mismatch.** Google indexes `https://www.rplfastrack.com/...`, but every canonical, the sitemap and `metadataBase` point to `https://rplfastrack.com/...`. | All 113 GSC URLs are `www` | Use **one** host everywhere. Since Google already chose `www`, make `SITE_URL = https://www.rplfastrack.com` and **Confirmed: `www` is primary in Vercel.** **Fix this first.** |
| T3 | **Old course URLs now 404.** 14 old slugs appear in GSC, e.g. `shb30416-certificate-iii-in-hairdressing` (120 clicks), `chc40221-certificate-iv-in-school-based-education` (55 clicks), several old electrician and HVAC slugs, and a trailing-slash carpentry URL. | GSC Pages vs DB | Add a **redirect table** (old slug → new slug, 301). The admin panel saves the old slug automatically whenever a course link changes. |
| T4 | **Google indexes `_next/image?...&w=3840` URLs.** Course images are served at 3840 px wide because `sizes` is missing. | 9 rows in GSC Pages | Add `sizes` to every `next/image`. Also disallow `/_next/image` in `robots.txt`. |
| T5 | **No rich results except breadcrumbs.** Search Appearance is empty. Breadcrumbs are valid on 54 pages, but you have 67 courses plus 9 sections, so about 20 pages are missing. | Enhancements screenshot | Add `FAQPage` (per course and section), and `Course` schema without a price (we don't publish prices). |
| T6 | Soft 404 ×2, crawled but not indexed ×3. | Indexing screenshot | Probably old slugs (T3) and thin pages. Re-check after T3. |
| T7 | **Home LCP 6.4 s, section LCP 6.4 s** (lab data). Course pages are fine (LCP 2.0 s, score 95). Field CWV on mobile became "good" for all 66 URLs on Sep 17. | PageSpeed + CWV | The section hero image and home hero background are the LCP. Fix the payload (P1 in the plan), then use properly sized hero images. Home TBT is 250 ms and section TBT is 410 ms, caused by client JS (eligibility dialog, navbar context with all course data). |

## 4. Content findings (from the database)

| # | Finding | Fix |
|---|---|---|
| C1 | **Course pages are thin**: median 178 words of unique text (min 106, max 857). The same boilerplate paragraph ("At RPL FAST TRACK, we turn your real-world experience…") appears on all 67 pages. | New per-course content fields (§6), aiming for 600–1,000 useful words per top page. |
| C2 | **Section `metaDescription`s are copy-paste mistakes.** "Electrotechnology & Air Conditioning" says "*Get certified in **Health and Beauty***". "Health Care" talks about *First Aid and CPR*. "Engineering" describes only one course. "Security & Property Services" talks about real estate. "Commercial Cookery" has a leading space in its title. | Rewrite all 9 (I'll draft them). |
| C3 | Course titles are only "CODE + Name". They don't include "RPL", "Fast Track" or the short form people search ("Cert IV", "Cert 4"). | New title formula: `CPC40920 Cert IV Plumbing & Services via RPL — Fast Track` (≤ 60 chars, then the brand template). I'll draft the top 20. |
| C4 | Several qualification codes may be **superseded** (e.g. CHC43015 Ageing Support, SHB30416 Hairdressing). The Ageing Support page ranks at position 55–75. | **Please check on training.gov.au.** If superseded, update to the current code and 301 the old slug. |
| C5 | Searchers use cost and location words ("cost", "cheap", "melbourne", "sydney", "brisbane": about 12K impressions), but no page mentions price or cities. | No prices (broker model, see §6). Answer cost intent with a generic "What affects the cost of RPL" FAQ and "Free eligibility check" CTA, plus an "Available Australia-wide (NSW, VIC, QLD…)" block. City-specific pages are a possible later step. |

## 5. Priority list (what we fix, in order)

1. **T2 — www canonical.** One constant, 30 minutes of work, and it affects every page.
2. **T3 — redirects for old slugs** and slug history in the admin panel.
3. **P1 from the plan — stop shipping all course HTML on every page.** Fixes home and section LCP and TBT.
4. **T4 — image `sizes`** and robots rule.
5. **C2 + C3 — rewrite titles and descriptions** for the 9 sections and the top 20 courses.
6. **T5 — FAQ, rating and offer schema.**
7. **C1 — new course content fields**, filled for the top 10 pages first:
   Cert IV Plumbing, TAE40122, UEE30820 Electrician, CHC33021 Individual Support, UEE32225 HVAC, CPC40120 Building, CHC52021 Community Services, CPC30220 Carpentry, CPC32420 Plumbing, AUR30620 Light Vehicle.
8. **T1 — section page content.**
9. Design and hero/form work (Phase 2 of the plan).

---

## 6. Database changes I recommend

### Decision: qualification content stays in the database (admin panel)

| | DB + admin panel | Static files (MDX) per qualification |
|---|---|---|
| SEO / speed | **Same.** Pages are statically generated at build time and refreshed by cache tag, so Google gets the same HTML either way. | Same |
| Who can edit | Anyone with admin access, no deploy | Developer only; every edit needs a commit and a deploy |
| 67 qualifications, structured fields (FAQs, who it's for…) | Natural fit: one template, structured data | 67 files with no enforced structure |
| Vercel Hobby | Zero cost after build (tag invalidation only on edit) | Zero cost |

So we keep the **database for qualifications and sections**, with structured fields (below) and a better admin form. Guides were planned as MDX but moved to the DB too (2026-11-06), so the team can edit them in the admin.

### Content rules (broker model)

RPL Fast Track is a referral partner working with **multiple RTOs**. The site therefore:

- shows **no prices** and **no RTO names or logos**;
- says "assessed and issued by a **registered training organisation (RTO)**", never "we issue";
- in `Course` schema, uses the generic provider wording above and no `Offer` price;
- avoids absolute claims ("guaranteed qualification"), which ASQA marketing rules for RTO third parties prohibit. Wording like "Free eligibility check" and "Most applicants complete in X–Y weeks" is fine.

Courses and sections are managed in the admin panel, so the new content needs **new DB fields plus admin form inputs**. All new fields are **optional**, so existing pages keep working while we fill them in gradually.

### `Course` — add

| Field | Type | Purpose |
|---|---|---|
| `heroIntro` | `String?` (rich text) | A unique 2–3 sentence intro that replaces the shared boilerplate paragraph. |
| `whoIsItFor` | `String?` (rich text) | Job titles and the experience that qualify. Matches searches like "rpl electrician". |
| `evidenceExamples` | `String?` (rich text) | What evidence they'll need for *this* qualification. Unique, useful content. |
| `licensingInfo` | `String?` (rich text) | e.g. electrician licence, plumbing licence, or White Card notes. Matches searches like "rpl electrical licence". |
| `duration` | `String?` | e.g. "4–8 weeks". Used in the page, schema and title ideas. |
| `deliveryMode` | `String?` | e.g. "Online assessment, Australia-wide". |
| `searchAliases` | `String[]` | e.g. `["cert 4 plumbing", "cert iv plumbing"]`. Used for site search, related links and checking titles against queries. Not stuffed into meta tags. |
| `imageAlt` | `String?` | Real alt text for the cover image. |
| `isPopular` | `Boolean @default(false)` | "Popular qualifications" on the home page and mega-menu. |
| `status` | enum `CURRENT \| SUPERSEDED` | Supports point C4. Superseded pages show a "replaced by X" notice. |
| `faqs` | relation `CourseFaq[]` | Question and answer pairs, rendered with `FAQPage` schema. |

### `Section` — add

| Field | Type | Purpose |
|---|---|---|
| `metaTitle` | `String?` | The SEO title. The display title stays separate. |
| `intro` | `String?` (rich text) | 200–400 words of real section content (fixes T1). |
| `imageAlt` | `String?` | Alt text. |
| `faqs` | relation `SectionFaq[]` (or a shared `Faq` model with `courseId?`/`sectionId?`) | FAQ schema. |

### New models

```prisma
model Faq {
  id        String   @id @default(cuid())
  question  String
  answer    String           // rich text
  index     Int      @default(0)
  courseId  String?
  sectionId String?
  course    Course?  @relation(fields: [courseId], references: [id], onDelete: Cascade)
  section   Section? @relation(fields: [sectionId], references: [id], onDelete: Cascade)
}

model Redirect {
  id          String   @id @default(cuid())
  fromPath    String   @unique   // "/courses/old-slug"
  toPath      String             // "/courses/new-slug"
  createdAt   DateTime @default(now())
}
```

`Redirect` rows are written **automatically** when a course or section `link` changes in the admin panel. They are applied with `next.config` redirects at build time, or with a cached lookup in the not-found path, so there is no per-request DB hit (staying Hobby-friendly).

### Leads (`Response`, `EligibilitySubmission`) — add

`landingPage`, `utmSource`, `utmMedium`, `utmCampaign`, `gclid`, `fbclid`, `device`. With these you can see **which Google page or Facebook ad produced each paying student**.

---

## 7. What's still missing (optional, but it helps)

You said you can't add more data, which is fine. Everything above is actionable as it is. If any of these become easy later, they would improve the content work:

- **Which courses sell the most**: otherwise I'm ranking pages by search traffic, which is a reasonable proxy.
- **Confirmation of the superseded codes** (C4).
- ~~Primary domain~~: confirmed `www`.
- Vercel bot protection is on (default). Confirm Google gets through: GSC → **URL Inspection** → any course URL → **Test live URL** must show "URL is available to Google" and a rendered screenshot of the real page, not a checkpoint.

---

## 8. Reviews

No review or rating structured data (`Review`, `AggregateRating`, star snippets) is sent to Google. Reviews stay on the site as they are now.
