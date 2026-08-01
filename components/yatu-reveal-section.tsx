import { Decor } from "@/components/decor";
import {
  ACCENT,
  YATU_REVEAL_BENEFITS,
  YATU_REVEAL_LEDE,
  YATU_REVEAL_SCREENS,
  icon,
} from "@/lib/content";
import { YATU_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const [EVENT_SCREEN, BUDGET_SCREEN] = YATU_REVEAL_SCREENS;

/**
 * "Voici Yatu" - the answer to the group chat that goes nowhere, one section
 * above it. Copy on the left, the event itself on the right: the page says
 * what Yatu is and shows it in the same breath, in one section rather than
 * two. The creation flow belongs to the demo further down, so the screens
 * here are the ones a group actually lives in - the event page in front, the
 * budget peeking out behind it.
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
            Un espace partagé, rien que pour ton événement.
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
                  loading="lazy"
                  decoding="async"
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

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          {/*
            The two phones overlap inside one box sized by the taller of them:
            the event page fills the left 72%, the budget sits behind it at 54%
            and runs past the bottom-right corner. Percentages keep the pair
            together at any width, so the composition shrinks instead of
            stacking on mobile.
          */}
          <div
            data-reveal="scale"
            data-reveal-delay="100"
            style={{ position: "relative", width: "100%", maxWidth: 420, aspectRatio: "100 / 158" }}
          >
            <img
              loading="lazy"
              decoding="async"
              src={BUDGET_SCREEN.src}
              alt={BUDGET_SCREEN.alt}
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: "54%",
                display: "block",
                filter: "drop-shadow(0 18px 28px rgba(42,52,61,.16))",
              }}
            />
            <img
              loading="lazy"
              decoding="async"
              src={EVENT_SCREEN.src}
              alt={EVENT_SCREEN.alt}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "72%",
                display: "block",
                filter: "drop-shadow(0 30px 44px rgba(42,52,61,.22))",
              }}
            />
          </div>

          <div
            data-reveal="stagger"
            data-reveal-delay="200"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 16,
              width: "100%",
              maxWidth: 420,
            }}
          >
            {YATU_REVEAL_SCREENS.map((screen) => (
              <div
                key={screen.src}
                style={{
                  flex: "1 1 190px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 7,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#FFFFFF",
                    border: "1px solid #EBE7DE",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontFamily: UI,
                    fontWeight: 700,
                    fontSize: 13,
                    color: "#2A343D",
                  }}
                >
                  {screen.label}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 14,
                    lineHeight: 1.45,
                    color: "rgba(42,52,61,.68)",
                    textWrap: "pretty",
                  }}
                >
                  {screen.caption}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
