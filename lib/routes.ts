/**
 * Where the design files' page links land in this app.
 *
 * Every page of the design project is now implemented: Accueil, BDE, Bienvenue,
 * Mentions legales, Confidentialite and Cookies.
 */
export const ROUTES = {
  home: "/",
  organiser: "/organiser",
  yatu: "/#yatu",
  modules: "/#solution",
  cycle: "/#cycle",
  fonctionnement: "/#fonctionnement",
  usages: "/#usages",
  faq: "/#faq",
  liste: "/#liste",
  bde: "/bde",
  bdeFeatures: "/bde#fonctionnalites",
  bdePilote: "/bde#pilote",
  bdeDemo: "/bde#demo",
  bienvenue: "/bienvenue",
  /** The link-in-bio page - what the Instagram and TikTok profiles point at. */
  go: "/go",
  mentionsLegales: "/mentions-legales",
  confidentialite: "/confidentialite",
  cookies: "/cookies",
} as const;

/** Hash links must be plain <a>: next/link no-ops when only the hash changes. */
export const isAnchor = (href: string) => href.includes("#");

/**
 * One step of a breadcrumb trail: the visible label and where it points. The
 * same array feeds <Breadcrumbs> and the BreadcrumbList markup, so the trail
 * Google reads is always the one on screen.
 */
export type Crumb = { name: string; path: string };

export const HOME_CRUMB: Crumb = { name: "Accueil", path: ROUTES.home };
export const GUIDES_CRUMB: Crumb = { name: "Guides", path: ROUTES.organiser };
