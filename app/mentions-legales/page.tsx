import type { Metadata } from "next";
import { B, LegalPage, LegalSection, P, Todo } from "@/components/legal-page";
import { NavLink } from "@/components/nav-link";
import { LAUNCH_LABEL } from "@/lib/content";
import { MENTIONS_DECOR } from "@/lib/decor";
import { ROUTES } from "@/lib/routes";
import { CONTACT_EMAIL, PUBLISHER, pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales — Yatu",
  description:
    "Éditeur, directeur de la publication, hébergement, propriété intellectuelle et droit applicable du site Yatu.",
});

/** Implemented from "Mentions legales.dc.html". */
export default function Page() {
  return (
    <LegalPage
      badge="Informations légales"
      title="Mentions légales"
      updatedAt="31 juillet 2026"
      decor={MENTIONS_DECOR}
      warning={
        <>
          <B>À compléter avant mise en ligne.</B> Les champs surlignés attendent les informations
          réelles de {PUBLISHER} (immatriculation, adresse, hébergeur, directeur de publication).
        </>
      }
    >
      <LegalSection title="1. Éditeur du site">
        <P>
          Le présent site est édité par <B>{PUBLISHER}</B>, <Todo>forme juridique</Todo>, au
          capital social de <Todo>montant</Todo>, immatriculée au registre du commerce et des
          sociétés de <Todo>ville</Todo> sous le numéro <Todo>SIREN</Todo>.
        </P>
        <P>
          Siège social : <Todo>adresse postale complète</Todo>
          <br />
          Numéro de TVA intracommunautaire : <Todo>FR…</Todo>
          <br />
          Adresse électronique : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </P>
      </LegalSection>

      <LegalSection title="2. Directeur de la publication">
        <P>
          <Todo>Prénom Nom</Todo>, en qualité de représentant légal de {PUBLISHER}.
        </P>
      </LegalSection>

      <LegalSection title="3. Hébergement">
        <P>
          Le site est hébergé par <Todo>nom de l’hébergeur</Todo>, <Todo>adresse</Todo>,
          joignable au <Todo>téléphone</Todo>.
        </P>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <P>
          La marque Yatu, le logotype, l’identité visuelle, les textes, les illustrations, les
          interfaces et l’ensemble des éléments composant ce site sont la propriété exclusive
          de {PUBLISHER} ou font l’objet d’une autorisation d’usage. Toute
          reproduction, représentation, adaptation ou exploitation, totale ou partielle, sans
          autorisation écrite préalable, est interdite.
        </P>
        <P>
          Les polices de caractères utilisées sont diffusées sous licence libre (Capriola et Lato,
          SIL Open Font License). Les photographies présentées sont{" "}
          <Todo>crédit et licence à préciser</Todo>.
        </P>
      </LegalSection>

      <LegalSection title="5. Responsabilité">
        <P>
          Ce site présente une application en cours de développement. Les fonctionnalités, dates et
          conditions annoncées sont susceptibles d’évoluer jusqu’à la sortie prévue le{" "}
          {LAUNCH_LABEL}. {PUBLISHER} met tout en œuvre pour diffuser des informations exactes et à
          jour, sans pouvoir garantir l’absence d’erreur ni la disponibilité permanente du
          site.
        </P>
        <P>
          Les liens vers des sites tiers sont fournis à titre indicatif ; leur contenu n’engage
          pas {PUBLISHER}.
        </P>
      </LegalSection>

      <LegalSection title="6. Données personnelles et cookies">
        <P>
          Le traitement des données collectées via la liste d’attente et le formulaire BDE est
          décrit dans la{" "}
          <NavLink href={ROUTES.confidentialite}>politique de confidentialité</NavLink>. Les
          traceurs déposés sur ce site et la façon de modifier ton consentement sont détaillés dans
          la page <NavLink href={ROUTES.cookies}>gestion des cookies</NavLink>.
        </P>
      </LegalSection>

      <LegalSection title="7. Droit applicable">
        <P>
          Les présentes mentions légales sont soumises au droit français. En cas de litige et à
          défaut de résolution amiable, compétence est attribuée aux tribunaux français compétents.
        </P>
      </LegalSection>
    </LegalPage>
  );
}
