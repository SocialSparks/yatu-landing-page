import type { Metadata } from "next";
import { Suspense } from "react";
import { BienvenueContent } from "@/components/bienvenue-content";

export const metadata: Metadata = {
  title: "Tu es sur la liste - Yatu",
  description: "Ton inscription est enregistrée. Rendez-vous le 9 septembre 2026.",
  robots: { index: false, follow: true },
};

/**
 * Implemented from "Bienvenue.dc.html". The signup redirects here with the
 * address in `?e=`; useSearchParams needs the Suspense boundary for the page
 * to stay statically rendered.
 */
export default function Page() {
  return (
    <Suspense fallback={<div style={{ minHeight: "60vh", background: "#F7F4ED" }} />}>
      <BienvenueContent />
    </Suspense>
  );
}
