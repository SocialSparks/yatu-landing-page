import type { Metadata } from "next";
import { LANDING_INDEX_PATH, LANDING_PAGES } from "@/lib/landing-content";

/**
 * Everything that depends on *where* the site is served lives here, so the
 * production domain is written once.
 *
 * Production defaults to the real domain. A preview host (the Workers URL, a
 * branch deploy…) can set NEXT_PUBLIC_SITE_URL to itself; canonical URLs then
 * follow the preview instead of claiming to be the production page. Nothing
 * else in the app should hard-code a domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://yatu-app.com").replace(
  /\/+$/,
  "",
);

/** "yatu-app.com" - what we show to a reader, e.g. the invite link in the demo. */
export const SITE_DOMAIN = SITE_URL.replace(/^https?:\/\//, "");

export const SITE_NAME = "Yatu";
export const PUBLISHER = "QUANTIQ STUDIO";
export const COMPANY_LEGAL_FORM = "SAS (société par actions simplifiée)";
export const COMPANY_CAPITAL = "1 000 €";
export const COMPANY_ADDRESS = "3 chemin de Chantenoy, 69330 Jons, France";
export const COMPANY_SIREN = "944 423 805";
export const COMPANY_SIRET = "944 423 805 00018";
export const COMPANY_RCS = "944 423 805 R.C.S. Lyon";
export const COMPANY_VAT = "FR76944423805";
export const PUBLISHING_DIRECTOR = "Célian Frasca";

export const CONTACT_EMAIL = "support@yatu-pro.com";
export const PRIVACY_EMAIL = CONTACT_EMAIL;
export const CONTACT_PHONE = "07 81 73 06 39";
export const CONTACT_PHONE_HREF = "+33781730639";

export const HOST_NAME = "Cloudflare, Inc.";
export const HOST_ADDRESS = "101 Townsend Street, San Francisco, CA 94107, États-Unis";
export const HOST_PHONE = "+1 650 319 8930";
export const HOST_PHONE_HREF = "+16503198930";

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") => new URL(path, `${SITE_URL}/`).toString();

export type SitePage = {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
  /**
   * ISO date of the last real change to the page, quoted as <lastmod>.
   *
   * Deliberately not `new Date()`: that told crawlers all twelve pages had
   * changed at every deploy, which is exactly how a site teaches Google to stop
   * reading its lastmod. Bump the date when the page's content changes.
   */
  updated: string;
  /** Site-relative images offered to Google Images through the sitemap. */
  images?: string[];
};

/**
 * The indexable pages, in sitemap order.
 *
 * The occasion guides are not listed one by one: they come from
 * LANDING_PAGES, so adding a guide in lib/landing-content.ts is enough for the
 * sitemap, robots.txt and the internal links to pick it up. `/bienvenue` is
 * deliberately absent - it is a post-signup page and stays out of the index.
 */
export const SITE_PAGES: SitePage[] = [
  {
    path: "/",
    changeFrequency: "weekly",
    priority: 1,
    updated: "2026-08-01",
    images: ["/opengraph-image"],
  },
  {
    path: "/bde",
    changeFrequency: "monthly",
    priority: 0.8,
    updated: "2026-08-01",
    images: ["/bde/opengraph-image"],
  },
  {
    path: LANDING_INDEX_PATH,
    changeFrequency: "monthly",
    priority: 0.7,
    updated: "2026-08-01",
    images: [`${LANDING_INDEX_PATH}/opengraph-image`],
  },
  ...LANDING_PAGES.map((page): SitePage => ({
    path: `/${page.slug}`,
    changeFrequency: "monthly",
    // Below the home page and /bde, above the legal pages: these are the
    // entry points we want crawled often, but they are not the front door.
    priority: 0.7,
    updated: page.updated,
    images: [page.photo, `/${page.slug}/opengraph-image`],
  })),
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2, updated: "2026-08-01" },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2, updated: "2026-08-01" },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2, updated: "2026-08-01" },
];

/** "1er août 2026" - the date as the guides show it, and as Article quotes it. */
export const formatDateFr = (iso: string) => {
  const date = new Date(`${iso}T12:00:00Z`);
  const day = date.getUTCDate();
  const rest = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);

  return `${day === 1 ? "1er" : day} ${rest}`;
};

/** Pages excluded from the index; kept next to SITE_PAGES so robots.ts stays in sync. */
export const PRIVATE_PATHS = ["/bienvenue"];

/**
 * One page’s metadata: unique title and description, canonical URL, and the
 * social cards that quote them. `title` is absolute - each page owns its full
 * <title> rather than inheriting the layout template.
 */
export function pageMetadata({
  path,
  title,
  description,
  image = "/opengraph-image",
  index = true,
}: {
  path: string;
  title: string;
  description: string;
  /** Path of the generated social card for this page (an opengraph-image route). */
  image?: string;
  index?: boolean;
}): Metadata {
  // The card routes answer on a URL with no extension, so the type is spelled
  // out - some crawlers read it rather than the response's Content-Type.
  const images = [{ url: image, width: 1200, height: 630, alt: title, type: "image/png" }];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    // Spread, not `robots: undefined`: a key present with an undefined value
    // still overrides the layout, and the page would lose the googleBot
    // directives (max-image-preview:large…) declared there.
    ...(index ? {} : { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "fr_FR",
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
