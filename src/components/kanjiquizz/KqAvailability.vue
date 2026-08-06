<script setup>
// "Disponibilité" — prose column + the four facts.
// No offline promise here: the kanji quiz calls an API, and body2 says so.
const facts = [
  { key: 'platform' },
  { key: 'languages' },
  { key: 'release' },
  { key: 'publisher' },
]
</script>

<template>
  <section class="kq-avail-section">
    <h2>{{ $t('kq.avail.eyebrow') }}</h2>
    <div class="kq-avail">
      <div class="kq-avail-copy">
        <h3>{{ $t('kq.avail.title') }}</h3>
        <p>{{ $t('kq.avail.body1') }}</p>
        <p class="kq-avail-last">{{ $t('kq.avail.body2') }}</p>
      </div>

      <!-- Name/value pairs, so a description list rather than the mockup's
           list-item + bold: identical pixels, but the label becomes a real dt
           instead of a b element that the mockup itself resets to font-weight
           400. The div wrapper around each dt/dd pair is valid inside dl and is
           what carries the row hairline. -->
      <dl class="kq-facts">
        <div v-for="fact in facts" :key="fact.key" class="kq-fact">
          <dt>{{ $t('kq.avail.' + fact.key + 'Label') }}</dt>
          <dd>{{ $t('kq.avail.' + fact.key + 'Value') }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.kq-avail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 44px;
}

/* Two classes + the scope attribute = (0,3,1), so this beats the shell's shared
   `.kq-page[data-v-x] p` layer (0,2,1) and the paragraphs go ink-soft. */
.kq-avail-section .kq-avail-copy p {
  color: var(--kq-ink-soft);
}

.kq-avail-section .kq-avail-copy .kq-avail-last {
  margin-bottom: 0;
}

/* ---------- facts ---------- */
.kq-facts {
  margin: 0;
  padding: 0;
  font-size: 14.5px;
}

/* Row hairlines are decorative, so --kq-line is the right token. */
.kq-fact {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 16px;
  padding: 11px 0;
  border-bottom: 1px solid var(--kq-line);
}

.kq-fact:first-child {
  border-top: 1px solid var(--kq-line);
}

/* Bootstrap Reboot sets `dt{font-weight:700}` and `dd{margin-bottom:.5rem}`
   at (0,0,1); these are (0,2,1) and win. */
.kq-facts dt {
  font-family: var(--kq-mono);
  font-size: 11.5px;
  line-height: 1.65;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--kq-ink-faint);
  font-weight: 400;
  padding-top: 2px;
}

.kq-facts dd {
  font-family: var(--kq-sans);
  line-height: 1.65;
  color: var(--kq-ink-soft);
  margin: 0;
}

@media (max-width: 1200px) {
  .kq-avail {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Below this the 150px label column squeezes the value to a few characters. */
@media (max-width: 560px) {
  .kq-fact {
    grid-template-columns: 1fr;
    gap: 2px;
  }
}
</style>
