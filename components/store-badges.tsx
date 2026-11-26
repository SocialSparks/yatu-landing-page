/** @jsxRuntime automatic */
import type {AnchorHTMLAttributes} from "react";

export type StoreBadge = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  store: "app_store" | "google_play";
  label: string;
  "data-handoff"?: string;
};

const ART = {
  app_store: "black-ios.svg",
  google_play: "black-google.svg",
};

export function StoreBadges({
  badges,
  layout = "row",
  site = "",
}: {
  badges: StoreBadge[];
  layout?: "row" | "column";
  site?: string;
}) {
  return (
    <div className="yq-store-badges" data-layout={layout}>
      {badges.map(({store, label, ...anchor}) => (
        <a key={store} className="yq-store-badge" {...anchor}>
          <img src={site + "/assets/badges-stores/" + ART[store]} alt={label} width={239} height={71} />
        </a>
      ))}
    </div>
  );
}
