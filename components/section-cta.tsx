import { NavLink } from "@/components/nav-link";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

type Action = {
  href: string;
  label: string;
};

export function SectionCta({
  title,
  body,
  primary,
  secondary,
  onDark = false,
  accent = "#FED873",
}: {
  title: string;
  body: string;
  primary: Action;
  secondary?: Action;
  onDark?: boolean;
  accent?: string;
}) {
  return (
    <div
      data-reveal="up"
      data-tone={onDark ? "dark" : "light"}
      className="yq-section-cta"
      style={
        {
          "--yq-section-cta-accent": accent,
        } as React.CSSProperties
      }
    >
      <div className="yq-section-cta-copy">
        <span className="yq-section-cta-dot" aria-hidden="true" />
        <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(20px,2.4vw,26px)",
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              color: onDark ? "#FFFFFF" : "#2A343D",
            }}
          >
            {title}
          </span>
          <span
            style={{
              maxWidth: "58ch",
              fontFamily: UI,
              fontSize: 15,
              lineHeight: 1.5,
              color: onDark ? "rgba(255,255,255,.66)" : "rgba(42,52,61,.68)",
            }}
          >
            {body}
          </span>
        </span>
      </div>

      <div className="yq-section-cta-actions">
        <NavLink href={primary.href} className="yq-section-cta-primary">
          {primary.label}
          <span aria-hidden="true">→</span>
        </NavLink>
        {secondary ? (
          <NavLink href={secondary.href} className="yq-section-cta-secondary">
            {secondary.label}
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
