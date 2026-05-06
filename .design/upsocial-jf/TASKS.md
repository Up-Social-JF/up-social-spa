# Build Tasks: UpSocial by JF Agency Website

Generated from: `.design/upsocial-jf/DESIGN_BRIEF.md`  
Date: 2026-05-06  
Philosophy: Editorial Minimal

## Existing Code Classification

- **Reuse as foundation**: `src/index.css` tokens, `ThemeProvider`, `useTheme`, Redux store wiring, Tailwind v4, React Router, Motion, Lucide icons, `Button` component.
- **Modify**: `Button` needs editorial variants and sharper geometry; `Routes` needs `HashRouter` and all site routes; `store` needs contact-panel state instead of starter counter state; `Main` should be replaced by the real home page.
- **Remove from product UI**: starter `Counter`, Vite/shadcn logo components, template CTA, and counter tests should not appear in the agency site.
- **Create**: content files, layout shell, navigation, contact panel, page components, gallery/lightbox, legal pages, motion wrappers, responsive image components, route tests or smoke tests.

## Foundation

- [x] **Home aesthetic slice**: Replace the starter `Main` template with an editorial hero plus top-level page scaffold that proves the beige theme, large photography-first composition, Plus Jakarta type ramp, olive ornament use, and single "Jetzt buchen" CTA work together. _Modifies: `src/pages/main.tsx`, `Button`; creates: first hero/layout components; reuses: `src/index.css` tokens._
- [x] **Routing shell and app layout**: Keep `HashRouter` for GitHub Pages direct-link safety, add the full IA route table, add a persistent layout with `Nav`, `Footer`, and route-level `<main>` landmarks, and keep unknown slugs flowing to a 404 page. _Modifies: `src/routes/Routes.tsx`, `App`; creates: `AppLayout`, `NotFoundPage`; reuses: React Router. Note: `BrowserRouter` can return when hosting supports SPA rewrites or a tested Pages 404 fallback._
- [x] **Typed content model**: Add static TypeScript content arrays for capabilities, gallery themes/images, nav links, contact channels, CTA copy, and legal placeholders so pages render from shared data instead of duplicated literals. _Creates: `src/content/*`; reuses: IA naming and German copy decisions._
- [x] **Editorial Button system**: Restyle shadcn `Button` into filled, outline, ghost, link, and icon variants that use brand tokens, rectangular editorial geometry, visible focus rings, 44px touch targets, and no shadcn-neutral visual defaults. _Modifies: `src/components/ui/button.tsx`; reuses: existing Button API and CSS tokens._
- [x] **MotionInView wrapper**: Create a reusable reveal wrapper with once-only fade-up, optional child staggering, and immediate rendering for `prefers-reduced-motion`. _Creates: `MotionInView`; reuses: `motion` dependency and motion tokens._

## Global Navigation And Contact

- [x] **Desktop navigation slice**: Build the top nav with wordmark, primary links, and "Jetzt buchen"; keep the home nav transparent over the hero and keep other routes in normal document flow. _Creates: `Nav`; modifies: layout shell; reuses: `Button`, logo assets._
- [x] **Mobile navigation slice**: Built `MobileNav` (visible <`lg`) with hamburger trigger that opens a right-slide editorial Sheet covering ~88vw (max-w-md). Sheet contains: site name eyebrow, stacked nav links (current section highlighted via `aria-current`/active background), the four contact channels (subdued layout), and a full-width primary "Jetzt buchen" button at the bottom that closes the mobile sheet and opens the global `ContactPanel`. Closes on link tap or backdrop tap. Hamburger styling adapts to home (paper-on-dark) vs inner pages (foreground-on-background). Desktop CTA breakpoint moved from `sm:flex` → `lg:flex` so the hamburger owns the entire <`lg` range. _Creates: `MobileNav`; modifies: `Nav`; reuses: `Sheet`, contact channels, primary nav items, contact-panel action._
- [x] **Contact panel state and UI**: Replaced starter counter Redux slice with `contactPanel` slice (`open` accepts an optional `subject` for prefilling, `close`, `toggle`). Installed shadcn `Sheet`, built `ContactPanel` listing the four channels (WhatsApp, Instagram, Email with subject-prefill on `mailto:`, Calendly placeholder marked disabled). Mounted in `AppLayout`. Wired the desktop Nav CTA and the home Hero primary CTA to dispatch `open()`. The home Hero secondary now links to `/galerie`. Mobile-specific full-screen variant lands with the upcoming Mobile Nav slice. _Modifies: `src/store/*`, `Nav`, `Main`, `AppLayout`; creates: `ContactPanel`; reuses: Redux Toolkit, `Sheet`, contact content._
- [x] **Hidden footer theme switch**: Keep theme switching available only through the subtle footer-edge circle; no visible top-nav or mobile-nav control. Provider extended with optional `origin` arg that sets `--theme-wipe-x/y` on `<html>` and triggers `document.startViewTransition` (with `flushSync` for synchronous state commit); falls back to instant swap when View Transitions API is missing or `prefers-reduced-motion` is set. _Modifies: `Footer`, `ThemeProvider`; reuses: completed `.theme-beige` / `.theme-dark` tokens._
- [ ] **Footer and CTA banner**: Build the reusable CTA banner and footer with repeated navigation, Munich/DACH contact framing, legal links, and the global booking action. _Creates: `CTABanner`, `Footer`; reuses: contact panel state and nav content._

## Home Page

- [ ] **Home hero completion**: Finish the full-bleed editorial hero with real/placeholder photography wiring, responsive aspect behavior, Munich anchor copy, staggered load animation, gentle parallax, and scroll indicator. _Modifies: home hero slice; creates: responsive image helper if needed; reuses: MotionInView and tokens._
- [ ] **Capability grid slice**: Build six capability cards with numerals, English names, German subtitles, four bullets, "Mehr erfahren" links, responsive 1/2/3-column behavior, and desktop hover states. _Creates: `CapabilityCard`, `CapabilityGrid`; reuses: capability content and `Button` link styling._
- [ ] **Founder trust slice**: Build the "Hinter UpSocial steht Julian" section with image-left/text-right responsive layout, 2-3 paragraphs, signature treatment, and link to `/ueber-jf`. _Creates: `FounderSection`; reuses: MotionInView and image helper._
- [ ] **Process and gallery teaser slice**: Build the three-step process and "Letzte Arbeiten" teaser strip with theme tiles, restrained image hover, and link to `/galerie`. _Creates: `ProcessSection`, `GalleryTeaser`; reuses: gallery content and MotionInView._
- [ ] **Home assembly pass**: Assemble hero, capabilities, founder, process, gallery teaser, CTA banner, and footer into the final `/` flow with anchor IDs for `#leistungen`, `#ueber`, `#galerie`, and `#kontakt`. _Modifies: `Main` or creates `HomePage`; reuses: all home sections._

## Route Pages

- [ ] **Leistungen index page**: Build `/leistungen` with strip hero, short positioning copy, the full six-card capability grid, and CTA banner. _Creates: `LeistungenPage`; reuses: `CapabilityGrid`, `CTABanner`, content model._
- [ ] **Capability detail pages**: Build `/leistungen/[slug]` with validated slugs, hero strip, long description, deliverables list, mini-process, three cross-link cards, contextual contact subject, and CTA banner. _Creates: `CapabilityDetailPage`; reuses: capability content, `CapabilityCard`, `ProcessSection`, routing validation._
- [ ] **Galerie index page**: Build `/galerie` with editorial strip hero, five large theme tiles, image count badges, hover underline draw, and CTA banner. _Creates: `GalleryPage`, `GalleryTile`; reuses: gallery content and MotionInView._
- [ ] **Gallery detail and lightbox**: Build `/galerie/[theme]` with validated slugs, title strip, responsive masonry-feel grid, dialog-based lightbox, ESC/arrow navigation, swipe support, focus return, and "Andere Themen" strip. _Creates: `GalleryThemePage`, `Lightbox`; creates or modifies: `Dialog`; reuses: gallery content._
- [ ] **Über JF page**: Build `/ueber-jf` with portrait hero, story column, small behind-the-scenes image grid, direct contact block, and CTA banner. _Creates: `AboutPage`; reuses: contact channels, image helper, CTA banner._
- [ ] **Kontakt page**: Build `/kontakt` with page hero, four large contact-channel links, Calendly placeholder note, Munich/DACH line, and no form. _Creates: `ContactPage`; reuses: contact content and global channel handling._
- [ ] **Legal and 404 pages**: Build `/impressum`, `/datenschutz`, and `/404` with reusable legal text layout, German placeholders, semantic headings, and restrained editorial typography. _Creates: `LegalLayout`, `ImpressumPage`, `DatenschutzPage`, `NotFoundPage`; reuses: footer and tokens._

## Responsive, Accessibility, And Verification

- [ ] **Responsive layout pass**: Verify and tune mobile `<640px`, tablet `640-1024px`, desktop `>=1024px`, and wide `>=1440px` behavior for nav, hero images, grids, contact panel, footer, and lightbox. _Modifies: all page and layout components; reuses: breakpoint tokens._
- [ ] **Accessibility pass**: Verify semantic landmarks, German `lang`, keyboard order, visible focus, touch target size, ESC handling, lightbox focus trap/return, descriptive German image alt text, and reduced-motion behavior. _Modifies: interactive components and page markup; reuses: existing test setup where useful._
- [ ] **Theme QA pass**: Verify beige and dark themes on every route, raw olive usage restrictions, `--accent-readable` contrast for body-size text, logo visibility, no first-paint flash, no OS auto-dark behavior, and no visible theme controls outside the footer-edge circle. _Modifies: tokens, footer theme switch, nav/logo handling as needed; reuses: Phase 4 token system._
- [ ] **Route smoke tests**: Replace starter smoke test with route-render tests for major pages, invalid slug fallback behavior, theme default class behavior, and contact-panel open/close basics. _Modifies: `tests/*`; reuses: Vitest and Testing Library._
- [ ] **Production verification**: Run `pnpm build`, `pnpm test`, `pnpm lint`, and a local browser visual pass across `/`, `/leistungen/fotografie`, `/galerie/food`, `/ueber-jf`, `/kontakt`, and both legal pages. _Reuses: existing scripts and browser tooling._

## Review

- [ ] **Design review**: Run `/design-review` against the brief after the build is complete and save findings plus screenshots in `.design/upsocial-jf/`. _Creates: `DESIGN_REVIEW.md`; reuses: completed implementation and design artifacts._
