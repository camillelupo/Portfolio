<script setup>
// Page footer: the three legal links plus the copyright.
//
// These three pages are served by the API/Caddy, NOT by the SPA router, so they
// are plain <a href> and must never become <router-link>: vue-router would try
// to resolve them client-side and land on the catch-all instead of the real page.
// Google also requires the account-deletion URL to be reachable without
// installing the app, which is why it lives here rather than in the rail.
// Note `/mentions-legales` has NO /kanjiquizz prefix.
const links = [
  { key: 'privacy', href: '/kanjiquizz/confidentialite' },
  { key: 'deletion', href: '/kanjiquizz/suppression-compte' },
  { key: 'legal', href: '/mentions-legales' },
]
</script>

<template>
  <footer class="kq-footer">
    <a
      v-for="link in links"
      :key="link.key"
      class="kq-footer-link"
      :href="link.href"
    >{{ $t('kq.footer.' + link.key) }}</a>
    <span class="kq-copy">{{ $t('kq.footer.copyright') }}</span>
  </footer>
</template>

<style scoped>
/* The shell's `:deep(section)` rule does not reach <footer>, so the top rule and
   the padding are restated here. The hairline is decorative: --kq-line. */
.kq-footer {
  border-top: 1px solid var(--kq-line);
  padding: 36px 0 56px;
  font-family: var(--kq-mono);
  font-size: 12px;
  line-height: 1.65;
  color: var(--kq-ink-faint);
  display: flex;
  gap: 22px;
  flex-wrap: wrap;
  align-items: baseline;
}

/* Two classes + the scope attribute = (0,3,0), which beats the shell's shared
   `.kq-page[data-v-x] a` layer (0,2,1) on the class count.
   On sumi the page reserves hanko for borders, fills and underlines rather than
   text: it is 4.73:1 on --kq-paper but only 4.07:1 on --kq-raised, so keeping it
   out of text is what makes the idiom safe on either surface. The label stays
   ink-soft and the brand colour lives in the underline only. */
.kq-footer .kq-footer-link {
  color: var(--kq-ink-soft);
  text-decoration: none;
  border-bottom: 1px solid var(--kq-hanko);
  padding-bottom: 1px;
}

.kq-footer .kq-copy {
  margin-left: auto;
}

/* Once the row wraps, `margin-left:auto` would push the copyright to the far
   right of its own line, away from the links it belongs with. */
@media (max-width: 560px) {
  .kq-footer {
    gap: 16px;
  }

  .kq-footer .kq-copy {
    margin-left: 0;
    width: 100%;
  }
}
</style>
