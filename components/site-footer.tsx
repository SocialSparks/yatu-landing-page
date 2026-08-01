import { NavLink } from "@/components/nav-link";
import { ConsentButton } from "@/components/consent-button";
import { LAUNCH_LABEL } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { CONTACT_EMAIL, PUBLISHER } from "@/lib/site";

const DISPLAY = "var(--font-display), 'Trebuchet MS', system-ui, sans-serif";
const UI = "var(--font-ui), system-ui, sans-serif";

const COLUMN_TITLE: React.CSSProperties = {
  fontFamily: UI,
  fontWeight: 700,
  fontSize: 13,
  letterSpacing: ".04em",
  color: "rgba(255,255,255,.44)",
};

const LINK: React.CSSProperties = {
  fontFamily: UI,
  fontSize: 15,
  color: "rgba(255,255,255,.78)",
  textDecoration: "none",
};

const COLUMNS: { title: string; links: { href: string; label: string; external?: boolean }[] }[] = [
  {
    title: "L’app",
    links: [
      { href: ROUTES.fonctionnement, label: "Comment ça marche" },
      { href: ROUTES.modules, label: "Les modules" },
      { href: ROUTES.cycle, label: "Avant, pendant, après" },
      { href: ROUTES.usages, label: "Cas d’usage" },
      { href: ROUTES.faq, label: "Questions fréquentes" },
    ],
  },
  {
    title: "BDE et associations",
    links: [
      { href: ROUTES.bde, label: "Organiser un WEI avec Yatu" },
      { href: ROUTES.bdeFeatures, label: "Les fonctionnalités BDE" },
      { href: ROUTES.bdePilote, label: "Le pack pilote gratuit" },
      { href: ROUTES.bdeDemo, label: "Demander une démo" },
    ],
  },
];

const SOCIAL = [
  { href: "https://www.instagram.com/yatu_app/", label: "Instagram" },
  { href: "https://www.tiktok.com/@yatu_app", label: "TikTok" },
];

export function SiteFooter() {
  return (
    <footer style={{ background: "#2A343D", color: "#FFFFFF" }}>
      <div
        data-r="gutter"
        style={{ maxWidth: 1160, margin: "0 auto", padding: "64px 24px 28px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(190px,100%),1fr))",
            gap: "40px 32px",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 200 }}>
            <span style={{ fontFamily: DISPLAY, fontSize: 28, lineHeight: 1, color: "#FFFFFF" }}>
              Yatu
            </span>
            <p
              style={{
                margin: 0,
                fontFamily: UI,
                fontSize: 15,
                lineHeight: 1.5,
                color: "rgba(255,255,255,.66)",
                maxWidth: "34ch",
                textWrap: "pretty",
              }}
            >
              L’appli qui réunit tout ce qu’un groupe d’amis doit organiser autour d’un événement,
              de la première idée aux dernières photos.
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                alignSelf: "flex-start",
                background: "rgba(255,255,255,.08)",
                borderRadius: 999,
                padding: "7px 14px",
                fontFamily: UI,
                fontWeight: 700,
                fontSize: 13,
                color: "#FED873",
              }}
            >
              Sortie le {LAUNCH_LABEL}
            </span>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={COLUMN_TITLE}>{col.title}</span>
              {col.links.map((l) => (
                <NavLink key={l.href} href={l.href} className="yq-footer-link" style={LINK}>
                  {l.label}
                </NavLink>
              ))}
            </div>
          ))}

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={COLUMN_TITLE}>Légal</span>
            <NavLink href={ROUTES.mentionsLegales} className="yq-footer-link" style={LINK}>
              Mentions légales
            </NavLink>
            <NavLink href={ROUTES.confidentialite} className="yq-footer-link" style={LINK}>
              Politique de confidentialité
            </NavLink>
            <NavLink href={ROUTES.cookies} className="yq-footer-link" style={LINK}>
              Gestion des cookies
            </NavLink>
            <ConsentButton />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={COLUMN_TITLE}>Nous suivre</span>
            {SOCIAL.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="yq-footer-link"
                style={LINK}
                {...(s.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 48,
            paddingTop: 22,
            borderTop: "1px solid rgba(255,255,255,.12)",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 24px",
            alignItems: "baseline",
          }}
        >
          <span style={{ fontFamily: UI, fontSize: 13, color: "rgba(255,255,255,.5)" }}>
            © 2026 Yatu - édité par {PUBLISHER}
          </span>
          <span style={{ fontFamily: UI, fontSize: 13, color: "rgba(255,255,255,.5)" }}>
            Fait en France, pour les bandes qui mettent trois semaines à choisir une date
          </span>
        </div>
      </div>
    </footer>
  );
}
