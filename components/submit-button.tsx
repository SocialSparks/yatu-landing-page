import type { CSSProperties, ReactNode } from "react";

const UI = "var(--font-ui), system-ui, sans-serif";

export type SubmitStatus = "idle" | "sending" | "done" | "error";

function CheckIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M4.5 10.5 8 14l7.5-8"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M5.5 5.5l9 9m0-9-9 9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The submit button shared by the three forms of the site.
 *
 * It owns the whole "what is happening" story: a spinner while the request is
 * in flight, then a green pop or a red shake. The colours and the keyframes
 * live in `globals.css` (`.yq-submit`), keyed off `data-state`, so a form only
 * has to hand over its status and its own geometry.
 */
export function SubmitButton({
  status,
  label,
  sendingLabel = "On envoie…",
  doneLabel = "C’est bon !",
  errorLabel = "Réessayer",
  type = "submit",
  onClick,
  style,
}: {
  status: SubmitStatus;
  label: ReactNode;
  sendingLabel?: string;
  doneLabel?: string;
  errorLabel?: string;
  type?: "submit" | "button";
  onClick?: () => void;
  style?: CSSProperties;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="yq-submit"
      data-state={status}
      disabled={status === "sending"}
      // The label changes under the pointer, so say it out loud too - a screen
      // reader would otherwise get a silent swap from "Rejoindre" to "C'est bon".
      aria-live="polite"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 9,
        border: 0,
        cursor: status === "sending" ? "progress" : "pointer",
        background: "#2A343D",
        color: "#FFFFFF",
        fontFamily: UI,
        fontWeight: 700,
        fontSize: 16,
        ...style,
      }}
    >
      {status === "sending" ? (
        <>
          <span className="yq-spinner" />
          {sendingLabel}
        </>
      ) : status === "done" ? (
        <>
          <CheckIcon />
          {doneLabel}
        </>
      ) : status === "error" ? (
        <>
          <CrossIcon />
          {errorLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
