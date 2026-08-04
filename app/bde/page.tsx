import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BdeDeroule } from "@/components/bde/deroule";
import { BdeDemoForm } from "@/components/bde/demo-form";
import { BdeHero } from "@/components/bde/hero";
import { BdeFeatures, BdePilote, BdeProblemes, BdeUsages } from "@/components/bde/sections";
import { BdeStructuredData } from "@/components/structured-data";
import { HOME_CRUMB, ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/site";

/** Search intent: organiser un WEI ou un événement étudiant avec un BDE ou une asso. */
export const metadata: Metadata = pageMetadata({
  path: "/bde",
  title: "Yatu pour les BDE : organiser un WEI ou un événement étudiant",
  description:
    "Un espace unique pour ton WEI, ton gala ou ton séjour ski : inscriptions validées, annonces officielles, planning, chambres, discussion et album photo. Pack pilote gratuit avant le lancement.",
  image: "/bde/opengraph-image",
});

const TRAIL = [HOME_CRUMB, { name: "BDE et associations", path: ROUTES.bde }];

/** Implemented from "BDE.dc.html". */
export default function Page() {
  return (
    <main style={{ background: "#F7F4ED" }}>
      <BdeStructuredData trail={TRAIL} />

      <div
        data-r="gutter"
        style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 24px 0" }}
      >
        <Breadcrumbs trail={TRAIL} />
      </div>

      <BdeHero />
      <BdeProblemes />
      <BdeDeroule />
      <BdeFeatures />
      <BdeUsages />
      <BdePilote />
      <BdeDemoForm />
    </main>
  );
}
