import { icon } from "@/lib/content";

const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * What signing up commits you to. Deliberately no count of registrations and no
 * faces: we would be inventing both.
 */
const POINTS = [
  { tool: "bell", label: "Une seule annonce : celle du lancement" },
  { tool: "heart", label: "Aucune publicité, aucune revente d’adresse" },
  { tool: "people", label: "Tu te désinscris quand tu veux" },
];

export function WaitlistReassurance() {
  return (
    <div
      data-reveal="stagger"
      data-reveal-delay="130"
      style={{ display: "flex", flexDirection: "column", gap: 9 }}
    >
      {POINTS.map((point) => (
        <span
          key={point.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            fontFamily: UI,
            fontSize: 15,
            lineHeight: 1.4,
            color: "#4E565D",
          }}
        >
          <img
            loading="lazy"
            decoding="async"
            src={icon(point.tool)}
            alt=""
            style={{ width: 26, height: 26, display: "block", flex: "none" }}
          />
          {point.label}
        </span>
      ))}
    </div>
  );
}
