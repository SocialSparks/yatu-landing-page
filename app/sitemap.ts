import type { MetadataRoute } from "next";
import { SITE_PAGES, absoluteUrl } from "@/lib/site";

/**
 * /sitemap.xml - every indexable page, with the editorial photos we want Google
 * Images to pick up. Social-card routes are deliberately absent: robots.txt
 * blocks them because they are previews, not indexable documents.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    // Each page's own date - see the comment on SitePage.updated.
    lastModified: page.updated,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    images: page.images?.map((image) => absoluteUrl(image)),
  }));
}
