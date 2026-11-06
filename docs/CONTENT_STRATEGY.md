# Content Strategy

> Built from the Search Console query export (16 months, about 1,000 queries) plus the current DB content.
> Rules: no prices, no RTO names, no review/rating schema (see [ANALYSIS.md](./ANALYSIS.md)).
> Last updated: 2026-11-04

---

## 1. The strategy in one paragraph

Every qualification page should become **the best single answer to "can I get [qualification] through RPL, fast and online?"**. Each page targets three query families: **"[qualification] fast track"** (we already win these), **"[qualification] RPL"** (we sit on page 1–2), and **"[qualification] online"** (we're at position 40–90, the biggest untapped pool). Section pages become **category hubs** linking to their qualifications. A small set of **guides** captures the informational searches ("what is RPL", "how to get an electrical licence through RPL") and links people to the qualification pages. Everything links to everything relevant, and each page answers its questions plainly enough for Google, AI Overviews and chat assistants to quote.

---

## 2. What the queries tell us

### 2.1 Demand by qualification (16 months)

| Cluster | Impressions | Clicks | Avg pos | Read |
|---|---|---|---|---|
| Individual support / aged care | **38,900** | 151 | **57.9** | Biggest demand and our weakest ranking. CHC43015 may be superseded. |
| TAE (training & assessment) | 35,200 | **590** | 33.8 | Wins "fast track", loses "online" and generic queries. |
| **Plumbing Cert IV** | 24,800 | 134 | **11.2** | Closest to page 1: fastest win. |
| Generic "RPL" | 14,300 | 21 | 38.6 | Home page plus a "What is RPL" guide. |
| Cookery / chef | 14,000 | 75 | 30.8 | |
| Electrician | 13,900 | 224 | 27.5 | Licence intent ("rpl electrical licence", 1,120 impressions, pos 8). |
| Security | 11,000 | 17 | 38.5 | Licence intent too. |
| Building Cert IV | 10,600 | 184 | 38.9 | |
| Carpentry / Mechanic / HVAC / Massage | 8–9K each | 49–166 | 25–32 | |
| Mental health, real estate, accounting | 3–6K each | < 10 | 54–65 | Low priority. |

### 2.2 Modifiers people use

| Modifier | What it means | How we answer |
|---|---|---|
| **"fast track" / "quick" / "fastest"** | Speed | Typical duration, the process timeline, "how fast can I get it". We already rank, so keep it in titles. |
| **"rpl"** | Already knows the route | Eligibility, evidence and the steps for this qualification. |
| **"online"** (≈ 15K impressions, pos 40–90) | Wants to avoid a classroom | Say clearly and early: "100% online assessment, Australia-wide". Use "online" in the title and H1 where it fits. |
| **"cost" / "cheap" / "free" / "fee free"** | Price-sensitive | **No prices.** Answer with an FAQ: "What does RPL cost?" covering what affects cost, why RPL is usually cheaper than full study, and the free eligibility check. |
| **"licence" / "license"** + state | Trades needing a licence | Licensing section on trade pages and one guide per licensed trade. |
| **City / state** (Melbourne 4.9K, Brisbane 2K, Sydney 1.7K) | Local reassurance | "Available in NSW, VIC, QLD, WA, SA, TAS, ACT, NT" block plus state-specific notes where licensing differs. No city pages for now. |
| Long questions ("which rtos deliver chc52021 online nationally and offer rpl?") | AI-style queries | Clear Q&A blocks: one question, a 2–3 sentence direct answer. |

---

## 3. Page types and what goes on them

### 3.1 Qualification (course) page: the main money page

**Title formula** (max 60 characters before the ` | RPL Fast Track` template):
`{CODE} {Short name} RPL — Fast Track & Online`
e.g. `CPC40920 Cert IV Plumbing RPL — Fast Track & Online`.
Use the short form people actually search ("Cert IV", "Cert 4"); the full official name goes in the H1.

**H1:** `{CODE} {Full official name} through RPL`

**Meta description** (≤ 155 characters): the outcome, "online" and the free check.
e.g. *"Turn your plumbing experience into a CPC40920 Cert IV in Plumbing & Services through RPL. 100% online assessment, Australia-wide. Free eligibility check."*

**Page sections, in order** (DB field in brackets):

| # | Section | Content | Words |
|---|---|---|---|
| 1 | Hero | H1, unique intro (`heroIntro`), 3 bullets (online, timeframe, nationally recognised), lead form | 50–80 |
| 2 | Quick facts box | Code · Level · Typical duration (`duration`) · Delivery: online assessment · Issued by: a registered training organisation | — |
| 3 | Who this is for | Job titles, typical years of experience, sample work history (`whoIsItFor`) | 120–200 |
| 4 | Can I get it through RPL? | Eligibility in plain words, with a "Check my eligibility" CTA | 80–120 |
| 5 | Evidence you'll need | Trade-specific examples: photos of jobs, payslips, references, licences, tickets (`evidenceExamples`) | 120–200 |
| 6 | Licensing (trades only) | How this qualification relates to licensing, with state differences (`licensingInfo`) | 100–200 |
| 7 | The RPL process for this qualification | 4 steps with typical timing (shared component plus per-course timing) | shared |
| 8 | Career outcomes | Job roles (existing `jobOpportunity`) | existing |
| 9 | Units | Core and elective (existing). Collapsed by default so they don't push other content down. | existing |
| 10 | FAQs | 4–6 per course (`faqs`) with `FAQPage` schema | 250–400 |
| 11 | Related qualifications | Same section plus the next level up (e.g. Cert III → Cert IV) | — |
| 12 | Final CTA | Eligibility check | — |

**Target: 700–1,000 unique words** on the top pages. That is up from a median of 178. The shared blocks (process, documents) stay, but they don't count as unique content.

**Standard FAQ set** (adapt per course, write answers specific to the trade):
1. Can I get {qualification} through RPL?
2. How long does RPL for {qualification} take?
3. Can I do it 100% online?
4. What evidence do I need?
5. What does RPL for {qualification} cost? *(factors, no figures)*
6. Is it the same qualification as studying it full-time? *(yes: same nationally recognised qualification)*
7. *(Trades)* Does this get me a licence in {state}?
8. *(Where relevant)* I worked overseas. Can my experience count?

### 3.2 Section (industry) page: category hub

Currently gets **no** traffic. It becomes the page that ranks for "RPL {industry}" and "{industry} qualifications".

- **Title:** `RPL {Industry} Qualifications — Fast Track Online` (new `metaTitle` field)
- **Intro** (`intro`, 250–400 words): who RPL suits in this industry, and how to choose a level.
- **"Which qualification is right for me?"** table: qualification · level · typical role · typical experience.
- Qualification cards, ordered by popularity.
- **Section FAQs** (3–5).
- Fix all 9 `metaDescription`s (several are currently wrong).

### 3.3 Home page

Ranks only for the brand at the moment. Goal: compete for "RPL Australia", "RPL certificate", "RPL courses Australia" (about 14K impressions at pos 38).

- H1: *"Get a Nationally Recognised Qualification Through RPL — Fast & Online"*
- Popular qualifications grid (`isPopular`), with industries below it.
- Short "What is RPL?" block linking to the full guide.
- How it works (4 steps), an "RPL vs studying" comparison, FAQ, CTA.

### 3.4 Guides (`/guides`, stored in the DB)

> **Done 2026-11-06: guides 1–8 are live.** The user chose the DB over MDX so guides can be edited in the admin (Content → Guides). Source files: `docs/content/guides/guides.json` (metadata, linked courses, FAQs) plus `{slug}.html` (body). `scripts/import-guides.mts` checks links and writes them (dry run by default, `--write` to apply; re-running overwrites admin edits). Cover photos are CC0 stock from StockSnap in `public/images/guides/` (CC0, no credit needed or shown). Guides 9–10 are still to write.

Each guide targets an informational query and links to 2–5 qualification pages. Planned list, by priority:

| # | Guide | Target queries (16-month impressions) |
|---|---|---|
| 1 | **What is RPL? A plain-English guide for Australians** | what is rpl, what is a rpl, what is rpl certificate, why is rpl important (≈ 1,800) |
| 2 | **How to get RPL in Australia: step by step** | how to get rpl in australia, how to get rpl certificate, rpl certificate australia (≈ 2,100) |
| 3 | **How much does RPL cost? What affects the price** | rpl certificate cost, rpl cost australia, cheap rpl, cert 4 plumbing cost (≈ 1,900). Explains the factors and gives no figures. |
| 4 | **Getting your electrical licence through RPL** (state by state) | rpl electrical licence, rpl electrician (≈ 2,500) |
| 5 | **Plumbing licence through RPL: Cert III vs Cert IV explained** | plumbing licence course victoria, rpl plumbing license, cert 4 plumbing (supports the biggest win) |
| 6 | **Can you do RPL online?** | rpl online, "[qual] online" family (supports ≈ 15K "online" impressions) |
| 7 | **Evidence for RPL: what to collect and how** | supports every course page |
| 8 | **RPL vs apprenticeship vs TAFE** | comparison intent |
| 9 | **Using overseas work experience for RPL** | overseas and migrant questions (also useful for FB ad traffic) |
| 10 | **Becoming a trainer and assessor: TAE40122 through RPL** | supports the TAE cluster (35K impressions) |

Write them all during the build, alongside the course content. Each one is 1,200–2,000 words with a "Last updated" date and FAQs at the end.

---

## 4. Supporting tactics

1. **Internal linking.** Course pages link to their section, related courses and 1–2 guides. Guides link to courses using the query as anchor text ("Cert IV Plumbing RPL"). The home page links to popular courses and sections. The footer links to the top 8 courses.
2. **Freshness.** Show "Updated {month year}" on course and guide pages (from `updatedAt`). Review the top 10 pages every quarter.
3. **Trust without naming RTOs.** Use "Assessed and issued by a registered training organisation", the national recognition wording, a clear 4-step process, real contact details, and a well-filled About page. No review or rating markup.
4. **Superseded codes.** Check the codes for every course on training.gov.au. Where a code is superseded, update it, add a 301 from the old slug, and mention "replaces {old code}" on the page. People still search old codes.
5. **Snippet and AI-friendly formatting.** Answer the question in the first sentence under each heading. Use real `<h2>`/`<h3>` headings, short paragraphs, lists and tables.
6. **One page per intent.** Don't create separate "online" pages. The course page covers "online" itself, so we avoid duplicate and cannibalised pages.

---

## 5. Order of work

Priority = demand × how close we are to page 1 × business value. The waves set the order only; there is no waiting between them (see PROJECT_PLAN §7).

**Wave 1 — top 10 qualifications** (full template, FAQs, new title and description):

1. CPC40920 Cert IV Plumbing & Services *(pos 11, 24.8K impressions: fastest win)*
2. TAE40122 Cert IV Training & Assessment
3. UEE30820 Cert III Electrotechnology Electrician
4. CHC33021 Cert III Individual Support
5. UEE32225 Cert III Air Conditioning & Refrigeration
6. CPC40120 Cert IV Building & Construction
7. CHC52021 Diploma of Community Services
8. CPC30220 Cert III Carpentry
9. CPC32420 Cert III Plumbing
10. CHC43015 / current-code Cert IV Ageing Support *(confirm code first)*

**Wave 2:** all 9 section pages, plus guides 1–4.
**Wave 3:** the next 20 courses (cookery, mechanic, security, massage, tiling, bricklaying, painting, community services, childcare), plus guides 5–10.
**Wave 4:** the remaining courses get a title and description rewrite plus FAQs (lighter template).

## 6. Workflow

> **Done 2026-11-05 for all 67 courses.** Content lives in `docs/content/courses/{section}.json`; official codes, packaging rules and units in `_official.json` (from `scripts/fetch-tga.mts`, re-run quarterly). `scripts/import-course-content.mts` writes both to the DB (dry run by default, `--write` to apply), including renames with 301s for superseded codes. Edit the JSON and re-import, or edit in the admin panel. The JSON doesn't sync back from admin edits.

1. I draft each course's content (title, description, intro, who it's for, evidence, licensing, FAQs) into `docs/content/courses/{slug}.md`.
2. You review and correct it, especially licensing and durations. You know the real process.
3. You paste it into the admin panel. Optionally, I write a one-time import script.
4. After publishing, use Search Console → URL Inspection → **Request indexing** for that URL.

## 6a. New qualifications and research

The user supplies a list in `docs/content/qualification-list.md` (code or name, plus section). For **every** qualification, new or existing:

| Data | Source | Who |
|---|---|---|
| Official code and title, **current or superseded** (and what replaced it) | training.gov.au | Researched by Claude |
| Packaging rules, core and elective units, entry requirements | training.gov.au | Researched (facts copied; descriptions rewritten, never pasted, so the text isn't duplicated) |
| Job roles / career outcomes | training.gov.au, Jobs and Skills Australia | Researched |
| Licensing notes per state (trades) | State regulators (e.g. Energy Safe VIC, QBCC, NSW Fair Trading) | Researched and **flagged for user check** |
| Intro, who it's for, evidence examples, FAQs, title and description | — | Written by Claude using §3.1 |
| Typical duration | — | **User confirms** (varies by RTO) |
| Cover image (one per course, optional) | — | User uploads through the admin panel. Without one, the course shows its section's image. |

Output: `docs/content/courses/{slug}.md` (readable for review) plus `{slug}.json` (for a one-time import script that creates or updates courses). Every draft lists its sources and an "unverified" list.

Search demand hints for new qualifications (from GSC): CPP40719 Cert IV Security Management (1.5K impressions), CPP41519 Cert IV Security Risk Analysis (1.3K), CPP50619 Diploma Security Risk Management (0.8K). People still search old codes (TAE40116 → TAE40122 "upgrade", UEE30811 → UEE30820, UEE32220 → UEE32225), so pages mention "replaces {old code}".

## 7. How we measure

Track each Wave 1 page weekly in Search Console (Pages filter): position, CTR and clicks. Rankings take about **4–8 weeks** to move after a content change.

| Metric | Now | Target (3 months after Wave 1) |
|---|---|---|
| Monthly clicks | 656 (Oct) | 1,200+ (back to the May peak) |
| Avg position, Wave 1 pages | 11–58 | top 10 for "fast track" and "rpl" queries |
| Section pages in GSC top pages | 0 | all 9 |
| "online" query clicks | ≈ 50 / 16 months | 100+ / month |
