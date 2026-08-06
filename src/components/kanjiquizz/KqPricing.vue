<script setup>
// "Tarif" — WASHI SHEET #2 (the second and last one on the page).
// Free plan = N5 only, 79 kanji. Paid plan = 8,99 €, one-off, billed by Google Play.
const plans = [
  { key: 'free' },
  { key: 'full', accent: true },
]

const features = ['f1', 'f2', 'f3', 'f4']
</script>

<template>
  <section class="kq-pricing-section">
    <div class="kq-sheet">
      <h2>{{ $t('kq.pricing.eyebrow') }}</h2>
      <h3>{{ $t('kq.pricing.title') }}</h3>
      <p class="kq-lede">{{ $t('kq.pricing.lede') }}</p>

      <div class="kq-price-row">
        <div
          v-for="plan in plans"
          :key="plan.key"
          class="kq-plan"
          :class="{ 'kq-plan-accent': plan.accent }"
        >
          <p class="kq-plan-p">{{ $t('kq.pricing.' + plan.key + '.price') }}</p>
          <p class="kq-plan-u">{{ $t('kq.pricing.' + plan.key + '.unit') }}</p>
          <ul>
            <li v-for="feature in features" :key="feature">
              {{ $t('kq.pricing.' + plan.key + '.' + feature) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ---------------------------------------------------------------------------
   Washi sheet — see KqSrs.vue. The two sheets are scoped components, so the
   block is restated here rather than shared through a global style (the page
   allows `<style scoped>` only).
   rgba() below is the mockup's shadow verbatim; there is no shadow token.
   --------------------------------------------------------------------------- */
.kq-pricing-section .kq-sheet {
  background: var(--kq-w-paper);
  color: var(--kq-w-ink);
  border-radius: 18px;
  padding: 44px 44px 40px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, .45), 0 2px 4px rgba(0, 0, 0, .3);
}

/* Palette inversion — two classes + the scope attribute = (0,3,1), so these beat
   the shell's shared `.kq-page[data-v-x] h2|h3|p` layer (0,2,1). A bare
   `h2 {}` here would compile to (0,1,1) and lose silently. */
.kq-pricing-section .kq-sheet h2 {
  color: var(--kq-w-ink-soft);
}

.kq-pricing-section .kq-sheet h3 {
  color: var(--kq-w-ink);
}

.kq-pricing-section .kq-sheet p {
  color: var(--kq-w-ink-soft);
}

/* (0,4,0) — beats the shell's `.kq-page[data-v-x] .kq-lede` (0,3,0). */
.kq-pricing-section .kq-sheet .kq-lede {
  color: var(--kq-w-ink-soft);
  margin-bottom: 30px;
}

/* ---------- plans ---------- */
.kq-price-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
}

/* Functional border: w-line-strong, never w-line. */
.kq-plan {
  border: 1px solid var(--kq-w-line-strong);
  border-radius: 14px;
  padding: 22px 24px;
  background: var(--kq-w-raised);
}

/* The border it recolours sits on .kq-plan, whose surface is --kq-w-raised (not
   --kq-w-paper): washi hanko there is 7.89:1 — safe as the paid plan's accent
   border. (It would pass on --kq-w-paper too, at 7.36:1.) */
.kq-price-row .kq-plan-accent {
  border-color: var(--kq-w-hanko);
}

.kq-price-row .kq-plan .kq-plan-p {
  font-family: var(--kq-serif);
  font-size: 32px;
  line-height: 1;
  margin: 0 0 2px;
  color: var(--kq-w-ink);
}

.kq-price-row .kq-plan .kq-plan-u {
  font-family: var(--kq-mono);
  font-size: 11px;
  line-height: 1.5;
  color: var(--kq-w-ink-soft);
  letter-spacing: .06em;
  text-transform: uppercase;
  margin: 0 0 16px;
}

.kq-plan ul {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 14px;
}

/* Hairline between features: decorative, so w-line is the right token. */
.kq-plan li {
  padding: 7px 0 7px 22px;
  position: relative;
  color: var(--kq-w-ink-soft);
  border-top: 1px solid var(--kq-w-line);
}

.kq-plan li:first-child {
  border-top: none;
}

.kq-plan li::before {
  content: "·";
  position: absolute;
  left: 6px;
  color: var(--kq-w-hanko);
  font-weight: 700;
}

@media (max-width: 1200px) {
  .kq-pricing-section .kq-sheet {
    padding: 24px;
  }

  .kq-price-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
