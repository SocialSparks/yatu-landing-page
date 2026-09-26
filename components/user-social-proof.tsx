import {AppleIcon, GooglePlayIcon} from "@/components/icons";
import {STORE_RATINGS, USER_COUNT} from "@/lib/content";

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

const STORE_ICONS = { app_store: AppleIcon, google_play: GooglePlayIcon };

const outOfFive = (rating: number) => `${rating.toLocaleString("fr-FR")}/5`;

/** Sunbeam, outlined one step darker so it still reads on the sand. */
function Star() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" style={{ display: "block" }}>
      <path
        d="M12 2.6 14.9 8.5l6.5.95-4.7 4.58 1.1 6.47L12 17.45 6.2 20.5l1.1-6.47-4.7-4.58 6.5-.95L12 2.6Z"
        fill="#FED873"
        stroke="#D4B460"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Five stars, then each store's logo and average. The logos keep the line
 * short enough never to wrap on a phone; the sentence spelled out for screen
 * readers (and the agent markdown) names the stores instead.
 */
function StoreRatings() {
  return (
    <p style={{ margin: 0, fontFamily: UI, fontSize: 14, lineHeight: 1.4, color: "#2A343D" }}>
      <span className="yq-sr-only">
        Note moyenne :{" "}
        {STORE_RATINGS.map((store) => `${outOfFive(store.rating)} ${store.where}`).join(" et ")}.
      </span>

      <span
        aria-hidden="true"
        style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "4px 12px" }}
      >
        <span style={{ display: "flex", gap: 1 }}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} />
          ))}
        </span>

        {STORE_RATINGS.map((store) => {
          const StoreIcon = STORE_ICONS[store.id];

          return (
            <span
              key={store.id}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, fontWeight: 900 }}
            >
              <StoreIcon size={14} />
              {outOfFive(store.rating)}
            </span>
          );
        })}
      </span>
    </p>
  );
}

/**
 * Faces, a "+300" bubble and two lines: how the stores rate Yatu, and the
 * people already on it.
 */
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

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <StoreRatings />

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
    </div>
  );
}
