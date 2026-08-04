"use client";

import { NavLink } from "@/components/nav-link";
import { useId, useState } from "react";
import { FAQ, type FaqEntry } from "@/lib/content";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

function FaqItem({ item }: { item: FaqEntry }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const answerId = `${id}-answer`;
  const questionId = `${id}-question`;

  return (
    <div className="yq-faq-card" data-open={open}>
      <button
        id={questionId}
        type="button"
        className="yq-faq-trigger"
        aria-expanded={open}
        aria-controls={answerId}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          style={{
            flex: "1 1 auto",
            fontFamily: DISPLAY,
            fontSize: 18,
            lineHeight: 1.3,
            letterSpacing: "-.02em",
            color: "#2A343D",
            textAlign: "left",
          }}
        >
          {item.q}
        </span>
        <span className="yq-plus" aria-hidden="true">
          +
        </span>
      </button>

      <div
        id={answerId}
        className="yq-faq-answer"
        role="region"
        aria-labelledby={questionId}
        inert={!open}
      >
        <div className="yq-faq-answer-inner">
          <p
            style={{
              margin: 0,
              padding: "0 62px 20px 22px",
              fontFamily: UI,
              fontSize: 16,
              lineHeight: 1.55,
              color: "rgba(42,52,61,.8)",
              maxWidth: "64ch",
              textWrap: "pretty",
            }}
          >
            {item.a}
            {item.link ? (
              <>
                {" "}
                {item.link.before}
                <NavLink href={item.link.href} style={{ color: "#2A343D" }}>
                  {item.link.label}
                </NavLink>
                {item.link.after}
              </>
            ) : null}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * The accordion. Defaults to the home page’s questions; the occasion guides
 * pass their own, so there is only ever one implementation of the answer panel
 * - and one place where the markup Google reads matches what is on screen.
 */
export function FaqSection({
  items = FAQ,
  title = "Les questions qu’on nous pose",
  background = "#EFE8DE",
}: {
  items?: FaqEntry[];
  title?: string;
  background?: string;
}) {
  return (
    <section id="faq" style={{ background, padding: "clamp(56px,8vw,104px) 0" }}>
      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 820, margin: "0 auto", padding: "0 24px" }}
      >
        <h2
          data-reveal="up"
          style={{
            margin: "0 0 clamp(26px,4vw,40px)",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(30px,4.2vw,46px)",
            lineHeight: 1.08,
            letterSpacing: "-.025em",
            color: "#2A343D",
          }}
        >
          {title}
        </h2>

        <div data-reveal="stagger" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
