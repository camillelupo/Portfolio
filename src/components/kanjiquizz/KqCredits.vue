<script setup>
// "Sources et licences" — the three upstream datasets.
// The licence identifiers are proper nouns and are NOT translated; only the
// label in front of each one comes from kq.credits.*.
// Non-breaking spaces keep each licence identifier on one line, as the mockup does.
const sources = [
  {
    key: 'stroke',
    name: 'KanjiVG',
    href: 'https://kanjivg.tagaini.net/',
    licence: 'CC BY-SA 3.0',
  },
  {
    key: 'dict',
    name: 'JMdict / EDRDG',
    href: 'https://www.edrdg.org/jmdict/j_jmdict.html',
    licence: 'CC BY-SA',
  },
  {
    key: 'sentences',
    name: 'Tatoeba',
    href: 'https://tatoeba.org/',
    licence: 'CC BY 2.0 FR',
  },
]
</script>

<template>
  <section class="kq-credits-section">
    <h2>{{ $t('kq.credits.eyebrow') }}</h2>
    <!-- One running paragraph, so no wrapper elements: `{{ ' ' }}` is an explicit
         space that survives the compiler's whitespace condensing and, unlike a
         CSS margin, is also part of the text when the paragraph is copied. -->
    <p class="kq-credits"><template v-for="source in sources" :key="source.key">{{ $t('kq.credits.' + source.key) }}{{ $t('kq.credits.sep') }}<a :href="source.href" target="_blank" rel="noopener noreferrer">{{ source.name }}</a> ({{ source.licence }}).{{ ' ' }}</template>{{ $t('kq.credits.note') }}</p>
  </section>
</template>

<style scoped>
/* Two classes + the scope attribute = (0,3,0), which beats the shell's shared
   `.kq-page[data-v-x] p` layer (0,2,1) on the class count. */
.kq-credits-section .kq-credits {
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--kq-ink-faint);
  max-width: 70ch;
  margin: 0;
}

/* (0,3,1) — beats the shell's `.kq-page[data-v-x] a` (0,2,1), which sets
   `color: ink` and `text-decoration: none`.
   The underline is restored: on sumi these links must not be told apart from
   the surrounding text by colour alone. hanko stays out of link text on sumi
   (4.73:1 on --kq-paper, but 4.07:1 on --kq-raised) and lives in the hover
   underline instead — see the shared interaction layer in KanjiQuizz.vue. */
.kq-credits-section .kq-credits a {
  color: var(--kq-ink-soft);
  text-decoration: underline;
}
</style>
