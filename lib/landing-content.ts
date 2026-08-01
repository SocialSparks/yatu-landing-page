import { ACCENT, LAUNCH_LABEL, type ModuleKey, icon } from "@/lib/content";

/**
 * The occasion guides - one page per search intent ("organiser un EVJF",
 * "partager les dépenses entre amis"…), served from app/[slug]/page.tsx.
 *
 * These are the pages people land on from Google before they have ever heard of
 * Yatu, so each one has to be worth reading on its own: a real method, real
 * numbers, real answers. The product comes after the advice, never instead of
 * it. Nothing here may claim the app is already available - it opens on
 * 9 septembre 2026 and the call to action is the waiting list.
 *
 * Editorial rules are the ones from lib/content.ts: tutoiement, the benefit
 * before the feature, no number we cannot back.
 *
 * Adding a guide: append an entry here. The route, the sitemap, the social
 * card, the breadcrumbs, the structured data and the /organiser index all pick
 * it up with no other change.
 */

export type LandingStep = { title: string; body: string };
export type LandingPain = { tool: string; title: string; desc: string };
export type LandingFaq = { q: string; a: string };

export type LandingPage = {
  /** URL, without the leading slash. Also the waiting-list source. */
  slug: string;
  /** The pill above the title, and the badge on the social card. */
  badge: string;
  accent: string;
  /** Tool icon from public/assets/tools. */
  icon: string;
  photo: string;
  photoAlt: string;
  /** The one <h1>. Carries the phrase the page is written for. */
  h1: string;
  /** <title> and meta description - unique, and not a copy of the h1. */
  title: string;
  description: string;
  /** The paragraph under the h1. */
  lede: string;
  og: { title: string; subtitle: string };
  /** Short label used by the /organiser index and the "other guides" rail. */
  cardTitle: string;
  cardSub: string;
  /** What goes wrong without a shared space. */
  painsTitle: string;
  pains: LandingPain[];
  /** The method. Marked up as a HowTo, so each step stands on its own. */
  stepsTitle: string;
  stepsLede: string;
  steps: LandingStep[];
  /** The Yatu modules that carry this occasion, in the order they matter. */
  modulesLede: string;
  modules: ModuleKey[];
  faq: LandingFaq[];
  /** Slugs of the three guides linked at the bottom. */
  related: string[];
};

export const LANDING_PAGES: LandingPage[] = [
  {
    slug: "organiser-un-week-end-entre-amis",
    badge: "Week-end",
    accent: ACCENT.apricot,
    icon: icon("calendar"),
    photo: "/assets/usecases/usage-weekend.jpg",
    photoAlt: "Un groupe d’amis dans un chalet pendant un week-end à la campagne",
    h1: "Organiser un week-end entre amis, de la date au retour",
    title: "Organiser un week-end entre amis : la checklist - Yatu",
    description:
      "Caler la date, réserver la maison, annoncer le budget par personne, faire les courses et solder les comptes : la méthode en 6 étapes pour un week-end à plusieurs qui ne s’organise pas tout seul.",
    lede: "Une maison, huit copains, et une conversation de groupe où trois semaines passent sans qu’une date sorte. Voilà comment décider vite, annoncer un budget clair et rentrer sans avoir à relancer personne pour 40 €.",
    og: {
      title: "Organiser un week-end entre amis, sans relancer tout le monde.",
      subtitle: "La date, le logement, le budget par personne, les courses et les comptes.",
    },
    cardTitle: "Week-end entre amis",
    cardSub: "La date, la maison, les courses, les comptes.",
    painsTitle: "Ce qui bloque, à chaque fois",
    pains: [
      {
        tool: "calendar",
        title: "La date qui ne se décide jamais",
        desc: "Trois sondages, quinze réponses, personne ne tranche. Un groupe décide vite quand il n’a que deux options et une date limite pour dire non.",
      },
      {
        tool: "budget",
        title: "L’addition qui traîne un mois",
        desc: "La maison payée par un seul, les courses par un autre, l’essence par un troisième. Sans total commun, les remboursements se perdent en route.",
      },
      {
        tool: "liste",
        title: "Trois raclettes et pas de pain",
        desc: "Chacun achète ce qu’il croit manquant. Une liste partagée, cochée en direct dans le magasin, supprime les doublons et les oublis.",
      },
    ],
    stepsTitle: "La méthode en 6 étapes",
    stepsLede:
      "Elle tient en une soirée de préparation. L’ordre compte plus que le détail : ce qui coûte cher se réserve avant ce qui se discute.",
    steps: [
      {
        title: "Propose deux week-ends, pas cinq",
        body: "Plus le choix est large, plus la décision traîne. Annonce deux dates possibles et une date limite pour répondre : passé le délai, la première option gagne. Viser l’unanimité à huit coûte souvent le week-end lui-même.",
      },
      {
        title: "Réserve le logement dès que six personnes sont sûres",
        body: "Les prix montent pendant que le groupe hésite. Bloque une maison en annulation gratuite quand le noyau dur est confirmé, puis complète. C’est plus simple d’ajouter deux personnes que de retrouver un logement en juin.",
      },
      {
        title: "Annonce un budget par personne avant les invitations",
        body: "Logement, transport et courses divisés par le nombre de participants : un seul chiffre, dit tôt. Les désistements de dernière minute viennent presque toujours d’un budget découvert trop tard.",
      },
      {
        title: "Répartis les rôles, pas seulement les frais",
        body: "Un responsable courses, un responsable trajets, un responsable musique et jeux. Trois noms suffisent pour que plus rien ne reste en suspens dans la conversation.",
      },
      {
        title: "Ouvre une liste de courses que tout le monde coche",
        body: "Chacun ajoute ce qu’il veut manger, on coche au fur et à mesure dans le magasin. C’est ce qui évite les six paquets de chips et l’absence de café au réveil.",
      },
      {
        title: "Épingle les infos pratiques au même endroit",
        body: "Adresse exacte, code du portail, heure d’arrivée, numéro du propriétaire. Écrits une fois, retrouvés par tous - au lieu d’être répétés à chaque personne qui arrive.",
      },
    ],
    modulesLede:
      "Sur un week-end, quatre outils font le travail. Tu actives ceux dont tu as besoin, les autres restent fermés.",
    modules: ["chat", "budget", "liste", "infos", "img"],
    faq: [
      {
        q: "Comment choisir une date qui convient à tout le monde ?",
        a: "Propose deux week-ends, pas cinq, avec une date limite de réponse claire. Au-delà de trois options, un groupe de plus de six personnes ne converge plus : chacun attend de voir ce que disent les autres. Une date ferme posée par une seule personne, avec la possibilité de dire non, sort toujours plus vite qu’un sondage ouvert.",
      },
      {
        q: "Comment partager les frais d’un week-end entre amis ?",
        a: "Note chaque dépense au moment où elle est faite, avec le nom de celui qui a payé et le nombre de personnes concernées. Le total se solde ensuite en une fois, avec le minimum de virements, plutôt qu’en dix remboursements séparés qu’on oublie. C’est exactement ce que fait le module budget de Yatu.",
      },
      {
        q: "Combien coûte un week-end entre amis ?",
        a: "Le logement pèse en général la moitié du budget, les courses un quart, le transport le reste. Le chiffre qui compte pour ton groupe, c’est le prix par personne : annonce-le dès l’invitation, avant que quelqu’un pose la question dans la conversation.",
      },
      {
        q: "Quelle appli pour organiser un week-end entre amis ?",
        a: `La plupart des groupes cumulent une messagerie, un tableur pour les comptes et un album photo créé après coup. Yatu réunit la discussion, le budget partagé, les listes, le planning, les documents et les photos dans un même espace d’événement. L’application ouvre le ${LAUNCH_LABEL} et la liste d’attente est ouverte.`,
      },
    ],
    related: [
      "organiser-un-voyage-entre-amis",
      "organiser-un-week-end-au-ski",
      "partager-les-depenses-entre-amis",
    ],
  },

  {
    slug: "organiser-un-voyage-entre-amis",
    badge: "Voyage en groupe",
    accent: ACCENT.sky,
    icon: icon("send"),
    photo: "/assets/usecases/usage-voyage.jpg",
    photoAlt: "Un groupe d’amis en voyage, valises à la main, devant un logement de vacances",
    h1: "Organiser un voyage entre amis sans y laisser l’amitié",
    title: "Organiser un voyage entre amis : le guide complet - Yatu",
    description:
      "Budget plafond, vols, logement, papiers, programme et comptes : la méthode pour organiser un voyage en groupe à plusieurs, sans qu’une seule personne porte tout le dossier.",
    lede: "À six ou huit, un voyage se joue sur trois décisions prises tôt : combien on met, qui réserve quoi, et où on range les billets. Le reste - le programme, les photos, les comptes - suit tout seul si ces trois-là sont claires.",
    og: {
      title: "Organiser un voyage entre amis, sans porter le dossier tout seul.",
      subtitle: "Le budget, les vols, le logement, les billets et les comptes au même endroit.",
    },
    cardTitle: "Voyage entre amis",
    cardSub: "Budget, vols, logement, papiers, photos.",
    painsTitle: "Ce qui fait dérailler un voyage de groupe",
    pains: [
      {
        tool: "budget",
        title: "Les écarts de budget qu’on n’ose pas dire",
        desc: "Une personne vise l’auberge, une autre l’hôtel. Le sujet ne sort qu’au moment de payer, et quelqu’un se retire. Un plafond annoncé au départ règle la question en une phrase.",
      },
      {
        tool: "documents",
        title: "Les billets éparpillés dans huit boîtes mail",
        desc: "Le vol dans un mail, la réservation dans un PDF, l’assurance chez celui qui l’a prise. À l’aéroport, c’est celui qui a tout qui doit répondre à tous.",
      },
      {
        tool: "people",
        title: "Une seule personne qui porte tout",
        desc: "Elle avance l’argent, relance, réserve et finit par ne plus vouloir organiser. Un voyage à huit tient quand quatre personnes ont un rôle nommé.",
      },
    ],
    stepsTitle: "La méthode en 6 étapes",
    stepsLede:
      "Fixe l’argent avant la destination : c’est la seule contrainte qui ne se négocie pas une fois les billets pris.",
    steps: [
      {
        title: "Pose un budget plafond avant de parler destination",
        body: "Un montant maximum par personne, transport et logement compris, validé par tout le monde avant les recherches. Choisir la destination d’abord, c’est découvrir ensuite que deux personnes ne suivent pas.",
      },
      {
        title: "Réserve en deux temps : le transport, puis le logement",
        body: "Les vols et les trains montent avec le temps et ne se dupliquent pas ; le logement s’ajuste au nombre final. Bloque les billets dès que le groupe est confirmé, quitte à prendre l’option remboursable.",
      },
      {
        title: "Donne un sujet à chacun",
        body: "Un référent transport, un référent logement, un référent activités, un référent comptes. Chacun décide dans son périmètre et rend compte au groupe : c’est ce qui évite les quinze messages pour une réservation.",
      },
      {
        title: "Range tous les documents au même endroit",
        body: "Billets, réservations, attestation d’assurance, copie des pièces d’identité, adresse du logement. Un seul dossier partagé, accessible hors connexion si possible : c’est ce qu’on cherche en panique à l’enregistrement.",
      },
      {
        title: "Écris un programme volontairement léger",
        body: "Deux temps forts par jour maximum, le reste libre. Les voyages de groupe se cassent sur les journées minutées : personne ne veut être en retard sur le programme de quelqu’un d’autre.",
      },
      {
        title: "Tiens les comptes pendant, pas après",
        body: "Chaque dépense notée le jour même, avec qui a payé et pour qui. Au retour, le groupe solde en une fois. Reconstituer un voyage de dix jours de mémoire, personne ne le fait vraiment.",
      },
    ],
    modulesLede:
      "Un voyage mobilise presque tous les modules, du premier virement à l’album du retour.",
    modules: ["chat", "budget", "documents", "planning", "img"],
    faq: [
      {
        q: "Comment gérer les différences de budget dans un groupe d’amis ?",
        a: "En annonçant un plafond par personne avant de choisir la destination, et en le traitant comme une contrainte du groupe, pas comme la limite de quelqu’un en particulier. Le sujet devient impossible à aborder une fois que tout le monde s’est projeté sur un logement précis.",
      },
      {
        q: "Qui doit réserver quand on part à huit ?",
        a: "Une personne par sujet, pas une personne pour tout. Le référent transport réserve les billets, le référent logement bloque la maison, chacun rembourse sa part dans la foulée plutôt qu’au retour. Laisser une seule personne avancer 4 000 € est la meilleure façon de la dégoûter d’organiser le prochain.",
      },
      {
        q: "Comment répartir les dépenses d’un voyage en groupe ?",
        a: "Note chaque dépense au moment où elle tombe, en précisant pour combien de personnes elle compte : certaines concernent tout le monde, d’autres non. Le solde final se calcule ensuite en une fois. Notre guide pour partager les dépenses entre amis détaille les cas particuliers.",
      },
      {
        q: "Comment garder toutes les réservations accessibles au groupe ?",
        a: `Dans un espace commun où chacun dépose ce qu’il réserve, au lieu d’un fil de conversation où les PDF remontent. Yatu range les documents de l’événement à côté du planning et du budget, à partir du ${LAUNCH_LABEL}.`,
      },
    ],
    related: [
      "organiser-un-week-end-entre-amis",
      "partager-les-depenses-entre-amis",
      "organiser-un-week-end-au-ski",
    ],
  },

  {
    slug: "organiser-un-evjf",
    badge: "EVJF",
    accent: ACCENT.blush,
    icon: icon("heart"),
    photo: "/assets/usecases/usage-evjf.jpg",
    photoAlt: "Un groupe d’amies pendant un week-end d’enterrement de vie de jeune fille",
    h1: "Organiser un EVJF : le programme, le budget, la surprise",
    title: "Organiser un EVJF : méthode, budget et surprise - Yatu",
    description:
      "Constituer l’équipe, fixer un budget par participante, construire un programme tenable et garder la surprise : la méthode complète pour organiser un enterrement de vie de jeune fille.",
    lede: "Un EVJF se prépare à deux niveaux : le groupe qui organise, et la future mariée qui ne doit rien savoir. Tant que ces deux conversations se mélangent, la surprise fuit et le budget dérape.",
    og: {
      title: "Organiser un EVJF sans que la surprise fuite.",
      subtitle: "Le budget par participante, le programme, la cagnotte et le salon caché.",
    },
    cardTitle: "EVJF",
    cardSub: "Programme secret, budget commun, aucune fuite.",
    painsTitle: "Les trois pièges de l’EVJF",
    pains: [
      {
        tool: "heart",
        title: "La surprise qui fuit",
        desc: "Un message envoyé dans le mauvais groupe, une capture d’écran de trop. Il faut un endroit où parler du programme sans que la future mariée y ait accès.",
      },
      {
        tool: "budget",
        title: "Le budget que personne n’ose fixer",
        desc: "Les envies montent, les participantes se taisent, et deux se désistent une semaine avant. Un montant par personne annoncé dès le premier message change tout.",
      },
      {
        tool: "planning",
        title: "Le programme trop chargé",
        desc: "Trois activités par jour, aucune marge. Un EVJF réussi laisse du temps pour rien - c’est là que se passent les meilleurs moments.",
      },
    ],
    stepsTitle: "La méthode en 6 étapes",
    stepsLede:
      "Compte deux à trois mois entre la première discussion et le week-end. L’ordre ci-dessous évite les deux erreurs classiques : réserver avant de savoir qui paie, et rêver avant de compter.",
    steps: [
      {
        title: "Constitue l’équipe et un espace sans la future mariée",
        body: "Le témoin ou les témoins pilotent, avec deux ou trois personnes motivées - pas les vingt invitées. Toute l’organisation se passe dans un espace où la principale intéressée n’est pas.",
      },
      {
        title: "Cale la date avec elle, sans rien dévoiler",
        body: "Demande-lui de bloquer un week-end « pour quelque chose », en vérifiant qu’il ne tombe ni la semaine du mariage ni juste après. Deux à six semaines avant le jour J est la fenêtre confortable.",
      },
      {
        title: "Fixe un budget par participante avant de rêver",
        body: "Additionne logement, activités, repas et la part de la future mariée - qui, par convention, est prise en charge par le groupe. Divise, annonce le chiffre, et laisse à chacune la possibilité de se retirer sans se justifier.",
      },
      {
        title: "Collecte l’argent avant, pas après",
        body: "Une cagnotte ou des virements à une seule personne, avant les réservations. C’est la seule façon d’éviter que l’organisatrice avance 1 200 € et relance pendant deux mois.",
      },
      {
        title: "Construis un programme lisible et respirant",
        body: "Deux temps forts par jour, avec les heures et les adresses écrites noir sur blanc. Prévois une activité de repli s’il pleut : c’est ce qui sauve un après-midi entier.",
      },
      {
        title: "Ouvre l’album commun le jour même",
        body: "Chacune dépose ses photos au fil du week-end, plutôt que de promettre de les envoyer. Passé une semaine, la moitié ne les envoie jamais.",
      },
    ],
    modulesLede:
      "L’EVJF est l’occasion type de la discussion cachée : le groupe prépare, la future mariée ne voit rien.",
    modules: ["secret", "budget", "planning", "liste", "img"],
    faq: [
      {
        q: "Qui organise l’EVJF ?",
        a: "Traditionnellement le ou les témoins, avec deux ou trois proches en renfort. L’erreur courante est d’organiser à quinze : les décisions n’avancent plus. Un noyau de trois personnes décide, le reste du groupe est informé et paie sa part.",
      },
      {
        q: "Combien coûte un EVJF par personne ?",
        a: "Tout dépend du format - une journée sur place ou un week-end à l’étranger - mais la règle utile est ailleurs : annonce le montant total par participante, part de la mariée comprise, avant toute réservation. Un budget découvert en cours de route fait perdre des participantes.",
      },
      {
        q: "Comment garder la surprise quand la future mariée est dans le groupe ?",
        a: `Il faut un espace séparé où elle n’a pas accès - pas un deuxième groupe de discussion créé à la va-vite, où l’on finit par se tromper de fenêtre. Yatu prévoit une discussion cachée à l’intérieur de l’événement : le groupe prépare, la personne concernée ne voit rien. Disponible le ${LAUNCH_LABEL}.`,
      },
      {
        q: "Quand organiser l’EVJF par rapport au mariage ?",
        a: "Entre deux et six semaines avant, jamais le week-end qui précède. La semaine du mariage est déjà pleine, et un EVJF la veille se paie le lendemain sur les photos.",
      },
    ],
    related: ["organiser-un-evg", "organiser-un-week-end-entre-amis", "organiser-un-anniversaire"],
  },

  {
    slug: "organiser-un-evg",
    badge: "EVG",
    accent: ACCENT.meadow,
    icon: icon("bubble"),
    photo: "/assets/usecases/usage-evg.jpg",
    photoAlt: "Un groupe d’amis pendant un enterrement de vie de garçon",
    h1: "Organiser un EVG sans que ça tourne à la réunion",
    title: "Organiser un EVG : la méthode qui tient - Yatu",
    description:
      "Équipe, date, budget par personne, programme et surprise : comment organiser un enterrement de vie de garçon à dix sans passer trois mois à relancer le groupe.",
    lede: "Un EVG rate rarement sur les idées : il rate sur les relances. Dix personnes, un budget flou, un programme que trois connaissent. Voilà la version qui tient debout.",
    og: {
      title: "Organiser un EVG sans passer trois mois à relancer.",
      subtitle: "L’équipe, le budget par personne, le programme et le salon caché.",
    },
    cardTitle: "EVG",
    cardSub: "Il ne sait rien. Le groupe, si.",
    painsTitle: "Ce qui plante un EVG",
    pains: [
      {
        tool: "people",
        title: "Dix avis, aucune décision",
        desc: "Chaque idée relance le débat et rien ne se réserve. Deux personnes qui tranchent, huit qui valident : c’est le format qui avance.",
      },
      {
        tool: "budget",
        title: "Celui qui avance tout",
        desc: "Il paie l’acompte, la location, le resto, et court après l’argent pendant deux mois. La collecte se fait avant les réservations, pas après le week-end.",
      },
      {
        tool: "heart",
        title: "Le marié qui apprend tout",
        desc: "Un message mal envoyé et le programme est éventé. Il faut un endroit dédié pour préparer, où il n’a rien à voir.",
      },
    ],
    stepsTitle: "La méthode en 5 étapes",
    stepsLede:
      "Deux à trois mois suffisent, à condition de fixer l’argent et l’équipe avant de parler activités.",
    steps: [
      {
        title: "Deux organisateurs, pas dix",
        body: "Le témoin plus une personne de confiance décident et réservent. Le reste du groupe donne son avis une fois, sur des options déjà chiffrées, et confirme sa venue avec son virement.",
      },
      {
        title: "Bloque la date au moins deux mois à l’avance",
        body: "Demande au marié de garder un week-end libre, deux à six semaines avant le mariage. Plus tard, la moitié du groupe a déjà quelque chose de prévu.",
      },
      {
        title: "Annonce un prix tout compris",
        body: "Hébergement, activité, repas et la part du marié, divisés par le nombre de participants. Un seul chiffre, dit avant la première réservation, avec un délai pour se retirer sans avoir à se justifier.",
      },
      {
        title: "Réserve après avoir reçu l’argent",
        body: "Chacun vire sa part à une seule personne, puis les réservations partent. Cet ordre-là est la différence entre un EVG et deux mois de relances.",
      },
      {
        title: "Prépare le programme dans un endroit qu’il ne voit pas",
        body: "Horaires, adresses, qui apporte quoi, et le plan B s’il pleut. Le marié reçoit seulement l’heure et le point de rendez-vous - le reste se découvre.",
      },
    ],
    modulesLede: "Le groupe prépare d’un côté, le marié voit seulement ce qu’on veut bien lui montrer.",
    modules: ["secret", "budget", "planning", "chat", "img"],
    faq: [
      {
        q: "Combien de temps à l’avance organiser un EVG ?",
        a: "Deux à trois mois pour un week-end avec hébergement, un mois pour une journée sur place. La contrainte n’est pas la réservation, c’est la disponibilité de dix personnes le même samedi.",
      },
      {
        q: "Comment gérer le budget d’un EVG à dix ?",
        a: "Un prix tout compris annoncé au départ, la part du marié incluse et répartie entre les autres, et une collecte avant les réservations. Chaque dépense reste notée au même endroit pour que personne ne se demande où est passé l’argent de la cagnotte.",
      },
      {
        q: "Que faire si certains ne peuvent venir qu’une partie du week-end ?",
        a: "Prévois un tarif « journée » distinct du tarif « week-end » et annonce-le en même temps que le budget. Ce qui crée des tensions, ce n’est pas la présence partielle : c’est de découvrir à la fin que tout le monde a payé la même chose.",
      },
      {
        q: "Comment cacher le programme au futur marié ?",
        a: `Avec un espace de préparation auquel il n’a pas accès, plutôt qu’un deuxième groupe créé en parallèle - c’est là qu’arrivent les messages envoyés dans la mauvaise fenêtre. La discussion cachée de Yatu est faite pour ça, dès le ${LAUNCH_LABEL}.`,
      },
    ],
    related: ["organiser-un-evjf", "organiser-un-week-end-entre-amis", "partager-les-depenses-entre-amis"],
  },

  {
    slug: "organiser-un-anniversaire",
    badge: "Anniversaire",
    accent: ACCENT.coral,
    icon: icon("heart"),
    photo: "/assets/usecases/usage-anniv.jpg",
    photoAlt: "Un groupe d’amis fêtant un anniversaire surprise",
    h1: "Organiser un anniversaire, et garder la surprise",
    title: "Organiser un anniversaire surprise : le guide - Yatu",
    description:
      "Inviter sans fuite, monter la cagnotte du cadeau, répartir ce que chacun ramène et tenir le déroulé : la méthode pour organiser un anniversaire, surprise comprise.",
    lede: "Une surprise tient sur deux choses : un endroit où en parler sans que la personne concernée le voie, et une liste de qui ramène quoi. Le reste - le gâteau, la playlist, les photos - se règle en une soirée.",
    og: {
      title: "Organiser un anniversaire surprise sans qu’elle l’apprenne.",
      subtitle: "Les invitations, la cagnotte du cadeau, qui ramène quoi, le déroulé.",
    },
    cardTitle: "Anniversaire",
    cardSub: "La surprise, la cagnotte, qui ramène quoi.",
    painsTitle: "Là où les surprises s’écroulent",
    pains: [
      {
        tool: "heart",
        title: "Le message envoyé dans le mauvais groupe",
        desc: "La conversation de la surprise et celle du quotidien se ressemblent trop. Un espace où la personne fêtée n’est pas, c’est la seule protection qui tienne.",
      },
      {
        tool: "budget",
        title: "La cagnotte du cadeau qui s’étale",
        desc: "Quatre personnes ont versé, six ont oublié, et le cadeau se paie à trois. Un montant fixe et une date limite règlent l’essentiel.",
      },
      {
        tool: "liste",
        title: "Six paquets de chips, aucun couteau",
        desc: "Sans liste visible, chacun apporte ce à quoi il pense en dernier. Une ligne cochée par personne suffit à équilibrer la table.",
      },
    ],
    stepsTitle: "La méthode en 5 étapes",
    stepsLede: "Compte trois semaines pour une surprise avec cadeau commun, une semaine sans.",
    steps: [
      {
        title: "Cale la date et le lieu avant d’inviter",
        body: "Une surprise s’organise autour d’une contrainte : la personne doit être disponible sans savoir pourquoi. Bloque son créneau via un proche, puis fixe le lieu avant d’envoyer quoi que ce soit.",
      },
      {
        title: "Invite dans un espace qu’elle ne voit pas",
        body: "Pas un groupe créé à la hâte où l’on finit par se tromper de fenêtre : un endroit dédié à l’organisation, où elle n’est pas. Rappelle en une phrase la règle du silence, surtout aux plus bavards.",
      },
      {
        title: "Décide le cadeau commun, puis le montant",
        body: "Un cadeau choisi d’abord, un montant par personne ensuite - jamais l’inverse. Fixe une date limite de versement une semaine avant, pour avoir le temps d’acheter.",
      },
      {
        title: "Répartis ce que chacun ramène",
        body: "Une liste où chacun prend une ligne : gâteau, boissons, apéritif, glace, décoration, enceinte. Visible par tous, cochée en direct, elle évite les doublons sans qu’on ait à relancer.",
      },
      {
        title: "Écris le déroulé de l’arrivée",
        body: "Heure d’arrivée des invités, heure d’arrivée de la personne fêtée, qui l’amène et sous quel prétexte, qui coupe la musique. Cinq lignes écrites valent mieux que dix messages le jour même.",
      },
    ],
    modulesLede: "La discussion cachée est faite pour ça : préparer à l’intérieur de l’événement, sans que la personne concernée en voie la moindre trace.",
    modules: ["secret", "liste", "budget", "chat", "img"],
    faq: [
      {
        q: "Comment organiser un anniversaire surprise sans que la personne le sache ?",
        a: `En sortant l’organisation de la conversation habituelle. Le risque n’est pas la trahison, c’est le message envoyé dans la mauvaise fenêtre. Yatu propose une discussion cachée à l’intérieur de l’événement : la personne fêtée peut être dans le groupe sans jamais voir ce fil, à partir du ${LAUNCH_LABEL}.`,
      },
      {
        q: "Comment organiser une cagnotte pour un cadeau commun ?",
        a: "Choisis le cadeau avant de parler d’argent, annonce un montant par personne plutôt qu’une contribution libre, et fixe une date limite une semaine avant la fête. Les contributions libres finissent presque toujours sous le prix du cadeau.",
      },
      {
        q: "Comment répartir ce que chacun ramène ?",
        a: "Avec une liste visible où chacun s’inscrit sur une ligne, plutôt qu’en attribuant les tâches un par un en message privé. Ce qui n’est écrit nulle part se retrouve acheté en double, ou pas du tout.",
      },
      {
        q: "Combien de temps à l’avance faut-il s’y prendre ?",
        a: "Trois semaines si tu veux un cadeau commun financé par plusieurs personnes, une semaine pour une soirée simple. Le facteur limitant, c’est le temps de collecte de l’argent - pas la préparation elle-même.",
      },
    ],
    related: ["organiser-une-soiree-entre-amis", "organiser-un-evjf", "partager-les-depenses-entre-amis"],
  },

  {
    slug: "organiser-une-soiree-entre-amis",
    badge: "Soirée",
    accent: ACCENT.lilac,
    icon: icon("chat"),
    photo: "/assets/usecases/usage-soiree.jpg",
    photoAlt: "Une soirée entre amis dans un appartement",
    h1: "Organiser une soirée entre amis en une heure",
    title: "Organiser une soirée entre amis : la checklist - Yatu",
    description:
      "Savoir qui vient vraiment, répartir ce que chacun ramène, tenir les courses et solder les comptes le lendemain : la checklist d’une soirée entre amis qui s’organise en une heure.",
    lede: "Une soirée ne demande pas un plan sur trois semaines. Elle demande trois réponses : qui vient vraiment, qui ramène quoi, et qui a avancé l’argent des courses.",
    og: {
      title: "Organiser une soirée entre amis en une heure.",
      subtitle: "Qui vient vraiment, qui ramène quoi, et les comptes du lendemain.",
    },
    cardTitle: "Soirée entre amis",
    cardSub: "Qui vient, qui ramène quoi.",
    painsTitle: "Les trois inconnues d’une soirée",
    pains: [
      {
        tool: "people",
        title: "Les « je passerai peut-être »",
        desc: "Douze réponses vagues, six personnes présentes, et des courses calibrées pour vingt. Une réponse ferme demandée la veille suffit à ajuster.",
      },
      {
        tool: "liste",
        title: "Personne n’a pris de glace",
        desc: "Chacun suppose que quelqu’un d’autre y a pensé. Une liste où l’on s’inscrit ligne par ligne rend le trou visible avant la soirée, pas pendant.",
      },
      {
        tool: "budget",
        title: "Les courses avancées par un seul",
        desc: "80 € au supermarché, et une semaine de relances. Une dépense notée le soir même se rembourse le lendemain, sans avoir à réclamer.",
      },
    ],
    stepsTitle: "La checklist en 5 points",
    stepsLede: "Elle tient en une heure, la veille ou l’avant-veille.",
    steps: [
      {
        title: "Fixe l’heure et l’adresse dans le même message",
        body: "Heure de début, adresse complète, code d’entrée, étage. Ce sont exactement les quatre informations qu’on te redemandera individuellement toute la soirée.",
      },
      {
        title: "Demande une réponse ferme, pas une intention",
        body: "« Tu viens ? oui / non », avec une date limite la veille. Les réponses floues faussent les courses et le nombre de chaises, et personne ne relance à ta place.",
      },
      {
        title: "Ouvre la liste du « qui ramène quoi »",
        body: "Boissons, apéritif, dessert, glace, enceinte, jeux. Chacun prend une ligne visible par tous : c’est la seule méthode qui évite les six mêmes paquets de chips.",
      },
      {
        title: "Note les courses au moment où tu les fais",
        body: "Le ticket, le montant, et pour combien de personnes. Cinq secondes sur place valent mieux qu’un calcul de mémoire trois jours plus tard.",
      },
      {
        title: "Le lendemain : les comptes et les photos",
        body: "Solde les dépenses en une fois, et ouvre un album commun pendant que tout le monde a encore ses photos. Passé trois jours, la moitié ne les envoie jamais.",
      },
    ],
    modulesLede: "Pour une soirée, trois modules suffisent - les autres restent fermés.",
    modules: ["chat", "liste", "budget", "infos", "img"],
    faq: [
      {
        q: "Comment savoir qui vient vraiment à une soirée ?",
        a: "En demandant une réponse binaire avec une date limite, plutôt qu’en interprétant les silences. Un « peut-être » à trois jours devient un « non » dans plus de la moitié des cas : cale tes courses sur les réponses fermes, pas sur la liste d’invités.",
      },
      {
        q: "Comment répartir ce que chacun ramène ?",
        a: "Avec une liste ouverte où chacun s’inscrit lui-même, ligne par ligne. Attribuer les rôles en messages privés te transforme en standard téléphonique, et personne d’autre que toi ne sait ce qui manque encore.",
      },
      {
        q: "Comment récupérer l’argent des courses ?",
        a: "En notant la dépense le soir même avec le nombre de personnes concernées, puis en envoyant un décompte unique le lendemain. Réclamer plusieurs fois de petits montants est le meilleur moyen de ne jamais rien récupérer.",
      },
      {
        q: "Que faire des photos de la soirée ?",
        a: `Ouvre un album commun le soir même : chacun y dépose les siennes et récupère celles des autres. C’est ce que fait le module souvenirs de Yatu, dans le même espace que la soirée, dès le ${LAUNCH_LABEL}.`,
      },
    ],
    related: ["organiser-un-anniversaire", "organiser-un-week-end-entre-amis", "partager-les-depenses-entre-amis"],
  },

  {
    slug: "organiser-un-week-end-au-ski",
    badge: "Ski",
    accent: ACCENT.sky,
    icon: icon("calendar"),
    photo: "/assets/usecases/usage-ski.jpg",
    photoAlt: "Un groupe d’amis en week-end au ski devant un chalet enneigé",
    h1: "Organiser un week-end au ski à plusieurs",
    title: "Organiser un week-end au ski entre amis - Yatu",
    description:
      "Réservation, chambres, forfaits, location de matériel, budget et niveaux différents : la méthode pour organiser un week-end au ski à huit sans laisser une seule personne tout avancer.",
    lede: "Le ski est l’occasion où tout se paie d’avance : logement, forfaits, matériel. C’est aussi celle où les comptes se perdent le plus vite, parce que quatre personnes ont avancé quatre choses différentes.",
    og: {
      title: "Organiser un week-end au ski à huit, comptes compris.",
      subtitle: "Chalet, chambres, forfaits, matériel et un budget annoncé d’avance.",
    },
    cardTitle: "Week-end au ski",
    cardSub: "Chalet, forfaits, chambres, matériel.",
    painsTitle: "Ce qui coince en montagne",
    pains: [
      {
        tool: "budget",
        title: "Quatre personnes qui avancent quatre choses",
        desc: "Le chalet, les forfaits, la location, les courses. Sans total commun, plus personne ne sait qui doit combien à qui au retour.",
      },
      {
        tool: "people",
        title: "La répartition des chambres",
        desc: "Le sujet que personne n’ose ouvrir et qui s’impose à l’arrivée, à 23 h, valises à la main. Il se règle en trois minutes s’il est posé avant.",
      },
      {
        tool: "planning",
        title: "Des niveaux très différents",
        desc: "Deux qui font du hors-piste, deux qui débutent. Sans point de rendez-vous fixé le matin, le groupe se croise sans jamais se retrouver.",
      },
    ],
    stepsTitle: "La méthode en 6 étapes",
    stepsLede:
      "Réserve tôt : en montagne, le prix ne bouge pas beaucoup, mais la disponibilité disparaît d’un coup.",
    steps: [
      {
        title: "Réserve le logement trois à six mois avant",
        body: "Les chalets et appartements de station partent bien avant les billets de train. Confirme dès que le noyau dur est sûr, avec le nombre de couchages réel plutôt qu’optimiste.",
      },
      {
        title: "Chiffre le budget complet dès l’invitation",
        body: "Logement, forfaits, location de matériel, transport, courses. Le ski est l’occasion où le budget double si on ne compte que le logement : annonce le total par personne au départ.",
      },
      {
        title: "Pose la répartition des chambres à l’avance",
        body: "Écris qui dort où avant de partir, avec les lits doubles et les canapés annoncés tels quels. Ce qui se discute à froid, à distance, ne se dispute pas à l’arrivée.",
      },
      {
        title: "Groupe les forfaits et la location de matériel",
        body: "Les tarifs de groupe existent presque partout, et une seule réservation évite huit files d’attente le samedi matin. Note les pointures et les tailles une bonne fois pour toutes.",
      },
      {
        title: "Fixe un point de rendez-vous quotidien",
        body: "Une heure et un endroit pour déjeuner, un pour la fin de journée. Chacun skie à son niveau le reste du temps, sans avoir à écrire à tout le monde.",
      },
      {
        title: "Range les attestations et contrats au même endroit",
        body: "Assurance, contrat de location, bon de forfait, adresse du chalet. Ce sont les documents qu’on cherche à l’arrivée, avec du réseau qui ne suit pas toujours.",
      },
    ],
    modulesLede: "Le ski mobilise le budget, les listes et les documents plus que n’importe quelle autre occasion.",
    modules: ["budget", "liste", "documents", "infos", "img"],
    faq: [
      {
        q: "Combien coûte un week-end au ski entre amis ?",
        a: "Compte le logement, le forfait, la location de matériel, le transport et les courses : le forfait et la location font souvent doubler un budget qu’on avait estimé sur le seul logement. Le chiffre à annoncer au groupe est le total par personne, pas le prix du chalet divisé par huit.",
      },
      {
        q: "Comment répartir les chambres sans vexer personne ?",
        a: "En posant la question par écrit avant le départ, avec le nombre exact de lits et leur type. Le problème n’est pas la répartition elle-même : c’est de la découvrir à l’arrivée, quand il ne reste plus qu’une option.",
      },
      {
        q: "Quand réserver un chalet pour un week-end au ski ?",
        a: "Trois à six mois avant pour les vacances scolaires, deux mois pour un week-end hors vacances. La disponibilité disparaît plus vite que le prix ne monte.",
      },
      {
        q: "Comment gérer des niveaux de ski différents ?",
        a: "En fixant deux points de rendez-vous par jour et en laissant le reste libre. Vouloir skier groupés toute la journée avec des niveaux écartés finit toujours en attente au bas d’un télésiège.",
      },
    ],
    related: [
      "organiser-un-week-end-entre-amis",
      "partager-les-depenses-entre-amis",
      "organiser-un-voyage-entre-amis",
    ],
  },

  {
    slug: "partager-les-depenses-entre-amis",
    badge: "Budget partagé",
    accent: ACCENT.sunbeam,
    icon: icon("budget"),
    photo: "/assets/usecases/usage-coloc.jpg",
    photoAlt: "Des amis en colocation faisant les comptes de leurs dépenses communes",
    h1: "Partager les dépenses entre amis, sans tableur",
    title: "Partager les dépenses entre amis : la méthode - Yatu",
    description:
      "Noter les dépenses, gérer les avances, répartir autrement qu’en parts égales et solder en un minimum de virements : la méthode pour partager les frais d’un groupe sans y passer la soirée.",
    lede: "Le problème n’est presque jamais le calcul : c’est la mémoire. Une dépense notée trois jours plus tard est une dépense à moitié fausse, et un groupe qui reconstitue un week-end de tête finit toujours par arrondir en sa défaveur.",
    og: {
      title: "Partager les dépenses entre amis, sans tableur.",
      subtitle: "Noter au moment, dire pour qui, solder en une fois.",
    },
    cardTitle: "Partager les dépenses",
    cardSub: "Qui a payé, pour qui, et qui rembourse.",
    painsTitle: "Pourquoi les comptes de groupe dérapent",
    pains: [
      {
        tool: "budget",
        title: "Les dépenses notées après coup",
        desc: "Trois jours plus tard, il manque un ticket, un montant et deux courses. C’est là que le total commence à ne plus correspondre à ce que les gens ont vécu.",
      },
      {
        tool: "people",
        title: "Les parts qui ne sont pas égales",
        desc: "Deux personnes ne boivent pas, trois arrivent le samedi, une conduit. Diviser tout par le nombre de présents crée un ressentiment que personne n’exprime.",
      },
      {
        tool: "chat",
        title: "Les remboursements réclamés un par un",
        desc: "Six relances pour 15 €, et quelqu’un finit par laisser tomber. Un décompte unique, envoyé une fois, se règle presque toujours du premier coup.",
      },
    ],
    stepsTitle: "La méthode en 5 points",
    stepsLede: "Elle marche pour un week-end comme pour une colocation. Le principe est le même : écrire pendant, calculer après.",
    steps: [
      {
        title: "Note la dépense au moment où tu paies",
        body: "Le montant, ce que c’est, et qui a payé. Dix secondes en caisse, contre une demi-heure de reconstitution au retour - et un total dont personne ne discute.",
      },
      {
        title: "Précise toujours pour qui la dépense compte",
        body: "Certaines concernent le groupe entier, d’autres cinq personnes sur huit. C’est cette information-là, et pas le calcul, qui manque dans la plupart des tableurs partagés.",
      },
      {
        title: "Distingue l’avance de la part",
        body: "Celui qui a réservé le logement a avancé 900 € mais n’en doit que 112. Tant que les deux chiffres sont confondus, le groupe croit qu’il « a payé plus » et les comptes se crispent.",
      },
      {
        title: "Traite les cas particuliers tout de suite",
        body: "L’essence de celui qui conduit, la personne qui arrive le deuxième jour, celle qui ne boit pas. Une ligne écrite sur le moment vaut mieux qu’un arbitrage à froid, une semaine après.",
      },
      {
        title: "Solde en une fois, avec le minimum de virements",
        body: "Ne fais pas rembourser chacun par chacun : compense d’abord les dettes croisées, puis envoie un seul décompte. Un groupe de huit se solde en général en trois ou quatre virements.",
      },
    ],
    modulesLede:
      "Chez Yatu, le budget n’est pas une application à part : il vit dans l’événement, à côté de la discussion et des listes qui l’ont produit.",
    modules: ["budget", "chat", "liste", "documents"],
    faq: [
      {
        q: "Comment calculer qui doit combien dans un groupe ?",
        a: "Additionne ce que chacun a payé, additionne ce que chacun doit selon les dépenses qui le concernent, et fais la différence. Le solde positif encaisse, le solde négatif rembourse. Le calcul est simple : ce qui manque presque toujours, c’est la liste complète des dépenses et de leurs bénéficiaires.",
      },
      {
        q: "Faut-il tout diviser en parts égales ?",
        a: "Non, et le faire par défaut est la première source de tension. Une dépense se répartit entre les personnes qu’elle concerne : le logement entre ceux qui dorment sur place, le restaurant entre ceux qui y étaient. Le reste peut rester en parts égales sans que personne n’y trouve à redire.",
      },
      {
        q: "Comment gérer celui qui ne rembourse jamais ?",
        a: "Envoie un décompte unique et écrit, avec le détail des dépenses qui le concernent, plutôt que des rappels successifs. La plupart des retards viennent d’un montant flou, pas d’une mauvaise volonté - et un décompte détaillé enlève tout prétexte.",
      },
      {
        q: "Quelle application pour partager les dépenses d’un groupe ?",
        a: `Les applications de comptes partagés font bien le calcul, mais elles vivent à côté de la conversation et des listes qui ont produit la dépense. Yatu met le budget dans l’événement lui-même : la discussion, les listes, les documents et les comptes au même endroit, à partir du ${LAUNCH_LABEL}.`,
      },
    ],
    related: [
      "organiser-un-week-end-entre-amis",
      "organiser-un-voyage-entre-amis",
      "organiser-une-soiree-entre-amis",
    ],
  },
];

/** The /organiser index - the hub every guide links back to. */
export const LANDING_INDEX_PATH = "/organiser";

export const landingBySlug = (slug: string) =>
  LANDING_PAGES.find((page) => page.slug === slug) ?? null;

/** Site-relative path of a guide. */
export const landingPath = (slug: string) => `/${slug}`;
