/**
 * Where the design file's page links land in this app.
 *
 * Only Accueil.dc.html has been implemented so far. The routes below that are
 * not "/" or a bare hash point at pages still to be imported from the same
 * design project (BDE.dc.html, Bienvenue.dc.html, Mentions legales.dc.html,
 * Confidentialite.dc.html, Cookies.dc.html) — keeping the hrefs correct now
 * means those imports are drop-in.
 */
export const ROUTES = {
  home: "/",
  modules: "#solution",
  cycle: "#cycle",
  fonctionnement: "#fonctionnement",
  usages: "#usages",
  faq: "#faq",
  liste: "#liste",
  bde: "/bde",
  bdePilote: "/bde#pilote",
  bdeDemo: "/bde#demo",
  bienvenue: "/bienvenue",
  mentionsLegales: "/mentions-legales",
  confidentialite: "/confidentialite",
  cookies: "/cookies",
} as const;

/** In-page anchors must be plain <a>: next/link no-ops on a same-route hash. */
export const isAnchor = (href: string) => href.startsWith("#");
