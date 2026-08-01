const UI = "var(--font-ui), system-ui, sans-serif";

const POSITIONS = ["0% 0%", "100% 0%", "0% 100%", "100% 100%"];

export function WaitlistSocialProof() {
  return (
    <div
      data-reveal="up"
      data-reveal-delay="130"
      style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 12 }}
    >
      <span aria-hidden="true" style={{ display: "flex", paddingLeft: 2 }}>
        {POSITIONS.map((position, index) => (
          <span
            key={position}
            style={{
              width: 42,
              height: 42,
              marginLeft: index === 0 ? 0 : -11,
              border: "3px solid #F7F4ED",
              borderRadius: 999,
              // image-set lets the browser pick the WebP and leaves the JPEG
              // for anything that cannot: a background has no <picture>.
              backgroundImage:
                "image-set(url('/assets/waitlist-avatars-320.webp') type('image/webp'), url('/assets/waitlist-avatars.jpg') type('image/jpeg'))",
              backgroundSize: "200% 200%",
              backgroundPosition: position,
              backgroundRepeat: "no-repeat",
              boxShadow: "0 3px 10px rgba(42,52,61,.12)",
            }}
          />
        ))}
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
        Rejoins les <strong style={{ color: "#2A343D", fontWeight: 900 }}>premiers inscrits</strong>
        {" "}qui attendent déjà Yatu.
      </p>
    </div>
  );
}
