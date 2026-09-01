const UI = "var(--font-ui), system-ui, sans-serif";

/** Genuine pilot capacity, made visible wherever a BDE can enter the funnel. */
export function BdeAvailability({
  tone = "light",
  compact = false,
}: {
  tone?: "light" | "dark";
  compact?: boolean;
}) {
  return (
    <div
      className="yq-bde-availability"
      data-tone={tone}
      data-compact={compact ? "true" : "false"}
      aria-label="Plus que 3 places disponibles sur 10 pour le programme pilote BDE"
      style={{fontFamily: UI}}
    >
      <div className="yq-bde-availability-copy">
        <span className="yq-bde-availability-dot" aria-hidden="true" />
        <span>
          Plus que <strong>3 places disponibles</strong> sur 10
        </span>
      </div>
      <div className="yq-bde-capacity" aria-hidden="true">
        {Array.from({length: 10}, (_, index) => (
          <span key={index} data-open={index >= 7 ? "true" : "false"} />
        ))}
      </div>
      {compact ? null : <span className="yq-bde-capacity-note">7 BDE déjà sélectionnés</span>}
    </div>
  );
}
