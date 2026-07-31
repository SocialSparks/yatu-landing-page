import { CountUp } from "@/components/count-up";
import { Decor } from "@/components/decor";
import { findAsset } from "@/lib/assets";
import { BDE_CHIPS, BDE_SHOWCASE } from "@/lib/bde-content";
import { icon } from "@/lib/content";
import { BDE_HERO_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/** The `bde-hero` image-slot is still empty in the design project. */
const PHOTO = findAsset(["/assets/bde-hero.png", "/assets/bde-hero.webp", "/assets/bde-hero.jpg"]);

export function BdeHero() {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "clamp(24px,4vw,52px) 0 clamp(48px,7vw,80px)",
      }}
    >
      <Decor items={BDE_HERO_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(360px,100%),1fr))",
          gap: "clamp(32px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 600 }}>
          <span
            data-reveal="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              alignSelf: "flex-start",
              background: "#FED873",
              borderRadius: 999,
              padding: "9px 16px",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 13,
              color: "#2A343D",
            }}
          >
            <span
              style={{ width: 8, height: 8, borderRadius: 80, background: "#2A343D", flex: "none" }}
            />
            Pack pilote gratuit - places limitées
          </span>

          <h1
            data-reveal="up"
            data-reveal-delay="70"
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(38px,5.2vw,58px)",
              lineHeight: 1.05,
              letterSpacing: "-.028em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            Un WEI à deux cents, sans y laisser ton semestre.
          </h1>

          <p
            data-reveal="up"
            data-reveal-delay="120"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: "clamp(18px,1.6vw,21px)",
              lineHeight: 1.5,
              color: "rgba(42,52,61,.85)",
              maxWidth: "46ch",
            }}
          >
            Yatu donne à ton BDE un espace unique par événement : inscriptions validées, annonces
            officielles, planning, chambres, chat et album souvenirs.
          </p>

          <p
            data-reveal="up"
            data-reveal-delay="155"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(42,52,61,.62)",
              maxWidth: "46ch",
            }}
          >
            Tu gardes ta billetterie. Yatu se branche juste après le paiement : les participants
            arrivent informés, et ton équipe arrête de tout refaire à la main dans trois fichiers
            différents.
          </p>

          <div
            data-reveal="up"
            data-reveal-delay="200"
            style={{ display: "flex", flexWrap: "wrap", gap: 12 }}
          >
            <a
              href="#demo"
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
                padding: "16px 24px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 80,
                  background: "#FED873",
                  flex: "none",
                }}
              />
              Demander une démo
            </a>
            <a
              href="#pilote"
              className="yq-btn-light"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#FFFFFF",
                border: "1px solid #EBE7DE",
                color: "#2A343D",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 16,
                padding: "16px 24px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              Voir le pack pilote
            </a>
          </div>

          <div
            data-reveal="stagger"
            data-reveal-delay="250"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px 10px" }}
          >
            {BDE_CHIPS.map((chip) => (
              <span
                key={chip.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  background: "#FFFFFF",
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
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 80,
                    background: chip.dot,
                    flex: "none",
                  }}
                />
                {chip.label}
              </span>
            ))}
          </div>
        </div>

        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>
            <div
              data-reveal="scale"
              data-reveal-delay="110"
              style={{
                position: "relative",
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid #EBE7DE",
                background: "#FFFFFF",
                boxShadow: "0 24px 60px rgba(42,52,61,.14)",
              }}
            >
              <div style={{ position: "relative", height: 230, background: "#EFE8DE" }}>
                {PHOTO ? (
                  <img
                    src={PHOTO}
                    alt="Week-end d'intégration"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : null}
              </div>

              <div
                style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 20,
                      lineHeight: 1.2,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {BDE_SHOWCASE.title}
                  </span>
                  <span
                    style={{
                      background: "#96E087",
                      color: "#2A343D",
                      fontFamily: UI,
                      fontWeight: 700,
                      fontSize: 12,
                      padding: "5px 10px",
                      borderRadius: 999,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {BDE_SHOWCASE.status}
                  </span>
                </div>

                <div
                  style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}
                >
                  {BDE_SHOWCASE.stats.map((s) => (
                    <div
                      key={s.label}
                      style={{
                        background: "#F7F4ED",
                        borderRadius: 12,
                        padding: 14,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <span style={{ fontFamily: DISPLAY, fontSize: 22, color: "#2A343D" }}>
                        <CountUp value={s.count} />
                      </span>
                      <span style={{ fontFamily: UI, fontSize: 12, color: "#71787E" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#F7F4ED",
                    border: "1px solid #EBE7DE",
                    borderRadius: 12,
                    padding: "14px 16px",
                  }}
                >
                  <img
                    src={icon("bell")}
                    alt=""
                    style={{ width: 34, height: 34, display: "block", flex: "none" }}
                  />
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span
                      style={{ fontFamily: UI, fontWeight: 700, fontSize: 14, color: "#2A343D" }}
                    >
                      {BDE_SHOWCASE.announcement.title}
                    </span>
                    <span style={{ fontFamily: UI, fontSize: 13, color: "#4E565D" }}>
                      {BDE_SHOWCASE.announcement.body}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <img
              src={icon("people")}
              alt=""
              data-float=""
              data-r="decor-l"
              style={
                {
                  position: "absolute",
                  left: "clamp(-46px, calc(50vw - 100% - 20px), 0px)",
                  top: "13%",
                  width: 48,
                  height: 48,
                  display: "block",
                  filter: "drop-shadow(0 8px 18px rgba(42,52,61,.2))",
                  "--yq-amp": "10px",
                  "--yq-dur": "4.40s",
                  "--yq-lag": "1.50s",
                } as React.CSSProperties
              }
            />
            <img
              src={icon("pin")}
              alt=""
              data-float=""
              data-r="decor-r"
              style={
                {
                  position: "absolute",
                  right: "clamp(-40px, calc(50vw - 100% - 20px), 0px)",
                  top: "58%",
                  width: 42,
                  height: 42,
                  display: "block",
                  filter: "drop-shadow(0 8px 18px rgba(42,52,61,.2))",
                  "--yq-amp": "12px",
                  "--yq-dur": "5.50s",
                  "--yq-lag": "0.04s",
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
