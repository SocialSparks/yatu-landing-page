import { Breadcrumbs } from "@/components/breadcrumbs";
import { Decor } from "@/components/decor";
import { FaqSection } from "@/components/faq-section";
import { NavLink } from "@/components/nav-link";
import { SectionCta } from "@/components/section-cta";
import { SectionHeading } from "@/components/section-heading";
import { LandingStructuredData } from "@/components/structured-data";
import { WaitlistForm } from "@/components/waitlist-form";
import { ACCENT, CTA, LAUNCH_LABEL, MODULES, icon } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import { type LandingPage, landingBySlug, landingPath } from "@/lib/landing-content";
import { GUIDES_CRUMB, HOME_CRUMB, ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const GUTTER: React.CSSProperties = {
  position: "relative",
  zIndex: 1,
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

/** The trail shown on the page and marked up as a BreadcrumbList. */
export const guideTrail = (page: LandingPage) => [
  HOME_CRUMB,
  GUIDES_CRUMB,
  { name: page.cardTitle, path: landingPath(page.slug) },
];

function Pain({ pain }: { pain: LandingPage["pains"][number] }) {
  return (
    <li
      className="yq-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: 24,
      }}
    >
      <img
        loading="lazy"
        decoding="async"
        src={icon(pain.tool)}
        alt=""
        width={38}
        height={38}
        style={{ width: 38, height: 38, display: "block" }}
      />
      <h3
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 21,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {pain.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: UI,
          fontSize: 15.5,
          lineHeight: 1.55,
          color: "rgba(42,52,61,.72)",
          textWrap: "pretty",
        }}
      >
        {pain.desc}
      </p>
    </li>
  );
}

function Step({ step, index, accent }: { step: LandingPage["steps"][number]; index: number; accent: string }) {
  return (
    <li
      id={`etape-${index + 1}`}
      style={{
        display: "flex",
        gap: 18,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: "24px 26px",
        scrollMarginTop: 100,
      }}
    >
      <span
        aria-hidden="true"
        style={{
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 42,
          height: 42,
          borderRadius: 999,
          background: accent,
          fontFamily: DISPLAY,
          fontSize: 19,
          color: "#2A343D",
        }}
      >
        {index + 1}
      </span>
      <span style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        <h3
          style={{
            margin: 0,
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: 22,
            lineHeight: 1.2,
            letterSpacing: "-.02em",
            color: "#2A343D",
          }}
        >
          {step.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontFamily: UI,
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(42,52,61,.78)",
            maxWidth: "68ch",
            textWrap: "pretty",
          }}
        >
          {step.body}
        </p>
      </span>
    </li>
  );
}

function RelatedCard({ slug }: { slug: string }) {
  const page = landingBySlug(slug);
  if (!page) return null;

  return (
    <NavLink
      href={landingPath(page.slug)}
      className="yq-lift"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 22,
        padding: 22,
        textDecoration: "none",
      }}
    >
      <img
        loading="lazy"
        decoding="async"
        src={page.icon}
        alt=""
        width={34}
        height={34}
        style={{ width: 34, height: 34, display: "block" }}
      />
      <span
        style={{
          fontFamily: DISPLAY,
          fontSize: 19,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {page.cardTitle}
      </span>
      <span style={{ fontFamily: UI, fontSize: 14.5, lineHeight: 1.5, color: "rgba(42,52,61,.66)" }}>
        {page.cardSub}
      </span>
    </NavLink>
  );
}

/**
 * The shape every occasion guide takes: the promise and the signup, what goes
 * wrong, the method, the Yatu modules that carry it, the questions, and the
 * guides next door.
 *
 * The page is one <h1> followed by <h2> sections, each step and each answer
 * visible in the markup - the structured data quotes this page, it never adds
 * to it.
 */
export function GuidePage({ page }: { page: LandingPage }) {
  const trail = guideTrail(page);
  const modules = page.modules
    .map((key) => MODULES.find((module) => module.key === key))
    .filter((module): module is (typeof MODULES)[number] => Boolean(module));

  return (
    <main style={{ background: "#F7F4ED" }}>
      <LandingStructuredData page={page} trail={trail} />

      {/* ── Promesse ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", padding: "clamp(28px,4vw,44px) 0 clamp(48px,7vw,88px)" }}>
        <Decor items={USAGES_DECOR} />

        <div data-r="gutter" style={GUTTER}>
          <Breadcrumbs trail={trail} />

          <div
            data-r="guide-hero"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.05fr) minmax(0,.95fr)",
              gap: "clamp(28px,4vw,56px)",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span
                style={{
                  alignSelf: "flex-start",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: page.accent,
                  color: "#2A343D",
                  borderRadius: 999,
                  padding: "11px 21px",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {page.badge}
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
                {page.h1}
              </h1>

              <p
                style={{
                  margin: 0,
                  fontFamily: UI,
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "rgba(42,52,61,.8)",
                  maxWidth: "56ch",
                  textWrap: "pretty",
                }}
              >
                {page.lede}
              </p>

              <WaitlistForm
                source={page.slug}
                note={`Yatu ouvre le ${LAUNCH_LABEL}. Laisse ton adresse, on te prévient le jour même.`}
              />
            </div>

            <div
              style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid #EBE7DE",
                background: "#EFE8DE",
                aspectRatio: "4 / 3",
              }}
            >
              {/* Above the fold on this page: fetched first, never deferred. */}
              <img
                loading="eager"
                decoding="async"
                fetchPriority="high"
                src={page.photo}
                alt={page.photoAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Ce qui coince ────────────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Le problème"
            badgeBg={ACCENT.sandDeep}
            title={page.painsTitle}
            titleMaxCh={24}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <ul
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
              gap: 16,
              margin: 0,
              padding: 0,
              listStyle: "none",
            }}
          >
            {page.pains.map((pain) => (
              <Pain key={pain.title} pain={pain} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── La méthode ───────────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="La méthode"
            badgeBg={page.accent}
            title={page.stepsTitle}
            lede={page.stepsLede}
            titleMaxCh={22}
            marginBottom="clamp(34px,4.5vw,56px)"
          />

          <ol
            data-reveal="stagger"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              margin: "0 auto",
              padding: 0,
              maxWidth: 860,
              listStyle: "none",
            }}
          >
            {page.steps.map((step, i) => (
              <Step key={step.title} step={step} index={i} accent={page.accent} />
            ))}
          </ol>
        </div>
      </section>

      {/* ── Ce que Yatu réunit ───────────────────────────────────────── */}
      <section style={{ background: "#FFFFFF", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="Avec Yatu"
            badgeBg={ACCENT.sunbeam}
            title="Un seul espace, les outils que tu choisis"
            lede={page.modulesLede}
            titleMaxCh={24}
            marginBottom="clamp(34px,4.5vw,56px)"
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
            {modules.map((module) => (
              <li
                key={module.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  background: "#F7F4ED",
                  border: "1px solid #EBE7DE",
                  borderRadius: 20,
                  padding: 20,
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={module.icon}
                  alt=""
                  width={34}
                  height={34}
                  style={{ width: 34, height: 34, display: "block" }}
                />
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 19,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  {module.label}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 14.5,
                    lineHeight: 1.5,
                    color: "rgba(42,52,61,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {module.desc}
                </span>
              </li>
            ))}
          </ul>

          <SectionCta
            title={`Yatu ouvre le ${LAUNCH_LABEL}.`}
            body="Garde ta place : les inscrits sont prévenus le jour de l’ouverture et créent leur premier événement en premier."
            primary={{ href: ROUTES.liste, label: CTA.waitlist }}
            secondary={{ href: ROUTES.fonctionnement, label: CTA.demo }}
            accent={page.accent}
          />
        </div>
      </section>

      {/* ── Les questions ────────────────────────────────────────────── */}
      <FaqSection items={page.faq} title="Les questions qu’on nous pose" />

      {/* ── Les autres guides ────────────────────────────────────────── */}
      <section style={{ background: "#F7F4ED", padding: "clamp(56px,8vw,96px) 0" }}>
        <div data-r="gutter" style={GUTTER}>
          <SectionHeading
            badge="À lire ensuite"
            badgeBg={ACCENT.blush}
            title="Les autres guides"
            titleMaxCh={20}
            marginBottom="clamp(30px,4vw,48px)"
          />

          <div
            data-reveal="stagger"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))",
              gap: 14,
            }}
          >
            {page.related.map((slug) => (
              <RelatedCard key={slug} slug={slug} />
            ))}
          </div>

          <p
            style={{
              margin: "clamp(28px,4vw,40px) 0 0",
              textAlign: "center",
              fontFamily: UI,
              fontSize: 16,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.66)",
            }}
          >
            <NavLink href={ROUTES.organiser} style={{ color: "#2A343D" }}>
              Voir tous les guides d’organisation
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
}
