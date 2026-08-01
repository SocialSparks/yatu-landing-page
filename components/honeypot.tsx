import { HONEYPOT_NAME } from "@/lib/forms";

/**
 * A field no human ever sees or tabs into. Bots fill every input they find, so
 * the Apps Script silently drops any submission where this one came back with
 * something in it - a public endpoint gets scraped sooner or later.
 */
export function Honeypot() {
  return (
    <input
      type="text"
      name={HONEYPOT_NAME}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{
        position: "absolute",
        left: -9999,
        width: 1,
        height: 1,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
