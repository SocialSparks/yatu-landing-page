"use client";

import { NavLink } from "@/components/nav-link";
import {CTA} from "@/lib/content";
import {ROUTES} from "@/lib/routes";
import {useHasLaunched} from "@/lib/use-launch-state";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

type Action = {
  href: string;
  label: string;
};

export function SectionCta({
  title,
  body,
  primary,
  secondary,
  onDark = false,
  accent = "#FED873",
  availableTitle,
  availableBody,
}: {
  title: string;
  body: string;
  primary: Action;
  secondary?: Action;
  onDark?: boolean;
  accent?: string;
  availableTitle?: string;
  availableBody?: string;
}) {
  const hasLaunched = useHasLaunched();
  const launchAction = (action: Action) =>
    hasLaunched && action.href === ROUTES.liste
      ? {href: ROUTES.liste, label: CTA.download}
      : action;
  const shownPrimary = launchAction(primary);
  const shownSecondary = secondary ? launchAction(secondary) : undefined;

  return (
    <div
      data-reveal="up"
      data-tone={onDark ? "dark" : "light"}
      className="yq-section-cta"
      style={
        {
          "--yq-section-cta-accent": accent,
        } as React.CSSProperties
      }
    >
      <div className="yq-section-cta-copy">
        <span className="yq-section-cta-dot" aria-hidden="true" />
        <span style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span
            style={{
              fontFamily: DISPLAY,
              fontSize: "clamp(20px,2.4vw,26px)",
              lineHeight: 1.15,
              letterSpacing: "-.02em",
              color: onDark ? "#FFFFFF" : "#2A343D",
            }}
          >
            {hasLaunched && availableTitle ? availableTitle : title}
          </span>
          <span
            style={{
              maxWidth: "58ch",
              fontFamily: UI,
              fontSize: 15,
              lineHeight: 1.5,
              color: onDark ? "rgba(255,255,255,.66)" : "rgba(42,52,61,.68)",
            }}
          >
            {hasLaunched && availableBody ? availableBody : body}
          </span>
        </span>
      </div>

      <div className="yq-section-cta-actions">
        <NavLink href={shownPrimary.href} className="yq-section-cta-primary">
          {shownPrimary.label}
          <span aria-hidden="true">→</span>
        </NavLink>
        {shownSecondary ? (
          <NavLink href={shownSecondary.href} className="yq-section-cta-secondary">
            {shownSecondary.label}
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}
