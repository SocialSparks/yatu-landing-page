import { AvatarPair } from "@/components/avatar-pair";
import { CountUp } from "@/components/count-up";
import { Decor } from "@/components/decor";
import { SectionHeading } from "@/components/section-heading";
import { ACCENT, GALERE_MESSAGES, GALERE_STATS, type GalereIcon } from "@/lib/content";
import { GALERE_DECOR } from "@/lib/decor";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

function TypingDot({ delay }: { delay: string }) {
  return (
    <span
      style={{
        width: 7,
        height: 7,
        borderRadius: 80,
        background: "#71787E",
        display: "block",
        animation: `yq-typing 1.3s infinite ${delay}`,
      }}
    />
  );
}

function ProblemIcon({ name, dark = false }: { name: GalereIcon; dark?: boolean }) {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 40,
        height: 40,
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: 12,
        color: dark ? "#FFFFFF" : "#71787E",
        background: dark ? "rgba(255,255,255,.1)" : "#F7F4ED",
        border: `1px solid ${dark ? "rgba(255,255,255,.18)" : "#EBE7DE"}`,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {name === "apps" ? (
          <>
            <rect x="3" y="4" width="14" height="12" rx="2" />
            <path d="M3 8h14M7 20h12a2 2 0 0 0 2-2V8" />
          </>
        ) : null}
        {name === "messages" ? (
          <>
            <rect x="3" y="4" width="18" height="4" rx="2" />
            <rect x="3" y="10" width="14" height="4" rx="2" />
            <rect x="3" y="16" width="10" height="4" rx="2" />
          </>
        ) : null}
        {name === "unresolved" ? (
          <>
            <circle cx="12" cy="12" r="9" />
            <path d="M9.8 9a2.4 2.4 0 1 1 3.3 2.2c-.8.4-1.1.9-1.1 1.8M12 17h.01" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

export function GalereSection() {
  return (
    <section
      id="galere"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#EFE8DE",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={GALERE_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Avant Yatu"
          badgeBg={ACCENT.coral}
          title="Aujourd’hui, organiser à plusieurs, ça ressemble à ça."
          titleMaxCh={18}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
            gap: "clamp(28px,4vw,52px)",
            alignItems: "center",
          }}
        >
          {/* The group chat that never lands on a decision */}
          <div
            data-reveal="scale"
            style={{
              justifySelf: "center",
              width: "100%",
              maxWidth: 520,
              background: "#FFFFFF",
              border: "1px solid #EBE7DE",
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0px 8px 24px 0px rgba(42,52,61,.0784)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "16px 20px",
                background: "#F7F4ED",
                borderBottom: "1px solid #EBE7DE",
              }}
            >
              <AvatarPair height={34} />
              <span style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
                <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#2A343D" }}>
                  Week-end chalet
                </span>
                <span style={{ fontFamily: UI, fontSize: 13, color: "#71787E" }}>
                  8 membres · 47 messages non lus
                </span>
              </span>
            </div>

            <div
              data-reveal="stagger"
              data-reveal-delay="60"
              style={{
                padding: 20,
                display: "flex",
                flexDirection: "column",
                gap: 9,
                background: "#F7F4ED",
              }}
            >
              {GALERE_MESSAGES.map((m, i) =>
                m.mine ? (
                  <div
                    key={i}
                    style={{
                      alignSelf: "flex-end",
                      maxWidth: "82%",
                      background: "#96E087",
                      borderRadius: "16px 16px 5px 16px",
                      padding: "10px 14px",
                    }}
                  >
                    <span style={{ fontFamily: UI, fontSize: 15, lineHeight: 1.4, color: "#2A343D" }}>
                      {m.text}
                    </span>
                  </div>
                ) : (
                  <div
                    key={i}
                    style={{
                      alignSelf: "flex-start",
                      maxWidth: "82%",
                      background: "#FFFFFF",
                      border: "1px solid #EBE7DE",
                      borderRadius: "16px 16px 16px 5px",
                      padding: "10px 14px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                    }}
                  >
                    <span
                      style={{ fontFamily: UI, fontWeight: 700, fontSize: 12, color: m.color }}
                    >
                      {m.who}
                    </span>
                    <span style={{ fontFamily: UI, fontSize: 15, lineHeight: 1.4, color: "#2A343D" }}>
                      {m.text}
                    </span>
                    {m.link ? (
                      <span
                        style={{
                          marginTop: 4,
                          background: "#EFE8DE",
                          borderRadius: 8,
                          padding: "7px 10px",
                          fontFamily: UI,
                          fontSize: 13,
                          color: "#71787E",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {m.link}
                      </span>
                    ) : null}
                  </div>
                ),
              )}

              <div
                style={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#FFFFFF",
                  border: "1px solid #EBE7DE",
                  borderRadius: "16px 16px 16px 5px",
                  padding: "13px 16px",
                }}
              >
                <TypingDot delay="0s" />
                <TypingDot delay=".18s" />
                <TypingDot delay=".36s" />
              </div>
            </div>
          </div>

          {/* The tally */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              maxWidth: 460,
              justifySelf: "center",
            }}
          >
            {GALERE_STATS.map((stat, i) => (
              <div
                key={stat.text}
                data-reveal="left"
                data-reveal-delay={i === 0 ? undefined : String(i * 90)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  background: stat.dark ? "#2A343D" : "#FFFFFF",
                  border: stat.dark ? undefined : "1px solid #EBE7DE",
                  borderRadius: 16,
                  padding: "20px 22px",
                }}
              >
                <ProblemIcon name={stat.icon} dark={stat.dark} />
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 44,
                    lineHeight: 1,
                    color: stat.color,
                    flex: "none",
                  }}
                >
                  {stat.count === 0 ? "0" : <CountUp value={stat.count} />}
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 16,
                    lineHeight: 1.4,
                    color: stat.dark ? "#FFFFFF" : "#2A343D",
                  }}
                >
                  {stat.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
