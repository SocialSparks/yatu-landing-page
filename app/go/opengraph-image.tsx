import {OG_CONTENT_TYPE, OG_SIZE, ogImage} from "@/lib/og-image";
import {ACCENT} from "@/lib/content";

export const alt = "Tous les liens Yatu";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

/** The card that shows when the bio link is pasted into a DM. */
export default function Image() {
  return ogImage({
    badge: "Tous nos liens",
    title: "Yatu, au même endroit.",
    subtitle: "Instagram, TikTok, la liste d’attente de l’appli et la page BDE.",
    accent: ACCENT.blush,
  });
}
