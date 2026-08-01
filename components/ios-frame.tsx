/**
 * Interactive screen mounted beneath the transparent iPhone mockup supplied
 * with the landing-page assets. The frame stays above the demo without
 * intercepting pointer events.
 */
export function IOSDevice({
  children,
  width = 418,
  height = 850,
  dark = false,
}: {
  children?: React.ReactNode;
  width?: number;
  height?: number;
  dark?: boolean;
}) {
  return (
    <div
      style={{
        width,
        height,
        flex: "none",
        position: "relative",
        fontFamily: "-apple-system, system-ui, sans-serif",
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "19px 23px 21px 22px",
          overflow: "hidden",
          borderRadius: 39,
          background: dark ? "#000000" : "#F2F2F7",
          zIndex: 1,
        }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "auto" }}>{children}</div>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 34,
          left: 53,
          right: 48,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: dark ? "#FFFFFF" : "#000000",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: '-apple-system, "SF Pro", system-ui',
            fontWeight: 600,
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          9:41
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">
            <rect x="0" y="8" width="3" height="4" rx="0.7" fill="currentColor" />
            <rect x="5" y="5.5" width="3" height="6.5" rx="0.7" fill="currentColor" />
            <rect x="10" y="3" width="3" height="9" rx="0.7" fill="currentColor" />
            <rect x="15" width="3" height="12" rx="0.7" fill="currentColor" />
          </svg>
          <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true">
            <path
              d="M1.4 4.4A10 10 0 0 1 15.6 4.4L14.3 5.7A8.2 8.2 0 0 0 2.7 5.7L1.4 4.4Zm2.8 2.8a6 6 0 0 1 8.6 0l-1.3 1.3a4.2 4.2 0 0 0-6 0L4.2 7.2ZM7 10.4a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              fill="currentColor"
            />
          </svg>
          <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden="true">
            <rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".35" />
            <rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" />
            <path d="M25 4.5v4c.8-.3 1.5-1.3 1.5-2s-.7-1.7-1.5-2Z" fill="currentColor" opacity=".4" />
          </svg>
        </span>
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 29,
          zIndex: 1,
          width: 139,
          height: 5,
          borderRadius: 999,
          background: dark ? "rgba(255,255,255,.7)" : "rgba(0,0,0,.25)",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}
      />

      <img
        loading="lazy"
        decoding="async"
        src="/mockups/iphone_transparent.png"
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 2,
          filter: "drop-shadow(0 32px 46px rgba(0,0,0,.18))",
        }}
      />
    </div>
  );
}
