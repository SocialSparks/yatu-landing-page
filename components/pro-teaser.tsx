import { NavLink } from "@/components/nav-link";
import { ACCENT, icon, yatuProUrl } from "@/lib/content";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/** Who Yatu Pro is for - the organisers who host a public, not a group of friends. */
const AUDIENCES = [
  { dot: ACCENT.meadow, label: "Clubs de sport" },
  { dot: ACCENT.lilac, label: "Boîtes de nuit et bars" },
  { dot: ACCENT.coral, label: "Festivals et concerts" },
  { dot: ACCENT.sky, label: "Lieux et entreprises" },
];

/** Only what yatu-pro.com actually offers - that page is the reference. */
const FEATURES = [
  { tool: "send", label: "Tes événements visibles dans « Découvrir » de l’app" },
  { tool: "ticket", label: "Inscriptions ou lien vers ta billetterie, sans commission" },
  { tool: "bell", label: "Annonces, discussion modérée et album photo" },
  { tool: "chart", label: "Statistiques de remplissage par événement" },
];

/**
 * The band that sends venues, clubs and festivals to Yatu Pro. Light where the
 * BDE band above it is ink, so the two offers read as two different doors.
 */
export function ProTeaser() {
  return (
    <section
      id="pro"
      style={{ background: "#F7F4ED", padding: "0 0 clamp(56px,8vw,104px)" }}
    >
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          data-reveal="up"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
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
                background: ACCENT.sky,
                color: "#2A343D",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 13,
                padding: "7px 14px",
                borderRadius: 999,
              }}
            >
              Yatu Pro
            </span>

            <h2
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: "clamp(26px,3.2vw,36px)",
                lineHeight: 1.1,
                letterSpacing: "-.02em",
                color: "#2A343D",
                textWrap: "balance",
              }}
            >
              Tu organises pour ton public ?
            </h2>

            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 16,
                lineHeight: 1.55,
                color: "rgba(42,52,61,.75)",
                maxWidth: "46ch",
                textWrap: "pretty",
              }}
            >
              Avec Yatu Pro, tu publies tes événements dans l’app, tu remplis tes soirées, tes
              matchs ou ton festival, et tu gardes le lien avec ta communauté d’un événement à
              l’autre.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px" }}>
              {AUDIENCES.map((a) => (
                <span
                  key={a.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    background: "#F7F4ED",
                    border: "1px solid #EBE7DE",
                    borderRadius: 999,
                    padding: "8px 14px",
                    fontFamily: UI,
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#4E565D",
                  }}
                >
                  <span
                    style={{ width: 7, height: 7, borderRadius: 80, background: a.dot, flex: "none" }}
                  />
                  {a.label}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px" }}>
              <NavLink
                href={yatuProUrl("accueil")}
                className="yq-btn-dark"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 9,
                  background: "#2A343D",
                  color: "#FFFFFF",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "15px 24px",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Découvrir Yatu Pro
                <span aria-hidden="true">→</span>
              </NavLink>
              <span style={{ fontFamily: UI, fontSize: 14, color: "#71787E" }}>
                Dès 10 € par événement, sans abonnement
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {FEATURES.map((f) => (
              <div
                key={f.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "#F7F4ED",
                  border: "1px solid #EBE7DE",
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
                <span style={{ fontFamily: UI, fontSize: 15, color: "#2A343D" }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
