import { Decor } from "@/components/decor";
import { ACCENT, YATU_REVEAL_BENEFITS, YATU_REVEAL_LEDE, icon } from "@/lib/content";
import { YATU_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * "Voici Yatu" - the answer to the group chat that goes nowhere, one section
 * above it. Copy on the left, the screen that opens an event on the right: the
 * page says what Yatu is and shows it in the same breath. The event itself is
 * up close in the section below, and the demo comes after that.
 */
export function YatuRevealSection() {
  return (
    <section
      id="yatu"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={YATU_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(380px,100%),1fr))",
          gap: "clamp(32px,5vw,64px)",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 620 }}>
          <span
            data-reveal="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              alignSelf: "flex-start",
              background: ACCENT.lilac,
              color: "#2A343D",
              borderRadius: 999,
              padding: "11px 21px",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: ".005em",
            }}
          >
            Voici Yatu
          </span>

          <h2
            data-reveal="up"
            data-reveal-delay="70"
            style={{
              margin: 0,
              maxWidth: "20ch",
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(34px,4.8vw,56px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            Un seul espace pour organiser chaque événement entre amis.
          </h2>

          <p
            data-reveal="up"
            data-reveal-delay="120"
            style={{
              margin: 0,
              maxWidth: "48ch",
              fontFamily: UI,
              fontSize: 18,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.8)",
              textWrap: "pretty",
            }}
          >
            {YATU_REVEAL_LEDE}
          </p>

          <div
            data-reveal="stagger"
            data-reveal-delay="160"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {YATU_REVEAL_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: 20,
                  padding: "18px 20px",
                }}
              >
                <img
                  src={icon(benefit.tool)}
                  alt=""
                  style={{ width: 34, height: 34, display: "block", flex: "none" }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 18,
                      lineHeight: 1.2,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    {benefit.title}
                  </span>
                  <span
                    style={{
                      fontFamily: UI,
                      fontSize: 15,
                      lineHeight: 1.5,
                      color: "rgba(42,52,61,.7)",
                      textWrap: "pretty",
                    }}
                  >
                    {benefit.desc}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            data-reveal="scale"
            data-reveal-delay="100"
            style={{
              position: "relative",
              width: 380,
              maxWidth: "100%",
              aspectRatio: "418 / 850",
            }}
          >
            <img
              src="/mockups/iphone_create_event.svg"
              alt="L'écran de création d'un événement Yatu sur iPhone : le type d'événement et les outils à activer - discussion, album, budget, tâches, programme"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 30px 40px rgba(42,52,61,.2))",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
