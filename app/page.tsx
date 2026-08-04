import type {Metadata} from "next";
import {BdeTeaser} from "@/components/bde-teaser";
import {DemoSection} from "@/components/demo-section";
import {FaqSection} from "@/components/faq-section";
import {GalereSection} from "@/components/galere-section";
import {Hero} from "@/components/hero";
import {ModulesSection} from "@/components/modules-section";
import {HomeStructuredData} from "@/components/structured-data";
import {TimelineSection} from "@/components/timeline-section";
import {TrustSection} from "@/components/trust-section";
import {UseCasesSection} from "@/components/usecases-section";
import {WaitlistSection} from "@/components/waitlist-section";
import {YatuRevealSection} from "@/components/yatu-reveal-section";
import {LAUNCH_LABEL} from "@/lib/content";
import {pageMetadata} from "@/lib/site";

/** Search intent: organiser un événement entre amis. */
export const metadata: Metadata = pageMetadata({
  path: "/",
  title: "Yatu - l’appli pour organiser un événement entre amis",
  description: `Soirée, anniversaire, week-end ou voyage entre amis : Yatu réunit la discussion, le budget partagé, les listes, le planning, les documents et l’album photo au même endroit. Sortie le ${LAUNCH_LABEL}.`,
});

/**
 * Accueil - the pre-launch home page, implemented from Accueil.dc.html
 * in the "Site vitrine Yatu pré-lancement" design project.
 *
 * Each section has one editorial job and does not repeat its neighbour:
 * hero (what it is) - galère (the problem) - reveal (the answer) - démo (how
 * it works) - modules (what you switch on) - timeline (when it helps) - cas
 * d’usage (which occasions) - engagements (why trust it) - liste d’attente -
 * BDE - FAQ.
 *
 * The design file exposed three props on this page; they are constants here
 * until there is a reason to make them configurable:
 *   showCountdown  true  - the countdown above the bottom signup
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
      <WaitlistSection />
      <BdeTeaser />
      <FaqSection />
    </main>
  );
}
