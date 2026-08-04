import type {Metadata} from "next";
import {B, LegalPage, LegalSection, P} from "@/components/legal-page";
import {NavLink} from "@/components/nav-link";
import {LAUNCH_LABEL} from "@/lib/content";
import {MENTIONS_DECOR} from "@/lib/decor";
import {ROUTES} from "@/lib/routes";
import {
  COMPANY_ADDRESS,
  COMPANY_CAPITAL,
  COMPANY_LEGAL_FORM,
  COMPANY_RCS,
  COMPANY_SIREN,
  COMPANY_SIRET,
  COMPANY_VAT,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  HOST_ADDRESS,
  HOST_NAME,
  HOST_PHONE,
  HOST_PHONE_HREF,
  pageMetadata,
  PUBLISHER,
  PUBLISHING_DIRECTOR,
  SITE_DOMAIN,
} from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/mentions-legales",
  title: "Mentions légales - Yatu",
  description:
    "Identité de l’éditeur de Yatu, direction de la publication, hébergement, propriété intellectuelle, responsabilité et droit applicable.",
});

export default function Page() {
  return (
    <LegalPage
      badge="Informations légales"
      title="Mentions légales"
      updatedAt="1er août 2026"
      decor={MENTIONS_DECOR}
      lede={`Les présentes mentions s’appliquent au site ${SITE_DOMAIN}, édité par ${PUBLISHER}.`}
    >
      <LegalSection title="1. Éditeur du site">
        <P>
          Le site <B>{SITE_DOMAIN}</B> et le service Yatu sont édités par <B>{PUBLISHER}</B>,
          société constituée sous la forme d’une {COMPANY_LEGAL_FORM}, au capital social de{" "}
          {COMPANY_CAPITAL}, immatriculée au Registre du commerce et des sociétés de Lyon sous le
          numéro <B>{COMPANY_RCS}</B>.
        </P>
        <P>
          Siège social : {COMPANY_ADDRESS}
          <br />
          SIREN : {COMPANY_SIREN}
          <br />
          SIRET du siège : {COMPANY_SIRET}
          <br />
          TVA intracommunautaire : {COMPANY_VAT}
          <br />
          Téléphone : <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>
          <br />
          E-mail : <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </P>
      </LegalSection>

      <LegalSection title="2. Direction de la publication">
        <P>
          Le directeur de la publication est <B>{PUBLISHING_DIRECTOR}</B>, président de{" "}
          {PUBLISHER}.
        </P>
        <P>
          Toute demande relative à un contenu publié sur le site, notamment une demande de
          correction ou l’exercice d’un droit de réponse, peut être adressée à{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> ou au siège social de la société.
        </P>
      </LegalSection>

      <LegalSection title="3. Hébergement">
        <P>
          Le site est hébergé et distribué par <B>{HOST_NAME}</B>, {HOST_ADDRESS}.
          <br />
          Téléphone : <a href={`tel:${HOST_PHONE_HREF}`}>{HOST_PHONE}</a>
          <br />
          Site :{" "}
          <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">
            cloudflare.com
          </a>
        </P>
      </LegalSection>

      <LegalSection title="4. Propriété intellectuelle">
        <P>
          La marque Yatu, le nom, le logotype, l’identité visuelle, les textes, illustrations,
          photographies, vidéos, maquettes, interfaces, éléments graphiques, bases de données et
          logiciels accessibles sur ce site sont protégés par les règles relatives à la propriété
          intellectuelle. Ils appartiennent à {PUBLISHER}, à leurs auteurs respectifs ou sont
          utilisés avec leur autorisation.
        </P>
        <P>
          Toute reproduction, représentation, extraction, adaptation, traduction, diffusion ou
          exploitation, totale ou partielle, sur quelque support que ce soit, est interdite sans
          autorisation écrite préalable, sauf exception prévue par la loi. Les courtes citations
          doivent faire apparaître clairement la source et un lien vers le site.
        </P>
        <P>
          Les polices Capriola, Lato et Outfit sont utilisées dans le respect de leurs licences
          respectives. Les marques et logos de tiers, notamment ceux des réseaux sociaux, restent
          la propriété de leurs titulaires.
        </P>
      </LegalSection>

      <LegalSection title="5. Informations publiées et disponibilité">
        <P>
          Yatu est présenté avant son lancement annoncé pour le {LAUNCH_LABEL}. Les captures,
          fonctionnalités, tarifs éventuels, calendriers et conditions d’accès présentés sur le
          site peuvent évoluer avant la mise à disposition définitive de l’application.
        </P>
        <P>
          {PUBLISHER} s’efforce de fournir des informations exactes et à jour, sans garantir leur
          exhaustivité ni l’absence d’erreur. Le site peut être modifié, suspendu ou interrompu,
          notamment pour maintenance, mise à jour, incident technique ou cause indépendante de la
          volonté de l’éditeur.
        </P>
      </LegalSection>

      <LegalSection title="6. Responsabilité">
        <P>
          L’utilisation du site relève de la responsabilité de chaque visiteur. {PUBLISHER} ne
          pourra être tenue responsable d’un dommage indirect, d’une perte de données ou d’une
          incompatibilité résultant de l’utilisation du site, sous réserve des dispositions
          légales impératives applicables.
        </P>
        <P>
          Il appartient à chaque visiteur de protéger son terminal, son navigateur et ses données.
          Toute utilisation abusive, tentative d’accès non autorisé, perturbation du service ou
          extraction automatisée non autorisée est interdite.
        </P>
      </LegalSection>

      <LegalSection title="7. Liens et services tiers">
        <P>
          Le site peut contenir des liens vers Instagram, TikTok, WhatsApp ou d’autres services
          tiers. Ces services disposent de leurs propres conditions et politiques de
          confidentialité. {PUBLISHER} ne contrôle pas leur disponibilité ni leurs contenus et
          n’est pas responsable des traitements qu’ils réalisent après que le visiteur a choisi de
          les consulter.
        </P>
      </LegalSection>

      <LegalSection title="8. Données personnelles et traceurs">
        <P>
          Les traitements de données personnelles associés au site sont décrits dans la{" "}
          <NavLink href={ROUTES.confidentialite}>politique de confidentialité</NavLink>. Les
          informations stockées dans le navigateur et les préférences de traceurs sont détaillées
          sur la page <NavLink href={ROUTES.cookies}>gestion des cookies</NavLink>.
        </P>
      </LegalSection>

      <LegalSection title="9. Droit applicable">
        <P>
          Les présentes mentions légales et l’utilisation du site sont soumises au droit français.
          En cas de différend, les parties chercheront d’abord une solution amiable. À défaut, le
          litige sera porté devant la juridiction compétente selon les règles légales applicables,
          sans priver un consommateur des protections impératives dont il bénéficie.
        </P>
      </LegalSection>

      <LegalSection title="10. Contact">
        <P>
          Pour toute question concernant le site ou les présentes mentions :{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>,{" "}
          <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>, ou par courrier à {PUBLISHER},
          {" "}{COMPANY_ADDRESS}.
        </P>
      </LegalSection>
    </LegalPage>
  );
}
