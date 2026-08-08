import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Decor } from "@/components/decor";
import { NavLink } from "@/components/nav-link";
import { Picture } from "@/components/picture";
import { SectionCta } from "@/components/section-cta";
import { SectionHeading } from "@/components/section-heading";
import { LandingIndexStructuredData } from "@/components/structured-data";
import { WaitlistForm } from "@/components/waitlist-form";
import { ACCENT, CTA, LAUNCH_LABEL } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import { GUIDE_PAGES, landingPath } from "@/lib/landing-content";
import { HOME_CRUMB, GUIDES_CRUMB, ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

/** Search intent: the hub every occasion guide links back to. */
export const metadata: Metadata = pageMetadata({
  path: ROUTES.organiser,
  title: "Organiser un événement entre amis : tous les guides - Yatu",
  description:
    "Week-end, voyage, EVJF, EVG, anniversaire, soirée, ski, dépenses partagées : nos méthodes pour organiser un événement à plusieurs sans relancer le groupe.",
  image: "/organiser/opengraph-image",
});

const TRAIL = [HOME_CRUMB, GUIDES_CRUMB];

/**
 * /organiser - the index of the occasion guides.
 *
 * It exists for two reasons: give a reader who arrives on one guide a way to
 * find the others, and give the guides one parent page that links to all of
 * them. The list comes from LANDING_PAGES, so a new guide shows up here on its
 * own.
 */
export default function Page() {
  return (
    <main style={{ background: "#F7F4ED" }}>
      <LandingIndexStructuredData trail={TRAIL} />

      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "clamp(28px,4vw,44px) 0 clamp(40px,6vw,72px)",
        }}
      >
        <Decor items={USAGES_DECOR} />

        <div data-r="gutter" style={GUTTER}>
          <Breadcrumbs trail={TRAIL} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 22,
              margin: "34px auto 0",
              maxWidth: 780,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                background: ACCENT.sunbeam,
                color: "#2A343D",
                borderRadius: 999,
                padding: "11px 21px",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Les guides
            </span>

            <h1
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(34px,5vw,58px)",
                lineHeight: 1.06,
                letterSpacing: "-.028em",
                color: "#2A343D",
                textWrap: "balance",
              }}
            >
              Organiser un événement entre amis
            </h1>

            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 18,
                lineHeight: 1.55,
                color: "rgba(42,52,61,.8)",
                maxWidth: "60ch",
                textWrap: "pretty",
              }}
            >
              Une méthode par occasion : ce qui bloque, les étapes dans l’ordre, le budget à
              annoncer et les questions que ton groupe va poser. Écrites pour être utiles avant
              même que Yatu ouvre, le {LAUNCH_LABEL}.
            </p>

            <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <WaitlistForm source="guides" />
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Par occasion"
            badgeBg={ACCENT.blush}
            title="Choisis celui qui te concerne"
            titleMaxCh={22}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <div
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
              gap: 18,
            }}
          >
            {GUIDE_PAGES.map((page) => (
              <NavLink
                key={page.slug}
                href={landingPath(page.slug)}
                className="yq-lift"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: 24,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <span style={{ position: "relative", display: "block", height: 172, background: ACCENT.sandDeep }}>
                  <Picture
                    src={page.photo}
                    alt={page.photoAlt}
                    widths={[480, 1040]}
                    sizes="(max-width: 700px) 100vw, 350px"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <span
                    style={{
                      position: "absolute",
                      left: 14,
                      top: 14,
                      background: page.accent,
                      color: "#2A343D",
                      borderRadius: 999,
                      padding: "6px 13px",
                      fontFamily: UI,
                      fontWeight: 700,
                      fontSize: 13,
                    }}
                  >
                    {page.badge}
                  </span>
                </span>

                <span style={{ display: "flex", flexDirection: "column", gap: 9, padding: 22 }}>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 21,
                      lineHeight: 1.18,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {page.cardTitle}
                  </span>
                  <span
                    style={{
                      fontFamily: UI,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "rgba(42,52,61,.68)",
                      textWrap: "pretty",
                    }}
                  >
                    {page.cardSub}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{ marginTop: 4, fontFamily: UI, fontWeight: 700, fontSize: 14.5, color: "#2A343D" }}
                  >
                    Lire le guide →
                  </span>
                </span>
              </NavLink>
            ))}
          </div>

          <SectionCta
            title="Tu organises avec une asso ou un BDE ?"
            body="Le WEI, le gala et les séjours ont leur propre page : inscriptions validées, annonces officielles et pack pilote gratuit."
            primary={{ href: ROUTES.bde, label: "Voir la page BDE" }}
            secondary={{ href: ROUTES.liste, label: CTA.waitlist }}
            accent={ACCENT.meadow}
          />
        </div>
      </section>
    </main>
  );
}
