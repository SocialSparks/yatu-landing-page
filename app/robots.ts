import type {MetadataRoute} from "next";
import {absoluteUrl} from "@/lib/site";

/**
 * Crawlers bloqués partout.
 *
 * Il ne reste ici que ceux qui n'apportent rien à Yatu en échange. Les crawlers
 * d'entraînement des grands assistants (GPTBot, ClaudeBot, Google-Extended,
 * Applebot-Extended, CCBot) sont désormais autorisés, par la règle `*` : pour
 * une marque lancée en septembre 2026, être absent de leurs données veut dire
 * que ChatGPT, Claude ou Gemini ne sauront jamais d'eux-mêmes ce qu'est Yatu.
 * Google-Extended en particulier ne gouverne pas que l'entraînement : il coupe
 * aussi le *grounding* de Gemini, c'est-à-dire l'usage des pages pour répondre
 * en temps réel (les AI Overviews, elles, passent par Googlebot).
 *
 * Cette liste reprend celle que Cloudflare injectait via son « managed
 * robots.txt » (AI Crawl Control), maintenant désactivé : deux systèmes
 * écrivaient dans le même fichier, ce qui produisait deux groupes
 * `User-agent: *` concurrents. Les crawlers stricts fusionnent ces groupes,
 * les autres ne gardent que le premier - et nos `Disallow` passaient alors à
 * la trappe. Un seul émetteur, plus d'ambiguïté.
 *
 * Les bots de *citation* n'ont jamais été bloqués : OAI-SearchBot et
 * ChatGPT-User (OpenAI), Claude-SearchBot et Claude-User (Anthropic),
 * PerplexityBot. Ils vont chercher la page pour la citer et renvoyer un lien
 * dans une réponse.
 */
const BLOCKED_CRAWLERS = [
  "Amazonbot",
  "Bytespider",
  // Le crawler du produit Browser Rendering de Cloudflare, que des tiers
  // utilisent pour scraper. Hérité de la liste Cloudflare, gardé tel quel.
  "CloudflareBrowserRenderingCrawler",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Build assets and social-preview endpoints are useful to browsers
          // and link unfurlers, but are not indexable documents.
          "/_next/static/media/",
          "/opengraph-image",
          "/*/opengraph-image",
        ],
      },
      // Un groupe nommé remplace la règle `*` pour ces bots au lieu de s'y
      // ajouter : le `Disallow: /` couvre déjà tout le reste.
      { userAgent: BLOCKED_CRAWLERS, disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    // Pas de `host` : directive propriétaire Yandex, jamais lue par Google ni
    // Bing, abandonnée par Yandex depuis 2018. Les validateurs la signalaient
    // comme syntaxe inconnue.
  };
}
