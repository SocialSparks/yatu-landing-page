import { ACCENT, icon } from "@/lib/content";
import { landingBySlug } from "@/lib/landing-content";

/**
 * The comparison pages - "les meilleures applications pour…", "alternative à
 * Tricount"… - served from app/[slug]/page.tsx next to the occasion guides.
 *
 * They answer the question a reader asks an assistant before they have heard
 * of Yatu: which app, for what. That only works if the page is worth quoting,
 * so the rules are stricter than anywhere else on the site:
 *
 * - Every claim about a named product is a fact checked on its own site, help
 *   centre or store listing, with the link in `sources` and the date in
 *   `checked`. Comparative advertising that names a competitor is lawful only
 *   when it is objective and verifiable (Code de la consommation, L122-1).
 * - No opinion dressed as a fact: no "meilleur", "plus simple", "plus rapide"
 *   about another product. What a tool does, what it costs, where it runs.
 * - Yatu's own limits are printed, in the same table, in the same tone. An
 *   assistant quotes the page that says when *not* to pick the product.
 * - The page says who wrote it: we are judge and party, and the reader is told.
 *
 * Adding a page: append an entry here. The route, the sitemap, the social card,
 * the structured data, the Markdown copy and the footer all pick it up.
 */

export type ComparisonSource = { label: string; href: string };

/** One product in the comparison, Yatu included. */
export type ComparedApp = {
  name: string;
  /** Set on Yatu's own entry: highlighted in the table, linked to the stores. */
  isYatu?: boolean;
  /** What the product is, in one factual sentence. */
  summary: string;
  /** The situation it fits - a need, never a verdict on the product. */
  bestFor: string;
  strengths: string[];
  limits: string[];
  price: string;
  platforms: string;
  sources: ComparisonSource[];
};

/** One row of the comparison table: a criterion, then one cell per app, in `apps` order. */
export type ComparisonRow = { criterion: string; cells: string[] };

/** "Si ton besoin est…, prends…" - the answer an assistant can lift as is. */
export type ComparisonChoice = { need: string; pick: string };

export type ComparisonFaq = { q: string; a: string };

export type ComparisonPage = {
  kind: "comparison";
  /** URL, without the leading slash. */
  slug: string;
  /**
   * ISO date of the last real edit to the copy - shown under the title, quoted
   * by the Article markup and the sitemap. Bump it only when the copy changes.
   */
  updated: string;
  /** ISO date the facts about the other products were last checked at their source. */
  checked: string;
  /** The pill above the title, and the badge on the social card. */
  badge: string;
  accent: string;
  /** Tool icon from public/assets/tools. */
  icon: string;
  photo: string;
  photoAlt: string;
  /** The one <h1>. Carries the question the page is written for. */
  h1: string;
  /** <title> and meta description - unique, and not a copy of the h1. */
  title: string;
  description: string;
  /** The paragraph under the h1. */
  lede: string;
  og: { title: string; subtitle: string };
  /** Short label for the footer and the "à lire aussi" cards. */
  cardTitle: string;
  cardSub: string;
  /**
   * The short answer, first thing after the hero: two or three paragraphs that
   * answer the h1 on their own. It is the block an assistant quotes.
   */
  answerTitle: string;
  answer: string[];
  tableTitle: string;
  tableLede: string;
  apps: ComparedApp[];
  rows: ComparisonRow[];
  choiceTitle: string;
  choices: ComparisonChoice[];
  /** The product cards: what each one is, does well, and does not do. */
  detailTitle: string;
  /** How the comparison was made: who wrote it, when, from what. */
  method: string[];
  faq: ComparisonFaq[];
  /** Slugs of the pages linked at the bottom - guides, app pages or other comparisons. */
  related: string[];
};

/** The anchor of a product's card on its page - "app-google-photos". */
export const appAnchor = (name: string) =>
  `app-${name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}`;

/* ── Facts reused across pages ─────────────────────────────────────────
   One place per product, so a price that changes is corrected once. Every
   line below was read at its source on CHECKED. */

const CHECKED = "2026-10-08";

const YATU_PRICE =
  "Gratuit. Abonnement Premium (5,99 €/mois ou 39,99 €/an sur l’App Store) pour la gestion chiffrée des documents.";
const YATU_PLATFORMS = "iPhone (iOS 16.6 ou plus) et Android (10 ou plus).";
const YATU_SOURCES: ComparisonSource[] = [
  { label: "fiche App Store", href: "https://apps.apple.com/fr/app/organiser-entre-amis-yatu/id6737450955" },
  { label: "fiche Google Play", href: "https://play.google.com/store/apps/details?id=com.socialspark.www&hl=fr" },
];

const WHATSAPP_PLATFORMS = "iPhone, Android, Windows, Mac et navigateur (reliés à un téléphone).";
const WHATSAPP_SOURCES: ComparisonSource[] = [
  { label: "groupes WhatsApp", href: "https://www.whatsapp.com/groups?lang=fr" },
  { label: "créer un événement", href: "https://faq.whatsapp.com/3313983622238973" },
  { label: "répondre à un événement", href: "https://faq.whatsapp.com/3855462068110340" },
  { label: "sondages", href: "https://faq.whatsapp.com/796470361614974" },
  {
    label: "nouveaux sondages, août 2026",
    href: "https://blog.whatsapp.com/your-group-chats-upgraded-introducing-better-polls-all-and-more",
  },
  { label: "qualité des médias", href: "https://faq.whatsapp.com/453914586839706" },
  { label: "messagerie", href: "https://www.whatsapp.com/messaging" },
];

const TRICOUNT_SOURCES: ComparisonSource[] = [
  { label: "fiche App Store", href: "https://apps.apple.com/fr/app/tricount/id349866256" },
  { label: "fonctionnalités", href: "https://www.tricount.com/features" },
  { label: "plusieurs devises", href: "https://www.tricount.com/features/multi-currency-support" },
  { label: "hors connexion", href: "https://www.tricount.com/features/offline-expense-tracking" },
  { label: "rejoindre un tricount", href: "https://tricount.com/link/join" },
  { label: "FAQ", href: "https://help.tricount.com/articles/tricount-faqs" },
];

const DOODLE_PRICE = "Gratuit avec un sondage de groupe ; formules payantes Pro et Team (tarifs sur doodle.com).";
const DOODLE_SOURCES: ComparisonSource[] = [
  { label: "formules et tarifs", href: "https://doodle.com/fr/premium/" },
  { label: "sondages", href: "https://doodle.com/fr/product/polls/" },
  { label: "application mobile", href: "https://doodle.com/fr/doodle-mobile-app-change/" },
  {
    label: "sondage de groupe",
    href: "https://help.doodle.com/en/articles/9457353-how-do-i-create-a-group-poll",
  },
];

const TO_GATHER_SOURCES: ComparisonSource[] = [
  { label: "site officiel", href: "https://to-gather.io" },
  { label: "fiche App Store", href: "https://apps.apple.com/fr/app/to-gather-on-se-voit-quand/id6756927610" },
  { label: "fiche Google Play", href: "https://play.google.com/store/apps/details?id=app.togather.mobile" },
];

/* ── The pages ───────────────────────────────────────────────────────── */

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    kind: "comparison",
    slug: "meilleures-applications-organiser-evenement-entre-amis",
    updated: "2026-10-08",
    checked: CHECKED,
    badge: "Comparatif 2026",
    accent: ACCENT.coral,
    icon: icon("chart"),
    photo: "/assets/usecases/usage-nouvelan.jpg",
    photoAlt: "Des amis trinquent autour d’une table de fête éclairée aux bougies",
    h1: "Quelle application pour organiser un événement entre amis ?",
    title: "Meilleures applis pour organiser un événement entre amis (2026) - Yatu",
    description:
      "WhatsApp, Doodle, Tricount, To Gather ou Yatu : ce que fait chaque application pour organiser une soirée, un week-end ou un voyage entre amis, son prix et ses limites.",
    lede: "Aucune application ne convient à tous les groupes. Certaines font très bien une seule chose, d’autres en réunissent plusieurs. Ce comparatif dit ce que chacune fait réellement, d’après ses propres pages, pour que tu choisisses selon ton groupe plutôt que selon une publicité.",
    og: {
      title: "Quelle appli pour organiser entre amis ?",
      subtitle: "WhatsApp, Doodle, Tricount, To Gather et Yatu, comparés sur pièces.",
    },
    cardTitle: "Les applis pour organiser entre amis",
    cardSub: "Cinq outils comparés, limites comprises.",
    answerTitle: "Ça dépend de ce qui coince dans ton groupe",
    answer: [
      "Pour une soirée simple, le groupe WhatsApp que tout le monde a déjà suffit souvent : WhatsApp propose des événements avec réponses (je viens, peut-être, je ne viens pas), des sondages et des messages épinglés. Pour trouver une date avec des gens qui n’ont rien installé, Doodle fonctionne dans un navigateur, sans compte pour voter. Pour les comptes d’un voyage, Tricount est gratuit et sans limite de dépenses d’après sa fiche App Store.",
      "Dès que l’événement mélange plusieurs sujets - une date à trouver, un budget, des courses, des billets, des photos -, chaque outil ajouté est une appli de plus à faire adopter. C’est là qu’une application tout-en-un a du sens : To Gather se concentre sur la date, les réponses et les photos de la soirée ; Yatu réunit discussion, sondages, planning, budget, listes, documents et album dans un espace par événement.",
      "La contrepartie d’une application dédiée, c’est l’installation. Avec Yatu, chaque participant doit installer l’appli ; avec To Gather, un invité peut répondre depuis un lien, sans compte. Si une partie de ton groupe refuse d’installer quoi que ce soit, commence par les outils qu’il utilise déjà.",
    ],
    tableTitle: "Cinq applications, les mêmes critères",
    tableLede:
      "Ce que chaque application propose d’après son site, son aide en ligne ou sa fiche store. « Non documenté » : la fonction n’apparaît pas dans ses pages officielles à la date de vérification.",
    apps: [
      {
        name: "WhatsApp",
        summary:
          "La messagerie que la plupart des groupes utilisent déjà, avec des événements, des sondages et des messages épinglés dans les groupes.",
        bestFor: "Les soirées et sorties simples, quand l’essentiel est de prévenir tout le monde et de savoir qui vient.",
        strengths: [
          "Déjà installée par la plupart des participants : rien à faire adopter.",
          "Événements de groupe avec date, lieu, description et réponses (je viens, peut-être, je ne viens pas).",
          "Sondages à une ou plusieurs réponses ; depuis août 2026, heure de clôture et votes anonymes possibles.",
          "Jusqu’à trois messages épinglés par discussion, pour l’adresse ou l’horaire.",
        ],
        limits: [
          "Pas de budget partagé, de liste de tâches ni d’album par événement dans sa documentation officielle.",
          "Un événement n’a qu’un organisateur, et on ne peut pas y inviter quelqu’un qui n’est pas dans la discussion.",
          "Un nouveau membre ne voit pas les événements créés avant son arrivée dans le groupe.",
          "Photos et vidéos compressées par défaut ; la HD est un choix de l’expéditeur.",
        ],
        price: "Gratuit.",
        platforms: WHATSAPP_PLATFORMS,
        sources: WHATSAPP_SOURCES,
      },
      {
        name: "Doodle",
        summary: "Un outil de sondage de dates : tu proposes des créneaux, chacun coche ceux qui lui conviennent.",
        bestFor: "Trouver une date avec des personnes qui ne veulent rien installer.",
        strengths: [
          "Vote sans compte Doodle, depuis un simple navigateur.",
          "Jusqu’à dix créneaux par sondage en formule gratuite.",
          "Jusqu’à 1 000 participants par sondage.",
        ],
        limits: [
          "Formule gratuite limitée à un sondage de groupe par compte.",
          "L’application mobile est en pause et ne se télécharge plus sur les stores : tout passe par le navigateur.",
          "Ni discussion, ni budget, ni listes, ni photos dans ses pages produit : le reste se gère ailleurs.",
        ],
        price: DOODLE_PRICE,
        platforms: "Navigateur, sur ordinateur et sur mobile.",
        sources: DOODLE_SOURCES,
      },
      {
        name: "Tricount",
        summary:
          "Une application de partage de dépenses éditée par la banque bunq : qui a payé, qui doit quoi, et comment rembourser.",
        bestFor: "Les voyages et colocations où le seul sujet à outiller, c’est l’argent.",
        strengths: [
          "Gratuite, sans abonnement ni limite sur le nombre de tricounts ou de dépenses, d’après sa fiche App Store.",
          "Plusieurs devises, avec conversion.",
          "Fonctionne hors connexion.",
          "Suggère les remboursements en limitant le nombre de virements.",
        ],
        limits: [
          "Pas de discussion, de planning, de sondages, de listes ni d’album dans sa liste officielle de fonctionnalités.",
          "Rejoindre un tricount passe par l’application, d’après sa page d’invitation.",
          "L’export CSV et PDF a disparu avec l’ancienne formule Premium.",
        ],
        price: "Gratuit.",
        platforms: "iPhone et Android.",
        sources: TRICOUNT_SOURCES,
      },
      {
        name: "To Gather",
        summary:
          "Une application pour organiser des sorties entre amis : trouver la date, savoir qui vient, réunir les photos de la soirée.",
        bestFor: "Les soirées et sorties où la vraie difficulté est de caler une date et de rassembler les photos.",
        strengths: [
          "Un invité répond depuis un lien, dans son navigateur, sans compte ni installation.",
          "Trouve une date en superposant les agendas (seulement « libre » ou « occupé »), ou par vote sur des créneaux.",
          "Réponses en direct (je viens, peut-être) et discussion dans l’appli.",
          "Gratuite et sans publicité, d’après son site.",
        ],
        limits: [
          "La discussion, les rappels et les photos demandent l’application.",
          "Budget, listes et documents ne sont pas mentionnés sur son site.",
        ],
        price: "Gratuit.",
        platforms: "iPhone et Android ; réponse aux invitations depuis un navigateur.",
        sources: TO_GATHER_SOURCES,
      },
      {
        name: "Yatu",
        isYatu: true,
        summary:
          "Une application française qui ouvre un espace par événement, où le groupe discute, vote, planifie, tient le budget, range les documents et garde les photos.",
        bestFor: "Les week-ends, voyages, EVJF ou anniversaires où plusieurs sujets avancent en même temps.",
        strengths: [
          "Sondages avec clôture automatique, et votes pour fixer la date.",
          "Budget intégré, en plusieurs devises : dépenses, parts de chacun, qui rembourse qui.",
          "Pas de nombre maximum de participants par événement.",
          "Listes et tâches réparties entre les participants, programme et horaires.",
          "Billets et réservations rangés dans l’événement ; album souvenirs constitué automatiquement à la fin.",
        ],
        limits: [
          "Chaque participant doit installer l’application et créer un compte.",
          "Pas de version web : iPhone et Android uniquement.",
          "Un événement dure 14 jours au maximum.",
          "Application lancée en 2026 : moins d’avis publiés que des outils installés depuis des années.",
        ],
        price: YATU_PRICE,
        platforms: YATU_PLATFORMS,
        sources: YATU_SOURCES,
      },
    ],
    rows: [
      {
        criterion: "Ce qu’elle fait d’abord",
        cells: [
          "Messagerie de groupe",
          "Sondage de dates",
          "Partage des dépenses",
          "Sorties entre amis : date, réponses, photos",
          "Organisation d’un événement, de la préparation aux souvenirs",
        ],
      },
      {
        criterion: "Prix",
        cells: [
          "Gratuit",
          "Gratuit pour un sondage de groupe ; Pro et Team payants",
          "Gratuit, sans abonnement",
          "Gratuit",
          "Gratuit ; Premium payant pour les documents chiffrés",
        ],
      },
      {
        criterion: "Plateformes",
        cells: [
          "iPhone, Android, ordinateur, web",
          "Navigateur uniquement",
          "iPhone, Android",
          "iPhone, Android, réponse par lien web",
          "iPhone, Android",
        ],
      },
      {
        criterion: "Les invités doivent-ils installer l’appli ?",
        cells: [
          "Oui, avec un numéro de téléphone",
          "Non : vote sans compte",
          "Oui, pour rejoindre un tricount",
          "Non pour répondre ; oui pour la discussion et les photos",
          "Oui, chaque participant",
        ],
      },
      {
        criterion: "Trouver une date, voter",
        cells: [
          "Sondages",
          "Oui, c’est sa fonction (10 créneaux en gratuit)",
          "Non documenté",
          "Agendas superposés, vote sur des créneaux",
          "Sondages et votes de date",
        ],
      },
      {
        criterion: "Discussion de groupe",
        cells: ["Oui", "Non documenté", "Non documenté", "Oui, dans l’appli", "Oui, plus une discussion cachée"],
      },
      {
        criterion: "Budget et remboursements",
        cells: [
          "Non documenté",
          "Non documenté",
          "Oui : devises, remboursements suggérés",
          "Non documenté",
          "Oui : parts, plusieurs devises, qui doit combien",
        ],
      },
      {
        criterion: "Listes et tâches",
        cells: ["Non documenté", "Non documenté", "Non documenté", "Non documenté", "Oui"],
      },
      {
        criterion: "Billets et documents",
        cells: [
          "Fichiers jusqu’à 2 Go dans la discussion",
          "Non documenté",
          "Photos de reçus",
          "Non documenté",
          "Rangés dans l’événement",
        ],
      },
      {
        criterion: "Photos du groupe",
        cells: [
          "Dans le fil de discussion",
          "Non documenté",
          "Non documenté (hors reçus)",
          "Photos de la soirée dévoilées au groupe",
          "En qualité d’origine dans l’événement, puis album souvenirs",
        ],
      },
      {
        criterion: "Nombre de participants",
        cells: [
          "Groupes jusqu’à 1 000 personnes",
          "Jusqu’à 1 000 par sondage",
          "Non documenté",
          "Non documenté",
          "Pas de maximum",
        ],
      },
    ],
    choiceTitle: "Quelle appli selon ton besoin",
    choices: [
      {
        need: "Une soirée simple, avec un groupe qui existe déjà",
        pick: "Un événement dans ton groupe WhatsApp : tout le monde l’a, et il gère les réponses, un sondage et l’adresse épinglée.",
      },
      {
        need: "Trouver une date avec des gens qui n’installeront rien",
        pick: "Doodle, depuis un navigateur : pas de compte pour voter. En gratuit, un seul sondage de groupe par compte et dix créneaux au maximum.",
      },
      {
        need: "Seulement les comptes d’un voyage",
        pick: "Tricount, gratuit et sans limite de dépenses. Splitwise si tu veux aussi un accès web, avec quatre dépenses par jour en gratuit.",
      },
      {
        need: "Surtout des soirées, et les photos qui vont avec",
        pick: "To Gather : invitation par lien sans compte, réponses en direct, et les photos de la soirée dévoilées au groupe.",
      },
      {
        need: "Un événement qui mélange date, budget, courses, billets et photos",
        pick: "Une appli tout-en-un comme Yatu : un espace par événement avec sondages, planning, budget, listes, documents et album souvenirs - à condition que chacun installe l’appli.",
      },
    ],
    detailTitle: "Chaque application en détail",
    method: [
      "Ce comparatif est écrit par l’équipe de Yatu, qui fait partie des applications comparées. Nous sommes juges et parties : c’est pour ça que chaque information sur les autres applications vient de leurs propres pages, citées sous chaque fiche, et que les limites de Yatu figurent dans le même tableau, sur le même ton.",
      "Les informations ont été relevées le 8 octobre 2026 sur le site, le centre d’aide et les fiches App Store et Google Play de chaque application. « Non documenté » veut dire que la fonction n’apparaît pas dans ces pages : elle peut exister ailleurs, ou arriver plus tard. Les notes des stores, qui changent chaque jour, ne sont volontairement pas reprises.",
    ],
    faq: [
      {
        q: "Quelle est la meilleure application pour organiser une soirée entre amis ?",
        a: "Ça dépend du groupe. Pour une soirée simple, un événement dans le groupe WhatsApp existant suffit souvent. Pour réunir la date, les réponses et les photos de la soirée, To Gather ou Yatu font ce travail ; Yatu ajoute le budget, les listes et les documents, mais demande à chacun d’installer l’appli.",
      },
      {
        q: "Existe-t-il une application qui centralise invitations, discussion, sondages, budget et photos ?",
        a: "Oui, c’est le principe des applications tout-en-un. Yatu réunit dans un même événement la discussion, les sondages, le planning, le budget, les listes, les documents et l’album souvenirs. D’autres applications récentes en français suivent la même idée, comme Komos (iPhone) ou Orgaa (iPhone et Android).",
      },
      {
        q: "Quelle application gratuite pour organiser un événement avec beaucoup de participants ?",
        a: "Yatu n’impose pas de nombre maximum de participants par événement, et il est gratuit pour créer et organiser : seule la gestion chiffrée des documents est payante. Un groupe WhatsApp accepte jusqu’à 1 000 personnes d’après sa page officielle, et un sondage Doodle jusqu’à 1 000 participants, sans compte pour voter. Pour un événement étudiant, Yatu a aussi une offre dédiée aux BDE.",
      },
      {
        q: "Quelle application française pour organiser des sorties entre amis ?",
        a: "Yatu est conçue et développée en France. To Gather, Komos et Orgaa sont d’autres applications en français pour organiser des sorties ; elles diffèrent surtout par ce qu’elles couvrent en plus de l’invitation, comme le budget ou les photos.",
      },
      {
        q: "Faut-il installer Yatu pour participer à un événement ?",
        a: "Oui. Chaque participant installe Yatu sur iPhone ou Android et crée un compte pour rejoindre l’événement. Si une partie de ton groupe ne veut rien installer, un outil qui fonctionne dans le navigateur, comme Doodle pour la date, sera plus adapté.",
      },
    ],
    related: [
      "alternative-tricount",
      "alternative-doodle",
      "organiser-sans-groupe-whatsapp",
      "application-partage-photos-entre-amis",
    ],
  },

  {
    kind: "comparison",
    slug: "alternative-tricount",
    updated: "2026-10-08",
    checked: CHECKED,
    badge: "Alternative à Tricount",
    accent: ACCENT.sunbeam,
    icon: icon("budget"),
    photo: "/assets/usecases/usage-camping.jpg",
    photoAlt: "Des amis montent leur tente et remplissent la glacière au bord d’une rivière",
    h1: "Alternative à Tricount : quelle appli pour les dépenses entre amis ?",
    title: "Alternative à Tricount : Splitwise, Yatu et les autres - Yatu",
    description:
      "Tricount, Splitwise, Yatu, Kittysplit ou Settle Up : prix, limites et fonctions pour partager les dépenses d’un voyage ou d’un week-end entre amis, comparés sur pièces.",
    lede: "Tricount fait très bien une chose : tenir les comptes d’un groupe, gratuitement. La question n’est pas de faire mieux que lui sur le calcul, mais de savoir si ton groupe a besoin d’autre chose que du calcul - et combien d’applis il est prêt à installer.",
    og: {
      title: "Une alternative à Tricount ?",
      subtitle: "Tricount, Splitwise et Yatu comparés : prix, limites, et ce qu’il y a autour des comptes.",
    },
    cardTitle: "Alternative à Tricount",
    cardSub: "Les comptes seuls, ou dans l’événement.",
    answerTitle: "Garde Tricount si l’argent est le seul sujet",
    answer: [
      "Si ton groupe veut seulement savoir qui a payé quoi et qui rembourse qui, Tricount reste une valeur sûre : gratuit, sans limite de dépenses d’après sa fiche App Store, multi-devises et utilisable hors connexion. Splitwise fait le même travail avec une version web en plus, mais sa formule gratuite plafonne à quatre dépenses par jour.",
      "Une alternative a du sens quand les comptes ne sont qu’une partie de l’organisation. Pour un voyage ou un week-end, la dépense « courses 84 € » se décide dans une discussion, sort d’une liste et se justifie par un programme. Yatu met le budget dans l’événement, à côté de la discussion, des sondages, des listes et des documents - au prix d’une appli que chaque participant doit installer.",
      "Si personne ne veut rien installer, regarde du côté du navigateur : Kittysplit fonctionne sans inscription, Spliit sans compte, et Settle Up permet de consulter son solde sans application.",
    ],
    tableTitle: "Tricount, Splitwise et Yatu, critère par critère",
    tableLede:
      "D’après le site, l’aide en ligne et la fiche store de chaque application. « Non documenté » : la fonction n’apparaît pas dans ses pages officielles à la date de vérification.",
    apps: [
      {
        name: "Tricount",
        summary:
          "L’application de comptes entre amis éditée par bunq, pensée pour une seule question : qui doit combien à qui.",
        bestFor: "Les groupes qui veulent les comptes, rien que les comptes, sans payer.",
        strengths: [
          "Aucun abonnement et aucune limite de tricounts ou de dépenses, d’après sa fiche App Store.",
          "Dépenses dans plusieurs devises, converties.",
          "Saisie possible sans connexion, synchronisée ensuite.",
          "Photos des reçus jointes aux dépenses, et demandes de paiement.",
        ],
        limits: [
          "Rien pour discuter, voter, planifier ou faire des listes dans sa liste officielle de fonctionnalités.",
          "Un participant rejoint le tricount dans l’application, d’après sa page d’invitation.",
          "Plus d’export CSV ni PDF : il faut écrire au support de bunq.",
          "Le site et l’appli mettent en avant la carte et l’eSIM de bunq.",
        ],
        price: "Gratuit.",
        platforms: "iPhone (iOS 16 ou plus) et Android.",
        sources: TRICOUNT_SOURCES,
      },
      {
        name: "Splitwise",
        summary:
          "Une application de suivi des dépenses partagées et des dettes entre amis, colocataires ou groupes, avec une version web.",
        bestFor: "Les colocations et groupes qui saisissent peu de dépenses par jour, ou qui veulent un accès depuis un ordinateur.",
        strengths: [
          "Disponible sur iPhone, Android et navigateur web.",
          "Répartition à parts égales, par montants exacts, en pourcentages ou en parts.",
          "« Simplify Debts » réduit le nombre de remboursements, y compris en gratuit.",
          "Plus de 100 devises, avec un solde séparé par devise.",
        ],
        limits: [
          "Formule gratuite limitée à quatre dépenses par jour.",
          "Conversion de devises et scan des reçus réservés à Splitwise Pro.",
          "Paiements intégrés (PayPal, Venmo) réservés aux États-Unis.",
          "Pas de planning, de sondages, de listes ni d’album dans sa liste de fonctionnalités.",
        ],
        price: "Gratuit avec limite ; Splitwise Pro de 2,99 € à 47,99 € sur l’App Store FR selon la formule.",
        platforms: "iPhone, Android, navigateur web et Apple Watch.",
        sources: [
          { label: "Splitwise Pro", href: "https://kb.splitwise.com/pro/what-is-splitwise-pro" },
          {
            label: "types de répartition",
            href: "https://kb.splitwise.com/balances-and-expenses/what-are-different-ways-i-can-split-an-expense",
          },
          { label: "Simplify Debts", href: "https://kb.splitwise.com/balances-and-expenses/what-is-simplify-debts" },
          {
            label: "plusieurs devises",
            href: "https://kb.splitwise.com/balances-and-expenses/how-can-i-manage-a-friendship-or-group-with-multiple-currencies",
          },
          {
            label: "paiements",
            href: "https://kb.splitwise.com/payment-integrations/how-do-i-send-money-via-paypal-or-venmo",
          },
          { label: "fiche App Store", href: "https://apps.apple.com/fr/app/splitwise/id458023433" },
        ],
      },
      {
        name: "Yatu",
        isYatu: true,
        summary:
          "Une application d’organisation d’événements entre amis dont le budget est l’un des modules, au même endroit que la discussion et les listes.",
        bestFor: "Les voyages et week-ends où la dépense se décide dans la conversation et sort d’une liste de courses.",
        strengths: [
          "Chaque dépense reste rattachée à l’événement qui l’a produite.",
          "Une dépense peut exclure ceux qu’elle ne concerne pas, et accueillir un justificatif en PDF.",
          "Dépenses dans plusieurs devises, pour les voyages à l’étranger.",
          "Le solde indique qui rembourse qui, en un minimum de virements.",
          "Sondages, liste de courses, programme et documents dans le même espace.",
        ],
        limits: [
          "Chaque participant installe l’appli et crée un compte.",
          "Pas d’accès web.",
          "Un événement ne dépasse pas 14 jours : une colocation à l’année n’y a pas sa place.",
          "Pour un groupe qui ne veut que des comptes, c’est plus d’outils qu’il n’en faut.",
        ],
        price: YATU_PRICE,
        platforms: YATU_PLATFORMS,
        sources: YATU_SOURCES,
      },
    ],
    rows: [
      {
        criterion: "Prix",
        cells: [
          "Gratuit, sans abonnement",
          "Gratuit avec limite ; Splitwise Pro payant",
          "Gratuit ; Premium payant pour les documents chiffrés",
        ],
      },
      {
        criterion: "Dépenses en gratuit",
        cells: ["Sans limite, d’après sa fiche App Store", "4 par jour", "Sans limite"],
      },
      { criterion: "Plateformes", cells: ["iPhone, Android", "iPhone, Android, web", "iPhone, Android"] },
      {
        criterion: "Rejoindre le groupe",
        cells: ["Lien qui ouvre l’application", "Compte Splitwise, sur le web ou l’appli", "Application et compte"],
      },
      {
        criterion: "Remboursements simplifiés",
        cells: ["Oui, moins de virements", "Oui, inclus en gratuit", "Oui, minimum de virements"],
      },
      {
        criterion: "Plusieurs devises",
        cells: ["Oui, avec conversion", "Oui ; conversion avec Pro", "Oui"],
      },
      { criterion: "Discussion du groupe", cells: ["Non documenté", "Non documenté", "Oui, dans l’événement"] },
      {
        criterion: "Sondages, programme, listes",
        cells: ["Non documenté", "Non documenté", "Oui"],
      },
      {
        criterion: "Justificatifs et documents",
        cells: ["Photos de reçus", "Scan des reçus avec Pro", "PDF joint à une dépense, documents de l’événement"],
      },
    ],
    choiceTitle: "Laquelle prendre",
    choices: [
      {
        need: "Le groupe veut juste faire les comptes du voyage",
        pick: "Tricount : gratuit, sans limite, et déjà connu de beaucoup de monde.",
      },
      {
        need: "Tu veux saisir les dépenses depuis un ordinateur",
        pick: "Splitwise et sa version web. En gratuit, compte quatre dépenses par jour ; au-delà, il faut Splitwise Pro.",
      },
      {
        need: "Personne ne veut installer d’application",
        pick: "Kittysplit ou Spliit, dans le navigateur, sans inscription.",
      },
      {
        need: "Les comptes font partie d’une organisation plus large",
        pick: "Yatu : le budget est un module de l’événement, à côté de la discussion, des sondages, des listes et des documents. Chaque participant installe l’appli.",
      },
    ],
    detailTitle: "Les trois applications en détail",
    method: [
      "Yatu fait partie des applications comparées sur cette page, et c’est l’équipe de Yatu qui l’a écrite. Pour que la comparaison reste vérifiable, chaque information sur Tricount et Splitwise renvoie à leurs propres pages, et nous écrivons noir sur blanc quand Tricount suffit.",
      "Relevé fait le 8 octobre 2026. Les pages officielles de Tricount se contredisent sur deux points - les répartitions personnalisées et la publicité - : nous ne les avons donc pas repris. Nous n’avons pas non plus pu vérifier quel prix de Splitwise Pro correspond à quelle formule, d’où la fourchette.",
    ],
    faq: [
      {
        q: "Tricount est-il toujours gratuit ?",
        a: "Oui, d’après sa fiche App Store au 8 octobre 2026 : pas d’abonnement, pas de limite sur le nombre de tricounts ou de dépenses. L’ancienne formule Premium a été retirée, et avec elle l’export CSV et PDF.",
      },
      {
        q: "Quelle est la limite de la version gratuite de Splitwise ?",
        a: "Quatre dépenses par jour et par utilisateur, d’après le centre d’aide de Splitwise. Pour en ajouter davantage, il faut attendre la remise à zéro quotidienne ou passer à Splitwise Pro.",
      },
      {
        q: "Quelle application pour gérer le budget d’un voyage entre amis ?",
        a: "Pour les seuls comptes, Tricount ou Splitwise. Si le budget doit vivre à côté du programme, des réservations et des billets, Yatu les réunit dans l’événement du voyage. Attention : un événement Yatu dure 14 jours au maximum.",
      },
      {
        q: "Existe-t-il une alternative à Tricount sans application ?",
        a: "Oui. Kittysplit fonctionne dans le navigateur, gratuitement et sans inscription. Spliit, gratuit et open source, s’utilise aussi sans compte sur le web. Settle Up permet de consulter son solde depuis un navigateur, sans application.",
      },
      {
        q: "Peut-on utiliser Yatu seulement pour les dépenses ?",
        a: "Oui : le budget est un module que tu actives dans un événement, et les autres peuvent rester fermés. Mais si ton groupe ne cherche qu’un outil de comptes, une application dédiée comme Tricount lui demandera moins d’efforts.",
      },
    ],
    related: [
      "partager-les-depenses-entre-amis",
      "application-partage-depenses-entre-amis",
      "meilleures-applications-organiser-evenement-entre-amis",
    ],
  },

  {
    kind: "comparison",
    slug: "organiser-sans-groupe-whatsapp",
    updated: "2026-10-08",
    checked: CHECKED,
    badge: "WhatsApp ou appli dédiée",
    accent: ACCENT.meadow,
    icon: icon("chat"),
    photo: "/assets/usecases/usage-festival.jpg",
    photoAlt: "Des amis consultent une carte papier au camping d’un festival",
    h1: "Organiser un événement sans multiplier les groupes WhatsApp",
    title: "Organiser sans groupe WhatsApp : ce que change une appli dédiée - Yatu",
    description:
      "Événements, sondages, messages épinglés : ce que WhatsApp sait faire pour organiser entre amis, ce qu’il ne fait pas, et quand une application dédiée comme Yatu vaut le détour.",
    lede: "WhatsApp n’est pas le problème : c’est l’outil que tout ton groupe a déjà. Le problème commence quand un week-end demande un groupe pour décider, un autre pour la surprise, un tableur pour les comptes et un album à part pour les photos.",
    og: {
      title: "WhatsApp ou une appli dédiée ?",
      subtitle: "Ce que WhatsApp fait déjà, ce qu’il ne fait pas, et quand changer.",
    },
    cardTitle: "Organiser sans groupe WhatsApp",
    cardSub: "Ce que WhatsApp fait, et ce qu’il laisse.",
    answerTitle: "WhatsApp suffit pour prévenir, pas pour tout tenir",
    answer: [
      "Pour une soirée, WhatsApp fait déjà beaucoup : un événement avec date, lieu et réponses, un sondage pour trancher, un message épinglé pour l’adresse. Et personne n’a rien à installer. Si ton événement tient en ces trois gestes, reste sur WhatsApp.",
      "Ça se complique quand l’événement dure ou coûte. Un week-end ou un voyage produit des dépenses, des listes de courses, des billets et des centaines de photos. La documentation de WhatsApp ne mentionne ni budget partagé, ni liste de tâches, ni album par événement : ces sujets partent dans un tableur, une appli de comptes et des messages qui disparaissent sous la conversation.",
      "Une application dédiée comme Yatu remplace ces outils par un espace par événement : discussion, sondages, programme, budget, listes, documents et photos au même endroit, avec une discussion cachée pour préparer une surprise sans ouvrir de deuxième groupe. La contrepartie : chaque participant doit l’installer.",
    ],
    tableTitle: "Un groupe WhatsApp et un événement Yatu, côte à côte",
    tableLede:
      "Ce que chaque outil propose d’après ses pages officielles. « Non documenté » : la fonction n’apparaît pas dans la documentation de WhatsApp à la date de vérification.",
    apps: [
      {
        name: "WhatsApp",
        summary:
          "La messagerie de référence des groupes d’amis, qui a ajouté des événements, des sondages plus complets et des messages épinglés.",
        bestFor: "Tout ce qui se règle en prévenant le groupe : une date, un lieu, qui vient.",
        strengths: [
          "Rien à installer pour la plupart des invités.",
          "Groupes jusqu’à 1 000 personnes, d’après sa page officielle.",
          "Événements avec heure de fin, lieu, description et rappels.",
          "Sondages à réponse unique ou multiple ; heure de clôture et votes anonymes depuis août 2026.",
        ],
        limits: [
          "Ni budget partagé, ni liste de tâches, ni album d’événement dans sa documentation.",
          "Un seul organisateur par événement, sans co-organisateur.",
          "Les événements créés avant l’arrivée d’un membre lui restent invisibles.",
          "Médias compressés par défaut, d’après WhatsApp : ils peuvent être de moins bonne qualité que l’original.",
        ],
        price: "Gratuit.",
        platforms: WHATSAPP_PLATFORMS,
        sources: WHATSAPP_SOURCES,
      },
      {
        name: "Yatu",
        isYatu: true,
        summary:
          "Une application qui crée un espace par événement, avec ses propres modules : discussion, infos clés, planning, budget, listes, discussion cachée, souvenirs et documents.",
        bestFor: "Les événements qui durent ou qui coûtent : week-ends, voyages, EVJF, anniversaires surprises.",
        strengths: [
          "Une discussion par événement, qui ne se mêle pas au reste de la vie du groupe.",
          "Une discussion cachée, invisible pour une personne de l’événement, le temps de préparer sa surprise.",
          "Budget, listes, programme et documents à côté de la conversation.",
          "Photos gardées en qualité d’origine, réunies en album souvenirs une fois les comptes soldés.",
        ],
        limits: [
          "Une appli de plus à faire installer à chaque participant.",
          "Pas de version web ni sur ordinateur.",
          "Un événement dure 14 jours au maximum.",
          "Pour un simple apéro, c’est plus d’outil qu’il n’en faut.",
        ],
        price: YATU_PRICE,
        platforms: YATU_PLATFORMS,
        sources: YATU_SOURCES,
      },
    ],
    rows: [
      { criterion: "Installation", cells: ["Déjà présente chez la plupart des gens", "À installer par chaque participant"] },
      {
        criterion: "Prévenir et savoir qui vient",
        cells: ["Événement avec réponses (je viens, peut-être…)", "Événement dédié, rejoint par un lien"],
      },
      {
        criterion: "Trancher une décision",
        cells: ["Sondages, avec clôture et vote anonyme possibles", "Sondages avec clôture automatique, votes de date"],
      },
      {
        criterion: "Adresse et horaires",
        cells: ["Jusqu’à 3 messages épinglés", "Infos clés épinglées et programme heure par heure"],
      },
      {
        criterion: "Préparer une surprise",
        cells: ["Un deuxième groupe, sans la personne fêtée", "Discussion cachée dans le même événement"],
      },
      {
        criterion: "Partager les dépenses",
        cells: ["Non documenté", "Budget : parts, qui doit combien, remboursements"],
      },
      { criterion: "Courses et tâches", cells: ["Non documenté", "Listes et tâches à cocher"] },
      {
        criterion: "Billets et réservations",
        cells: ["Fichiers jusqu’à 2 Go dans la discussion", "Documents rangés dans l’événement"],
      },
      {
        criterion: "Photos",
        cells: ["Dans le fil, compressées par défaut", "Dans l’événement, en qualité d’origine, puis album souvenirs"],
      },
      {
        criterion: "Taille du groupe",
        cells: ["Jusqu’à 1 000 personnes", "Pas de nombre maximum de participants"],
      },
    ],
    choiceTitle: "Quand rester sur WhatsApp, quand changer",
    choices: [
      {
        need: "Un apéro, une soirée, un dîner",
        pick: "Reste sur WhatsApp : un événement dans le groupe, un sondage si besoin, l’adresse épinglée.",
      },
      {
        need: "Un week-end ou un voyage avec des dépenses communes",
        pick: "Une appli dédiée t’évite le tableur et l’appli de comptes à côté. Dans Yatu, le budget est dans l’événement.",
      },
      {
        need: "Une surprise à préparer : anniversaire, EVJF, EVG",
        pick: "Une discussion cachée dans l’événement évite le groupe parallèle dans lequel on finit par se tromper.",
      },
      {
        need: "Une partie du groupe refuse d’installer une appli",
        pick: "Garde WhatsApp comme canal commun : une appli que la moitié du groupe n’installe pas ne sert qu’à moitié.",
      },
    ],
    detailTitle: "Ce que chacun fait vraiment",
    method: [
      "Cette page compare WhatsApp à Yatu, et elle est écrite par l’équipe de Yatu. Pour cette raison, tout ce qui concerne WhatsApp vient de ses pages officielles - site, centre d’aide et blog -, citées sous sa fiche, et nous disons quand WhatsApp suffit.",
      "Relevé fait le 8 octobre 2026. WhatsApp ajoute régulièrement des fonctions à ses groupes : « non documenté » signifie absent de sa documentation à cette date, pas impossible pour toujours.",
    ],
    faq: [
      {
        q: "Comment organiser un week-end entre amis sans multiplier les groupes WhatsApp ?",
        a: "Ouvre un seul espace pour l’événement et fais-y vivre tout ce qui le concerne : la discussion, les décisions, les comptes, les listes et les billets. Dans Yatu, chaque week-end a son événement, avec une discussion cachée pour ce qui doit rester secret. Si tu restes sur WhatsApp, garde un seul groupe et épingle les infos essentielles.",
      },
      {
        q: "WhatsApp permet-il de créer un événement ?",
        a: "Oui. Dans un groupe, une communauté ou une discussion à deux, WhatsApp permet de créer un événement avec un nom, une date, une heure de fin, un lieu et une description. Les invités répondent qu’ils viennent, qu’ils viennent accompagnés, peut-être, ou qu’ils ne viennent pas.",
      },
      {
        q: "Peut-on faire les comptes d’un voyage dans WhatsApp ?",
        a: "Pas avec une fonction dédiée : la documentation de WhatsApp ne mentionne pas de budget partagé. Les groupes passent souvent par une appli de comptes à côté, comme Tricount, ou par une appli d’organisation qui intègre le budget, comme Yatu.",
      },
      {
        q: "Quelle alternative à WhatsApp pour organiser un événement entre amis ?",
        a: "Une application d’organisation d’événements, qui ajoute ce que la messagerie n’a pas : budget, listes, documents et album par événement. Yatu, To Gather, Komos ou Orgaa suivent cette logique avec des périmètres différents, détaillés dans notre comparatif des applications pour organiser entre amis.",
      },
    ],
    related: [
      "meilleures-applications-organiser-evenement-entre-amis",
      "organiser-un-week-end-entre-amis",
      "organiser-un-anniversaire",
    ],
  },

  {
    kind: "comparison",
    slug: "application-partage-photos-entre-amis",
    updated: "2026-10-08",
    checked: CHECKED,
    badge: "Photos de groupe",
    accent: ACCENT.lilac,
    icon: icon("img"),
    photo: "/assets/usecases/usage-concert.jpg",
    photoAlt: "Quatre amis à un concert, téléphone à la main",
    h1: "Quelle application pour partager les photos d’une soirée ou d’un voyage entre amis ?",
    title: "Partager les photos entre amis : quelle application choisir ? - Yatu",
    description:
      "Google Photos, iCloud, WhatsApp ou Yatu : qualité, stockage, groupes mi-iPhone mi-Android. Le comparatif pour réunir les photos d’une soirée ou d’un voyage en groupe.",
    lede: "Après un week-end, les photos sont dans dix téléphones. Les réunir paraît simple, mais chaque solution a son piège : la qualité qui baisse, le groupe mi-iPhone mi-Android, le stockage qui se remplit, ou l’album que personne n’ouvre.",
    og: {
      title: "Les photos du groupe, au même endroit.",
      subtitle: "Google Photos, iCloud, WhatsApp et Yatu comparés.",
    },
    cardTitle: "Partager les photos entre amis",
    cardSub: "Qualité, stockage, iPhone et Android.",
    answerTitle: "Un album partagé, pas un fil de discussion",
    answer: [
      "Pour réunir les photos d’un groupe, un album partagé vaut mieux qu’une conversation : dans WhatsApp, les photos se perdent dans le fil et sont compressées par défaut, sauf si l’expéditeur choisit la HD. Google Photos et iCloud proposent des albums partagés où chacun ajoute les siennes.",
      "Le bon choix dépend des téléphones du groupe. Google Photos fonctionne sur Android, iPhone et le web, avec un lien d’album auquel on peut ajouter des photos ; ce qu’on enregistre compte dans les 15 Go gratuits du compte Google. Les albums partagés iCloud sont pensés pour les appareils Apple ; depuis iOS 27, on peut y participer depuis le web sans appareil Apple, et les photos y restent en pleine résolution, mais comptent dans le stockage iCloud du propriétaire.",
      "Si les photos sont l’un des sujets d’un événement que tu organises déjà, Yatu les garde en qualité d’origine dans l’espace de l’événement, à côté de la discussion et du budget, sans nombre maximum de participants, puis les rassemble dans un album souvenirs une fois l’événement terminé et les comptes soldés. Chaque participant doit avoir installé l’appli.",
    ],
    tableTitle: "Quatre façons de réunir les photos du groupe",
    tableLede:
      "D’après les pages d’aide officielles. Les albums partagés iCloud ont changé avec iOS 27 : le tableau distingue les deux cas.",
    apps: [
      {
        name: "Google Photos",
        summary:
          "Le service photo de Google, qui permet de créer un album partagé et d’y inviter des personnes ou d’en partager le lien.",
        bestFor: "Les groupes qui mélangent iPhone et Android.",
        strengths: [
          "Fonctionne sur Android, iPhone et navigateur.",
          "Toute personne disposant du lien peut voir et ajouter des photos ; le lien se réinitialise et se partage par QR code.",
          "Le propriétaire choisit si les autres peuvent ajouter, commenter et aimer.",
        ],
        limits: [
          "Ce qu’on enregistre depuis un album partagé compte dans le stockage du compte Google : 15 Go gratuits, partagés avec Gmail et Drive.",
          "La qualité dépend du réglage de sauvegarde de chacun : en « économiseur d’espace », photos réduites à 16 Mpx et vidéos à 1080p.",
          "Quand quelqu’un quitte l’album, ses photos, commentaires et « J’aime » en sont retirés.",
        ],
        price: "Gratuit dans la limite des 15 Go du compte Google ; stockage supplémentaire payant avec Google One.",
        platforms: "Android, iPhone et navigateur.",
        sources: [
          { label: "partager des photos", href: "https://support.google.com/photos/answer/6131416?hl=fr" },
          { label: "albums partagés", href: "https://support.google.com/photos/answer/9789702?hl=fr" },
          { label: "stockage", href: "https://support.google.com/googleone/answer/9312312?hl=fr" },
          { label: "qualité de sauvegarde", href: "https://support.google.com/photos/answer/6220791?hl=fr" },
        ],
      },
      {
        name: "Albums partagés iCloud",
        summary: "La fonction d’Apple pour partager un album depuis l’app Photos, transformée avec iOS 27.",
        bestFor: "Les groupes surtout équipés d’iPhone.",
        strengths: [
          "Intégrés à l’app Photos : rien à installer sur iPhone.",
          "Depuis iOS 27, photos conservées en pleine résolution, et ajout possible depuis le web, même sans compte ni appareil Apple.",
          "Album temporaire possible : il ne compte pas dans le stockage et disparaît sous 30 jours.",
          "Les participants ajoutent photos, vidéos et commentaires.",
        ],
        limits: [
          "Depuis iOS 27, les photos comptent dans le stockage iCloud du propriétaire, y compris celles ajoutées par les autres.",
          "100 participants au maximum par album, propriétaire compris.",
          "Les albums créés sous iOS 26 ou avant réduisent les photos à 2 048 pixels et les vidéos à 720p.",
          "Un compte Apple est nécessaire pour créer l’album.",
        ],
        price: "Gratuit ; stockage iCloud+ payant si l’espace manque.",
        platforms: "iPhone, iPad et Mac ; participation par le web depuis iOS 27.",
        sources: [
          { label: "albums partagés", href: "https://support.apple.com/fr-fr/108314" },
          { label: "limites", href: "https://support.apple.com/fr-fr/148868" },
          { label: "types de fichiers", href: "https://support.apple.com/fr-fr/148676" },
        ],
      },
      {
        name: "WhatsApp",
        summary: "La messagerie où beaucoup de groupes envoient leurs photos, directement dans la discussion.",
        bestFor: "Envoyer quelques photos sur le moment, à un groupe déjà constitué.",
        strengths: [
          "Presque tout le monde l’a déjà.",
          "Choix entre qualité standard et HD à l’envoi.",
          "Fichiers jusqu’à 2 Go envoyés comme documents.",
          "Chiffrement de bout en bout.",
        ],
        limits: [
          "Les médias sont généralement compressés, et peuvent être de moins bonne qualité que l’original, d’après WhatsApp.",
          "Les photos se mêlent au fil de la conversation : pas d’album par événement dans sa documentation.",
        ],
        price: "Gratuit.",
        platforms: WHATSAPP_PLATFORMS,
        sources: [
          { label: "qualité des médias", href: "https://faq.whatsapp.com/453914586839706" },
          { label: "messagerie", href: "https://www.whatsapp.com/messaging" },
        ],
      },
      {
        name: "Yatu",
        isYatu: true,
        summary: "Une application d’organisation d’événements entre amis où les photos se partagent dans l’espace de l’événement.",
        bestFor: "Les week-ends, voyages ou anniversaires que tu organises déjà dans l’appli.",
        strengths: [
          "Les photos sont partagées dans l’événement, pas dans un fil de discussion, et gardent leur qualité d’origine.",
          "Pas de nombre maximum de participants : tout le groupe peut ajouter les siennes.",
          "Une fois l’événement terminé et les dépenses soldées, Yatu les rassemble automatiquement dans un album souvenirs.",
          "Photos, discussion, budget et documents au même endroit.",
        ],
        limits: [
          "Chaque participant doit installer l’appli : ce n’est pas un simple lien d’album.",
          "Un événement dure 14 jours au maximum.",
          "L’album souvenirs attend que les comptes soient soldés.",
          "L’envoi de photos et de vidéos a une limite, haute, par événement.",
        ],
        price: YATU_PRICE,
        platforms: YATU_PLATFORMS,
        sources: YATU_SOURCES,
      },
    ],
    rows: [
      {
        criterion: "Prix",
        cells: [
          "Gratuit dans les 15 Go du compte Google",
          "Gratuit ; depuis iOS 27, compte dans le stockage du propriétaire",
          "Gratuit",
          "Gratuit",
        ],
      },
      {
        criterion: "iPhone et Android mélangés",
        cells: [
          "Oui : Android, iPhone et web",
          "Création sur appareil Apple ; ajout par le web depuis iOS 27",
          "Oui",
          "Oui, avec l’appli sur chaque téléphone",
        ],
      },
      {
        criterion: "Qualité des photos",
        cells: [
          "Selon le réglage de chacun : d’origine, ou 16 Mpx en économiseur d’espace",
          "iOS 27 : pleine résolution ; albums plus anciens : 2 048 px",
          "Compressées par défaut, HD au choix de l’expéditeur",
          "Qualité d’origine",
        ],
      },
      {
        criterion: "Nombre de participants",
        cells: ["Non documenté", "100 par album", "Groupes jusqu’à 1 000 personnes", "Pas de maximum"],
      },
      {
        criterion: "Pour participer",
        cells: [
          "Compte Google ou lien de l’album",
          "Compte Apple ; ou le web, sans compte, depuis iOS 27",
          "Numéro de téléphone et appli",
          "Compte Yatu et appli",
        ],
      },
      {
        criterion: "Qui ajoute des photos",
        cells: [
          "Toute personne disposant du lien, si le propriétaire l’autorise",
          "Les participants à l’album",
          "Tout membre du groupe",
          "Tout participant de l’événement",
        ],
      },
      {
        criterion: "Où vivent les photos",
        cells: [
          "Un album, séparé de la conversation",
          "Un album de l’app Photos",
          "Le fil de la discussion",
          "L’événement, puis un album souvenirs",
        ],
      },
      {
        criterion: "Avec le reste de l’organisation",
        cells: ["Non", "Non", "Dans la même discussion", "Discussion, budget, listes et documents"],
      },
    ],
    choiceTitle: "Quelle solution pour ton groupe",
    choices: [
      {
        need: "Tout le groupe est sur iPhone",
        pick: "Un album partagé iCloud, directement dans l’app Photos. Vérifie le stockage du propriétaire : depuis iOS 27, les photos du groupe y sont décomptées.",
      },
      {
        need: "Le groupe mélange iPhone et Android",
        pick: "Un album partagé Google Photos et son lien : chacun ajoute ses photos, quel que soit son téléphone.",
      },
      {
        need: "Quelques photos à envoyer ce soir",
        pick: "Le groupe WhatsApp suffit ; choisis la HD si la qualité compte.",
      },
      {
        need: "Les photos font partie d’un événement que tu organises",
        pick: "Yatu les garde dans l’événement, à côté de la discussion et des comptes, et en fait un album souvenirs à la fin.",
      },
    ],
    detailTitle: "Les quatre solutions en détail",
    method: [
      "Cette page est écrite par l’équipe de Yatu, l’une des quatre solutions comparées. Chaque information sur Google Photos, iCloud et WhatsApp vient de leurs pages d’aide officielles, citées sous chaque fiche.",
      "Relevé fait le 8 octobre 2026. Apple a modifié les albums partagés avec iOS 27 - qualité, stockage, participation par le web - : les deux régimes sont indiqués, car un album créé avant reste soumis aux anciennes règles.",
    ],
    faq: [
      {
        q: "Quelle application pour partager les photos d’un voyage entre amis ?",
        a: "Si le groupe mélange iPhone et Android, un album partagé Google Photos ; s’il est entièrement sur iPhone, un album partagé iCloud. Si le voyage s’organise déjà dans Yatu, les photos y sont partagées en qualité d’origine dans l’événement, puis réunies dans un album souvenirs.",
      },
      {
        q: "Comment partager des photos entre iPhone et Android ?",
        a: "Le plus simple est un album partagé Google Photos : il fonctionne sur les deux systèmes et dans un navigateur, et toute personne qui a le lien peut ajouter ses photos si le propriétaire l’autorise. Depuis iOS 27, un album partagé iCloud accepte aussi des ajouts depuis le web, sans appareil Apple.",
      },
      {
        q: "WhatsApp réduit-il la qualité des photos ?",
        a: "Par défaut, oui : WhatsApp indique que les médias sont généralement compressés et peuvent être de qualité inférieure à l’original. L’expéditeur peut choisir la qualité HD au moment de l’envoi.",
      },
      {
        q: "Les albums partagés iCloud comptent-ils dans le stockage ?",
        a: "Ça dépend de leur création. Les albums créés sous iOS 26 ou avant ne comptent pas dans le stockage iCloud, mais réduisent les photos à 2 048 pixels. Ceux créés sous iOS 27 ou sur le web gardent la pleine résolution et comptent dans le stockage du propriétaire, y compris pour les photos ajoutées par les autres.",
      },
      {
        q: "Comment fonctionne l’album souvenirs de Yatu ?",
        a: "Pendant l’événement, chacun partage ses photos dans l’espace de l’événement. Une fois l’événement terminé et toutes les dépenses soldées, Yatu les rassemble automatiquement dans un album souvenirs, que les participants retrouvent dans l’appli.",
      },
    ],
    related: [
      "meilleures-applications-organiser-evenement-entre-amis",
      "organiser-un-voyage-entre-amis",
      "organiser-une-soiree-entre-amis",
    ],
  },

  {
    kind: "comparison",
    slug: "alternative-doodle",
    updated: "2026-10-08",
    checked: CHECKED,
    badge: "Alternative à Doodle",
    accent: ACCENT.apricot,
    icon: icon("calendar"),
    photo: "/assets/usecases/usage-rando.jpg",
    photoAlt: "Des randonneurs consultent une carte, assis sur un rocher en montagne",
    h1: "Alternative à Doodle : comment faire voter ses amis pour une date ?",
    title: "Alternative à Doodle pour choisir une date entre amis - Yatu",
    description:
      "Doodle, Framadate, WhatsApp, To Gather ou Yatu : comment faire voter un groupe d’amis pour une date, un lieu ou une activité, avec ou sans application.",
    lede: "Doodle sert d’abord à caler des réunions, et c’est ce qu’il fait le mieux. Entre amis, la date n’est souvent que la première décision : viennent ensuite le lieu, l’activité, le budget. Le bon outil dépend de ce qui suit le vote.",
    og: {
      title: "Faire voter ses amis pour une date.",
      subtitle: "Doodle, Framadate, WhatsApp, To Gather et Yatu comparés.",
    },
    cardTitle: "Alternative à Doodle",
    cardSub: "Voter une date, et la suite.",
    answerTitle: "Pour voter sans rien installer, reste dans le navigateur",
    answer: [
      "Si ton groupe ne veut rien installer, un sondage dans le navigateur reste le plus simple. Doodle permet de voter sans compte, mais sa formule gratuite se limite à un sondage de groupe par compte et à dix créneaux, et son application mobile ne se télécharge plus. Framadate, de l’association française Framasoft, est gratuit, sans publicité et sans inscription.",
      "Si le groupe est déjà sur WhatsApp, un sondage dans la discussion suffit souvent : une ou plusieurs réponses et, depuis août 2026, une heure de clôture et des votes anonymes. To Gather, lui, trouve la date en superposant les agendas de chacun, ou par un vote sur des créneaux.",
      "Si la date n’est que la première décision d’un week-end ou d’un voyage, Yatu fait voter le groupe dans l’événement - date, lieu ou activité, avec clôture automatique - puis garde le reste au même endroit : programme, budget, listes et photos. Chaque participant installe l’appli.",
    ],
    tableTitle: "Cinq façons de faire voter un groupe",
    tableLede:
      "D’après les pages officielles de chaque outil. « Non documenté » : la fonction n’apparaît pas dans ses pages à la date de vérification.",
    apps: [
      {
        name: "Doodle",
        summary:
          "Un outil de planification en ligne : un sondage de créneaux, puis une invitation d’agenda une fois la date choisie.",
        bestFor: "Caler une date avec des personnes qui ne veulent créer aucun compte.",
        strengths: [
          "Vote sans compte Doodle, depuis n’importe quel navigateur.",
          "Jusqu’à 1 000 participants par sondage.",
          "Invitation d’agenda envoyée une fois le créneau choisi.",
        ],
        limits: [
          "Un seul sondage de groupe par compte en formule gratuite, et dix créneaux au maximum.",
          "Application mobile en pause, retirée des stores : tout passe par le navigateur.",
          "Date limite et rappels réservés aux formules payantes.",
          "Ni discussion, ni budget, ni photos dans ses pages produit.",
        ],
        price: DOODLE_PRICE,
        platforms: "Navigateur, sur ordinateur et sur mobile.",
        sources: DOODLE_SOURCES,
      },
      {
        name: "Framadate",
        summary:
          "Le service de sondages en ligne de Framasoft, une association française à but non lucratif financée principalement par les dons.",
        bestFor: "Les groupes qui veulent un outil gratuit, sans publicité et sans inscription.",
        strengths: [
          "Gratuit, sans publicité, sans inscription préalable.",
          "Sondages de dates pour trouver un créneau, ou sondages classiques pour choisir parmi des options.",
          "Utilisable depuis un smartphone, dans le navigateur.",
        ],
        limits: [
          "Pas d’application mobile mentionnée sur son site.",
          "Un sondage reste actif 180 jours par défaut, puis il est supprimé deux mois plus tard s’il n’est pas prolongé.",
          "Uniquement des sondages : le reste de l’organisation se fait ailleurs.",
        ],
        price: "Gratuit, financé par les dons à Framasoft.",
        platforms: "Navigateur, sur ordinateur et sur smartphone.",
        sources: [
          { label: "site officiel", href: "https://framadate.org/" },
          { label: "documentation", href: "https://docs.framasoft.org/fr/framadate/" },
        ],
      },
      {
        name: "WhatsApp",
        summary: "La messagerie de groupe, dont les sondages se créent directement dans la discussion.",
        bestFor: "Trancher vite une question dans un groupe qui existe déjà.",
        strengths: [
          "Sondage créé en quelques secondes, dans la discussion où tout le monde est déjà.",
          "Une ou plusieurs réponses autorisées, au choix.",
          "Depuis août 2026 : heure de clôture et votes anonymes possibles.",
        ],
        limits: [
          "Chaque votant doit avoir WhatsApp et faire partie de la discussion.",
          "Les réglages d’un sondage se choisissent à sa création.",
          "Ni budget, ni listes, ni album d’événement dans sa documentation.",
        ],
        price: "Gratuit.",
        platforms: WHATSAPP_PLATFORMS,
        sources: WHATSAPP_SOURCES,
      },
      {
        name: "To Gather",
        summary: "Une application de sorties entre amis construite autour d’une question : quand est-ce qu’on se voit ?",
        bestFor: "Trouver le soir où tout le monde est libre, sans tableau de créneaux à remplir.",
        strengths: [
          "Superpose les agendas de chacun en ne gardant que « libre » ou « occupé ».",
          "Vote possible sur plusieurs créneaux.",
          "Réponse depuis un lien, sans compte ni installation.",
          "Création d’un événement à la voix.",
        ],
        limits: [
          "La discussion, les rappels et les photos passent par l’application.",
          "Budget, listes et documents non mentionnés sur son site.",
        ],
        price: "Gratuit.",
        platforms: "iPhone et Android ; réponse aux invitations depuis un navigateur.",
        sources: TO_GATHER_SOURCES,
      },
      {
        name: "Yatu",
        isYatu: true,
        summary:
          "Une application d’organisation d’événements où le vote est une étape de l’événement, pas un outil à part.",
        bestFor: "Les week-ends, voyages et anniversaires où la date ouvre une série de décisions.",
        strengths: [
          "Sondages dans l’événement : date, lieu ou activité, avec clôture automatique.",
          "Un vote de date dédié pour caler le moment.",
          "La décision prise, programme, budget, listes et photos suivent au même endroit.",
          "Pas de nombre maximum de participants.",
        ],
        limits: [
          "Chaque votant installe l’appli et crée un compte.",
          "Pas de version web.",
          "Pour un sondage ponctuel, un outil web demande moins d’effort.",
        ],
        price: YATU_PRICE,
        platforms: YATU_PLATFORMS,
        sources: YATU_SOURCES,
      },
    ],
    rows: [
      {
        criterion: "Prix",
        cells: [
          "Gratuit pour un sondage de groupe ; Pro et Team payants",
          "Gratuit, sans publicité",
          "Gratuit",
          "Gratuit",
          "Gratuit",
        ],
      },
      {
        criterion: "Compte pour voter",
        cells: ["Non", "Non, sans inscription", "Oui, compte WhatsApp", "Non, réponse par lien", "Oui, appli et compte"],
      },
      {
        criterion: "Plateformes",
        cells: [
          "Navigateur (appli mobile retirée des stores)",
          "Navigateur, compatible smartphone",
          "iPhone, Android, ordinateur, web",
          "iPhone, Android, lien web",
          "iPhone, Android",
        ],
      },
      {
        criterion: "Ce qu’on fait voter",
        cells: [
          "Des créneaux (10 au maximum en gratuit)",
          "Des dates, ou des options au choix",
          "Toute question, à une ou plusieurs réponses",
          "Des créneaux, ou les agendas superposés",
          "Date, lieu, activité",
        ],
      },
      {
        criterion: "Clôture du vote",
        cells: [
          "Date limite avec les formules payantes",
          "Sondage actif 180 jours par défaut",
          "Heure de clôture possible",
          "Non documenté",
          "Clôture automatique",
        ],
      },
      {
        criterion: "Après le vote",
        cells: [
          "Invitation d’agenda",
          "Non documenté",
          "La discussion continue",
          "Réponses, discussion, photos de la soirée",
          "Programme, budget, listes, documents et album",
        ],
      },
    ],
    choiceTitle: "Quel outil pour ton vote",
    choices: [
      {
        need: "Personne ne veut rien installer",
        pick: "Framadate ou Doodle, dans le navigateur, sans compte pour voter.",
      },
      {
        need: "Le groupe est déjà sur WhatsApp",
        pick: "Un sondage dans la discussion, avec une heure de clôture pour que la décision tombe.",
      },
      {
        need: "Tu cherches le soir où tout le monde est libre",
        pick: "To Gather, qui superpose les agendas en ne gardant que « libre » ou « occupé ».",
      },
      {
        need: "La date n’est que le début d’un week-end ou d’un voyage",
        pick: "Yatu : le vote se fait dans l’événement, et le programme, le budget et les photos suivent au même endroit.",
      },
    ],
    detailTitle: "Les cinq outils en détail",
    method: [
      "Cette page est écrite par l’équipe de Yatu, l’un des cinq outils comparés. Les informations sur Doodle, Framadate, WhatsApp et To Gather viennent de leurs pages officielles, citées sous chaque fiche, et nous disons quand un outil web suffit.",
      "Relevé fait le 8 octobre 2026. Les tarifs de Doodle s’affichent en dollars par défaut sur son site : nous renvoyons à sa page de tarifs plutôt que de les convertir.",
    ],
    faq: [
      {
        q: "Quelle application permet de voter pour une date, un lieu ou une activité ?",
        a: "Plusieurs : Doodle et Framadate pour un sondage dans le navigateur, sans compte ; WhatsApp pour un sondage dans la discussion du groupe ; Yatu pour un vote dans l’événement, avec clôture automatique, suivi du programme, du budget et des photos.",
      },
      {
        q: "Doodle a-t-il encore une application mobile ?",
        a: "Non. D’après Doodle, son application mobile est en pause et ne peut plus être téléchargée sur les stores ; les sondages se font depuis le navigateur, sur ordinateur ou sur mobile.",
      },
      {
        q: "Doodle est-il gratuit ?",
        a: "En partie : la formule gratuite permet un sondage de groupe par compte, avec dix créneaux au maximum. Les formules Pro et Team sont payantes.",
      },
      {
        q: "Existe-t-il une alternative gratuite et française à Doodle ?",
        a: "Oui : Framadate, proposé par l’association Framasoft, est gratuit, sans publicité et sans inscription. Un sondage y reste actif 180 jours par défaut.",
      },
      {
        q: "Peut-on voter dans Yatu sans que tout le monde ait l’appli ?",
        a: "Non : pour voter dans un événement Yatu, chaque participant doit avoir installé l’application. Pour un sondage ponctuel avec des personnes qui n’ont pas Yatu, un outil web comme Framadate est plus adapté.",
      },
    ],
    related: [
      "meilleures-applications-organiser-evenement-entre-amis",
      "organiser-sans-groupe-whatsapp",
      "application-organiser-soiree-entre-amis",
    ],
  },
];

export const comparisonBySlug = (slug: string) =>
  COMPARISON_PAGES.find((page) => page.slug === slug) ?? null;

/**
 * What a "à lire aussi" card needs, whichever list the page lives in - so a
 * guide can point at a comparison and a comparison at a guide.
 */
export function pageCardBySlug(slug: string) {
  const page = landingBySlug(slug) ?? comparisonBySlug(slug);
  return page
    ? { slug: page.slug, icon: page.icon, cardTitle: page.cardTitle, cardSub: page.cardSub }
    : null;
}
