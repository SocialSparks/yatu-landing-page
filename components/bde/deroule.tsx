"use client";

import { useRef } from "react";
import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { BDE_DEROULE } from "@/lib/bde-content";
import { ACCENT } from "@/lib/content";
import { BDE_DEROULE_DECOR } from "@/lib/decor";
import { TIMELINE_RAIL, useTimeline } from "@/lib/use-timeline";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * "Le déroulé" - same scroll-driven rail as the home page’s timeline, with
 * four numbered stages instead of phases and cards.
 */
export function BdeDeroule() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useTimeline(rootRef, fillRef, markerRef);

  return (
    <section
      id="deroule"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={BDE_DEROULE_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Le déroulé"
          badgeBg={ACCENT.sky}
          title="Yatu se pose autour de ton événement, pas à la place."
          titleMaxCh={20}
          lede="Fais défiler : voilà ce que ton bureau fait, et à quel moment."
        />

        <div
          ref={rootRef}
          data-timeline=""
          style={{ position: "relative", maxWidth: 720, margin: "0 auto", paddingLeft: 70 }}
        >
          <div style={TIMELINE_RAIL.track} />
          <div ref={fillRef} data-timeline-fill="" style={TIMELINE_RAIL.fill} />
          <div ref={markerRef} data-timeline-marker="" style={TIMELINE_RAIL.marker} />

          {BDE_DEROULE.map((step) => (
            <div
              key={step.step}
              data-timeline-step=""
              style={{
                position: "relative",
                marginBottom: 14,
                background: step.dark ? "#2A343D" : "#FFFFFF",
                border: `1px solid ${step.dark ? "#2A343D" : "#EBE7DE"}`,
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span data-timeline-dot="" data-r="tl-dot-sm" style={TIMELINE_RAIL.dotSmall} />
              <img
                loading="lazy"
                decoding="async"
                src={step.icon}
                alt=""
                style={{ width: 38, height: 38, display: "block", flex: "none" }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: UI,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: ".14em",
                    color: step.dark ? "rgba(255,255,255,.45)" : "#71787E",
                  }}
                >
                  {step.step}
                </span>
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 19,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: step.dark ? "#FFFFFF" : "#2A343D",
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: step.dark ? "rgba(255,255,255,.7)" : "rgba(42,52,61,.8)",
                  }}
                >
                  {step.desc}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
