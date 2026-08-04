/**
 * Le trajet entre la table `submissions` et la Google Sheet.
 *
 * Partage par trois appelants : le `waitUntil` de `/api/forms`, le drain manuel
 * de `/api/forms/drain`, et le handler `scheduled` de `custom-worker.ts`.
 *
 * Contraintes qui expliquent la forme de ce fichier : wrangler le bundle une
 * seconde fois, via `custom-worker.ts`, hors de la chaine Next. Donc APIs Web
 * uniquement (pas de built-in Node), aucun alias `@/`, pas d'`import
 * "server-only"`, et surtout aucun etat mutable au niveau module - il existe en
 * deux exemplaires a l'execution.
 */

/** Le sous-ensemble de l'environnement dont ce module a besoin. Structurel a
 *  dessein : `CloudflareEnv` n'est pas visible depuis le bundle wrangler. */
export type ForwardEnv = {
  FORMS_DB: D1Database;
  FORMS_ENDPOINT?: string;
  FORMS_TOKEN?: string;
};

/** Deux minutes : de quoi laisser une tentative aboutir ou mourir sans qu'un
 *  drain concurrent reprenne la meme ligne. */
const LEASE_MS = 120_000;

/** Sous les 20 s du `LockService` d'Apps Script, a dessein : une collision de
 *  verrou devient un retry silencieux au lieu d'un bouton rouge. */
const TIMEOUT_MS = 15_000;

const MAX_ATTEMPTS = 8;

/** 1 min, 5, 15, 1 h, 3 h, 6 h, 12 h, 24 h. Couvre une panne Apps Script d'un
 *  week-end sans marteler l'endpoint - ni bruler le quota d'ecritures D1. */
const BACKOFF_MS = [
  60_000,
  300_000,
  900_000,
  3_600_000,
  3 * 3_600_000,
  6 * 3_600_000,
  12 * 3_600_000,
  86_400_000,
];

/** Une ligne envoyee n'a plus de raison d'etre conservee au-dela : la feuille
 *  est le tableau de bord, cette table n'est qu'un tampon. */
const RETENTION_MS = 90 * 86_400_000;

type Row = { id: string; payload: string; attempts: number; kind: string };

/**
 * Une tentative d'envoi. `skip` quand la ligne n'est plus a envoyer (deja
 * partie, ou reprise par un autre drain).
 */
export async function forwardOne(env: ForwardEnv, id: string): Promise<"sent" | "retry" | "skip"> {
  const row = await env.FORMS_DB.prepare(
    `SELECT id, payload, attempts, kind FROM submissions WHERE id = ? AND status = 'pending'`,
  )
    .bind(id)
    .first<Row>();
  if (!row) return "skip";

  if (!env.FORMS_ENDPOINT) {
    // Visible plutot que silencieux : c'est exactement le cas ou l'ancien code
    // repondait "c'est bon" au visiteur sans que rien ne parte.
    await markFailed(env, row, "endpoint absent");
    return "retry";
  }

  try {
    const res = await fetch(env.FORMS_ENDPOINT, {
      method: "POST",
      // text/plain conserve : c'est ce que le deploiement Apps Script accepte
      // aujourd'hui, et le CORS n'est plus un sujet depuis un Worker. Le corps
      // reste du JSON, que le script parse comme tel.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: withToken(row.payload, env.FORMS_TOKEN),
      // L'URL /exec repond par une 302 vers script.googleusercontent.com.
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) return await fail(env, row, `http ${res.status}`);

    const text = await res.text();
    let parsed: { ok?: boolean; error?: string } | null = null;
    try {
      parsed = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      // Une page de connexion Google ou une erreur Drive en HTML : c'est ainsi
      // qu'un deploiement mal configure devient lisible dans `last_error`.
      return await fail(env, row, `non-json: ${text.slice(0, 200)}`);
    }
    if (parsed?.ok !== true) return await fail(env, row, `script: ${parsed?.error ?? "?"}`);

    await env.FORMS_DB.prepare(
      `UPDATE submissions
          SET status = 'sent', attempts = attempts + 1, last_error = NULL, updated_at = ?
        WHERE id = ?`,
    )
      .bind(Date.now(), row.id)
      .run();
    log({ evt: "forms.forward", id: row.id, kind: row.kind, outcome: "sent" });
    return "sent";
  } catch (err) {
    return await fail(env, row, `network: ${String(err).slice(0, 200)}`);
  }
}

export type DrainOptions = { limit?: number; exclude?: string };

/**
 * Un lot de soumissions en attente.
 *
 * Le budget de sous-requetes d'une invocation Worker est de 50 en plan gratuit,
 * et les sauts de redirection comptent : a `limit: 5` on consomme 1 SELECT +
 * 1 UPDATE de bail + 5x2 sauts + 5 UPDATE, soit 21. Ne pas depasser 10.
 */
export async function drainPending(
  env: ForwardEnv,
  { limit = 5, exclude }: DrainOptions = {},
): Promise<{ picked: number; sent: number }> {
  const now = Date.now();

  const { results } = await env.FORMS_DB.prepare(
    `SELECT id FROM submissions
      WHERE status = 'pending' AND next_attempt_at <= ?1 AND id <> ?2
      ORDER BY next_attempt_at ASC
      LIMIT ?3`,
  )
    .bind(now, exclude ?? "", limit)
    .all<{ id: string }>();

  if (!results.length) {
    await purgeSent(env, now);
    return { picked: 0, sent: 0 };
  }

  // D1 n'a pas de SKIP LOCKED : on repousse la fenetre du lot avant de tenter,
  // pour qu'un drain concurrent ne reprenne pas les memes lignes. Le cas ou ils
  // se croisent malgre tout est couvert par l'idempotence cote Apps Script.
  const ids = results.map((r) => r.id);
  await env.FORMS_DB.prepare(
    `UPDATE submissions SET next_attempt_at = ?
      WHERE id IN (${ids.map(() => "?").join(",")})`,
  )
    .bind(now + LEASE_MS, ...ids)
    .run();

  // Sequentiel : le `LockService` d'Apps Script serialise de toute facon les
  // ecritures, du parallelisme ne ferait que se disputer un verrou de 20 s.
  let sent = 0;
  for (const id of ids) {
    if ((await forwardOne(env, id)) === "sent") sent++;
  }

  await purgeSent(env, now);
  return { picked: ids.length, sent };
}

/** Un echec, journalise puis reprogramme. */
async function fail(env: ForwardEnv, row: Row, error: string): Promise<"retry"> {
  await markFailed(env, row, error);
  log({ evt: "forms.forward", id: row.id, kind: row.kind, outcome: "retry", attempts: row.attempts + 1, err: error });
  return "retry";
}

/**
 * Une seule requete pour tout : le compteur, la raison, la prochaine fenetre, et
 * le passage en `dead` quand il n'y a plus rien a esperer d'un nouvel essai.
 */
function markFailed(env: ForwardEnv, row: Row, error: string) {
  const attempts = row.attempts + 1;
  const delay = BACKOFF_MS[Math.min(row.attempts, BACKOFF_MS.length - 1)];
  return env.FORMS_DB.prepare(
    `UPDATE submissions
        SET attempts        = ?1,
            last_error      = ?2,
            updated_at      = ?3,
            next_attempt_at = ?4,
            status          = CASE WHEN ?1 >= ?5 THEN 'dead' ELSE 'pending' END
      WHERE id = ?6`,
  )
    .bind(attempts, error, Date.now(), Date.now() + delay, MAX_ATTEMPTS, row.id)
    .run();
}

/** La retention, faite au fil du drain plutot que par une tache dediee. */
function purgeSent(env: ForwardEnv, now: number) {
  return env.FORMS_DB.prepare(
    `DELETE FROM submissions WHERE status = 'sent' AND updated_at < ?`,
  )
    .bind(now - RETENTION_MS)
    .run();
}

/**
 * Le jeton, insere sans relire le corps.
 *
 * `JSON.parse` puis `JSON.stringify` sur chaque ligne coute du CPU dans un
 * handler cron qui n'en a que 10 ms en plan gratuit. Le corps stocke est
 * toujours un objet produit par `JSON.stringify` : il commence par `{` et
 * contient au moins `id`, `kind`, `ts` et `page`.
 */
function withToken(payload: string, token: string | undefined): string {
  if (!token) return payload;
  if (!payload.startsWith("{") || payload.length < 3) return payload;
  return `{"token":${JSON.stringify(token)},${payload.slice(1)}`;
}

/** Une ligne par issue, filtrable dans Workers Logs sur `forms.forward`. */
function log(entry: Record<string, unknown>) {
  console.log(JSON.stringify(entry));
}
