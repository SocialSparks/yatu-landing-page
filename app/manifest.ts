import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} - organiser un événement entre amis`,
    short_name: SITE_NAME,
    description:
      "L’appli qui réunit la discussion, le budget, les listes, le planning, les documents et les photos d’un événement entre amis.",
    lang: "fr",
    start_url: "/",
    display: "browser",
    background_color: "#F7F4ED",
    theme_color: "#F7F4ED",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
