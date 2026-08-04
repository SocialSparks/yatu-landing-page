import type {Metadata} from "next";
import {GoPage} from "@/components/go-page";
import {pageMetadata} from "@/lib/site";

/**
 * The address that goes in the Instagram and TikTok bios.
 *
 * `index: false`: this page is a hub of links that all exist elsewhere, and it
 * would compete with the home page for the brand's own name. It stays out of
 * the sitemap for the same reason - and out of robots.txt too, deliberately: a
 * crawler has to be able to fetch the page to read the noindex on it.
 */
export const metadata: Metadata = pageMetadata({
  path: "/go",
  title: "Yatu - tous nos liens",
  description:
    "Les liens Yatu : Instagram, TikTok, la liste d’attente de l’appli et la page dédiée aux BDE.",
  image: "/go/opengraph-image",
  index: false,
});

export default function Page() {
  return <GoPage />;
}
