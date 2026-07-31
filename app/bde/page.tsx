import type { Metadata } from "next";
import { BdeDeroule } from "@/components/bde/deroule";
import { BdeDemoForm } from "@/components/bde/demo-form";
import { BdeHero } from "@/components/bde/hero";
import { BdeFeatures, BdePilote, BdeProblemes, BdeUsages } from "@/components/bde/sections";

export const metadata: Metadata = {
  title: "Yatu pour les BDE - un WEI à deux cents, sans y laisser ton semestre",
  description:
    "Inscriptions validées, annonces officielles, planning, chambres, chat et album souvenirs dans un seul espace. Pack pilote gratuit avant le lancement.",
};

/** Implemented from "BDE.dc.html". */
export default function Page() {
  return (
    <main style={{ background: "#F7F4ED" }}>
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
