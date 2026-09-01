import { computed, getCurrentInstance } from 'vue'
import { LOCALES, DEFAULT_LOCALE, LANGUAGE_TAG, OG_LOCALE, localizedPath } from '@/i18n/routing.js'

/**
 * The set of absolute URLs a page has, one per language.
 *
 * Each language is served on its own URL (`/about`, `/en/about`, `/ja/about`),
 * so every page must tell crawlers three things: which URL is canonical for the
 * version being served, which URLs are its translations (`hreflang`), and which
 * one to fall back to when no declared language matches the visitor
 * (`x-default`, pointed at French — the default locale of the app).
 *
 * The origin is read from `window` rather than hardcoded: no deployment domain
 * is verifiable from the source, and a wrong absolute URL in canonical or
 * og:url is worse than none.
 *
 * `src/main.js` installs vue-i18n in LEGACY mode, so `useI18n()` throws
 * "Not available in legacy mode"; the global instance is reached through the
 * component proxy instead. `$i18n.locale` is a getter over a ref, so it tracks
 * inside a computed.
 *
 * Must be called from `setup()` — it reads the current component instance.
 *
 * @param {string} basePath  the French path of the page, e.g. '/about'
 */
export function useLocalizedUrls(basePath) {
  const { proxy } = getCurrentInstance()
  const locale = computed(() => proxy.$i18n.locale)

  const origin = typeof window === 'undefined' ? '' : window.location.origin
  const urlFor = (target) => (origin ? `${origin}${localizedPath(basePath, target)}` : '')

  return {
    locale,
    /** Absolute URL of the version currently displayed — og:url and canonical. */
    pageUrl: computed(() => urlFor(locale.value)),
    /** og:locale, in the underscore form Open Graph expects. */
    ogLocale: computed(() => OG_LOCALE[locale.value] || OG_LOCALE[DEFAULT_LOCALE]),
    /**
     * One entry per language plus `x-default`. Static in practice — the three
     * URLs of a page do not change with the locale — but kept as a computed so
     * it resolves after the origin is known and stays uniform with the rest.
     */
    alternates: computed(() => [
      ...LOCALES.map((target) => ({ hreflang: LANGUAGE_TAG[target], href: urlFor(target) })),
      { hreflang: 'x-default', href: urlFor(DEFAULT_LOCALE) },
    ]),
  }
}
