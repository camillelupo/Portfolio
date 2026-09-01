<template>
  <!-- Rail de navigation persistant. Au-dessus de 1200px c'est une colonne
       fixe de 300px ; en dessous, la même balise devient une barre supérieure
       de 56px et le bloc `.pf-rail-panel` se replie derrière un bouton.
       Une seule structure pour les deux formats : dupliquer la navigation
       aurait doublé les repères de la page et les liens à maintenir. -->
  <header class="pf-rail">
    <div class="pf-rail-head">
      <div class="pf-rail-id">
        <p class="pf-rail-who">Camille Lupo</p>
        <p class="pf-mono pf-rail-role">{{ $t('message.role') }}</p>
        <p class="pf-rail-status">
          <span class="pf-dot" aria-hidden="true"></span>
          <span class="pf-mono">{{ $t('message.railAvailable') }}</span>
        </p>
      </div>

      <!-- `aria-expanded` et `aria-controls` disent l'état du tiroir : sans
           eux le bouton n'annonce rien de plus qu'« bouton ». Le libellé
           accessible change avec l'état, l'icône seule ne le porte pas. -->
      <button
          type="button"
          class="pf-burger"
          :aria-expanded="open ? 'true' : 'false'"
          aria-controls="pf-rail-panel"
          :aria-label="open ? $t('message.menuClose') : $t('message.menuOpen')"
          @click="open = !open">
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" focusable="false">
          <g v-if="!open" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <line x1="3" y1="6.5" x2="19" y2="6.5"/>
            <line x1="3" y1="11" x2="19" y2="11"/>
            <line x1="3" y1="15.5" x2="19" y2="15.5"/>
          </g>
          <g v-else stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
            <line x1="5" y1="5" x2="17" y2="17"/>
            <line x1="17" y1="5" x2="5" y2="17"/>
          </g>
        </svg>
      </button>
    </div>

    <div id="pf-rail-panel" class="pf-rail-panel" :class="{ 'pf-rail-panel-open': open }">
      <nav class="pf-nav" :aria-label="$t('message.navProjects')">
        <router-link class="pf-nav-link" :to="$lp('/')">{{ $t('message.navHome') }}</router-link>
        <router-link class="pf-nav-link" :to="$lp('/about')">{{ $t('message.navAbout') }}</router-link>
        <router-link class="pf-nav-link" :to="$lp('/portfolio')">{{ $t('message.navProjects') }}</router-link>
        <router-link class="pf-nav-link" :to="$lp('/contact')">{{ $t('message.navContact') }}</router-link>
      </nav>

      <div class="pf-railfoot">
        <div>
          <span class="pf-lbl pf-railfoot-lbl">{{ $t('message.themeLabel') }}</span>
          <!-- Trois états et non deux : « Auto » n'est pas un thème, c'est
               l'absence de choix, qui rend la main à `prefers-color-scheme`.
               `aria-pressed` porte l'état — la seule couleur ne suffirait pas. -->
          <div class="pf-toggle" role="group" :aria-label="$t('message.themeLabel')">
            <button
                type="button"
                :class="theme === 'light' ? 'pf-toggle-on' : 'pf-toggle-off'"
                :aria-pressed="theme === 'light' ? 'true' : 'false'"
                @click="setTheme('light')">{{ $t('message.themeLight') }}</button>
            <button
                type="button"
                :class="theme === 'dark' ? 'pf-toggle-on' : 'pf-toggle-off'"
                :aria-pressed="theme === 'dark' ? 'true' : 'false'"
                @click="setTheme('dark')">{{ $t('message.themeDark') }}</button>
            <button
                type="button"
                :class="theme === 'auto' ? 'pf-toggle-on' : 'pf-toggle-off'"
                :aria-pressed="theme === 'auto' ? 'true' : 'false'"
                @click="setTheme('auto')">{{ $t('message.themeAuto') }}</button>
          </div>
        </div>

        <!-- Chaque langue a sa propre URL : le sélecteur est donc une liste de
             vrais liens, et non un <select> qui muterait un état. Un moteur
             de recherche les suit, le clic droit « ouvrir dans un onglet »
             fonctionne, et `hreflang` dit à quelle langue chacun mène. -->
        <nav class="pf-langs" :aria-label="$t('message.langLabel')">
          <router-link
              v-for="locale in LOCALES"
              :key="locale"
              :to="$localeUrl(locale)"
              :hreflang="LANGUAGE_TAG[locale]"
              :lang="LANGUAGE_TAG[locale]"
              :aria-current="locale === $i18n.locale ? 'true' : undefined"
              :class="['pf-mono', locale === $i18n.locale ? 'pf-lang-on' : 'pf-lang-off']">
            {{ LOCALE_LABELS[locale] }}
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'
import { LOCALES, LANGUAGE_TAG } from '@/i18n/routing.js'

// Étiquettes du sélecteur de langue. Elles ne passent pas par les fichiers de
// locale : le nom d'une langue s'écrit dans cette langue-là, pas dans celle du
// visiteur — « 日本語 » reste « 日本語 » sur la version française.
const LOCALE_LABELS = { fr: 'FR', en: 'EN', jp: '日本語' }

const { theme, setTheme } = useTheme()
const open = ref(false)
const route = useRoute()

// Le tiroir se referme après une navigation : sinon il resterait ouvert
// par-dessus la page que l'on vient de demander.
watch(() => route.fullPath, () => {
  open.value = false
})

// Échap ferme le tiroir. C'est ce qu'attend un tiroir superposé au contenu, et
// c'est la seule sortie au clavier quand le bouton n'est plus sous le curseur.
const handleKeydown = (event) => {
  if (event.key === 'Escape' && open.value) {
    open.value = false
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
/* ── Rail : colonne fixe au-dessus de 1200px ─────────────────────────────── */
.pf-rail {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: var(--pf-rail-w);
  height: 100vh;
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  background: var(--pf-paper);
  border-right: 1px solid var(--pf-line);
  color: var(--pf-ink);
  font-family: var(--pf-sans);
}

.pf-rail-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pf-rail-who {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
  margin: 0;
}

.pf-rail-role {
  color: var(--pf-ink-faint);
  margin: 5px 0 0;
}

.pf-rail-status {
  display: flex;
  align-items: center;
  gap: 7px;
  margin: 14px 0 0;
  color: var(--pf-matcha);
}

/* Le bouton n'existe que sous 1200px ; au-dessus le panneau est déplié en
   permanence et un bouton d'ouverture n'aurait rien à ouvrir. */
.pf-burger {
  display: none;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--pf-line-strong);
  border-radius: var(--pf-r-sm);
  color: var(--pf-ink);
  cursor: pointer;
}

.pf-rail-panel {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
}

/* ── Navigation ──────────────────────────────────────────────────────────── */
.pf-nav {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

/* La barre est dessinée au repos, transparente : l'espace est réservé, seule
   la couleur change à l'état actif. Rien ne se décale. */
.pf-nav-link {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 38px;
  padding-left: 18px;
  font-size: 15px;
  color: var(--pf-ink-soft);
  text-decoration: none;
  transition: color 0.18s ease;
}

.pf-nav-link::before {
  content: "";
  position: absolute;
  left: 0;
  top: 7px;
  bottom: 7px;
  width: 2px;
  border-radius: 1px;
  background: transparent;
  transition: background-color 0.18s ease, top 0.18s ease, bottom 0.18s ease;
}

.pf-nav-link:hover {
  color: var(--pf-ink);
}

/* `exact-active` et non `active` : ce dernier correspond par préfixe et
   allumerait l'entrée « / » sur toutes les pages. vue-router pose la classe
   lui-même, donc l'état survit à une saisie directe d'URL et au bouton
   Précédent — ce qu'un compteur local ne faisait pas. */
.pf-nav-link.router-link-exact-active {
  color: var(--pf-ink);
  font-weight: 500;
}

.pf-nav-link.router-link-exact-active::before {
  background: var(--pf-ink);
  top: 2px;
  bottom: 2px;
}

/* ── Pied du rail : thème et langues ─────────────────────────────────────── */
.pf-railfoot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 22px;
  padding-top: 22px;
}

.pf-railfoot-lbl {
  margin-bottom: 9px;
}

.pf-toggle {
  display: inline-flex;
  align-self: flex-start;
  padding: 2px;
  border: 1px solid var(--pf-line-strong);
  border-radius: 999px;
}

.pf-toggle button {
  min-width: 44px;
  height: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  color: var(--pf-ink-faint);
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.pf-toggle .pf-toggle-on {
  background: var(--pf-ink);
  color: var(--pf-paper);
}

.pf-toggle .pf-toggle-off:hover {
  color: var(--pf-ink);
}

.pf-langs {
  display: flex;
  gap: 16px;
  align-items: baseline;
}

.pf-langs a {
  text-decoration: none;
}

.pf-lang-on {
  font-weight: 500;
  color: var(--pf-ink);
}

.pf-lang-off {
  color: var(--pf-ink-faint);
}

.pf-lang-off:hover {
  color: var(--pf-ink);
}

/* ── Focus clavier ───────────────────────────────────────────────────────── */
/* portfolio.css porte la même règle, mais sous `.pf-page` : le rail est en
   dehors de cette enveloppe et ne l'hérite pas. */
.pf-rail :is(a, button):focus-visible {
  outline: 2px solid var(--pf-ink);
  outline-offset: 3px;
  border-radius: 2px;
}

/* ── Sous 1200px : barre supérieure et tiroir ────────────────────────────── */
/* Même point de bascule que `.pf-page` dans portfolio.css : au pixel près, la
   barre doit apparaître quand le décalage de contenu passe de gauche à haut. */
@media (max-width: 1200px) {
  .pf-rail {
    width: 100%;
    height: auto;
    max-height: 100vh;
    padding: 0;
    border-right: none;
    border-bottom: 1px solid var(--pf-line);
    overflow-y: auto;
  }

  .pf-rail-head {
    height: var(--pf-topbar-h);
    padding: 0 18px;
  }

  /* Sur une barre de 56px, seul le nom tient. Le rôle et la disponibilité
     restent dans le tiroir, où ils ont la place de se lire. */
  .pf-rail-role,
  .pf-rail-status {
    display: none;
  }

  .pf-burger {
    display: inline-flex;
  }

  .pf-rail-panel {
    display: none;
    padding: 8px 18px 24px;
  }

  .pf-rail-panel-open {
    display: flex;
  }

  .pf-nav {
    margin-top: 8px;
  }

  .pf-nav-link {
    min-height: 46px;
    font-size: 17px;
  }

  .pf-railfoot {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid var(--pf-line);
  }
}
</style>
