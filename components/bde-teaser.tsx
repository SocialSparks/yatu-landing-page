import { NavLink } from "@/components/nav-link";
import { icon } from "@/lib/content";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const FEATURES = [
  { tool: "people", label: "Inscriptions validées par le bureau" },
  { tool: "bell", label: "Annonces officielles des organisateurs" },
  { tool: "pin", label: "Chambres, bus et groupes" },
];

export function BdeTeaser() {
  return (
    <section style={{ background: "#F7F4ED", padding: "0 0 clamp(56px,8vw,104px)" }}>
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          data-reveal="up"
          style={{
            background: "#2A343D",
            borderRadius: 28,
            padding: "clamp(28px,4vw,48px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(280px,100%),1fr))",
            gap: 32,
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <span
              style={{
                alignSelf: "flex-start",
                background: "#FED873",
                color: "#2A343D",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 13,
                padding: "7px 14px",
                borderRadius: 999,
              }}
            >
              Pack pilote gratuit
            </span>

            <h2
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(26px,3.2vw,36px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                color: "#FFFFFF",
                textWrap: "balance",
              }}
            >
              Tu organises pour deux cents, pas pour huit ?
            </h2>

            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(255,255,255,.7)",
                maxWidth: "44ch",
                textWrap: "pretty",
              }}
            >
              WEI, gala, séjour ski : Yatu a une page dédiée aux BDE et aux associations
              étudiantes, avec un pack pilote gratuit avant le lancement.
            </p>

            <NavLink
              href={ROUTES.bde}
              className="yq-btn-light"
              style={{
                alignSelf: "flex-start",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#FFFFFF",
                color: "#2A343D",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 16,
                padding: "15px 24px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Voir Yatu pour les BDE
            </NavLink>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 16,
                  padding: "15px 18px",
                }}
              >
                <img
                  loading="lazy"
                  decoding="async"
                  src={icon(f.tool)}
                  alt=""
                  style={{ width: 36, height: 36, display: "block", flex: "none" }}
                />
                <span style={{ fontFamily: UI, fontSize: 15, color: "#FFFFFF" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
