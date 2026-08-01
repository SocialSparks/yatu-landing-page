"use client";

import { useState } from "react";
import { Decor } from "@/components/decor";
import { Honeypot } from "@/components/honeypot";
import { NavLink } from "@/components/nav-link";
import { BDE_CTA, DEMO_REASSURANCE, EVENT_TYPES } from "@/lib/bde-content";
import { icon } from "@/lib/content";
import { BDE_DEMO_DECOR } from "@/lib/decor";
import { submitForm } from "@/lib/forms";
import { ROUTES } from "@/lib/routes";
import { PUBLISHER } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const FIELD: React.CSSProperties = {
  height: 48,
  padding: "0 14px",
  border: "1px solid #EBE7DE",
  borderRadius: 12,
  background: "#F7F4ED",
  fontFamily: UI,
  fontSize: 15,
  color: "#2A343D",
  outline: "none",
  width: "100%",
};

const LABEL: React.CSSProperties = {
  fontFamily: UI,
  fontWeight: 600,
  fontSize: 13,
  color: "#4E565D",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={LABEL}>{label}</span>
      {children}
    </label>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export function BdeDemoForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data: Record<string, unknown> = Object.fromEntries(
      new FormData(e.currentTarget).entries(),
    );

    setStatus("sending");
    const result = await submitForm("bde-demo", data);

    // Someone typed out their whole event here - never pretend it arrived.
    if (result === "failed") {
      setStatus("error");
      return;
    }

    setStatus("sent");
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const sent = status === "sent";

  return (
    <section
      id="demo"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#EFE8DE",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={BDE_DEMO_DECOR} />

      <div
        data-r="gutter"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(min(300px,100%),1fr))",
          gap: "clamp(32px,5vw,56px)",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 460 }}>
          <span
            data-reveal="up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              alignSelf: "flex-start",
              background: "#6FC6F1",
              color: "#2A343D",
              borderRadius: 999,
              padding: "11px 21px",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: ".005em",
            }}
          >
            Prendre contact
          </span>

          <h2
            data-reveal="up"
            data-reveal-delay="70"
            style={{
              margin: 0,
              fontFamily: DISPLAY,
              fontWeight: 400,
              fontSize: "clamp(30px,4.2vw,44px)",
              lineHeight: 1.08,
              letterSpacing: "-.025em",
              color: "#2A343D",
              textWrap: "balance",
            }}
          >
            Vingt minutes en visio, et tu sais si Yatu peut t’aider.
          </h2>

          <p
            data-reveal="up"
            data-reveal-delay="120"
            style={{
              margin: 0,
              fontFamily: UI,
              fontSize: 17,
              lineHeight: 1.55,
              color: "rgba(42,52,61,.8)",
              textWrap: "pretty",
            }}
          >
            On te montre l’app sur ton prochain événement, on répond aux questions de ton bureau,
            et on te dit franchement si c’est trop tôt pour vous.
          </p>

          <div
            data-reveal="stagger"
            data-reveal-delay="160"
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {DEMO_REASSURANCE.map((r) => (
              <span
                key={r.label}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  fontFamily: UI,
                  fontSize: 16,
                  lineHeight: 1.45,
                  color: "#2A343D",
                }}
              >
                <img src={icon(r.tool)} alt="" style={{ width: 28, height: 28, flex: "none" }} />
                {r.label}
              </span>
            ))}
          </div>
        </div>

        <div
          data-reveal="up"
          style={{
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
            borderRadius: 28,
            padding: "clamp(24px,3vw,32px)",
          }}
        >
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "flex-start",
                padding: "20px 0",
              }}
            >
              <img
                src={icon("heart")}
                alt=""
                style={{ width: 56, height: 56, display: "block" }}
              />
              <span
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-.02em",
                  color: "#2A343D",
                }}
              >
                C’est envoyé.
              </span>
              <p
                style={{
                  margin: 0,
                  fontFamily: UI,
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "rgba(42,52,61,.8)",
                  textWrap: "pretty",
                }}
              >
                On revient vers toi à l’adresse indiquée, avec deux ou trois créneaux de visio. Si
                ton événement est proche, dis-le nous en répondant : on passe devant.
              </p>
              <NavLink
                href={ROUTES.home}
                className="yq-btn-dark"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "#2A343D",
                  color: "#FFFFFF",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "13px 22px",
                  borderRadius: 999,
                  textDecoration: "none",
                }}
              >
                Retour à l’accueil
              </NavLink>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Honeypot />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(180px,100%),1fr))",
                  gap: 14,
                }}
              >
                <Field label="Prénom et nom">
                  <input name="nom" required className="yq-input" style={FIELD} />
                </Field>
                <Field label="BDE ou association">
                  <input name="asso" required className="yq-input" style={FIELD} />
                </Field>
                <Field label="École ou campus">
                  <input name="ecole" className="yq-input" style={FIELD} />
                </Field>
                <Field label="E-mail">
                  <input name="email" type="email" required className="yq-input" style={FIELD} />
                </Field>
                <Field label="Type d’événement">
                  <select
                    name="type"
                    className="yq-input"
                    style={{ ...FIELD, padding: "0 12px" }}
                    defaultValue={EVENT_TYPES[0]}
                  >
                    {EVENT_TYPES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Nombre de participants">
                  <input
                    name="taille"
                    type="number"
                    min="1"
                    placeholder="180"
                    className="yq-input"
                    style={FIELD}
                  />
                </Field>
              </div>

              <Field label="Ton prochain événement, en deux lignes">
                <textarea
                  name="message"
                  rows={3}
                  placeholder="WEI fin septembre, environ 180 personnes, deux bus, hébergement en village vacances."
                  className="yq-input"
                  style={{
                    ...FIELD,
                    height: "auto",
                    padding: "12px 14px",
                    lineHeight: 1.5,
                    resize: "vertical",
                  }}
                />
              </Field>

              <button
                type="submit"
                className="yq-btn-dark"
                disabled={status === "sending"}
                style={{
                  alignSelf: "flex-start",
                  border: 0,
                  cursor: status === "sending" ? "progress" : "pointer",
                  background: "#2A343D",
                  color: "#FFFFFF",
                  fontFamily: UI,
                  fontWeight: 700,
                  fontSize: 16,
                  padding: "15px 26px",
                  borderRadius: 999,
                }}
              >
                {status === "sending" ? "On envoie…" : BDE_CTA.demo}
              </button>

              <span
                aria-live="polite"
                style={{
                  fontFamily: UI,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: "#D92E2E",
                  minHeight: status === "error" ? undefined : 0,
                }}
              >
                {status === "error"
                  ? "L’envoi n’est pas passé. Réessaie, ou écris-nous directement."
                  : ""}
              </span>

              <span
                style={{ fontFamily: UI, fontSize: 13, lineHeight: 1.5, color: "#71787E" }}
              >
                En envoyant ce formulaire, tu acceptes que {PUBLISHER} te recontacte au sujet de
                Yatu. Détails dans la{" "}
                <NavLink href={ROUTES.confidentialite} style={{ color: "#4E565D" }}>
                  politique de confidentialité
                </NavLink>
                .
              </span>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
