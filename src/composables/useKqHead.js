import { onMounted, onUnmounted, unref, watchEffect } from 'vue'

/**
 * Head-tag management for a single page component.
 *
 * This portfolio is a SPA on `createWebHistory` and ships no head-management
 * library, so a page that wants its own <title> / meta tags has to write them
 * into the live document itself. Two rules make that safe:
 *
 *  1. UPSERT, never blind append. Every tag is looked up by selector first and
 *     updated in place, so re-entering the route (or switching language, which
 *     re-runs the effect) can never duplicate a tag.
 *  2. OWNERSHIP + CLEANUP. Elements this composable creates are marked with
 *     `data-kq-head` and removed on unmount; elements that already existed in
 *     index.html are only borrowed, and their previous attribute value is put
 *     back on unmount. `document.title` is snapshotted before the first write
 *     and restored the same way. Without this, KanjiQuizz's description would
 *     stay in the head after navigating to /about.
 *
 * Values may be refs, computeds or plain values — they are resolved reactively,
 * so the tags follow a locale change without any extra wiring.
 */

/** Marks the elements this composable created, so it only deletes its own. */
const OWNED_ATTR = 'data-kq-head'

/**
 * The managed tags. `key` is the property read off the resolved value bag,
 * `identity` is both the selector and the attributes set on creation.
 */
const SPECS = [
  { key: 'description', tag: 'meta', identity: { name: 'description' }, attr: 'content' },
  { key: 'ogTitle', tag: 'meta', identity: { property: 'og:title' }, attr: 'content' },
  { key: 'ogDescription', tag: 'meta', identity: { property: 'og:description' }, attr: 'content' },
  { key: 'ogType', tag: 'meta', identity: { property: 'og:type' }, attr: 'content' },
  { key: 'ogUrl', tag: 'meta', identity: { property: 'og:url' }, attr: 'content' },
  { key: 'ogSiteName', tag: 'meta', identity: { property: 'og:site_name' }, attr: 'content' },
  { key: 'ogLocale', tag: 'meta', identity: { property: 'og:locale' }, attr: 'content' },
  { key: 'twitterCard', tag: 'meta', identity: { name: 'twitter:card' }, attr: 'content' },
  { key: 'twitterTitle', tag: 'meta', identity: { name: 'twitter:title' }, attr: 'content' },
  { key: 'twitterDescription', tag: 'meta', identity: { name: 'twitter:description' }, attr: 'content' },
  { key: 'canonical', tag: 'link', identity: { rel: 'canonical' }, attr: 'href' },
]

/** `meta[property="og:title"]`, built from the same identity used on creation. */
function selectorFor(spec) {
  const attributes = Object.entries(spec.identity)
    .map(([name, value]) => `[${name}="${value}"]`)
    .join('')
  return `${spec.tag}${attributes}`
}

/** Unwraps a ref/computed/plain value into a trimmed string ('' when absent). */
function read(source) {
  const value = unref(source)
  if (value === null || value === undefined) return ''
  return String(value).trim()
}

/**
 * Resolves the options into the flat bag the SPECS are keyed on.
 * Twitter mirrors the Open Graph copy: the two cards say the same thing, and
 * duplicating the i18n keys at the call site would only invite them to drift.
 */
function resolveValues(options) {
  const title = read(options.title)
  const description = read(options.description)
  const ogTitle = read(options.ogTitle) || title
  const ogDescription = read(options.ogDescription) || description
  const ogUrl = read(options.ogUrl)

  return {
    title,
    description,
    ogTitle,
    ogDescription,
    ogType: read(options.ogType),
    ogUrl,
    ogSiteName: read(options.ogSiteName),
    ogLocale: read(options.ogLocale),
    // Constant, not user-visible copy: it is an Open Graph enum value.
    twitterCard: 'summary_large_image',
    twitterTitle: ogTitle,
    twitterDescription: ogDescription,
    canonical: read(options.canonical) || ogUrl,
  }
}

/**
 * @param {object} options
 * @param {*} [options.title]          document.title
 * @param {*} [options.description]    meta[name=description]
 * @param {*} [options.ogTitle]        og:title (defaults to `title`)
 * @param {*} [options.ogDescription]  og:description (defaults to `description`)
 * @param {*} [options.ogType]         og:type
 * @param {*} [options.ogUrl]          og:url
 * @param {*} [options.ogSiteName]     og:site_name
 * @param {*} [options.ogLocale]       og:locale, already in OG form (e.g. fr_FR)
 * @param {*} [options.canonical]      link[rel=canonical] (defaults to `ogUrl`)
 */
export function useKqHead(options = {}) {
  // SSR / non-browser (unit tests, prerender): nothing to mutate, and no
  // lifecycle hook is registered so there is nothing to clean up either.
  if (typeof document === 'undefined') return

  /** Elements created here — deleted on unmount. */
  const createdElements = []
  /** Pre-existing elements borrowed here — value put back on unmount. */
  const restorePoints = []
  /** Elements already inspected, so a re-run never snapshots our own writes. */
  const inspected = new Set()

  let previousTitle = null
  let stopWatcher = null

  function upsert(spec) {
    let element = document.head.querySelector(selectorFor(spec))

    if (element) {
      // First time we touch a tag we did not create: remember its value so the
      // page that owns it (index.html today) gets it back on unmount.
      if (!inspected.has(element)) {
        inspected.add(element)
        if (!element.hasAttribute(OWNED_ATTR)) {
          restorePoints.push({
            element,
            attribute: spec.attr,
            previousValue: element.getAttribute(spec.attr),
          })
        }
      }
      return element
    }

    element = document.createElement(spec.tag)
    for (const [name, value] of Object.entries(spec.identity)) {
      element.setAttribute(name, value)
    }
    element.setAttribute(OWNED_ATTR, '')
    document.head.appendChild(element)
    inspected.add(element)
    createdElements.push(element)
    return element
  }

  onMounted(() => {
    // Snapshot before the first write, otherwise we would restore our own title.
    previousTitle = document.title

    // The effect re-runs on every locale change; `upsert` keeps it idempotent.
    stopWatcher = watchEffect(() => {
      const values = resolveValues(options)

      if (values.title) document.title = values.title

      for (const spec of SPECS) {
        const value = values[spec.key]
        // An empty value writes nothing rather than an empty tag: a blank
        // og:description is worse for a crawler than a missing one.
        if (!value) continue
        upsert(spec).setAttribute(spec.attr, value)
      }
    })
  })

  onUnmounted(() => {
    // Stop first: no re-write may happen between the removal and the restore.
    if (stopWatcher) {
      stopWatcher()
      stopWatcher = null
    }

    for (const element of createdElements) element.remove()
    createdElements.length = 0

    for (const { element, attribute, previousValue } of restorePoints) {
      if (previousValue === null) element.removeAttribute(attribute)
      else element.setAttribute(attribute, previousValue)
    }
    restorePoints.length = 0

    inspected.clear()

    if (previousTitle !== null) {
      document.title = previousTitle
      previousTitle = null
    }
  })
}
