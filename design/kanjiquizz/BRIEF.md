# Page `/kanjiquizz` — brief de design (source : Claude Design, projet « Portfolio — Page KanjiQuizz »)

> Ce dossier est la **matérialisation locale** des maquettes Claude Design, parce
> que les agents n'ont pas accès à Claude Design. `desktop.html` est la maquette
> verbatim, ouvrable dans un navigateur. Ce fichier porte les règles qui ne se
> lisent pas dans le HTML.

## Direction retenue : **C — « Fond sumi, encarts washi »**

Trois directions ont été maquettées puis départagées :

| | Direction | Verdict |
|---|---|---|
| A | Rupture washi (page claire) | **écartée** |
| B | Continuité portfolio (`#111111`, mono, sans couleur) | **écartée** |
| C | **Fond sumi, encarts washi** | **retenue** |

**Pourquoi A est écartée — c'est une mesure, pas un avis.** Les barres du burger
sont `white !important` dans un bloc **non scopé** de `Sidebar.vue`. Sur un fond
washi, elles tombent à **1,12:1** : la navigation mobile disparaît. Passer la page
en clair oblige donc à toucher du code partagé par tout le portfolio.

**Pourquoi B est écartée.** Sûre et inutile : elle échoue au seul public qui
compte pour cette page, celui qui doit installer l'application.

**Pourquoi C gagne techniquement.** `#17181C` (sumi de l'app) contre `#111111`
(fond du portfolio) = **1,06:1**. C'est la même surface à l'œil. La page porte
donc l'identité de l'app avec **zéro ligne modifiée dans le code partagé**.

---

## Tokens — repris **verbatim** de `AppKanjiQuizz/src/assets/theme.tsx`

Ne pas inventer de valeur. Toute couleur absente de cette liste est une erreur.

### Thème sumi (le thème de la page)

```
paper       #17181C     raised      #1F2026
ink         #ECEAE4     inkSoft     #B9B8B0     inkFaint  #8E8F98
line        #32333A     lineStrong  #787982
hanko       #D4574A     hankoFill   #C24A3E     onHanko   #FDF9F3
matcha      #7FB489     aizome      #7FA5C7     karashi   #D3A94F
fuji        #A492C7     asagi       #68ADA8
```

### Thème washi (uniquement dans les encarts, et dans les pages légales)

```
paper       #F4F2ED     raised      #FBFAF7
ink         #1D1E22     inkSoft     #4A4B52
line        #DDD9CF     lineStrong  #898373
hanko       #A20111     matcha      #4A7A52     aizome    #35597A
karashiText #8B6508     fuji        #6E5A96     asagi     #2E6B6B
```

### Espacement

`4 · 8 · 12 · 16 · 20 · 24 · 32` puis `48 · 64 · 96`

### Familles

- **serif** — `'Klee One','Hiragino Mincho ProN','Yu Mincho','Noto Serif JP',serif` → titres, glyphes japonais, chiffres marquants
- **mono** — `'Roboto Mono',Monaco,Consolas,monospace` → sur-titres, étiquettes, pied de page (c'est la police du portfolio existant)
- **sans** — pile système → corps de texte

---

## Les pièges de contraste — ils sont mesurés, pas théoriques

1. **`hanko` est interdit comme texte sur sumi.** `#D4574A` sur `#17181C` = **4,44:1**,
   sous le seuil de 4,5. Sur fond sombre, **les liens restent `ink`** et le hanko
   ne vit que dans le **soulignement**. En revanche `hanko` washi (`#A20111`) sur
   papier clair = **7,36:1**, parfaitement sûr — d'où l'inversion : la couleur de
   marque est un texte sur clair et un accent sur sombre.
2. **Les teintes JLPT sont des remplissages, jamais du texte.** matcha, aizome,
   karashi, fuji, asagi servent de barres, de pastilles, de glyphes décoratifs
   (`aria-hidden`). Aucune ne passe en texte de corps.
3. **`line` est décoratif uniquement** (1,35:1 / 1,29:1). C'est une faiblesse
   documentée de l'app qu'on **ne reproduit pas** : toute bordure fonctionnelle
   (carte, champ, bouton secondaire) utilise `lineStrong`.

---

## Les six glyphes de mode

Du **texte**, jamais des icônes. Chacun porte `lang="ja"` et `aria-hidden="true"`,
le libellé lisible est à côté.

| Glyphe | Mode | Teinte |
|---|---|---|
| 漢 | Quiz kanji | hanko |
| あ | Quiz kana | matcha |
| 語 | Vocabulaire | aizome |
| 文 | Phrases | karashi |
| 札 | Cartes | fuji |
| 書 | Tracé | asagi |

---

## Règles de mise en page

### Desktop
Voir `desktop.html`. Colonne de contenu **960 px max**, le rail existant est
**intouché**. Ordre des sections : hero → problème → 3 différenciateurs → 6 modes
→ **encart washi SRS** → 5 niveaux JLPT → **encart washi tarif** → disponibilité
→ sources et licences → pied avec les 3 liens légaux.

### Mobile (maquette `produit/mobile.html`, trois règles verrouillées)

1. **Les liens légaux vivent dans le pied de page, pas dans le rail.** Google
   exige une URL de suppression de compte atteignable sans installer l'app : elle
   doit être à un endroit stable de la page produit.
2. **Le washi ne franchit jamais le pli — deux encarts, pas trois.** Au-delà,
   l'effet « feuille posée » se dissout et la page redevient bicolore sans raison.
3. **Les six tuiles passent en deux colonnes, jamais en une.** À une colonne la
   grille perd sa lecture de tableau et cesse d'évoquer l'écran d'accueil de l'app.

---

## Contenu — chiffres à ne pas réécrire

| | |
|---|---|
| Kanji au total | **2 211** (N5 79 · N4 166 · N3 367 · N2 367 · N1 1 232) |
| Gratuit | **N5 uniquement, 79 kanji** — jamais N4 |
| Payant | **8,99 €, achat unique**, 2 132 kanji débloqués |
| Publication | 17 septembre 2026 (prévu) |
| Plateforme | Android 8.0+, React Native, pas d'iOS annoncé |

## Interdits de rédaction

- Jamais « gratuit à vie », jamais « définitivement » — l'offre peut changer.
- Jamais promettre le **hors-ligne** : le quiz kanji interroge l'API.
- Le bouton Google Play **n'a pas d'URL avant la publication**. Avant le
  17 septembre il doit soit disparaître, soit annoncer explicitement « bientôt ».
  Un bouton mort sur une page vitrine coûte plus qu'un bouton absent.
- Les **3 captures d'écran actuelles du portfolio sont périmées** (titre en deux
  mots, niveaux « Facile/Moyen/Difficile », « Francais » sans cédille). Elles sont
  à reprendre — lot séparé. La maquette les remplace par une reconstitution CSS.

---

## Contraintes techniques du portfolio

- Route en **minuscules** : `/kanjiquizz`. Le dépôt mélange `/Portfolio` et
  `/portfolio` — ne pas ajouter une troisième casse.
- **i18n : la racine du namespace est `kq`.** `src/main.js:36` fait un merge
  **superficiel** ; un fichier enraciné sur `message` écraserait les 9 descriptions
  de projets existantes.
- **Pas d'entrée dans la barre latérale.** `Sidebar.vue:165` indexe les onglets
  0-3 en dur ; ajouter une 5ᵉ entrée casse la surbrillance.
- Les liens du pied pointent vers des pages **servies par l'API/Caddy**, pas par
  le SPA : `/kanjiquizz/confidentialite`, `/kanjiquizz/suppression-compte`,
  `/mentions-legales`.
