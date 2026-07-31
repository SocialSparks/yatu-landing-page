"use client";

import { useRef } from "react";
import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { ACCENT, TIMELINE } from "@/lib/content";
import { CYCLE_DECOR } from "@/lib/decor";
import { TIMELINE_RAIL, useTimeline } from "@/lib/use-timeline";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";
const EASE = "cubic-bezier(.2,.8,.2,1)";

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 6.5 11.5 12.5 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The scroll-driven "avant / pendant / après" timeline. Mechanics live in
 * useTimeline(); this component only supplies the markup.
 */
export function TimelineSection() {
  const rootRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useTimeline(rootRef, fillRef, markerRef);

  return (
    <section
      id="cycle"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={CYCLE_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Avant, pendant, après"
          badgeBg={ACCENT.sky}
          title="On ne vous lâche à aucun moment."
          titleMaxCh={20}
          ledeMaxCh={42}
          lede="Du premier « et si on partait ? » au dernier souvenir. Fais défiler."
        />

        <div
          ref={rootRef}
          data-timeline=""
          style={{ position: "relative", maxWidth: 720, margin: "0 auto", paddingLeft: 70 }}
        >
          <div style={TIMELINE_RAIL.track} />
          <div ref={fillRef} data-timeline-fill="" style={TIMELINE_RAIL.fill} />
          <div ref={markerRef} data-timeline-marker="" style={TIMELINE_RAIL.marker} />

          {TIMELINE.map((step, i) =>
            step.kind === "phase" ? (
              <div
                key={i}
                data-timeline-step=""
                style={{
                  position: "relative",
                  margin: "34px 0 16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
              >
                <span
                  data-timeline-dot=""
                  data-r="tl-dot-lg"
                  style={{
                    position: "absolute",
                    left: -58,
                    top: 14,
                    width: 24,
                    height: 24,
                    borderRadius: 80,
                    background: "#F7F4ED",
                    border: "2px solid #EBE7DE",
                    transition: `background 240ms ${EASE}, border-color 240ms ${EASE}`,
                  }}
                />
                <span
                  style={{
                    fontFamily: UI,
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: ".16em",
                    color: step.labelColor,
                  }}
                >
                  {step.label}
                </span>
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: "clamp(24px,3vw,30px)",
                    lineHeight: 1.1,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  {step.title}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.45,
                    color: "rgba(42,52,61,.65)",
                    maxWidth: "52ch",
                  }}
                >
                  {step.desc}
                </span>
              </div>
            ) : (
              <div
                key={i}
                data-timeline-step=""
                style={{
                  position: "relative",
                  marginBottom: 12,
                  background: step.dark ? "#2A343D" : "#FFFFFF",
                  border: `1px solid ${step.dark ? "#2A343D" : "#EBE7DE"}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                }}
              >
                <span
                  data-timeline-dot=""
                  data-r="tl-dot-sm"
                  style={TIMELINE_RAIL.dotSmall}
                />
                <img
                  src={step.icon}
                  alt=""
                  style={{ width: 36, height: 36, display: "block", flex: "none" }}
                />
                <span style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: DISPLAY,
                      fontSize: 18,
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
                <span
                  data-timeline-check=""
                  aria-hidden="true"
                  style={{
                    marginLeft: "auto",
                    flex: "none",
                    width: 26,
                    height: 26,
                    borderRadius: 80,
                    background: "#96E087",
                    color: "#2A343D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: `opacity 240ms ${EASE}`,
                  }}
                >
                  <Check />
                </span>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
