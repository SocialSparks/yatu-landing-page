const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * The centred badge + title + lede that opens most sections.
 */
export function SectionHeading({
  badge,
  badgeBg,
  title,
  lede,
  onDark = false,
  titleMaxCh,
  ledeMaxCh = 44,
  marginBottom = "clamp(44px,5.5vw,72px)",
}: {
  badge: string;
  badgeBg: string;
  title: string;
  lede?: string;
  onDark?: boolean;
  titleMaxCh?: number;
  ledeMaxCh?: number;
  marginBottom?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 22,
        marginBottom,
      }}
    >
      <span
        data-reveal="up"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 9,
          background: badgeBg,
          color: "#2A343D",
          borderRadius: 999,
          padding: "11px 21px",
          fontFamily: UI,
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: ".005em",
        }}
      >
        {badge}
      </span>

      <h2
        data-reveal="up"
        data-reveal-delay="70"
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: "clamp(34px,4.8vw,56px)",
          lineHeight: 1.08,
          letterSpacing: "-.025em",
          color: onDark ? "#FFFFFF" : "#2A343D",
          textWrap: "balance",
          maxWidth: titleMaxCh ? `${titleMaxCh}ch` : undefined,
        }}
      >
        {title}
      </h2>

      {lede ? (
        <p
          data-reveal="up"
          data-reveal-delay="120"
          style={{
            margin: 0,
            fontFamily: UI,
            fontSize: 18,
            lineHeight: 1.5,
            color: onDark ? "rgba(255,255,255,.7)" : "rgba(42,52,61,.8)",
            maxWidth: `${ledeMaxCh}ch`,
          }}
        >
          {lede}
        </p>
      ) : null}
    </div>
  );
}
