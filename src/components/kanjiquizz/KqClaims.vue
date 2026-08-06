<script setup>
// "Ce qui la distingue" — the three differentiators.
// Glyphs are TEXT (lang="ja", aria-hidden) doubled by the readable title next to them.
const claims = [
  { key: 'french', glyph: '仏', hue: 'kq-g-hanko' },
  { key: 'stroke', glyph: '書', hue: 'kq-g-asagi' },
  { key: 'srs', glyph: '復', hue: 'kq-g-matcha' },
]
</script>

<template>
  <section class="kq-claims-section">
    <h2>{{ $t('kq.claims.eyebrow') }}</h2>
    <div class="kq-claims">
      <div v-for="claim in claims" :key="claim.key" class="kq-claim">
        <span class="kq-claim-g" :class="claim.hue" lang="ja" aria-hidden="true">{{ claim.glyph }}</span>
        <strong>{{ $t('kq.claims.' + claim.key + '.title') }}</strong>
        <p>{{ $t('kq.claims.' + claim.key + '.body') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* gap + background paints decorative 1px hairlines between the columns. */
.kq-claims {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--kq-line);
}

.kq-claim {
  background: var(--kq-paper);
  padding: 26px 24px 26px 0;
}

.kq-claim:not(:first-child) {
  padding-left: 24px;
}

.kq-claim .kq-claim-g {
  font-family: var(--kq-serif);
  font-size: 26px;
  line-height: 1;
  margin-bottom: 12px;
  display: block;
}

/* Two class-level tokens + the scope attribute (0,3,1) so these beat the shared
   `.kq-page[data-v-x] p / strong` layer (0,2,1) regardless of bundle order. */
.kq-claims-section .kq-claim strong {
  display: block;
  font-family: var(--kq-sans);
  font-size: 16px;
  line-height: 1.4;
  font-weight: 700;
  color: var(--kq-ink);
  margin-bottom: 6px;
}

.kq-claims-section .kq-claim p {
  font-family: var(--kq-sans);
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--kq-ink-soft);
  margin: 0;
}

/* Decorative aria-hidden glyphs only — these hues are never body text.
   Unlike KqModes / KqHero, .kq-claim's surface is --kq-paper, not --kq-raised,
   so --kq-hanko is 4.73:1 here and stays legal as the glyph colour. */
.kq-g-hanko { color: var(--kq-hanko); }
.kq-g-matcha { color: var(--kq-matcha); }
.kq-g-asagi { color: var(--kq-asagi); }

@media (max-width: 760px) {
  .kq-claims {
    grid-template-columns: 1fr;
  }

  .kq-claim {
    padding: 24px 0;
  }

  .kq-claim:first-child {
    padding-top: 0;
  }

  .kq-claim:not(:first-child) {
    padding-left: 0;
  }

  .kq-claim:last-child {
    padding-bottom: 0;
  }
}
</style>
