"use client";

import { useId, useState } from "react";

const UI = "var(--font-ui), system-ui, sans-serif";

/**
 * TODO — point this at the real list provider (Brevo / Mailchimp / Tally, or an
 * in-app route handler). While it is empty the form validates, stores the
 * address locally and confirms inline, so the journey stays testable end to end.
 */
const ENDPOINT = "";

const DEFAULT_NOTE = "Gratuit au lancement. Un seul e-mail : celui du jour J.";

const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

type Status = "idle" | "sending" | "done" | "error";

export function WaitlistForm({
  cta = "Je rejoins la liste",
  placeholder = "ton@email.com",
  note = DEFAULT_NOTE,
  source = "accueil",
}: {
  cta?: string;
  placeholder?: string;
  note?: string;
  source?: string;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const email = value.trim();

    if (!isValid(email)) {
      setStatus("error");
      setMessage("Il manque une adresse e-mail valide pour te prévenir.");
      return;
    }

    try {
      const list = JSON.parse(window.localStorage.getItem("yatu-waitlist") || "[]");
      list.push({ email, source, ts: new Date().toISOString() });
      window.localStorage.setItem("yatu-waitlist", JSON.stringify(list));
    } catch {
      /* storage blocked — not worth failing the signup over */
    }

    if (!ENDPOINT) {
      setStatus("done");
      setMessage("C’est noté — on te prévient le 9 septembre.");
      return;
    }

    setStatus("sending");
    setMessage("On t’inscrit…");
    try {
      await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
    } catch {
      /* the address is already stored locally; don't punish the visitor */
    }
    setStatus("done");
    setMessage("C’est noté — on te prévient le 9 septembre.");
  }

  const noteColor = status === "error" ? "#D92E2E" : "#71787E";

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 540,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      {/* noValidate: without it the browser's own (English) bubble fires first and
          the designed French message below never shows. */}
      <form
        onSubmit={submit}
        noValidate
        style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "100%" }}
      >
        <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          Adresse e-mail
        </label>
        <input
          id={inputId}
          className="yq-input"
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setStatus("idle");
            setMessage("");
          }}
          aria-invalid={status === "error"}
          style={{
            flex: "1 1 240px",
            minWidth: 0,
            height: 56,
            padding: "0 18px",
            boxSizing: "border-box",
            border: "1px solid #EBE7DE",
            borderRadius: 16,
            background: "#FFFFFF",
            fontFamily: UI,
            fontSize: 16,
            color: "#2A343D",
            outline: "none",
          }}
        />
        <button
          type="submit"
          className="yq-btn-dark"
          disabled={status === "sending"}
          style={{
            flex: "0 0 auto",
            height: 56,
            padding: "0 26px",
            border: 0,
            borderRadius: 16,
            background: "#2A343D",
            color: "#FFFFFF",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {cta}
        </button>
      </form>

      <p
        aria-live="polite"
        style={{
          margin: 0,
          minHeight: 20,
          fontFamily: UI,
          fontSize: 14,
          lineHeight: 1.4,
          color: noteColor,
        }}
      >
        {message || note}
      </p>
    </div>
  );
}
