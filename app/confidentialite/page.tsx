import type {Metadata} from "next";
import {B, Bullet, LegalPage, LegalSection, P} from "@/components/legal-page";
import {NavLink} from "@/components/nav-link";
import {ACCENT} from "@/lib/content";
import {CONFIDENTIALITE_DECOR} from "@/lib/decor";
import {ROUTES} from "@/lib/routes";
import {
  COMPANY_ADDRESS,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  HOST_NAME,
  pageMetadata,
  PRIVACY_EMAIL,
  PUBLISHER,
  SITE_DOMAIN,
} from "@/lib/site";

const UI = "var(--font-ui), system-ui, sans-serif";

export const metadata: Metadata = pageMetadata({
  path: "/confidentialite",
  title: "Politique de confidentialité - Yatu",
  description:
    "Les données traitées sur le site Yatu, leurs finalités, bases légales, durées de conservation, destinataires et les moyens d’exercer ses droits.",
});

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
          style={{ fontFamily: UI, fontSize: 16, lineHeight: 1.6, color: "rgba(42,52,61,.8)" }}
        >
          <B>{term} :</B> {text}
        </span>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <LegalPage
      badge="Tes données"
      title="Politique de confidentialité"
      updatedAt="1er août 2026"
      decor={CONFIDENTIALITE_DECOR}
      lede={`Cette politique explique comment ${PUBLISHER} traite les données liées au site ${SITE_DOMAIN}. Elle concerne le site de pré-lancement, pas encore les données qui seront créées dans l’application Yatu.`}
    >
      <LegalSection title="1. Responsable du traitement">
        <P>
          Le responsable des traitements décrits ici est <B>{PUBLISHER}</B>, {COMPANY_ADDRESS}.
        </P>
        <P>
          Contact relatif à la vie privée :{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> ou{" "}
          <a href={`tel:${CONTACT_PHONE_HREF}`}>{CONTACT_PHONE}</a>. Aucun délégué à la protection
          des données n’a été désigné ; ces coordonnées permettent de joindre directement le
          responsable du traitement.
        </P>
      </LegalSection>

      <LegalSection title="2. Origine des données">
        <P>Les données traitées proviennent :</P>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Bullet>
            directement de toi lorsque tu saisis une adresse e-mail, réponds aux questions
            facultatives, remplis le formulaire BDE ou écris au support ;
          </Bullet>
          <Bullet>
            de ton navigateur lorsque le site enregistre localement tes réponses ou tes
            préférences de consentement ;
          </Bullet>
          <Bullet>
            automatiquement de la connexion au site, lorsque {HOST_NAME} traite les requêtes
            nécessaires à l’affichage, à la sécurité et à la distribution des pages.
          </Bullet>
          <Bullet>
            de ta navigation et de tes interactions avec les pages lorsque tu acceptes la mesure
            d’audience.
          </Bullet>
        </div>
        <P>
          {PUBLISHER} n’achète pas de fichiers de prospection et n’enrichit pas les informations
          fournies avec des données provenant de courtiers en données.
        </P>
      </LegalSection>

      <LegalSection title="3. Données traitées, finalités et durées" gap={18}>
        <Treatment
          label="Consultation et sécurité du site"
          badge={ACCENT.sky}
          rows={[
            [
              "Données",
              "adresse IP, date et heure, URL demandée et ses paramètres, en-têtes de requête, navigateur, appareil et événements de sécurité.",
            ],
            [
              "Finalités",
              "afficher le site, répartir le trafic, prévenir les abus, diagnostiquer les erreurs et assurer la sécurité.",
            ],
            [
              "Base légale",
              "intérêt légitime de QUANTIQ STUDIO à fournir un site disponible et sécurisé (article 6.1.f du RGPD).",
            ],
            [
              "Conservation",
              "les données de requête sont traitées pendant la durée nécessaire à la fourniture et à la sécurisation du service ; les éventuels journaux accessibles à QUANTIQ STUDIO ne sont pas conservés au-delà de 30 jours, sauf incident de sécurité ou obligation légale.",
            ],
          ]}
        />

        <Treatment
          label="Liste d’attente et page de bienvenue"
          badge={ACCENT.sunbeam}
          rows={[
            [
              "Données",
              "adresse e-mail, page d’origine, date d’inscription et, si tu réponds aux questions facultatives, types d’événements, taille du groupe et appartenance éventuelle à une association. S’y ajoutent ton navigateur et une empreinte non réversible de ton adresse IP, conservées avec la soumission pour limiter les envois automatisés ; l’adresse elle-même n’est jamais enregistrée.",
            ],
            [
              "Finalités",
              "confirmer ton parcours de préinscription, préparer l’annonce du lancement et mieux comprendre les usages attendus.",
            ],
            [
              "Base légale",
              "consentement (article 6.1.a du RGPD), retirable à tout moment.",
            ],
            [
              "Fonctionnement actuel",
              "ta soumission est enregistrée par Cloudflare, hébergeur du site, dans une base qui sert de tampon d’envoi, puis transmise à une feuille de calcul Google Sheets détenue par QUANTIQ STUDIO. Ce tampon existe pour qu’une inscription ne soit pas perdue si la transmission échoue. L’adresse e-mail passe à la page de confirmation par le stockage de session du navigateur et n’est pas ajoutée à son URL.",
            ],
            [
              "Conservation",
              "au plus tard trois mois après le lancement, ou plus tôt en cas de retrait du consentement. La copie technique gardée dans le tampon d’envoi est supprimée 90 jours après sa transmission.",
            ],
          ]}
        />

        <Treatment
          label="Demande BDE ou association"
          badge={ACCENT.meadow}
          rows={[
            [
              "Données",
              "nom, association, école ou campus, adresse e-mail, type et taille d’événement, message libre et date de saisie. S’y ajoutent ton navigateur et une empreinte non réversible de ton adresse IP, conservées avec la demande pour limiter les envois automatisés ; l’adresse elle-même n’est jamais enregistrée.",
            ],
            [
              "Finalités",
              "préparer une prise de contact, une démonstration et l’étude d’une participation au programme pilote.",
            ],
            [
              "Base légale",
              "mesures précontractuelles prises à ta demande (article 6.1.b du RGPD).",
            ],
            [
              "Fonctionnement actuel",
              "ta demande est enregistrée par Cloudflare, hébergeur du site, dans une base qui sert de tampon d’envoi, puis transmise à une feuille de calcul Google Sheets détenue par QUANTIQ STUDIO. Pour une demande immédiate, écris à support@yatu-app.com.",
            ],
            [
              "Conservation",
              "trois ans à compter du dernier contact, puis archivage intermédiaire si nécessaire à la défense de droits en justice. La copie technique gardée dans le tampon d’envoi est supprimée 90 jours après sa transmission.",
            ],
          ]}
        />

        <Treatment
          label="Support et échanges directs"
          badge={ACCENT.lilac}
          rows={[
            [
              "Données",
              "adresse e-mail, identité éventuellement communiquée, contenu du message, pièces jointes et historique des échanges.",
            ],
            [
              "Finalités",
              "répondre aux demandes, assurer le suivi et traiter les demandes d’exercice de droits.",
            ],
            [
              "Base légale",
              "intérêt légitime à répondre aux sollicitations ou mesures précontractuelles selon l’objet de la demande.",
            ],
            [
              "Conservation",
              "trois ans après le dernier échange ; jusqu’à cinq ans en archivage intermédiaire lorsqu’un échange est nécessaire à la constatation, l’exercice ou la défense d’un droit en justice.",
            ],
          ]}
        />

        <Treatment
          label="Préférences de traceurs"
          badge={ACCENT.blush}
          rows={[
            [
              "Données",
              "choix d’acceptation ou de refus par catégorie et date du choix, enregistrés dans le stockage local du navigateur.",
            ],
            [
              "Finalité",
              "mémoriser ton choix et permettre sa modification.",
            ],
            [
              "Base légale",
              "respect des obligations relatives aux traceurs et intérêt légitime à conserver la preuve du choix exprimé.",
            ],
            ["Conservation", "six mois, puis le choix est demandé à nouveau."],
          ]}
        />

        <Treatment
          label="Mesure d’audience et amélioration du parcours"
          badge={ACCENT.lilac}
          rows={[
            [
              "Données",
              "pages consultées, date et durée de visite, provenance, navigateur, appareil, zone géographique approximative, identifiants pseudonymes et interactions telles que clics, défilements et mouvements. Les paramètres des URL ne sont pas ajoutés aux événements de page envoyés par Yatu à Google Analytics.",
            ],
            [
              "Finalités",
              "mesurer la fréquentation, comprendre les parcours, repérer les difficultés d’utilisation et améliorer les pages grâce à Google Analytics 4 et Microsoft Clarity.",
            ],
            [
              "Base légale",
              "consentement (article 6.1.a du RGPD), retirable à tout moment depuis la gestion des cookies.",
            ],
            [
              "Conservation",
              "les cookies Google Analytics ont une durée maximale par défaut de deux ans. Clarity conserve les reconstitutions de sessions 30 jours et les données agrégées, cartes de chaleur ou sessions sélectionnées jusqu’à neuf mois. Le retrait du consentement bloque les nouvelles mesures et supprime les cookies accessibles sur le domaine.",
            ],
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Mesure d’audience et réseaux sociaux">
        <P>
          Google Analytics 4 et Microsoft Clarity sont bloqués par défaut et ne sont chargés que si
          tu acceptes la catégorie « Mesure d’audience ». Les fonctions publicitaires et la
          personnalisation publicitaire de Google sont désactivées. Pour Clarity, le stockage
          publicitaire reste refusé ; les champs sensibles des formulaires sont masqués par défaut.
          Tu peux retirer ton accord à tout moment depuis le pied de page.
        </P>
        <P>
          Google Search Console sert uniquement à vérifier la propriété du site et à consulter des
          statistiques agrégées de présence dans les résultats de recherche. Sa balise de
          vérification ne dépose aucun cookie et n’enregistre pas ta navigation sur le site.
        </P>
        <P>
          Les liens Instagram, TikTok et WhatsApp sont de simples liens externes. Le site
          n’intègre actuellement aucune publication de ces plateformes. Si tu cliques sur un lien,
          la plateforme concernée traite ensuite tes données selon sa propre politique.
        </P>
      </LegalSection>

      <LegalSection title="5. Destinataires et sous-traitants">
        <P>
          Lorsque des données sont effectivement reçues par {PUBLISHER}, elles sont accessibles
          uniquement aux personnes habilitées qui en ont besoin pour répondre à la finalité
          concernée. Elles peuvent également être communiquées :
        </P>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <Bullet>
            à <B>{HOST_NAME}</B>, sous-traitant chargé de l’hébergement, de la distribution et de
            la sécurité du site, et qui héberge également le tampon dans lequel les formulaires
            sont enregistrés avant leur transmission ;
          </Bullet>
          <Bullet>
            à <B>Google</B>, sous-traitant chargé du stockage des formulaires reçus dans une
            feuille de calcul Google Sheets détenue par {PUBLISHER} ;
          </Bullet>
          <Bullet>
            à Google pour Google Analytics 4 et à Microsoft pour Clarity, uniquement après ton
            consentement à la mesure d’audience ;
          </Bullet>
          <Bullet>
            aux conseils professionnels, autorités administratives ou judiciaires lorsque la loi
            l’exige ou pour protéger les droits de {PUBLISHER} ;
          </Bullet>
          <Bullet>
            à un futur prestataire de routage e-mail ou de formulaire uniquement après mise à jour
            de cette politique et encadrement contractuel conforme au RGPD.
          </Bullet>
        </div>
        <P>
          Aucune donnée n’est vendue, louée ou communiquée à des tiers pour leur prospection
          commerciale ou de la publicité ciblée.
        </P>
      </LegalSection>

      <LegalSection title="6. Transferts hors de l’Espace économique européen">
        <P>
          {HOST_NAME} est une société américaine exploitant un réseau mondial. Des données
          techniques peuvent donc être traitées depuis les États-Unis ou d’autres pays. Cloudflare
          indique encadrer les transferts vers les États-Unis par le cadre de protection des
          données UE–États-Unis et, lorsque nécessaire, par les clauses contractuelles types de la
          Commission européenne et des garanties supplémentaires.
        </P>
        <P>
          Les formulaires reçus sont stockés dans une feuille de calcul Google Sheets : Google est
          une société américaine et ce traitement, indépendant de la mesure d’audience, peut donc
          lui aussi impliquer un transfert hors de l’Espace économique européen, encadré par les
          mécanismes indiqués ci-dessous.
        </P>
        <P>
          Lorsque tu acceptes la mesure d’audience, Google et Microsoft peuvent également traiter
          certaines données depuis des pays situés hors de l’Espace économique européen, notamment
          les États-Unis. Ces prestataires indiquent encadrer ces transferts au moyen des mécanismes
          reconnus applicables, notamment le cadre de protection des données UE–États-Unis et les
          clauses contractuelles types lorsque nécessaire.
        </P>
        <P>
          Les garanties contractuelles sont consultables dans le{" "}
          <a
            href="https://www.cloudflare.com/cloudflare-customer-dpa/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Data Processing Addendum de Cloudflare
          </a>
          . Une copie des garanties applicables peut aussi être demandée à{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a>.
        </P>
      </LegalSection>

      <LegalSection title="7. Caractère obligatoire des données">
        <P>
          Les données techniques de connexion sont nécessaires pour afficher et sécuriser le site.
          L’adresse e-mail est nécessaire si tu souhaites utiliser le parcours de liste d’attente.
          Les questions de qualification sont facultatives. Les champs marqués comme obligatoires
          dans le formulaire BDE sont nécessaires pour préparer une prise de contact ; tu peux
          toutefois contacter directement le support sans remplir ce formulaire.
        </P>
        <P>
          Le site ne prend aucune décision produisant un effet juridique sur la base d’un
          traitement automatisé et ne réalise aucun profilage publicitaire.
        </P>
      </LegalSection>

      <LegalSection title="8. Tes droits">
        <P>
          Selon le traitement concerné, tu peux demander l’accès à tes données, leur rectification,
          leur effacement, la limitation de leur traitement et leur portabilité. Tu peux t’opposer
          aux traitements fondés sur l’intérêt légitime et retirer à tout moment un consentement,
          sans remettre en cause les traitements déjà réalisés avant ce retrait.
        </P>
        <P>
          Tu peux également définir des directives relatives au sort de tes données après ton décès
          dans les conditions prévues par la loi française.
        </P>
        <P>
          Pour exercer un droit, écris à{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> ou à {PUBLISHER},
          {" "}{COMPANY_ADDRESS}. Précise le droit exercé et les informations permettant de retrouver
          les données concernées. Un justificatif d’identité ne sera demandé qu’en cas de doute
          raisonnable sur ton identité.
        </P>
        <P>
          Une réponse sera apportée dans un délai d’un mois, pouvant être prolongé de deux mois si
          la demande est complexe ou nombreuse, avec information préalable. Si tu estimes que tes
          droits ne sont pas respectés, tu peux déposer une réclamation auprès de la CNIL : 3 place
          de Fontenoy, TSA 80715, 75334 Paris Cedex 07 -{" "}
          <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">
            cnil.fr/fr/plaintes
          </a>
          .
        </P>
      </LegalSection>

      <LegalSection title="9. Sécurité">
        <P>
          {PUBLISHER} applique des mesures adaptées au risque : accès limités aux personnes
          autorisées, chiffrement HTTPS, mises à jour, sauvegardes lorsque nécessaires et
          authentification renforcée des outils d’administration. Aucun système n’étant totalement
          infaillible, un incident susceptible d’engendrer un risque pour les personnes sera traité
          conformément aux obligations de notification applicables.
        </P>
        <P>
          Les données enregistrées uniquement dans ton navigateur restent sous le contrôle de ton
          terminal. Tu peux les effacer depuis les réglages du navigateur. Évite de partager une URL
          de confirmation contenant ton adresse e-mail et protège l’accès à ton appareil.
        </P>
      </LegalSection>

      <LegalSection title="10. Mineurs">
        <P>
          Le site ne cherche pas à collecter sciemment les données d’enfants. Une personne mineure
          doit demander l’accord de son représentant légal lorsque cet accord est requis. Si tu
          penses qu’un mineur a transmis des données de manière inappropriée, contacte{" "}
          <a href={`mailto:${PRIVACY_EMAIL}`}>{PRIVACY_EMAIL}</a> afin qu’elles soient supprimées.
        </P>
      </LegalSection>

      <LegalSection title="11. Évolution de la politique">
        <P>
          Cette politique peut évoluer pour refléter une modification du site, l’activation d’un
          prestataire ou une évolution juridique. La date affichée en haut de page indique la
          dernière mise à jour. Une nouvelle politique couvrira les comptes et contenus créés dans
          l’application Yatu avant son ouverture au public.
        </P>
        <P>
          Pour les informations relatives au stockage local et aux traceurs, consulte la page{" "}
          <NavLink href={ROUTES.cookies}>gestion des cookies</NavLink>. Les informations sur
          l’éditeur figurent dans les{" "}
          <NavLink href={ROUTES.mentionsLegales}>mentions légales</NavLink>.
        </P>
      </LegalSection>
    </LegalPage>
  );
}
