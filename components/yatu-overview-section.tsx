import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { ACCENT, YATU_OVERVIEW_POINTS, YATU_OVERVIEW_SCREENS, icon } from "@/lib/content";
import { APERCU_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * "Dans un événement Yatu" - the follow-up to the reveal. Two real screens
 * side by side, then the four things a group stops chasing. Screens are sized
 * by height so both phones come out at the same scale despite the two source
 * renders having different canvases; they wrap onto their own row when the
 * column gets too narrow for the pair.
 */
export function YatuOverviewSection() {
  return (
    <section
      id="apercu"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={APERCU_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Dans un événement Yatu"
          badgeBg={ACCENT.apricot}
          title="Ton groupe retrouve ce qu'il cherche, sans te relancer."
          titleMaxCh={22}
          marginBottom="clamp(32px,4vw,48px)"
          lede="Chaque événement devient un espace partagé, simple à lire et simple à utiliser pour tout le monde."
        />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "clamp(24px,5vw,72px)",
          }}
        >
          {YATU_OVERVIEW_SCREENS.map((screen, i) => (
            <figure
              key={screen.src}
              data-reveal={i === 0 ? "left" : "right"}
              data-reveal-delay={i === 0 ? undefined : "90"}
              style={{
                margin: 0,
                flex: "0 1 340px",
                minWidth: 240,
                maxWidth: 340,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "418 / 850",
                }}
              >
                <img
                  src={screen.src}
                  alt={screen.alt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                    filter: "drop-shadow(0 30px 40px rgba(42,52,61,.2))",
                  }}
                />
              </div>
              <figcaption
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  maxWidth: "34ch",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "#F7F4ED",
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
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(42,52,61,.68)",
                    textWrap: "pretty",
                  }}
                >
                  {screen.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div
          data-reveal="stagger"
          style={{
            marginTop: "clamp(34px,4.5vw,56px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
            gap: 16,
          }}
        >
          {YATU_OVERVIEW_POINTS.map((point) => (
            <div
              key={point.title}
              style={{
                background: "#F7F4ED",
                border: "1px solid #EBE7DE",
                borderRadius: 20,
                padding: 22,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <img
                src={icon(point.tool)}
                alt=""
                style={{ width: 36, height: 36, display: "block" }}
              />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 18,
                  lineHeight: 1.2,
                  letterSpacing: "-.02em",
                  color: "#2A343D",
                }}
              >
                {point.title}
              </span>
              <span
                style={{
                  fontFamily: UI,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: "rgba(42,52,61,.72)",
                  textWrap: "pretty",
                }}
              >
                {point.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
