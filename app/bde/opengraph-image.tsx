import { ACCENT } from "@/lib/content";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og-image";

export const alt = "Yatu pour les BDE et les associations étudiantes";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    badge: "BDE et assos",
    accent: ACCENT.meadow,
    title: "Ton WEI, ton gala, ton séjour ski : un seul espace.",
    subtitle: "Inscriptions validées, annonces, planning, chambres et album photo. Pack pilote gratuit.",
  });
}
