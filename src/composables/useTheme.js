import { ref, readonly } from 'vue'

// --- Thème clair / sombre ----------------------------------------------------
//
// Deux boutons, « Clair » et « Sombre », mais trois états internes : tant que
// l'utilisateur n'a rien choisi, le thème est « auto », c'est-à-dire l'absence
// d'attribut sur <html> — `prefers-color-scheme` décide (cf. tokens.css). Ce
// troisième état n'a pas de bouton : il n'est pas un thème, c'est le point de
// départ. Le bouton allumé est celui du thème effectivement affiché.
//
// L'état vit dans un module, pas dans un composant : le rail et n'importe quel
// autre appelant doivent lire la même valeur. Un `ref` de module suffit — il
// n'y a qu'une application par page, et pas de rendu serveur ici.

export const THEMES = ['light', 'dark']
const STORAGE_KEY = 'pf-theme'

// Choix explicite de l'utilisateur, ou `null` tant qu'il n'y en a pas.
const chosen = ref(null)
// Thème réellement affiché : le choix s'il existe, sinon celui du système.
const effective = ref('light')

const darkQuery = typeof window !== 'undefined' && window.matchMedia
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : null

const systemTheme = () => (darkQuery && darkQuery.matches ? 'dark' : 'light')

// Écrit le thème sur <html>. Le DOM est la seule source de vérité pour le CSS :
// aucun composant n'a besoin de connaître la couleur, il lit les jetons.
function apply() {
  const root = document.documentElement
  if (chosen.value) {
    root.setAttribute('data-theme', chosen.value)
  } else {
    root.removeAttribute('data-theme')
  }
  effective.value = chosen.value || systemTheme()
}

// Appelé une fois au démarrage, avant le montage : le thème est ainsi posé
// avant le premier rendu, sans clignotement.
export function initTheme() {
  let stored = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Mode privé, cookies bloqués : on suit le système, ce qui reste correct.
  }
  chosen.value = THEMES.includes(stored) ? stored : null
  apply()
  // Sans choix explicite, le bouton allumé doit suivre le système s'il change
  // en cours de visite (bascule jour/nuit programmée, par exemple).
  if (darkQuery) {
    darkQuery.addEventListener('change', () => { if (!chosen.value) apply() })
  }
}

export function useTheme() {
  const setTheme = (theme) => {
    if (!THEMES.includes(theme)) return
    chosen.value = theme
    apply()
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Le choix ne survivra pas au rechargement, mais la page reste utilisable.
    }
  }
  return { theme: readonly(effective), setTheme }
}
