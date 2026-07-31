import type { Metadata } from "next";
import { B, Bullet, LegalPage, LegalSection, P, Todo } from "@/components/legal-page";
import { NavLink } from "@/components/nav-link";
import { ACCENT } from "@/lib/content";
import { CONFIDENTIALITE_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";

const UI = "var(--font-ui), system-ui, sans-serif";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Yatu",
  description:
    "Ce que Yatu collecte, pourquoi, qui y a accès et comment exercer tes droits. Rien n'est vendu ni partagé à des fins publicitaires.",
};

/** One processing activity: what is collected, why, on what basis, for how long. */
function Treatment({
  label,
  badge,
  rows,
}: {
  label: string;
  badge: string;
  rows: [string, string][];
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
      <span
        style={{
          display: "inline-flex",
          alignSelf: "flex-start",
          background: badge,
          color: "#2A343D",
          fontFamily: UI,
          fontWeight: 700,
          fontSize: 12,
          padding: "5px 11px",
          borderRadius: 999,
        }}
      >
        {label}
      </span>
      {rows.map(([term, text]) => (
        <span
          key={term}
          style={{
            fontFamily: UI,
            fontSize: 16,
            lineHeight: 1.6,
            color: "rgba(42,52,61,.8)",
          }}
        >
          <B>{term} :</B> {text}
        </span>
      ))}
    </div>
  );
}

/** Implemented from "Confidentialite.dc.html". */
export default function Page() {
  return (
    <LegalPage
      badge="Tes données"
      title="Politique de confidentialité"
      updatedAt="31 juillet 2026"
      decor={CONFIDENTIALITE_DECOR}
      lede="En résumé : on collecte ton adresse e-mail pour te prévenir du lancement, les coordonnées que tu laisses si tu représentes un BDE, et des statistiques de fréquentation si tu les acceptes. Rien n'est vendu, rien n'est partagé à des fins publicitaires."
      warning={
        <>
          <B>À compléter avant mise en ligne.</B> Les champs surlignés dépendent des outils
          réellement branchés (routeur e-mail, mesure d&apos;audience, hébergeur) et de
          l&apos;identité juridique de Quantiq Studio.
        </>
      }
    >
      <LegalSection title="1. Qui est responsable de tes données">
        <P>
          Le responsable de traitement est <B>Quantiq Studio</B>, éditeur de Yatu, dont les
          coordonnées figurent dans les{" "}
          <NavLink href={ROUTES.mentionsLegales}>mentions légales</NavLink>. Pour toute question
          relative à tes données : <a href="mailto:privacy@yatu.app">privacy@yatu.app</a>.
        </P>
      </LegalSection>

      <LegalSection title="2. Ce qu'on collecte, et pourquoi" gap={18}>
        <Treatment
          label="Liste d'attente"
          badge={ACCENT.sky}
          rows={[
            ["Données", "adresse e-mail, date d'inscription, page d'origine de l'inscription."],
            [
              "Finalité",
              "t'informer du lancement de l'application et de l'ouverture des accès anticipés.",
            ],
            ["Base légale", "ton consentement (article 6.1.a du RGPD), retirable à tout moment."],
            ["Conservation", "jusqu'à trois mois après le lancement, ou jusqu'à ton désabonnement."],
          ]}
        />
        <Treatment
          label="Qualification facultative"
          badge={ACCENT.sunbeam}
          rows={[
            [
              "Données",
              "types d'événements organisés, taille habituelle du groupe, appartenance à un BDE ou une association.",
            ],
            ["Finalité", "prioriser les fonctionnalités développées avant la sortie."],
            [
              "Base légale",
              "ton consentement. Ces questions sont facultatives et peuvent être passées.",
            ],
            ["Conservation", "même durée que l'inscription à la liste d'attente."],
          ]}
        />
        <Treatment
          label="Formulaire BDE"
          badge={ACCENT.meadow}
          rows={[
            [
              "Données",
              "nom et prénom, nom du BDE ou de l'association, école ou campus, adresse e-mail, type et taille de l'événement, message libre.",
            ],
            [
              "Finalité",
              "te recontacter pour une démonstration et instruire ta candidature au programme pilote.",
            ],
            [
              "Base légale",
              "mesures précontractuelles prises à ta demande (article 6.1.b du RGPD).",
            ],
            ["Conservation", "trois ans à compter du dernier échange."],
          ]}
        />
        <Treatment
          label="Mesure d'audience"
          badge={ACCENT.lilac}
          rows={[
            ["Données", "pages consultées, source d'arrivée, type d'appareil, adresse IP tronquée."],
            [
              "Finalité",
              "comprendre ce qui est lu et ce qui ne l'est pas, en statistiques agrégées.",
            ],
            [
              "Base légale",
              "ton consentement, recueilli via le bandeau cookies et modifiable à tout moment.",
            ],
            ["Conservation", "treize mois maximum."],
          ]}
        />
      </LegalSection>

      <LegalSection title="3. Qui y a accès">
        <P>
          Tes données sont accessibles à l&apos;équipe de Quantiq Studio en charge du lancement de
          Yatu, ainsi qu&apos;aux prestataires techniques strictement nécessaires, agissant comme
          sous-traitants au sens du RGPD :
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Bullet>
            Hébergement du site : <Todo>hébergeur</Todo>
          </Bullet>
          <Bullet>
            Envoi des e-mails et gestion de la liste : <Todo>routeur e-mail</Todo>
          </Bullet>
          <Bullet>
            Mesure d&apos;audience : <Todo>outil de statistiques</Todo>
          </Bullet>
        </div>
        <P>
          Aucune donnée n&apos;est vendue, louée ni transmise à des tiers à des fins publicitaires.
          Les données sont hébergées dans l&apos;Union européenne ; tout transfert hors UE serait
          encadré par les clauses contractuelles types de la Commission européenne.
        </P>
      </LegalSection>

      <LegalSection title="4. Tes droits">
        <P>
          Tu disposes d&apos;un droit d&apos;accès, de rectification, d&apos;effacement, de
          limitation, d&apos;opposition et de portabilité de tes données, ainsi que du droit de
          retirer ton consentement à tout moment. Chaque e-mail envoyé comporte un lien de
          désinscription en un clic.
        </P>
        <P>
          Pour exercer ces droits, écris à <a href="mailto:privacy@yatu.app">privacy@yatu.app</a>.
          Une réponse te sera apportée dans un délai d&apos;un mois. Si la réponse ne te convient
          pas, tu peux introduire une réclamation auprès de la CNIL, 3 place de Fontenoy, 75007
          Paris -{" "}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </P>
      </LegalSection>

      <LegalSection title="5. Sécurité et durée de vie de ce document">
        <P>
          Les accès aux données sont restreints aux personnes qui en ont besoin, les échanges sont
          chiffrés en transit et les mots de passe des outils utilisés sont protégés par une double
          authentification. Cette politique sera mise à jour à la sortie de l&apos;application,
          notamment pour couvrir les données créées à l&apos;intérieur des événements Yatu. La date
          de mise à jour figure en haut de page.
        </P>
      </LegalSection>
    </LegalPage>
  );
}
