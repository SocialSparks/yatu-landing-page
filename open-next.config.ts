import {defineCloudflareConfig} from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache
    from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Sans `incrementalCache`, OpenNext retombe sur le cache "dummy" : il ne renvoie
 * jamais rien, donc *aucune* page prérendue n'est servie telle quelle. Le Worker
 * re-rendait tout le React à chaque requête et relançait Satori sur chaque route
 * `opengraph-image` - de quoi dépasser les ressources du Worker (erreur 1102).
 *
 * Le site n'est prérendu qu'au build : les 40 entrées de `.open-next/cache/`
 * sont copiées dans les assets Workers au déploiement et relues par le binding
 * `ASSETS`. Pas de binding supplémentaire, pas de sous-requête payante, et le
 * préfixe `cdn-cgi/` reste inaccessible depuis l'extérieur. Contrepartie assumée :
 * ce cache est en lecture seule, donc pas d'ISR ni de `revalidatePath()`. Le jour
 * où une page devra se revalider en production, il faudra passer à R2 ou KV.
 */
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Sert l'entrée prérendue depuis la couche de routage, sans rendu React.
  // À repasser à `false` si le projet adopte le PPR ou `"use cache"`.
  enableCacheInterception: true,
});
