"use client";

import { useEffect, useRef, useState } from "react";
import { Decor } from "@/components/decor";
import { IOSDevice } from "@/components/ios-frame";
import { SectionHeading } from "@/components/section-heading";
import {
  ACCENT,
  DEMO_COULEURS,
  DEMO_ETAPES,
  DEMO_GENS,
  DEMO_TYPES,
  MODULES,
  icon,
  type ModuleKey,
} from "@/lib/content";
import { DEMO_DECOR } from "@/lib/decor";
import { SITE_DOMAIN } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";
const EASE = "200ms var(--ease-standard)";

const WEEKEND = DEMO_TYPES[2];
const TOTAL_PHOTOS = 9;

const INITIAL = {
  step: 0,
  type: WEEKEND.key,
  couleur: "#6FC6F1",
  mods: WEEKEND.mods.slice(),
  invites: 2,
  photos: 0,
};

const CARD: React.CSSProperties = {
  background: "#FFFFFF",
  border: "1px solid #EBE7DE",
  borderRadius: 12,
  padding: "13px 15px",
  display: "flex",
  alignItems: "center",
  gap: 11,
};

const SCREEN_TITLE: React.CSSProperties = {
  fontFamily: DISPLAY,
  fontSize: 19,
  lineHeight: 1.25,
  letterSpacing: "-.02em",
  color: "#2A343D",
};

export function DemoSection() {
  const [demo, setDemo] = useState(INITIAL);
  const [copie, setCopie] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const type = DEMO_TYPES.find((t) => t.key === demo.type) ?? WEEKEND;
  const patch = (p: Partial<typeof INITIAL>) => setDemo((d) => ({ ...d, ...p }));

  function advance() {
    if (demo.step === 2 && demo.invites < DEMO_GENS.length) {
      patch({ invites: Math.min(demo.invites + 2, DEMO_GENS.length) });
      return;
    }
    if (demo.step === 3) {
      if (demo.photos < TOTAL_PHOTOS) {
        patch({ photos: Math.min(demo.photos + 3, TOTAL_PHOTOS) });
        return;
      }
      setDemo({ ...INITIAL, mods: WEEKEND.mods.slice() });
      setCopie(false);
      return;
    }
    patch({ step: demo.step + 1 });
  }

  function toggleMod(key: ModuleKey) {
    const mod = MODULES.find((m) => m.key === key);
    if (!mod || mod.locked) return;
    patch({
      mods: demo.mods.includes(key)
        ? demo.mods.filter((k) => k !== key)
        : demo.mods.concat(key),
    });
  }

  const lien = `${SITE_DOMAIN}/e/${type.key}-${DEMO_GENS.length}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(lien);
    } catch {
      /* clipboard blocked - the label still confirms the intent */
    }
    setCopie(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopie(false), 1600);
  }

  const cta =
    demo.step === 2
      ? demo.invites < DEMO_GENS.length
        ? "Partager le lien"
        : "Continuer"
      : demo.step === 3
        ? demo.photos < TOTAL_PHOTOS
          ? "Ajouter mes photos"
          : "Recommencer la démo"
        : "Continuer";

  const tabs = MODULES.filter((m) => demo.mods.includes(m.key)).slice(0, 5);

  return (
    <section
      id="fonctionnement"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#EFE8DE",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={DEMO_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Comment ça marche"
          badgeBg={ACCENT.sunbeam}
          title="Essaie-le tout de suite. Clique dans l’écran."
          titleMaxCh={20}
          lede="Quatre étapes pour voir à quoi ressemble un événement Yatu. Rien à installer."
        />

        <div
          data-reveal="up"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(320px,100%),1fr))",
            gap: "clamp(28px,4vw,56px)",
            alignItems: "center",
          }}
        >
          {/* The four steps, also a control for the screen */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 460 }}>
            {DEMO_ETAPES.map((etape, i) => {
              const current = i === demo.step;
              const done = i < demo.step;
              return (
                <button
                  key={etape.titre}
                  type="button"
                  onClick={() => patch({ step: i })}
                  aria-current={current}
                  style={{
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "16px 18px",
                    borderRadius: 20,
                    transition: `background ${EASE}, border-color ${EASE}`,
                    background: current ? "#FFFFFF" : "transparent",
                    border: `1px solid ${current ? "#EBE7DE" : "transparent"}`,
                  }}
                >
                  <span
                    style={{
                      flex: "none",
                      width: 34,
                      height: 34,
                      borderRadius: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: DISPLAY,
                      fontSize: 15,
                      transition: `background ${EASE}, color ${EASE}`,
                      background: current ? "#2A343D" : done ? "#96E087" : "#DCD6CB",
                      color: done ? "#2A343D" : current ? "#FFFFFF" : "#71787E",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: DISPLAY,
                        fontSize: 19,
                        lineHeight: 1.15,
                        letterSpacing: "-.02em",
                        transition: `color ${EASE}`,
                        color: current ? "#2A343D" : "rgba(42,52,61,.55)",
                      }}
                    >
                      {etape.titre}
                    </span>
                    <span
                      style={{
                        fontFamily: UI,
                        fontSize: 14,
                        lineHeight: 1.4,
                        transition: `color ${EASE}`,
                        color: current ? "rgba(42,52,61,.7)" : "rgba(42,52,61,.4)",
                      }}
                    >
                      {etape.desc}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The phone */}
          <div data-r="phone-wrap" style={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
            <IOSDevice width={418} height={850}>
              <div
                style={{
                  minHeight: 810,
                  background: "#F7F4ED",
                  padding: "52px 0 0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    background: "#F7F4ED",
                  }}
                >
                  <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 12, color: "#71787E" }}>
                    {demo.step + 1}/4
                  </span>
                  <span style={{ display: "flex", gap: 5 }}>
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: 80,
                          transition: `background ${EASE}`,
                          background: i <= demo.step ? "#2A343D" : "#DCD6CB",
                        }}
                      />
                    ))}
                  </span>
                </div>

                <div
                  style={{
                    flex: "1 1 auto",
                    padding: "6px 18px 44px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 13,
                  }}
                >
                  {demo.step === 0 ? (
                    <>
                      <span style={SCREEN_TITLE}>On part sur quel type d’événement ?</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                        {DEMO_TYPES.map((t) => {
                          const on = t.key === demo.type;
                          return (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => patch({ type: t.key, mods: t.mods.slice() })}
                              aria-pressed={on}
                              style={{
                                cursor: "pointer",
                                fontFamily: UI,
                                fontWeight: 600,
                                fontSize: 13,
                                padding: "10px 14px",
                                borderRadius: 999,
                                transition: `background ${EASE}, color ${EASE}`,
                                background: on ? "#2A343D" : "#FFFFFF",
                                color: on ? "#FFFFFF" : "#4E565D",
                                border: `1px solid ${on ? "#2A343D" : "#EBE7DE"}`,
                              }}
                            >
                              {t.label}
                            </button>
                          );
                        })}
                      </div>

                      <div style={{ ...CARD, flexDirection: "column", alignItems: "stretch", gap: 3 }}>
                        <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 12, color: "#71787E" }}>
                          Nom de l’événement
                        </span>
                        <span style={{ fontFamily: UI, fontSize: 16, color: "#2A343D" }}>
                          {type.nom}
                        </span>
                      </div>

                      <div style={CARD}>
                        <img src={icon("planning")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span style={{ fontFamily: UI, fontSize: 15, color: "#2A343D" }}>{type.dates}</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "2px 2px 0" }}>
                        <span
                          style={{
                            fontFamily: UI,
                            fontWeight: 600,
                            fontSize: 12,
                            color: "#71787E",
                            marginRight: 2,
                          }}
                        >
                          Couleur
                        </span>
                        {DEMO_COULEURS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            onClick={() => patch({ couleur: c })}
                            aria-label={`Couleur ${c}`}
                            aria-pressed={c === demo.couleur}
                            style={{
                              cursor: "pointer",
                              border: 0,
                              padding: 0,
                              width: 26,
                              height: 26,
                              borderRadius: 80,
                              transition: `box-shadow ${EASE}`,
                              background: c,
                              boxShadow:
                                c === demo.couleur ? "0 0 0 2.5px #2A343D" : "0 0 0 0 transparent",
                            }}
                          />
                        ))}
                      </div>

                      <div style={{ ...CARD, marginTop: "auto" }}>
                        <img src={icon("heart")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span style={{ fontFamily: UI, fontSize: 14, lineHeight: 1.4, color: "#4E565D" }}>
                          La couleur suit l’événement partout dans l’app.
                        </span>
                      </div>
                    </>
                  ) : null}

                  {demo.step === 1 ? (
                    <>
                      <span style={SCREEN_TITLE}>Quels modules pour {type.court} ?</span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {MODULES.map((m) => {
                          const on = demo.mods.includes(m.key);
                          return (
                            <button
                              key={m.key}
                              type="button"
                              onClick={() => toggleMod(m.key)}
                              aria-pressed={on}
                              disabled={m.locked}
                              style={{
                                textAlign: "left",
                                cursor: m.locked ? "default" : "pointer",
                                display: "flex",
                                flexDirection: "column",
                                gap: 7,
                                padding: 12,
                                borderRadius: 14,
                                transition: `background ${EASE}, border-color ${EASE}`,
                                background: on ? "#FFFFFF" : "transparent",
                                border: `1px solid ${on ? "#EBE7DE" : "#DCD6CB"}`,
                              }}
                            >
                              <span
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  gap: 8,
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{
                                    width: 26,
                                    height: 26,
                                    display: "block",
                                    flex: "none",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "contain",
                                    transition: `opacity ${EASE}`,
                                    backgroundImage: `url("${m.icon}")`,
                                    opacity: on ? 1 : 0.3,
                                  }}
                                />
                                <span
                                  style={{
                                    flex: "none",
                                    width: 32,
                                    height: 19,
                                    borderRadius: 999,
                                    padding: 2,
                                    transition: `background ${EASE}`,
                                    background: on ? "#96E087" : "#DCD6CB",
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "block",
                                      width: 15,
                                      height: 15,
                                      borderRadius: 80,
                                      background: "#FFFFFF",
                                      transition: `transform ${EASE}`,
                                      transform: on ? "translateX(13px)" : "translateX(0px)",
                                    }}
                                  />
                                </span>
                              </span>
                              <span
                                style={{
                                  fontFamily: UI,
                                  fontWeight: 700,
                                  fontSize: 13,
                                  lineHeight: 1.2,
                                  transition: `color ${EASE}`,
                                  color: on ? "#2A343D" : "rgba(42,52,61,.45)",
                                }}
                              >
                                {m.label}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 14,
                          background: "#2A343D",
                          borderRadius: 999,
                          padding: "13px 18px",
                        }}
                      >
                        {tabs.map((m) => (
                          <span
                            key={m.key}
                            aria-hidden="true"
                            style={{
                              width: 24,
                              height: 24,
                              display: "block",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "contain",
                              backgroundImage: `url("${m.icon}")`,
                            }}
                          />
                        ))}
                      </div>
                      <span
                        style={{
                          textAlign: "center",
                          fontFamily: UI,
                          fontSize: 13,
                          color: "#71787E",
                        }}
                      >
                        {demo.mods.length}
                        {demo.mods.length > 1
                          ? " onglets dans ton événement"
                          : " onglet dans ton événement"}
                      </span>
                    </>
                  ) : null}

                  {demo.step === 2 ? (
                    <>
                      <span style={SCREEN_TITLE}>Qui embarque avec toi ?</span>
                      <div style={{ ...CARD, padding: "12px 13px", gap: 10 }}>
                        <span
                          style={{
                            fontFamily: UI,
                            fontSize: 13,
                            color: "#4E565D",
                            flex: "1 1 auto",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {lien}
                        </span>
                        <button
                          type="button"
                          onClick={copy}
                          style={{
                            cursor: "pointer",
                            border: 0,
                            background: "#2A343D",
                            color: "#FFFFFF",
                            fontFamily: UI,
                            fontWeight: 700,
                            fontSize: 12,
                            padding: "8px 13px",
                            borderRadius: 8,
                            flex: "none",
                          }}
                        >
                          {copie ? "Copié" : "Copier"}
                        </button>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                        {DEMO_GENS.map((g, i) => {
                          const arrive = i < demo.invites;
                          return (
                            <div
                              key={g.nom}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                transition: "opacity 240ms var(--ease-standard)",
                                opacity: arrive ? 1 : 0.42,
                              }}
                            >
                              <span
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: 80,
                                  fontFamily: UI,
                                  fontWeight: 700,
                                  fontSize: 12,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flex: "none",
                                  color: "#2A343D",
                                  background: g.bg,
                                }}
                              >
                                {g.nom.slice(0, 1)}
                              </span>
                              <span
                                style={{ fontFamily: UI, fontSize: 14, color: "#2A343D", flex: "1 1 auto" }}
                              >
                                {g.nom}
                              </span>
                              <span
                                style={{
                                  fontFamily: UI,
                                  fontWeight: 700,
                                  fontSize: 11,
                                  color: arrive ? "#44B678" : "#A8AEB3",
                                }}
                              >
                                {arrive ? "A rejoint" : "En attente"}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div style={{ ...CARD, marginTop: "auto" }}>
                        <img src={icon("people")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 14, color: "#2A343D" }}>
                          {DEMO_GENS.length} invités · {demo.invites}
                          {demo.invites > 1 ? " ont rejoint" : " a rejoint"}
                        </span>
                      </div>
                    </>
                  ) : null}

                  {demo.step === 3 ? (
                    <>
                      <span style={SCREEN_TITLE}>Le souvenir {type.courtDe}</span>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 7 }}>
                        {Array.from({ length: TOTAL_PHOTOS }).map((_, i) => {
                          const filled = i < demo.photos;
                          return (
                            <span
                              key={i}
                              style={{
                                aspectRatio: "1",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition:
                                  "background 260ms var(--ease-standard), opacity 260ms var(--ease-standard)",
                                background: filled ? demo.couleur : "transparent",
                                border: filled ? "1px solid transparent" : "1px dashed #DCD6CB",
                                opacity: filled ? 1 : 0.7,
                              }}
                            >
                              <span
                                aria-hidden="true"
                                style={{
                                  width: 22,
                                  height: 22,
                                  display: "block",
                                  backgroundRepeat: "no-repeat",
                                  backgroundPosition: "center",
                                  backgroundSize: "contain",
                                  opacity: filled ? 0.75 : 0.25,
                                  backgroundImage: `url("${icon("img")}")`,
                                }}
                              />
                            </span>
                          );
                        })}
                      </div>

                      <div style={CARD}>
                        <img src={icon("img")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span
                          style={{
                            fontFamily: UI,
                            fontWeight: 700,
                            fontSize: 14,
                            color: "#2A343D",
                            flex: "1 1 auto",
                          }}
                        >
                          {demo.photos === 0
                            ? "Aucune photo pour le moment"
                            : `${demo.photos} photos · ${DEMO_GENS.length} contributeurs`}
                        </span>
                      </div>

                      <div style={CARD}>
                        <img src={icon("budget")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span
                          style={{ fontFamily: UI, fontSize: 14, color: "#2A343D", flex: "1 1 auto" }}
                        >
                          Comptes soldés
                        </span>
                        <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 14, color: "#44B678" }}>
                          0,00 €
                        </span>
                      </div>

                      <div
                        style={{
                          marginTop: "auto",
                          display: "flex",
                          alignItems: "center",
                          gap: 11,
                          background: "#2A343D",
                          borderRadius: 12,
                          padding: "13px 15px",
                        }}
                      >
                        <img src={icon("heart")} alt="" style={{ width: 26, height: 26, flex: "none" }} />
                        <span
                          style={{
                            fontFamily: UI,
                            fontSize: 14,
                            lineHeight: 1.4,
                            color: "rgba(255,255,255,.85)",
                          }}
                        >
                          {demo.photos >= TOTAL_PHOTOS
                            ? "L’album reste dans l’événement, avec les photos de tout le monde."
                            : "Chacun dépose les siennes, personne n’a à les réclamer."}
                        </span>
                      </div>
                    </>
                  ) : null}

                  <button
                    type="button"
                    onClick={advance}
                    className="yq-btn-dark"
                    style={{
                      cursor: "pointer",
                      border: 0,
                      width: "100%",
                      background: "#2A343D",
                      color: "#FFFFFF",
                      fontFamily: UI,
                      fontWeight: 700,
                      fontSize: 16,
                      padding: 15,
                      borderRadius: 16,
                    }}
                  >
                    {cta}
                  </button>
                </div>
              </div>
            </IOSDevice>
          </div>
        </div>
      </div>
    </section>
  );
}
