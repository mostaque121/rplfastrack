# Design tokens

Defined in `src/app/globals.css` (`:root` values, mapped to Tailwind in `@theme inline`). Use the token classes (`text-brand`, `bg-ink`, …), not raw `emerald-*`/`gray-900` classes or hex values.

## Colours

| Token | Value | Use |
|---|---|---|
| `brand` | `#047857` | Links, brand headings, icons, standard buttons (white text) |
| `brand-strong` | `#065f46` | Hover / pressed state of `brand` |
| `brand-deep` | `#064e3b` | Dark brand panels |
| `brand-soft` | `#ecfdf5` | Tinted section backgrounds, callouts |
| `brand-subtle` | `#d1fae5` | Chips, icon wells, light borders |
| `brand-bright` | `#34d399` | Brand text **only on `ink`, `brand-deep` or dark photos** |
| `ink` | `#0b1f3a` | Headings (deep navy); top bar, footer, dark sections |
| `surface` | `#f5f7fa` | Light grey page sections |
| `cta` | = `brand` | Primary call to action: lead-form submit buttons (white text). Orange `#c2410c` was tried and dropped: it clashed with navy + green |
| `cta-strong` | = `brand-strong` | Hover of `cta` |
| `muted-foreground` | `oklch(0.5 0 0)` | Secondary text (was 0.556: failed on `surface`) |
| `ring` | = `brand` | Focus rings |

Body text stays on Tailwind neutrals `gray-600`/`gray-700`/`slate-700` (all ≥ 7:1 on white). Success/warning/error states keep `green-*`, `amber-*`, `red-*`.

## Measured contrast (WCAG AA: 4.5:1 normal text, 3:1 large text and UI)

| Text | Background | Ratio |
|---|---|---|
| `brand` | white / `surface` / `brand-soft` / `brand-subtle` | 5.48 / 5.11 / 5.21 / 4.84 |
| `brand-strong` | white / `brand-subtle` | 7.68 / 6.78 |
| white | `brand` / `brand-strong` / `brand-deep` | 5.48 / 7.68 / 9.72 |
| `ink` | white / `surface` / `brand-soft` / `brand-subtle` | 16.5 / 15.4 / 15.7 / 14.6 |
| white / `slate-300` / `slate-400` | `ink` | 16.5 / 11.1 / 6.4 |
| `brand-bright` | `ink` / `brand-deep` | 8.59 / 5.06 |
| `muted-foreground` | white / `surface` | ≈ 5.9 / ≈ 5.5 |
| `gray-600` | white / `surface` | 7.56 / 7.04 |

Not allowed: `brand-bright` on white or light backgrounds (decorative bars only), white text on `brand-bright`/`brand-subtle`.

## Fonts

- `font-sans`: Geist (body)
- `font-display`: Plus Jakarta Sans, applied to `h1`–`h3` in the base layer
- `font-mono`: Geist Mono

## Scope

Public pages (`src/app/(main)`) and shared components use tokens. The admin keeps its own shadcn neutrals (`primary` is unchanged) and the invoice styling. There is no dark mode: the `.dark` theme and `dark:` classes were removed.
