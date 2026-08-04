/**
 * Les secrets du Worker, declares a la main.
 *
 * `npm run cf-typegen` lit wrangler.jsonc et ne connait donc que les bindings
 * qui y figurent : les valeurs posees par `wrangler secret put` lui sont
 * invisibles. Sans ce fichier, `env.FORMS_ENDPOINT` ne compilerait pas.
 *
 * Toutes optionnelles a dessein : un secret manquant doit produire une erreur
 * lisible a l'execution, pas un plantage au demarrage du Worker.
 */
declare global {
  interface CloudflareEnv {
    /** URL `/exec` de l'application Google Apps Script. */
    FORMS_ENDPOINT?: string;
    /** Jeton partage avec les proprietes du script, cote Apps Script. */
    FORMS_TOKEN?: string;
    /** Cle attendue par `/api/forms/health` et `/api/forms/drain`. */
    FORMS_ADMIN_KEY?: string;
    /** Sel du hachage des adresses IP. */
    FORMS_IP_SALT?: string;
  }
}

export {};
