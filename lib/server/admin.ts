/**
 * Le garde des deux routes d'exploitation du tampon.
 *
 * Une cle absente ou fausse donne un 404, pas un 401 : ces routes n'ont aucune
 * raison d'annoncer leur existence a qui passe par la.
 */
export function isAdmin(request: Request, expected: string | undefined): boolean {
  if (!expected) return false;
  return new URL(request.url).searchParams.get("key") === expected;
}

export function notFound() {
  return new Response("Not Found", { status: 404 });
}

export function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}
