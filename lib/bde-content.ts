/**
 * Copy and data for the BDE / associations page, lifted verbatim from
 * BDE.dc.html so the section components stay markup-only.
 */

import { icon } from "@/lib/content";

export const BDE_CHIPS = [
  { dot: "#96E087", label: "Gratuit pour les pilotes" },
  { dot: "#6FC6F1", label: "Aucun outil à remplacer" },
  { dot: "#C6A8E1", label: "Accompagnement par l'équipe" },
];

/** The demo event card in the hero. */
export const BDE_SHOWCASE = {
  title: "WEI 2026 - Biscarrosse",
  status: "Inscriptions ouvertes",
  stats: [
    { count: 184, label: "inscrits validés" },
    { count: 26, label: "chambres" },
    { count: 9, label: "organisateurs" },
  ],
  announcement: {
    title: "Annonce des organisateurs",
    body: "Départ 7:30 précises, place de la fac.",
  },
};

export const BDE_PROBLEMES = [
  {
    tool: "liste",
    title: "La liste vit dans trois fichiers",
    desc: "Le tableur des paiements, le formulaire d'inscription et la liste réelle ne disent jamais la même chose.",
  },
  {
    tool: "bubble",
    title: "Les infos importantes se noient",
    desc: "L'heure du départ passe dans un groupe de 200, entre deux blagues. La moitié ne la verra pas.",
  },
  {
    tool: "pin",
    title: "Les chambres se font la veille",
    desc: "Répartir 180 personnes en 26 chambres avec des affinités, à la main, à minuit.",
  },
  {
    tool: "calendar",
    title: "Tout repart de zéro chaque année",
    desc: "Le bureau change, les fichiers se perdent, l'expérience de l'an dernier avec.",
  },
];

export const BDE_DEROULE = [
  {
    icon: icon("ticket"),
    step: "1 · BILLETTERIE",
    title: "Le lien arrive après le paiement",
    desc: "Tu gardes ta billetterie actuelle. Yatu se glisse juste après : celui qui a payé reçoit le lien de l'événement.",
  },
  {
    icon: icon("addpeople"),
    step: "2 · AVANT",
    title: "Valider, informer, répartir",
    desc: "Le bureau valide les entrants un par un, publie les annonces officielles, prépare le planning et attribue les chambres.",
  },
  {
    icon: icon("planning"),
    step: "3 · PENDANT",
    title: "Une seule source de vérité",
    desc: "Programme, horaires, points de rendez-vous, changement de dernière minute : deux cents personnes regardent le même écran.",
  },
  {
    icon: icon("chart"),
    step: "4 · APRÈS",
    title: "Album, feedback, passation",
    desc: "Les photos de tout le monde au même endroit, un questionnaire de retour envoyé au bon moment, et un bilan que le prochain bureau retrouvera l'an prochain.",
    dark: true,
  },
];

export const BDE_FEATURES = [
  {
    tool: "addpeople",
    title: "Validation des participants",
    desc: "Personne n'entre sans être validé par le bureau. La liste est toujours juste.",
  },
  {
    tool: "bell",
    title: "Annonces organisateurs",
    desc: "Un canal officiel, séparé du chat, que personne ne peut noyer. Notifié à tous.",
  },
  {
    tool: "pin",
    title: "Chambres et groupes",
    desc: "Réparti en chambres, bus ou équipes. Chacun voit son groupe, le bureau voit tout.",
  },
  {
    tool: "planning",
    title: "Planning officiel",
    desc: "Le programme heure par heure, modifiable en direct. Fini l'affiche imprimée périmée.",
  },
  {
    tool: "img",
    title: "Album souvenirs commun",
    desc: "Deux cents téléphones, un seul album. De quoi alimenter votre compte toute l'année.",
  },
  {
    tool: "chart",
    title: "Feedback post-événement",
    desc: "Un questionnaire envoyé au bon moment, des réponses exploitables pour le bureau suivant.",
  },
];

export const BDE_USAGES = [
  {
    tool: "calendar",
    title: "Week-end d'intégration",
    desc: "200 inscrits, 26 chambres, 4 bus et un planning qui bouge jusqu'au dernier moment.",
  },
  {
    tool: "heart",
    title: "Soirée de gala",
    desc: "Tables, accès, navettes et photos officielles, sans dix messages privés par personne.",
  },
  {
    tool: "send",
    title: "Séjour ski ou voyage assoce",
    desc: "Trajets, hébergements, forfaits, documents obligatoires et niveaux de groupe.",
  },
  {
    tool: "bubble",
    title: "Soirées et after-works",
    desc: "Un événement récurrent qu'on duplique, avec la liste et les habitudes déjà en place.",
  },
];

export const PACK_INCLUDES = [
  "Un événement privé Yatu pour votre prochain rendez-vous",
  "Le lien d'invitation à diffuser après paiement",
  "La validation des participants par le bureau",
  "Les annonces organisateurs",
  "Le planning de l'événement",
  "Le chat global de l'événement",
  "Les chambres et les groupes",
  "L'album souvenirs commun",
  "Le feedback post-événement",
  "Un accompagnement personnalisé par l'équipe Yatu",
];

export const PACK_ASKS = [
  "Placer le lien Yatu dans votre parcours post-paiement",
  "Communiquer officiellement dessus auprès des participants",
  "Nous autoriser à utiliser un témoignage de votre bureau",
  "Remplir un retour d'expérience après l'événement",
  "Accepter que nous mesurions les statistiques d'usage",
];

export const DEMO_REASSURANCE = [
  { tool: "bell", label: "Réponse sous deux jours ouvrés" },
  { tool: "heart", label: "Aucun engagement, aucun contrat" },
  { tool: "people", label: "On parle aussi aux assos qui ne sont pas des BDE" },
];

export const EVENT_TYPES = [
  "Week-end d'intégration",
  "Soirée de gala",
  "Séjour ski ou voyage",
  "Soirée ou after-work",
  "Autre",
];
