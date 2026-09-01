/**
 * URL <-> locale mapping.
 *
 * The site is served on distinct URLs per language, so that a crawler can index
 * each version separately: French sits at the root, the two others behind a
 * prefix.
 *
 *     /            /about            /portfolio            fr
 *     /en          /en/about         /en/portfolio         en
 *     /ja          /ja/about         /ja/portfolio         jp
 *
 * Two vocabularies meet here and must not be confused:
 *
 *  - the LOCALE KEYS the app runs on — `fr` / `en` / `jp` — which are the
 *    directory names under `src/locales/` and the values vue-i18n is set to.
 *    `jp` is NOT the ISO 639-1 code for Japanese, but renaming it would break
 *    the `import.meta.glob` loader in main.js.
 *  - the LANGUAGE TAGS the web platform expects — `fr` / `en` / `ja` — used in
 *    the URL segment, in `hreflang` and in `<html lang>`. Those must be valid
 *    BCP-47 or the tag is ignored, so the correction happens here, once.
 */

/** Locale keys, in the order the language switcher lists them. */
export const LOCALES = ['fr', 'en', 'jp']

export const DEFAULT_LOCALE = 'fr'

/** Locale key -> URL segment. The default locale has none: it lives at the root. */
const URL_SEGMENT = { fr: '', en: 'en', jp: 'ja' }

/** URL segment -> locale key, for the router guard. */
const SEGMENT_LOCALE = { en: 'en', ja: 'jp' }

/** Locale key -> BCP-47 tag, for `hreflang` and `<html lang>`. */
export const LANGUAGE_TAG = { fr: 'fr', en: 'en', jp: 'ja' }

/** Locale key -> Open Graph locale. */
export const OG_LOCALE = { fr: 'fr_FR', en: 'en_GB', jp: 'ja_JP' }

/** `''` for the default locale, `'/en'` otherwise. */
export function localePrefix(locale) {
  const segment = URL_SEGMENT[locale]
  return segment ? `/${segment}` : ''
}

/**
 * Prefixes a base path with the locale.
 * `('/about', 'en')` -> `/en/about` · `('/about', 'fr')` -> `/about`
 * The root is special-cased: the prefix alone would give `''`, not `/`.
 */
export function localizedPath(basePath, locale) {
  const path = basePath === '/' ? '' : basePath
  return `${localePrefix(locale)}${path}` || '/'
}

/** The locale a URL segment selects, or the default when it selects none. */
export function localeFromSegment(segment) {
  return SEGMENT_LOCALE[segment] || DEFAULT_LOCALE
}
