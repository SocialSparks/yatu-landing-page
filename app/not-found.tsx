import type { Metadata } from "next";
import { NavLink } from "@/components/nav-link";
import { ROUTES } from "@/lib/routes";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "clamp(560px,72vh,760px)",
        padding: "clamp(56px,8vw,104px) 24px",
        display: "grid",
        placeItems: "center",
        background: "#F7F4ED",
      }}
    >
      <section
        aria-labelledby="not-found-title"
        style={{
          width: "100%",
          maxWidth: 720,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
          textAlign: "center",
        }}
      >
        <span
          data-reveal="scale"
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(8px,2vw,16px)",
            fontFamily: DISPLAY,
            fontSize: "clamp(72px,17vw,148px)",
            lineHeight: 0.9,
            letterSpacing: "-.06em",
            color: "#2A343D",
          }}
        >
          <span style={{ color: "#FF7676" }}>4</span>
          <span style={{ color: "#FED873" }}>0</span>
          <span style={{ color: "#6FC6F1" }}>4</span>
        </span>

        <span
          data-reveal="up"
          style={{
            display: "inline-flex",
            padding: "9px 15px",
            borderRadius: 999,
            background: "#FFFFFF",
            border: "1px solid #EBE7DE",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 13,
            color: "#4E565D",
          }}
        >
          Page introuvable
        </span>

        <h1
          id="not-found-title"
          data-reveal="up"
          data-reveal-delay="70"
          style={{
            margin: 0,
            maxWidth: "18ch",
            fontFamily: DISPLAY,
            fontWeight: 400,
            fontSize: "clamp(34px,5vw,54px)",
            lineHeight: 1.08,
            letterSpacing: "-.025em",
            color: "#2A343D",
            textWrap: "balance",
          }}
        >
          Cette page s’est perdue en route.
        </h1>

        <p
          data-reveal="up"
          data-reveal-delay="120"
          style={{
            margin: 0,
            maxWidth: "48ch",
            fontFamily: UI,
            fontSize: 18,
            lineHeight: 1.5,
            color: "rgba(42,52,61,.72)",
            textWrap: "pretty",
          }}
        >
          L’adresse est peut-être incorrecte ou la page n’existe plus. Tu peux revenir à
          l’accueil et reprendre ta visite.
        </p>

        <div
          data-reveal="up"
          data-reveal-delay="170"
          style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 10 }}
        >
          <NavLink
            href={ROUTES.home}
            className="yq-btn-dark"
            style={{
              minHeight: 52,
              padding: "0 22px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: "#2A343D",
              color: "#FFFFFF",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Retour à l’accueil
          </NavLink>
          <NavLink
            href={ROUTES.yatu}
            className="yq-btn-light"
            style={{
              minHeight: 52,
              padding: "0 22px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 999,
              background: "#FFFFFF",
              border: "1px solid #EBE7DE",
              color: "#2A343D",
              fontFamily: UI,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Découvrir Yatu
          </NavLink>
        </div>
      </section>
    </main>
  );
}
