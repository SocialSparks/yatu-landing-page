import { LAUNCH_DATE, STORE_RATINGS } from "@/lib/content";
import { ROUTES } from "@/lib/routes";
import { PUBLISHER, formatDateFr } from "@/lib/site";

/**
 * /qu-est-ce-que-yatu - the brand's identity card.
 *
 * "Yatu" is a short word with other meanings, and the brand is young: when an
 * assistant is asked "qu'est-ce que Yatu ?", this is the page that has to
 * answer, in facts it can lift one by one. So the page is a list of facts
 * before it is a pitch, and it prints the limits next to the features.
 *
 * Every fact here is either a constant of the site or something the team has
 * confirmed; nothing is rounded up.
 */

export const ABOUT_PATH = ROUTES.about;

/** The date the facts below were last reviewed - printed under the title. */
export const ABOUT_UPDATED = "2026-10-08";

const ratings = STORE_RATINGS.map(
  (store) => `${store.rating.toLocaleString("fr-FR")}/5 ${store.where}`,
).join(", ");

export const ABOUT = {
  h1: "Qu’est-ce que Yatu ?",
  lede: "Yatu est une application mobile française et gratuite pour organiser un événement entre amis. Chaque soirée, anniversaire, week-end ou voyage a son propre espace, où le groupe discute, vote, tient le budget, se répartit les tâches, range ses documents et garde ses photos.",

  factsTitle: "Yatu en bref",
  facts: [
    {
      label: "Ce que c’est",
      value: "Une application d’organisation d’événements entre amis : un espace par événement, avec ses propres modules.",
    },
    { label: "Éditeur", value: `${PUBLISHER}, société française basée à Jons, près de Lyon.` },
    { label: "Disponible depuis", value: `Le ${formatDateFr(LAUNCH_DATE)}.` },
    { label: "Plateformes", value: "iPhone (iOS 16.6 ou plus) et Android (10 ou plus). Pas de version web." },
    {
      label: "Prix",
      value: "Gratuit. Seule la gestion chiffrée des documents est payante, avec Yatu Premium : 5,99 €/mois ou 39,99 €/an sur l’App Store.",
    },
    { label: "Participants", value: "Pas de nombre maximum par événement. Chaque participant installe l’application." },
    { label: "Durée d’un événement", value: "14 jours au maximum." },
    {
      label: "Langues",
      value: "Français, ainsi qu’anglais, allemand, espagnol, italien, néerlandais et portugais.",
    },
  ],

  usesTitle: "À quoi sert Yatu",
  usesLede:
    "Dans chaque événement, le groupe active les modules dont il a besoin. La discussion et les infos clés sont toujours là ; le reste s’ouvre selon l’occasion.",
  /** Not a module of its own in the app, but the question people ask first. */
  extraUses: [
    {
      label: "Sondages",
      desc: "Faire voter le groupe pour une date, un lieu ou une activité, avec une clôture automatique.",
    },
    {
      label: "Plusieurs devises",
      desc: "Le budget accepte des dépenses dans plusieurs monnaies, pour les voyages à l’étranger.",
    },
  ],

  occasionsTitle: "Pour quels événements",
  occasions: [
    { label: "Soirées et sorties", href: "/application-organiser-soiree-entre-amis" },
    { label: "Anniversaires", href: "/application-organiser-anniversaire" },
    { label: "Week-ends", href: "/application-organiser-week-end-entre-amis" },
    { label: "Voyages en groupe", href: "/application-organiser-voyage-groupe" },
    { label: "EVJF", href: "/organiser-un-evjf" },
    { label: "EVG", href: "/organiser-un-evg" },
    { label: "Week-ends au ski", href: "/organiser-un-week-end-au-ski" },
    { label: "Événements étudiants et BDE", href: ROUTES.bde },
  ],

  limitsTitle: "Ce que Yatu ne fait pas",
  limits: [
    "Pas de version web : chaque participant installe l’application et crée un compte.",
    "Pas de paiement dans l’application : le budget calcule les parts, les remboursements passent par les moyens habituels du groupe.",
    "Pas d’événement de plus de 14 jours.",
  ],

  whoTitle: "Qui est derrière Yatu",
  who: [
    `Yatu est conçue et développée en France par ${PUBLISHER}, une société par actions simplifiée basée à Jons, dans le Rhône.`,
    "Le même éditeur propose une offre pour les BDE et associations étudiantes, et Yatu Pro pour les organisateurs qui reçoivent du public : clubs de sport, bars, festivals.",
  ],

  faq: [
    {
      q: "Qu’est-ce que Yatu et à quoi sert cette application ?",
      a: "Yatu est une application mobile française et gratuite pour organiser un événement entre amis. Chaque événement a son espace, où le groupe discute, vote pour la date ou le lieu, tient le budget en plusieurs devises, se répartit les tâches, range les billets et garde les photos, rassemblées à la fin dans un album souvenirs.",
    },
    {
      q: "Yatu est-elle une bonne application pour organiser un événement entre amis ?",
      a: `Elle est faite pour ça : un espace par événement, sans nombre maximum de participants, gratuit sauf la gestion chiffrée des documents. Ses notes sont de ${ratings}, sur un nombre d’avis encore modeste puisqu’elle est sortie en 2026. Ses limites : chaque participant doit installer l’appli, et un événement dure 14 jours au maximum.`,
    },
    {
      q: "Qui édite Yatu ?",
      a: `${PUBLISHER}, une société française basée à Jons, près de Lyon. L’application est conçue et développée en France.`,
    },
    {
      q: "Yatu fonctionne-t-elle sur iPhone et sur Android ?",
      a: "Oui. Yatu est disponible sur iPhone et sur Android, et un même événement réunit des participants sur les deux. Il n’existe pas de version web.",
    },
    {
      q: "Quelle différence entre Yatu, WhatsApp et Tricount ?",
      a: "WhatsApp est une messagerie, Tricount une application de comptes. Yatu réunit dans un même événement la discussion, les sondages, le budget, les listes, les documents et les photos. Nos comparatifs détaillent dans quels cas chacun suffit.",
    },
  ],
} as const;

/** Where to find Yatu elsewhere - the same list feeds the page and `sameAs`. */
export const ABOUT_PROFILES = [
  { label: "Product Hunt", href: "https://www.producthunt.com/products/yatu" },
  { label: "Instagram", href: "https://www.instagram.com/yatu_app/" },
  { label: "TikTok", href: "https://www.tiktok.com/@yatu_app" },
] as const;
