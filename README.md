# Site Yatu

Site officiel de pré-lancement de [Yatu](https://yatu-app.com), l’application qui réunit
la discussion, le planning, le budget, les listes, les documents et les souvenirs d’un
événement organisé à plusieurs.

Le projet est une application **Next.js App Router** en TypeScript, rendue principalement
en statique et déployée sur **Cloudflare Workers**. Les formulaires sont envoyés vers une
Google Sheet par Google Apps Script ; le dépôt ne contient ni base de données ni API métier.

## Stack

- Node.js 20 ou supérieur
- Next.js 15, React 19 et TypeScript
- CSS natif et styles React, sans framework CSS
- Cloudflare Workers et OpenNext pour l’hébergement
- Google Apps Script pour les formulaires
- Google Analytics 4 et Microsoft Clarity après consentement
- Sharp pour produire les variantes WebP et AVIF

## Démarrage local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Le site est ensuite disponible sur <http://localhost:3000>.

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
| `NEXT_PUBLIC_FORMS_ENDPOINT` | URL `/exec` de l’application Google Apps Script. | Vide, stockage local uniquement. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Identifiant Google Analytics 4. | Vide, GA désactivé. |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Identifiant du projet Microsoft Clarity. | Vide, Clarity désactivé. |
| `GOOGLE_SITE_VERIFICATION` | Jeton de validation Google Search Console. | Valeur de démonstration à remplacer. |

Les variables `NEXT_PUBLIC_*` sont intégrées au JavaScript lors du build. Une modification exige
donc un redémarrage local ou un nouveau déploiement. `GOOGLE_SITE_VERIFICATION` est injectée dans
les métadonnées statiques et doit elle aussi être définie comme variable de build, pas comme secret
runtime du Worker.

## Architecture

```text
app/                  Routes, métadonnées, sitemap, robots et cartes Open Graph
components/           Sections React, navigation, formulaires et consentement
components/landing/   Gabarit partagé des guides et pages produit SEO
lib/                  Contenus, routes, constantes du site et logique partagée
public/               Fichiers servis tels quels au navigateur
assets-src/           Sources haute définition non exposées publiquement
scripts/              Images, Google Sheet, contenu agent et contrôles
docs/                 Procédures opérationnelles complémentaires
middleware.ts         Négociation HTML/Markdown pour les agents
next.config.ts        En-têtes HTTP et cache des ressources statiques
wrangler.jsonc        Observabilité locale du Worker Cloudflare
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

Le contenu — titre, accroche, libellés et liste des liens — vit dans `lib/go-content.ts`.
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

Le script serveur est `scripts/google-sheet.gs`. Sa procédure d’installation est détaillée en
tête du fichier : créer une Google Sheet, publier le script comme application Web accessible à
tous, puis placer son URL `/exec` dans `NEXT_PUBLIC_FORMS_ENDPOINT`.

Après toute modification du script Apps Script, créer une **nouvelle version** du déploiement.
Modifier le fichier local ne met pas à jour la version déjà publiée par Google.

Sans endpoint configuré, les soumissions restent dans `localStorage` et le parcours complet reste
testable. Avec un endpoint, une copie locale est conservée, mais un échec réseau est affiché au
visiteur afin d’éviter de perdre silencieusement un contact. Chaque formulaire possède aussi un
honeypot `website` ignoré côté Google Apps Script.

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
`.open-next/assets/cdn-cgi/_next_cache/` — un préfixe que seul le Worker peut lire — et relues par
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
