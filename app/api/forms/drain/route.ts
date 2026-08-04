/**
 * Le levier manuel : vider la file en attente, tout de suite.
 *
 * Le drain opportuniste de `/api/forms` suffit tant que le site recoit du
 * trafic, et le cron le double une fois active. Mais aucun des deux ne se
 * declenche a la demande : quand on vient de reparer le deploiement Apps Script,
 * c'est cette route qu'on appelle pour ne pas attendre.
 */
import {getCloudflareContext} from "@opennextjs/cloudflare";
import {isAdmin, json, notFound} from "@/lib/server/admin";
import {drainPending} from "@/lib/server/forward-to-sheet";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Plus large que le drain de fond : ici on attend la reponse, et une invocation
 *  declenchee a la main n'a pas a menager le budget de sous-requetes du cron. */
const LIMIT = 20;

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  if (!isAdmin(request, env.FORMS_ADMIN_KEY)) return notFound();

  const result = await drainPending(env, { limit: LIMIT });
  return json(200, { ok: true, ...result });
}
