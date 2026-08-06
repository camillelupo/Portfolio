<script setup>
// "Le problème" section. Eyebrow is the h2, section title the h3 (mockup hierarchy).
</script>

<template>
  <section class="kq-problem">
    <h2>{{ $t('kq.problem.eyebrow') }}</h2>
    <h3>{{ $t('kq.problem.title') }}</h3>
    <p class="kq-lede kq-problem-body">{{ $t('kq.problem.body') }}</p>
  </section>
</template>

<style scoped>
/* Padding, border-top and the h2/h3/p/.kq-lede typography come from the shared
   :deep() typography layer in KanjiQuizz.vue. */
.kq-problem .kq-problem-body {
  margin-bottom: 0;
}
</style>
