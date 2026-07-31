"use client";

export const OPEN_COOKIES_EVENT = "yatu:open-cookies";

/** Re-opens the consent panel from the footer. */
export function ConsentButton() {
  return (
    <button
      type="button"
      className="yq-footer-link"
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIES_EVENT))}
      style={{
        alignSelf: "flex-start",
        background: "none",
        border: 0,
        padding: 0,
        cursor: "pointer",
        fontFamily: "var(--font-ui), system-ui, sans-serif",
        fontSize: 15,
        color: "rgba(255,255,255,.78)",
        textDecoration: "underline",
        textUnderlineOffset: 3,
      }}
    >
      Modifier mon consentement
    </button>
  );
}
