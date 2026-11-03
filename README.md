# RPL Fast Track

Marketing site and admin for [rplfastrack.com](https://www.rplfastrack.com). Visitors browse qualifications and send an eligibility check or enquiry; the team manages courses, sections, reviews and leads in `/admin`.

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Prisma 6 (PostgreSQL via Prisma Accelerate) · better-auth (Google sign-in) · Upstash Redis · Brevo email · Cloudinary. Hosted on Vercel.

## Setup

Requires Node 20+.

```bash
npm install          # also runs `prisma generate`
cp .env.example .env # then fill in the values
npm run dev          # http://localhost:3000
```

Admin sign-in is Google only, and only for users that already exist in the database with the admin role. Sign-up is disabled.

## Environment

All variables are validated at startup in [`src/env.ts`](src/env.ts); the app fails fast if one is missing. Read `env` from there, never `process.env`.

| Variable                                                                            | Purpose                                              |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `DATABASE_URL`                                                                      | Prisma Accelerate / PostgreSQL connection string     |
| `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`                                             | Session signing and auth base URL                    |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`                                          | Google OAuth for admin sign-in                       |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`                                | Sign-in rate limiting (better-auth)                  |
| `SENDINBLUE_API_KEY`, `SENDER_EMAIL`, `RECEIVER_EMAIL`, `ADMIN_SENDER_EMAIL`        | Lead notification email (Brevo)                      |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`                                       | Image uploads                                        |
| `GA4_PROPERTY_ID`, `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_PROJECT_ID` | GA4 Data API for the admin dashboard                 |
| `CRM_INTAKE_URL`, `CRM_INTAKE_KEY`                                                  | Optional. Lead sync to the CRM is skipped when unset |

Public, non-secret values (site URL, contact details, GA measurement ID, Cloudinary cloud name) are constants in [`src/config/`](src/config/), not env vars. GA only loads when `VERCEL_ENV` is `production`.

## Scripts

| Command                           | What it does                                    |
| --------------------------------- | ----------------------------------------------- |
| `npm run dev`                     | Dev server                                      |
| `npm run build` / `npm start`     | Production build and server                     |
| `npm run lint`                    | ESLint (Next rules + import order)              |
| `npm run typecheck`               | `tsc --noEmit`                                  |
| `npm run format` / `format:check` | Prettier (with Tailwind class sorting)          |
| `npx prisma migrate dev`          | Create and apply a migration locally            |
| `npx prisma migrate deploy`       | Apply pending migrations to the target database |

## Structure

```
src/
  app/          routes: (main) public site, (admin) dashboard, (auth) sign-in, api/
  features/     per-domain data: queries.ts (cached reads), actions.ts (mutations)
  server/       server-only infra: db, auth, mail, crm, cloudinary, admin guard
  config/       site constants, cache tags, redirects
  components/   shared UI (shadcn/ui in components/ui)
  lib/          pure helpers (url, seo, utils)
  env.ts        validated environment
prisma/         schema and migrations
docs/           project plan, analysis, conventions
```

See [`docs/CONVENTIONS.md`](docs/CONVENTIONS.md) for naming, data-layer and SEO rules.

## Deploy

Pushes to `main` deploy to production on Vercel; other branches get preview deployments. Set the variables above in the Vercel project. Run `npx prisma migrate deploy` against production before deploying a change that includes a new migration.
