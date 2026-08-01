import type { MetadataRoute } from "next";
import { SITE_PAGES, absoluteUrl } from "@/lib/site";

/**
 * /sitemap.xml - every indexable page, with the images we want Google Images to
 * pick up (the guide photos and the social cards). robots.txt points here, and
 * this is the file to submit in Search Console.
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
