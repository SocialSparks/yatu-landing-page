/**
 * All the words the home page says, in one file, so the section components
 * stay markup-only and no sentence gets written twice.
 *
 * Editorial rules for anything added here:
 * - tutoiement, always;
 * - the benefit first, the feature after;
 * - one job per section - the full list of modules belongs to MODULES and
 *   nowhere else;
 * - only promise what ships on day one. No numbers we cannot back.
 *
 * Feature names are fixed: discussion, infos clés, planning, budget, listes et
 * tâches, discussion cachée, souvenirs, documents.
 */

export const LAUNCH_DATE = "2026-09-09T00:00:00";
/** Written once - the date shows up in the hero, the footer, the FAQ and the metadata. */
export const LAUNCH_LABEL = "9 septembre 2026";

export const ACCENT = {
  ink: "#2A343D",
  sand: "#F7F4ED",
  sandDeep: "#EFE8DE",
  outline: "#EBE7DE",
  coral: "#FF7676",
  apricot: "#FF8C64",
  sunbeam: "#FED873",
  meadow: "#96E087",
  sky: "#6FC6F1",
  lilac: "#C6A8E1",
  blush: "#FF92B1",
} as const;

export const icon = (name: string) => `/assets/tools/${name}.svg`;

/* ── The two calls to action, spelled the same way everywhere ────────── */

export const CTA = {
  waitlist: "Rejoindre la liste",
  demo: "Voir la démo",
} as const;

/* ── "Voici Yatu" - what the product is, before any feature ─────────── */

export type Bullet = { tool: string; title: string; desc: string };

export const YATU_REVEAL_LEDE =
  "Tu crées l’événement, ton groupe te rejoint avec un lien. À partir de là, tout se passe dedans : ce qui se décide, ce qui se paie, ce qui se prépare et ce qu’il en reste.";

export const YATU_REVEAL_BENEFITS: Bullet[] = [
  {
    tool: "documents",
    title: "Tout tient dans l’événement",
    desc: "Les décisions, les infos pratiques et les photos restent là où le groupe va les chercher.",
  },
  {
    tool: "people",
    title: "Le groupe participe vraiment",
    desc: "Chacun peut proposer, cocher une tâche, ajouter une dépense ou déposer ses photos.",
  },
  {
    tool: "heart",
    title: "L’organisateur souffle",
    desc: "Tu n’es plus le seul à tout suivre, à tout rappeler et à tout avancer.",
  },
];

/* The two screens shown next to the reveal copy: what an event looks like. */

export const YATU_REVEAL_SCREENS: { src: string; alt: string; label: string; caption: string }[] = [
  {
    src: "/mockups/iphone_event.svg",
    alt: "Écran d’un événement Yatu : le nom du séjour, les participants, la description et les onglets Infos, Discussion et Budget",
    label: "L’événement",
    caption: "Qui vient, les infos utiles, et les onglets choisis par le groupe.",
  },
  {
    src: "/mockups/iphone_budget.svg",
    alt: "Écran budget d’un événement Yatu : total des dépenses, part de chaque participant et liste des dépenses avec qui a payé",
    label: "Le budget",
    caption: "Ce qui a été payé, par qui, et ce que chacun doit encore.",
  },
];

/* ── The modules a group can switch on ──────────────────────────────── */

export type ModuleKey =
  | "chat"
  | "infos"
  | "planning"
  | "budget"
  | "liste"
  | "secret"
  | "img"
  | "documents";

export type Module = {
  key: ModuleKey;
  label: string;
  icon: string;
  locked?: boolean;
  desc: string;
};

export const MODULES: Module[] = [
  {
    key: "chat",
    label: "Discussion",
    icon: icon("chat"),
    locked: true,
    desc: "La conversation du groupe, rattachée à l’événement. Le seul module qu’on ne coupe jamais.",
  },
  {
    key: "infos",
    label: "Infos clés",
    icon: icon("pin"),
    desc: "L’adresse, le code du portail, le numéro à appeler. Épinglés en haut de l’événement.",
  },
  {
    key: "planning",
    label: "Planning",
    icon: icon("planning"),
    desc: "Le programme de l’événement, heure par heure. Chacun sait quoi, où et quand.",
  },
  {
    key: "budget",
    label: "Budget",
    icon: icon("budget"),
    desc: "Chaque dépense notée, la répartition calculée, et qui rembourse qui à la fin.",
  },
  {
    key: "liste",
    label: "Listes et tâches",
    icon: icon("liste"),
    desc: "Courses, affaires à prendre, choses à faire. On coche, le groupe suit.",
  },
  {
    key: "secret",
    label: "Discussion cachée",
    icon: icon("heart"),
    desc: "Un salon invisible pour une personne de l’événement, le temps de préparer sa surprise.",
  },
  {
    key: "img",
    label: "Souvenirs",
    icon: icon("img"),
    desc: "L’album partagé de l’événement. Chacun dépose ses photos et récupère celles des autres.",
  },
  {
    key: "documents",
    label: "Documents",
    icon: icon("documents"),
    desc: "Billets, réservations, attestations. Rangés une fois, retrouvés par tous.",
  },
];

/** The dashed card that closes the module grid: an intention, not a roadmap. */
export const MODULES_NEXT = {
  title: "Ce qui pourrait suivre",
  desc: "Cagnotte, covoiturage, sondages… Dis-nous ce qui te manque : ça oriente la suite.",
};

export type Preset = { key: string; label: string; on: ModuleKey[] | null };

export const PRESETS: Preset[] = [
  { key: "soiree", label: "Soirée", on: ["chat", "infos", "liste"] },
  {
    key: "anniversaire",
    label: "Anniversaire",
    on: ["chat", "infos", "liste", "budget", "secret", "img"],
  },
  {
    key: "weekend",
    label: "Week-end",
    on: ["chat", "infos", "planning", "budget", "liste", "img"],
  },
  {
    key: "voyage",
    label: "Voyage",
    on: ["chat", "infos", "planning", "budget", "liste", "img", "documents"],
  },
  { key: "custom", label: "Sur mesure", on: null },
];

/* ── The four-step in-page demo ─────────────────────────────────────── */

export type DemoType = {
  key: string;
  label: string;
  nom: string;
  court: string;
  courtDe: string;
  dates: string;
  mods: ModuleKey[];
};

export const DEMO_TYPES: DemoType[] = [
  {
    key: "soiree",
    label: "Soirée",
    nom: "Soirée chez Malo",
    court: "la soirée",
    courtDe: "de la soirée",
    dates: "Samedi 5 septembre · 21:00",
    mods: ["chat", "infos", "liste"],
  },
  {
    key: "anniv",
    label: "Anniversaire",
    nom: "Les 25 ans de Léa",
    court: "l’anniversaire",
    courtDe: "de l’anniversaire",
    dates: "Vendredi 18 septembre · 20:00",
    mods: ["chat", "infos", "liste", "secret", "img"],
  },
  {
    key: "weekend",
    label: "Week-end",
    nom: "Week-end chalet",
    court: "le week-end",
    courtDe: "du week-end",
    dates: "4 juillet → 6 juillet 2026",
    mods: ["chat", "infos", "planning", "budget", "liste", "img"],
  },
  {
    key: "voyage",
    label: "Voyage",
    nom: "Ibiza c’est nous",
    court: "le voyage",
    courtDe: "du voyage",
    dates: "12 août → 17 août 2026",
    mods: ["chat", "infos", "planning", "budget", "liste", "documents", "img"],
  },
  {
    key: "festival",
    label: "Festival",
    nom: "Hellfest 2026",
    court: "le festival",
    courtDe: "du festival",
    dates: "19 juin → 22 juin 2026",
    mods: ["chat", "infos", "planning", "documents", "img"],
  },
  {
    key: "rando",
    label: "Randonnée",
    nom: "GR20 en six jours",
    court: "la rando",
    courtDe: "de la rando",
    dates: "2 mai → 7 mai 2026",
    mods: ["chat", "infos", "planning", "liste", "img"],
  },
];

export const DEMO_COULEURS = ["#FF7676", "#FED873", "#6FC6F1", "#C6A8E1", "#96E087"];

export const DEMO_GENS = [
  { nom: "Léa", bg: "#FF7676" },
  { nom: "Malo", bg: "#6FC6F1" },
  { nom: "Sarah", bg: "#C6A8E1" },
  { nom: "Théo", bg: "#FF8C64" },
  { nom: "Inès", bg: "#96E087" },
  { nom: "Hugo", bg: "#FED873" },
  { nom: "Camille", bg: "#FF92B1" },
  { nom: "Yanis", bg: "#6FC6F1" },
];

export const DEMO_ETAPES = [
  {
    titre: "Crée l’événement",
    desc: "Un nom, des dates, une couleur. L’espace du groupe existe.",
  },
  {
    titre: "Choisis les modules",
    desc: "Tu actives ce qui sert à cet événement, tu laisses le reste de côté.",
  },
  {
    titre: "Invite ton groupe",
    desc: "Un lien à partager. Chacun rejoint et voit qui a déjà confirmé.",
  },
  {
    titre: "Garde le souvenir",
    desc: "Les photos du groupe réunies, les comptes à jour.",
  },
];

/* ── "Avant Yatu" - the group chat that goes nowhere ─────────────────── */

export const GALERE_MESSAGES: {
  who?: string;
  color?: string;
  text: string;
  link?: string;
  mine?: boolean;
}[] = [
  { who: "Léa", color: ACCENT.coral, text: "On part quel week-end finalement ?" },
  { who: "Malo", color: ACCENT.sky, text: "Moi c’est le 12 ou le 19" },
  {
    who: "Sarah",
    color: ACCENT.lilac,
    text: "J’ai refait un sondage, votez svp",
    link: "sondage-dates-v2.link",
  },
  { who: "Théo", color: ACCENT.apricot, text: "Quelqu’un a l’adresse du chalet ?" },
  { text: "Je l’ai envoyée il y a trois semaines", mine: true },
  { who: "Malo", color: ACCENT.sky, text: "J’ai avancé 240 €, je note ça où ?" },
  { who: "Sarah", color: ACCENT.lilac, text: "Dans le tableur" },
  { who: "Théo", color: ACCENT.apricot, text: "Quel tableur ?" },
];

/** The tally of the conversation above - an illustration, not a statistic. */
export const GALERE_STATS = [
  {
    icon: icon("chart"),
    count: 6,
    color: ACCENT.coral,
    text: "applis ouvertes pour un seul week-end",
  },
  {
    icon: icon("bell"),
    count: 47,
    color: ACCENT.apricot,
    text: "messages avant de tomber d’accord sur une date",
  },
  {
    icon: icon("bubble"),
    count: 0,
    color: ACCENT.sunbeam,
    text: "décision prise, et les photos restent sur huit téléphones.",
    dark: true,
  },
];

/* ── "Avant, pendant, après" - the scroll-driven timeline ───────────── */

export type TimelineStep = {
  kind: "phase" | "card";
  icon?: string;
  label?: string;
  labelColor?: string;
  title: string;
  desc: string;
  dark?: boolean;
};

export const TIMELINE: TimelineStep[] = [
  {
    kind: "phase",
    label: "AVANT",
    labelColor: ACCENT.sky,
    title: "Se décider sans y passer trois semaines",
    desc: "Choisir une date, savoir qui vient, se répartir les courses : c’est là que la plupart des groupes s’épuisent.",
  },
  {
    kind: "card",
    icon: icon("chat"),
    title: "L’idée arrive",
    desc: "« Et si on partait un week-end ? » L’événement s’ouvre, la discussion démarre.",
  },
  {
    kind: "card",
    icon: icon("planning"),
    title: "La date se choisit",
    desc: "Chacun pose ses disponibilités au même endroit, et le groupe tranche.",
  },
  {
    kind: "card",
    icon: icon("addpeople"),
    title: "Le groupe embarque",
    desc: "Chacun rejoint l’événement et répond présent. Tu vois enfin qui vient vraiment.",
  },
  {
    kind: "card",
    icon: icon("liste"),
    title: "On se répartit tout",
    desc: "Courses, affaires à prendre, trajets : qui ramène quoi, coché en direct.",
  },
  {
    kind: "phase",
    label: "PENDANT",
    labelColor: ACCENT.sunbeam,
    title: "Vivre le moment, pas le gérer",
    desc: "Sur place, personne ne cherche l’info : elle est déjà au bon endroit.",
  },
  {
    kind: "card",
    icon: icon("pin"),
    title: "L’info utile sous la main",
    desc: "Adresse, code du portail, numéro du propriétaire : personne ne refouille la conversation.",
  },
  {
    kind: "card",
    icon: icon("documents"),
    title: "Le jour J se déroule",
    desc: "Le programme heure par heure, les billets et les réservations à portée de pouce.",
  },
  {
    kind: "card",
    icon: icon("budget"),
    title: "Les dépenses au fil de la journée",
    desc: "Chacun ajoute ce qu’il avance. Personne ne tient les comptes dans sa tête.",
  },
  {
    kind: "phase",
    label: "APRÈS",
    labelColor: ACCENT.meadow,
    title: "Le moment où les autres apps s’arrêtent",
    desc: "C’est là que Yatu sert encore : il reste les comptes à solder, les photos à rassembler et l’envie de remettre ça.",
  },
  {
    kind: "card",
    icon: icon("budget"),
    title: "Les comptes se soldent",
    desc: "Yatu calcule qui rembourse qui, et combien. Un tap pour marquer réglé.",
  },
  {
    kind: "card",
    icon: icon("img"),
    title: "L’album se remplit",
    desc: "Les photos des huit téléphones se rassemblent dans l’événement, sans relancer personne.",
  },
  {
    kind: "card",
    icon: icon("chat"),
    title: "La discussion continue",
    desc: "Les débriefs, les vannes et les photos qui arrivent en retard ont toujours leur place.",
  },
  {
    kind: "card",
    icon: icon("heart"),
    title: "Rien ne se referme le lundi",
    desc: "Les comptes, les documents et les souvenirs restent réunis dans l’événement, avec les gens qui y étaient.",
    dark: true,
  },
];

/* ── "Les cas d’usage" - three drifting rows ────────────────────────── */

export type UseCase = {
  id: string;
  icon: string;
  badge: string;
  label: string;
  title: string;
  sub: string;
  /**
   * Editorial photo generated for the use-case card.
   */
  photo?: string;
};

export const USE_CASE_ROWS: { duration: string; reverse: boolean; cards: UseCase[] }[] = [
  {
    duration: "46s",
    reverse: false,
    cards: [
      {
        id: "usage-soiree",
        photo: "/assets/usecases/usage-soiree.jpg",
        icon: icon("chat"),
        badge: ACCENT.blush,
        label: "Soirée",
        title: "Ce samedi, chez Malo",
        sub: "Qui vient, qui ramène quoi.",
      },
      {
        id: "usage-anniv",
        photo: "/assets/usecases/usage-anniv.jpg",
        icon: icon("heart"),
        badge: ACCENT.coral,
        label: "Anniversaire",
        title: "La surprise de Lina",
        sub: "Un espace sans elle, et le budget du cadeau.",
      },
      {
        id: "usage-weekend",
        photo: "/assets/usecases/usage-weekend.jpg",
        icon: icon("calendar"),
        badge: ACCENT.apricot,
        label: "Week-end",
        title: "Chalet, huit copains",
        sub: "Chambres, courses, raclette.",
      },
      {
        id: "usage-voyage",
        photo: "/assets/usecases/usage-voyage.jpg",
        icon: icon("send"),
        badge: ACCENT.sky,
        label: "Voyage en groupe",
        title: "Ibiza, cinq jours",
        sub: "Vols, logement et 400 photos.",
      },
      {
        id: "usage-festival",
        photo: "/assets/usecases/usage-festival.jpg",
        icon: icon("ticket"),
        badge: ACCENT.lilac,
        label: "Festival",
        title: "Trois jours de Hellfest",
        sub: "Line-up, camping, point de rendez-vous.",
      },
      {
        id: "usage-evjf",
        photo: "/assets/usecases/usage-evjf.jpg",
        icon: icon("heart"),
        badge: ACCENT.blush,
        label: "EVJF",
        title: "Le week-end de Camille",
        sub: "Programme secret, budget commun.",
      },
      {
        id: "usage-evg",
        photo: "/assets/usecases/usage-evg.jpg",
        icon: icon("bubble"),
        badge: ACCENT.meadow,
        label: "EVG",
        title: "Le dernier samedi de Théo",
        sub: "Il ne sait rien. Nous, si.",
      },
    ],
  },
  {
    duration: "52s",
    reverse: true,
    cards: [
      {
        id: "usage-rando",
        photo: "/assets/usecases/usage-rando.jpg",
        icon: icon("pin"),
        badge: ACCENT.meadow,
        label: "Randonnée",
        title: "GR20, six jours",
        sub: "Itinéraire, matériel, refuges.",
      },
      {
        id: "usage-ski",
        photo: "/assets/usecases/usage-ski.jpg",
        icon: icon("documents"),
        badge: ACCENT.sky,
        label: "Séjour ski",
        title: "Une semaine à La Clusaz",
        sub: "Forfaits, niveaux, navettes.",
      },
      {
        id: "usage-cremaillere",
        photo: "/assets/usecases/usage-cremaillere.jpg",
        icon: icon("people"),
        badge: ACCENT.sunbeam,
        label: "Crémaillère",
        title: "Le nouvel appart d’Inès",
        sub: "Liste de courses, voisins prévenus.",
      },
      {
        id: "usage-nouvelan",
        photo: "/assets/usecases/usage-nouvelan.jpg",
        icon: icon("bell"),
        badge: ACCENT.lilac,
        label: "Nouvel An",
        title: "31 décembre à la campagne",
        sub: "Les taxis réservés avant minuit.",
      },
      {
        id: "usage-roadtrip",
        photo: "/assets/usecases/usage-roadtrip.jpg",
        icon: icon("planning"),
        badge: ACCENT.apricot,
        label: "Road trip",
        title: "Deux semaines en van",
        sub: "Étapes, essence, playlist.",
      },
      {
        id: "usage-camping",
        photo: "/assets/usecases/usage-camping.jpg",
        icon: icon("liste"),
        badge: ACCENT.meadow,
        label: "Camping",
        title: "Trois nuits en Ardèche",
        sub: "Qui prend la tente, qui la glacière.",
      },
      {
        id: "usage-concert",
        photo: "/assets/usecases/usage-concert.jpg",
        icon: icon("ticket"),
        badge: ACCENT.coral,
        label: "Concert",
        title: "Les places sont prises",
        sub: "Les billets tous au même endroit.",
      },
    ],
  },
  {
    duration: "44s",
    reverse: false,
    cards: [
      {
        id: "usage-match",
        photo: "/assets/usecases/usage-match.jpg",
        icon: icon("chart"),
        badge: ACCENT.sky,
        label: "Match",
        title: "Déplacement à Lens",
        sub: "Covoiturage et pronostics.",
      },
      {
        id: "usage-coloc",
        photo: "/assets/usecases/usage-coloc.jpg",
        icon: icon("budget"),
        badge: ACCENT.lilac,
        label: "Coloc",
        title: "Rue des Capucins",
        sub: "Courses communes, comptes à jour.",
      },
      {
        id: "usage-mariage",
        photo: "/assets/usecases/usage-mariage.jpg",
        icon: icon("img"),
        badge: ACCENT.blush,
        label: "Mariage",
        title: "Le jour de Sarah et Malo",
        sub: "L’album de tous les invités.",
      },
      {
        id: "usage-famille",
        photo: "/assets/usecases/usage-famille.jpg",
        icon: icon("documents"),
        badge: ACCENT.apricot,
        label: "Vacances en famille",
        title: "Août en Bretagne",
        sub: "Trajets, locations, activités.",
      },
      {
        id: "usage-marathon",
        photo: "/assets/usecases/usage-marathon.jpg",
        icon: icon("chart"),
        badge: ACCENT.coral,
        label: "Marathon",
        title: "Paris, 42 kilomètres",
        sub: "Dossards, hôtel, supporters.",
      },
      {
        id: "usage-surf",
        photo: "/assets/usecases/usage-surf.jpg",
        icon: icon("send"),
        badge: ACCENT.sky,
        label: "Surf trip",
        title: "Hossegor en octobre",
        sub: "Marées, van, sessions.",
      },
      {
        id: "usage-retrouvailles",
        photo: "/assets/usecases/usage-retrouvailles.jpg",
        icon: icon("people"),
        badge: ACCENT.sunbeam,
        label: "Retrouvailles",
        title: "Dix ans après le lycée",
        sub: "Une date qui convient à tous.",
      },
    ],
  },
];

/* ── The FAQ ────────────────────────────────────────────────────────────
   Plain text on purpose: the same entries feed the visible accordion and the
   FAQPage structured data, so what Google reads is what a visitor reads. The
   optional link is rendered after the answer in both. */

export type FaqEntry = {
  q: string;
  a: string;
  link?: { href: string; label: string; before: string; after: string };
};

export const FAQ: FaqEntry[] = [
  {
    q: "C’est quoi Yatu, en une phrase ?",
    a: "Yatu est l’application qui réunit au même endroit tout ce qu’un groupe doit organiser, décider et partager autour d’un événement entre amis.",
  },
  {
    q: "Quand est-ce que Yatu sera disponible ?",
    a: `Yatu sortira le ${LAUNCH_LABEL} sur iOS et Android. Les personnes inscrites seront prévenues dès l’ouverture.`,
  },
  {
    q: "Yatu est-il gratuit ?",
    a: "Oui. Yatu propose une version gratuite pour créer et organiser tes événements. Des options premium permettront d’accéder à davantage de possibilités ou de lever certaines limites.",
  },
  {
    q: "Quels événements peut-on organiser avec Yatu ?",
    a: "Soirées, anniversaires, week-ends, voyages, festivals, EVJF, EVG, vacances ou simples sorties : Yatu s’adapte aux besoins de chaque événement.",
  },
  {
    q: "Qu’est-ce qu’on peut gérer dans un événement ?",
    a: "Les discussions, les informations importantes, le planning, les tâches, les dépenses, les documents et les souvenirs du groupe.",
  },
  {
    q: "Sur quels téléphones Yatu est-il disponible ?",
    a: "Yatu sera disponible sur iPhone et Android dès le lancement. Tous les participants pourront utiliser le même événement, quel que soit leur téléphone.",
  },
  {
    q: "Comment mes données sont-elles utilisées ?",
    a: "Tes données servent au fonctionnement et à la sécurisation de Yatu. Elles ne sont pas utilisées pour afficher de la publicité.",
    link: {
      href: "/confidentialite",
      label: "politique de confidentialité",
      before: "Retrouve tous les détails dans notre ",
      after: ".",
    },
  },
  {
    q: "Yatu fonctionne-t-il aussi pour les BDE et les associations ?",
    a: "Oui. Les organisateurs peuvent disposer d’outils supplémentaires pour gérer les participants, diffuser des annonces et organiser les chambres ou les groupes.",
    link: {
      href: "/bde",
      label: "découvrir Yatu pour les BDE",
      before: "Tu peux ",
      after: " et rejoindre le programme pilote.",
    },
  },
];

/** The answer as one string - what the FAQPage structured data quotes. */
export const faqAnswerText = (item: FaqEntry) =>
  item.link ? `${item.a} ${item.link.before}${item.link.label}${item.link.after}` : item.a;
