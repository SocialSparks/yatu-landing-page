import type { Metadata } from "next";
import { AppDownloadButtons } from "@/components/app-download-buttons";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Decor } from "@/components/decor";
import { FaqSection } from "@/components/faq-section";
import { RelatedCard } from "@/components/landing/guide-page";
import { NavLink } from "@/components/nav-link";
import { Picture } from "@/components/picture";
import { SectionCta } from "@/components/section-cta";
import { SectionHeading } from "@/components/section-heading";
import { AboutStructuredData } from "@/components/structured-data";
import { ABOUT, ABOUT_PATH, ABOUT_PROFILES, ABOUT_UPDATED } from "@/lib/about-content";
import { COMPARISON_PAGES } from "@/lib/comparison-content";
import { ACCENT, APP_STORE_URL, CTA, MODULES, PLAY_STORE_URL } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import { HOME_CRUMB, ROUTES } from "@/lib/routes";
import { formatDateFr, pageMetadata } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

const BODY: React.CSSProperties = {
  margin: 0,
  fontFamily: UI,
  fontSize: 16.5,
  lineHeight: 1.65,
  color: "rgba(42,52,61,.8)",
  textWrap: "pretty",
};

/** Search intent: "qu'est-ce que Yatu ?" - the brand, in facts. */
export const metadata: Metadata = pageMetadata({
  path: ABOUT_PATH,
  title: "Qu’est-ce que Yatu ? L’appli pour organiser entre amis - Yatu",
  description:
    "Yatu en bref : une application française et gratuite pour organiser un événement entre amis. Ce qu’elle fait, son prix, ses plateformes, ses limites et qui l’édite.",
  image: `${ABOUT_PATH}/opengraph-image`,
});

const TRAIL = [HOME_CRUMB, { name: "Qu’est-ce que Yatu ?", path: ABOUT_PATH }];

const STORE_LINKS = [
  { label: "App Store", href: APP_STORE_URL },
  { label: "Google Play", href: PLAY_STORE_URL },
  ...ABOUT_PROFILES,
];

/**
 * /qu-est-ce-que-yatu - the identity card.
 *
 * Facts first (a definition list an assistant can quote line by line), then
 * what the app does, for which occasions, what it does not do, who makes it,
 * and where to compare it. Copy lives in lib/about-content.ts.
 */
export default function Page() {
  return (
    <main style={{ background: "#F7F4ED" }}>
      <AboutStructuredData trail={TRAIL} />

      {/* ── La définition ────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(28px,4vw,44px) 0 clamp(48px,7vw,88px)" }}>
        <Decor items={USAGES_DECOR} />

        <div data-r="gutter" style={GUTTER}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 14px" }}>
            <Breadcrumbs trail={TRAIL} />
            <time dateTime={ABOUT_UPDATED} style={{ fontFamily: UI, fontSize: 14, color: "rgba(42,52,61,.5)" }}>
              Mis à jour le {formatDateFr(ABOUT_UPDATED)}
            </time>
          </div>

          <div
            data-r="guide-hero"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)",
              gap: "clamp(28px,4vw,56px)",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  alignSelf: "flex-start",
                  background: ACCENT.sunbeam,
                  color: "#2A343D",
                  borderRadius: 999,
                  padding: "11px 21px",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Yatu en bref
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
                }}
              >
                {ABOUT.h1}
              </h1>
              <p style={{ ...BODY, fontSize: 18, maxWidth: "58ch" }}>{ABOUT.lede}</p>
              <AppDownloadButtons />
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <Picture
                src="/mockups/iphone_homepage.svg"
                alt="Écran d’accueil de Yatu : les événements en cours et à venir, et les albums des événements passés"
                widths={[418, 836]}
                sizes="(max-width: 920px) 62vw, 280px"
                width={418}
                height={850}
                priority
                style={{
                  width: "100%",
                  maxWidth: 280,
                  height: "auto",
                  display: "block",
                  filter: "drop-shadow(0 22px 32px rgba(42,52,61,.18))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Les faits ────────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Fiche d’identité"
            badgeBg={ACCENT.sunbeam}
            title={ABOUT.factsTitle}
            titleMaxCh={20}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <div className="yq-table-wrap" style={{ maxWidth: 860, margin: "0 auto" }}>
            <table className="yq-table">
              <tbody>
                {ABOUT.facts.map((fact) => (
                  <tr key={fact.label}>
                    <th scope="row">{fact.label}</th>
                    <td>{fact.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── À quoi ça sert ───────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Les modules"
            badgeBg={ACCENT.sky}
            title={ABOUT.usesTitle}
            lede={ABOUT.usesLede}
            titleMaxCh={22}
            ledeMaxCh={56}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <ul
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))",
              gap: 14,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {[...MODULES.map((module) => ({ label: module.label, desc: module.desc })), ...ABOUT.extraUses].map((use) => (
              <li
                key={use.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    fontSize: 19,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  {use.label}
                </h3>
                <p style={{ ...BODY, fontSize: 14.5, lineHeight: 1.5, color: "rgba(42,52,61,.7)" }}>{use.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Pour quels événements, et ce qu'elle ne fait pas ─────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div
          data-r="gutter"
          style={{
            ...GUTTER,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "clamp(36px,5vw,64px)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(26px,3.2vw,34px)",
                lineHeight: 1.12,
                letterSpacing: "-.025em",
                color: "#2A343D",
              }}
            >
              {ABOUT.occasionsTitle}
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", gap: 10 }}>
              {ABOUT.occasions.map((occasion) => (
                <li key={occasion.href}>
                  <NavLink
                    href={occasion.href}
                    className="yq-lift"
                    style={{
                      display: "inline-flex",
                      background: "#F7F4ED",
                      border: "1px solid #EBE7DE",
                      borderRadius: 999,
                      padding: "10px 18px",
                      fontFamily: UI,
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#2A343D",
                      textDecoration: "none",
                    }}
                  >
                    {occasion.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(26px,3.2vw,34px)",
                lineHeight: 1.12,
                letterSpacing: "-.025em",
                color: "#2A343D",
              }}
            >
              {ABOUT.limitsTitle}
            </h2>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {ABOUT.limits.map((limit) => (
                <li key={limit} style={{ ...BODY, fontSize: 16, display: "flex", gap: 10 }}>
                  <span aria-hidden="true" style={{ fontWeight: 700, color: "#2A343D" }}>
                    –
                  </span>
                  <span>{limit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Qui est derrière ─────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="L’éditeur"
            badgeBg={ACCENT.lilac}
            title={ABOUT.whoTitle}
            titleMaxCh={22}
            marginBottom="clamp(28px,4vw,40px)"
          />
          <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {ABOUT.who.map((paragraph) => (
              <p key={paragraph} style={BODY}>
                {paragraph}
              </p>
            ))}
            <p style={{ ...BODY, fontSize: 15.5 }}>
              Yatu ailleurs :{" "}
              {STORE_LINKS.map((link, i) => (
                <span key={link.href}>
                  {i > 0 ? ", " : null}
                  <a href={link.href} rel="noopener" target="_blank" style={{ color: "#2A343D" }}>
                    {link.label}
                  </a>
                </span>
              ))}
              . Pour les associations étudiantes,{" "}
              <NavLink href={ROUTES.bde} style={{ color: "#2A343D" }}>
                la page BDE
              </NavLink>
              .
            </p>
          </div>

          <SectionCta
            title="Le plus simple, c’est d’essayer."
            body="Gratuit sur iPhone et Android. Crée un événement et invite ton groupe."
            primary={{ href: ROUTES.telecharger, label: CTA.download }}
            secondary={{ href: ROUTES.fonctionnement, label: CTA.demo }}
            accent={ACCENT.sunbeam}
          />
        </div>
      </section>

      {/* ── Les questions ────────────────────────────────────────────── */}
      <FaqSection items={[...ABOUT.faq]} title="Les questions sur Yatu" />

      {/* ── Comparer ─────────────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Comparer"
            badgeBg={ACCENT.blush}
            title="Yatu face aux autres outils"
            titleMaxCh={22}
            marginBottom="clamp(30px,4vw,48px)"
          />
          <div
            data-reveal="stagger"
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 14 }}
          >
            {COMPARISON_PAGES.map((page) => (
              <RelatedCard key={page.slug} slug={page.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
