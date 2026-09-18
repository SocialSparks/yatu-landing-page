import type {Metadata} from "next";
import {BdeTeaser} from "@/components/bde-teaser";
import {DemoSection} from "@/components/demo-section";
import {FaqSection} from "@/components/faq-section";
import {GalereSection} from "@/components/galere-section";
import {Hero} from "@/components/hero";
import {ModulesSection} from "@/components/modules-section";
import {ProTeaser} from "@/components/pro-teaser";
import {HomeStructuredData} from "@/components/structured-data";
import {TimelineSection} from "@/components/timeline-section";
import {TrustSection} from "@/components/trust-section";
import {UseCasesSection} from "@/components/usecases-section";
import {DownloadSection} from "@/components/download-section";
import {YatuRevealSection} from "@/components/yatu-reveal-section";
import {pageMetadata} from "@/lib/site";

/** Search intent: organiser un événement entre amis. */
export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Yatu - l’appli pour organiser un événement entre amis",
  description: `Soirée, anniversaire, week-end ou voyage entre amis : Yatu réunit la discussion, le budget partagé, le planning et l’album photo. Disponible sur iOS et Android.`,
});

/**
 * Accueil - the home page, implemented from Accueil.dc.html
 * in the "Site vitrine Yatu" design project.
 *
 * Each section has one editorial job and does not repeat its neighbour:
 * hero (what it is) - galère (the problem) - reveal (the answer) - démo (how
 * it works) - modules (what you switch on) - timeline (when it helps) - cas
 * d’usage (which occasions) - engagements (why trust it) - téléchargement -
 * BDE - Yatu Pro (clubs, lieux, festivals) - FAQ.
 *
 * The design file exposed props on this page; they are constants here
 * until there is a reason to make them configurable:
 *   showBdeTeaser  true  - the BDE / associations band
 */
export default function Page() {
  return (
    <main style={{ background: "#F7F4ED" }}>
      <HomeStructuredData />
      <Hero />
      <GalereSection />
      <YatuRevealSection />
      <DemoSection />
      <ModulesSection />
      <TimelineSection />
      <UseCasesSection />
      <TrustSection />
      <DownloadSection />
      <BdeTeaser />
      <ProTeaser />
      <FaqSection />
    </main>
  );
}
