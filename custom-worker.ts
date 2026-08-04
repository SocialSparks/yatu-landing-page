// Point d'entree du Worker, pret pour le cron mais NON ACTIVE.
//
// Pour l'activer, dans `wrangler.jsonc` :
//
//     "main": "custom-worker.ts",
//     "triggers": { "crons": ["*/5 * * * *"] }
//
// ...puis `npm run cf-typegen`. A ne faire qu'apres avoir verifie le reste en
// production : c'est le seul changement qui touche au point d'entree.
//
// Le vidage opportuniste declenche par `/api/forms` suffit tant que le site
// recoit du trafic ; ce cron n'est qu'un filet pour les periodes creuses, ou
// pour reprendre une file laissee par une panne d'Apps Script.
//
// OpenNext n'offre aucun hook de configuration pour un handler `scheduled` :
// envelopper le worker genere est la voie documentee.
// https://opennext.js.org/cloudflare/howtos/custom-worker
// @ts-ignore `.open-next/worker.js` n'existe qu'apres `npm run build`.
import {default as handler} from "./.open-next/worker.js";
// Chemin relatif, pas l'alias `@/` : ce fichier est bundle par esbuild via
// wrangler, hors de la chaine Next, qui seule connait les alias du tsconfig.
import {drainPending} from "./lib/server/forward-to-sheet";

/**
 * Les Durable Objects du worker genere ne sont volontairement pas reexportes :
 * `wrangler.jsonc` n'en declare aucun et `open-next.config.ts` utilise
 * `staticAssetsIncrementalCache`. A ajouter le jour ou `incrementalCache` change :
 *
 *     export { DOQueueHandler, DOShardedTagCache, BucketCachePurge } from "./.open-next/worker.js";
 */
export default {
  fetch: handler.fetch,

  async scheduled(_controller: ScheduledController, env: CloudflareEnv, ctx: ExecutionContext) {
    // Lot volontairement petit : un handler cron n'a que 10 ms de CPU en plan
    // gratuit, et le budget de sous-requetes compte les sauts de redirection.
    ctx.waitUntil(
      drainPending(env, { limit: 5 })
        .then((result) => console.log(JSON.stringify({ evt: "forms.cron", ...result })))
        .catch((err) => console.log(JSON.stringify({ evt: "forms.cron", err: String(err) }))),
    );
  },
} satisfies ExportedHandler<CloudflareEnv>;
