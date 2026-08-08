"use client";

import { useEffect, useState } from "react";
import { Decor } from "@/components/decor";
import { NavLink } from "@/components/nav-link";
import { Picture } from "@/components/picture";
import { SectionHeading } from "@/components/section-heading";
import { SectionCta } from "@/components/section-cta";
import { ACCENT, CTA, USE_CASE_ROWS, type UseCase } from "@/lib/content";
import { USAGES_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const MAX_USE_CASES = 8;
const ALL_USE_CASES = USE_CASE_ROWS.flatMap((row) => row.cards);
const DEFAULT_USE_CASES = ALL_USE_CASES.slice(0, MAX_USE_CASES);

function randomUseCases() {
  const cards = [...ALL_USE_CASES];

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards.slice(0, MAX_USE_CASES);
}

function Card({ card }: { card: UseCase }) {
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        borderRadius: 24,
        overflow: "hidden",
        background: "#EFE8DE",
        position: "relative",
      }}
    >
      {card.photo ? (
        <Picture
          src={card.photo}
          alt={card.photoAlt}
          widths={[480, 1040]}
          sizes="(max-width: 600px) 100vw, 300px"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}

      <img
        loading="lazy"
        decoding="async"
        src={card.icon}
        alt=""
        style={{
          position: "absolute",
          left: 16,
          top: 16,
          width: 42,
          height: 42,
          zIndex: 2,
          pointerEvents: "none",
          filter: "drop-shadow(0 4px 12px rgba(0,0,0,.28))",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "auto 0 0 0",
          padding: 20,
          background: "linear-gradient(180deg,transparent 0%,rgba(0,0,0,.82) 100%)",
          display: "flex",
          flexDirection: "column",
          gap: 7,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            alignSelf: "flex-start",
            background: card.badge,
            color: "#2A343D",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 12,
            padding: "5px 11px",
            borderRadius: 999,
          }}
        >
          {card.label}
        </span>
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 20,
            lineHeight: 1.15,
            letterSpacing: "-.02em",
            color: "#FFFFFF",
          }}
        >
          {card.title}
        </span>
        <span
          style={{ fontFamily: UI, fontSize: 14, lineHeight: 1.4, color: "rgba(255,255,255,.82)" }}
        >
          {card.sub}
        </span>
      </div>
    </div>
  );
}

export function UseCasesSection() {
  const [useCases, setUseCases] = useState(DEFAULT_USE_CASES);

  useEffect(() => {
    setUseCases(randomUseCases());
  }, []);

  return (
    <section
      id="usages"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#FFFFFF",
        padding: "clamp(56px,8vw,104px) 0",
      }}
    >
      <Decor items={USAGES_DECOR} />

      <div
        data-r="gutter"
        style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}
      >
        <SectionHeading
          badge="Les cas d’usage"
          badgeBg={ACCENT.blush}
          title="Soirée, week-end, voyage : le même espace partagé."
          titleMaxCh={24}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(230px,100%),1fr))",
            gap: 16,
          }}
        >
          {useCases.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>

        <p
          data-reveal="up"
          style={{
            margin: "clamp(34px,4.5vw,52px) auto 0",
            textAlign: "center",
            fontFamily: UI,
            fontSize: 17,
            lineHeight: 1.5,
            color: "rgba(42,52,61,.6)",
            maxWidth: "60ch",
          }}
        >
          Anniversaire, EVJF, EVG, festival, week-end au ski ou voyage en groupe : tu actives
          les outils dont cette occasion a besoin, et pas les autres.{" "}
          <NavLink href={ROUTES.organiser} style={{ color: "#2A343D" }}>
            Nos guides détaillent la méthode occasion par occasion.
          </NavLink>
        </p>

        <SectionCta
          title="Tu as déjà le prochain événement en tête ?"
          body="Garde ta place pour créer ton premier événement dès l’ouverture."
          primary={{ href: ROUTES.liste, label: CTA.waitlist }}
          secondary={{ href: ROUTES.fonctionnement, label: CTA.demo }}
          accent={ACCENT.coral}
        />
      </div>
    </section>
  );
}
