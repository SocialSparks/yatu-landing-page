import type { Metadata } from "next";

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
export const PUBLISHER = "Quantiq Studio";
export const CONTACT_EMAIL = `hello@${SITE_DOMAIN}`;
export const PRIVACY_EMAIL = `privacy@${SITE_DOMAIN}`;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path = "/") => new URL(path, `${SITE_URL}/`).toString();

/**
 * The indexable pages, in sitemap order.
 *
 * This is also the extension point for the use-case landing pages we may add
 * later (`/organiser-un-week-end-entre-amis`, `/evjf`…): create the route, add
 * one entry here, and robots.txt and the sitemap pick it up. `/bienvenue` is
 * deliberately absent - it is a post-signup page and stays out of the index.
 */
export const SITE_PAGES: {
  path: string;
  changeFrequency: "weekly" | "monthly" | "yearly";
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/bde", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mentions-legales", changeFrequency: "yearly", priority: 0.2 },
  { path: "/confidentialite", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookies", changeFrequency: "yearly", priority: 0.2 },
];

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
  const images = [{ url: image, width: 1200, height: 630, alt: title }];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: index ? undefined : { index: false, follow: true },
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
