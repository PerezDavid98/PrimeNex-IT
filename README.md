# PrimeNex IT — website

Marketing site for [PrimeNex IT](https://www.primenexit.net), rebuilt in Next.js.
Single page, statically rendered, with one API route for the contact form.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the build
```

## Stack

- **Next.js 16** (App Router) + **React 19**, TypeScript
- **Tailwind CSS v4** for layout utilities; the design system lives in
  `app/globals.css` as tokens and component classes
- No animation library. Reveals use an IntersectionObserver plus CSS
  transitions, so the page ships almost no JavaScript and stays usable on
  low-end devices

## Layout

```
app/
  layout.tsx            fonts, metadata, JSON-LD
  page.tsx              section composition
  globals.css           the design system (tokens, type scale, controls, motion)
  icon.tsx              favicon, generated
  opengraph-image.tsx   share card, generated
  robots.ts sitemap.ts manifest.ts
components/
  site-header.tsx hero.tsx statement.tsx services.tsx
  capabilities.tsx about.tsx contact.tsx site-footer.tsx
  ui/                   reveal, rule, section-heading, wordmark
lib/
  content.ts            locale-independent facts: contact channels and URLs
  schema.ts             structured data graph
brand/                  logo source files
legacy/                 the previous static site, kept for reference
```

Copy is centralised in `lib/content.ts` — edit that file rather than the
components.

## The design system

Swiss editorial. White ground, black ink, steel for support, and the brand cyan
used only as a hairline or a small flat fill. The 12-column grid and the
hairline rule are the only decoration; the hexagon lifted from the logo is the
one non-rectangular shape and is rationed deliberately.

House rules, enforced by convention in `globals.css`:

- no gradients, glows, blurs, drop shadows or border radii
- type: **Archivo** for everything, **IBM Plex Mono** for indices and labels
- headlines never animate — content is readable the moment it renders
- every ambient animation is disabled under `prefers-reduced-motion`

## Contact

There is no contact form and no API route. Contact is one WhatsApp link, plus
email, phone and LinkedIn as direct links.

That is a deliberate decision, not an omission: a form asks a stranger for six
fields and then makes them wait, while WhatsApp puts them in a conversation in
one tap — on the channel this market actually uses. It also means there is
nothing to configure, no delivery to monitor, and nothing that can silently
swallow a lead.

The number, the prefilled message and the labels live in `lib/content.ts` and
`lib/i18n/*.json`. Nothing needs an environment variable.

The site is therefore entirely static: six prerendered pages, no server
functions.

## SEO

Already in place: per-page metadata and canonical, Open Graph and Twitter cards
with a generated share image, `robots.txt`, `sitemap.xml`, a web manifest, and a
schema.org graph (`Organization` + `ProfessionalService`, `WebSite`, `WebPage`,
and an `OfferCatalog` built from the service list).

Still needed, and worth doing:

1. **Verify the domain** in Google Search Console and Bing Webmaster Tools, then
   submit `https://www.primenexit.net/sitemap.xml`.
2. **Google Business Profile** for Cartago — the single biggest factor for local
   searches.
3. **A Spanish version.** The site is English only; most local search traffic
   will be in Spanish. This needs `next-intl` or an `/es` route plus `hreflang`.
4. Replace the phone number and social links in `lib/content.ts` with the
   current ones if any have changed.

No amount of technical SEO guarantees a first-place ranking — that depends on
authority and competition. What is here removes the technical obstacles.

## Assets

The design is typographic and uses no photography. The former `img/` directory
was removed: it held watermarked Freepik clip-art and low-resolution stock with
no evidence of licensing, which does not belong on a company site. It remains in
git history at commit `6374664` if any of it is ever needed.

Real photography — the team, the office, hardware you have built — drops into
the capabilities section when it exists.

The logo is drawn light-on-dark (`brand/`), so on this white ground only the
hexagon is used, windowed out of the PNG by `components/ui/wordmark.tsx`, with
the wordmark typeset live. A vector or dark-ink version would let the logo be
used as supplied.
