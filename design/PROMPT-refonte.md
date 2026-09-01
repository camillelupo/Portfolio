# Prompt de refonte — portfolio Camille Lupo

## 1. Requête pour le skill ui-ux-pro-max (courte, 1 intention, 2-5 termes)

Le contrat de requête du skill : **une seule intention dominante, 2 à 5 termes utiles,
une contrainte**. Une requête longue fait dériver le moteur BM25 (c'est ce qui a produit
Brutalism sur un run et Minimalism sur l'autre).

```
developer portfolio dark minimal --domain style
developer portfolio dark neutral --domain color
technical portfolio mono heading --domain typography
portfolio navigation persistent sidebar --domain ux
--stack vue
```

Une requête par domaine. Jamais un pavé.

## 2. Prompt de brief (celui à me donner, à moi ou à un autre agent)

```
CONTEXTE
Portfolio personnel de Camille Lupo, développeur full-stack (Rouen, FR).
Cible : recruteurs tech et clients freelance, majoritairement desktop, 30 s d'attention.
Objectif : faire comprendre en 5 s ce que je construis, puis mener au contact.

EXISTANT
Vue 3 + Vite 4 + vue-router (createWebHistory) + vue-i18n 9 en mode legacy.
4 routes portfolio : / /about /Portfolio /Contact  +  /kanjiquizz (identité séparée, ne pas toucher).
Palette imposée, mesurée depuis AppKanjiQuizz/src/assets/theme.tsx (objet DARK) :
  --paper #17181C  --raised #1F2026  --ink #ECEAE4  --soft #B9B8B0
  --faint #8E8F98  --line #32333A  --line2 #787982
  --live #7FB489 (accent d'état)  --kq-hanko #D4574A (accent, gros texte seulement)

STYLE
<Style Category retenu>, mode sombre. Pas de brutalism, pas de neubrutalism,
pas d'anti-polish. Pas de dégradés, pas d'ombres portées décoratives.

CONTRAINTES DURES
- WCAG : texte 4.5:1, composants non textuels 3:1 (1.4.11), focus visible, cibles 44px.
- prefers-reduced-motion respecté ; aucune animation > 400 ms sur un chemin critique.
- Aucune donnée perso publiée hors e-mail + GitHub. Jamais de téléphone, jamais de date de naissance.
- Aucun chiffre inventé : tout ce qui est affiché vient de src/locales/fr/fr.json.
- Les 3 liens légaux de /kanjiquizz sont servis par l'API : ils restent <a href>, jamais router-link.

LIVRABLE
<mockups statiques | prototype cliquable> pour desktop 1440 et mobile 390,
plus une planche « socle » : palette mesurée, échelle typo, états, checklist.
