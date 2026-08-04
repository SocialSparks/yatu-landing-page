import type { Metadata } from "next";
import { Suspense } from "react";
import { BienvenueContent } from "@/components/bienvenue-content";
import { LAUNCH_LABEL } from "@/lib/content";
import { pageMetadata } from "@/lib/site";

/** Post-signup confirmation: useful to the visitor, not to a search engine. */
export const metadata: Metadata = pageMetadata({
  path: "/bienvenue",
  title: "Tu es sur la liste - Yatu",
  description: `Ton inscription à la liste d’attente de Yatu est enregistrée. Rendez-vous le ${LAUNCH_LABEL}.`,
  index: false,
});

/**
 * Implemented from "Bienvenue.dc.html". The signup redirects here with its
 * source in the query string; the address itself stays in sessionStorage.
 * useSearchParams needs the Suspense boundary for the page to stay static.
 */
export default function Page() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "60vh", padding: "40px 20px" }}>
          <div className="yq-shimmer" style={{ width: "100%", height: "400px", maxWidth: "800px", margin: "0 auto" }} />
        </div>
      }
    >
      <BienvenueContent />
    </Suspense>
  );
}
