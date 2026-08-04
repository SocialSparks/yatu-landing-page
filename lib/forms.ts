/**
 * Where the three forms of the site send what visitors type.
 *
 * They post to `/api/forms` - the site's own domain. Before, the browser posted
 * straight to the Google Apps Script URL, and that one hop was where signups
 * quietly died: ad blockers and school DNS filters drop `script.google.com`, the
 * `/exec` URL answers with a redirect that some proxies mangle, and the script
 * serialises writes behind a 20 second lock that lined up exactly with the
 * client timeout. None of that is reachable from here any more.
 *
 * The Worker writes the submission to D1 before answering, then carries it to
 * the sheet in the background, retrying until it lands. See
 * `app/api/forms/route.ts` and `lib/server/forward-to-sheet.ts`.
 */
const FORMS_API_PATH = "/api/forms";

/** One tab of the sheet each. The Apps Script keys its column mapping on this. */
export type FormKind = "waitlist" | "bde-demo" | "profil";

/**
 * Name of the field no human sees; see `components/honeypot.tsx`.
 *
 * Not `website`: that is the field name password managers fill from a saved
 * login's URL, which turned honest signups into silently discarded ones.
 */
export const HONEYPOT_NAME = "yq-ref";

/**
 * `sent` - the server acknowledged and filed the submission; it will reach the
 * sheet, now or on the next drain. `failed` - nothing was filed anywhere and the
 * visitor has to try again.
 *
 * There is deliberately no third value. The old `stored` meant "kept in
 * localStorage only" and every caller read it as success, so a build without the
 * endpoint configured showed a green tick for a signup that went nowhere.
 */
export type SubmitResult = "sent" | "failed";

/** The server answers without waiting for Google, so a slow reply now means a
 *  real problem rather than a cold-starting Apps Script. */
const TIMEOUT_MS = 10000;

/** Two attempts, because the id makes a resend harmless and a momentary network
 *  blip should not become a red button. */
const ATTEMPTS = 2;
const RETRY_DELAY_MS = 1200;

export async function submitForm(
  kind: FormKind,
  fields: Record<string, unknown>,
): Promise<SubmitResult> {
  const payload = {
    ...fields,
    kind,
    // Minted here rather than server-side: this is what makes a resend safe all
    // the way from the <visitor's double-click to the Worker's retry an hour later.
    id: newId(),
    ts: new Date().toISOString(),
    page: typeof window === "undefined" ? "" : window.location.pathname,
  };

  for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
    if (attempt) await sleep(RETRY_DELAY_MS);

    try {
      const res = await fetch(FORMS_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });

      if (res.ok) return "sent";

      // A 4xx means the submission itself was refused - sending it again would
      // get the same answer. 429 is the exception: that one is worth waiting out.
      if (res.status >= 400 && res.status < 500 && res.status !== 429) return "failed";
    } catch {
      /* network or timeout - worth one more try */
    }
  }

  return "failed";
}

/**
 * `crypto.randomUUID` needs a secure context and is missing on Safari below
 * 15.4. Without the fallback that is a TypeError inside the submit handler -
 * which the visitor would read as a red button.
 */
function newId(): string {
  const c = globalThis.crypto;
  if (c?.randomUUID) return c.randomUUID();

  const b = new Uint8Array(16);
  c.getRandomValues(b);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map((x) => x.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
