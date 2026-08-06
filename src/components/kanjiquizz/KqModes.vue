<script setup>
// "Six façons de travailler" — the six mode tiles.
// Glyphs are TEXT (lang="ja", aria-hidden) doubled by the readable mode title.
const modes = [
  { key: 'kanji', glyph: '漢', hue: 'kq-g-hanko' },
  { key: 'kana', glyph: 'あ', hue: 'kq-g-matcha' },
  { key: 'vocab', glyph: '語', hue: 'kq-g-aizome' },
  { key: 'sentences', glyph: '文', hue: 'kq-g-karashi' },
  { key: 'cards', glyph: '札', hue: 'kq-g-fuji' },
  { key: 'tracing', glyph: '書', hue: 'kq-g-asagi' },
]
</script>

<template>
  <section class="kq-modes-section">
    <h2>{{ $t('kq.modes.eyebrow') }}</h2>
    <div class="kq-modes">
      <div v-for="mode in modes" :key="mode.key" class="kq-mode">
        <span class="kq-mode-g" :class="mode.hue" lang="ja" aria-hidden="true">{{ mode.glyph }}</span>
        <strong>{{ $t('kq.modes.' + mode.key + '.title') }}</strong>
        <p>{{ $t('kq.modes.' + mode.key + '.body') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kq-modes {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

/* Functional border: line-strong, never line. */
.kq-mode {
  border: 1px solid var(--kq-line-strong);
  border-radius: 14px;
  background: var(--kq-raised);
  padding: 20px;
}

.kq-mode .kq-mode-g {
  font-family: var(--kq-serif);
  font-size: 32px;
  line-height: 1;
  display: block;
  margin-bottom: 12px;
}

/* Two class-level tokens + the scope attribute (0,3,1) so these beat the shared
   `.kq-page[data-v-x] p / strong` layer (0,2,1) regardless of bundle order. */
.kq-modes-section .kq-mode strong {
  display: block;
  font-family: var(--kq-sans);
  font-size: 15.5px;
  line-height: 1.4;
  font-weight: 700;
  color: var(--kq-ink);
  margin-bottom: 4px;
}

.kq-modes-section .kq-mode p {
  font-family: var(--kq-sans);
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--kq-ink-soft);
  margin: 0;
}

/* Decorative aria-hidden glyphs only — these hues are never body text.

   --kq-hanko on --kq-raised (#1F2026) is 4.07:1, which looks like a 1.4.3 fail
   until you check WHICH threshold applies. `.kq-mode-g` is font-size: 32px
   (above) at the inherited weight 400 — no rule in this file or in the shared
   :deep() layer of KanjiQuizz.vue sets a font-weight on this span. 32px = 24pt,
   and 1.4.3 defines large-scale text as 18pt+ regular, so the bar here is
   3:1, NOT 4.5:1 — and 4.07:1 clears it with margin.
   Belt and braces: the glyph is aria-hidden="true" and is doubled by the
   readable <strong> title on the next line, so nothing is conveyed by it alone.
   Matches design/kanjiquizz/desktop.html line 230 (color:var(--hanko)).
   The five other hues are 5.8:1 or better on --kq-raised. */
.kq-g-hanko { color: var(--kq-hanko); }

.kq-g-matcha { color: var(--kq-matcha); }
.kq-g-aizome { color: var(--kq-aizome); }
.kq-g-karashi { color: var(--kq-karashi); }
.kq-g-fuji { color: var(--kq-fuji); }
.kq-g-asagi { color: var(--kq-asagi); }

/* Locked design rule: the grid drops to TWO columns and never to one — at one
   column it stops reading as the app home screen. */
@media (max-width: 1200px) {
  .kq-modes {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
