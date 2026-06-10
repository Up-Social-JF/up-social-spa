# UpSocial by JF SPA

Photography-led marketing website for UpSocial by JF, built as a Vite + React single-page app.
The site presents Julian Frey, his service capabilities, editorial gallery work, and direct contact paths for prospective Munich/Bavaria clients.

## What Is Included

- Editorial home page with full-bleed hero, service overview, founder trust slice, process, gallery teaser, and CTA sections
- Services index and per-capability detail pages
- Gallery index and theme detail pages with lightbox interaction
- About Julian page using the production portrait asset
- Contact page plus global `Jetzt buchen` contact panel
- Mobile navigation and scrollable side panels for short viewports
- Beige and dark themes with a hidden footer-edge theme switch
- Impressum, Datenschutz, and 404 routes
- Vitest route/theme/contact regression tests

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router `HashRouter`
- Tailwind CSS v4
- shadcn/Radix primitives
- Redux Toolkit
- motion
- Vitest and Testing Library
- pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Run the verification suite:

```bash
pnpm test
pnpm typecheck
pnpm build
pnpm lint
```

Preview a production build:

```bash
pnpm build
pnpm preview
```

## Project Structure

```text
src/components/   Shared editorial UI components and primitives
src/content/      Static content modules for services, gallery, founder, contact, nav, process
src/context/      Theme provider and theme context
src/pages/        Route-level page compositions
src/routes/       Router setup
src/store/        Redux store and global UI state
tests/            Vitest setup, mocks, and route smoke tests
public/images/    Static image assets, including Julian's portrait
```

## Contact Links

Production contact links are centralized in `src/content/contact.ts`:

- WhatsApp: `https://wa.me/4917621384822`
- Telephone: `tel:+4917621384822`
- Instagram: `https://www.instagram.com/up_socialbyjf?igsh=MW5taTRud2loaWZybw==`
- E-Mail: `mailto:info@up-social.de`

Update that module first if contact data changes, then run the tests because `tests/App.test.tsx` guards these hrefs.

## Design Notes

The completed design flow established an Editorial Minimal direction: photography first, generous spacing, restrained motion, muted beige/dark themes, and a single direct-contact conversion path.
Durable implementation rules from that flow live in `CLAUDE.md`; transient `.design` artifacts were removed after completion.

Key constraints to preserve:

- Do not add pricing/package tables unless the product strategy changes.
- Do not reintroduce generic shadcn/template visuals without adapting them to the editorial system.
- Do not add visible theme controls outside the footer-edge switch.
- Keep non-home nav in normal document flow.
- Keep mobile nav and contact side panels scrollable on short screens.
- Respect reduced-motion preferences.

## Deployment Notes

The app currently uses `HashRouter` for static-hosting compatibility.
Move to `BrowserRouter` only if the production host supports SPA rewrites.

Before launch, final legal data still needs review:

- Street address and postal address
- USt-ID if applicable
- Hosting provider and retention details
- Analytics provider details if analytics are enabled
- Final lawyer-reviewed Impressum and Datenschutz copy
