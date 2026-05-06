# Information Architecture: UpSocial by JF

## Site Map

```
- Home `/`
- Leistungen `/leistungen`
  - Photography      `/leistungen/fotografie`
  - Social Media     `/leistungen/social-media`
  - Paid Ads         `/leistungen/paid-ads`
  - Websites         `/leistungen/websites`
  - SEO & Analytics  `/leistungen/seo-analytics`
  - E-Commerce & CRM `/leistungen/ecommerce-crm`
- Galerie `/galerie`
  - Food       `/galerie/food`
  - Events     `/galerie/events`
  - People     `/galerie/people`
  - Nature     `/galerie/nature`
  - Industrial `/galerie/industrial`
- Über JF      `/ueber-jf`
- Kontakt      `/kontakt`
- Impressum    `/impressum`
- Datenschutz  `/datenschutz`
```

12 unique routes + 11 child routes = **23 reachable pages**, only ~4 are content-heavy. The home page is the trunk; everything else is a branch the visitor optionally walks down before returning to the global "Jetzt buchen" CTA.

## Navigation Model

- **Primary navigation** (top nav, max 4 items + brand + theme toggle + CTA):
  - `Leistungen`
  - `Galerie`
  - `Über JF`
  - `Kontakt`
  - - Wordmark (left, links to `/`)
  - - ThemeToggle (right, before CTA)
  - - Primary CTA "Jetzt buchen" (right-most, opens ContactPanel)

- **Secondary navigation**:
  - `/leistungen` index page has a 6-card grid linking to each capability detail; capability detail pages have a "← Alle Leistungen" breadcrumb back to the index, and a footer-strip "Andere Leistungen" showing 3 randomized neighbors.
  - `/galerie` index page has a 5-tile grid linking to theme detail pages; theme detail pages have a "← Alle Themen" breadcrumb and a "Andere Themen" strip showing the other 4 themes.
  - No sidebar anywhere. No tabs. The site is shallow on purpose.

- **Utility navigation**:
  - Footer: full nav repeated, plus contact channels (WhatsApp / Instagram / Email), plus Impressum and Datenschutz at bottom.
  - ThemeToggle lives in the top-right of the nav (next to "Jetzt buchen") on every page.
  - No "search". No language switcher (German-only).

- **Mobile navigation**:
  - Top bar collapses to: wordmark (left) · ThemeToggle (right of center) · Hamburger (right).
  - Hamburger opens a right-slide Sheet covering ~85vw with stacked nav items (large editorial type), the four contact channels, and a full-width "Jetzt buchen" button at the bottom (acts as the page's primary CTA, NOT as the panel-opener — on mobile the sheet IS the contact panel for navigation context).
  - On non-home pages, the top of the mobile sheet shows current section (e.g., "Leistungen" highlighted) so users know where they are.
  - Sheet closes on link tap or backdrop tap.

## Content Hierarchy

### Home `/`

1. **Hero** — Editorial-quiet H1 ("Marken, die im Bild wachsen."), Munich-anchored subhead, full-bleed founder/work photo. Establishes person, place, and visual standard in the first 1.5 seconds.
2. **Capability Grid (6 cards)** — Right after hero. Visitors must see the breadth before they go deeper. Each card: 01–06 numeral, English capability name, German subtitle, 4 bullets, "Mehr erfahren →".
3. **Founder Section** — "Hinter UpSocial steht Julian." Mid-page anchor for trust. Image-left/text-right (stacks on mobile). 2–3 paragraphs. Single inline CTA ("Lerne Julian kennen →" linking to `/ueber-jf`).
4. **Process (3 steps)** — 01 Gespräch · 02 Konzept · 03 Umsetzung. Reinforces that the engagement is custom and lightweight.
5. **Galerie Teaser** — 4–6 image strip (one per theme + cover) titled "Letzte Arbeiten". CTA "Galerie ansehen →" linking to `/galerie`.
6. **CTA Banner** — Full-width section before footer: large headline ("Lass uns über dein Projekt sprechen."), single "Jetzt buchen" button. Last conversion attempt before the footer.
7. **Footer** — Always visible at the bottom.

### Leistungen index `/leistungen`

1. **Page hero** — "Was wir machen." short editorial intro line + a 1-sentence positioning paragraph.
2. **6 Capability Cards** — Same component as home, but in a tighter 3-column grid with no surrounding sections. This page exists primarily for SEO and direct-link sharing.
3. **CTA Banner** — Same global pattern.

### Capability detail `/leistungen/[slug]`

1. **Hero strip** — Capability numeral (large) + English name (large) + German subtitle. Background uses a single full-bleed photo relevant to the capability (e.g., camera on tripod for photography; phone screen for social media).
2. **Long-form description** — 2–3 paragraphs in editorial column width (max ~640px). What it is, who it's for, what's included.
3. **Deliverables list** — Iconless bullet list, German, ~6–10 items.
4. **"So arbeiten wir" mini-process** — Reuses the 3-step process if relevant, otherwise a capability-specific 3-step.
5. **Cross-link strip** — "Andere Leistungen" — 3 cards.
6. **CTA Banner**.

### Galerie index `/galerie`

1. **Page hero** — "Die Bilder hinter der Marke." short intro.
2. **5 Theme Tiles** — Large editorial tiles, each: theme name in German, hero image, image count badge ("12 Bilder"). Click → theme detail page.
3. **CTA Banner**.

### Galerie theme detail `/galerie/[theme]`

1. **Theme title strip** — Large H1 in olive accent (≥24px so contrast passes), 1-line German description.
2. **Image grid** — Editorial masonry-feel grid; on click, opens Lightbox.
3. **Cross-link strip** — Other 4 themes as small tiles.
4. **CTA Banner**.

### Über JF `/ueber-jf`

1. **Portrait hero** — Large photo of Julian, his name, location, and one-line positioning ("Fotograf & Gründer aus München").
2. **Story section** — 4–6 paragraphs in editorial column width: how he started, why he combines photography with marketing, why Munich, what he believes about visuals.
3. **Image grid (small)** — 3–4 behind-the-scenes shots.
4. **Direkter Kontakt block** — His preferred channels listed personally ("Schreib mir auf WhatsApp, Instagram oder per Mail.") with the actual handles linked.
5. **CTA Banner**.

### Kontakt `/kontakt`

1. **Page hero** — "Lass uns sprechen." short German line.
2. **4 contact channels** as large editorial-style links — WhatsApp · Instagram · Email · Calendly (placeholder note).
3. **No form**. Form is out of scope at launch. The page exists so search/SEO has a destination, and so the top-nav "Kontakt" link has somewhere to go.
4. **Munich line** — "Aus München. Für ganz DACH."
5. **Footer**.

### Impressum `/impressum`

1. **H1: Impressum**.
2. **Legally-required block** in plain text — name, address, contact, USt-ID (when available), Verantwortlich i.S.d. § 18 MStV. Placeholder text until Julian provides real values.

### Datenschutz `/datenschutz`

1. **H1: Datenschutzerklärung**.
2. **Privacy policy** — placeholder German DSGVO-compliant text covering: data collection (none beyond Umami analytics), Umami analytics disclosure, hosting (Vercel/Hetzner), embedded services (none beyond Calendly when added), contact data handling. Generated initially via a standard German privacy generator; Julian will substitute production text.

## User Flows

### Flow 1: Cold visitor → "Jetzt buchen" (primary funnel)

1. Visitor lands on `/` (likely from Instagram bio link or Google).
2. Hero loads — sees Julian's photo + "Marken, die im Bild wachsen." + Munich anchor. Forms first impression in <2s.
3. Scrolls. Sees 6 capability cards. Mentally maps "I need [X]".
4. Scrolls past founder section + process + gallery teaser.
5. Hits CTA banner. Clicks "Jetzt buchen".
   - **Decision point**: ContactPanel opens.
6. Picks channel → leaves to WhatsApp / IG / Email composed with prefilled subject "Anfrage UpSocial — [Capability]" / Calendly placeholder closes panel with note.
7. Conversation continues off-site.

### Flow 2: Visitor wants only photography

1. Lands on `/`.
2. Sees "Photography" capability card → clicks "Mehr erfahren".
3. Lands on `/leistungen/fotografie`.
4. Reads description, deliverables.
5. Scrolls to CTA → "Jetzt buchen". Panel opens with subject line prefilled "Anfrage Fotografie".
6. Picks WhatsApp.

### Flow 3: Visitor referred for portfolio review

1. Lands on `/galerie` (direct link from IG bio or QR).
2. Picks a theme tile (e.g., Food).
3. Browses theme detail page; clicks images to open Lightbox; navigates with arrows.
4. Closes Lightbox. Sees CTA banner. Clicks "Jetzt buchen".
5. Picks Instagram (because they came from there).

### Flow 4: Returning visitor in a hurry

1. Knows the site already. Lands on `/`.
2. Skips content. Clicks "Jetzt buchen" in top nav.
3. Panel opens. Picks channel. Done.

### Flow 5: Theme switch

1. Visitor on any page with default Beige theme.
2. Clicks ThemeToggle (top-right of nav).
3. Circular wipe animation reveals Dark theme from the toggle's coordinates over ~600ms.
4. New theme persists across navigation and refreshes (localStorage).
5. Logo wordmark swaps to its inverted variant inside the wipe (no flash).

### Flow 6: Mobile nav

1. Visitor on mobile taps the hamburger.
2. Right-slide Sheet opens with nav items + 4 contact channels + "Jetzt buchen".
3. Either taps a nav item (Sheet closes, page navigates) or taps a contact channel (leaves to external app).

## Naming Conventions

| Concept                   | Label in UI                                                 | Notes                                                                                                                    |
| ------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Service offerings         | **Leistungen**                                              | German-standard B2B word. NOT "Services", NOT "Pakete" (we deliberately moved away from package/tier framing)            |
| Individual offering       | **Capability** internally / displayed as English brand name | E.g. card title says "Photography", but the URL slug and nav use German ("Leistungen")                                   |
| Photography portfolio     | **Galerie**                                                 | NOT "Portfolio" (too agency-jargon-y), NOT "Bilder" (too plain)                                                          |
| Photo categories          | **Themen**                                                  | "Food / Events / People / Nature / Industrial" — names stay English as brand-tag style                                   |
| About page                | **Über JF**                                                 | NOT "Über uns" (one-person agency)                                                                                       |
| Contact page              | **Kontakt**                                                 | Standard                                                                                                                 |
| Primary CTA               | **Jetzt buchen**                                            | Locked. Used everywhere conversion is intended                                                                           |
| Secondary CTA / read-more | **Mehr erfahren**                                           | Used for inline links into deeper pages                                                                                  |
| Cross-link section        | **Andere Leistungen / Andere Themen**                       | Plural German, no decoration                                                                                             |
| Founder                   | **Julian / Julian Frey / JF**                               | "Julian" in body copy (warmer), "Julian Frey" on Über page H1, "JF" only in brand mark and signature                     |
| Form-of-address           | **Du** by default                                           | Casual register. The brand voice errs informal. Switch to "Sie" only on Impressum/Datenschutz where legalese requires it |
| Theme A                   | **Beige** internally / not user-facing                      | Toggle uses an icon, no label needed                                                                                     |
| Theme B                   | **Dark** internally / not user-facing                       | Same                                                                                                                     |
| Capability detail term    | **Leistung** (singular)                                     | E.g. on a detail page breadcrumb: "← Alle Leistungen"                                                                    |

## Component Reuse Map

| Component                       | Used on                                                                                      | Behavior differences                                                                                 |
| ------------------------------- | -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `Nav` (top)                     | Every page                                                                                   | Transparent over hero on `/` and `/ueber-jf`; solid on all other routes from scroll-y=0              |
| `Footer`                        | Every page                                                                                   | Identical; bottom legal bar links live                                                               |
| `ContactPanel` (right sheet)    | Triggered from any page                                                                      | Same content; subject line prefilled differently per source page (`from-capability=fotografie` etc.) |
| `MobileNav` (right sheet)       | Mobile only, every page                                                                      | Highlights current section based on route                                                            |
| `CTABanner`                     | Home / Leistungen index / Capability detail / Galerie index / Theme detail / Über JF         | Same component; headline copy varies per page (config-driven)                                        |
| `CapabilityCard`                | Home (full grid) / Leistungen index (full grid) / Capability detail (cross-link strip, 3-up) | Cross-link variant uses smaller numeral, no bullets, just title + subtitle + arrow                   |
| `MotionInView`                  | Every section on every page                                                                  | Identical                                                                                            |
| `ThemeProvider` + `ThemeToggle` | App-root + nav                                                                               | Identical everywhere                                                                                 |
| `Lightbox`                      | Theme detail pages                                                                           | Identical                                                                                            |
| `LegalLayout`                   | `/impressum` and `/datenschutz`                                                              | Same wrapper, different MD-derived content                                                           |
| `Hero` (variant 1: editorial)   | Home, Über JF                                                                                | Full-bleed photo + overlaid type                                                                     |
| `Hero` (variant 2: strip)       | Leistungen index, Capability detail, Galerie index, Theme detail, Kontakt                    | Shorter (~50vh on desktop), photo + type stacked                                                     |

## Content Growth Plan

- **Gallery** is the only section expected to grow continuously. Themes are fixed at 5 for now (Food / Events / People / Nature / Industrial). New images are added by editing a typed array in `src/content/gallery.ts` (or equivalent). Once the array exceeds ~24 images per theme, introduce simple pagination ("Mehr laden" button) at the theme detail page. No filtering UI inside themes at launch — themes themselves are the filter.
- **Capabilities** are fixed at 6 for the foreseeable future. Adding a 7th means a structural revisit (3-col grid breaks).
- **Über JF** content can grow (adding paragraphs, behind-the-scenes images), but no archive pattern needed.
- **Testimonials section** is deliberately unbuilt at launch. When Julian has 4+ real quotes, a `Testimonials` component is added between Founder and Process on home, and as an additional strip on capability detail pages.
- **Blog / journal** is out of scope. If added later, a separate top-nav item ("Journal") and `/journal` + `/journal/[slug]` routes appear; the IA explicitly leaves space in the top nav (currently 4 items, max 5 before it feels crowded).
- **Client logos** — same as testimonials: built only when ≥ 5 real logos exist.

## URL Strategy

- **Pattern**: `/<section>/<item-slug>`. All slugs in **lowercase German**, hyphenated. No trailing slashes. No file extensions.
- **Capability slugs** (German nouns): `fotografie`, `social-media`, `paid-ads`, `websites`, `seo-analytics`, `ecommerce-crm`.
- **Gallery theme slugs** (English single nouns, matching the brand-tag display): `food`, `events`, `people`, `nature`, `industrial`. Justification: theme names are displayed in English as brand tags; URL matches display for predictability.
- **Dynamic segments**: `[capability-slug]` under `/leistungen`, `[theme-slug]` under `/galerie`. Both validated against the typed content array; unknown slug → `/404`.
- **Query parameters**:
  - `?from=<page-slug>` (optional) — appended automatically when a "Jetzt buchen" CTA is clicked, used to prefill the email subject and Calendly note. Not user-typed.
  - No filtering, no sorting, no pagination params at launch.
- **404**: A simple `/404` page with editorial copy ("Diese Seite gibt es nicht — aber Bilder schon.") and a "Zur Galerie" button.
- **Routing implementation note**: existing `src/routes/Routes.tsx` uses `HashRouter`. For SEO and shareable URLs, **swap to `BrowserRouter`** during Phase 6 (Frontend Design). HashRouter would block crawlers from indexing per-page content. This swap is a one-line change but called out so it's not overlooked.
- **Anchors / fragments**: Home page uses anchor IDs for in-page jumps (`#leistungen`, `#ueber`, `#galerie`, `#kontakt`) so the top nav can also work as a jump-table on the home route.
