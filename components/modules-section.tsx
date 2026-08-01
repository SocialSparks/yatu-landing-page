"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/section-heading";
import { SectionCta } from "@/components/section-cta";
import { ACCENT, MODULES, PRESETS, icon, type ModuleKey, type Preset } from "@/lib/content";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";
const EASE = "200ms var(--ease-standard)";

const DEFAULT_ACTIVE: ModuleKey[] = ["chat", "infos", "planning", "budget", "liste", "img"];

export function ModulesSection() {
  const [active, setActive] = useState<ModuleKey[]>(DEFAULT_ACTIVE);
  const [preset, setPreset] = useState("weekend");

  function toggle(key: ModuleKey) {
    const mod = MODULES.find((m) => m.key === key);
    if (!mod || mod.locked) return;
    setPreset("custom");
    setActive((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : prev.concat(key)));
  }

  function pick(p: Preset) {
    if (!p.on) {
      setPreset("custom");
      return;
    }
    setPreset(p.key);
    setActive(p.on.slice());
  }

  const activeModules = MODULES.filter((m) => active.includes(m.key));
  const n = activeModules.length;
  const resume = `${n}${n > 1 ? " modules actifs sur " : " module actif sur "}${MODULES.length}`;

  return (
    <section id="solution" style={{ background: "#2A343D", padding: "clamp(56px,8vw,104px) 0" }}>
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Une app qui s'adapte"
          badgeBg={ACCENT.meadow}
          title="Tout ce qu'il faut. Rien de trop."
          titleMaxCh={20}
          onDark
          marginBottom="clamp(38px,4.5vw,56px)"
          lede="Active seulement les outils utiles à ton événement : budget, tâches, planning, documents ou souvenirs. Le chat reste toujours disponible pour le groupe."
        />

        <div
          data-r="chip-row"
          data-reveal="up"
          data-reveal-delay="160"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 9,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 26,
          }}
        >
          <span
            style={{
              fontFamily: UI,
              fontWeight: 600,
              fontSize: 13,
              color: "rgba(255,255,255,.45)",
              marginRight: 4,
            }}
          >
            Essaie :
          </span>
          {PRESETS.map((p) => {
            const on = preset === p.key;
            return (
              <button
                key={p.key}
                type="button"
                onClick={() => pick(p)}
                aria-pressed={on}
                style={{
                  cursor: "pointer",
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 14,
                  transition: `background ${EASE}, color ${EASE}`,
                  background: on ? "#FFFFFF" : "rgba(255,255,255,.06)",
                  color: on ? "#2A343D" : "rgba(255,255,255,.75)",
                  border: `1px solid ${on ? "#FFFFFF" : "rgba(255,255,255,.16)"}`,
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
            gap: 16,
          }}
        >
          {MODULES.map((m) => {
            const on = active.includes(m.key);
            return (
              <button
                key={m.key}
                type="button"
                onClick={() => toggle(m.key)}
                aria-pressed={on}
                disabled={m.locked}
                style={{
                  textAlign: "left",
                  borderRadius: 16,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  transition: `background ${EASE}, border-color ${EASE}`,
                  cursor: m.locked ? "default" : "pointer",
                  background: on ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.02)",
                  border: `1px solid ${on ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.07)"}`,
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    width: "100%",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 36,
                      height: 36,
                      display: "block",
                      flex: "none",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      transition: `opacity ${EASE}`,
                      backgroundImage: `url("${m.icon}")`,
                      opacity: on ? 1 : 0.28,
                    }}
                  />
                  <span
                    style={{
                      flex: "none",
                      width: 46,
                      height: 27,
                      borderRadius: 999,
                      padding: 3,
                      display: "flex",
                      alignItems: "center",
                      transition: `background ${EASE}`,
                      background: on ? "#96E087" : "rgba(255,255,255,.18)",
                    }}
                  >
                    <span
                      style={{
                        width: 21,
                        height: 21,
                        borderRadius: 80,
                        background: "#FFFFFF",
                        transition: `transform ${EASE}`,
                        transform: on ? "translateX(19px)" : "translateX(0px)",
                      }}
                    />
                  </span>
                </span>

                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    transition: `color ${EASE}`,
                    color: on ? "#FFFFFF" : "rgba(255,255,255,.45)",
                  }}
                >
                  {m.label}
                </span>

                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.45,
                    transition: `color ${EASE}`,
                    color: on ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.3)",
                  }}
                >
                  {m.desc}
                </span>

                <span
                  style={{
                    alignSelf: "flex-start",
                    borderRadius: 999,
                    padding: "4px 10px",
                    fontFamily: UI,
                    fontWeight: 700,
                    fontSize: 11,
                    background: "rgba(150,224,135,.16)",
                    color: "#96E087",
                    transition: `opacity ${EASE}`,
                    opacity: m.locked ? 1 : 0,
                  }}
                >
                  Toujours actif
                </span>
              </button>
            );
          })}

          <div
            style={{
              borderRadius: 16,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              border: "1px dashed rgba(255,255,255,.24)",
              background: "transparent",
            }}
          >
            <img
              src={icon("bell")}
              alt=""
              style={{ width: 36, height: 36, display: "block", opacity: 0.65 }}
            />
            <span
              style={{
                fontFamily: DISPLAY,
                fontSize: 20,
                lineHeight: 1.2,
                letterSpacing: "-.02em",
                color: "rgba(255,255,255,.62)",
              }}
            >
              Et d&apos;autres à venir
            </span>
            <span
              style={{
                fontFamily: UI,
                fontSize: 15,
                lineHeight: 1.45,
                color: "rgba(255,255,255,.42)",
              }}
            >
              Cagnotte, covoiturage, sondages… On ajoute les modules que vous nous réclamez.
            </span>
          </div>
        </div>

        <div
          data-reveal="up"
          style={{
            marginTop: 22,
            background: "rgba(255,255,255,.06)",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 16,
            padding: "20px 24px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "14px 20px",
          }}
        >
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: 18,
              letterSpacing: "-.02em",
              color: "#FFFFFF",
            }}
          >
            Ton événement
          </span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {activeModules.map((m) => (
              <span
                key={m.key}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,.1)",
                  borderRadius: 999,
                  padding: "7px 14px 7px 8px",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 24,
                    height: 24,
                    display: "block",
                    flex: "none",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundImage: `url("${m.icon}")`,
                  }}
                />
                <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 13, color: "#FFFFFF" }}>
                  {m.label}
                </span>
              </span>
            ))}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontFamily: UI,
              fontSize: 14,
              color: "rgba(255,255,255,.55)",
            }}
          >
            {resume}
          </span>
        </div>

        <SectionCta
          title="Prêt à l'essayer sur ton prochain événement ?"
          body="Rejoins la liste pour recevoir Yatu au lancement, ou reviens à la démo pour voir ces modules en situation."
          primary={{ href: ROUTES.liste, label: "Rejoindre la liste" }}
          secondary={{ href: ROUTES.fonctionnement, label: "Revoir la démo" }}
          onDark
          accent={ACCENT.sky}
        />
      </div>
    </section>
  );
}
