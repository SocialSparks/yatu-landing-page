import { LANDING_PAGES, landingBySlug } from "@/lib/landing-content";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

export const alt = "Yatu, l’appli pour organiser un événement entre amis";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return LANDING_PAGES.map((page) => ({ slug: page.slug }));
}

/** One card per guide, so a shared link previews the guide and not the site. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = landingBySlug(slug);

  return ogImage({
    badge: page?.badge ?? "Bientôt disponible",
    accent: page?.accent,
    title: page?.og.title ?? "Organise tes événements entre amis dans une seule appli.",
    subtitle:
      page?.og.subtitle ?? "Discussion, budget, listes, planning, documents et photos au même endroit.",
  });
}
