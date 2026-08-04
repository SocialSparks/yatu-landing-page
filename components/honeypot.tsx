import {HONEYPOT_NAME} from "@/lib/forms";

/**
 * A field no human ever sees or tabs into. Bots fill every input they find, so a
 * submission that comes back with something in it is filed as spam rather than
 * forwarded - a public endpoint gets scraped sooner or later.
 *
 * The `data-*` attributes are the ones password managers actually honour.
 * `autoComplete="off"` alone is not enough: 1Password and its peers happily fill
 * a hidden field whose name looks like a login field, and every one of those
 * false positives used to become a signup that vanished without a trace. Those
 * are now visible - they land in the buffer with `status = 'spam'`.
 */
export function Honeypot() {
  return (
    <input
      type="text"
      name={HONEYPOT_NAME}
      tabIndex={-1}
      autoComplete="off"
      data-1p-ignore
      data-lpignore="true"
      data-form-type="other"
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
