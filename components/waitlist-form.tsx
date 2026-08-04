"use client";

import {useRouter} from "next/navigation";
import {useEffect, useId, useRef, useState} from "react";
import {Honeypot} from "@/components/honeypot";
import {SubmitButton, type SubmitStatus} from "@/components/submit-button";
import {CTA} from "@/lib/content";
import {HONEYPOT_NAME, submitForm} from "@/lib/forms";
import {ROUTES} from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";

const DEFAULT_NOTE = "Ton adresse sert seulement à te prévenir.";

/** Long enough for the green pop to read as a confirmation, short enough to
 *  not feel like the page is stuck. */
const CONFIRM_MS = 750;

const isValid = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export function WaitlistForm({
  cta = CTA.waitlist,
  placeholder = "ton@email.com",
  note = DEFAULT_NOTE,
  source = "accueil",
  tone = "light",
}: {
  cta?: string;
  placeholder?: string;
  note?: string;
  source?: string;
  /** `"dark"` for the ink card on /go: the ink submit button would vanish into it. */
  tone?: "light" | "dark";
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");
  const inputId = useId();
  const router = useRouter();
  const timer = useRef<number>(undefined);

  // Leaving before the confirmation delay is up would fire a push into nothing.
  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = value.trim();
    const trap = new FormData(e.currentTarget).get(HONEYPOT_NAME);

    if (!isValid(email)) {
      setStatus("error");
      setMessage("Il manque une adresse e-mail valide pour te prévenir.");
      return;
    }

    setStatus("sending");
    setMessage("On t’inscrit…");

    const result = await submitForm("waitlist", { email, source, [HONEYPOT_NAME]: trap });

    // The local copy sits on this visitor's machine, so a failed send is a lead
    // we never see: say so and let them try again rather than sail on.
    if (result === "failed") {
      setStatus("error");
      setMessage("L’inscription n’est pas passée. Réessaie dans un instant.");
      return;
    }

    setStatus("done");
    setMessage("C’est bon, on t’emmène…");
    // Let the button finish turning green before the page changes under it.
    timer.current = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("yatu-signup-email", email);
      } catch {
        /* storage blocked - the confirmation page falls back to generic copy */
      }
      router.push(`${ROUTES.bienvenue}?s=${encodeURIComponent(source)}`);
    }, CONFIRM_MS);
  }

  const dark = tone === "dark";
  const noteColor = dark
    ? status === "error"
      ? "#FFA8A8"
      : "rgba(255,255,255,.62)"
    : status === "error"
      ? "#D92E2E"
      : "#71787E";

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
      {/* noValidate: without it the browser’s own (English) bubble fires first and
          the designed French message below never shows. */}
      <form
        onSubmit={submit}
        noValidate
        style={{ display: "flex", gap: 10, flexWrap: "wrap", width: "100%" }}
      >
        <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
          Adresse e-mail
        </label>
        <Honeypot />
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
            border: `1px solid ${dark ? "rgba(255,255,255,.18)" : "#EBE7DE"}`,
            borderRadius: 16,
            background: "#FFFFFF",
            fontFamily: UI,
            fontSize: 16,
            color: "#2A343D",
            outline: "none",
          }}
        />
        <SubmitButton
          status={status}
          label={cta}
          sendingLabel="On t’inscrit…"
          doneLabel="Inscrit !"
          style={{
            flex: "0 0 auto",
            height: 56,
            padding: "0 26px",
            borderRadius: 16,
            // The button is ink on a light page; on the ink card it flips, or it
            // would be a dark rectangle on a dark rectangle.
            ...(dark ? { background: "#FFFFFF", color: "#2A343D" } : {}),
          }}
        />
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
