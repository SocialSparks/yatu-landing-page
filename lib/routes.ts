/**
 * Where the design files' page links land in this app.
 *
 * Every page of the design project is now implemented: Accueil, BDE, Bienvenue,
 * Mentions legales, Confidentialite and Cookies.
 */
export const ROUTES = {
  home: "/",
  modules: "/#solution",
  cycle: "/#cycle",
  fonctionnement: "/#fonctionnement",
  usages: "/#usages",
  faq: "/#faq",
  liste: "/#liste",
  bde: "/bde",
  bdePilote: "/bde#pilote",
  bdeDemo: "/bde#demo",
  bienvenue: "/bienvenue",
  mentionsLegales: "/mentions-legales",
  confidentialite: "/confidentialite",
  cookies: "/cookies",
  
} as const;

/** Hash links must be plain <a>: next/link no-ops when only the hash changes. */
export const isAnchor = (href: string) => href.includes("#");
