"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_KEY,
  OPEN_COOKIES_EVENT,
  readConsent,
  type Consent,
} from "@/components/consent-button";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";
const PANEL: React.CSSProperties = {
  pointerEvents: "auto",
  width: "100%",
  maxWidth: 560,
  background: "#FFFFFF",
  border: "1px solid #EBE7DE",
  borderRadius: 16,
  boxShadow: "0px 8px 24px 0px rgba(42,52,61,.0784)",
  display: "flex",
  flexDirection: "column",
};

const PRIMARY: React.CSSProperties = {
  border: 0,
  cursor: "pointer",
  background: "#2A343D",
  color: "#FFFFFF",
  fontFamily: UI,
  fontWeight: 700,
  fontSize: 15,
  padding: "12px 20px",
  borderRadius: 16,
};

const SECONDARY: React.CSSProperties = {
  cursor: "pointer",
  background: "none",
  border: 0,
  boxShadow: "inset 0 0 0 2px #2A343D",
  color: "#2A343D",
  fontFamily: UI,
  fontWeight: 700,
  fontSize: 15,
  padding: "12px 20px",
  borderRadius: 16,
};

function Toggle({ on }: { on: boolean }) {
  return (
    <span
      style={{
        flex: "none",
        width: 48,
        height: 28,
        borderRadius: 999,
        padding: 3,
        display: "flex",
        alignItems: "center",
        transition: "background 200ms var(--ease-standard)",
        background: on ? "#44B678" : "#D4D6D8",
      }}
    >
      <span
        style={{
          width: 22,
          height: 22,
          borderRadius: 80,
          background: "#FFFFFF",
          boxShadow: "0 1px 3px rgba(0,0,0,.2)",
          transition: "transform 200ms var(--ease-standard)",
          transform: on ? "translateX(20px)" : "translateX(0px)",
        }}
      />
    </span>
  );
}

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [social, setSocial] = useState(false);

  useEffect(() => {
    const saved: Consent | null = readConsent();

    let timer: number | undefined;
    if (saved) {
      setAnalytics(!!saved.analytics);
      setSocial(!!saved.social);
    } else {
      // let the page paint before asking
      timer = window.setTimeout(() => setShowBanner(true), 700);
    }

    const open = () => {
      setShowBanner(false);
      setShowPanel(true);
    };
    window.addEventListener(OPEN_COOKIES_EVENT, open);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(OPEN_COOKIES_EVENT, open);
    };
  }, []);

  function persist(nextAnalytics: boolean, nextSocial: boolean) {
    const value: Consent = {
      analytics: nextAnalytics,
      social: nextSocial,
      ts: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
    } catch {
      /* storage blocked */
    }
    // Hook point: load the measurement tag here when nextAnalytics is true.
    window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT));
    setAnalytics(nextAnalytics);
    setSocial(nextSocial);
    setShowBanner(false);
    setShowPanel(false);
  }

  if (!showBanner && !showPanel) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 90,
        display: "flex",
        justifyContent: "center",
        padding: 16,
        pointerEvents: "none",
      }}
    >
      {showBanner ? (
        <div role="dialog" aria-label="Cookies" style={{ ...PANEL, padding: "20px 22px", gap: 14 }}>
          <p
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 15,
              lineHeight: 1.5,
              color: "rgba(42,52,61,.8)",
              textWrap: "pretty",
            }}
          >
            On dépose quelques cookies pour savoir si ce site est utile, et c’est à peu près
            tout. Tu peux accepter, refuser ou choisir.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <button type="button" className="yq-btn-dark" style={PRIMARY} onClick={() => persist(true, true)}>
              Tout accepter
            </button>
            <button
              type="button"
              className="yq-btn-light"
              style={SECONDARY}
              onClick={() => persist(false, false)}
            >
              Tout refuser
            </button>
            <button
              type="button"
              onClick={() => {
                setShowBanner(false);
                setShowPanel(true);
              }}
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                background: "none",
                border: 0,
                padding: "6px 2px",
                fontFamily: UI,
                fontWeight: 600,
                fontSize: 14,
                color: "#4E565D",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Personnaliser
            </button>
          </div>
        </div>
      ) : null}

      {showPanel ? (
        <div role="dialog" aria-label="Préférences de cookies" style={{ ...PANEL, padding: 22, gap: 18 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: DISPLAY,
                fontWeight: 400,
                fontSize: 18,
                lineHeight: 1.2,
                letterSpacing: "-.02em",
                color: "#2A343D",
              }}
            >
              Tes préférences de cookies
            </h2>
            <button
              type="button"
              className="yq-close-btn"
              onClick={() => setShowPanel(false)}
              aria-label="Fermer"
              style={{
                marginLeft: "auto",
                cursor: "pointer",
                border: 0,
                background: "#EFE8DE",
                color: "#2A343D",
                width: 32,
                height: 32,
                borderRadius: 80,
                fontFamily: UI,
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "#F7F4ED",
                borderRadius: 12,
                padding: "14px 16px",
              }}
            >
              <div style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#2A343D" }}>
                  Strictement nécessaires
                </span>
                <span style={{ fontFamily: UI, fontSize: 13, lineHeight: 1.4, color: "#71787E" }}>
                  Mémorisent ton choix de consentement. Impossible de les désactiver.
                </span>
              </div>
              <span style={{ flex: "none", fontFamily: UI, fontWeight: 600, fontSize: 13, color: "#71787E" }}>
                Toujours actifs
              </span>
            </div>

            {[
              {
                title: "Mesure d’audience",
                desc: "Pages vues et inscriptions, en statistiques agrégées.",
                on: analytics,
                toggle: () => setAnalytics((v) => !v),
              },
              {
                title: "Contenus des réseaux sociaux",
                desc: "Publications Instagram ou TikTok intégrées aux pages.",
                on: social,
                toggle: () => setSocial((v) => !v),
              },
            ].map((row) => (
              <button
                key={row.title}
                type="button"
                onClick={row.toggle}
                aria-pressed={row.on}
                className="yq-row-btn"
                style={{
                  textAlign: "left",
                  cursor: "pointer",
                  border: "1px solid #EBE7DE",
                  background: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <span style={{ flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#2A343D" }}>
                    {row.title}
                  </span>
                  <span style={{ fontFamily: UI, fontSize: 13, lineHeight: 1.4, color: "#71787E" }}>
                    {row.desc}
                  </span>
                </span>
                <Toggle on={row.on} />
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
            <button
              type="button"
              className="yq-btn-dark"
              style={PRIMARY}
              onClick={() => persist(analytics, social)}
            >
              Enregistrer mes choix
            </button>
            <button
              type="button"
              className="yq-btn-light"
              style={SECONDARY}
              onClick={() => persist(true, true)}
            >
              Tout accepter
            </button>
            <Link
              href={ROUTES.cookies}
              style={{
                marginLeft: "auto",
                fontFamily: UI,
                fontWeight: 600,
                fontSize: 14,
                color: "#4E565D",
              }}
            >
              En savoir plus
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
