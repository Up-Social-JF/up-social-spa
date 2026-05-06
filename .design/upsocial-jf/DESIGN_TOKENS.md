# Design Tokens: UpSocial by JF

**Live source of truth:** `src/index.css`. This file is documentation only — do not edit it for token changes; edit `src/index.css` and update this doc in lockstep.

**Philosophy:** Editorial Minimal — premium fashion magazine, photography-led. Sharp corners, generous whitespace, dramatic type scale, restrained motion. Plus Jakarta Sans throughout (no serif). Square-leaning radii (0.125–0.5rem max). Olive `#64725F` is the trademark constant across both themes.

## Theme architecture

Two themes are declared as **CSS classes on `<html>`**, not as media queries:

| Class          | Default?  | Background           | Foreground           | Accent (display ≥24px) | Accent (body-size readable) |
| -------------- | --------- | -------------------- | -------------------- | ---------------------- | --------------------------- |
| `.theme-beige` | ✓ default | `#f0efe9` off-white  | `#0a0a0a` near-black | `#64725F` olive        | `#3f4b3b` olive-deep        |
| `.theme-dark`  |           | `#0a0a0a` near-black | `#f0efe9` off-white  | `#64725F` olive        | `#74816d` olive-readable    |

- **Hydration** is synchronous — an inline script in `index.html` reads `localStorage["upsocial-theme"]` and applies the class **before first paint**, so there is no flash of unthemed content.
- **No `prefers-color-scheme`** auto-detection. Default is always Beige; users opt into Dark via the footer-edge ThemeToggle.
- **Storage key:** `upsocial-theme` (values: `"beige"` | `"dark"`).
- **Theme switch:** Triggered by the ThemeToggle (a subtle circle anchored at the footer edge). On click: read button bounding rect → write `--theme-wipe-x` / `--theme-wipe-y` to `<html>` → call `document.startViewTransition(() => toggleClass)`. The CSS keyframe `theme-wipe-in` reveals the new theme as a circular clip-path expanding from the toggle's coordinates over `--duration-slower` (600ms) with `--easing-editorial` (`cubic-bezier(0.65, 0, 0.35, 1)`).

## Color tokens (semantic)

All component code references **semantic** tokens, never raw brand constants. Raw constants (`--ink`, `--paper`, `--accent`) are referenced only inside the theme blocks of `index.css`.

### Surface

- `--color-bg-primary` — page background
- `--color-bg-secondary` — card / subtle differentiation surface
- `--color-bg-tertiary` — recessed surface (input wells, secondary buttons)
- `--color-bg-inverse` — opposite-theme surface (used for inverted CTA banner)

### Text

- `--color-text-primary` — body
- `--color-text-secondary` — supporting copy, captions
- `--color-text-tertiary` — placeholder, disabled, fine print
- `--color-text-inverse` — text on inverse-bg surfaces
- `--color-text-link` — link color, resolves to `--accent-readable`

### Border

- `--color-border-primary` — default rules and dividers
- `--color-border-secondary` — subtle dividers
- `--color-border-focus` — focus rings (always olive `#64725F`)

### Accent (trademark)

- `--accent` — raw olive, ≥24px display only (does not pass AA at body size on beige)
- `--accent-deep` — darker olive `#3f4b3b` on beige (passes AA on `#f0efe9`)
- `--accent-readable` — context-derived readable accent. On beige = `--accent-deep`; on dark = `#74816d` (passes AA on `#0a0a0a`).
- `--color-accent-primary-hover` / `-active` — interactive states

### Status

- `--color-status-success`, `-warning`, `-error`, `-info`

## Type ramp (fluid)

All sizes use `clamp()` — they scale fluidly between mobile and desktop without breakpoint jumps.

| Token              | Min → Max   | Usage                           |
| ------------------ | ----------- | ------------------------------- |
| `--font-size-xs`   | 12 → 12.8px | captions, kicker labels, badges |
| `--font-size-sm`   | 14 → 15px   | small body, footer text         |
| `--font-size-base` | 16 → 17.3px | body                            |
| `--font-size-md`   | 18 → 20px   | lead body, large list items     |
| `--font-size-lg`   | 20 → 24px   | H4, accent-color minimum        |
| `--font-size-xl`   | 24 → 32px   | H3                              |
| `--font-size-2xl`  | 32 → 44px   | H2                              |
| `--font-size-3xl`  | 44 → 68px   | H1 (inner pages)                |
| `--font-size-4xl`  | 64 → 116px  | Hero display                    |

**Weights**: Plus Jakarta Sans `300 / 450 / 600 / 700`. Body defaults to `300` (light) — the editorial register.

**Tracking**: `--letter-spacing-tight: -0.055em` for hero displays; `-0.015em` default; `0.12em` for kicker labels and small caps.

## Spacing (4px base, generous editorial multipliers)

```
--space-0   0
--space-1   2px
--space-2   4px
--space-3   8px
--space-4   12px
--space-5   16px
--space-6   24px
--space-7   32px
--space-8   48px
--space-9   64px
--space-10  96px   ← section gutters
--space-11  128px  ← hero / large editorial breathing
--space-12  192px
```

Section vertical padding: `--space-10` desktop, `--space-9` tablet, `--space-8` mobile.
Outer page gutters: 64px desktop, 40px tablet, 24px mobile.

## Layout

- `--max-width-content` — 42rem (672px), the editorial reading column
- `--max-width-wide` — 72rem (1152px), main content area
- `--max-width-page` — 90rem (1440px), outer page cap

## Radius (square-leaning)

- `--border-radius-sm` — 2px
- `--border-radius-md` — 4px (default)
- `--border-radius-lg` — 8px (cards, sheets)
- `--border-radius-full` — 9999px (theme toggle, avatars)

## Motion

| Token                | Value                               | Usage                       |
| -------------------- | ----------------------------------- | --------------------------- |
| `--duration-instant` | 50ms                                | hover state changes         |
| `--duration-fast`    | 150ms                               | button press, focus ring    |
| `--duration-normal`  | 250ms                               | nav transitions, panel open |
| `--duration-slow`    | 400ms                               | section fade-in, modal      |
| `--duration-slower`  | 600ms                               | theme wipe                  |
| `--easing-default`   | `cubic-bezier(0.4, 0, 0.2, 1)`      | most transitions            |
| `--easing-editorial` | `cubic-bezier(0.65, 0, 0.35, 1)`    | reveals, wipe               |
| `--easing-bounce`    | `cubic-bezier(0.34, 1.56, 0.64, 1)` | rare playful overshoot      |

All motion respects `prefers-reduced-motion: reduce` (collapsed to 1ms).

## Breakpoints

```
--breakpoint-sm   375px  ← mobile
--breakpoint-md   768px  ← tablet
--breakpoint-lg   1024px ← small desktop
--breakpoint-xl   1280px ← desktop
--breakpoint-2xl  1536px ← wide desktop
```

## Tailwind v4 bridge

The `@theme inline` block in `src/index.css` re-exposes every token as a Tailwind utility. So `bg-background`, `text-foreground`, `text-foreground-secondary`, `border-border`, `font-display`, `text-3xl`, `ease-editorial`, `duration-slower` etc. all resolve to the tokens above.

**Use Tailwind classes in components**, not raw CSS variables, except where Tailwind doesn't have a utility (e.g. `--accent-readable` for inline color when needed: `style={{ color: 'var(--accent-readable)' }}`).

## Accessibility-derived rules

- **Body-size brand-color text** must use `--accent-readable`, never `--accent`.
- **Focus rings** are 2px olive with 3px offset + a subtle 2px alpha-olive box-shadow halo.
- **Selection** color is olive on near-black foreground (overrides browser default).
- **Touch targets** ≥44×44px on mobile (enforced per-component).
- **Reduced motion** disables: theme wipe, scroll-into-view fades, parallax, page transitions, all CSS animations.

## Asset notes

Two SVG logos are in `public/`:

- `logo-wide.svg` — white "UpSocial" wordmark for **dark backgrounds**
- `logo.svg` — JF monogram on dark rounded square, used as **favicon** and on light-bg surfaces

The wordmark in nav needs theme-aware swapping: on `.theme-beige` we either use a dark variant SVG (Phase 6 will add it) or use `currentColor` SVG paths so the existing wordmark adapts to context. Phase 6 picks the cleaner approach.

## Out of scope (tokens deliberately not defined)

- No serif type stack (brand uses sans only).
- No gradient tokens (editorial = flat surfaces; the body radial gradient in `.theme-beige` is decorative not tokenized).
- No data-viz palette (no charts at launch).
- No print stylesheet tokens.
- No high-contrast mode override (deferred until needed).
