import { BdeTeaser } from "@/components/bde-teaser";
import { CookieBanner } from "@/components/cookie-banner";
import { DemoSection } from "@/components/demo-section";
import { FaqSection } from "@/components/faq-section";
import { GalereSection } from "@/components/galere-section";
import { Hero } from "@/components/hero";
import { ModulesSection } from "@/components/modules-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TimelineSection } from "@/components/timeline-section";
import { UseCasesSection } from "@/components/usecases-section";
import { WaitlistSection } from "@/components/waitlist-section";

/**
 * Accueil — the pre-launch home page, implemented from Accueil.dc.html
 * in the "Site vitrine Yatu pré-lancement" design project.
 *
 * The design file exposed three props on this page; they are constants here
 * until there is a reason to make them configurable:
 *   showCountdown  true  — the countdown above the bottom signup
 *   showBdeTeaser  true  — the BDE / associations band
 *   waitlistCta    "Je rejoins la liste"
 */
export default function Page() {
  return (
    <>
      <SiteHeader />

      <main style={{ background: "#F7F4ED" }}>
        <Hero />
        <GalereSection />
        <ModulesSection />
        <TimelineSection />
        <UseCasesSection />
        <DemoSection />
        <WaitlistSection />
        <BdeTeaser />
        <FaqSection />
      </main>

      <SiteFooter />
      <CookieBanner />
    </>
  );
}
