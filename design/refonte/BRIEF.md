# Refonte du portfolio — brief d'implémentation

Maquettes de référence, à lire **avant toute chose**, dans cet ordre :

1. `design/refonte/tokens.html` — le socle de couleurs, les contrastes mesurés, les 4 règles
2. `design/refonte/apropos.html` — la page prioritaire, diagnostic + cible
3. `design/refonte/pages.html` — Accueil, Projets, Contact, rail, mobile, ordre d'application

Contexte antérieur : `design/kanjiquizz/BRIEF.md` et `design/kanjiquizz/desktop.html`
(la page `/kanjiquizz` est déjà livrée et conforme ; elle n'est touchée qu'à l'étape 5).

---

## Le problème à traiter

Le projet n'a **aucune couche de tokens**. Chaque couleur est un littéral recopié composant par
composant. C'est la cause racine de l'incohérence : trois noirs pour une même surface
(`black` au rail, `#111111` aux pages, `#17181C` sur KanjiQuizz), deux systèmes d'accent
(`#D4574A` et le `#505d67`/`#216793` du bouton Contact). Chaque ajout recopie un littéral de plus.

Créer la couche de tokens **est** le livrable principal. Le reste en découle.

---

## Étape 1 — La typographie (à faire en premier)

`'Roboto Mono'` est déclarée dans `index.html:21` et une quinzaine de blocs CSS, mais
**aucun `@font-face` ni lien Google Fonts n'existe dans le projet**. Le site s'affiche donc en
Monaco (macOS) ou Courier New (Windows). Tant que ce point n'est pas réglé, aucune maquette
ci-dessous ne se voit telle que dessinée.

- Auto-héberger Roboto Mono **400 et 700**, sous-ensemble latin, en woff2, avec
  `font-display: swap`. Voie recommandée : `npm i @fontsource/roboto-mono` puis
  `import '@fontsource/roboto-mono/400.css'` et `/700.css` dans `main.js`.
- **Si le registre npm est inaccessible, ne pas contourner en pointant vers un CDN**
  (le site doit rester autonome) : s'arrêter et le signaler dans le rapport.

### Twemoji — vérifier, ne pas supprimer d'office

`App.vue:45-48` déclare `@font-face { font-family:'Twemoji'; src: url('src/assets/fonts/TwemojiMozilla.ttf') }`.
Ce chemin est relatif au CSS compilé et paraît tomber en 404 après build, ce qui rendrait la
police morte tout en embarquant ~1,07 Mo. **Vérifier dans `dist/` avant de conclure.**

Le commit `707b90d "fix expand image and chrome emoji"` montre que ce rendu d'emoji a été
travaillé volontairement. Donc : **si la police est cassée, la réparer** (utiliser l'URL résolue
par Vite — l'import existe déjà en `App.vue:57`), pas la supprimer. Signaler le coût en poids
dans le rapport et laisser l'arbitrage à Camille.

---

## Étape 2 — La couche de tokens (rendu identique attendu)

Créer `src/assets/tokens.css`, importé depuis `main.js`, avec exactement :

```css
:root{
  --pf-paper:#111111;
  --pf-raised:#191A1E;
  --pf-ink:#F8F8F8;
  --pf-ink-soft:#AAAAAA;
  --pf-ink-faint:#7E7F86;
  --pf-line:#2A2B30;
  --pf-line-strong:#6A6B73;
  --pf-hanko:#D4574A;
  --pf-hanko-deep:#C24A3E;
  --pf-on-hanko:#FDF9F3;
  --pf-mono:'Roboto Mono', ui-monospace, Menlo, Consolas, monospace;
  --pf-s1:4px;  --pf-s2:8px;  --pf-s3:12px; --pf-s4:16px; --pf-s5:20px;
  --pf-s6:24px; --pf-s7:32px; --pf-s8:48px; --pf-s9:64px; --pf-s10:96px;
}
```

Les custom properties traversent les `<style scoped>` : aucun composant n'a besoin d'être
« dé-scopé ». Remplacer ensuite **tous** les littéraux de couleur des composants par les
`var(--pf-*)` correspondants, page par page.

Cette étape doit être **à rendu strictement identique**, sauf trois valeurs qui changent
volontairement et sont listées en étape 4. Les correspondances :

| Littéral actuel | Token |
|---|---|
| `#111111` | `--pf-paper` |
| `#f8f8f8`, `#fff`, `white` (texte) | `--pf-ink` |
| `#aaaaaa` | `--pf-ink-soft` |
| `#333333` | `--pf-line` |
| `#D4574A` | `--pf-hanko` |
| `'Roboto Mono', Monaco, courier, monospace` | `--pf-mono` |

**Aucune couleur littérale ne doit subsister dans un composant à la fin.** C'est la règle qui
empêche l'incohérence de revenir au prochain ajout.

---

## Étape 3 — À propos (prioritaire — c'est la page jugée ratée)

Voir `design/refonte/apropos.html` pour le diagnostic complet et la cible rendue.

Six corrections :

1. **Une seule colonne de 640 px.** `.tab-content` passe en `flex-direction: column` à tous les
   points de rupture. Aujourd'hui il est en `row` au-dessus de 1200 px : l'intro et les
   coordonnées s'étalent sur ~1170 px pendant que tout le reste tient en 750 px. C'est la
   cassure visuelle principale. 640 px et non 750 : en chasse fixe à 15 px, 750 px donne
   ~78 caractères par ligne, 640 px en donne ~66.
2. **Les coordonnées deviennent un `<dl>`**, identique à celui de `Contact.vue` (mêmes classes,
   même rendu). Ce sont des paires libellé/valeur, pas une liste.
3. **Supprimer `.skillsBox` et `.skills`** (le carrousel de logos) ainsi que les 12 `<img>` :
   6 doublons, une violation WCAG 2.2.2 (animation infinie de 12 s sans pause), déjà
   `display:none` sous 1200 px, et redondant avec la liste de compétences issue du CV située
   200 px plus bas. Les images `.png`/`.svg` correspondantes deviennent orphelines : les lister
   dans le rapport, ne pas les supprimer du dépôt.
4. **`text-align: justify` retiré** de `.description` : rivières blanches en chasse fixe.
5. **Fusionner les deux introductions.** `message.about` et `message.profileIntro` disent tous
   deux « une année au Japon (2023-2025) » et « de retour en France », à 150 px d'écart.
   `message.about` reprend le texte court de `profileIntro` (voir la maquette pour la version
   française exacte) et `profileIntro` est supprimée. **Dans les trois locales fr / en / jp.**
   Reprendre la formulation du CV telle quelle, ne jamais re-genrer ni inventer de variante.
6. L'âge et la date de naissance ont **déjà** été retirés du template. Ne pas les réintroduire.

---

## Étape 4 — Accueil, Projets, Contact, rail

Voir `design/refonte/pages.html`. Les trois seuls changements de couleur volontaires du projet :

| Où | Avant | Après | Raison |
|---|---|---|---|
| `Contact.vue` `.custom-button` | fond `#505d67`, bordure `#216793` | fond `--pf-hanko-deep`, texte `--pf-on-hanko` | 2,79:1 → 4,58:1, et ce bleu-gris n'appartient à aucune palette du site |
| `Portfolio.vue` `.pf-slot` | bordure pointillée `#4a4a4a` | `1px solid var(--pf-line-strong)` sur `--pf-raised` | 2,13:1 → 3,57:1 ; la bordure est seule à délimiter la tuile → WCAG 1.4.11 |
| `Sidebar.vue` `.leftPart` | `background-color: black` | `--pf-paper` + `border-right: 1px solid var(--pf-line)` | 1,08:1 contre les pages : lu comme une salissure, pas comme une séparation |

Plus, sans changement de palette :

- **`Home.vue` `.name`** : 35 px sans capitales → 28 px, `700`, `letter-spacing:.12em`,
  `text-transform:uppercase`. C'est l'idiome déjà appliqué par `.pf-gallery-title`,
  `.pf-contact-title` et `.pf-parcours-title` ; l'accueil était seul à y échapper.
- **`Home.vue`** : ajouter la fonction « Développeur Full-Stack » en `--pf-hanko` sous le nom,
  et deux boutons (« Voir KanjiQuizz » vers `/kanjiquizz`, « Me contacter » vers `/contact`).
  Aujourd'hui l'accueil ne mène nulle part. Les libellés passent par i18n, dans les 3 locales.
- **`Sidebar.vue` `.itemSelected` et `.item:hover`** : remplacer le saut
  `letter-spacing: 2px → 4px` par `border-left: 3px solid var(--pf-hanko)` et
  `color: var(--pf-ink)`. Le saut d'interlettrage élargit le texte au survol et décale la ligne.

---

## Étape 5 — Unifier le fond de la page KanjiQuizz

Passer `--kq-paper` de `#17181C` à `#111111` (ou directement à `var(--pf-paper)`).

Écart mesuré entre les deux fonds : **1,06:1** — invisible à l'œil. Mais c'est ce qui autorise
`--pf-hanko` en texte partout : `#D4574A` vaut **4,73:1** sur `#111111` et **4,44:1** sur
`#17181C`, pour un seuil de 4,5. Vérifier ensuite que la page KanjiQuizz n'utilise pas
`hanko` en texte sur un encart `--pf-raised` : là, le ratio retombe à **4,36:1** et le texte
doit rester `--pf-ink`, le rouge passant en bordure ou en puce.

---

## Contraintes dures — ne pas franchir

1. **`Sidebar.vue` : ne pas toucher `.bm-burger-bars { background-color: white !important }`.**
   Ce bloc est **non scopé**. Les barres doivent rester blanches et le fond rester sombre :
   c'est cette contrainte qui avait déjà fait écarter la direction claire pour KanjiQuizz
   (1,12:1 sur fond clair = navigation mobile invisible).
2. **`Sidebar.vue` : ne pas ajouter d'entrée de navigation.** `currentTab` indexe les onglets
   0 à 3 en dur ; une 5ᵉ entrée casse la surbrillance de l'onglet actif.
3. **`main.js:36` fait un merge *superficiel* des fichiers de locale.** Les racines `message`
   et `kq` ne doivent jamais être fusionnées : un fichier de traduction enraciné sur `message`
   écraserait les clés existantes.
4. **`vue-i18n` tourne en mode *legacy*** (`createI18n()` sans `legacy:false`) : `useI18n()`
   lève une exception. Utiliser `$t` / `$tm` / `$rt` dans les templates, ou le contournement par
   `getCurrentInstance()` déjà en place dans `src/composables/useKqHead.js`.
5. **Aucune nouvelle dépendance** hors `@fontsource/roboto-mono`.
6. **Ne rien publier du numéro de téléphone** de Camille, ni de sa date de naissance.
   Coordonnées autorisées : e-mail, GitHub, ville (Rouen 76000).
7. **`npm run build` doit passer** en fin de parcours. Vérifier aussi que les 4 routes plus
   `/kanjiquizz` rendent bien, dans les 3 langues.

---

## À signaler dans le rapport, sans le corriger

- **Casse des routes** : `router.js` déclare `/Portfolio` et `/Contact` avec majuscule, tandis
  que `Sidebar.vue` pointe vers `/portfolio` (desktop), `/portFolio` (burger) et `/contact`.
  vue-router 4 matche sans tenir compte de la casse par défaut, donc **cela fonctionne
  aujourd'hui** — mais les trois graphies devraient être normalisées.
- Les images du carrousel devenues orphelines.
- Le poids réel de Twemoji dans `dist/`.
