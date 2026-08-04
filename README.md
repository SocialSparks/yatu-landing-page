# Site Yatu

Site officiel de pré-lancement de [Yatu](https://yatu-app.com), l’application qui réunit
la discussion, le planning, le budget, les listes, les documents et les souvenirs d’un
événement organisé à plusieurs.

Le projet est une application **Next.js App Router** en TypeScript, rendue principalement
en statique et déployée sur **Cloudflare Workers**. Les formulaires passent par une route
Worker qui les range dans une base **D1** avant de les transmettre à une Google Sheet par
Google Apps Script : le tampon existe pour qu’une inscription ne se perde pas quand Google
ne répond pas.

## Stack

- Node.js 20 ou supérieur
- Next.js 15, React 19 et TypeScript
- CSS natif et styles React, sans framework CSS
- Cloudflare Workers et OpenNext pour l’hébergement
- Cloudflare D1 comme tampon des formulaires
- Google Apps Script pour l’écriture dans la Google Sheet
- Google Analytics 4 et Microsoft Clarity après consentement
- Sharp pour produire les variantes WebP et AVIF

## Démarrage local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le site est ensuite disponible sur <http://localhost:3000>.

Pour que les formulaires fonctionnent en local, il faut en plus la base du tampon et les secrets
du Worker :

```bash
cp .dev.vars.example .dev.vars
npx wrangler d1 create yatu-forms                    # reporter le database_id dans wrangler.jsonc
npx wrangler d1 migrations apply yatu-forms --local
```

`FORMS_ENDPOINT` peut rester vide : la soumission est quand même enregistrée, le parcours reste
testable de bout en bout, et la ligne porte `last_error = 'endpoint absent'`. Rien n’est perdu et
rien n’affiche une confirmation mensongère.

`predev` génère automatiquement `/llms.txt` et les représentations Markdown destinées aux
agents avant de démarrer Next.js. Le premier lancement est donc un peu plus long.

Ne pas lancer `npm run build` pendant que `npm run dev` tourne : les deux commandes utilisent
le même dossier `.next`. Après un build, arrêter tout serveur de développement avant de lancer
les contrôles de production.

## Commandes

| Commande | Usage |
| --- | --- |
| `npm run dev` | Génère le contenu agent puis lance le serveur de développement. |
| `npm run build` | Génère le contenu agent, le build Next.js puis l’artefact Worker OpenNext. |
| `npm run start` | Sert un build de production existant. |
| `npm run preview` | Construit puis sert le Worker dans le runtime local Cloudflare. |
| `npm run deploy` | Construit, copie le cache prérendu dans les assets, puis déploie le Worker. |
| `npm run logs` | Affiche les logs Cloudflare du Worker en temps réel. |
| `npm run logs:errors` | Affiche uniquement les invocations Cloudflare en erreur. |
| `npm run cf-typegen` | Régénère les types des bindings déclarés dans Wrangler. |
| `npm run typecheck` | Vérifie les types TypeScript sans écrire de fichiers. |
| `npm run generate:agents` | Régénère `/llms.txt` et les variantes Markdown. |
| `npm run check:agents` | Teste les en-têtes `Link`, `Vary` et la négociation Markdown d’un build. |
| `node scripts/check-duplicates.mjs` | Contrôle les duplications entre guides et pages produit après un build. |
| `node scripts/optimize-images.mjs` | Régénère les images publiques depuis `assets-src/`. |

Séquence de validation avant livraison :

```bash
npm run typecheck
npm run build
node scripts/check-duplicates.mjs
npm run check:agents
```

## Variables d’environnement

Copier `.env.example` vers `.env.local` pour le développement. Tous les identifiants ci-dessous
sont lus au build ; ils doivent également être configurés dans les variables de build Cloudflare.

| Variable | Rôle | Valeur locale par défaut |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine utilisé par les URL canoniques, le sitemap et les cartes sociales. | `https://yatu-app.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Identifiant Google Analytics 4. | Vide, GA désactivé. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Identifiant du projet Microsoft Clarity. | Vide, Clarity désactivé. |
| `GOOGLE_SITE_VERIFICATION` | Jeton de validation Google Search Console. | Valeur de démonstration à remplacer. |

Les variables `NEXT_PUBLIC_*` sont intégrées au JavaScript lors du build. Une modification exige
donc un redémarrage local ou un nouveau déploiement. `GOOGLE_SITE_VERIFICATION` est injectée dans
les métadonnées statiques et doit elle aussi être définie comme variable de build, pas comme secret
runtime du Worker.

Les formulaires ne dépendent d’aucune variable de build. C’était le cas jusqu’à
`NEXT_PUBLIC_FORMS_ENDPOINT` : oubliée dans les variables de build Cloudflare, elle produisait un
bundle où chaque inscription affichait une confirmation verte sans que rien ne parte. L’URL Apps
Script vit désormais côté Worker, en secret runtime.

| Secret du Worker | Rôle |
| --- | --- |
| `FORMS_ENDPOINT` | URL `/exec` de l’application Google Apps Script. |
| `FORMS_TOKEN` | Jeton partagé avec les propriétés du script Apps Script. |
| `FORMS_ADMIN_KEY` | Protège `/api/forms/health` et `/api/forms/drain`. |
| `FORMS_IP_SALT` | Sel du hachage des adresses IP. |

```bash
npx wrangler secret put FORMS_ENDPOINT   # puis TOKEN, ADMIN_KEY, IP_SALT
cp .dev.vars.example .dev.vars           # les mêmes clés en local
```

## Architecture

```text
app/                  Routes, métadonnées, sitemap, robots et cartes Open Graph
app/api/forms/        Réception des formulaires, santé et vidage du tampon
components/           Sections React, navigation, formulaires et consentement
components/landing/   Gabarit partagé des guides et pages produit SEO
lib/                  Contenus, routes, constantes du site et logique partagée
lib/server/           Validation et acheminement des formulaires côté Worker
migrations/           Schéma D1 du tampon des formulaires
public/               Fichiers servis tels quels au navigateur
assets-src/           Sources haute définition non exposées publiquement
scripts/              Images, Google Sheet, contenu agent et contrôles
docs/                 Procédures opérationnelles complémentaires
middleware.ts         Négociation HTML/Markdown pour les agents
next.config.ts        En-têtes HTTP et cache des ressources statiques
custom-worker.ts      Point d’entrée Worker avec le cron de vidage (non activé)
wrangler.jsonc        Bindings, observabilité et déclaration du Worker Cloudflare
open-next.config.ts   Adaptateur du build Next.js vers Cloudflare Workers
```

### Routes principales

| Route | Contenu |
| --- | --- |
| `/` | Présentation produit et inscription à la liste d’attente. |
| `/bde` | Offre dédiée aux BDE et associations, avec demande de démonstration. |
| `/organiser` | Index des guides d’organisation. |
| `/[slug]` | Guides éditoriaux et pages « application pour… » générés statiquement. |
| `/bienvenue` | Questionnaire facultatif après inscription, en `noindex`. |
| `/go` | Page « lien en bio » pour Instagram et TikTok, en `noindex`. |
| `/mentions-legales` | Mentions légales. |
| `/confidentialite` | Politique de confidentialité. |
| `/cookies` | Gestion du consentement et détail des traceurs. |

Le header, le footer, la mesure d’audience, le bandeau de consentement et les données structurées
globales sont montés dans `app/layout.tsx`.

### La page `/go`

C’est l’adresse à coller dans les bios Instagram et TikTok : un mini-linktree aux couleurs du
site, servi **sans header ni footer** pour que rien ne concurrence les quatre destinations.
`components/site-chrome.tsx` décide de cette mise à nu à partir du chemin ; son en-tête de
fichier explique pourquoi un groupe de routes `app/(site)/` n’a pas été retenu.

Le contenu - titre, accroche, libellés et liste des liens - vit dans `lib/go-content.ts`.
La carte principale a deux états, et un seul réglage les sépare : tant que `APP_STORE_URL` et
`PLAY_STORE_URL` sont vides dans `lib/content.ts`, elle affiche le compte à rebours et le
formulaire de liste d’attente ; dès qu’une des deux URL est renseignée, elle affiche les boutons
de téléchargement correspondants. Le jour du lancement, coller les deux liens suffit.

## Contenu et SEO

Les textes de l’accueil et les modules se trouvent dans `lib/content.ts`. La page BDE utilise
`lib/bde-content.ts`. Les guides et pages produit sont déclarés dans `LANDING_PAGES`, dans
`lib/landing-content.ts`.

Pour ajouter une page éditoriale :

1. Ajouter une entrée complète à `LANDING_PAGES`.
2. Utiliser une icône existante dans `public/assets/tools/`.
3. Ajouter la source photo dans `assets-src/` et lancer l’optimisation si nécessaire.
4. Renseigner `updated` avec la date réelle de modification du contenu.
5. Lancer le build, le contrôle de duplication et le contrôle agent.

La nouvelle page est automatiquement reprise par la route dynamique, le sitemap, les cartes
Open Graph, les breadcrumbs, les données structurées, le footer et l’index `/organiser`.

Les guides `kind: "guide"` répondent à une intention méthodologique. Les pages `kind: "app"`
présentent la réponse produit. Une paire guide/produit doit rester éditorialement distincte :
`scripts/check-duplicates.mjs` doit toujours terminer avec zéro phrase partagée.

`lib/site.ts` est la source de vérité pour :

- le domaine et les informations légales ;
- la liste `SITE_PAGES` des pages indexables ;
- les URL canoniques et les métadonnées par page ;
- les dates `lastModified` du sitemap.

`dynamicParams` reste à sa valeur par défaut sur `app/[slug]`. Les 404 observées autrefois en
production venaient du cache incrémental vide, pas de cette option : le routeur cherchait les
entrées prérendues dans un cache qui ne renvoyait jamais rien (voir
[Cache des pages prérendues](#cache-des-pages-prérendues)).

## Formulaires

Les trois parcours passent par `lib/forms.ts` :

| Formulaire | Destination |
| --- | --- |
| Liste d’attente | Onglet `Waitlist` de la Google Sheet. |
| Questionnaire `/bienvenue` | Complète la ligne `Waitlist` correspondant à l’e-mail. |
| Demande BDE | Onglet `Demandes BDE`. |

Le navigateur ne parle jamais directement à Google. Il poste sur `/api/forms`, sur le domaine du
site : ni bloqueur de publicité, ni filtre DNS scolaire, ni prévol CORS, ni redirection `/exec`
n’ont plus l’occasion d’intercepter une inscription.

Le script serveur est `scripts/google-sheet.gs`. Sa procédure d’installation est détaillée en tête
du fichier. Après toute modification, créer une **nouvelle version** du déploiement : modifier le
fichier local ne met pas à jour la version déjà publiée par Google.

Chaque formulaire possède un honeypot, nommé `yq-ref` et non plus `website` - c’est le nom de champ
que les gestionnaires de mots de passe remplissent depuis l’URL d’un identifiant enregistré, ce qui
transformait de vraies inscriptions en soumissions silencieusement ignorées. Une soumission piégée
n’est plus jetée : elle est rangée dans le tampon avec `status = 'spam'`, donc inspectable et
récupérable.

### Tampon des formulaires (D1)

Une soumission est écrite dans la base D1 `yatu-forms` **avant** toute tentative d’envoi, puis
portée jusqu’à la feuille en arrière-plan. Le visiteur n’attend jamais Google, et une panne du
script ne perd plus rien.

```
Navigateur ──POST /api/forms──> Worker
                                   ├─ INSERT D1 (status=pending)
                                   ├─ répond 202 tout de suite
                                   └─ waitUntil: POST Apps Script + vidage du reliquat
```

| Statut | Sens |
| --- | --- |
| `pending` | Accepté, pas encore accusé par Apps Script. Rejoué selon un backoff de 1 min à 24 h. |
| `sent` | Apps Script a répondu `{ok:true}`. Purgé au bout de 90 jours. |
| `spam` | Honeypot déclenché. Conservé, jamais transmis. |
| `dead` | Huit tentatives épuisées. Demande une intervention. |

L’identifiant de chaque soumission est un UUID généré par le navigateur, écrit dans la colonne `Id`
de la feuille. C’est lui qui rend un rejeu inoffensif : un délai dépassé côté Cloudflare ne veut pas
dire que la ligne n’a pas été écrite, et le script refuse d’écrire deux fois le même identifiant.

Mise en place :

```bash
npx wrangler d1 create yatu-forms                      # reporter le database_id dans wrangler.jsonc
npx wrangler d1 migrations apply yatu-forms --local    # puis --remote avant le déploiement
npm run cf-typegen                                     # requis après tout changement de wrangler.jsonc
```

La procédure complète - base D1, déploiement Apps Script, secrets du Worker, vérifications et
dépannage - est dans **[docs/mise-en-place-formulaires.md](docs/mise-en-place-formulaires.md)**.

Exploitation - `FORMS_ADMIN_KEY` protège les deux routes, qui répondent `404` sans la bonne clé :

```bash
# État du tampon : répartition par statut, âge du plus vieux pending, top des erreurs
curl -s "https://yatu-app.com/api/forms/health?key=$FORMS_ADMIN_KEY"

# Forcer un vidage, par exemple après avoir réparé le déploiement Apps Script
curl -s "https://yatu-app.com/api/forms/drain?key=$FORMS_ADMIN_KEY"

# Ce qui coince, avec la raison
npx wrangler d1 execute yatu-forms --remote --command \
  "SELECT id, kind, email, attempts, last_error FROM submissions
    WHERE status IN ('pending','dead') ORDER BY created_at DESC LIMIT 20"

# Remettre une ligne dans la file
npx wrangler d1 execute yatu-forms --remote --command \
  "UPDATE submissions SET status='pending', attempts=0, next_attempt_at=0 WHERE id='<uuid>'"
```

Le champ `last_error` est le point de diagnostic : `timeout`, `http 500`, `script: …` ou
`non-json: …` - ce dernier apparaît quand `/exec` renvoie une page de connexion Google plutôt que
du JSON, c’est-à-dire quand le déploiement est mal configuré.

Un `oldestPendingAgeMinutes` supérieur à 30 signifie que le tuyau vers la feuille est bouché.

### Vidage périodique

Le vidage opportuniste déclenché à chaque soumission suffit tant que le site reçoit du trafic.
`custom-worker.ts` contient un handler `scheduled` prêt à l’emploi, **non activé** : il le devient
en pointant `main` sur ce fichier et en ajoutant le déclencheur.

```jsonc
"main": "custom-worker.ts",
"triggers": { "crons": ["*/5 * * * *"] }
```

À faire seulement après avoir vérifié le reste en production : c’est le seul changement qui touche
au point d’entrée du Worker.

## Images

Les sources originales restent dans `assets-src/`. Le navigateur ne reçoit que les variantes
optimisées stockées dans `public/` :

```bash
node scripts/optimize-images.mjs
```

Le script produit les tailles WebP/AVIF attendues par les composants `<picture>`. Les variantes
générées doivent être commitées. Les mockups et photos visibles au-dessus de la ligne de flottaison
sont chargés avec une priorité élevée ; les autres images sont chargées en différé.

`next/image` n’est pas utilisé car le déploiement Worker ne fournit pas d’optimiseur d’image à la
requête. Les ressources stables de `/assets` et `/mockups` reçoivent un cache immutable d’un an via
`next.config.ts`.

## Analytics et consentement

`components/measurement.tsx` ne charge Google Analytics et Microsoft Clarity qu’après acceptation
de la catégorie « Mesure d’audience ». Le retrait du consentement est transmis aux deux outils et
leurs cookies accessibles sont supprimés.

Les préférences sont gérées par `components/cookie-banner.tsx` et décrites sur `/cookies`. Aucun
signal publicitaire Google n’est activé.

## Accès pour les agents

Le site conserve l’HTML par défaut et répond en Markdown lorsque la requête contient
`Accept: text/markdown`. Les représentations sont produites depuis le `<main>` réellement rendu de
chaque page indexable, puis intégrées au build.

- `/llms.txt` fournit l’index machine lisible du site ;
- la page d’accueil expose cet index avec un en-tête RFC 8288 `Link` ;
- `middleware.ts` effectue la négociation de contenu et redirige vers `public/agent-markdown/` (le dossier ne commence pas par un underscore `_` pour éviter d'être ignoré par les assets statiques Cloudflare) ;
- `scripts/check-agent-readiness.mjs` vérifie le contrat HTTP localement.

La configuration DNS-AID et DNSSEC reste une opération de zone Cloudflare. Les enregistrements,
commandes de validation et limites du draft sont documentés dans
[`docs/agent-discovery.md`](docs/agent-discovery.md).

## Déploiement Cloudflare

Le domaine de production est `https://yatu-app.com`. Le déploiement utilise l’adaptateur
`@opennextjs/cloudflare`. Le build Cloudflare doit utiliser Node.js 20+ avec les commandes :

```bash
npm ci
npm run build
# Commande de déploiement Cloudflare Workers Builds :
npx opennextjs-cloudflare deploy
```

`npm run build` produit `.open-next/worker.js` et `.open-next/assets`. `wrangler.jsonc` référence
ces deux sorties, active `nodejs_compat`, le binding Cloudflare Images `IMAGES`, les source maps,
les logs d’invocation et les traces. Le nom du Worker est `yatu-landing-page`.

Le déploiement passe par `opennextjs-cloudflare deploy` et non par `wrangler deploy` seul : lui
seul copie le cache des pages prérendues dans les assets avant l’envoi (voir ci-dessous).

### Cache des pages prérendues

`open-next.config.ts` déclare `staticAssetsIncrementalCache`. Sans cette configuration, OpenNext
utilise un cache factice qui ne renvoie jamais rien : le Worker re-rendait alors chaque page et
chaque carte Open Graph à chaque requête, jusqu’à l’erreur Cloudflare 1102 « Worker exceeded
resource limits ».

Au déploiement, les entrées de `.open-next/cache/` sont copiées dans
`.open-next/assets/cdn-cgi/_next_cache/` - un préfixe que seul le Worker peut lire - et relues par
le binding `ASSETS`. Une réponse servie depuis ce cache porte l’en-tête `x-nextjs-cache: HIT` :
c’est le contrôle à faire après chaque déploiement.

```bash
curl -sI https://yatu-app.com/ | grep -i x-nextjs-cache            # attendu : HIT
curl -sI https://yatu-app.com/opengraph-image | grep -i x-nextjs-cache
```

Ce cache est en lecture seule, ce qui convient à un site dont le contenu ne change qu’au
déploiement : pas d’ISR, pas de `revalidatePath()`. Une page qui devrait se revalider en
production imposerait de passer à R2 ou KV. Les rendus hors cache (slug inconnu, 404) émettent un
log `Failed to set to read-only cache` sans incidence sur la réponse.

Le fichier Wrangler ne contient volontairement aucun secret. Les variables publiques et le jeton
Search Console sont configurés dans les variables de build du projet Cloudflare. Lorsqu’un nouveau
binding est ajouté au fichier Wrangler, relancer `npm run cf-typegen`.

### Logs et erreurs

Les erreurs de build et de déploiement sont disponibles dans le détail du déploiement Cloudflare.
Pour les erreurs d’exécution, ouvrir **Workers & Pages > yatu-landing-page > Observability** ou
suivre les événements en temps réel depuis un terminal authentifié :

```bash
npx wrangler login
npm run logs
npm run logs:errors
```

Dans Workers Logs, le filtre `$metadata.error EXISTS` retrouve toutes les erreurs et
`$workers.outcome = "exception"` cible les exceptions non interceptées. Les traces permettent
d’examiner la durée des requêtes, sous-requêtes et appels de bindings. Les source maps envoyées par
Wrangler rendent les piles d’appels du Worker plus lisibles.

Ces journaux couvrent le Worker, mais pas les exceptions JavaScript exécutées uniquement dans le
navigateur. Une collecte dédiée côté client, par exemple Sentry, est nécessaire pour centraliser
ces erreurs avec leur URL, navigateur et pile d’appels.

Après déploiement, vérifier au minimum :

```bash
curl -I https://yatu-app.com
curl -I -H 'Accept: text/markdown' https://yatu-app.com
curl https://yatu-app.com/llms.txt
```

La seconde réponse doit utiliser `Content-Type: text/markdown` et inclure `Vary: Accept`.
