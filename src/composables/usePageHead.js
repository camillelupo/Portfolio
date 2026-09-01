import { computed, getCurrentInstance } from 'vue'
import { useHead } from './useHead.js'
import { useLocalizedUrls } from './useLocalizedUrls.js'

/**
 * Head tags for the four portfolio routes.
 *
 * `useHead` does the DOM work (upsert, ownership, cleanup), `useLocalizedUrls`
 * builds the per-language URLs; this wrapper only carries the boilerplate the
 * four pages would otherwise repeat: reaching the legacy vue-i18n instance and
 * keying into `message.meta.<page>`.
 *
 * `src/main.js` installs vue-i18n in LEGACY mode, so `useI18n()` throws
 * "Not available in legacy mode". The global instance is reached through the
 * component proxy instead — the same `$t` / `$i18n` the templates already use.
 * `$i18n.locale` is a getter over a ref, so it tracks inside a computed and the
 * tags follow a language change live.
 *
 * Must be called from `setup()` (or a `<script setup>` block): it reads the
 * current component instance.
 *
 * @param {'home'|'about'|'portfolio'|'contact'} page  key under `message.meta`
 * @param {string} basePath  the French path of the route, e.g. '/about' — must
 *                           match the `path` declared in router.js's PAGES
 */
export function usePageHead(page, basePath) {
  const { proxy } = getCurrentInstance()
  const { locale, pageUrl, ogLocale, alternates } = useLocalizedUrls(basePath)

  /** Translation as a computed, invalidated by a language switch. */
  const translated = (key) =>
    computed(() => {
      // Read explicitly so the dependency is obvious, not just implied by `$t`.
      void locale.value
      return proxy.$t(`message.meta.${page}.${key}`)
    })

  useHead({
    title: translated('title'),
    description: translated('description'),
    ogType: 'website',
    ogUrl: pageUrl,
    // Proper noun, identical in the three locales: not copy to translate.
    ogSiteName: 'Camille Lupo',
    ogLocale,
    alternates,
  })
}
