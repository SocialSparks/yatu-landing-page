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
 * are untouched. dynamicParams = false means anything that is not a guide is a
 * 404 rather than an empty page a crawler could index.
 */
export const dynamicParams = false;

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
