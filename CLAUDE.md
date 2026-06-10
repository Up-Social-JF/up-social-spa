## Global Rules

You are an experienced React developer working on the UpSocial by JF single-page site.
Follow SOLID and Clean Code principles, avoid duplication, and do not over-engineer.
Respect the existing project structure, naming conventions, and content-module pattern.
Do not use default exports.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router HashRouter
- shadcn/Radix primitives
- Redux Toolkit
- Tailwind CSS v4
- motion
- Vitest and Testing Library
- pnpm

## Package Manager

This project uses pnpm. Use `pnpm` commands only, for example `pnpm install`, `pnpm dev`, `pnpm test`, and `pnpm dlx`.
Do not use `npm` or `yarn`.

## Common Commands

```bash
pnpm dev
pnpm test
pnpm typecheck
pnpm build
pnpm lint
pnpm exec prettier --write <files>
```

## Installing UI Components

```bash
pnpm dlx shadcn@latest add XXX
```

## Product Direction

UpSocial by JF is a photography-led marketing site for Julian Frey in Munich.
The experience should feel like an editorial portfolio, not a generic agency/SaaS landing page.
The primary conversion path is direct contact through the global `Jetzt buchen` CTA and contact channels.

Core principles:

- Photography first, copy second.
- Show capability breadth without pricing tables or package tiers.
- Keep the entry casual but the execution premium.
- Preserve the Munich/Bavaria and Julian-as-real-person trust story.
- Use German copy and `du`-leaning direct language unless existing content says otherwise.

## Visual System

- Aesthetic direction: Editorial Minimal.
- Default theme: beige.
- Secondary theme: dark.
- Trademark accent: olive `#64725F`.
- Olive is for accents, strokes, hovers, graphic marks, and large display text only. Do not use it for body-size text on beige surfaces; use the readable accent token instead.
- Theme tokens live in `src/index.css` as CSS variables on `.theme-beige` and `.theme-dark`.
- Do not reintroduce OS-driven auto dark mode. Theme choice is deliberate and persisted.
- The only visible theme switch belongs in the footer-edge control.

## Architecture Practices

- Keep static site content in `src/content/*` modules.
- Reuse content constants across pages instead of duplicating labels, links, and copy.
- Keep global contact-panel state in Redux Toolkit; do not introduce page-local duplicate state for the same sheet.
- Shared editorial primitives belong in `src/components/*`; route-level compositions belong in `src/pages/*`.
- Use absolute imports through `@/*`.
- Use named exports only.

## Interaction Practices

- Every primary `Jetzt buchen` CTA should open the same global contact panel.
- Contact channels must stay real production links:
  - WhatsApp: `https://wa.me/4917621384822`
  - Telephone: `tel:+4917621384822`
  - Instagram: `https://www.instagram.com/up_socialbyjf?igsh=MW5taTRud2loaWZybw==`
  - E-Mail: `mailto:info@up-social.de`
- External links should use `target="_blank"` with `rel="noreferrer noopener"`.
- Mobile nav and contact sheets must remain scrollable on short viewports using dynamic viewport height where appropriate.
- Non-home navigation should stay in normal document flow; do not make it sticky unless the design is revisited.

## Motion And Accessibility

- Respect `prefers-reduced-motion` for parallax, reveal, stagger, and theme transitions.
- Do not hide section content with `opacity: 0` in a way that can produce blank full-page captures or observer-lag states.
- Preserve semantic landmarks, German `lang`, visible focus states, and 44px mobile touch targets.
- Radix Dialog/Sheet close labels should remain localized as `Schließen`.
- Lightbox interactions should support ESC, arrow keys, focus trap/return, and touch navigation.

## Routing And Deployment

- The app currently uses `HashRouter` for static-hosting safety.
- Switch to `BrowserRouter` only when the production host supports SPA rewrites and SEO/shareable clean URLs are a priority.
- Legal pages still need final business address, USt-ID if applicable, hosting provider, analytics details, and reviewed legal copy before launch.

## Verification Expectations

Before opening a PR or handing off substantial changes, run:

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm lint
```

Known non-blocking lint warnings may exist in template files, but new changes should not introduce errors.
For visual changes, check mobile, tablet, desktop, dark theme, mobile nav, contact panel, and at least one gallery lightbox path.
