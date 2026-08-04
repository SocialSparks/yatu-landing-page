import { Decor } from "@/components/decor";
import type { DecorItem } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * The shell shared by "Mentions légales" and "Politique de confidentialité":
 * a narrow column of white cards over the drifting decor.
 */
export function LegalPage({
  badge,
  title,
  updatedAt,
  lede,
  warning,
  decor,
  children,
}: {
  badge: string;
  title: string;
  updatedAt: string;
  lede?: string;
  warning?: React.ReactNode;
  decor: DecorItem[];
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(40px,6vw,72px) 0 clamp(64px,9vw,112px)",
      }}
    >
      <Decor items={decor} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div
          data-reveal="up"
          style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}
        >
          <span
            style={{
              alignSelf: "flex-start",
              background: "#EFE8DE",
              borderRadius: 999,
              padding: "7px 14px",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 13,
              color: "#4E565D",
            }}
          >
            {badge}
          </span>
          <h1
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(32px,4.4vw,46px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              color: "#2A343D",
            }}
          >
            {title}
          </h1>
          <p style={{ margin: 0, fontFamily: UI, fontSize: 15, color: "#71787E" }}>
            Dernière mise à jour : {updatedAt}
          </p>
          {lede ? (
            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 17,
                lineHeight: 1.55,
                color: "rgba(42,52,61,.8)",
                textWrap: "pretty",
              }}
            >
              {lede}
            </p>
          ) : null}
        </div>

        {warning ? (
          <div
            style={{
              background: "#FED873",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              gap: 12,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontFamily: UI,
                fontSize: 14,
                lineHeight: 1.5,
                color: "#2A343D",
                textWrap: "pretty",
              }}
            >
              {warning}
            </span>
          </div>
        ) : null}

        {children}
      </div>
    </main>
  );
}

/** One white card with a numbered heading. */
export function LegalSection({
  title,
  gap = 12,
  children,
}: {
  title: string;
  gap?: number;
  children: React.ReactNode;
}) {
  return (
    <section
      data-reveal="up"
      style={{
        background: "#FFFFFF",
        border: "1px solid #EBE7DE",
        borderRadius: 16,
        padding: "clamp(22px,3vw,30px)",
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 20,
          lineHeight: 1.25,
          letterSpacing: "-.02em",
          color: "#2A343D",
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Body copy inside a legal card. */
export function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: UI,
        fontSize: 16,
        lineHeight: 1.6,
        color: "rgba(42,52,61,.8)",
        textWrap: "pretty",
      }}
    >
      {children}
    </p>
  );
}

/** Emphasised term. */
export function B({ children }: { children: React.ReactNode }) {
  return <strong style={{ fontWeight: 700, color: "#2A343D" }}>{children}</strong>;
}

/** A field still waiting on real information before go-live. */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ background: "#FED873", padding: "1px 5px", borderRadius: 4, color: "#2A343D" }}>
      {children}
    </span>
  );
}

/** Bulleted line with the small dark dot. */
export function Bullet({
  children,
  color = "#2A343D",
  size = 16,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <span
      style={{
        display: "flex",
        gap: 11,
        alignItems: "flex-start",
        fontFamily: UI,
        fontSize: size,
        lineHeight: 1.5,
        color: "rgba(42,52,61,.8)",
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: 80,
          background: color,
          flex: "none",
          marginTop: 9,
        }}
      />
      {children}
    </span>
  );
}
