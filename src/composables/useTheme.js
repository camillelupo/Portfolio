import { ref, readonly } from 'vue'

// --- Thème clair / sombre ----------------------------------------------------
//
// Trois états, comme dans la maquette : « Clair », « Sombre » et « Auto ».
// « Auto » n'est pas un quatrième thème, c'est l'absence de choix : on retire
// l'attribut et `prefers-color-scheme` reprend la main (cf. tokens.css).
//
// L'état vit dans un module, pas dans un composant : le rail et n'importe quel
// autre appelant doivent lire la même valeur. Un `ref` de module suffit — il
// n'y a qu'une application par page, et pas de rendu serveur ici.

export const THEMES = ['light', 'dark', 'auto']
const STORAGE_KEY = 'pf-theme'
const DEFAULT_THEME = 'auto'

const current = ref(DEFAULT_THEME)

// Écrit le thème sur <html>. Le DOM est la seule source de vérité pour le CSS :
// aucun composant n'a besoin de connaître la couleur, il lit les jetons.
function apply(theme) {
  const root = document.documentElement
  if (theme === 'auto') {
    root.removeAttribute('data-theme')
  } else {
    root.setAttribute('data-theme', theme)
  }
}

// Appelé une fois au démarrage, avant le montage : le thème est ainsi posé
// avant le premier rendu, sans clignotement.
export function initTheme() {
  let stored = null
  try {
    stored = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    // Mode privé, cookies bloqués : on retombe sur « auto », qui reste correct.
  }
  current.value = THEMES.includes(stored) ? stored : DEFAULT_THEME
  apply(current.value)
}

export function useTheme() {
  const setTheme = (theme) => {
    if (!THEMES.includes(theme)) return
    current.value = theme
    apply(theme)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Le choix ne survivra pas au rechargement, mais la page reste utilisable.
    }
  }
  return { theme: readonly(current), setTheme }
}
