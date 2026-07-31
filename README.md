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
came through the `claude_design` MCP; the other four were taken from `old/`.

| Design file | Route |
| --- | --- |
| `Accueil.dc.html` | `/` |
| `BDE.dc.html` | `/bde` |
| `Bienvenue.dc.html` | `/bienvenue` |
| `Mentions legales.dc.html` | `/mentions-legales` |
| `Confidentialite.dc.html` | `/confidentialite` |

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
| page props (`showCountdown`, `showBdeTeaser`, `waitlistCta`) | constants - see the comment in `app/page.tsx` |

Copy and data live in `lib/content.ts`, `lib/bde-content.ts` and `lib/decor.ts` so the section
components stay markup-only. The two legal pages share `components/legal-page.tsx`; the
yellow `<Todo>` spans mark the fields still waiting on Quantiq Studio's real details.

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

**Waitlist endpoint.** `ENDPOINT` in `components/waitlist-form.tsx` is empty. Until it is
filled in, a valid address is stored under `localStorage["yatu-waitlist"]` and the form
confirms inline. Set it to your provider's URL (Brevo / Mailchimp / Tally) or an in-app
route handler and the POST happens automatically.

**Analytics tag.** `components/cookie-banner.tsx` has the hook point marked, inside
`persist()`, for loading a measurement tag once consent is given.

**Demo-request endpoint.** `ENDPOINT` in `components/bde/demo-form.tsx` is empty too;
requests are stored under `localStorage["yatu-bde-demandes"]` meanwhile.

**`/cookies` is still missing.** The footer, the cookie banner and the legal pages all link
to it, so it 404s today. `Cookies.dc.html` exists in the design project but was not in
`old/` - import it the same way as the others.

**Legal copy needs completing** before go-live: every yellow-highlighted field on
`/mentions-legales` and `/confidentialite` is a placeholder (immatriculation, address,
host, email router, analytics tool).

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
