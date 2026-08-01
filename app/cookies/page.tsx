import type { Metadata } from "next";
import { ConsentStatus } from "@/components/consent-status";
import { B, LegalPage, LegalSection, P, Todo } from "@/components/legal-page";
import { NavLink } from "@/components/nav-link";
import { ACCENT } from "@/lib/content";
import { COOKIES_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";
import { pageMetadata } from "@/lib/site";

const UI = "var(--font-ui), system-ui, sans-serif";

export const metadata: Metadata = pageMetadata({
  path: "/cookies",
  title: "Gestion des cookies — Yatu",
  description:
    "Les traceurs déposés par le site Yatu, ce qu’ils font, combien de temps ils durent, et comment revoir ton consentement à tout moment.",
});

/** One family of trackers: badge, consent rule, then the entries. */
function Tracker({
  label,
  badge,
  rule,
  children,
}: {
  label: string;
  badge: string;
  rule: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid #EBE7DE",
        borderRadius: 12,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        background: "#F7F4ED",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span
          style={{
            display: "inline-flex",
            background: badge,
            color: badge === "#2A343D" ? "#FFFFFF" : "#2A343D",
            fontFamily: UI,
            fontWeight: 700,
            fontSize: 12,
            padding: "5px 11px",
            borderRadius: 999,
          }}
        >
          {label}
        </span>
        <span style={{ fontFamily: UI, fontWeight: 600, fontSize: 13, color: "#71787E" }}>
          {rule}
        </span>
      </div>
      {children}
    </div>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{ fontFamily: UI, fontSize: 16, lineHeight: 1.6, color: "rgba(42,52,61,.8)" }}
    >
      {children}
    </span>
  );
}

/** Implemented from "Cookies.dc.html". */
export default function Page() {
  return (
    <LegalPage
      badge="Traceurs"
      title="Gestion des cookies"
      updatedAt="31 juillet 2026"
      decor={COOKIES_DECOR}
      lede="Ce site pose le minimum : de quoi mémoriser ton choix, et — seulement si tu l’acceptes — de quoi compter les visites. Aucun traceur publicitaire, aucun revendeur de données."
    >
      <ConsentStatus />

      <LegalSection title="1. Ce qu’est un cookie">
        <P>
          Un cookie est un petit fichier déposé par un site dans ton navigateur. Il permet de se
          souvenir d’une information d’une page à l’autre — par exemple ton choix de
          consentement — ou de mesurer la fréquentation. Certains sont indispensables au
          fonctionnement du site, d’autres non : ceux-là ne sont déposés qu’avec ton
          accord.
        </P>
      </LegalSection>

      <LegalSection title="2. Les traceurs utilisés sur ce site" gap={18}>
        <Tracker
          label="Strictement nécessaires"
          badge="#2A343D"
          rule="Toujours actifs — pas de consentement requis"
        >
          <Line>
            <B>yatu-consent</B> — mémorise ton choix de consentement pour ne pas te reposer la
            question à chaque visite. Stockage local, treize mois.
          </Line>
          <Line>
            <B>yatu-waitlist</B> — conserve dans ton navigateur la trace de ton inscription, pour
            t’éviter de la refaire. Stockage local, supprimé en vidant les données du site.
          </Line>
        </Tracker>

        <Tracker
          label="Mesure d’audience"
          badge={ACCENT.lilac}
          rule="Déposés seulement si tu les acceptes"
        >
          <Line>
            <Todo>Outil de statistiques à préciser</Todo> — compte les pages vues, la source
            d’arrivée et les inscriptions abouties, en données agrégées. Durée maximale :
            treize mois.
          </Line>
          <Line>
            Ces mesures servent uniquement à savoir quelles pages sont utiles avant le lancement.
            Elles ne sont jamais croisées avec ton adresse e-mail.
          </Line>
        </Tracker>

        <Tracker
          label="Contenus des réseaux sociaux"
          badge={ACCENT.blush}
          rule="Déposés seulement si tu les acceptes"
        >
          <Line>
            Si une publication Instagram ou TikTok est intégrée à une page, la plateforme concernée
            peut déposer ses propres traceurs. Sans consentement, le contenu reste remplacé par un
            simple lien.
          </Line>
        </Tracker>
      </LegalSection>

      <LegalSection title="3. Régler ça depuis ton navigateur">
        <P>
          Tu peux aussi bloquer ou supprimer les cookies directement dans les réglages de ton
          navigateur — rubrique confidentialité pour Chrome, Firefox, Safari ou Edge. Le site
          continuera de fonctionner, mais ton choix de consentement te sera redemandé à chaque
          visite.
        </P>
        <P>
          Pour tout savoir sur l’usage de tes données au-delà des traceurs, va voir la{" "}
          <NavLink href={ROUTES.confidentialite}>politique de confidentialité</NavLink>.
        </P>
      </LegalSection>
    </LegalPage>
  );
}
