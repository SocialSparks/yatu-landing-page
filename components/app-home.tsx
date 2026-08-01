import { findAsset } from "@/lib/assets";

/** The .webp came from the design project’s image-slot sidecar; the .png is the
 *  higher-resolution original, used automatically once it is added. */
const CANDIDATES = ["/assets/app-home.png", "/assets/app-home.webp"];
const ALT = "L’icône Yatu sur un écran d’accueil iPhone";

const FLOAT: React.CSSProperties = {
  "--yq-amp": "7px",
  "--yq-dur": "5.50s",
  "--yq-lag": "0.39s",
} as React.CSSProperties;

/**
 * The launch section’s illustration: Yatu sitting on a phone home screen.
 * Falls back to a CSS home-screen mock when the source bitmap isn’t present
 * (see lib/assets.ts).
 */
export function AppHome() {
  const src = findAsset(CANDIDATES);

  if (src) {
    return (
      <img
        src={src}
        alt={ALT}
        data-float=""
        style={{
          width: "100%",
          maxWidth: 600,
          height: "auto",
          display: "block",
          ...FLOAT,
        }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={ALT}
      data-float=""
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "1420 / 845",
        borderRadius: 28,
        background: "linear-gradient(160deg, #EFE8DE 0%, #F7F4ED 100%)",
        border: "1px solid #EBE7DE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(18px, 4%, 34px)",
        ...FLOAT,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "clamp(10px, 2.6%, 20px)",
          width: "100%",
          maxWidth: 420,
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const isYatu = i === 5;
          return (
            <span
              key={i}
              style={{
                aspectRatio: "1",
                borderRadius: "24%",
                background: isYatu ? "#FFFFFF" : "rgba(42,52,61,.06)",
                border: isYatu ? "1px solid #EBE7DE" : "1px solid transparent",
                boxShadow: isYatu ? "0px 8px 24px 0px rgba(42,52,61,.0784)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "14%",
              }}
            >
              {isYatu ? (
                <img
                  src="/assets/yatu-wordmark.png"
                  alt=""
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
}
