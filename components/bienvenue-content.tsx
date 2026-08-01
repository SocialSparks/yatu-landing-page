"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Decor } from "@/components/decor";
import { CopyIcon, InstagramIcon, TikTokIcon, WhatsappIcon } from "@/components/icons";
import { NavLink } from "@/components/nav-link";
import { LAUNCH_DATE, LAUNCH_LABEL, icon } from "@/lib/content";
import { BIENVENUE_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";
import { SITE_URL } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const TYPES = ["Soirées", "Anniversaires", "Week-ends", "Voyages", "Événements d’asso"];
const SIZES = ["2 à 5", "6 à 12", "13 à 30", "Plus de 30"];
const BDE = ["Oui, un BDE", "Une autre asso", "Non, entre amis"];

const QUESTIONS = {
  types: "Qu’est-ce que tu organises le plus souvent ?",
  size: "Vous êtes combien, en général ?",
  bde: "Tu organises pour un BDE ou une association ?",
};

const SHARE_TEXT = `On va tester Yatu pour organiser nos prochains événements : tout au même endroit. Ça sort le ${LAUNCH_LABEL}, inscris-toi avec moi : `;

type WelcomeLink = {
  href: string;
  title: string;
  sub: string;
  external: boolean;
} & ({ brand: "instagram" | "tiktok" } | { tool: string });

const LINKS: WelcomeLink[] = [
  {
    href: "https://www.instagram.com/yatu_app/",
    brand: "instagram",
    title: "Instagram",
    sub: "Les coulisses d’ici septembre",
    external: true,
  },
  {
    href: "https://www.tiktok.com/@yatu_app",
    brand: "tiktok",
    title: "TikTok",
    sub: "L’organisation de groupe, en vidéo",
    external: true,
  },
  {
    href: ROUTES.bde,
    tool: "people",
    title: "Tu es dans un BDE ?",
    sub: "Le pack pilote est ouvert",
    external: false,
  },
];

function Chip({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      style={{
        cursor: "pointer",
        border: "1px solid #EBE7DE",
        borderRadius: 999,
        padding: "10px 16px",
        fontFamily: UI,
        fontWeight: 600,
        fontSize: 14,
        transition: "background 200ms var(--ease-standard), color 200ms var(--ease-standard)",
        background: on ? "#2A343D" : "#F7F4ED",
        color: on ? "#FFFFFF" : "#2A343D",
      }}
    >
      {label}
    </button>
  );
}

function Question({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 13, color: "#4E565D" }}>
        {label}
      </span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{children}</div>
    </div>
  );
}

/** Implemented from "Bienvenue.dc.html" - the page the signup lands on. */
export function BienvenueContent() {
  const params = useSearchParams();
  const email = params.get("e") || "ton adresse";

  const [types, setTypes] = useState<string[]>([]);
  const [size, setSize] = useState("");
  const [bde, setBde] = useState("");
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // window isn’t available while rendering - resolve the share target on mount.
  useEffect(() => setShareUrl(`${window.location.origin}/`), []);

  const [days, setDays] = useState(() =>
    Math.max(0, Math.ceil((new Date(LAUNCH_DATE).getTime() - Date.now()) / 86400000)),
  );
  useEffect(() => {
    setDays(Math.max(0, Math.ceil((new Date(LAUNCH_DATE).getTime() - Date.now()) / 86400000)));
  }, []);

  function save() {
    const payload = { email, types, size, bde, ts: new Date().toISOString() };
    try {
      window.localStorage.setItem("yatu-profil", JSON.stringify(payload));
    } catch {
      /* storage blocked */
    }
    setDone(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(shareUrl || SITE_URL);
    } catch {
      /* clipboard blocked - the label still confirms the intent */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <main
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#F7F4ED",
        padding: "clamp(48px,7vw,88px) 0 clamp(64px,9vw,112px)",
      }}
    >
      <Decor items={BIENVENUE_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 760,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <div
          data-reveal="scale"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 18,
            padding: "8px 0 4px",
          }}
        >
          <img
            src={icon("heart")}
            alt=""
            data-float=""
            style={
              {
                width: 76,
                height: 76,
                display: "block",
                "--yq-amp": "8px",
                "--yq-dur": "6.05s",
                "--yq-lag": "0.76s",
              } as React.CSSProperties
            }
          />
          <h1
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(32px,4.4vw,48px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            Tu es sur la liste.
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: "clamp(16px,1.5vw,19px)",
              lineHeight: 1.5,
              color: "rgba(42,52,61,.8)",
              maxWidth: "46ch",
              textWrap: "pretty",
            }}
          >
            On t’écrit à <strong style={{ fontWeight: 700, color: "#2A343D" }}>{email}</strong> le{" "}
            {LAUNCH_LABEL}, jour du lancement. Tu auras l’accès avant l’ouverture publique.
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginTop: 2 }}>
            <span
              suppressHydrationWarning
              style={{
                fontFamily: DISPLAY,
                fontSize: "clamp(40px,6vw,60px)",
                lineHeight: 1,
                color: "#2A343D",
              }}
            >
              J–{days}
            </span>
          </div>
        </div>

        <div
          data-reveal="up"
          data-reveal-delay="80"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
            borderRadius: 24,
            padding: "clamp(24px,3vw,34px)",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {done ? (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
              <img
                src={icon("heart")}
                alt=""
                style={{ width: 42, height: 42, display: "block", flex: "none" }}
              />
              <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  Merci, c’est enregistré.
                </span>
                <span
                  style={{
                    fontFamily: UI,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: "rgba(42,52,61,.8)",
                  }}
                >
                  Ça nous aide à préparer la bonne version de Yatu pour ton groupe.
                </span>
              </span>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div
                  style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: DISPLAY,
                      fontWeight: 400,
                      fontSize: 22,
                      lineHeight: 1.2,
                      letterSpacing: "-.02em",
                      color: "#2A343D",
                    }}
                  >
                    Trois questions, si tu veux bien
                  </h2>
                  <span style={{ fontFamily: UI, fontSize: 13, color: "#71787E" }}>
                    Facultatif, trente secondes
                  </span>
                </div>
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
                  Ça nous aide à savoir sur quoi travailler en priorité d’ici septembre.
                </p>
              </div>

              <Question label={QUESTIONS.types}>
                {TYPES.map((t) => (
                  <Chip
                    key={t}
                    label={t}
                    on={types.includes(t)}
                    onClick={() =>
                      setTypes((prev) =>
                        prev.includes(t) ? prev.filter((x) => x !== t) : prev.concat(t),
                      )
                    }
                  />
                ))}
              </Question>

              <Question label={QUESTIONS.size}>
                {SIZES.map((s) => (
                  <Chip key={s} label={s} on={size === s} onClick={() => setSize(s)} />
                ))}
              </Question>

              <Question label={QUESTIONS.bde}>
                {BDE.map((b) => (
                  <Chip key={b} label={b} on={bde === b} onClick={() => setBde(b)} />
                ))}
              </Question>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
                <button
                  type="button"
                  onClick={save}
                  className="yq-btn-dark"
                  style={{
                    border: 0,
                    cursor: "pointer",
                    background: "#2A343D",
                    color: "#FFFFFF",
                    fontFamily: UI,
                    fontWeight: 700,
                    fontSize: 15,
                    padding: "14px 22px",
                    borderRadius: 999,
                  }}
                >
                  Envoyer mes réponses
                </button>
                <button
                  type="button"
                  onClick={() => setDone(true)}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: 0,
                    padding: "8px 2px",
                    fontFamily: UI,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#71787E",
                    textDecoration: "underline",
                    textUnderlineOffset: 3,
                  }}
                >
                  Passer
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          data-reveal="up"
          data-reveal-delay="140"
          style={{
            background: "#2A343D",
            borderRadius: 24,
            padding: "clamp(24px,3vw,34px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
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
              Yatu, c’est mieux à plusieurs.
            </h2>
            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 15,
                lineHeight: 1.55,
                color: "rgba(255,255,255,.7)",
                maxWidth: "52ch",
                textWrap: "pretty",
              }}
            >
              Préviens ton groupe maintenant : le jour du lancement, vous pourrez créer votre
              premier événement ensemble.
            </p>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(SHARE_TEXT + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="yq-btn-light"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "#FFFFFF",
                color: "#2A343D",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 20px",
                borderRadius: 999,
                textDecoration: "none",
              }}
            >
              <span style={{ color: "#44B678", display: "flex" }}>
                <WhatsappIcon />
              </span>
              Partager sur WhatsApp
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="yq-ghost"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(255,255,255,.08)",
                color: "#FFFFFF",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 20px",
                borderRadius: 16,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,.16)",
              }}
            >
              <span style={{ display: "flex" }}>
                <InstagramIcon />
              </span>
              Partager en story
            </a>

            <button
              type="button"
              onClick={copy}
              className="yq-ghost"
              style={{
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: "rgba(255,255,255,.08)",
                color: "#FFFFFF",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 15,
                padding: "13px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,.16)",
              }}
            >
              <span style={{ display: "flex" }}>
                <CopyIcon />
              </span>
              {copied ? "Lien copié" : "Copier le lien"}
            </button>
          </div>
        </div>

        <div
          data-reveal="up"
          data-reveal-delay="200"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(220px,100%),1fr))",
            gap: 16,
          }}
        >
          {LINKS.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              className="yq-btn-light"
              {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              style={{
                background: "#FFFFFF",
                border: "1px solid #EBE7DE",
                borderRadius: 16,
                padding: 20,
                display: "flex",
                alignItems: "center",
                gap: 14,
                textDecoration: "none",
              }}
            >
              {"brand" in l ? (
                <span
                  aria-hidden="true"
                  style={{
                    width: 40,
                    height: 40,
                    display: "grid",
                    placeItems: "center",
                    flex: "none",
                    color: l.brand === "instagram" ? "#E1306C" : "#111111",
                  }}
                >
                  {l.brand === "instagram" ? (
                    <InstagramIcon size={36} />
                  ) : (
                    <TikTokIcon size={34} />
                  )}
                </span>
              ) : (
                <img
                  src={icon(l.tool)}
                  alt=""
                  style={{ width: 40, height: 40, display: "block", flex: "none" }}
                />
              )}
              <span style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: UI, fontWeight: 700, fontSize: 15, color: "#2A343D" }}>
                  {l.title}
                </span>
                <span style={{ fontFamily: UI, fontSize: 13, color: "#71787E" }}>{l.sub}</span>
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </main>
  );
}
