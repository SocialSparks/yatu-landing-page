import { ACCENT } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

export const alt = "Qu’est-ce que Yatu ? L’application pour organiser un événement entre amis";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    badge: "Yatu en bref",
    accent: ACCENT.sunbeam,
    title: "Qu’est-ce que Yatu ?",
    subtitle: "L’appli française et gratuite pour organiser un événement entre amis.",
  });
}
