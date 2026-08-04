"use client";

import { useEffect, useState } from "react";
import { LAUNCH_DATE } from "@/lib/content";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const pad = (n: number) => (n < 10 ? `0${n}` : String(n));

function parts(now: number) {
  const left = Math.max(0, new Date(LAUNCH_DATE).getTime() - now);
  const s = Math.floor(left / 1000);
  return {
    jours: Math.floor(s / 86400),
    heures: pad(Math.floor(s / 3600) % 24),
    minutes: pad(Math.floor(s / 60) % 60),
    secondes: pad(s % 60),
  };
}

/**
 * Both readouts render from the server’s clock and then re-sync on mount, so
 * there is no layout shift and no blank frame - the values simply refresh.
 */
function useLaunchClock(tick: boolean) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    setNow(Date.now());
    if (!tick) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [tick]);

  return parts(now);
}

/** "J–NNN" - the days-remaining chip in the hero badge. */
export function DaysUntil() {
  const { jours } = useLaunchClock(false);
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

/** The four-cell countdown above the bottom-of-page signup. */
export function Countdown() {
  const c = useLaunchClock(true);

  return (
    <div data-reveal="scale" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={{ ...LABEL, fontSize: 12, letterSpacing: ".16em" }}>AVANT LA SORTIE</span>
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
        <span style={{ ...CELL, background: "#2A343D", border: "1px solid #2A343D" }}>
          <span suppressHydrationWarning style={{ ...NUM, color: "#FED873" }}>
            {c.secondes}
          </span>
          <span style={{ ...LABEL, color: "rgba(255,255,255,.55)" }}>SECONDES</span>
        </span>
      </div>
    </div>
  );
}
