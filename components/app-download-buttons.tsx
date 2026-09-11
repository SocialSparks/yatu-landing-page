"use client";

import {trackStoreClick} from "@/components/measurement";
import {APP_STORE_URL, PLAY_STORE_URL} from "@/lib/content";

const STORES = [
  {
    id: "app_store",
    href: APP_STORE_URL,
    src: "/assets/badges-stores/black-ios.svg",
    alt: "Télécharger dans l’App Store",
  },
  {
    id: "google_play",
    href: PLAY_STORE_URL,
    src: "/assets/badges-stores/black-google.svg",
    alt: "Disponible sur Google Play",
  },
] as const;

export function AppDownloadButtons({
  layout = "row",
}: {
  tone?: "light" | "dark";
  layout?: "row" | "column";
} = {}) {
  return (
    <div className="yq-store-badges" data-layout={layout}>
      {STORES.map((store) => (
        <a
          key={store.href}
          href={store.href}
          onClick={() => trackStoreClick(store.id, store.href)}
          target="_blank"
          rel="noopener noreferrer"
          className="yq-store-badge"
        >
          <img src={store.src} alt={store.alt} width={239} height={71} />
        </a>
      ))}
    </div>
  );
}
