import { NavLink } from "@/components/nav-link";
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
            <details
              key={item.q}
              style={{
                background: "#FFFFFF",
                border: "1px solid #EBE7DE",
                borderRadius: 16,
                padding: "20px 22px",
              }}
            >
              <summary style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span
                  style={{
                    flex: "1 1 auto",
                    fontFamily: DISPLAY,
                    fontSize: 18,
                    lineHeight: 1.3,
                    letterSpacing: "-.02em",
                    color: "#2A343D",
                  }}
                >
                  {item.q}
                </span>
                <span
                  className="yq-plus"
                  aria-hidden="true"
                  style={{
                    flex: "none",
                    width: 28,
                    height: 28,
                    borderRadius: 80,
                    background: "#EFE8DE",
                    color: "#2A343D",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: UI,
                    fontSize: 18,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </summary>
              <p
                style={{
                  margin: "14px 0 0",
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
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
