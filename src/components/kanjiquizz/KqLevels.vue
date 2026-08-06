<script setup>
// "Cinq niveaux" — the JLPT breakdown. Stays sumi (only SRS and pricing are washi).
//
// The bar widths carry meaning (share of the 2 211 total); that meaning is also
// present as text through the count of each row and through the aria-label.
// The JLPT hues are FILLS on the bars, never text.
const levels = [
  { key: 'n5', name: 'N5', hue: 'kq-b-matcha', width: '8%', free: true },
  { key: 'n4', name: 'N4', hue: 'kq-b-aizome', width: '16%' },
  { key: 'n3', name: 'N3', hue: 'kq-b-karashi', width: '34%' },
  { key: 'n2', name: 'N2', hue: 'kq-b-fuji', width: '34%' },
  { key: 'n1', name: 'N1', hue: 'kq-b-hanko', width: '100%' },
]
</script>

<template>
  <section class="kq-levels-section">
    <h2>{{ $t('kq.levels.eyebrow') }}</h2>
    <h3>{{ $t('kq.levels.title') }}</h3>
    <p class="kq-lede kq-levels-lede">{{ $t('kq.levels.lede') }}</p>

    <!-- Exposed as ONE labelled image rather than five rows of loose spans:
         a bar is an empty box, so row by row a screen reader would get
         "N5 79 gratuit" with no sense of the proportion the bar encodes.
         kq.levels.aria states the whole distribution in one sentence, and is
         already translated in the three locales. Same pattern as the device
         reconstruction in KqHero.vue. The level names and the counts stay real
         visible text, and the total line below sits OUTSIDE the image node so it
         is always announced. -->
    <div class="kq-levels" role="img" :aria-label="$t('kq.levels.aria')">
      <div v-for="level in levels" :key="level.key" class="kq-lvl">
        <span class="kq-lvl-n">{{ level.name }}</span>
        <span class="kq-lvl-bar" :class="level.hue" :style="{ width: level.width }"></span>
        <span class="kq-lvl-c">
          {{ $t('kq.levels.' + level.key) }}<em v-if="level.free">{{ $t('kq.levels.free') }}</em>
        </span>
      </div>
    </div>

    <p class="kq-total">
      <span>{{ $t('kq.levels.totalLabel') }}</span>
      <b>{{ $t('kq.levels.total') }}</b>
    </p>
  </section>
</template>

<style scoped>
/* The shell's `.kq-page[data-v-x] .kq-lede` is (0,3,0) and is emitted AFTER the
   section components, so a (0,3,0) override here would lose the tie. Doubling
   the class on the element takes this to (0,4,0). */
.kq-levels-section .kq-lede.kq-levels-lede {
  margin-bottom: 34px;
}

.kq-levels {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* The hairlines between rows are decorative, so --kq-line is the right token. */
.kq-lvl {
  display: grid;
  grid-template-columns: 52px 1fr 92px;
  align-items: center;
  gap: 18px;
  padding: 15px 0;
  border-bottom: 1px solid var(--kq-line);
}

.kq-lvl:first-child {
  border-top: 1px solid var(--kq-line);
}

.kq-lvl .kq-lvl-n {
  font-family: var(--kq-mono);
  font-size: 14px;
  line-height: 1.65;
  color: var(--kq-ink);
}

.kq-lvl .kq-lvl-bar {
  height: 9px;
  border-radius: 5px;
}

.kq-lvl .kq-lvl-c {
  font-family: var(--kq-mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--kq-ink-soft);
  text-align: right;
}

.kq-lvl .kq-lvl-c em {
  font-style: normal;
  color: var(--kq-ink-faint);
  font-size: 11px;
  display: block;
}

/* Two classes + the scope attribute = (0,3,0), which beats the shell's
   `.kq-page[data-v-x] p` (0,2,1) on the class count, whatever the bundle order.
   A bare `.kq-total` would only reach (0,2,0) and lose its colour. */
.kq-levels-section .kq-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 20px 0 0;
  font-family: var(--kq-mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--kq-ink-faint);
}

.kq-levels-section .kq-total b {
  font-family: var(--kq-serif);
  font-size: 30px;
  line-height: 1.2;
  color: var(--kq-ink);
  font-weight: 600;
}

/* JLPT hues are fills only — these are bar backgrounds, never text colours. */
.kq-b-matcha { background: var(--kq-matcha); }
.kq-b-aizome { background: var(--kq-aizome); }
.kq-b-karashi { background: var(--kq-karashi); }
.kq-b-fuji { background: var(--kq-fuji); }
.kq-b-hanko { background: var(--kq-hanko); }

@media (max-width: 560px) {
  .kq-lvl {
    grid-template-columns: 40px 1fr 76px;
    gap: 12px;
  }
}
</style>
