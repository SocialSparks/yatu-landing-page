/**
 * All copy and data for the home page, lifted verbatim from Accueil.dc.html.
 * Keeping it here means the section components stay markup-only.
 */

export const LAUNCH_DATE = "2026-09-09T00:00:00";

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

/* ── "Voici Yatu" - what the product is, before any feature ─────────── */

export type Bullet = { tool: string; title: string; desc: string };

export const YATU_REVEAL_LEDE =
  "Tu crées un événement, tu invites ton groupe par lien, et tout le monde retrouve au même endroit les discussions, les infos utiles, le budget, les tâches, le planning, les documents et les photos.";

export const YATU_REVEAL_BENEFITS: Bullet[] = [
  {
    tool: "documents",
    title: "Tout est au même endroit",
    desc: "Plus besoin de jongler entre les messages, les notes, les tableurs et les albums photo.",
  },
  {
    tool: "people",
    title: "Le groupe participe vraiment",
    desc: "Chacun peut suivre, décider, ajouter une dépense, cocher une tâche ou partager ses photos.",
  },
  {
    tool: "calendar",
    title: "L’événement continue après le jour J",
    desc: "Les comptes, les discussions et les souvenirs restent réunis dans le bon espace.",
  },
];

/* ── "Dans un événement Yatu" - the two app screens, up close ───────── */

export const YATU_OVERVIEW_SCREENS: { src: string; alt: string; label: string; caption: string }[] = [
  {
    src: "/mockups/iphone_event.svg",
    alt: "L'écran d'un événement Yatu : le nom du séjour, les participants, la description et les onglets Infos, Discussion et Budget",
    label: "Page événement",
    caption: "Le hub du groupe : participants, infos pratiques et onglets du séjour.",
  },
  {
    src: "/mockups/iphone_budget.svg",
    alt: "L'écran budget d'un événement Yatu : total des dépenses, part de chacun et liste des dépenses avec qui a payé",
    label: "Page budget",
    caption: "Le total, ta part et qui a avancé quoi, à jour en direct.",
  },
];

export const YATU_OVERVIEW_POINTS: Bullet[] = [
  {
    tool: "pin",
    title: "Infos clés visibles tout de suite",
    desc: "Adresse, horaires, détails pratiques et documents restent attachés à l’événement.",
  },
  {
    tool: "budget",
    title: "Budget clair pour tout le groupe",
    desc: "Chacun voit les dépenses, qui a avancé quoi et comment les comptes se répartissent.",
  },
  {
    tool: "liste",
    title: "Organisation plus fluide",
    desc: "Les tâches, listes et décisions sont visibles sans relancer tout le monde.",
  },
  {
    tool: "img",
    title: "Souvenirs centralisés",
    desc: "Les photos restent dans l’événement, avec le reste du groupe.",
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
    label: "Chat",
    icon: icon("chat"),
    locked: true,
    desc: "Une conversation par événement. Le seul module qu’on ne coupe jamais.",
  },
  {
    key: "infos",
    label: "Infos clés",
    icon: icon("pin"),
    desc: "L’adresse, le code du portail, le numéro à appeler. Épinglés en haut, pour tous.",
  },
  {
    key: "planning",
    label: "Planning",
    icon: icon("planning"),
    desc: "Le programme se propose et se vote. Chacun sait quoi, où, à quelle heure.",
  },
  {
    key: "budget",
    label: "Budget",
    icon: icon("budget"),
    desc: "Chaque dépense notée, la répartition calculée, les comptes soldés.",
  },
  {
    key: "liste",
    label: "Listes",
    icon: icon("liste"),
    desc: "Courses, affaires, tâches. On coche, tout le monde voit.",
  },
  {
    key: "secret",
    label: "Conversation cachée",
    icon: icon("heart"),
    desc: "Un salon invisible pour une personne de l’événement. Le cadeau surprise s’organise sans elle.",
  },
  {
    key: "img",
    label: "Souvenirs",
    icon: icon("img"),
    desc: "L’album commun. Tout le monde dépose, tout le monde récupère.",
  },
  {
    key: "documents",
    label: "Documents",
    icon: icon("documents"),
    desc: "Billets, réservations, attestations. Rangés une fois pour toutes.",
  },
];

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
    court: "l'anniversaire",
    courtDe: "de l'anniversaire",
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
    nom: "Ibiza c'est nous",
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
    titre: "Crée l'événement",
    desc: "Trois questions, une couleur. L'espace du groupe existe.",
  },
  {
    titre: "Choisis les modules",
    desc: "Tu actives ce qui sert, tu coupes le reste. Le chat reste toujours là.",
  },
  {
    titre: "Invite ton groupe",
    desc: "Un lien à partager. Chacun rejoint et voit qui a confirmé.",
  },
  {
    titre: "Gardez le souvenir",
    desc: "Les photos de tous au même endroit, les comptes soldés.",
  },
];

/* ── "La galère actuelle" - the group chat that goes nowhere ────────── */

export const GALERE_MESSAGES: {
  who?: string;
  color?: string;
  text: string;
  link?: string;
  mine?: boolean;
}[] = [
  { who: "Léa", color: ACCENT.coral, text: "On part quel week-end finalement ?" },
  { who: "Malo", color: ACCENT.sky, text: "Moi c'est le 12 ou le 19" },
  {
    who: "Sarah",
    color: ACCENT.lilac,
    text: "J'ai refait un sondage, votez svp",
    link: "sondage-dates-v2.link",
  },
  { who: "Théo", color: ACCENT.apricot, text: "Quelqu'un a l'adresse du chalet ?" },
  { text: "Je l'ai envoyée il y a trois semaines", mine: true },
  { who: "Malo", color: ACCENT.sky, text: "J'ai avancé 240 €, je note ça où ?" },
  { who: "Sarah", color: ACCENT.lilac, text: "Dans le tableur" },
  { who: "Théo", color: ACCENT.apricot, text: "Quel tableur ?" },
];

export const GALERE_STATS = [
  {
    icon: icon("chart"),
    count: 6,
    color: ACCENT.coral,
    text: "applications ouvertes pour un seul week-end",
  },
  {
    icon: icon("bell"),
    count: 47,
    color: ACCENT.apricot,
    text: "messages échangés pour choisir une date",
  },
  {
    icon: icon("bubble"),
    count: 0,
    color: ACCENT.sunbeam,
    text: "décision prise. Et à la fin, personne n'a les photos.",
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
    title: "Se décider, sans y passer trois semaines",
    desc: "Là où la plupart des groupes s'épuisent : choisir une date, savoir qui vient, se répartir les courses.",
  },
  {
    kind: "card",
    icon: icon("chat"),
    title: "L'idée arrive",
    desc: "« Et si on partait un week-end ? » Le chat ouvre l'événement.",
  },
  {
    kind: "card",
    icon: icon("planning"),
    title: "La date se tranche",
    desc: "Chacun propose ses disponibilités, tout le monde vote. La date sort toute seule.",
  },
  {
    kind: "card",
    icon: icon("addpeople"),
    title: "Le groupe embarque",
    desc: "Un lien à partager. Chacun rejoint, répond présent, et voit qui est déjà là.",
  },
  {
    kind: "card",
    icon: icon("liste"),
    title: "On se répartit tout",
    desc: "Courses, affaires à prendre, trajets. Qui ramène quoi, coché en direct.",
  },
  {
    kind: "phase",
    label: "PENDANT",
    labelColor: ACCENT.sunbeam,
    title: "Vivre le moment, pas le gérer",
    desc: "Sur place, personne ne cherche l'info : elle est déjà au bon endroit.",
  },
  {
    kind: "card",
    icon: icon("pin"),
    title: "L'info clé sous la main",
    desc: "Adresse, code du portail, numéro du proprio. Épinglés en haut, même sans réseau.",
  },
  {
    kind: "card",
    icon: icon("documents"),
    title: "Le jour J se déroule",
    desc: "Programme heure par heure, billets et réservations à un tap. Une notification quand ça bouge.",
  },
  {
    kind: "card",
    icon: icon("budget"),
    title: "Les dépenses au fil de la journée",
    desc: "Chacun ajoute ce qu'il avance. Personne ne tient de compte dans sa tête.",
  },
  {
    kind: "phase",
    label: "APRÈS",
    labelColor: ACCENT.meadow,
    title: "Le moment où les autres apps vous lâchent",
    desc: "C'est là que Yatu sert le plus. Rien ne se referme, rien ne se perd, et le prochain événement démarre plus vite.",
  },
  {
    kind: "card",
    icon: icon("budget"),
    title: "Les comptes tombent justes",
    desc: "Yatu calcule qui rembourse qui, et combien. Un tap pour marquer réglé - plus de « je te dois combien déjà ? » trois mois après.",
  },
  {
    kind: "card",
    icon: icon("img"),
    title: "L'album se referme en souvenir",
    desc: "Les photos des huit téléphones se rassemblent. L'album reste ouvert, consultable des années après, même par ceux qui ont changé de portable.",
  },
  {
    kind: "card",
    icon: icon("chat"),
    title: "La conversation continue",
    desc: "Le chat de l'événement ne disparaît pas : les débriefs, les vannes et les photos qui arrivent en retard ont toujours leur place.",
  },
  {
    kind: "card",
    icon: icon("calendar"),
    title: "Le prochain part de celui-là",
    desc: "Duplique l'événement : mêmes participants, mêmes listes, mêmes habitudes. La deuxième fois prend deux minutes.",
    dark: true,
  },
];

/* ── "Les cas d'usage" - three drifting rows ────────────────────────── */

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
        sub: "Un espace sans elle, et la cagnotte.",
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
        label: "Voyage",
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
        sub: "Programme secret, cagnotte commune.",
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
        title: "Le nouvel appart d'Inès",
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
        sub: "L'album de tous les invités.",
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
