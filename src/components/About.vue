<template>
  <div class="pf-page">
    <div class="pf-content">

      <div class="pf-phead">
        <span class="pf-lbl">{{ $t('message.aboutLbl') }}</span>
        <h1>{{ $t('message.aboutTitle1') }}<br>{{ $t('message.aboutTitle2') }}</h1>
        <p>{{ $t('message.about') }}</p>
      </div>

      <h2 class="pf-sec">{{ $t('message.parcoursTitle') }}</h2>
      <!-- Une <ol> et non une suite de <section> : l'ordre est porteur de sens
           (antichronologique, REDLAB en premier). Le nombre de puces diffère
           d'un poste à l'autre, chaque entrée liste donc ses propres clés
           plutôt que de les dériver d'un compte commun. -->
      <ol class="pf-grid">
        <li class="pf-tile pf-c2 pf-job" v-for="job in jobs" :key="job.key">
          <time class="pf-mono pf-job-date" :datetime="job.datetime">
            {{ $t(`message.jobs.${job.key}.date`) }}
          </time>
          <p class="pf-job-co">{{ $t(`message.jobs.${job.key}.company`) }}</p>
          <p class="pf-job-role">{{ $t(`message.jobs.${job.key}.role`) }}</p>
          <ul>
            <li v-for="bullet in job.bullets" :key="bullet">
              {{ $t(`message.jobs.${job.key}.${bullet}`) }}
            </li>
          </ul>
        </li>
      </ol>

      <h2 class="pf-sec">{{ $t('message.blockSkills') }}</h2>
      <div class="pf-grid">

        <section class="pf-tile pf-c3">
          <span class="pf-lbl">{{ $t('message.blockSkills') }}</span>
          <ul class="pf-tags">
            <li class="pf-tag" v-for="skill in $tm('message.skills')" :key="$rt(skill)">
              {{ $rt(skill) }}
            </li>
          </ul>
        </section>

        <section class="pf-tile">
          <span class="pf-lbl">{{ $t('message.japanTitle') }}</span>
          <p class="pf-mono pf-japan-date">{{ $t('message.japanDate') }}</p>
          <p class="pf-body">{{ $t('message.japanText') }}</p>
        </section>

        <section class="pf-tile pf-c2">
          <span class="pf-lbl">{{ $t('message.blockEducation') }}</span>
          <dl class="pf-defs">
            <div class="pf-dl">
              <dt>{{ $t('message.educationDegree') }}</dt>
              <dd>{{ $t('message.educationSchool') }}</dd>
            </div>
          </dl>
        </section>

        <section class="pf-tile pf-c2">
          <span class="pf-lbl">{{ $t('message.blockLanguages') }}</span>
          <dl class="pf-defs">
            <div class="pf-dl">
              <dt>{{ $t('message.languageEnglish') }}</dt>
              <dd>{{ $t('message.languageEnglishLevel') }}</dd>
            </div>
            <div class="pf-dl">
              <dt>{{ $t('message.languageJapanese') }}</dt>
              <dd>{{ $t('message.languageJapaneseLevel') }}</dd>
            </div>
          </dl>
        </section>

      </div>

      <PfFooter />
    </div>
  </div>
</template>

<script setup>
import { usePageHead } from '@/composables/usePageHead.js'
import PfFooter from '@/components/PfFooter.vue'

usePageHead('about', '/about')

// Parcours, source : le CV de Camille Lupo. `datetime` ne porte que la date de
// début ; TROP-PLUS n'est connu qu'à l'année près, ce qui reste une date HTML
// valide.
const jobs = [
  { key: 'redlab', datetime: '2025-10', bullets: ['b1', 'b2', 'b3'] },
  { key: 'tropplus', datetime: '2020', bullets: ['b1', 'b2', 'b3', 'b4'] },
]
</script>

<style scoped>
.pf-job-date {
  display: block;
  color: var(--pf-ink-faint);
}

.pf-japan-date {
  color: var(--pf-ink-faint);
  margin-top: 8px;
}

.pf-lbl + .pf-tags,
.pf-lbl + .pf-defs {
  margin-top: 14px;
}
</style>
