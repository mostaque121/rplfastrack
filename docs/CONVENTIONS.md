# Code Conventions & Folder Structure

How this codebase is organised. Follow it for every new file. The goal is that any Next.js developer can open the repo and guess where something lives.

---

## 1. Target folder structure

```
rplfasttrack/
├─ docs/                         # Plans, conventions, exported data (data/ is git-ignored)
├─ prisma/                       # schema.prisma, migrations
├─ public/                       # Static, pre-optimised assets only (AVIF/WebP/SVG)
│  ├─ images/                    # Page images, grouped by page: images/home/hero.avif
│  └─ icons/
├─ content/
│  └─ (guides live in the DB; source drafts in docs/content/guides/)
└─ src/
   ├─ app/                       # ROUTING ONLY: pages, layouts, route handlers, metadata
   │  ├─ (marketing)/            # Public site (was (main))
   │  │  ├─ layout.tsx
   │  │  ├─ page.tsx             # Home
   │  │  ├─ courses/[slug]/page.tsx
   │  │  ├─ industries/[slug]/page.tsx    # (was section/[link], add 301 redirects)
   │  │  ├─ guides/[slug]/page.tsx
   │  │  └─ ...
   │  ├─ (auth)/signin/page.tsx
   │  ├─ (admin)/admin/...       # Admin pages
   │  ├─ api/                    # Route handlers only
   │  ├─ layout.tsx              # Minimal: <html>, fonts, globals.css
   │  ├─ sitemap.ts  robots.ts  manifest.ts
   │  └─ globals.css
   │
   ├─ features/                  # Business features: UI + logic that belong together
   │  ├─ leads/                  # Response + eligibility forms, quiz
   │  │  ├─ components/          # lead-form.tsx, eligibility-quiz.tsx
   │  │  ├─ actions.ts           # "use server" mutations
   │  │  ├─ schema.ts            # Zod schemas
   │  │  └─ types.ts
   │  ├─ courses/
   │  │  ├─ components/          # course-card.tsx, course-hero.tsx
   │  │  ├─ queries.ts           # Cached reads (server-only)
   │  │  └─ types.ts
   │  ├─ reviews/
   │  ├─ invoices/               # Admin-only features live here too
   │  ├─ payments/
   │  └─ analytics/
   │
   ├─ components/                # Shared UI not tied to one feature
   │  ├─ ui/                     # shadcn primitives (generated, don't hand-edit style)
   │  ├─ layout/                 # navbar, footer, mobile-cta-bar
   │  ├─ sections/               # Reusable page blocks: hero, faq, cta-band, trust-bar
   │  └─ seo/                    # json-ld.tsx
   │
   ├─ config/                    # CONSTANTS (see §3)
   │  ├─ site.ts                 # name, url, locale, default OG image
   │  ├─ contact.ts              # phone, email, address, whatsapp
   │  ├─ social.ts
   │  ├─ navigation.ts           # menu + footer links
   │  ├─ seo.ts                  # default metadata, title template
   │  └─ cache-tags.ts           # every cache tag in one place
   │
   ├─ server/                    # Server-only infrastructure
   │  ├─ db.ts                   # Prisma client
   │  ├─ auth.ts                 # better-auth server
   │  ├─ mail.ts
   │  ├─ crm.ts  hubspot.ts
   │  └─ cloudinary.ts
   │
   ├─ lib/                       # Pure helpers, safe on client and server
   │  ├─ utils.ts                # cn()
   │  ├─ url.ts                  # absoluteUrl()
   │  ├─ format.ts               # dates, currency (en-AU, AUD)
   │  └─ seo.ts                  # buildMetadata(), schema builders
   │
   ├─ hooks/                     # Shared client hooks (use-mobile.ts)
   ├─ types/                     # Global/shared types only
   ├─ env.ts                     # Zod-validated SECRETS (see §3)
   └─ proxy.ts                   # (Next 16 middleware)
```

### Rules

1. **`app/` only does routing.** A `page.tsx` fetches data and composes components. Business logic and large JSX belong in `features/` or `components/`.
2. **Where does a component go?**
   - Used by one route only: `app/.../_components/` (the underscore makes it a private folder, not a route).
   - Belongs to a business concept (courses, leads): `features/<name>/components/`.
   - Generic and reused everywhere: `components/`.
3. **Reads vs writes.**
   - Reads: `features/*/queries.ts` with `import "server-only"`, cached with `'use cache'` + `cacheTag()` (or `unstable_cache` until we enable `cacheComponents`), and wrapped in React `cache()` for per-request dedupe.
   - Writes: `features/*/actions.ts` with `"use server"`. Validate with Zod, check auth, then call `updateTag()` with tags from `config/cache-tags.ts`.
   - Never use `"use server"` actions for reads.
4. **`server/` is never imported by client components.** Every file starts with `import "server-only"`.
5. **No barrel `index.ts` files** in large folders. They slow builds and break tree-shaking. Import directly.

---

## 2. Naming

| Thing | Convention | Example |
|---|---|---|
| Files & folders | `kebab-case` | `eligibility-quiz.tsx`, `cache-tags.ts` |
| React components | `PascalCase` export | `export function EligibilityQuiz()` |
| Hooks | `use-*.ts`, `useCamelCase` | `use-mobile.ts` → `useIsMobile` |
| Constants | `UPPER_SNAKE` for primitives, `camelCase` `as const` objects | `SITE_URL`, `contactInfo` |
| Types | `PascalCase`, no `I` prefix | `CourseSummary` |
| Route segments | lowercase, SEO-friendly words | `/courses/[slug]` |
| Server actions | verb first | `createLead`, `updateCourse` |
| Queries | `get*` / `list*` | `getCourseBySlug`, `listSections` |

Prefer **named exports** for components and functions. Use default exports only where Next.js requires them (`page`, `layout`, `route`, etc.).

---

## 3. Constants vs environment variables

**Rule:** if the value is a **secret** or **changes between environments**, it's an env var. Otherwise it's a **constant in `src/config/`**, committed to git and type-safe.

| Value | Where |
|---|---|
| Site URL, name, locale | `config/site.ts` |
| Phone, email, address, WhatsApp number | `config/contact.ts` |
| Facebook / social URLs | `config/social.ts` |
| GA4 measurement ID (public anyway) | `config/site.ts` |
| Cloudinary **cloud name** (public) | `config/site.ts` |
| `DATABASE_URL`, auth secrets, API keys, Redis tokens, CRM key, HubSpot token, Brevo key, Google service account | `.env` → validated in `src/env.ts` |

```ts
// src/config/site.ts
export const siteConfig = {
  name: "RPL Fast Track",
  url: "https://rplfastrack.com",
  locale: "en_AU",
  gaId: "G-XXXXXXX",
  ogImage: "/images/og-default.jpg",
} as const;

// src/config/contact.ts
export const contactInfo = {
  phone: "+61 ...",
  phoneHref: "tel:+61...",
  email: "info@rplfastrack.com",
  whatsapp: "61...",
  address: "...",
} as const;
```

```ts
// src/env.ts  (server-only, fails the build if something is missing)
import "server-only";
import { z } from "zod";

export const env = z
  .object({
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    CRM_INTAKE_URL: z.string().url(),
    CRM_INTAKE_KEY: z.string().min(1),
    // ...
  })
  .parse(process.env);
```

**Do not read `process.env` anywhere except `src/env.ts`.** Import `env` instead.

---

## 4. Data & caching (Vercel Hobby friendly)

- Public pages are static. Add `generateStaticParams` to dynamic routes.
- Every cached read has a tag from `config/cache-tags.ts`:

```ts
export const cacheTags = {
  sections: "sections",
  section: (slug: string) => `section:${slug}`,
  course: (slug: string) => `course:${slug}`,
  reviews: "reviews",
} as const;
```

- Admin mutations call `updateTag(cacheTags.course(slug))`. Never use `revalidatePath` with hand-typed paths.
- Use `select` with only the fields the UI needs. **Never send full course HTML to client components.**
- Use no time-based `revalidate` on public pages.

---

## 5. Components & styling

- Server Components by default. Add `"use client"` to the **smallest** leaf that needs state or effects.
- Heavy client-only UI (dialogs, editors, charts) uses `next/dynamic`.
- Use Tailwind design tokens in `globals.css` `@theme` (`bg-brand`, `text-brand-foreground`) instead of raw `bg-emerald-600` in components.
- Use `cn()` for conditional classes.
- Every `<Image fill>` has `sizes`. Only the LCP image has `priority`.
- Forms use react-hook-form + a Zod schema shared with the server action.

## 6. SEO

- Use one `buildMetadata({ title, description, path, image })` helper. It sets canonical, OG and Twitter consistently.
- Render JSON-LD through `<JsonLd data={...} />` in `components/seo/`.
- Every indexable page has a unique title (≤ 60 chars), a description (≤ 155 chars), one H1 and a canonical.

## 7. Tooling

- `npm run lint` and `npm run typecheck` (`tsc --noEmit`) must pass before merging.
- Use Prettier with `prettier-plugin-tailwindcss` for class ordering.
- Commits: short imperative messages (`fix: course revalidation tags`).
