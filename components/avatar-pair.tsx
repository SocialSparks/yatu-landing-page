import { hasAsset } from "@/lib/assets";

const SRC = "/assets/avatar-pair.png";

/**
 * The overlapping pair of member avatars used in the hero pill and the
 * group-chat card. Falls back to a CSS rendition in the event palette when
 * the source bitmap isn't present (see lib/assets.ts).
 */
export function AvatarPair({ height = 30 }: { height?: number }) {
  if (hasAsset(SRC)) {
    return (
      <img src={SRC} alt="" style={{ height, width: "auto", display: "block", flex: "none" }} />
    );
  }

  const overlap = Math.round(height * 0.32);
  const ring = Math.max(2, Math.round(height * 0.07));

  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-flex",
        alignItems: "center",
        flex: "none",
        height,
        paddingRight: overlap,
      }}
    >
      {[
        { bg: "#FF7676", initial: "L" },
        { bg: "#6FC6F1", initial: "M" },
      ].map((a, i) => (
        <span
          key={a.initial}
          style={{
            width: height,
            height,
            borderRadius: 80,
            background: a.bg,
            border: `${ring}px solid #FFFFFF`,
            marginLeft: i === 0 ? 0 : -overlap,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-ui)",
            fontWeight: 700,
            fontSize: Math.round(height * 0.42),
            color: "#2A343D",
            boxSizing: "border-box",
          }}
        >
          {a.initial}
        </span>
      ))}
    </span>
  );
}
