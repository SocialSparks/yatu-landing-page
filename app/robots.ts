import type {MetadataRoute} from "next";
import {absoluteUrl, PRIVATE_PATHS} from "@/lib/site";

/**
 * Crawlers qui collectent la page pour entraîner un modèle.
 *
 * Cette liste reprend celle que Cloudflare injectait via son « managed
 * robots.txt » (AI Crawl Control), maintenant désactivé : deux systèmes
 * écrivaient dans le même fichier, ce qui produisait deux groupes
 * `User-agent: *` concurrents. Les crawlers stricts fusionnent ces groupes,
 * les autres ne gardent que le premier - et notre `Disallow: /bienvenue`
 * passait alors à la trappe. Un seul émetteur, plus d'ambiguïté.
 *
 * Ne pas confondre avec les bots de *citation*, volontairement absents d'ici :
 * OAI-SearchBot et ChatGPT-User (OpenAI), Claude-SearchBot et Claude-User
 * (Anthropic), PerplexityBot. Ceux-là vont chercher la page pour la citer et
 * renvoyer un lien dans une réponse - c'est de l'acquisition, on les laisse
 * passer par la règle `*`. Bloquer l'entraînement n'oblige pas à se rendre
 * invisible dans les réponses IA.
 *
 * Applebot-Extended et Google-Extended ne sont que des jetons d'opt-out
 * d'entraînement : ils n'ont aucun effet sur l'indexation par Apple ou Google.
 */
const AI_TRAINING_CRAWLERS = [
  "Amazonbot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "ClaudeBot",
  // Le crawler du produit Browser Rendering de Cloudflare, que des tiers
  // utilisent pour scraper. Hérité de la liste Cloudflare, gardé tel quel.
  "CloudflareBrowserRenderingCrawler",
  "GPTBot",
  "Google-Extended",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      // Un groupe nommé remplace la règle `*` pour ces bots au lieu de s'y
      // ajouter : le `Disallow: /` couvre déjà PRIVATE_PATHS, rien à répéter.
      { userAgent: AI_TRAINING_CRAWLERS, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Pas de `host` : directive propriétaire Yandex, jamais lue par Google ni
    // Bing, abandonnée par Yandex depuis 2018. Les validateurs la signalaient
    // comme syntaxe inconnue.
  };
}
