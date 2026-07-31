import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { ACCENT, USE_CASE_ROWS, type UseCase } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const MASK = "linear-gradient(90deg,transparent,#000 5%,#000 95%,transparent)";

function Card({ card }: { card: UseCase }) {
  return (
    <div
      style={{
        flex: "none",
        width: 290,
        height: 300,
        borderRadius: 24,
        overflow: "hidden",
        background: "#EFE8DE",
        position: "relative",
      }}
    >
      {card.photo ? (
        <img
          src={card.photo}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}

      <img
        src={card.icon}
        alt=""
        style={{
          position: "absolute",
          left: 16,
          top: 16,
          width: 42,
          height: 42,
          zIndex: 2,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,.28))",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          padding: 20,
          background: "linear-gradient(180deg,transparent 0%,rgba(0,0,0,.82) 100%)",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            background: card.badge,
            color: "#2A343D",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 12,
            padding: "5px 11px",
            borderRadius: 999,
          }}
        >
          {card.label}
        </span>
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 20,
            lineHeight: 1.15,
            letterSpacing: "-.02em",
            color: "#FFFFFF",
          }}
        >
          {card.title}
        </span>
        <span
          style={{ fontFamily: UI, fontSize: 14, lineHeight: 1.4, color: "rgba(255,255,255,.82)" }}
        >
          {card.sub}
        </span>
      </div>
    </div>
  );
}

export function UseCasesSection() {
  return (
    <section
      id="usages"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={USAGES_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Les cas d'usage"
          badgeBg={ACCENT.blush}
          title="Une soirée improvisée ou cinq jours à Ibiza."
          titleMaxCh={20}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {USE_CASE_ROWS.map((row, i) => (
            <div
              key={i}
              style={{ overflow: "hidden", maskImage: MASK, WebkitMaskImage: MASK }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  width: "max-content",
                  animation: `yq-sweep ${row.duration} ease-in-out infinite ${
                    row.reverse ? "alternate-reverse" : "alternate"
                  }`,
                }}
              >
                {row.cards.map((card) => (
                  <Card key={card.id} card={card} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          data-reveal="up"
          style={{
            margin: "clamp(34px,4.5vw,52px) auto 0",
            textAlign: "center",
            fontFamily: UI,
            fontSize: 17,
            lineHeight: 1.5,
            color: "rgba(42,52,61,.6)",
            maxWidth: "60ch",
          }}
        >
          Yatu ne fait pas la différence entre une raclette et un festival. Vous choisissez les
          modules qui servent, le reste disparaît.
        </p>
      </div>
    </section>
  );
}
