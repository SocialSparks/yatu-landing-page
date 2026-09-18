/**
 * Everything /go says - the link-in-bio page pointed at from the Instagram and
 * TikTok profiles.
 *
 * Same editorial rules as lib/content.ts: tutoiement, the benefit first, and no
 * promise the app does not keep. The page is one screen of a phone, so every
 * line here is short on purpose - a bio link that needs scrolling to reach the
 * buttons is a bio link that loses half its visitors.
 *
 * The order of GO_LINKS is the order on screen. Adding a destination is one
 * entry; nothing in the page component knows the list's length.
 */

import {yatuProUrl} from "@/lib/content";
import {ROUTES} from "@/lib/routes";

/** The handle, identical on both networks - it is what the visitor just left. */
export const GO_HANDLE = "@yatu_app";

export const GO_TITLE = "L’appli qui organise tes événements entre amis.";

export const GO_LEDE =
  "Discussion, budget, listes, planning et souvenirs : un seul endroit, du premier message aux dernières photos.";

/* ── The download card ──────────────────────────────────────────────── */

export const GO_DOWNLOAD = {
  title: "Télécharge Yatu.",
  lede: "Gratuit, sur iPhone et Android. Crée ton premier événement en une minute.",
} as const;

/* ── The link rows ──────────────────────────────────────────────────── */

export type GoLink = {
  href: string;
  title: string;
  sub: string;
  external: boolean;
} & (
  | { brand: "instagram" | "tiktok" }
  /** File name under /assets/tools, drawn on a sand tile. */
  | { tool: string }
);

export const GO_SITE_LINK: GoLink = {
  href: ROUTES.home,
  tool: "heart",
  title: "Visiter le site Yatu",
  sub: "Découvre les modules et la démo",
  external: false,
};

export const GO_LINKS: GoLink[] = [
  {
    href: "https://www.instagram.com/yatu_app/",
    brand: "instagram",
    title: "Instagram",
    sub: "Nouveautés, conseils et coulisses de Yatu",
    external: true,
  },
  {
    href: "https://www.tiktok.com/@yatu_app",
    brand: "tiktok",
    title: "TikTok",
    sub: "L’organisation de groupe, en vidéo",
    external: true,
  },
  {
    href: ROUTES.bde,
    tool: "people",
    title: "Yatu pour les BDE",
    sub: "WEI, soirées et pack pilote gratuit",
    external: false,
  },
  {
    href: yatuProUrl("go"),
    tool: "ticket",
    title: "Yatu Pro",
    sub: "Clubs, boîtes de nuit, festivals et lieux",
    external: true,
  },
];
