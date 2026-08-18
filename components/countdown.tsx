"use client";

import {useEffect, useState} from "react";
import {LAUNCH_DATE} from "@/lib/content";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

const LAUNCH_MS = new Date(LAUNCH_DATE).getTime();

/** Le temps qui reste, tel quel : 20 j 23 h 08 m se lit "20 JOURS". */
function parts(now: number) {
  const s = Math.floor(Math.max(0, LAUNCH_MS - now) / 1000);
  return {
    jours: Math.floor(s / 86400),
    heures: pad(Math.floor(s / 3600) % 24),
    minutes: pad(Math.floor(s / 60) % 60),
    secondes: pad(s % 60),
  };
}

const PARIS = new Intl.DateTimeFormat("en-US", {
  timeZone: "Europe/Paris",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Minuit UTC du jour civil parisien contenant `ms` - une clé de date comparable. */
function parisDay(ms: number) {
  const p = PARIS.formatToParts(ms);
  const get = (type: string) => Number(p.find((x) => x.type === type)?.value);
  return Date.UTC(get("year"), get("month") - 1, get("day"));
}

const LAUNCH_DAY = parisDay(LAUNCH_MS);

/**
 * Le "J–N" du badge, qui compte des jours au calendrier et non des tranches de
 * 24 h : le 19 août à Paris il reste 21 jours avant le 9 septembre, quelle que
 * soit l'heure qu'il est - alors que `parts()` dirait encore 20 jours et 23 h.
 * Les deux bornes sont des minuits UTC, donc la soustraction tombe juste même
 * si un changement d'heure sépare aujourd'hui de la sortie.
 */
function daysUntilLaunch(now: number) {
  return Math.max(0, Math.round((LAUNCH_DAY - parisDay(now)) / 86400000));
}

/**
 * Both readouts render from the server’s clock and then re-sync on mount, so
 * there is no layout shift and no blank frame - the values simply refresh.
 */
function useNow(tick: boolean) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    if (!tick) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  return now;
}

/** "J–NNN" - the days-remaining chip in the hero badge. */
export function DaysUntil() {
  const jours = daysUntilLaunch(useNow(false));
  return (
    <span suppressHydrationWarning style={{ color: "#71787E", fontWeight: 600 }}>
      J–{jours}
    </span>
  );
}

const CELL: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #EBE7DE",
  borderRadius: "clamp(10px,3vw,16px)",
  padding: "clamp(9px,2.5vw,14px) clamp(3px,1.8vw,18px)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 2,
  flex: "1 1 0",
  minWidth: 0,
  overflow: "hidden",
};

const NUM: React.CSSProperties = {
  fontFamily: DISPLAY,
  fontSize: "clamp(21px,8vw,42px)",
  lineHeight: 1,
  color: "#2A343D",
  fontVariantNumeric: "tabular-nums",
  whiteSpace: "nowrap",
};

const LABEL: React.CSSProperties = {
  fontFamily: UI,
  fontWeight: 700,
  fontSize: "clamp(8px,2vw,11px)",
  letterSpacing: ".04em",
  color: "#71787E",
  whiteSpace: "nowrap",
};

/**
 * The four-cell countdown above the bottom-of-page signup.
 *
 * `tone="dark"` is for the ink card on /go: the three white cells already read
 * on ink, so only the caption and the accent cell - which is ink itself, and
 * would vanish into the card - change.
 */
export function Countdown({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  const c = parts(useNow(true));
  const dark = tone === "dark";

  return (
    <div data-reveal="scale" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span
        style={{
          ...LABEL,
          fontSize: 12,
          letterSpacing: ".16em",
          ...(dark ? { color: "rgba(255,255,255,.55)" } : {}),
        }}
      >
        AVANT LA SORTIE
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          gap: "clamp(3px,1.5vw,9px)",
          width: "min(100%, 440px)",
        }}
      >
        <span style={CELL}>
          <span suppressHydrationWarning style={NUM}>
            {c.jours}
          </span>
          <span style={LABEL}>JOURS</span>
        </span>
        <span style={CELL}>
          <span suppressHydrationWarning style={NUM}>
            {c.heures}
          </span>
          <span style={LABEL}>HEURES</span>
        </span>
        <span style={CELL}>
          <span suppressHydrationWarning style={NUM}>
            {c.minutes}
          </span>
          <span style={LABEL}>MINUTES</span>
        </span>
        <span
          style={{
            ...CELL,
            background: dark ? "rgba(255,255,255,.09)" : "#2A343D",
            border: `1px solid ${dark ? "rgba(255,255,255,.16)" : "#2A343D"}`,
          }}
        >
          <span suppressHydrationWarning style={{ ...NUM, color: "#FED873" }}>
            {c.secondes}
          </span>
          <span style={{ ...LABEL, color: "rgba(255,255,255,.55)" }}>SECONDES</span>
        </span>
      </div>
    </div>
  );
}
