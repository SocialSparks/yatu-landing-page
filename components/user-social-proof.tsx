import {USER_COUNT} from "@/lib/content";

const UI = "var(--font-ui), system-ui, sans-serif";

/** The four quarters of the avatar sprite, one face each. */
const POSITIONS = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];

const BUBBLE: React.CSSProperties = {
  width: 42,
  height: 42,
  marginLeft: -11,
  flex: "none",
  border: "3px solid #F7F4ED",
  borderRadius: 999,
  boxShadow: "0 3px 10px rgba(42,52,61,.12)",
};

/** Faces, a "+300" bubble and one line: the people already on the app. */
export function UserSocialProof() {
  return (
    <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
      <span aria-hidden="true" style={{ display: "flex", paddingLeft: 11 }}>
        {POSITIONS.map((position) => (
          <span
            key={position}
            style={{
              ...BUBBLE,
              // image-set lets the browser pick the WebP and leaves the JPEG
              // for anything that cannot: a background has no <picture>.
              backgroundImage:
                "image-set(url('/assets/user-avatars-320.webp') type('image/webp'), url('/assets/user-avatars.jpg') type('image/jpeg'))",
              backgroundSize: "200% 200%",
              backgroundPosition: position,
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
        <span
          style={{
            ...BUBBLE,
            display: "grid",
            placeItems: "center",
            background: "#FED873",
            fontFamily: UI,
            fontWeight: 900,
            fontSize: 12,
            letterSpacing: "-.02em",
            color: "#2A343D",
          }}
        >
          +{USER_COUNT}
        </span>
      </span>

      <p
        style={{
          margin: 0,
          fontFamily: UI,
          fontSize: 15,
          lineHeight: 1.4,
          color: "#4E565D",
          textWrap: "pretty",
        }}
      >
        Rejoins plus de{" "}
        <strong style={{ color: "#2A343D", fontWeight: 900 }}>{USER_COUNT} utilisateurs</strong>{" "}
        déjà sur Yatu.
      </p>
    </div>
  );
}
