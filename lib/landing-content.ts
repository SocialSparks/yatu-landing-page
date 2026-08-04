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
/** One row of the countdown: how long before, and what is settled by then. */
export type LandingMilestone = { when: string; what: string };
export type LandingMistake = { title: string; desc: string };
export type LandingPain = { tool: string; title: string; desc: string };
export type LandingFaq = { q: string; a: string };

/** One format of an occasion, and what it costs a participant. */
export type LandingCost = { format: string; range: string; detail: string };

/** One line of the worked settlement: what was paid, by whom, and for whom. */
export type LandingLedgerRow = { label: string; amount: string; who: string; forWhom: string };
export type LandingBalance = { who: string; paid: string; owed: string; net: string };

/** One row of the "what you do today / what the app does" table. */
export type LandingCompareRow = { need: string; before: string; after: string };

/** A product screenshot shown on an "app" page. */
export type LandingScreen = { src: string; alt: string; label: string; caption: string };

/**
 * The page on the other side of the pair: a guide points at its app page, an
 * app page at its guide. The anchor says what is on the other end - "la méthode
 * complète", "l'application qui porte ça" - because "en savoir plus" tells
 * neither a reader nor a crawler which of the two answers which question.
 */
export type LandingCounterpart = {
  slug: string;
  kicker: string;
  label: string;
  body: string;
};

export type LandingPage = {
  /**
   * "guide" - the method for an occasion, written for someone who has never
   * heard of Yatu; listed on /organiser and marked up as an Article.
   * "app" - the product answer to an applicative query ("application pour
   * partager les dépenses"); it says what Yatu does, not how to organise.
   *
   * They must never say the same thing: each guide links to its app page and
   * back, and neither repeats the other's paragraphs.
   */
  kind: "guide" | "app";
  /** URL, without the leading slash. Also the waiting-list source. */
  slug: string;
  /**
   * ISO date of the last real edit to this guide - shown on the page, quoted by
   * the Article markup and by the sitemap. Bump it when the copy changes, and
   * only then: a date that moves at every build is a signal Google learns to
   * ignore.
   */
  updated: string;
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
  /**
   * The countdown, read top to bottom. Guides only: an "app" page has nothing
   * to plan.
   */
  timelineTitle?: string;
  timeline?: LandingMilestone[];
  /**
   * What a participant actually pays, by format. Guides only, and the reason
   * someone stays on the page: the figure is what every "combien coûte…"
   * search is really asking, and almost no one prints it. Orders of magnitude,
   * said to be orders of magnitude - costsNote carries that caveat and is not
   * optional editorially.
   */
  costsTitle?: string;
  costsLede?: string;
  costs?: LandingCost[];
  costsNote?: string;
  /**
   * The settlement guide's version of the same idea: one real split, worked
   * line by line, with the arithmetic visible. It is what gets quoted.
   */
  worked?: {
    title: string;
    lede: string;
    rows: LandingLedgerRow[];
    balances: LandingBalance[];
    settle: string[];
    note: string;
  };
  /**
   * What people actually get wrong - not the structural problems the "pains"
   * describe, but the decisions that cost the weekend. Never a rewording of a
   * step: if it is already in the method, it does not belong here.
   */
  mistakes?: LandingMistake[];
  /**
   * What the group does today, against what the app does instead. App pages
   * only, and written by category - a group conversation, a spreadsheet, a
   * shared-accounts app - never by brand: a comparison that names a competitor
   * has to be objective and verifiable to be lawful, and none of this is
   * measured.
   */
  compareTitle?: string;
  compareLede?: string;
  /** Header of the "today" column. */
  compareBefore?: string;
  compare?: LandingCompareRow[];
  /** The product, shown. App pages only. */
  screensTitle?: string;
  screensLede?: string;
  screens?: LandingScreen[];
  /**
   * The <h2> over the module grid. Written once per page, never shared: the
   * guide and the app page of one occasion sit on neighbouring queries, and a
   * heading printed on both is the first thing that makes Google treat them as
   * one page and pick the wrong one.
   */
  modulesTitle: string;
  /** The Yatu modules that carry this occasion, in the order they matter. */
  modulesLede: string;
  modules: ModuleKey[];
  /**
   * What a module does *on this page*, when the canonical MODULES sentence
   * would repeat the page next door word for word. App pages always override -
   * they are the ones competing with their own guide; the guides keep the
   * product's own wording.
   */
  moduleNotes?: Partial<Record<ModuleKey, string>>;
  faq: LandingFaq[];
  /** The other half of the pair, linked from a block of its own. */
  counterpart?: LandingCounterpart;
  /** Slugs of the three guides linked at the bottom. */
  related: string[];
};

export const LANDING_PAGES: LandingPage[] = [
  {
    kind: "guide",
    slug: "organiser-un-week-end-entre-amis",
    updated: "2026-08-02",
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
    timelineTitle: "Six semaines, sans se presser",
    timeline: [
      { when: "6 semaines avant", what: "Deux dates proposées au groupe, avec une date limite de réponse. Le noyau dur se confirme." },
      { when: "5 semaines avant", what: "Logement réservé, en annulation gratuite si possible. Budget par personne annoncé dans la foulée." },
      { when: "3 semaines avant", what: "Chacun a payé sa part du logement. Les rôles sont attribués : courses, trajets, musique." },
      { when: "1 semaine avant", what: "Menus décidés, liste de courses ouverte, covoiturage calé avec les heures de passage." },
      { when: "La veille", what: "Infos pratiques épinglées : adresse exacte, code d’entrée, heure d’arrivée, numéro du propriétaire." },
      { when: "Au retour", what: "Comptes soldés en une fois, album commun ouvert pendant que tout le monde a encore ses photos." },
    ],
    costsTitle: "Ce que ça coûte, par personne",
    costsLede:
      "Le chiffre qui décide, c’est le prix par personne annoncé avant l’invitation. Voici les ordres de grandeur pour un groupe de huit, deux nuits, en France.",
    costs: [
      {
        format: "Maison à la campagne, hors saison",
        range: "90 à 140 €",
        detail:
          "Logement 45 à 70 €, courses 30 à 40 €, trajet 15 à 30 €. Le format le plus courant, et le seul où le logement ne domine pas le budget.",
      },
      {
        format: "Maison avec extérieur, en été",
        range: "150 à 250 €",
        detail:
          "Le logement double sur juillet-août et sur les week-ends fériés. C’est la ligne qui bouge : les courses et le trajet, eux, ne changent presque pas.",
      },
      {
        format: "Bord de mer ou station, haute saison",
        range: "200 à 320 €",
        detail:
          "Logement 120 à 200 €, plus les activités et les repas dehors qui s’ajoutent presque toujours au budget prévu au départ.",
      },
      {
        format: "Appartement en ville, restaurants",
        range: "180 à 300 €",
        detail:
          "Le logement baisse, les repas montent : compte 30 à 50 € par personne et par sortie, et deux sorties sur un week-end de deux nuits.",
      },
    ],
    costsNote:
      "Ce sont des ordres de grandeur, pas un barème : la saison, la région et la taille du groupe déplacent chaque ligne. Ce qui ne bouge pas, c’est la structure - le logement pèse en général la moitié du total, les courses un quart, le transport le reste. Fais le calcul sur ton devis réel, annonce-le en une phrase, et garde 10 % de marge pour ce qui n’a été prévu par personne.",
    mistakes: [
      {
        title: "Attendre que tout le monde ait répondu",
        desc: "Deux indécis bloquent six personnes qui, elles, ont répondu. Tranche à l’échéance annoncée avec les réponses reçues : les autres se joignent ou pas, mais le week-end existe.",
      },
      {
        title: "Réserver avant d’avoir annoncé le prix",
        desc: "Chaque désistement postérieur à la réservation devient une dette pour ceux qui restent. Le chiffre par personne se dit avant le premier virement, pas après.",
      },
      {
        title: "Faire porter la logistique à une seule personne",
        desc: "Si l’adresse, les comptes et le programme vivent dans une seule tête, cette personne passe le week-end à répondre aux mêmes questions. Ce qui est écrit une fois n’a pas à être répété huit fois.",
      },
    ],
    modulesTitle: "Ce que Yatu change sur un week-end",
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
      {
        q: "Combien de personnes pour un week-end qui reste gérable ?",
        a: "Entre six et huit, tout le monde participe sans qu’il faille organiser l’organisation. Au-delà de dix, la logistique change de nature : deux voitures deviennent trois, une table ne suffit plus, et chaque sujet demande son référent. Ce n’est pas impossible, c’est simplement un autre exercice.",
      },
      {
        q: "Que faire de ceux qui se désistent au dernier moment ?",
        a: "Annonce dès l’invitation ce qui reste dû en cas d’annulation - typiquement la part de logement, déjà engagée - et ce qui ne l’est pas. Une règle dite avant se respecte ; un arbitrage improvisé après se solde toujours au détriment de celui qui a avancé l’argent.",
      },
    ],
    counterpart: {
      slug: "application-organiser-week-end-entre-amis",
      kicker: "Cette méthode, dans un outil",
      label: "l’application qui porte tout ça",
      body: "La même organisation, mais dans un espace partagé : les infos épinglées, la liste que le groupe coche, les avances saisies au fil du week-end et l’album ouvert dès le vendredi soir. Ce que fait Yatu, écran par écran.",
    },
    related: [
      "application-organiser-week-end-entre-amis",
      "organiser-un-voyage-entre-amis",
      "partager-les-depenses-entre-amis",
    ],
  },

  {
    kind: "guide",
    slug: "organiser-un-voyage-entre-amis",
    updated: "2026-08-02",
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
    timelineTitle: "Quatre mois, dans cet ordre",
    timeline: [
      { when: "4 à 6 mois avant", what: "Budget plafond par personne validé par tout le monde. La destination se choisit dans cette limite, jamais l’inverse." },
      { when: "3 mois avant", what: "Transport réservé pour le groupe confirmé. Chacun rembourse sa part dans la semaine." },
      { when: "2 mois avant", what: "Logement bloqué, référents désignés : transport, logement, activités, comptes." },
      { when: "1 mois avant", what: "Documents rassemblés : billets, confirmations, assurance, validité des pièces d’identité vérifiée." },
      { when: "1 semaine avant", what: "Programme écrit, volontairement léger. Point de rendez-vous et heure du départ confirmés." },
      { when: "Au retour", what: "Comptes soldés en une fois, album partagé pendant que les photos sont encore sur les téléphones." },
    ],
    costsTitle: "Combien prévoir, par personne et par format",
    costsLede:
      "Le plafond se pose avant la destination, pas après. Ces fourchettes couvrent le transport, le logement et les dépenses sur place, pour un groupe de six à huit.",
    costs: [
      {
        format: "Road trip en France, une semaine",
        range: "350 à 600 €",
        detail:
          "Van de location ou voitures partagées, campings et locations courtes, courses. Le poste qui dérape est l’essence dès que les étapes s’allongent.",
      },
      {
        format: "Ville européenne, trois à quatre nuits",
        range: "400 à 700 €",
        detail:
          "Vol 80 à 200 € réservé tôt, 50 à 90 € de logement par nuit à diviser, 40 à 60 € par jour sur place. Le vol peut doubler si le groupe hésite un mois de trop.",
      },
      {
        format: "Séjour balnéaire en Europe du Sud, une semaine",
        range: "600 à 1 000 €",
        detail:
          "Une maison partagée fait tomber la nuitée sous 40 € par personne. Ce sont les transferts, la location de voiture et les sorties qui font l’écart entre le bas et le haut de la fourchette.",
      },
      {
        format: "Long-courrier, dix à quinze jours",
        range: "1 200 à 2 200 €",
        detail:
          "Le vol pèse la moitié à lui seul. Il se réserve trois à six mois avant : c’est le seul poste où attendre coûte mécaniquement plus cher.",
      },
    ],
    costsNote:
      "Fourchettes indicatives, faites pour donner une échelle avant de chercher - pas pour tenir lieu de devis. Deux constantes, quelle que soit la destination : le transport ne baisse jamais avec le temps, et ce qui se paie sur place est le poste que les groupes sous-estiment le plus. Annonce un plafond qui inclut les repas et les activités, sinon il sera dépassé sans que personne l’ait décidé.",
    mistakes: [
      {
        title: "Choisir la destination avant le budget",
        desc: "Une fois que le groupe s’est projeté sur un endroit précis, plus personne n’ose dire que c’est trop cher. Le plafond se pose à froid, avant les recherches, et il engage tout le monde.",
      },
      {
        title: "Laisser une seule personne avancer les réservations",
        desc: "Avancer quatre mille euros pour huit, c’est devenir le banquier du groupe pendant trois mois. Chacun rembourse sa part à la réservation, pas au retour.",
      },
      {
        title: "Minuter les journées",
        desc: "Un programme plein transforme chaque retard en tension. Deux temps forts par jour et du temps libre autour : c’est ce qui distingue un voyage de groupe réussi d’un séjour où l’on se surveille.",
      },
    ],
    modulesTitle: "Ce que Yatu porte à ta place sur un voyage",
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
      {
        q: "Faut-il voter chaque décision ou désigner un référent ?",
        a: "Un référent par sujet, qui décide dans son périmètre et rend compte. Le vote systématique paraît plus juste mais paralyse : à huit, chaque question rouverte coûte deux jours et quinze messages. Le groupe garde la main sur les arbitrages structurants - le budget, les dates, la destination.",
      },
      {
        q: "Comment gérer quelqu’un qui ne vient qu’une partie du voyage ?",
        a: "Calcule sa part au prorata des nuits et des dépenses communes qui le concernent, et annonce-la en même temps que le budget général. Ce qui crée des tensions, ce n’est jamais la présence partielle : c’est de découvrir à la fin que tout le monde a payé pareil.",
      },
    ],
    counterpart: {
      slug: "application-organiser-voyage-groupe",
      kicker: "Cette méthode, dans un outil",
      label: "l’application qui porte tout ça",
      body: "Les billets déposés par ceux qui réservent, les avances saisies au jour le jour sur plusieurs mois, le programme lisible par tous et l’album ouvert dès le départ. Ce que fait Yatu pendant le voyage, écran par écran.",
    },
    related: [
      "application-organiser-voyage-groupe",
      "organiser-un-week-end-entre-amis",
      "partager-les-depenses-entre-amis",
    ],
  },

  {
    kind: "guide",
    slug: "organiser-un-evjf",
    updated: "2026-08-02",
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
    timelineTitle: "Trois mois, sans rien éventer",
    timeline: [
      { when: "3 mois avant", what: "L’équipe se forme - témoins plus deux ou trois proches - et se donne un espace où la future mariée n’est pas." },
      { when: "10 semaines avant", what: "Date bloquée avec elle, sous un prétexte. Vérifie qu’elle ne tombe ni la semaine du mariage ni juste après." },
      { when: "8 semaines avant", what: "Budget par participante arrêté, part de la mariée comprise, et annoncé au groupe avec un délai pour se retirer." },
      { when: "6 semaines avant", what: "Argent collecté, puis logement et activités réservés - dans cet ordre." },
      { when: "2 semaines avant", what: "Programme écrit avec heures et adresses, activité de repli prévue en cas de pluie." },
      { when: "La veille", what: "Point de rendez-vous, transport et surprise du premier moment confirmés à chacune, en privé." },
    ],
    costsTitle: "Le budget par participante, selon le format",
    costsLede:
      "Part de la future mariée comprise et répartie entre les autres - c’est la convention, et c’est ce qui fait monter le chiffre annoncé de 10 à 15 %.",
    costs: [
      {
        format: "Une journée sur place",
        range: "60 à 120 €",
        detail:
          "Une activité à 30 à 60 €, un déjeuner ou un brunch, la part du cadeau commun. Le format qui ne perd personne - et celui qu’il faut proposer en parallèle du week-end.",
      },
      {
        format: "Week-end en France, maison louée",
        range: "150 à 280 €",
        detail:
          "Deux nuits divisées (50 à 90 €), deux activités, les courses et un restaurant. Le poste systématiquement oublié : la décoration, les accessoires et le petit matériel.",
      },
      {
        format: "Week-end en ville, avec transport",
        range: "300 à 500 €",
        detail:
          "Train ou vol, deux nuits en logement partagé, deux activités et les repas dehors. À réserver deux à trois mois avant pour rester dans cette fourchette.",
      },
      {
        format: "Destination à l’étranger",
        range: "500 à 900 €",
        detail:
          "C’est le format qui perd le plus de participantes, et toujours pour la même raison : le montant est découvert après que le groupe s’est projeté dessus.",
      },
    ],
    costsNote:
      "Ordres de grandeur observés en France, à ajuster selon la saison et la ville. La règle utile n’est pas le montant, c’est la façon de l’annoncer : complet - activités, repas, transport, part de la mariée - avant la première réservation, avec un délai pour se retirer sans avoir à se justifier. Un budget découvert en cours de route coûte des participantes ; un budget annoncé haut et tôt n’en coûte presque aucune.",
    mistakes: [
      {
        title: "Demander l’avis des vingt invitées sur tout",
        desc: "Trois personnes décident, le reste valide des options déjà chiffrées. Une organisation collégiale à vingt ne produit pas un meilleur week-end, elle produit six semaines de discussions.",
      },
      {
        title: "Réserver avant d’avoir encaissé",
        desc: "L’organisatrice qui avance le logement se retrouve à relancer pendant deux mois. L’argent arrive d’abord, les réservations partent ensuite - c’est la seule règle qui protège celle qui organise.",
      },
      {
        title: "Ne pas demander ses contraintes à la principale intéressée",
        desc: "Allergies, phobies, activités qu’elle déteste, personnes qu’elle préfère ne pas voir ensemble : ces informations s’obtiennent auprès de son conjoint ou d’une sœur, sans rien dévoiler. C’est ce qui sépare une surprise réussie d’un week-end subi.",
      },
    ],
    modulesTitle: "Préparer sans qu’elle en voie la trace",
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
      {
        q: "Que faire si une participante ne peut pas suivre le budget ?",
        a: "Prévois un format à la journée en plus du week-end complet, annoncé en même temps que le budget. La plupart des désistements ne viennent pas d’un manque d’envie mais d’un montant découvert trop tard, quand il n’existe plus d’option intermédiaire.",
      },
      {
        q: "Faut-il tout garder secret jusqu’au bout ?",
        a: "Non - et c’est même une mauvaise idée pour la logistique. Communique-lui ce qui la concerne matériellement : les dates, la météo à prévoir, le type d’affaires à emporter, l’heure de départ. Le programme reste la surprise, pas la valise.",
      },
    ],
    related: ["organiser-un-evg", "organiser-un-week-end-entre-amis", "organiser-un-anniversaire"],
  },

  {
    kind: "guide",
    slug: "organiser-un-evg",
    updated: "2026-08-02",
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
    timelineTitle: "Deux mois, en cinq jalons",
    timeline: [
      { when: "8 semaines avant", what: "Deux organisateurs désignés. Le marié bloque un week-end sans savoir ce qu’il y a dedans." },
      { when: "6 semaines avant", what: "Prix tout compris annoncé au groupe, part du marié incluse, avec un délai pour se retirer sans se justifier." },
      { when: "5 semaines avant", what: "Virements reçus. Hébergement et activité réservés seulement à ce moment-là." },
      { when: "2 semaines avant", what: "Programme, horaires et plan B météo écrits. Qui apporte quoi est attribué nominativement." },
      { when: "La veille", what: "Point de rendez-vous envoyé au marié - l’heure et le lieu, rien d’autre." },
    ],
    costsTitle: "Le prix tout compris, par participant",
    costsLede:
      "Part du marié incluse et divisée entre les autres. Un seul chiffre, dit avant la première réservation.",
    costs: [
      {
        format: "Une journée : activité et repas",
        range: "70 à 130 €",
        detail:
          "Karting, paintball, accrobranche ou escape game entre 35 et 70 €, plus un déjeuner et un verre. Le format qui réunit le plus de monde, et le seul qui ne se refuse pas pour raisons de budget.",
      },
      {
        format: "Week-end en France, gîte loué",
        range: "180 à 320 €",
        detail:
          "Deux nuits divisées, une activité principale, les courses et un restaurant. Ajoute 20 à 30 € par personne pour la part du marié.",
      },
      {
        format: "Week-end avec activité sportive lourde",
        range: "250 à 450 €",
        detail:
          "Parachute, circuit auto, canyoning : l’activité seule pèse 100 à 200 €. C’est aussi le format où les frais annexes se découvrent sur place - transport, caution, matériel.",
      },
      {
        format: "Week-end à l’étranger",
        range: "350 à 650 €",
        detail:
          "Vol low cost réservé tôt, logement partagé, deux sorties. Au-delà, une partie du groupe décline pour des raisons de budget bien plus que d’envie.",
      },
    ],
    costsNote:
      "Fourchettes indicatives pour la France, hors vacances scolaires. Ce qui fait vraiment l’écart entre le bas et le haut n’est pas l’activité : ce sont les frais annexes que personne n’a chiffrés - trajet jusqu’au lieu, consommations, caution du matériel, repas du dimanche. Chiffre-les avec le reste, ou dis clairement qu’ils sont en plus.",
    mistakes: [
      {
        title: "Construire le week-end autour du groupe, pas autour de lui",
        desc: "Le saut en parachute fait plaisir à ceux qui le proposent. La question utile est celle qu’il raconterait lui-même le lendemain, pas celle qui impressionne le plus la bande.",
      },
      {
        title: "Ne pas prévoir de plan B météo",
        desc: "Une activité extérieure annulée sans repli, c’est un après-midi entier à improviser à dix, souvent au bar le plus proche. L’option de secours se réserve en même temps que l’activité principale.",
      },
      {
        title: "Découvrir les frais annexes sur place",
        desc: "Transport, repas, consommations, caution du matériel : ce qui n’est pas dans le prix annoncé finit par sortir de la poche de celui qui a une carte. Chiffre les extras avec le reste, ou dis clairement qu’ils sont en plus.",
      },
    ],
    modulesTitle: "Préparer pendant qu’il ne se doute de rien",
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
      {
        q: "Faut-il inviter les collègues et la famille ?",
        a: "Pose la question au marié, en amont et sans détailler le programme : c’est la seule information dont tu as vraiment besoin de sa part. Un groupe qui mélange des cercles qui ne se connaissent pas demande un programme plus collectif et moins d’allusions internes.",
      },
      {
        q: "Comment répartir la part du marié ?",
        a: "Divise-la entre les participants et intègre-la au prix annoncé, plutôt que de la traiter comme une cagnotte à part. Une seule ligne, un seul chiffre : c’est ce qui évite les discussions sur qui paie quoi la veille du départ.",
      },
    ],
    related: ["organiser-un-evjf", "organiser-un-week-end-entre-amis", "partager-les-depenses-entre-amis"],
  },

  {
    kind: "guide",
    slug: "organiser-un-anniversaire",
    updated: "2026-08-02",
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
    timelineTitle: "Trois semaines suffisent",
    timeline: [
      { when: "3 semaines avant", what: "Date et lieu arrêtés. Le créneau de la personne fêtée est bloqué via un proche, sans explication." },
      { when: "2 semaines avant", what: "Invitations envoyées dans un espace où elle n’est pas, avec la règle du silence rappelée en une phrase." },
      { when: "10 jours avant", what: "Cadeau commun choisi, montant par personne annoncé, date limite de versement fixée." },
      { when: "1 semaine avant", what: "Liste du « qui ramène quoi » ouverte. Chacun prend une ligne visible par tous." },
      { when: "La veille", what: "Déroulé de l’arrivée écrit : heure des invités, heure de la personne fêtée, qui l’amène et sous quel prétexte." },
    ],
    costsTitle: "Ce que ça coûte, par invité",
    costsLede:
      "Deux budgets à ne surtout pas mélanger : ce que coûte la soirée, et ce que coûte le cadeau. Le second se divise par le nombre de contributeurs, pas d’invités.",
    costs: [
      {
        format: "Chez quelqu’un, apéritif dînatoire",
        range: "12 à 25 €",
        detail:
          "Boissons, nourriture, décoration minimale. Si chacun prend une ligne de la liste, ce qui reste réellement à la charge de l’hôte tombe sous les 10 €.",
      },
      {
        format: "Chez quelqu’un, repas complet",
        range: "25 à 45 €",
        detail:
          "Un plat qui tient au corps, deux boissons par personne, un gâteau. Prévois 20 % de marge : c’est le nombre de présents qui se trompe, jamais le prix.",
      },
      {
        format: "Salle louée, traiteur ou food truck",
        range: "45 à 90 €",
        detail:
          "200 à 600 € de location à diviser, plus 25 à 45 € de repas par personne. Le format des anniversaires ronds, à réserver deux mois avant.",
      },
      {
        format: "Le cadeau commun, à part",
        range: "20 à 40 €",
        detail:
          "Un montant fixe par contributeur, jamais une contribution libre : les cagnottes ouvertes finissent sous le prix du cadeau, et c’est l’organisateur qui comble la différence.",
      },
    ],
    costsNote:
      "Ordres de grandeur, à ajuster selon la ville et le nombre. Le chiffre à surveiller n’est pas le total mais l’écart entre invités et présents : sur un anniversaire, tabler sur 100 % de présence est la façon la plus fiable de payer trop cher. Cale les courses sur les réponses fermes reçues la veille, pas sur la liste d’invitation.",
    mistakes: [
      {
        title: "Inviter trop large pour une surprise",
        desc: "Chaque invité supplémentaire est une chance de plus que l’information circule. Au-delà d’une quinzaine de personnes, considère que la surprise tiendra du hasard - et prépare-toi à en rire.",
      },
      {
        title: "Prévenir la personne trop tard pour qu’elle soit libre",
        desc: "Une surprise suppose qu’elle n’ait rien prévu ce soir-là. Fais bloquer la date par un proche deux semaines avant, sous n’importe quel prétexte : c’est l’étape que les organisateurs oublient le plus souvent.",
      },
      {
        title: "Confondre cagnotte et contribution libre",
        desc: "« Chacun met ce qu’il veut » finit systématiquement sous le prix du cadeau, et c’est l’organisateur qui comble. Annonce un montant par personne, quitte à prévoir discrètement un tarif réduit pour ceux qui le demandent.",
      },
    ],
    modulesTitle: "La surprise se prépare dans l’événement, pas à côté",
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
      {
        q: "Surprise ou pas surprise ?",
        a: "La surprise a un coût : tu ne peux vérifier ni ses envies, ni sa disponibilité réelle, ni son état de fatigue. Pour un anniversaire important, beaucoup de groupes gardent la date secrète mais préviennent qu’il se passe quelque chose - assez pour qu’elle soit libre et présentable, pas assez pour gâcher l’effet.",
      },
      {
        q: "Qui prévient les proches qu’on ne connaît pas ?",
        a: "Passe par une personne de chaque cercle - la famille, les collègues, les amis d’enfance - plutôt que de collecter cinquante numéros. C’est plus rapide, et ça évite le message qui arrive à quelqu’un qui n’était pas censé savoir.",
      },
    ],
    related: ["organiser-une-soiree-entre-amis", "organiser-un-evjf", "partager-les-depenses-entre-amis"],
  },

  {
    kind: "guide",
    slug: "organiser-une-soiree-entre-amis",
    updated: "2026-08-02",
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
    timelineTitle: "Une semaine, quatre moments",
    timeline: [
      { when: "1 semaine avant", what: "Date, heure et adresse envoyées dans le même message. La question du lieu est réglée en premier." },
      { when: "3 jours avant", what: "Réponses fermes demandées, avec une échéance. Les courses se calibrent sur ces réponses, pas sur la liste d’invités." },
      { when: "La veille", what: "Liste du « qui ramène quoi » complétée. Ce qui manque encore est visible par tout le monde." },
      { when: "Le jour même", what: "Courses faites et notées avec leur montant. Les voisins prévenus si la soirée déborde." },
      { when: "Le lendemain", what: "Décompte unique envoyé, album commun ouvert." },
    ],
    costsTitle: "Le coût d’une soirée, par personne",
    costsLede: "Pour un groupe de dix, chez quelqu’un, courses comprises.",
    costs: [
      {
        format: "Apéritif, sans repas",
        range: "8 à 15 €",
        detail:
          "Boissons, planche, chips et olives. Le format qui se décide la veille, et le seul qui ne demande aucune avance importante.",
      },
      {
        format: "Raclette, fondue ou pâtes",
        range: "12 à 20 €",
        detail:
          "Le plat convivial revient moins cher qu’on ne le croit et absorbe les imprévus de présence : deux personnes en plus ne changent presque rien au total.",
      },
      {
        format: "Repas complet, entrée et dessert",
        range: "20 à 35 €",
        detail:
          "C’est là qu’on avance le plus : 200 à 350 € de courses pour dix, sortis par une seule personne s’il n’y a pas de liste où s’inscrire.",
      },
      {
        format: "Soirée à thème ou avec matériel",
        range: "25 à 45 €",
        detail:
          "Déguisements, décoration, enceinte louée, jeux. Le poste qui gonfle sans être annoncé, parce qu’il est acheté par deux ou trois personnes chacune de leur côté.",
      },
    ],
    costsNote:
      "Ordres de grandeur pour une soirée chez soi, hors bar et hors restaurant. La variable qui compte n’est pas le format mais l’écart entre invités et présents : achète pour les réponses fermes, avec une marge courte. Et si tu avances plus de 50 €, dis-le avant - « je fais les courses, comptez une quinzaine d’euros » passe très bien en amont, beaucoup moins à deux heures du matin.",
    mistakes: [
      {
        title: "Calibrer les courses sur la liste d’invités",
        desc: "Douze invités, six présents : le surplus se jette et c’est toi qui l’as payé. Achète pour les réponses fermes, avec une marge courte plutôt qu’une marge confortable.",
      },
      {
        title: "Ne rien prévoir à manger",
        desc: "Une soirée sans nourriture se termine plus tôt, plus mal, et coûte plus cher en boisson. Même minimal - du pain, du fromage, quelque chose de chaud - c’est ce qui change la durée d’une soirée.",
      },
      {
        title: "Oublier qu’il y a un lendemain",
        desc: "Le ménage et les comptes se règlent le jour même ou pas du tout. Dire en fin de soirée qui reste dix minutes ranger, et envoyer le décompte le lendemain matin, évite les deux rancunes les plus banales entre amis.",
      },
    ],
    modulesTitle: "Trois modules, et la soirée est calée",
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
      {
        q: "Comment gérer les invités qui en amènent d’autres ?",
        a: "Dis-le explicitement dans l’invitation : soit c’est ouvert, soit ça ne l’est pas. Ce n’est pas la personne en plus qui pose problème, c’est le calcul des courses et de la place assise qui saute sans prévenir.",
      },
      {
        q: "Faut-il faire payer les invités ?",
        a: "Pour un apéritif, non. Pour une soirée où tu avances des courses conséquentes, annonce-le avant plutôt qu’au moment de réclamer : « je m’occupe des courses, comptez une quinzaine d’euros » passe très bien en amont, et beaucoup moins bien à deux heures du matin.",
      },
    ],
    related: ["organiser-un-anniversaire", "organiser-un-week-end-entre-amis", "partager-les-depenses-entre-amis"],
  },

  {
    kind: "guide",
    slug: "organiser-un-week-end-au-ski",
    updated: "2026-08-02",
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
    timelineTitle: "Six mois pour les vacances scolaires",
    timeline: [
      { when: "3 à 6 mois avant", what: "Logement réservé sur le nombre de couchages réel, pas optimiste. C’est la disponibilité qui manque, pas l’argent." },
      { when: "2 mois avant", what: "Budget complet annoncé : logement, forfaits, location, transport, courses. Un seul chiffre par personne." },
      { when: "1 mois avant", what: "Forfaits et matériel réservés en groupe. Tailles, pointures et niveaux collectés une bonne fois." },
      { when: "2 semaines avant", what: "Répartition des chambres écrite et validée, avec les lits doubles et les canapés annoncés tels quels." },
      { when: "La veille", what: "Documents rassemblés : assurance, contrat de location, bons de forfait, adresse et code du chalet." },
      { when: "Au retour", what: "Comptes soldés : quatre personnes ont avancé quatre choses différentes, c’est le moment de tout remettre à plat." },
    ],
    costsTitle: "Le budget ski, poste par poste et par personne",
    costsLede:
      "Deux nuits, groupe de huit, station française. Le total complet - pas le prix du chalet divisé par huit.",
    costs: [
      {
        format: "Station familiale, moyenne montagne",
        range: "220 à 350 €",
        detail:
          "Logement 60 à 100 €, forfait deux jours 70 à 110 €, location du matériel 40 à 60 €, transport 30 à 60 €, courses 25 à 40 €.",
      },
      {
        format: "Grande station, haute saison",
        range: "320 à 500 €",
        detail:
          "Le logement et le forfait montent ensemble : 120 à 180 € de lit, 110 à 160 € de forfait. Les vacances scolaires ajoutent environ 30 % sur le seul logement.",
      },
      {
        format: "Semaine complète",
        range: "600 à 1 000 €",
        detail:
          "Le forfait six jours (200 à 320 €) et la location à la semaine (90 à 150 €) prennent une part bien plus grande du total que sur un week-end.",
      },
      {
        format: "Sur place sans skier",
        range: "120 à 200 €",
        detail:
          "Logement, courses et transport, sans forfait ni matériel. Annonce-le explicitement : il y a presque toujours quelqu’un dans le groupe pour qui c’est la bonne option.",
      },
    ],
    costsNote:
      "Fourchettes indicatives pour la France, hors vacances de Noël et de février où tout se déplace vers le haut. Le piège du ski est toujours le même : le forfait et la location pèsent ensemble autant que le lit, et ils ne sont presque jamais dans le chiffre annoncé au groupe. Additionne les cinq postes avant d’envoyer l’invitation, pas après.",
    mistakes: [
      {
        title: "Estimer le budget sur le seul logement",
        desc: "Le forfait et la location de matériel pèsent souvent autant que le lit. Un prix annoncé « chalet divisé par huit » finit toujours en mauvaise surprise à l’arrivée en station.",
      },
      {
        title: "Louer le matériel sur place, le samedi matin",
        desc: "C’est la file d’attente la plus longue du week-end, et les tarifs de groupe réservés à l’avance sont plus bas. Trente minutes de préparation valent deux heures de queue à huit.",
      },
      {
        title: "Vouloir skier groupés toute la journée",
        desc: "Avec des niveaux écartés, la journée se passe à attendre en bas des télésièges et personne ne skie vraiment. Deux points de rendez-vous quotidiens suffisent à garder le groupe ensemble.",
      },
    ],
    modulesTitle: "Le ski, c’est du budget et des papiers",
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
      {
        q: "Location ou matériel personnel ?",
        a: "Pour un seul week-end par an, la location reste plus simple : rien à transporter, matériel adapté aux conditions, et le tarif groupe négocié à l’avance. Le calcul s’inverse à partir de deux ou trois séjours par saison.",
      },
      {
        q: "Quelle assurance prévoir ?",
        a: "Vérifie ce que couvrent déjà ta carte bancaire et ton assurance habitation avant d’acheter quoi que ce soit au guichet : les garanties se recoupent souvent. Ce qui compte, c’est que le groupe sache qui est couvert pour quoi, et que l’attestation soit accessible à tous, pas seulement à celui qui l’a souscrite.",
      },
    ],
    related: [
      "organiser-un-week-end-entre-amis",
      "partager-les-depenses-entre-amis",
      "organiser-un-voyage-entre-amis",
    ],
  },

  {
    kind: "guide",
    slug: "partager-les-depenses-entre-amis",
    updated: "2026-08-02",
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
    timelineTitle: "Avant, pendant, après",
    timeline: [
      { when: "Avant l’événement", what: "Une personne avance le gros - logement, transport - et chacun rembourse sa part tout de suite. Une avance qui dure des mois est une dette qu’on finit par oublier." },
      { when: "Pendant, chaque jour", what: "Les dépenses sont notées le jour même, avec qui a payé et pour combien de personnes. Ce qui n’est pas écrit sur le moment est écrit faux." },
      { when: "Le dernier soir", what: "Le groupe relit la liste ensemble, pendant que tout le monde se souvient. Cinq minutes à ce moment-là valent trois échanges de messages une semaine après." },
      { when: "Dans les 48 heures", what: "Le décompte unique part, avec le détail par personne. Plus le délai s’allonge, plus le taux de remboursement baisse." },
      { when: "Après", what: "La liste reste consultable. C’est elle qui règle, sans discussion, la question qui ressort six mois plus tard." },
    ],
    worked: {
      title: "Un décompte réel, ligne par ligne",
      lede: "Un week-end à quatre - Léa, Malo, Sarah et Théo. Cinq dépenses, une répartition qui n’est pas la même pour toutes, et un solde qui tient en trois virements.",
      rows: [
        { label: "Maison, deux nuits", amount: "480,00 €", who: "Léa", forWhom: "Les quatre" },
        { label: "Courses du samedi", amount: "112,40 €", who: "Malo", forWhom: "Les quatre" },
        { label: "Essence, aller-retour", amount: "78,00 €", who: "Théo", forWhom: "Les quatre" },
        {
          label: "Restaurant du samedi soir",
          amount: "96,00 €",
          who: "Sarah",
          forWhom: "Trois - Théo n’y était pas",
        },
        { label: "Pain et petit-déjeuner", amount: "24,60 €", who: "Malo", forWhom: "Les quatre" },
      ],
      balances: [
        { who: "Léa", paid: "480,00 €", owed: "205,75 €", net: "+ 274,25 €" },
        { who: "Malo", paid: "137,00 €", owed: "205,75 €", net: "− 68,75 €" },
        { who: "Sarah", paid: "96,00 €", owed: "205,75 €", net: "− 109,75 €" },
        { who: "Théo", paid: "78,00 €", owed: "173,75 €", net: "− 95,75 €" },
      ],
      settle: [
        "Malo verse 68,75 € à Léa",
        "Sarah verse 109,75 € à Léa",
        "Théo verse 95,75 € à Léa",
      ],
      note: "791 € de dépenses, une seule personne créditrice, trois virements pour solder au lieu d’une dizaine de petits remboursements croisés. La ligne qui fait tout le travail est la quatrième : le restaurant ne compte que pour trois, et c’est exactement l’information qui ne se retrouve plus trois jours après. Sans elle, tout le monde doit 197,75 € et Théo paie 24 € qu’il ne doit pas - assez pour qu’il trouve les comptes injustes, jamais assez pour qu’il le dise.",
    },
    mistakes: [
      {
        title: "Mélanger cagnotte et dépenses",
        desc: "Une cagnotte collectée à l’avance et des dépenses individuelles dans le même total, et plus personne ne sait ce qui a été payé deux fois. Traite la cagnotte comme un versement de chacun, pas comme une dépense de plus.",
      },
      {
        title: "Laisser des dépenses sans bénéficiaire",
        desc: "« Courses 84 € » sans dire pour qui, c’est une ligne qui sera contestée. Le nom des personnes concernées coûte trois secondes à saisir et supprime la totalité des désaccords de fin de séjour.",
      },
      {
        title: "Solder trop tard",
        desc: "Un décompte envoyé trois semaines après tombe au milieu d’autres dépenses, et se paie mal. Les remboursements se font tant que le voyage est encore frais - c’est un fait de comportement, pas de comptabilité.",
      },
    ],
    modulesTitle: "Le budget vit dans l’événement, pas à côté",
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
      {
        q: "Que faire des dépenses payées en espèces ?",
        a: "Note-les comme les autres, en précisant qui a sorti l’argent. Le liquide est la première source d’écart dans un décompte de groupe, précisément parce qu’il ne laisse pas de trace sur un relevé - c’est donc celui qu’il faut écrire en premier.",
      },
      {
        q: "Comment gérer les dépenses en devise étrangère ?",
        a: "Saisis le montant dans la devise du paiement et convertis tout à un seul taux, choisi à l’avance, plutôt qu’au taux du jour de chaque achat. La précision perdue est négligeable ; la discussion évitée ne l’est pas.",
      },
    ],
    counterpart: {
      slug: "application-partage-depenses-entre-amis",
      kicker: "Cette méthode, dans un outil",
      label: "l’application qui porte tout ça",
      body: "La saisie en trois champs, les participants décochés ligne par ligne, la compensation des dettes croisées et le justificatif rangé à côté du chiffre qu’il prouve. Ce que fait Yatu du décompte ci-dessus.",
    },
    related: [
      "application-partage-depenses-entre-amis",
      "organiser-un-week-end-entre-amis",
      "organiser-un-voyage-entre-amis",
    ],
  },
  /* ── Les pages « application pour X » ─────────────────────────────────
     Elles répondent à une requête applicative, pas à une question
     d'organisation : ce que fait Yatu, pas comment s'y prendre. Chacune
     pointe vers le guide méthode correspondant, et réciproquement. */

  {
    kind: "app",
    slug: "application-partage-depenses-entre-amis",
    updated: "2026-08-02",
    badge: "Budget partagé",
    accent: ACCENT.sunbeam,
    icon: icon("budget"),
    photo: "/assets/usecases/usage-roadtrip.jpg",
    photoAlt: "Des amis en road trip calculant leurs dépenses communes",
    h1: "L’application qui tient les dépenses de ton groupe",
    title: "Application pour partager les dépenses entre amis - Yatu",
    description:
      "Noter une dépense, dire qui elle concerne, voir qui doit combien et solder en un minimum de virements - dans le même espace que la conversation et les listes du groupe. Yatu ouvre le 9 septembre 2026.",
    lede: "Les applis de comptes partagés font très bien le calcul. Ce qu’elles ne font pas, c’est te dire pourquoi la dépense existe : la conversation qui l’a décidée, la liste qui l’a produite et le programme qui la justifie vivent ailleurs. Yatu met les comptes à l’intérieur de l’événement.",
    og: {
      title: "Les dépenses du groupe, dans l’événement qui les a produites.",
      subtitle: "Qui a payé, pour qui, et qui rembourse - à côté de la discussion et des listes.",
    },
    cardTitle: "Appli de dépenses partagées",
    cardSub: "Les comptes dans l’événement, pas à côté.",
    painsTitle: "Ce qu’un tableur de comptes ne règle pas",
    pains: [
      {
        tool: "chat",
        title: "La dépense sans son contexte",
        desc: "« Courses 84 € » six mois plus tard ne dit rien à personne. Dans Yatu, la dépense est dans l’événement, à côté de la liste et de la conversation qui l’ont décidée.",
      },
      {
        tool: "people",
        title: "Une appli de plus à faire installer",
        desc: "Comptes d’un côté, discussion de l’autre, photos ailleurs : à chaque outil, une partie du groupe décroche. Un seul espace, c’est une seule adhésion à obtenir.",
      },
      {
        tool: "documents",
        title: "Les justificatifs qui se perdent",
        desc: "La facture du logement et le reçu de la location sont dans la boîte mail de celui qui a réservé. Rangés dans l’événement, ils restent lisibles par tout le groupe.",
      },
    ],
    screensTitle: "À quoi ça ressemble",
    screensLede:
      "Deux écrans de l’application, à quelques semaines de son ouverture.",
    screens: [
      {
        src: "/mockups/iphone_budget.svg",
        alt: "Écran budget d’un événement Yatu : le total des dépenses, la part de chaque participant et la liste des dépenses avec le nom de celui qui a payé",
        label: "Le budget",
        caption: "Le total, la part de chacun, et chaque dépense avec qui l’a sortie.",
      },
      {
        src: "/mockups/iphone_event.svg",
        alt: "Écran d’un événement Yatu : le nom du séjour, les participants et les onglets Infos, Discussion et Budget",
        label: "L’événement autour",
        caption: "Le budget est un onglet parmi ceux que le groupe a activés.",
      },
    ],
    stepsTitle: "Ce que tu fais, ce que l’application fait",
    stepsLede:
      "Ton travail s’arrête à la saisie. Le calcul des parts, la compensation des dettes croisées et l’historique sont du côté de l’application.",
    steps: [
      {
        title: "Crée l’événement, pas un « groupe de dépenses »",
        body: "Un week-end, un voyage, une coloc : l’événement est le contenant, le budget un module que tu actives dedans. Discussion, listes, documents et album s’ouvrent si tu en as besoin, et restent fermés sinon.",
      },
      {
        title: "Invite avec un lien",
        body: "Le lien ouvre l’événement, pas un fichier. Personne ne reçoit de pièce jointe à rouvrir, et il n’existe pas de version plus à jour que celle que tout le monde a sous les yeux.",
      },
      {
        title: "Ajoute une dépense en trois champs",
        body: "Combien, pour quoi, qui a sorti l’argent. Le reste - la part de chacun, le solde du groupe, la position de la personne qui a avancé - se recalcule aussitôt, pour tout le monde en même temps.",
      },
      {
        title: "Décoche ceux que la dépense ne concerne pas",
        body: "Le restaurant du samedi n’engage que ceux qui y étaient, la maison ceux qui y dorment. La sélection se fait ligne par ligne, sans avoir à sortir la dépense du total ni à ouvrir une deuxième feuille.",
      },
      {
        title: "Regarde qui rembourse qui",
        body: "L’application ramène l’écheveau des dettes croisées au plus petit nombre de virements possible et affiche le montant exact de chacun. Il ne reste qu’à marquer réglé quand l’argent est arrivé.",
      },
    ],
    compareTitle: "Le tableur, l’appli de comptes, et l’événement",
    compareLede:
      "Trois façons de tenir les comptes d’un groupe. La différence ne porte pas sur le calcul - elle porte sur ce qui reste autour de la dépense.",
    compareBefore: "Avec un tableur ou une appli de comptes",
    compare: [
      {
        need: "Calculer les parts",
        before: "Un tableur y arrive tant que les formules tiennent ; une application de comptes partagés le fait très bien.",
        after: "Recalculé à chaque saisie, visible par tout le groupe au même moment.",
      },
      {
        need: "Savoir pourquoi la dépense existe",
        before: "La décision est dans la conversation de groupe, à trois cents messages de là.",
        after: "La dépense est dans l’événement, à côté de la liste et du message qui l’ont décidée.",
      },
      {
        need: "Retrouver le justificatif",
        before: "La facture dort dans la boîte mail de la personne qui a réservé.",
        after: "Déposée dans les documents de l’événement, lisible par le groupe entier.",
      },
      {
        need: "Faire adhérer le groupe",
        before: "Une application par besoin - comptes, discussion, photos - et chaque installation perd du monde.",
        after: "Un seul espace à rejoindre, par un lien : une seule adhésion à obtenir.",
      },
      {
        need: "Relire six mois après",
        before: "Le fil a défilé, le tableur a été refait, et personne ne sait quelle version faisait foi.",
        after: "L’événement reste ouvert : comptes soldés, documents et échanges au même endroit.",
      },
    ],
    modulesTitle: "Ce que fait le module budget, concrètement",
    modulesLede:
      "Le budget ne vit pas seul : il est dans le même espace que ce qui l’a produit.",
    modules: ["budget", "chat", "liste", "documents"],
    moduleNotes: {
      budget: "Le module de cette page : chaque dépense saisie en trois champs, la répartition choisie ligne par ligne, et le décompte final ramené au plus petit nombre de virements.",
      chat: "La conversation est rattachée à l’événement, donc à la dépense. « C’est quoi, ces 84 € ? » se répond sans changer d’écran ni de contexte.",
      liste: "La liste de courses produit la dépense. Les deux au même endroit, c’est ce qui évite d’acheter en double et donc de payer en double.",
      documents: "Facture du logement, reçu de la location, attestation d’assurance : rangés à côté des chiffres qu’ils justifient, pas dans une boîte mail.",
    },
    faq: [
      {
        q: "L’application est-elle gratuite ?",
        a: "Oui. Yatu propose une version gratuite pour créer et organiser tes événements, budget partagé compris. Des options premium permettront plus tard d’accéder à davantage de possibilités ou de lever certaines limites.",
      },
      {
        q: "Faut-il que tout le groupe installe l’application ?",
        a: "Pour ajouter une dépense ou cocher une tâche, oui : chacun agit sous son nom, sinon les soldes ne veulent plus rien dire. L’intérêt d’un espace unique est justement de ne demander qu’une seule installation, au lieu d’une appli de comptes, d’un tableur et d’un album photo.",
      },
      {
        q: "Yatu se connecte-t-il à mon compte bancaire ?",
        a: "Non. Tu notes les dépenses, l’application calcule les parts et les soldes. Aucun accès bancaire n’est demandé et aucun paiement ne transite par Yatu : les remboursements se font par les moyens que ton groupe utilise déjà.",
      },
      {
        q: "Sur quels téléphones, et à partir de quand ?",
        a: `Sur iOS et Android, à partir du ${LAUNCH_LABEL}. Les personnes inscrites sur la liste d’attente sont prévenues le jour de l’ouverture.`,
      },
      {
        q: "En quoi c’est différent d’une application de comptes partagés ?",
        a: "Sur le calcul, à peu près en rien : additionner des parts est un problème résolu depuis longtemps. La différence est autour. Une application de comptes ne connaît que des montants, alors que la dépense est née d’une décision, d’une liste et d’une facture qui vivent dans trois outils différents. Yatu garde les quatre ensemble, et l’événement reste consultable une fois les comptes soldés.",
      },
      {
        q: "Et si je veux seulement la méthode, sans application ?",
        a: "Elle est écrite : notre guide pour partager les dépenses entre amis détaille la façon de tenir des comptes de groupe qui tiennent, décompte complet à l’appui, y compris sur un carnet.",
      },
    ],
    counterpart: {
      slug: "partager-les-depenses-entre-amis",
      kicker: "Avant même d’installer quoi que ce soit",
      label: "la méthode complète pour partager les dépenses",
      body: "Quoi noter, quand, comment répartir autrement qu’en parts égales et comment solder en un minimum de virements - avec un décompte réel travaillé ligne par ligne. Applicable dès aujourd’hui, y compris sur un carnet.",
    },
    related: [
      "partager-les-depenses-entre-amis",
      "organiser-un-voyage-entre-amis",
      "organiser-un-week-end-entre-amis",
    ],
  },

  {
    kind: "app",
    slug: "application-organiser-week-end-entre-amis",
    updated: "2026-08-02",
    badge: "Week-end",
    accent: ACCENT.apricot,
    icon: icon("calendar"),
    photo: "/assets/usecases/usage-retrouvailles.jpg",
    photoAlt: "Un groupe d’amis réunis dans une maison pour un week-end",
    h1: "L’application pour organiser un week-end entre amis",
    title: "Application pour organiser un week-end entre amis - Yatu",
    description:
      "Un espace par week-end : la discussion, les infos pratiques, la liste de courses, le budget et l’album photo au même endroit, pour que l’organisation ne repose plus sur une seule personne. Ouverture le 9 septembre 2026.",
    lede: "Un week-end à huit, ce n’est pas une appli qu’il faut, c’est un endroit. Un lien, tout le monde dedans, et les décisions qui arrêtent de se perdre entre une conversation, deux messages privés et un tableur que personne ne rouvre.",
    og: {
      title: "Un espace par week-end, et le groupe s’organise dedans.",
      subtitle: "Discussion, infos pratiques, courses, budget et photos au même endroit.",
    },
    cardTitle: "Appli week-end entre amis",
    cardSub: "Un lien, un espace, tout le groupe dedans.",
    painsTitle: "Pourquoi une conversation de groupe ne suffit pas",
    pains: [
      {
        tool: "pin",
        title: "L’information remonte et disparaît",
        desc: "L’adresse et le code du portail sont dans le fil, trois cents messages plus haut. Épinglés dans l’événement, ils se retrouvent en deux secondes à l’arrivée.",
      },
      {
        tool: "liste",
        title: "Un fil ne garde pas d’état",
        desc: "Une conversation dit ce qui a été écrit, jamais ce qui reste à faire. Une liste cochée par le groupe affiche le manque en permanence, sans que quelqu’un ait à le récapituler.",
      },
      {
        tool: "people",
        title: "Toute la charge sur la personne qui a lancé l’idée",
        desc: "Elle réserve, avance, relance et répond dix fois aux mêmes questions. Dès que chacun peut ajouter une dépense, cocher une ligne ou déposer une info, la charge se répartit sans qu’on ait à la répartir.",
      },
    ],
    screensTitle: "À quoi ça ressemble",
    screensLede: "Trois écrans de l’application, à quelques semaines de son ouverture.",
    screens: [
      {
        src: "/mockups/iphone_create_event.svg",
        alt: "Écran de création d’un événement Yatu : le nom du week-end, les dates et le choix des modules à activer",
        label: "La création",
        caption: "Un nom, des dates, et les modules que ce week-end demande vraiment.",
      },
      {
        src: "/mockups/iphone_add_participants.svg",
        alt: "Écran d’ajout de participants à un événement Yatu : le lien d’invitation et la liste des personnes déjà présentes",
        label: "L’invitation",
        caption: "Un lien à envoyer, et le groupe se retrouve au même endroit.",
      },
      {
        src: "/mockups/iphone_event.svg",
        alt: "Écran d’un événement Yatu : le nom du séjour, les participants, la description et les onglets Infos, Discussion et Budget",
        // The mockup shows a trip, so the label says "l'espace" and not
        // "le week-end" - a caption the screenshot contradicts costs more
        // than the keyword it would have carried.
        label: "L’espace partagé",
        caption: "Qui vient, les infos épinglées, et les onglets choisis par le groupe.",
      },
    ],
    stepsTitle: "Du lien envoyé au dernier remboursement",
    stepsLede:
      "Cinq moments, un seul espace. Ce qui change, c’est que rien n’a besoin d’être recopié d’un outil à l’autre.",
    steps: [
      {
        title: "Ouvre le week-end et envoie le lien",
        body: "Un nom, des dates, une photo, et le groupe rejoint en un geste. À partir de là, les questions arrivent au bon endroit plutôt qu’en messages privés à la même personne.",
      },
      {
        title: "Épingle les quatre infos qu’on te redemandera",
        body: "Adresse exacte, code d’entrée, heure d’arrivée, numéro du propriétaire. Écrites une fois en haut de l’événement, elles cessent d’être une question à laquelle répondre huit fois.",
      },
      {
        title: "Ouvre la liste et laisse le groupe s’y inscrire",
        body: "Chacun prend une ligne : les courses, la raclette, l’enceinte, les jeux. Ce qui reste vide est visible par tout le monde, ce qui rend la relance inutile.",
      },
      {
        title: "Note les avances au fil du week-end",
        body: "Les courses, l’essence, l’acompte du logement : chacun saisit ce qu’il a sorti, sur son téléphone, au moment où il le sort. Plus rien ne dépend de ce que quelqu’un aura retenu.",
      },
      {
        title: "Repars avec les comptes soldés et l’album plein",
        body: "Le décompte est prêt au moment de remonter en voiture, et les photos se sont rassemblées pendant le week-end plutôt qu’en promesses d’envoi. L’événement, lui, reste consultable après.",
      },
    ],
    compareTitle: "Une conversation et un tableur, ou un espace d’événement",
    compareLede:
      "La plupart des week-ends s’organisent avec deux outils et une bonne mémoire. Voilà ce que chacun tient, et ce qu’il laisse tomber.",
    compareBefore: "Avec une conversation de groupe et un tableur",
    compare: [
      {
        need: "Retrouver l’adresse et le code",
        before: "Ils sont dans le fil, quelque part entre deux photos et un vocal.",
        after: "Épinglés en haut de l’événement, au même endroit pour tout le monde.",
      },
      {
        need: "Savoir qui vient vraiment",
        before: "Des pouces levés, des « je vous dis demain », et un décompte refait à la main la veille.",
        after: "Chacun répond dans l’événement : la liste des participants est le décompte.",
      },
      {
        need: "Savoir ce qui manque encore",
        before: "Il faut relire le fil pour reconstituer ce qui a été promis, et par qui.",
        after: "Une liste cochée en direct : ce qui reste vide se voit sans qu’on ait à le demander.",
      },
      {
        need: "Tenir les avances",
        before: "Un tableur qu’une seule personne met à jour, et le plus souvent au retour.",
        after: "Chacun saisit ce qu’il a avancé ; le solde se recalcule pour le groupe entier.",
      },
      {
        need: "Récupérer les photos",
        before: "« J’envoie ce soir », et la moitié n’arrive jamais.",
        after: "Un album commun dans l’événement, rempli pendant le week-end.",
      },
    ],
    modulesTitle: "Les cinq modules d’un week-end, en détail",
    modulesLede: "Sur un week-end, ce sont ces cinq-là qui travaillent.",
    modules: ["chat", "infos", "liste", "budget", "img"],
    moduleNotes: {
      chat: "La discussion de ce week-end précisément, rattachée à ses dates et à ses participants. Elle ne se mélange pas au groupe permanent où l’on parle d’autre chose.",
      infos: "Adresse, code du portail, heure d’arrivée, numéro du propriétaire : en haut de l’événement, jamais au milieu du fil.",
      liste: "Les courses et les affaires à prendre, cochées en direct depuis le magasin. Le groupe voit le trou avant le départ, pas devant le frigo.",
      budget: "Ce que chacun a avancé, ce que chacun doit, et un décompte prêt avant même de reprendre la voiture.",
      img: "L’album du week-end, ouvert dès le vendredi soir. Chacun dépose et récupère, au lieu de promettre d’envoyer.",
    },
    faq: [
      {
        q: "En quoi c’est mieux qu’une conversation de groupe ?",
        a: "Une conversation est chronologique : ce qui est décidé descend et se perd. Un espace d’événement est structuré - les infos pratiques restent épinglées, la liste reste à jour, les comptes restent justes, et tout ça se retrouve trois mois plus tard.",
      },
      {
        q: "Combien de personnes peut-on inviter ?",
        a: "Un week-end entre amis tient largement dans ce que permet la version gratuite. Pour les groupes de plusieurs dizaines de personnes - un WEI, un gala - la page BDE et associations décrit ce qui est prévu.",
      },
      {
        q: "L’application est-elle gratuite ?",
        a: "Oui, dans sa version de base : créer un événement, inviter ton groupe et utiliser les modules. Des options premium viendront lever certaines limites, sans fermer ce qui est ouvert au lancement.",
      },
      {
        q: "Quand est-ce que je peux l’utiliser ?",
        a: `À partir du ${LAUNCH_LABEL}, sur iOS et Android. En attendant, la méthode complète pour organiser un week-end entre amis est écrite dans notre guide, budgets par personne compris, et la liste d’attente prévient dès l’ouverture.`,
      },
    ],
    counterpart: {
      slug: "organiser-un-week-end-entre-amis",
      kicker: "Avant même d’installer quoi que ce soit",
      label: "la méthode complète pour organiser un week-end",
      body: "Comment décider d’une date à huit, quand réserver, ce que ça coûte par personne selon le format et quoi faire à six semaines, à trois, puis la veille. Le rétroplanning et les fourchettes de budget, applicables tout de suite.",
    },
    related: [
      "organiser-un-week-end-entre-amis",
      "application-partage-depenses-entre-amis",
      "organiser-un-week-end-au-ski",
    ],
  },

  {
    kind: "app",
    slug: "application-organiser-voyage-groupe",
    updated: "2026-08-02",
    badge: "Voyage en groupe",
    accent: ACCENT.sky,
    icon: icon("send"),
    photo: "/assets/usecases/usage-surf.jpg",
    photoAlt: "Un groupe d’amis en voyage au bord de la mer",
    h1: "L’application pour organiser un voyage en groupe",
    title: "Application pour organiser un voyage en groupe - Yatu",
    description:
      "Billets, réservations, budget, programme et photos d’un voyage à plusieurs, réunis dans un seul espace partagé au lieu de huit boîtes mail. Yatu ouvre le 9 septembre 2026 sur iOS et Android.",
    lede: "Un voyage de groupe se joue sur ce que personne ne retrouve : le billet, l’adresse du logement, le montant déjà avancé. Yatu range tout ça dans l’événement, accessible à tout le groupe plutôt qu’à celui qui a réservé.",
    og: {
      title: "Un voyage à huit, dans un seul espace partagé.",
      subtitle: "Billets, réservations, budget, programme et album au même endroit.",
    },
    cardTitle: "Appli voyage en groupe",
    cardSub: "Billets, budget, programme, photos.",
    painsTitle: "Ce qui coince quand on part à plusieurs",
    pains: [
      {
        tool: "documents",
        title: "Le dossier tient dans une seule boîte mail",
        desc: "La personne qui a réservé a tout, les autres n’ont rien. À l’enregistrement, le groupe entier dépend de son téléphone - et de son forfait à l’étranger.",
      },
      {
        tool: "budget",
        title: "Quatre avances, aucun total",
        desc: "Chacun a réservé une chose et payé pour plusieurs, à trois mois d’écart. Sans ligne commune tenue au jour le jour, le décompte du retour se fait de mémoire.",
      },
      {
        tool: "planning",
        title: "Le programme que trois personnes connaissent",
        desc: "Les horaires vivent dans une note privée. Écrits dans l’événement, ils évitent quinze messages par jour pour savoir où et à quelle heure.",
      },
    ],
    screensTitle: "À quoi ça ressemble",
    screensLede: "Trois écrans de l’application, à quelques semaines de son ouverture.",
    screens: [
      {
        src: "/mockups/iphone_event.svg",
        alt: "Écran d’un événement Yatu : le nom du voyage, les participants, la description et les onglets Infos, Discussion et Budget",
        label: "Le voyage",
        caption: "Les participants, les infos utiles et les onglets activés par le groupe.",
      },
      {
        src: "/mockups/iphone_budget.svg",
        alt: "Écran budget d’un événement Yatu : le total des dépenses, la part de chaque participant et la liste des dépenses avec le nom de celui qui a payé",
        label: "Les avances",
        caption: "Ce qui a été payé, par qui, et ce que chacun doit encore.",
      },
      {
        src: "/mockups/iphone_homepage.svg",
        alt: "Écran d’accueil de l’application Yatu : la liste des événements du groupe avec leurs dates et leurs participants",
        label: "Après le voyage",
        caption: "L’événement reste dans la liste, comptes soldés et album compris.",
      },
    ],
    stepsTitle: "Ce que l’espace porte, du premier virement au dernier souvenir",
    stepsLede:
      "Un voyage dure des mois avant de durer une semaine. L’événement existe pendant toute cette durée-là.",
    steps: [
      {
        title: "Ouvre l’événement avant d’avoir une destination",
        body: "Un nom provisoire suffit. Les propositions arrêtent de se disperser en messages privés, et les dates se posent dedans le jour où elles se décident.",
      },
      {
        title: "Chacun dépose ce qu’il réserve",
        body: "Billets, confirmations, attestation d’assurance : le document est versé par la personne qui l’a reçu, et devient lisible par le groupe entier plutôt que par elle seule.",
      },
      {
        title: "Les avances se saisissent au jour le jour",
        body: "Le vol payé en mars, le logement en mai, les taxis sur place : chaque ligne est datée et attribuée au moment où elle tombe. Au retour, il n’y a rien à reconstituer.",
      },
      {
        title: "Le programme se lit sans être demandé",
        body: "Les horaires, les points de rendez-vous et les adresses vivent dans l’événement. Chacun regarde, au lieu d’écrire à la personne qui sait.",
      },
      {
        title: "L’album se remplit pendant, pas après",
        body: "Les photos arrivent au fil des jours, depuis tous les téléphones. C’est la seule fenêtre où un groupe les dépose vraiment.",
      },
    ],
    compareTitle: "Huit boîtes mail, ou un dossier commun",
    compareLede:
      "Un voyage de groupe se perd rarement sur les grandes décisions. Il se perd sur ce que personne ne retrouve au moment précis où il en a besoin.",
    compareBefore: "Avec une conversation et des mails",
    compare: [
      {
        need: "Sortir un billet à l’embarquement",
        before: "Il faut retrouver le mail de la personne qui a réservé, ou le lui demander.",
        after: "Le document est dans l’événement : chacun l’ouvre depuis son propre téléphone.",
      },
      {
        need: "Savoir combien on en est",
        before: "Quatre personnes ont avancé quatre choses, sans total commun.",
        after: "Chaque avance est saisie et datée ; le solde du groupe est à jour en permanence.",
      },
      {
        need: "Consulter le programme",
        before: "Une note privée, recopiée en capture d’écran dans le fil.",
        after: "Un planning partagé et modifiable, avec les heures et les adresses.",
      },
      {
        need: "Tenir un groupe de quinze",
        before: "Le fil devient illisible et les décisions se prennent en sous-groupes.",
        after: "Un espace structuré où chaque sujet a sa place, quel que soit le nombre.",
      },
      {
        need: "Retrouver le voyage un an après",
        before: "Le fil a défilé et les photos sont restées sur huit pellicules.",
        after: "L’événement reste ouvert : comptes, documents, programme et album.",
      },
    ],
    modulesTitle: "Ce que chaque module fait pendant le voyage",
    modulesLede: "Un voyage mobilise presque tout, du premier virement au dernier souvenir.",
    modules: ["documents", "budget", "planning", "chat", "img"],
    moduleNotes: {
      documents: "Billets, confirmations, attestation d’assurance, copies des pièces d’identité. Le groupe entier y accède, pas seulement la personne qui a réservé.",
      budget: "Des avances étalées sur plusieurs mois, saisies datées et attribuées. Au retour, le solde est déjà fait.",
      planning: "Les temps forts, les heures et les adresses. Chacun regarde plutôt que d’écrire à la personne qui sait.",
      chat: "La discussion du voyage, à côté de ce dont elle parle : le vol, le logement, l’addition du soir.",
      img: "L’album, ouvert dès le jour du départ. Les photos arrivent pendant, quand le groupe les prend encore.",
    },
    faq: [
      {
        q: "Est-ce que ça marche sans réseau, à l’étranger ?",
        a: "Nous ne promettons pas un mode hors ligne complet au lancement. La consigne qui marche partout : télécharge tes billets sur ton téléphone avant de partir, en plus de les déposer dans l’événement pour le reste du groupe.",
      },
      {
        q: "Peut-on gérer un voyage à quinze ?",
        a: "Oui. Plus le groupe est grand, plus l’écart se creuse avec une conversation classique : c’est à quinze que les décisions se perdent et que les comptes deviennent illisibles.",
      },
      {
        q: "Que se passe-t-il après le voyage ?",
        a: "L’événement reste consultable : les comptes soldés, les documents, le programme et l’album. C’est précisément ce qu’un fil de discussion ne rend pas au bout de six mois.",
      },
      {
        q: "Comment organiser le voyage en attendant l’ouverture ?",
        a: `Notre guide pour organiser un voyage entre amis donne la méthode complète, avec les fourchettes de budget par personne et par format, applicable dès aujourd’hui. Yatu ouvre le ${LAUNCH_LABEL} et les inscrits sont prévenus le jour même.`,
      },
    ],
    counterpart: {
      slug: "organiser-un-voyage-entre-amis",
      kicker: "Avant même d’installer quoi que ce soit",
      label: "la méthode complète pour organiser un voyage",
      body: "Où poser le plafond avant de choisir la destination, combien prévoir par personne selon le format, dans quel ordre réserver et qui doit être référent de quoi. Le rétroplanning sur quatre mois, applicable tout de suite.",
    },
    related: [
      "organiser-un-voyage-entre-amis",
      "application-partage-depenses-entre-amis",
      "organiser-un-week-end-au-ski",
    ],
  },

];

/** The occasion guides only - what /organiser lists and what the footer links. */
export const GUIDE_PAGES = LANDING_PAGES.filter((page) => page.kind === "guide");

/** The "application pour X" pages, linked from the footer's product column. */
export const APP_PAGES = LANDING_PAGES.filter((page) => page.kind === "app");

/** The /organiser index - the hub every guide links back to. */
export const LANDING_INDEX_PATH = "/organiser";

export const landingBySlug = (slug: string) =>
  LANDING_PAGES.find((page) => page.slug === slug) ?? null;

/** Site-relative path of a guide. */
export const landingPath = (slug: string) => `/${slug}`;
