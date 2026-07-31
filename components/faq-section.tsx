"use client";

import { NavLink } from "@/components/nav-link";
import { useId, useState } from "react";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "C'est quoi Yatu, en une phrase ?",
    a: "Une appli mobile où un groupe d'amis crée un événement, invite tout le monde, discute, gère le budget et les tâches, et garde les souvenirs. Le tout au même endroit.",
  },
  {
    q: "Quand est-ce que ça sort ?",
    a: "Le 9 septembre 2026. Les inscrits reçoivent l'accès ce jour-là, avant l'ouverture publique.",
  },
  {
    q: "C'est payant ?",
    a: "Non, gratuit au lancement et sans publicité.",
  },
  {
    q: "Faut-il que tout le groupe l'installe ?",
    a: "Pour voter, ajouter une dépense ou déposer des photos, oui. L'invitation se fait par lien et rejoindre prend moins d'une minute.",
  },
  {
    q: "Sur quels téléphones ?",
    a: "iOS et Android au lancement. Un groupe mélangé fonctionne sans différence.",
  },
  {
    q: "Qu'est-ce que vous faites de mes données ?",
    a: (
      <>
        Ton adresse sert à te prévenir du lancement, et à rien d&apos;autre. Le détail est dans la{" "}
        <NavLink href={ROUTES.confidentialite} style={{ color: "#2A343D" }}>
          politique de confidentialité
        </NavLink>
        .
      </>
    ),
  },
  {
    q: "Je suis dans un BDE, c'est pareil ?",
    a: (
      <>
        Même appli, avec des outils en plus pour les organisateurs. Un{" "}
        <NavLink href={ROUTES.bde} style={{ color: "#2A343D" }}>
          pack pilote gratuit
        </NavLink>{" "}
        est ouvert avant le lancement.
      </>
    ),
  },
];

function FaqItem({ item }: { item: (typeof FAQ)[number] }) {
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
          </p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" style={{ background: "#EFE8DE", padding: "clamp(56px,8vw,104px) 0" }}>
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
          Vos questions
        </h2>

        <div data-reveal="stagger" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQ.map((item) => (
            <FaqItem key={item.q} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
