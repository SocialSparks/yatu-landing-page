"use client";

export const OPEN_COOKIES_EVENT = "yatu:open-cookies";

/** Fired by CookieBanner once a choice is stored, so /cookies can show it live. */
export const CONSENT_CHANGED_EVENT = "yatu:consent-changed";

export const CONSENT_KEY = "yatu-consent-v1";

export type Consent = { analytics: boolean; social: boolean; ts: string };

export function readConsent(): Consent | null {
  try {
    return JSON.parse(window.localStorage.getItem(CONSENT_KEY) || "null");
  } catch {
    return null;
  }
}

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
