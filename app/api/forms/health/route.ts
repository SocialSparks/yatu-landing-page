/**
 * L'etat du tampon en une requete.
 *
 * La question a laquelle cette route repond : « est-ce que des inscriptions
 * sont coincees, et pourquoi ». Un `oldestPendingAgeMinutes` qui depasse la
 * demi-heure veut dire que le tuyau vers la feuille est bouche.
 */
import {getCloudflareContext} from "@opennextjs/cloudflare";
import {isAdmin, json, notFound} from "@/lib/server/admin";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { env } = await getCloudflareContext({ async: true });
  if (!isAdmin(request, env.FORMS_ADMIN_KEY)) return notFound();

  const now = Date.now();

  const byStatus = await env.FORMS_DB.prepare(
    `SELECT status, COUNT(*) AS n, MIN(created_at) AS oldest FROM submissions GROUP BY status`,
  ).all<{ status: string; n: number; oldest: number }>();

  const topErrors = await env.FORMS_DB.prepare(
    `SELECT last_error, COUNT(*) AS n FROM submissions
      WHERE status IN ('pending', 'dead') AND last_error IS NOT NULL
      GROUP BY last_error ORDER BY n DESC LIMIT 5`,
  ).all<{ last_error: string; n: number }>();

  const pending = byStatus.results.find((row) => row.status === "pending");

  return json(200, {
    ok: true,
    byStatus: Object.fromEntries(byStatus.results.map((row) => [row.status, row.n])),
    oldestPendingAgeMinutes: pending ? Math.round((now - pending.oldest) / 60_000) : 0,
    topErrors: topErrors.results,
    endpointConfigured: Boolean(env.FORMS_ENDPOINT),
    now: new Date(now).toISOString(),
  });
}
