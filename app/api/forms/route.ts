/**
 * Le point d'entree des trois formulaires du site.
 *
 * Meme origine que la page : plus de bloqueur de pub ni de DNS scolaire capable
 * d'intercepter l'inscription, plus de prevol CORS, plus de redirection 302 vers
 * script.googleusercontent.com. Le Worker range la soumission dans D1, repond
 * tout de suite, et se charge de la porter jusqu'a la feuille en arriere-plan.
 *
 * Regle qui gouverne tout ce fichier : ne jamais repondre `ok` sans avoir ecrit
 * la ligne. C'est le mensonge que cette couche existe pour supprimer.
 */
import {getCloudflareContext} from "@opennextjs/cloudflare";
import {validateSubmission} from "@/lib/server/form-schema";
import {drainPending, forwardOne} from "@/lib/server/forward-to-sheet";

// Rien a prerendre ici, et `getCloudflareContext` n'a pas de bindings a offrir
// pendant la passe de build.
export const dynamic = "force-dynamic";
// Explicite parce que le reflexe sur Cloudflare est d'ecrire "edge" :
// l'adaptateur OpenNext execute tout dans le runtime Node du Worker.
export const runtime = "nodejs";

/** Largement au-dessus du plus gros formulaire - le message BDE - et largement
 *  en dessous de ce qu'il faudrait pour encombrer la base. */
const MAX_BODY_BYTES = 8192;

export async function POST(request: Request) {
  const { env, ctx } = await getCloudflareContext({ async: true });

  // Un navigateur envoie toujours `Origin` sur un POST cross-origin. Absent, la
  // requete vient d'un outil (curl, un test) : ce n'est pas une raison de la
  // refuser, le reste des controles s'applique de toute facon.
  const origin = request.headers.get("Origin");
  if (origin && !sameHost(origin, request.url)) {
    return json(403, { ok: false, error: "origine refusee" });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json(413, { ok: false, error: "corps trop grand" });

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: "json invalide" });
  }

  const checked = validateSubmission(body);
  // Un corps invalide n'est pas stocke : sinon la table devient un depotoir.
  if (!checked.ok) return json(400, { ok: false, error: "invalide", field: checked.field });
  const submission = checked.value;

  const ip = request.headers.get("CF-Connecting-IP") ?? "";
  const { success } = await env.FORMS_LIMITER.limit({ key: ip || "anon" });
  if (!success) return json(429, { ok: false, error: "trop de tentatives" });

  const now = Date.now();
  // Le piege a bots est enregistre au lieu d'etre jete : c'est ce qui rend
  // visible un faux positif de gestionnaire de mots de passe, au lieu de le
  // faire disparaitre en repondant "c'est bon" au visiteur.
  const status = submission.honeypot ? "spam" : "pending";

  let isNew: boolean;
  try {
    const insert = await env.FORMS_DB.prepare(
      `INSERT OR IGNORE INTO submissions
         (id, kind, status, payload, email, source, page,
          attempts, next_attempt_at, created_at, updated_at, ip_hash, ua)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, 0, 0, ?8, ?8, ?9, ?10)`,
    )
      .bind(
        submission.id,
        submission.kind,
        status,
        JSON.stringify(submission.payload),
        submission.email,
        submission.source,
        submission.page,
        now,
        await hashIp(ip, env.FORMS_IP_SALT),
        (request.headers.get("User-Agent") ?? "").slice(0, 300),
      )
      .run();

    // `changes === 0` : cet id est deja en base. Le visiteur a double-clique, ou
    // le client a renvoye apres une reponse perdue. On accuse reception sans
    // rien reecrire ni renvoyer une deuxieme fois vers la feuille.
    isNew = (insert.meta?.changes ?? 0) > 0;
  } catch (err) {
    // La base n'a pas pris la ligne : le visiteur doit le savoir et reessayer.
    console.log(JSON.stringify({ evt: "forms.insert", outcome: "error", err: String(err) }));
    return json(503, { ok: false, error: "indisponible" });
  }

  if (isNew && status === "pending") {
    // Le visiteur n'attend pas Google. Au passage, on profite de l'invocation
    // pour rejouer ce qui trainait : sur une page qui recoit du trafic, cela
    // suffit a vider la file sans cron.
    ctx.waitUntil(
      forwardOne(env, submission.id)
        .then(() => drainPending(env, { limit: 4, exclude: submission.id }))
        .catch((err) =>
          console.log(JSON.stringify({ evt: "forms.forward", outcome: "throw", err: String(err) })),
        ),
    );
  }

  return json(202, { ok: true, id: submission.id });
}

function sameHost(origin: string, requestUrl: string): boolean {
  try {
    return new URL(origin).host === new URL(requestUrl).host;
  } catch {
    return false;
  }
}

/** L'adresse elle-meme n'est jamais conservee : seul un hachage sale, de quoi
 *  reconnaitre un abus sans stocker de donnee identifiante. */
async function hashIp(ip: string, salt: string | undefined): Promise<string | null> {
  if (!ip) return null;
  const bytes = new TextEncoder().encode(`${salt ?? ""}:${ip}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
