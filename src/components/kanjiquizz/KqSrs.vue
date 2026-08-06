<script setup>
// "Répétition espacée" — WASHI SHEET #1 (one of exactly two on the page).
// Inside .kq-sheet the palette inverts to the washi tokens.
//
// The 5 bars are a decorative CSS reconstruction of the interval curve. Heights
// come from the mockup; only the last (longest) interval takes the washi hanko
// accent, which is safe as text/fill on light paper (7.36:1).
const intervals = [
  { key: 'd1', height: '24%' },
  { key: 'd3', height: '39%' },
  { key: 'd7', height: '56%' },
  { key: 'd21', height: '74%' },
  { key: 'd60', height: '100%', accent: true },
]
</script>

<template>
  <section class="kq-srs-section">
    <div class="kq-sheet">
      <div class="kq-srs">
        <div class="kq-srs-copy">
          <h2>{{ $t('kq.srs.eyebrow') }}</h2>
          <h3>{{ $t('kq.srs.title') }}</h3>
          <p>{{ $t('kq.srs.body1') }}</p>
          <p class="kq-srs-note"><strong>{{ $t('kq.srs.bodyStrong') }}</strong> {{ $t('kq.srs.body2') }}</p>
        </div>

        <!-- Five bars carrying no text of their own would reach a screen reader as
             five orphan labels ("1j", "3j"...). role="img" prunes the subtree and
             substitutes one sentence that states the whole progression. The day
             labels stay visible for sighted users. -->
        <div class="kq-curve-wrap" role="img" :aria-label="$t('kq.srs.chartAria')">
          <div class="kq-curve">
            <div
              v-for="step in intervals"
              :key="step.key"
              class="kq-curve-bar"
              :class="{ 'kq-curve-accent': step.accent }"
              :style="{ height: step.height }"
            >
              <span>{{ $t('kq.srs.' + step.key) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------------------
   Washi sheet.
   The box-shadow is what makes the block read as a sheet of paper laid on the
   dark page. There is no shadow token in the theme, so the mockup's rgba()
   values are reproduced verbatim (rgba, not a hex literal — the palette itself
   is 100% var(--kq-*)).
   --------------------------------------------------------------------------- */
.kq-srs-section .kq-sheet {
  background: var(--kq-w-paper);
  color: var(--kq-w-ink);
  border-radius: 18px;
  padding: 44px 44px 40px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, .45), 0 2px 4px rgba(0, 0, 0, .3);
}

/* Palette inversion.
   The shell's shared layer compiles to `.kq-page[data-v-x] h2|h3|p|strong`
   = (0,2,1) and sets `color`. A bare `h2 {}` here would be (0,1,1) and lose
   silently, so every inversion below carries TWO classes + the scope attribute
   = (0,3,1). */
.kq-srs-section .kq-sheet h2 {
  color: var(--kq-w-ink-soft);
}

.kq-srs-section .kq-sheet h3 {
  color: var(--kq-w-ink);
}

.kq-srs-section .kq-sheet p {
  color: var(--kq-w-ink-soft);
}

.kq-srs-section .kq-sheet strong {
  color: var(--kq-w-ink);
}

.kq-srs-section .kq-sheet .kq-srs-note {
  margin: 0;
}

/* ---------- layout ---------- */
.kq-srs {
  display: grid;
  grid-template-columns: 1fr 250px;
  gap: 44px;
  align-items: center;
}

/* ---------- interval chart ---------- */
.kq-curve-wrap {
  padding-bottom: 26px;
}

.kq-curve {
  display: flex;
  align-items: flex-end;
  gap: 9px;
  height: 110px;
}

.kq-curve-bar {
  flex: 1;
  background: var(--kq-w-line-strong);
  border-radius: 3px 3px 0 0;
  position: relative;
}

/* washi hanko on light paper = 7.36:1, safe. (sumi hanko as text would not be) */
.kq-curve-bar.kq-curve-accent {
  background: var(--kq-w-hanko);
}

.kq-curve-bar span {
  position: absolute;
  bottom: -22px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: var(--kq-mono);
  font-size: 9.5px;
  line-height: 1.65;
  color: var(--kq-w-ink-soft);
}

@media (max-width: 1200px) {
  .kq-srs-section .kq-sheet {
    padding: 24px;
  }

  .kq-srs {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
