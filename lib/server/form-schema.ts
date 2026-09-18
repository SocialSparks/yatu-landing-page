/**
 * Ce qu'une soumission a le droit de contenir avant d'entrer dans la base.
 *
 * `/api/forms` est un endpoint d'ecriture public : sans liste blanche, la table
 * accueillerait n'importe quel champ envoye par n'importe qui. On ne garde donc
 * que les cles que la Google Sheet sait afficher, tronquees a des longueurs que
 * la feuille sait montrer, et on jette silencieusement le reste.
 *
 * Ecrit a la main plutot qu'avec un validateur : le projet n'a ni zod ni
 * react-hook-form, et cette sobriete de dependances est deliberee.
 */
import {type FormKind, HONEYPOT_NAME} from "@/lib/forms";

const KINDS: readonly FormKind[] = ["bde-demo"];

/**
 * Les champs de chaque formulaire. Une cle absente des deux listes n'arrive
 * jamais jusqu'a la feuille, meme si le navigateur l'a postee.
 */
const FIELDS: Record<FormKind, { required: readonly string[]; optional: readonly string[] }> = {
  "bde-demo": {
    required: ["nom", "email"],
    optional: ["asso", "ecole", "type", "taille", "message"],
  },
};

/** Au-dela, c'est la feuille qui deviendrait illisible, pas la base qui souffre. */
const MAX_LENGTH: Record<string, number> = {
  email: 254,
  message: 4000,
};
const DEFAULT_MAX_LENGTH = 200;

/** Une forme d'adresse plausible, sans pretendre valider la RFC. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type ValidSubmission = {
  id: string;
  kind: FormKind;
  /** Le piege a bots a ete rempli : la ligne sera rangee en `spam`, pas envoyee. */
  honeypot: boolean;
  /** Colonnes promues de la table - `null` quand le formulaire ne les fournit pas. */
  email: string | null;
  source: string | null;
  page: string | null;
  /** Le corps exact qui partira vers Apps Script. */
  payload: Record<string, unknown>;
};

export type ValidationResult =
  | { ok: true; value: ValidSubmission }
  | { ok: false; field: string };

export function validateSubmission(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) return { ok: false, field: "body" };
  const input = body as Record<string, unknown>;

  const kind = input.kind;
  if (typeof kind !== "string" || !KINDS.includes(kind as FormKind)) {
    return { ok: false, field: "kind" };
  }
  const spec = FIELDS[kind as FormKind];

  // Un id absent ou malforme ne justifie pas de refuser une demande : on en
  // fabrique un. La soumission perd son idempotence, jamais sa place en base.
  const id = typeof input.id === "string" && UUID.test(input.id) ? input.id : crypto.randomUUID();

  const payload: Record<string, unknown> = {
    id,
    kind,
    ts: isoDate(input.ts),
    page: pagePath(input.page),
  };

  for (const field of [...spec.required, ...spec.optional]) {
    const raw = input[field];
    if (raw === undefined || raw === null) continue;

    if (typeof raw !== "string" && typeof raw !== "number") return { ok: false, field };
    const value = String(raw).trim().slice(0, MAX_LENGTH[field] ?? DEFAULT_MAX_LENGTH);
    if (value) payload[field] = value;
  }

  for (const field of spec.required) {
    if (!payload[field]) return { ok: false, field };
  }

  // Une adresse presente doit etre valide ; une adresse absente n'est un probleme
  // que pour les formulaires qui l'exigent, et la boucle ci-dessus l'a deja dit.
  const email = typeof payload.email === "string" ? payload.email : null;
  if (email && !EMAIL.test(email)) return { ok: false, field: "email" };

  return {
    ok: true,
    value: {
      id,
      kind: kind as FormKind,
      // Un humain ne remplit jamais ce champ ; voir `components/honeypot.tsx`.
      honeypot: Boolean(input[HONEYPOT_NAME]),
      email,
      source: typeof payload.source === "string" ? payload.source : null,
      page: typeof payload.page === "string" ? payload.page : null,
      payload,
    },
  };
}

/** L'horodatage du navigateur s'il est credible, celui du serveur sinon. */
function isoDate(value: unknown): string {
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return new Date(parsed).toISOString();
  }
  return new Date().toISOString();
}

/** Un chemin du site, jamais une URL complete : la colonne Page sert a savoir
 *  d'ou vient la demande, pas a stocker ce qu'un bot veut y ecrire. */
function pagePath(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/")) return "";
  return value.slice(0, DEFAULT_MAX_LENGTH);
}
