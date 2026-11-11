import type {Metadata} from "next";
import {B, LegalPage, LegalSection, P} from "@/components/legal-page";
import {NavLink} from "@/components/nav-link";
import {CGU_DECOR} from "@/lib/decor";
import {ROUTES} from "@/lib/routes";
import {pageMetadata} from "@/lib/site";

const UI = "var(--font-ui), system-ui, sans-serif";

export const metadata: Metadata = pageMetadata({
  path: "/cgu",
  title: "Conditions générales d’utilisation - Yatu",
  description:
    "Les règles du jeu entre toi et Yatu : compte, règles de la communauté, contenus, budget partagé, abonnement Premium, responsabilité et résiliation.",
});

/** The consumer-code articles, reproduced word for word as L. 215-4 requires. */
const ARTICLES: {label: string; paragraphs: string[]}[] = [
  {
    label: "Article L. 215-1",
    paragraphs: [
      "Pour les contrats de prestations de services conclus pour une durée déterminée avec une clause de reconduction tacite, le professionnel prestataire de services informe le consommateur par écrit, par lettre nominative ou courrier électronique dédiés, au plus tôt trois mois et au plus tard un mois avant le terme de la période autorisant le rejet de la reconduction, de la possibilité de ne pas reconduire le contrat qu'il a conclu avec une clause de reconduction tacite. Cette information, délivrée dans des termes clairs et compréhensibles, mentionne, dans un encadré apparent, la date limite de non-reconduction.",
      "Lorsque cette information ne lui a pas été adressée conformément aux dispositions du premier alinéa, le consommateur peut mettre gratuitement un terme au contrat, à tout moment à compter de la date de reconduction.",
      "Les avances effectuées après la dernière date de reconduction ou, s'agissant des contrats à durée indéterminée, après la date de transformation du contrat initial à durée déterminée, sont dans ce cas remboursées dans un délai de trente jours à compter de la date de résiliation, déduction faite des sommes correspondant, jusqu'à celle-ci, à l'exécution du contrat.",
      "Les dispositions du présent article s'appliquent sans préjudice de celles qui soumettent légalement certains contrats à des règles particulières en ce qui concerne l'information du consommateur.",
      "Par exception au premier alinéa du présent article, pour les contrats de fourniture de service de télévision au sens de l'article 2 de la loi n° 86-1067 du 30 septembre 1986 relative à la liberté de communication et pour les contrats de fourniture de services de médias audiovisuels à la demande, le consommateur peut mettre gratuitement un terme au contrat, à tout moment à compter de la première reconduction, dès lors qu'il change de domicile ou que son foyer fiscal évolue.",
    ],
  },
  {
    label: "Article L. 215-1-1",
    paragraphs: [
      "Lorsqu'un contrat a été conclu par voie électronique ou a été conclu par un autre moyen et que le professionnel, au jour de la résiliation par le consommateur, offre au consommateur la possibilité de conclure des contrats par voie électronique, la résiliation est rendue possible selon cette modalité.",
      "A cet effet, le professionnel met à la disposition du consommateur une fonctionnalité gratuite permettant d'accomplir, par voie électronique, la notification et les démarches nécessaires à la résiliation du contrat. Lorsque le consommateur notifie la résiliation du contrat, le professionnel lui confirme la réception de la notification et l'informe, sur un support durable et dans des délais raisonnables, de la date à laquelle le contrat prend fin et des effets de la résiliation.",
      "Un décret fixe notamment les modalités techniques de nature à garantir une identification du consommateur et un accès facile, direct et permanent à la fonctionnalité mentionnée au deuxième alinéa, telles que ses modalités de présentation et d'utilisation. Il détermine les informations devant être fournies par le consommateur.",
    ],
  },
  {
    label: "Article L. 215-2",
    paragraphs: [
      "Les dispositions du présent chapitre, à l'exception de l'article L. 215-1-1, ne sont pas applicables aux exploitants des services d'eau potable et d'assainissement.",
    ],
  },
  {
    label: "Article L. 215-3",
    paragraphs: [
      "Les dispositions du présent chapitre sont également applicables aux contrats conclus entre des professionnels et des non-professionnels.",
    ],
  },
  {
    label: "Article L. 241-3",
    paragraphs: [
      "Lorsque le professionnel n'a pas procédé au remboursement dans les conditions prévues à l'article L. 215-1, les sommes dues sont productives d'intérêts au taux légal.",
    ],
  },
];

/** Reproduced statute: one muted card per article, same look as the other legal pages' sub-cards. */
function Article({label, paragraphs}: {label: string; paragraphs: string[]}) {
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
          fontFamily: UI,
          fontWeight: 700,
          fontSize: 15,
          lineHeight: 1.4,
          color: "#2A343D",
        }}
      >
        {label} du code de la consommation
      </span>
      {paragraphs.map((text) => (
        <span
          key={text}
          style={{
            fontFamily: UI,
            fontSize: 15,
            lineHeight: 1.6,
            color: "rgba(42,52,61,.8)",
            textWrap: "pretty",
          }}
        >
          {text}
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <LegalPage
      badge="Les règles du jeu"
      title="Conditions générales d’utilisation"
      updatedAt="30 septembre 2026"
      decor={CGU_DECOR}
      lede="Les règles du jeu entre toi et Yatu. En créant un compte, tu les acceptes."
    >
      <LegalSection title="1. Objet">
        <P>
          Yatu est une app d’organisation de sorties entre amis : événements, chat, budget partagé,
          souvenirs.
        </P>
      </LegalSection>

      <LegalSection title="2. Ton compte">
        <P>
          Un compte par personne, <B>15 ans minimum</B>, informations exactes. Tu es responsable de
          ton accès et de ce que tu publies.
        </P>
      </LegalSection>

      <LegalSection title="3. Règles de la communauté">
        <P>
          Interdits : harcèlement, haine, contenus sexuels non consentis, contenus impliquant des
          mineurs, contrefaçon, spam.
        </P>
        <P>
          Publier une photo d’une personne sans son accord peut engager ta responsabilité. Chacun
          peut demander à être retiré d’un média.
        </P>
      </LegalSection>

      <LegalSection title="4. Tes contenus">
        <P>
          Tu restes <B>propriétaire</B> de tout ce que tu publies. Tu accordes à Yatu une licence
          limitée, gratuite et non exclusive, strictement nécessaire pour afficher tes contenus aux
          participants concernés et créer tes souvenirs. Elle s’éteint à la suppression.
        </P>
      </LegalSection>

      <LegalSection title="5. Budget partagé">
        <P>
          Yatu calcule et suit les comptes entre amis. Yatu <B>n’encaisse aucun paiement</B> et
          n’est pas un prestataire de services de paiement : les remboursements se font directement
          entre vous.
        </P>
      </LegalSection>

      <LegalSection title="6. Premium">
        <P>
          Abonnement sans engagement, résiliable à tout moment. Droit de rétractation de 14 jours
          pour tout achat, sauf renoncement exprès à l’issue de la période d’essai.
        </P>
      </LegalSection>

      <LegalSection title="7. Reconduction : articles reproduits (art. L. 215-4)" gap={14}>
        <P>
          Les dispositions ci-dessous sont reproduites intégralement en application de l’article
          L. 215-4 du code de la consommation, dans leur version en vigueur.
        </P>
        {ARTICLES.map((article) => (
          <Article key={article.label} label={article.label} paragraphs={article.paragraphs} />
        ))}
        <P>
          <B>En pratique :</B> l’abonnement Premium se souscrit par l’App Store ou Google Play, qui
          en assurent la facturation et la reconduction. Il se résilie à tout moment depuis la
          gestion des abonnements de ton store, accessible directement depuis l’app, et reste actif
          jusqu’au terme de la période en cours.
        </P>
      </LegalSection>

      <LegalSection title="8. Responsabilité">
        <P>
          Yatu fournit un outil d’organisation. Le déroulement d’un événement, les engagements pris
          et les paiements entre participants relèvent de vous seuls.
        </P>
      </LegalSection>

      <LegalSection title="9. Suspension et résiliation">
        <P>
          Un compte qui enfreint ces règles peut être suspendu, après information sauf urgence. Tu
          peux supprimer le tien à tout moment depuis l’app.
        </P>
      </LegalSection>

      <LegalSection title="10. Droit applicable">
        <P>
          Droit français. En cas de litige, médiation possible avant toute action judiciaire (voir{" "}
          <NavLink href={ROUTES.mentionsLegales}>Mentions légales</NavLink>).
        </P>
      </LegalSection>
    </LegalPage>
  );
}
