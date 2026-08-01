"use client";

import { useEffect, type RefObject } from "react";

const EASE = "cubic-bezier(.2,.8,.2,1)";

/**
 * Scroll-driven timeline - port of setupTimeline() from site-motion.js.
 *
 * A line fills, a marker runs down it, and each `[data-timeline-step]` lights up
 * as the marker passes its midpoint. Styles are written straight to the DOM
 * inside a rAF so scrolling stays cheap.
 *
 * Used by the home page’s "avant / pendant / après" section and by the BDE
 * page’s "déroulé"; the markup differs, the mechanics don’t.
 */
export function useTimeline(
  rootRef: RefObject<HTMLDivElement | null>,
  fillRef: RefObject<HTMLDivElement | null>,
  markerRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const steps = Array.from(root.querySelectorAll<HTMLElement>("[data-timeline-step]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    steps.forEach((st) => {
      st.style.transition = reduce ? "none" : `opacity 340ms ${EASE}, transform 340ms ${EASE}`;
    });

    function update() {
      if (!root) return;
      const r = root.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (window.innerHeight * 0.66 - r.top) / r.height));

      if (fillRef.current) fillRef.current.style.height = `${p * 100}%`;
      if (markerRef.current) markerRef.current.style.top = `${p * 100}%`;

      const reached = p * r.height;

      steps.forEach((st) => {
        const sr = st.getBoundingClientRect();
        const mid = sr.top + sr.height / 2 - r.top;
        const on = reached >= mid - 30;

        st.style.opacity = on ? "1" : "0.3";
        st.style.transform = on ? "translateY(0)" : "translateY(12px)";

        const dot = st.querySelector<HTMLElement>("[data-timeline-dot]");
        if (dot) {
          dot.style.background = on ? "#2A343D" : "#F7F4ED";
          dot.style.borderColor = on ? "#2A343D" : "#EBE7DE";
        }

        const mark = st.querySelector<HTMLElement>("[data-timeline-check]");
        if (mark) mark.style.opacity = on ? "1" : "0";
      });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    const settle = window.setTimeout(update, 400);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(settle);
    };
  }, [rootRef, fillRef, markerRef]);
}

/** The line, the fill and the running marker - identical on both timelines. */
export const TIMELINE_RAIL = {
  track: {
    position: "absolute",
    left: 23,
    top: 0,
    bottom: 0,
    width: 2,
    background: "#EBE7DE",
  },
  fill: {
    position: "absolute",
    left: 23,
    top: 0,
    width: 2,
    height: "0%",
    background: "#2A343D",
  },
  marker: {
    position: "absolute",
    left: 24,
    top: 0,
    width: 14,
    height: 14,
    borderRadius: 80,
    background: "#FED873",
    boxShadow: "0 0 0 4px #2A343D",
    transform: "translate(-50%,-50%)",
    zIndex: 2,
  },
  dotSmall: {
    position: "absolute",
    left: -55,
    top: "50%",
    marginTop: -9,
    width: 18,
    height: 18,
    borderRadius: 80,
    background: "#F7F4ED",
    border: "2px solid #EBE7DE",
    transition: `background 240ms ${EASE}, border-color 240ms ${EASE}`,
  },
} satisfies Record<string, React.CSSProperties>;
