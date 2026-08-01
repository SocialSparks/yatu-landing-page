import { ACCENT } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

export const alt = "Les guides Yatu pour organiser un événement entre amis";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    badge: "Les guides",
    accent: ACCENT.blush,
    title: "Organiser un événement entre amis, occasion par occasion.",
    subtitle: "Week-end, voyage, EVJF, EVG, anniversaire, soirée, ski et dépenses partagées.",
  });
}
