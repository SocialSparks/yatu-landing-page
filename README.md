# yatu-landing-page

Pre-launch marketing site for Yatu. Next.js (App Router) + TypeScript, no CSS framework -
the Yatu design-system tokens are used directly.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
```

> Don't run `next build` while `next dev` is running - they share `.next` and the dev
> server will start returning 500s until it is restarted.

## Where this came from

The site implements these Design Canvas files from the Claude Design project
**"Site vitrine Yatu pré-lancement"** (`0d440bdb-cfe6-4157-bcea-c61d2e5865bd`). The home page
came through the `claude_design` MCP; the rest were taken from `old/`.

| Design file | Route |
| --- | --- |
| `Accueil.dc.html` | `/` |
| `BDE.dc.html` | `/bde` |
| `Bienvenue.dc.html` | `/bienvenue` |
| `Mentions legales.dc.html` | `/mentions-legales` |
| `Confidentialite.dc.html` | `/confidentialite` |
| `Cookies.dc.html` | `/cookies` |

The design file is a Design Canvas document: HTML with inline styles, `{{ }}` bindings,
`<sc-for>` / `<sc-if>`, and a `DCLogic` class holding the page state. That maps onto React
as follows.

| Design file | Here |
| --- | --- |
| `<x-dc>` markup + inline styles | `components/*.tsx`, inline `style` kept 1:1 |
| `DCLogic` state (`active`, `preset`, `demo`, counter) | `useState` inside the client components that need it |
| `<dc-import name="SiteHeader">` … | `components/site-header.tsx`, `site-footer.tsx`, `waitlist-form.tsx`, `cookie-banner.tsx` - every page imports the header, footer and cookie banner, so they live in `app/layout.tsx` |
| `_ds/…/tokens/*.css` | `styles/tokens/*.css`, verbatim |
| `site-responsive.css` | the `[data-r~="…"]` media queries at the bottom of `app/globals.css` |
| `site-motion.js` + anime.js | `components/motion.tsx` + the CSS transitions in `app/globals.css` |
| `ios-frame.jsx` | `components/ios-frame.tsx` (trimmed to the parts this page mounts) |
| `<image-slot>` | plain `<img>`, or the sand background where the slot is still empty |
| `data-timeline` (home + BDE) | `lib/use-timeline.ts`, shared by both scroll-driven rails |
| `data-fly="x,y,deg"` (BDE features) | read by `components/motion.tsx`, transitioned in CSS |
| the 800ms `setInterval` polling consent on `/cookies` | `CookieBanner` emits `yatu:consent-changed`; `components/consent-status.tsx` listens (plus `storage` for other tabs) |
| page props (`showCountdown`, `showBdeTeaser`, `waitlistCta`) | constants - see the comment in `app/page.tsx` |

Copy and data live in `lib/content.ts`, `lib/bde-content.ts` and `lib/decor.ts` so the section
components stay markup-only. The two legal pages share `components/legal-page.tsx`; the
yellow `<Todo>` spans mark the fields still waiting on Quantiq Studio's real details.

## Formulaires

Les trois formulaires passent par `lib/forms.ts` et atterrissent dans une **Google Sheet**,
un onglet chacun :

| Formulaire | Composant | Onglet |
| --- | --- | --- |
| Liste d'attente (hero + `#liste`) | `components/waitlist-form.tsx` | Waitlist |
| Questionnaire facultatif de `/bienvenue` | `components/bienvenue-content.tsx` | Waitlist (même ligne) |
| Demande de démo BDE | `components/bde/demo-form.tsx` | Demandes BDE |

L'onglet *Waitlist* tient **une ligne par personne** : l'inscription écrit les quatre
premières colonnes, le questionnaire complète les quatre suivantes sur cette même ligne,
retrouvée par e-mail (`mergeOn` dans le script). Si l'e-mail est introuvable — quelqu'un qui
ouvre `/bienvenue` directement — la réponse part sur une nouvelle ligne.

La destination est un déploiement **Google Apps Script** : le site n'a donc besoin d'aucune
route serveur, ce qui garde le déploiement Cloudflare tel quel. Le script et sa procédure
d'installation sont dans [`scripts/google-sheet.gs`](scripts/google-sheet.gs) ; à la fin, on
colle l'URL `/exec` obtenue dans la variable d'environnement :

```bash
cp .env.local.example .env.local
# NEXT_PUBLIC_FORMS_ENDPOINT=https://script.google.com/macros/s/xxxx/exec
```

La même variable doit être ajoutée côté hébergeur. Elle est `NEXT_PUBLIC_`, donc **inlinée au
build** : après l'avoir changée il faut relancer `npm run dev` ou redéployer.

Quelques points volontaires :

| | |
| --- | --- |
| Variable vide | Mode local : rien n'est envoyé, la soumission est gardée dans `localStorage` et le parcours (`/bienvenue`, l'écran « C'est envoyé ») reste testable. |
| Choix multiples | Le questionnaire envoie un tableau ; le script le joint en une cellule (`cell()`). |
| `Content-Type: text/plain` | Apps Script ne sait pas répondre à un preflight CORS, et `application/json` en déclencherait un. Le corps reste du JSON, que le script parse comme tel. |
| Échec d'envoi | Affiché au visiteur avec une invite à réessayer. La copie `localStorage` est sur *sa* machine : un envoi perdu en silence est un contact perdu. |
| Champ `website` | Honeypot (`components/honeypot.tsx`) invisible pour un humain ; le script ignore toute soumission où il est rempli. L'URL `/exec` est publique. |
| Bouton | `components/submit-button.tsx` porte les quatre états (spinner, pop vert, secousse rouge) pour les trois formulaires ; les keyframes sont dans `globals.css` (`.yq-submit`). |
| Délai de 750 ms | Entre la confirmation verte et le changement d'écran, pour que l'animation se lise. Constante `CONFIRM_MS` dans chaque formulaire. |
| Timeout de 20 s | Apps Script démarre à froid et l'URL `/exec` redirige une fois avant de répondre ; trop court, une première soumission lente passe pour une erreur. |

Pour ajouter un champ : l'ajouter au formulaire React, puis ajouter sa ligne dans `FORMS` du
script et **recréer une version** du déploiement (sinon l'ancienne continue de répondre).

## Domain and SEO

The production domain is written **once**, in `lib/site.ts`:

```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yatu-app.com";
```

A preview host (the Workers preview URL, a branch deploy) should set `NEXT_PUBLIC_SITE_URL`
to itself so its canonical URLs, sitemap and social cards point at the preview instead of
claiming to be production. Nothing else in the app hard-codes a domain - the demo's invite
link, the share button, the contact addresses and the JSON-LD all read from there.

| Concern | Where |
| --- | --- |
| `metadataBase`, title template, icons, manifest link, `robots` defaults | `app/layout.tsx` |
| Per-page title / description / canonical / OG / Twitter | `pageMetadata()` in `lib/site.ts`, called by each `page.tsx` |
| `robots.txt`, `sitemap.xml` (with image entries), `manifest.webmanifest` | `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts` |
| Indexable page list (the sitemap's source) | `SITE_PAGES` in `lib/site.ts` |
| Social cards (1200×630 PNG, generated at build) | `app/opengraph-image.tsx`, `app/bde/`, `app/organiser/`, `app/[slug]/`, shared layout in `lib/og-image.tsx` |
| JSON-LD (`Organization`, `WebSite`, `SoftwareApplication`, `FAQPage`, `HowTo`, `BreadcrumbList`, `CollectionPage`) | `components/structured-data.tsx` |
| Visible breadcrumb trail (same array as the markup) | `components/breadcrumbs.tsx`, `Crumb` in `lib/routes.ts` |
| Icons | `app/favicon.ico`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-icon.png` |

`robots` is declared once in the layout (`index, follow` plus `max-image-preview:large`,
`max-snippet:-1` for Googlebot). `pageMetadata()` **spreads** its own `robots` only for a
noindex page: a key present with an `undefined` value would override the layout and silently
drop those directives.

The FAQ lives in `FAQ` (`lib/content.ts`) and feeds both the accordion and the `FAQPage`
structured data, so the marked-up answers are always the visible ones. The same rule holds
for the guides: every `HowTo` step and every answer is rendered on the page.

### Analytics, Clarity et Search Console

`components/measurement.tsx` charge Google Analytics 4 et Microsoft Clarity uniquement
après acceptation de la catégorie « Mesure d’audience ». Les signaux publicitaires restent
refusés. Un retrait de consentement est transmis aux deux outils et efface leurs cookies
accessibles sur le domaine.

Configurer les trois identifiants au build (voir `.env.example`) :

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TBFPKYGBGY
NEXT_PUBLIC_CLARITY_PROJECT_ID=xvqi59gd5v
GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

La vérification Search Console est rendue dans le `<head>` par les métadonnées Next.js. Les
événements de page GA n’incluent pas les paramètres d’URL, et l’adresse de la liste d’attente
passe à `/bienvenue` par `sessionStorage` plutôt que dans l’URL.

### Les guides d'organisation

The occasion guides - `/organiser-un-evjf`, `/organiser-un-week-end-entre-amis`,
`/partager-les-depenses-entre-amis`… - are the pages people reach from a search before they
have heard of Yatu. They are written to be useful on their own; the waiting list comes after
the advice.

| | |
| --- | --- |
| Copy | `lib/landing-content.ts` - one `LandingPage` entry per page |
| Route | `app/[slug]/page.tsx` - a static segment always wins, so `/bde` and the rest are untouched |
| Layout | `components/landing/guide-page.tsx` - promise + signup, problem, method, countdown, mistakes, modules, FAQ, siblings |
| Index | `app/organiser/page.tsx`, linked from the header, the footer and every guide |
| Social card | `app/[slug]/opengraph-image.tsx`, one per page |

Two kinds share that route, and they must never say the same thing:

- **`kind: "guide"`** - the method for an occasion (`/organiser-un-evjf`), written for
  someone who has never heard of Yatu. Listed on `/organiser`, marked up as an `Article`
  with a visible "mis à jour le" date.
- **`kind: "app"`** - the product answer to an applicative query
  (`/application-partage-depenses-entre-amis`): what Yatu does, not how to organise. Linked
  from the footer's product column, and from its sibling guide.

**Adding a page: append one entry to `LANDING_PAGES`.** The route, the sitemap, the social
card, the breadcrumbs, the structured data, the footer column and the `/organiser` index all
pick it up with no other change. Three things to respect: the `tool` names must exist in
`public/assets/tools/`, `modules` must be `ModuleKey`s from `lib/content.ts`, and the photo
must have its variants generated (see *Images* below).

`dynamicParams` is deliberately left at its default. Set to `false`, Next refuses to render
any path it cannot find in the prerender manifest *at runtime* - and on the Cloudflare
worker those entries are not where the router looks, so every guide answered 404 in
production while the sibling image route answered fine.

### Images

Every `<img>` carries `loading="lazy" decoding="async"`, except the ones above the fold -
the header wordmark, the home hero mockup, each guide's photo, the BDE photo - which are
`eager` with `fetchPriority="high"` so the LCP is not deferred.

The photos and the mockups go through `components/picture.tsx`, which serves **AVIF then
WebP at the width the device needs**. The variants are real files, generated once and
committed:

```bash
node scripts/optimize-images.mjs   # après avoir ajouté ou remplacé une image source
```

`next/image` is **not** an option here, and not for style reasons: the Workers deployment
has no image optimizer for it to call, and Cloudflare's own resizing is a paid add-on. The
`<picture>` markup does the same job with files that already exist.

What that changed, measured on the home page's initial render: **4 459 KiB → 326 KiB** of
images on a phone. The mockups were the bulk of it - not SVGs at all, but two full-size
base64 PNGs in an SVG wrapper (830 KiB for the hero alone; base64 barely gzips). Rasterising
the wrapper flattens both layers and keeps the transparent frame: 25 KiB in AVIF.

Sources stay in the repo, untouched, as the input of the script. `next.config.ts` serves
`/assets` and `/mockups` with a one-year immutable cache.

### Deliberate departures from the design file

- **anime.js is gone.** The design loaded it from a CDN to drive fades and slides.
  Those are CSS transitions here - same easing (`cubic-bezier(.2,.8,.2,1)`) and durations,
  one less third-party request, and it degrades cleanly under
  `prefers-reduced-motion` and with JS off.
- **Fonts are self-hosted** via `next/font` (Capriola, Lato, Outfit) instead of the Google
  Fonts CDN. `styles/tokens/fonts.css` maps them onto the same `--font-*` variables.
- **The waitlist form uses `noValidate`** so its own French error message shows instead of
  the browser's English validation bubble.
- **In-page links are plain `<a href="#…">`.** `next/link` no-ops on a same-route hash.
  `components/nav-link.tsx` picks the right element; `section[id]` carries a
  `scroll-margin-top` so anchors clear the sticky header.

## Still to do

**Deploy the Apps Script and set `NEXT_PUBLIC_FORMS_ENDPOINT`** - see the "Formulaires"
section above. Until it is set, the three forms stay in local mode and nothing is collected.

**Search Console credential.** The GA4 Measurement ID and Clarity project ID have production
defaults in `components/measurement.tsx`. The Search Console verification token still needs to
be added to the production build environment.

**The contact address is on another domain.** `CONTACT_EMAIL` is `support@yatu-pro.com`
while the site is `yatu-app.com`. It appears on the legal pages and in the `Organization`
markup, where a domain mismatch reads as a trust signal problem. Left as is - it is a
business decision, not a code one.

**Social links are placeholders.** `SOCIAL` in `components/site-footer.tsx` and the two
links on `/bienvenue` point at `instagram.com` / `tiktok.com` / `linkedin.com` with no
handle. Replace them with the real profiles before go-live (or drop the rows).

**Legal copy needs completing** before go-live: every yellow-highlighted field on
`/mentions-legales`, `/confidentialite` and `/cookies` is a placeholder (immatriculation,
address, host, email router, analytics tool).

**A dev-only hydration warning** is logged on pages whose content sits behind a Suspense
boundary. The motion layer writes `.yq-in` onto nodes React is hydrating - the same
DOM-scanning approach `site-motion.js` used. It is harmless (React never rendered a
className for those elements, so it never reconciles one away) and does not appear in
production builds; see the note at the top of `components/motion.tsx`.

**Two bitmaps could not be imported.** `assets/app-home.png` and `assets/avatar-pair.png`
are both over the 256 KiB the design MCP returns in a single read, so they came back
truncated and were not shipped.

- `avatar-pair.png` → `components/avatar-pair.tsx` draws the overlapping pair in CSS.
- `app-home.png` → `components/app-home.tsx` uses `public/assets/app-home.webp`, which is
  the same shot recovered from the design project's `.image-slots.state.json` sidecar at
  lower resolution.

Both components check `public/assets/` first (see `lib/assets.ts`), so exporting the real
files from Claude Design and dropping them in is all that's needed - no code change.

**Use-case photos.** All 21 `<image-slot>`s in the "Cas d'usage" marquee are still empty in
the design project, so those cards render on the sand background. Add a `photo` path to
the entries in `USE_CASE_ROWS` (`lib/content.ts`) as images become available.
