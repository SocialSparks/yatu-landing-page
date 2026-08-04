"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  OPEN_COOKIES_EVENT,
  readConsent,
} from "@/components/consent-button";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const NO_CHOICE = "aucun choix enregistré";

function describe(): string {
  const c = readConsent();
  if (!c) return NO_CHOICE;
  const on: string[] = [];
  if (c.analytics) on.push("mesure d’audience");
  if (c.social) on.push("réseaux sociaux");
  return on.length ? `accepté - ${on.join(" et ")}` : "tout refusé";
}

/**
 * "Modifier ton consentement" - the dark card at the top of /cookies.
 *
 * The design polled localStorage every 800ms; here CookieBanner announces the
 * choice on a custom event instead, so the label updates the moment it changes
 * with nothing running in between. `storage` covers changes in another tab.
 */
export function ConsentStatus() {
  const [statut, setStatut] = useState(NO_CHOICE);

  const refresh = useCallback(() => setStatut(describe()), []);

  useEffect(() => {
    refresh();
    window.addEventListener(CONSENT_CHANGED_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return (
    <div
      data-reveal="up"
      style={{
        background: "#2A343D",
        borderRadius: 24,
        padding: "clamp(24px,3vw,32px)",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontFamily: DISPLAY,
          fontWeight: 400,
          fontSize: 22,
          lineHeight: 1.2,
          letterSpacing: "-.02em",
          color: "#FFFFFF",
        }}
      >
        Modifier ton consentement
      </h2>
      <p
        style={{
          margin: 0,
          fontFamily: UI,
          fontSize: 16,
          lineHeight: 1.55,
          color: "rgba(255,255,255,.7)",
          maxWidth: "52ch",
          textWrap: "pretty",
        }}
      >
        Ton choix est enregistré dans ce navigateur. Tu peux le revoir à tout moment, sans
        conséquence sur la navigation.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        <button
          type="button"
          className="yq-btn-light"
          onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COOKIES_EVENT))}
          style={{
            border: 0,
            cursor: "pointer",
            background: "#FFFFFF",
            color: "#2A343D",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 22px",
            borderRadius: 999,
          }}
        >
          Ouvrir mes préférences
        </button>
        <span style={{ fontFamily: UI, fontSize: 14, color: "rgba(255,255,255,.6)" }}>
          Choix actuel :{" "}
          <strong suppressHydrationWarning style={{ fontWeight: 700, color: "#FFFFFF" }}>
            {statut}
          </strong>
        </span>
      </div>
    </div>
  );
}
