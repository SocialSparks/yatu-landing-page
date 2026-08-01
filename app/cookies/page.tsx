import type { Metadata } from "next";
import { ConsentStatus } from "@/components/consent-status";
import { B, LegalPage, LegalSection, P } from "@/components/legal-page";
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
    "Le stockage local et les éventuels traceurs du site Yatu, leur durée et la façon de revoir ses préférences à tout moment.",
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
      updatedAt="1er août 2026"
      decor={COOKIES_DECOR}
      lede="Le site utilise surtout le stockage local de ton navigateur pour mémoriser tes choix et les informations que tu saisis. Aucun traceur publicitaire ni outil de mesure d’audience tiers n’est actuellement activé."
    >
      <ConsentStatus />

      <LegalSection title="1. Ce qu’est un cookie">
        <P>
          Un cookie est un petit fichier déposé par un site dans ton navigateur. Il permet de se
          souvenir d’une information d’une page à l’autre - par exemple ton choix de
          consentement - ou de mesurer la fréquentation. Certains sont indispensables au
          fonctionnement du site, d’autres non : ceux-là ne sont déposés qu’avec ton
          accord.
        </P>
      </LegalSection>

      <LegalSection title="2. Les traceurs utilisés sur ce site" gap={18}>
        <Tracker
          label="Strictement nécessaires"
          badge="#2A343D"
          rule="Toujours actifs - pas de consentement requis"
        >
          <Line>
            <B>yatu-consent-v1</B> — mémorise les catégories acceptées ou refusées et la date du
            choix. Stockage local, six mois.
          </Line>
          <Line>
            <B>yatu-waitlist</B> — conserve dans ton navigateur l’adresse e-mail saisie, la page
            d’origine et la date du parcours de préinscription. Supprimé en vidant les données du
            site.
          </Line>
          <Line>
            <B>yatu-profil</B> — conserve une copie des réponses facultatives données sur la page
            de bienvenue. Supprimé en vidant les données du site.
          </Line>
          <Line>
            <B>yatu-bde-demandes</B> — conserve une copie des formulaires BDE saisis. Supprimé en
            vidant les données du site.
          </Line>
          <Line>
            Ces trois entrées sont des copies conservées sur ton appareil pour éviter la perte de
            saisie. Le contenu des formulaires est par ailleurs transmis à QUANTIQ STUDIO au moment
            où tu valides, pour pouvoir te recontacter : voir la{" "}
            <NavLink href={ROUTES.confidentialite} style={{ color: "#4E565D" }}>
              politique de confidentialité
            </NavLink>
            .
          </Line>
        </Tracker>

        <Tracker
          label="Mesure d’audience"
          badge={ACCENT.lilac}
          rule="Déposés seulement si tu les acceptes"
        >
          <Line>
            Aucun outil de mesure d’audience tiers n’est actuellement chargé par le site. Activer
            cette préférence ne dépose donc aucun traceur de statistiques à ce jour.
          </Line>
          <Line>
            Si un outil est ajouté ultérieurement, il ne sera activé qu’après consentement et cette
            page sera mise à jour avant sa mise en service.
          </Line>
        </Tracker>

        <Tracker
          label="Contenus des réseaux sociaux"
          badge={ACCENT.blush}
          rule="Déposés seulement si tu les acceptes"
        >
          <Line>
            Le site contient actuellement de simples liens vers Instagram, TikTok et WhatsApp,
            sans publication intégrée. Aucun traceur de ces plateformes n’est chargé tant que tu ne
            quittes pas le site en cliquant sur l’un de ces liens.
          </Line>
        </Tracker>
      </LegalSection>

      <LegalSection title="3. Régler ça depuis ton navigateur">
        <P>
          Tu peux aussi bloquer ou supprimer les cookies directement dans les réglages de ton
          navigateur - rubrique confidentialité pour Chrome, Firefox, Safari ou Edge. Le site
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
