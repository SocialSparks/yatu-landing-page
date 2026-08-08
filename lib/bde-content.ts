/**
 * The words of the BDE / associations page.
 *
 * Same editorial rules as lib/content.ts: tutoiement (the reader is one person
 * of the bureau, even when the bureau is a team), benefits before features, and
 * nothing promised that will not be there on day one - no automatic
 * notification, no duplicated event, no head count we cannot back.
 */

import { icon } from "@/lib/content";

/** The page’s calls to action, spelled the same way in every section. */
export const BDE_CTA = {
  demo: "Demander une démo",
  pilote: "Voir le pack pilote",
  features: "Voir les fonctionnalités",
  amis: "Yatu pour un groupe d’amis",
} as const;

export const BDE_CHIPS = [
  { dot: "#96E087", label: "Gratuit pour les pilotes" },
  { dot: "#C6A8E1", label: "Accompagnement par l’équipe" },
];

/** The example event card in the hero - a mock-up, labelled as one. */
export const BDE_SHOWCASE = {
  title: "WEI 2026 · Biscarrosse",
  status: "Exemple",
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
    desc: "Le tableur des paiements, le formulaire d’inscription et la liste réelle ne disent jamais la même chose.",
  },
  {
    tool: "bubble",
    title: "Les infos importantes se noient",
    desc: "L’heure du départ passe dans un groupe de deux cents, entre deux blagues. La moitié ne la verra pas.",
  },
  {
    tool: "pin",
    title: "Les chambres se font la veille",
    desc: "Répartir cent quatre-vingts personnes en vingt-six chambres, avec les affinités, à la main, à minuit.",
  },
  {
    tool: "calendar",
    title: "Tout repart de zéro chaque année",
    desc: "Le bureau change, les fichiers se perdent, et l’expérience de l’an dernier avec.",
  },
];

export const BDE_DEROULE = [
  {
    icon: icon("ticket"),
    step: "1 · BILLETTERIE",
    title: "Le lien arrive après le paiement",
    desc: "Tu gardes ta billetterie actuelle. Yatu se glisse juste après : celui qui a payé reçoit le lien de l’événement.",
  },
  {
    icon: icon("addpeople"),
    step: "2 · AVANT",
    title: "Valider, informer, répartir",
    desc: "Ton bureau valide les entrants un par un, publie les annonces officielles, prépare le planning et attribue les chambres.",
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
    title: "Album, retours, passation",
    desc: "Les photos de tout le monde au même endroit, un questionnaire de retour, et un bilan à transmettre au prochain bureau.",
    dark: true,
  },
];

export const BDE_FEATURES = [
  {
    tool: "addpeople",
    title: "Inscriptions validées",
    desc: "Personne n’entre dans l’événement sans être validé par ton bureau. La liste reste juste.",
  },
  {
    tool: "bell",
    title: "Annonces organisateurs",
    desc: "Un canal officiel, séparé de la discussion, que personne ne peut noyer sous les messages.",
  },
  {
    tool: "pin",
    title: "Chambres et groupes",
    desc: "Réparti en chambres, en bus ou en équipes. Chacun voit son groupe, ton bureau voit tout.",
  },
  {
    tool: "planning",
    title: "Planning officiel",
    desc: "Le programme heure par heure, modifiable en direct. Fini l’affiche imprimée déjà périmée.",
  },
  {
    tool: "img",
    title: "Album photo commun",
    desc: "Deux cents téléphones, un seul album : les photos du week-end ne se perdent plus.",
  },
  {
    tool: "chart",
    title: "Retours après l’événement",
    desc: "Un questionnaire à envoyer après coup, avec des réponses exploitables pour le bureau suivant.",
  },
];

export const BDE_USAGES = [
  {
    tool: "calendar",
    title: "Week-end d’intégration",
    desc: "Deux cents inscrits, vingt-six chambres, quatre bus et un planning qui bouge jusqu’au dernier moment.",
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
    desc: "Le format qui revient le plus souvent : les inscrits, les infos pratiques et le point de rendez-vous.",
  },
];

export const PACK_INCLUDES = [
  "Un événement privé Yatu pour ton prochain rendez-vous",
  "Le lien d’invitation à diffuser après paiement",
  "La validation des inscrits par ton bureau",
  "Les annonces organisateurs",
  "Le planning de l’événement",
  "La discussion générale de l’événement",
  "Les chambres et les groupes",
  "L’album photo commun",
  "Le questionnaire de retour",
  "Un accompagnement personnalisé par l’équipe Yatu",
];

export const PACK_ASKS = [
  "Placer le lien Yatu dans ton parcours après paiement",
  "Communiquer officiellement dessus auprès des participants",
  "Nous autoriser à citer un témoignage de ton bureau",
  "Remplir un retour d’expérience après l’événement",
  "Accepter qu’on mesure les statistiques d’usage",
];

export const DEMO_REASSURANCE = [
  { tool: "bell", label: "Réponse sous deux jours ouvrés" },
  { tool: "heart", label: "Aucun engagement, aucun contrat" },
  { tool: "people", label: "On parle aussi aux assos qui ne sont pas des BDE" },
];

export const EVENT_TYPES = [
  "Week-end d’intégration",
  "Soirée de gala",
  "Séjour ski ou voyage",
  "Soirée ou after-work",
  "Autre",
];
