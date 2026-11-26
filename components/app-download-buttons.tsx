"use client";

import {trackStoreClick} from "@/components/measurement";
import {StoreBadges, type StoreBadge} from "@/components/store-badges";
import {APP_STORE_URL, PLAY_STORE_URL} from "@/lib/content";

const STORES: StoreBadge[] = [
  {store: "app_store", href: APP_STORE_URL, label: "Télécharger dans l’App Store"},
  {store: "google_play", href: PLAY_STORE_URL, label: "Disponible sur Google Play"},
];

export function AppDownloadButtons({
  layout = "row",
}: {
  tone?: "light" | "dark";
  layout?: "row" | "column";
} = {}) {
  return (
    <StoreBadges
      layout={layout}
      badges={STORES.map(({store, href, label}) => ({
        store,
        href,
        label,
        onClick: () => trackStoreClick(store, href),
        target: "_blank",
        rel: "noopener noreferrer",
      }))}
    />
  );
}
