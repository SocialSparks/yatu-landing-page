/**
 * Where the two forms of the site send what visitors type.
 *
 * The destination is a Google Apps Script web app bound to a Google Sheet - see
 * `scripts/google-sheet.gs` and the "Formulaires" section of the README. That
 * URL is public by design, so no secret lives here and the site still needs no
 * server of its own: nothing changes for the Cloudflare deployment.
 *
 * Leave `NEXT_PUBLIC_FORMS_ENDPOINT` unset and both forms stay in local mode -
 * the submission is kept in localStorage only, and the journey still runs end
 * to end so the pages remain testable.
 */
export const FORMS_ENDPOINT = process.env.NEXT_PUBLIC_FORMS_ENDPOINT ?? "";

/** One tab of the sheet each. The script keys its column mapping on this. */
export type FormKind = "waitlist" | "bde-demo" | "profil";

/** Name of the field no human sees; see `components/honeypot.tsx`. */
export const HONEYPOT_NAME = "website";

/** localStorage key per form, kept as a copy of what left the browser. */
const BACKUP_KEY: Record<FormKind, string> = {
  waitlist: "yatu-waitlist",
  "bde-demo": "yatu-bde-demandes",
  profil: "yatu-profil",
};

/**
 * `sent` - the sheet answered; `stored` - no endpoint configured, kept locally;
 * `failed` - the endpoint is configured but did not take it.
 *
 * Callers treat `failed` as a real error: the local copy sits on the visitor's
 * machine, so a lost submission is a lost lead unless they retry.
 */
export type SubmitResult = "sent" | "stored" | "failed";

const TIMEOUT_MS = 8000;

export async function submitForm(
  kind: FormKind,
  fields: Record<string, unknown>,
): Promise<SubmitResult> {
  const payload = {
    ...fields,
    kind,
    ts: new Date().toISOString(),
    page: typeof window === "undefined" ? "" : window.location.pathname,
  };

  keepLocalCopy(kind, payload);

  if (!FORMS_ENDPOINT) return "stored";

  try {
    const res = await fetch(FORMS_ENDPOINT, {
      method: "POST",
      // text/plain on purpose: Apps Script cannot answer a CORS preflight, and
      // application/json would trigger one. This keeps the POST a "simple
      // request" that goes straight through - the body is still JSON, and the
      // script parses it as such.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) return "failed";

    // The script always answers { ok: true } on a row it wrote.
    const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return body?.ok === false ? "failed" : "sent";
  } catch {
    return "failed";
  }
}

function keepLocalCopy(kind: FormKind, payload: Record<string, unknown>) {
  try {
    const key = BACKUP_KEY[kind];
    const list = JSON.parse(window.localStorage.getItem(key) || "[]");
    list.push(payload);
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* storage blocked - not worth failing the submission over */
  }
}
