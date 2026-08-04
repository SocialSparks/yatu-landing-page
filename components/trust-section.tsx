import {NavLink} from "@/components/nav-link";
import {SectionHeading} from "@/components/section-heading";
import {ACCENT, icon} from "@/lib/content";
import {ROUTES} from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";
const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";

const COMMITMENTS = [
  {
    tool: "heart",
    accent: ACCENT.coral,
    title: "Jamais utilisées pour la pub",
    body: "Tes données servent à faire fonctionner et sécuriser Yatu. Elles ne sont ni vendues ni louées, et ne servent pas au ciblage publicitaire.",
  },
  {
    tool: "documents",
    accent: ACCENT.sky,
    title: "Protégées avec soin",
    body: "Accès restreints, connexions chiffrées et conservation encadrée : la protection de tes données guide nos choix à chaque étape.",
  },
  {
    tool: "pin",
    accent: ACCENT.sunbeam,
    title: "Imaginée et faite en France",
    body: "Yatu est une application française, conçue et développée en France par une équipe française.",
  },
] as const;

/**
 * A short trust pause before the signup section. The legal page carries the
 * details; this section makes the three product commitments visible without
 * turning the home page into a privacy policy.
 */
export function TrustSection() {
  return (
    <section style={{ background: "#2A343D", padding: "clamp(56px,7vw,88px) 0" }}>
      <div data-r="gutter" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 24px" }}>
        <SectionHeading
          badge="Nos engagements"
          badgeBg={ACCENT.sunbeam}
          title="Tes événements sont à toi. Tes données aussi."
          lede="Yatu gagne ta confiance en protégeant ce que tu lui confies, jamais en l’exploitant pour de la publicité."
          ledeMaxCh={57}
          marginBottom="clamp(32px,4vw,48px)"
          onDark
        />

        <div
          data-reveal="stagger"
          data-reveal-delay="150"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(260px,100%),1fr))",
            gap: 16,
          }}
        >
          {COMMITMENTS.map((commitment) => (
            <article
              key={commitment.title}
              style={{
                position: "relative",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 16,
                minHeight: 228,
                padding: "24px",
                background: "rgba(255,255,255,.075)",
                border: "1px solid rgba(255,255,255,.13)",
                borderRadius: 24,
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: "0 auto 0 0",
                  width: 4,
                  background: commitment.accent,
                }}
              />
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 46,
                  height: 46,
                  background: "#FFFFFF",
                  borderRadius: 15,
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={icon(commitment.tool)}
                  alt=""
                  style={{ width: 30, height: 30, display: "block" }}
                />
              </span>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: DISPLAY,
                    fontWeight: 400,
                    fontSize: 22,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#FFFFFF",
                  }}
                >
                  {commitment.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: "rgba(255,255,255,.7)",
                    textWrap: "pretty",
                  }}
                >
                  {commitment.body}
                </p>
              </div>
            </article>
          ))}
        </div>

        <p
          data-reveal="up"
          data-reveal-delay="390"
          style={{
            margin: "24px 0 0",
            fontFamily: UI,
            fontSize: 14,
            lineHeight: 1.5,
            color: "rgba(255,255,255,.58)",
            textAlign: "center",
          }}
        >
          Le traitement des données sur ce site est expliqué simplement dans notre{" "}
          <NavLink
            href={ROUTES.confidentialite}
            style={{ color: "#FFFFFF", textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            politique de confidentialité
          </NavLink>
          .
        </p>
      </div>
    </section>
  );
}
