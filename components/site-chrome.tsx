"use client";

import {usePathname} from "next/navigation";
import {ROUTES} from "@/lib/routes";

/**
 * Paths served without the site's navigation.
 *
 * /go is the link-in-bio page: a visitor arriving from an Instagram or TikTok
 * profile gets four destinations and nothing else, so the sticky header and the
 * forty-link footer would both work against it.
 */
const BARE_PATHS = new Set<string>([ROUTES.go]);

/**
 * Puts the header and the footer around a page - unless the page is bare.
 *
 * The obvious alternative was a route group: app/(site)/ with the chrome in its
 * layout, /go outside it. It works, but Next appends a build hash to every
 * metadata route that sits inside a group (`/opengraph-image` becomes
 * `/opengraph-image-12o0cb`), and this site references those URLs by hand -
 * `pageMetadata()` and the sitemap's `images` both spell them out. Moving the
 * pages would have silently 404'd every social card on the site.
 *
 * So the decision is made here instead. `usePathname()` resolves while the pages
 * are prerendered, so each static page still ships the right HTML: /go's is
 * built without a header or a footer, not merely hiding them.
 */
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const bare = BARE_PATHS.has(usePathname());

  return (
    <>
      {bare ? null : header}
      {children}
      {bare ? null : footer}
    </>
  );
}
