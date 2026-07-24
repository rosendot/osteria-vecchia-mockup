# Osteria Vecchia — concept mockup

A five-page Astro site for **Osteria Vecchia**, a fictional family-run trattoria
in Boston's North End. Built by Atlas Studio as a portfolio piece — this is a
**concept build, not a client site**. No such restaurant exists; the address,
phone number, prices, staff, and testimonials are invented.

The site footer says so on every page, and links back to atlasstudio.dev.

> **No license numbers.** Unlike a licensed trade, a restaurant carries no
> public credential in its footer, so there was nothing to strip here — the
> source footer only claims "Family-owned since 1987." Re-check with:
> `grep -rioE "licen[sc]e #|#[0-9]{5,}" --include=*.html dist/`

Ported from the Atlas Studio design system in Claude Design (project
`5b78c5e0-3edd-4692-abc2-b097220f4fd1`) and rebuilt as a real deployable Astro
project. See `atlas-studio-internal/guides/mockup-workflow.md`, Stage 6.

## Stack

- **Astro 5**, static output — no server routes, no framework islands
- Plain CSS: [`src/styles/tokens.css`](src/styles/tokens.css) (Atlas design
  tokens) + [`src/styles/osteria.css`](src/styles/osteria.css) (the ember-hearth
  brand theme — red, gold, espresso). Everything else reads `var(--token)`.
- Vanilla `<script>` blocks for the three interactive bits
- Deploys to Cloudflare Pages

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview   # serve the built output
npm run deploy    # wrangler pages deploy dist
```

## Deploying

Intended for Cloudflare Pages via the GitHub integration — pushes to `main`
auto-deploy. Build command `npm run build`, output `dist/`.

For a one-off CLI deploy: `wrangler login`, then `npm run deploy`.

## Pages

| Route | Sections |
|-------|----------|
| `/` | Hero · three pillars · 6-dish menu teaser · testimonials · CTA |
| `/menu/` | Crumb bar · 14 dishes with category filter · wine &amp; cocktails list · CTA |
| `/our-story/` | Crumb bar · founder spotlight · 2 story rows · team grid · stats · CTA |
| `/reservations/` | Crumb bar · house rules split · reservation form + map · hours card · FAQ |
| `/contact/` | Crumb bar · wide map + details · quick-action bar · location cards · footer CTA |

## Content

Menu and testimonial content lives in [`src/data/`](src/data/) so the Home
teaser and the full Menu page can't drift apart:

- [`menu.ts`](src/data/menu.ts) — all 14 dishes with category, price, and photo
  caption. The six marked `featured: true` render in the Home teaser; a few carry
  a `teaserBlurb` where the source used slightly different phrasing there. Also
  holds the category-tab list and the four drinks.
- [`testimonials.ts`](src/data/testimonials.ts) — the three regulars' quotes.

Everything else is a frontmatter array at the top of its page.

## Images

The Claude Design source used `<image-slot>` — a drag-and-drop authoring element
backed by a sidecar file and the `window.omelette` bridge. That runtime doesn't
exist outside the design canvas, so every slot was replaced with
[`ImageSlot.astro`](src/components/ImageSlot.astro): a plain div rendering a
textured placeholder captioned with the photo that belongs there.

There are **30 slots** across the five pages — most of them dish photos on the
menu. To drop in a real photo, pass `src` (and `alt`):

```astro
<ImageSlot src="/photos/bolognese.jpg" alt="Tagliatelle bolognese" />
```

The placeholder styling falls away automatically once `src` is set. Put files in
`public/` and reference them by absolute path.

## Interactive pieces

All vanilla JS, no dependencies:

- **Header** — solid on scroll, hamburger drawer under 720px; the active nav item
  is marked from the current path ([`Header.astro`](src/components/Header.astro))
- **Menu category filter** — All / Antipasti / Pasta / Wood-Fired / Dolci
  ([`menu.astro`](src/pages/menu.astro))
- **Hours card** — highlights today and shows an open/closed banner
  ([`reservations.astro`](src/pages/reservations.astro))

The reservation form on `/reservations/` is **demo only** — it validates name and
phone, then confirms in place. It posts nowhere; there's no backend.

## Notes

- **One fix versus the design source.** The hours banner compared `hour >= 5`
  against a 24-hour clock, so it reported "Open now" from 5am. The port uses
  `17`. Everything else is a faithful port.
- The `.stats` numbers on `/our-story/` are static text, matching the source —
  they don't count up.
- Fonts are Playfair Display + Lato, loaded from Google Fonts by an `@import` in
  `osteria.css`.
- Both "maps" are drawn in CSS by [`MapBox.astro`](src/components/MapBox.astro) —
  no Maps embed, no API key. `variant="wide"` draws the denser street grid used
  on `/contact/`.
