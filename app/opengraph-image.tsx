import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

export const alt = "Yatu, l'appli pour organiser un événement entre amis";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    badge: "Bientôt disponible",
    title: "Organise tes événements entre amis dans une seule appli.",
    subtitle: "Discussion, budget, listes, planning, documents et photos au même endroit.",
  });
}
