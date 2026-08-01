import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/landing/guide-page";
import { LANDING_PAGES, landingBySlug } from "@/lib/landing-content";
import { pageMetadata } from "@/lib/site";

/**
 * The occasion guides, at the root of the site: /organiser-un-evjf,
 * /partager-les-depenses-entre-amis…
 *
 * A static segment always wins over this one, so /bde, /cookies and the rest
 * are untouched.
 *
 * `dynamicParams` stays at its default (true) on purpose. With it set to false,
 * Next refuses to render any path it cannot find in the prerender manifest *at
 * runtime* - and on the Cloudflare worker those prerendered entries are not
 * where the router looks, so every guide answered 404 in production while the
 * sibling image route (rendered on demand) answered fine. Left dynamic, a guide
 * that is not already prerendered is simply rendered on request. Unknown slugs
 * are still a real 404: landingBySlug returns null and we call notFound().
 */
export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = landingBySlug(slug);

  if (!page) return {};

  return pageMetadata({
    path: `/${slug}`,
    title: page.title,
    description: page.description,
    image: `/${slug}/opengraph-image`,
  });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = landingBySlug(slug);

  if (!page) notFound();

  return <GuidePage page={page} />;
}
