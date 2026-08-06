<script setup>
// Page shell for /kanjiquizz.
// Carries the design tokens (declared once on .kq-page in the scoped style block)
// so the section components added by later tasks inherit them through the DOM.
import KqHero from '@/components/kanjiquizz/KqHero.vue'
import KqProblem from '@/components/kanjiquizz/KqProblem.vue'
import KqClaims from '@/components/kanjiquizz/KqClaims.vue'
import KqModes from '@/components/kanjiquizz/KqModes.vue'
import KqSrs from '@/components/kanjiquizz/KqSrs.vue'
import KqLevels from '@/components/kanjiquizz/KqLevels.vue'
import KqPricing from '@/components/kanjiquizz/KqPricing.vue'
import KqAvailability from '@/components/kanjiquizz/KqAvailability.vue'
import KqCredits from '@/components/kanjiquizz/KqCredits.vue'
import KqFooter from '@/components/kanjiquizz/KqFooter.vue'
import { computed, getCurrentInstance } from 'vue'
import { useKqHead } from '@/composables/useKqHead.js'

// --- SEO / Open Graph ------------------------------------------------------
//
// `src/main.js` installs vue-i18n in LEGACY mode (`createI18n` without
// `legacy: false` and without `allowComposition`), so `useI18n()` throws
// "Not available in legacy mode" at runtime. The legacy global instance is
// therefore reached through the component proxy — the very same `$t` / `$i18n`
// every template in this project already uses. `$i18n.locale` is a getter over
// `composer.locale.value` (a ref), so it tracks inside a computed and the
// language <select> in App.vue updates the tags live.
const { proxy } = getCurrentInstance()
const locale = computed(() => proxy.$i18n.locale)

/** Translation as a computed, invalidated by a language switch. */
function translated(key) {
  return computed(() => {
    // Read explicitly so the dependency is obvious, not just implied by `$t`.
    void locale.value
    return proxy.$t(key)
  })
}

// The app's locale keys are `fr` / `en` / `jp`. `jp` is NOT the ISO 639-1 code
// for Japanese (`ja`), but renaming it would break the `import.meta.glob`
// locale loader in main.js and App.vue's <select>, so the correction is done
// here, at the boundary, where Open Graph expects a BCP-47-ish value.
const OG_LOCALES = { fr: 'fr_FR', en: 'en_GB', jp: 'ja_JP' }

// Built from the live origin: no deployment domain is verifiable from here, and
// a wrong absolute URL in og:url/canonical is worse than a relative guess.
// The path matches the route registered in src/router/router.js.
const pageUrl = typeof window === 'undefined' ? '' : `${window.location.origin}/kanjiquizz`

useKqHead({
  title: translated('kq.meta.title'),
  description: translated('kq.meta.description'),
  ogTitle: translated('kq.meta.ogTitle'),
  ogDescription: translated('kq.meta.ogDescription'),
  // `website`, not `product`: `product` is not part of the object types the
  // major crawlers resolve, and it would be meaningless without the
  // `product:price:*` properties — which cannot be stated for an app that is
  // sold through Google Play and not released yet.
  ogType: 'website',
  // Brand name, identical in the three locales and absent from `kq.meta.*`;
  // it is a proper noun, not copy to translate.
  ogSiteName: 'Camille Lupo',
  ogLocale: computed(() => OG_LOCALES[locale.value] || OG_LOCALES.en),
  ogUrl: pageUrl,
  canonical: pageUrl,
  // Deliberately NO og:image: there is no verified 1200x630 asset for this
  // page, and an og:image pointing at a missing or wrongly-sized file renders
  // a broken preview card — strictly worse than letting the crawler fall back
  // to text only. Add one here once a real asset exists.
})
</script>

<template>
  <div class="kq-page">
    <div class="kq-inner">
      <KqHero />
      <KqProblem />
      <KqClaims />
      <KqModes />
      <!-- washi sheet #1 — exactly two on the page -->
      <KqSrs />
      <KqLevels />
      <!-- washi sheet #2 -->
      <KqPricing />
      <KqAvailability />
      <KqCredits />
      <KqFooter />
    </div>
  </div>
</template>

<style scoped>
.kq-page {
  /* --- sumi theme (page) --- */
  /* Same paper as the rest of the site. #17181C -> #111111 is a 1.06:1 step,
     invisible to the eye, but it lifts --kq-hanko as TEXT from 4.44:1 to
     4.73:1 and so clears the 4.5:1 threshold on the page surface. */
  --kq-paper: var(--pf-paper);
  --kq-raised: #1F2026;
  --kq-ink: #ECEAE4;
  --kq-ink-soft: #B9B8B0;
  --kq-ink-faint: #8E8F98;
  --kq-line: #32333A;
  --kq-line-strong: #787982;
  --kq-hanko: #D4574A;
  --kq-hanko-fill: #C24A3E;
  --kq-on-hanko: #FDF9F3;
  --kq-matcha: #7FB489;
  --kq-aizome: #7FA5C7;
  --kq-karashi: #D3A94F;
  --kq-fuji: #A492C7;
  --kq-asagi: #68ADA8;

  /* --- washi theme (encarts only) --- */
  --kq-w-paper: #F4F2ED;
  --kq-w-raised: #FBFAF7;
  --kq-w-ink: #1D1E22;
  --kq-w-ink-soft: #4A4B52;
  --kq-w-line: #DDD9CF;
  --kq-w-line-strong: #898373;
  --kq-w-hanko: #A20111;

  /* --- families --- */
  --kq-mono: 'Roboto Mono', Monaco, Consolas, monospace;
  --kq-sans: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --kq-serif: 'Klee One', 'Hiragino Mincho ProN', 'Yu Mincho', 'Noto Serif JP', serif;

  box-sizing: border-box;
  min-height: 100vh;
  background: var(--kq-paper);
  color: var(--kq-ink);
  font-family: var(--kq-sans);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

/* :deep(*) compiles to `.kq-page[data-v-x] *`, so the rule also reaches the
   internals of the child section components (whose own scope id differs).
   A plain `.kq-page *` would compile to `.kq-page *[data-v-x]` and only match
   elements owned by this component. */
.kq-page :deep(*) {
  box-sizing: border-box;
}

.kq-inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 48px;
}

/* ---------------------------------------------------------------------------
   Shared typography layer (mockup lines 35-43).
   The mockup styles bare elements; restating them in every section component
   would duplicate them, so they live here once and reach the children through
   :deep().

   `src/main.js` imports bootstrap.min.css globally. Bootstrap Reboot restyles
   h1-h6, p, a, b/strong with bare-element selectors (specificity 0,0,1). These
   rules compile to `.kq-page[data-v-x] <el>` (0,2,1) and win — but only for the
   properties they actually declare. So font-family, font-size, line-height,
   margin, color, font-weight, letter-spacing and text-transform are all set
   explicitly here rather than left to the browser default, and every anchor
   gets an explicit color so it never falls back to --bs-link-color blue.

   Component-level overrides (e.g. `.kq-claim p` inside KqClaims.vue) compile to
   `.kq-claim p[data-v-y]` (0,2,1) and still beat this layer.
   --------------------------------------------------------------------------- */
.kq-page :deep(h1) {
  font-family: var(--kq-serif);
  font-size: clamp(38px, 5.2vw, 62px);
  line-height: 1.12;
  margin: 0 0 14px;
  font-weight: 600;
  letter-spacing: .01em;
  text-transform: none;
  color: var(--kq-ink);
}

.kq-page :deep(h2) {
  font-family: var(--kq-mono);
  font-size: 13px;
  line-height: 1.65;
  margin: 0 0 20px;
  font-weight: 400;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: var(--kq-ink-faint);
}

.kq-page :deep(h3) {
  font-family: var(--kq-serif);
  font-size: 26px;
  line-height: 1.25;
  margin: 0 0 10px;
  font-weight: 600;
  letter-spacing: normal;
  text-transform: none;
  color: var(--kq-ink);
}

.kq-page :deep(p) {
  font-family: var(--kq-sans);
  font-size: 16px;
  line-height: 1.65;
  margin: 0 0 16px;
  font-weight: 400;
  letter-spacing: normal;
  text-transform: none;
  color: var(--kq-ink);
}

/* (0,3,0) — `.kq-page[data-v-x] .kq-lede`: two classes plus the scope attribute.
   Beats the :deep(p) rule (0,2,1) whatever the source order. */
.kq-page :deep(.kq-lede) {
  font-size: 19px;
  color: var(--kq-ink-soft);
  max-width: 56ch;
}

.kq-page :deep(section) {
  padding: 76px 0;
  border-top: 1px solid var(--kq-line);
}

/* Bootstrap gives every <a> --bs-link-color (blue) plus an underline.
   On sumi, link text stays ink; hanko is only ever a fill or an underline. */
.kq-page :deep(a) {
  color: var(--kq-ink);
  text-decoration: none;
}

.kq-page :deep(strong) {
  font-weight: 700;
  color: var(--kq-ink);
}

/* ---------------------------------------------------------------------------
   Shared interaction layer — :focus-visible and :hover.

   The page has exactly three kinds of control: the hero's inert Play button
   (a disabled <button>, deliberately outside this layer — .kq-btn-inert in
   KqHero.vue declares no :hover and no :focus-visible, and `disabled` keeps it
   out of the tab order), the three credits anchors and the three footer
   anchors. The two interactive kinds live in two different components, so
   their states are declared once here instead of twice. This also pins the
   focus indicator down: today it is the UA ring, which survives only because
   Bootstrap's `outline: 0` rules are all class-scoped, and any future CSS
   could remove it silently.

   SPECIFICITY — the trap. `.kq-page :deep(X)` compiles to `.kq-page[data-v-x] X`,
   so the shell already contributes 2 to the class column before X is counted.
   The section components style these same anchors at (0,3,0) / (0,3,1) and their
   CSS is emitted BEFORE this file, so a tie is lost on source order. Every rule
   below adds a pseudo-class and therefore lands STRICTLY above them:
     .kq-footer[data-v-y] .kq-footer-link        -> (0,3,0), emitted first
     .kq-page[data-v-x] .kq-footer-link:hover    -> (0,4,0), wins
     .kq-credits-section[data-v-z] .kq-credits a -> (0,3,1), emitted first
     .kq-page[data-v-x] .kq-credits a:hover      -> (0,4,1), wins
   --------------------------------------------------------------------------- */

/* A ring is a border, not text, so --kq-hanko is legal here whatever the
   surface: as a non-text indicator the bar is 3:1 (WCAG 1.4.11), and hanko
   reaches 4.73:1 on --kq-paper and 4.07:1 on --kq-raised.
   `outline-offset` keeps the ring clear of the button borders. */
.kq-page :deep(a:focus-visible),
.kq-page :deep(button:focus-visible) {
  outline: 2px solid var(--kq-hanko);
  outline-offset: 3px;
}

/* Inside a washi sheet the surface flips to near-white, where --kq-hanko falls
   to 3.57:1 — passing, but thin. The washi red is 7.36:1 on the same paper.
   Defensive: no control sits in a sheet today, both are content-only. */
.kq-page :deep(.kq-sheet a:focus-visible),
.kq-page :deep(.kq-sheet button:focus-visible) {
  outline-color: var(--kq-w-hanko);
}

/* Footer links already carry a hanko border-bottom in the mockup, so hover
   thickens that idiom rather than inventing a new one. The padding gives back
   the pixel the border takes, so the baseline never shifts. */
.kq-page :deep(.kq-footer-link:hover) {
  color: var(--kq-ink);
  border-bottom-width: 2px;
  padding-bottom: 0;
}

/* Credits anchors are underlined ink-soft inside a running paragraph; hover
   brightens the label and recolours the existing underline to hanko. */
.kq-page :deep(.kq-credits a:hover) {
  color: var(--kq-ink);
  text-decoration-color: var(--kq-hanko);
}

/* Desktop: the existing fixed Sidebar occupies 300px on the left.
   Breakpoint matches Portfolio.vue's .rigthPart (1200px). */
@media (min-width: 1200px) {
  .kq-page {
    padding-left: 300px;
  }
}

/* Mobile: the Sidebar becomes a fixed full-width top bar (~65px).
   Existing pages compensate with margin-top: 100px. */
@media (max-width: 1200px) {
  .kq-page {
    padding-left: 0;
    padding-top: 100px;
  }

  .kq-inner {
    padding: 0 24px;
  }
}
</style>
