<template>
  <div class="pf-page">
    <div class="pf-content">

      <div class="pf-phead">
        <span class="pf-lbl">{{ $t('message.workTitle') }}</span>
        <h1>{{ $t('message.portfolioTitle') }}</h1>
        <p>{{ $t('message.portfolioIntro') }}</p>
      </div>

      <div class="pf-grid">

        <section class="pf-tile pf-c3 pf-prj">
          <p class="pf-badge">
            <span class="pf-dot" aria-hidden="true"></span>
            {{ $t('message.slotEmpty') }}
          </p>
          <h3>KanjiQuizz</h3>
          <p>{{ $t('message.quizz') }}</p>
          <ul class="pf-tags">
            <li class="pf-tag" v-for="tag in $tm('message.portfolioTags')" :key="$rt(tag)">
              {{ $rt(tag) }}
            </li>
          </ul>
          <div class="pf-acts pf-acts-end">
            <!-- Le produit vit sur son propre domaine : c'est un lien
                 sortant, pas une route. Voir le meme lien sur Home.vue. -->
            <a class="pf-btn pf-btn-primary" href="https://kanjiquizz.camille-lupo.fr" rel="noopener">
              {{ $t('message.projectPageCta') }}
            </a>
            <a class="pf-btn pf-btn-ghost" href="https://github.com/camillelupo" rel="noopener">
              {{ $t('message.portfolioGithubCta') }}
            </a>
          </div>
        </section>

        <!-- Emplacement de la capture de l'écran d'accueil de l'application.
             Le trait discontinu signale un trou à combler : tant que le
             fichier n'existe pas, mieux vaut l'annoncer qu'afficher une image
             de remplacement qui se ferait passer pour le produit. -->
        <section class="pf-tile pf-r2 pf-shotwrap">
          <div class="pf-shotph">
            <span>{{ $t('message.shotPending') }}</span>
            <span>{{ $t('message.shotPendingFile') }}</span>
          </div>
        </section>

        <section class="pf-tile pf-c3">
          <h2 class="pf-covers-title">{{ $t('message.portfolioCoversTitle') }}</h2>
          <ul class="pf-glyphs">
            <li>
              <span class="pf-glyph" aria-hidden="true">漢</span>
              <h3>{{ $t('message.cover1Title') }}</h3>
              <p>{{ $t('message.cover1Text') }}</p>
            </li>
            <li>
              <span class="pf-glyph" aria-hidden="true">あ</span>
              <h3>{{ $t('message.cover2Title') }}</h3>
              <p>{{ $t('message.cover2Text') }}</p>
            </li>
            <li>
              <span class="pf-glyph" aria-hidden="true">語</span>
              <h3>{{ $t('message.cover3Title') }}</h3>
              <p>{{ $t('message.cover3Text') }}</p>
            </li>
          </ul>
        </section>

      </div>

      <PfFooter />
    </div>
  </div>
</template>

<script setup>
import { usePageHead } from '@/composables/usePageHead.js'
import PfFooter from '@/components/PfFooter.vue'

usePageHead('portfolio', '/portfolio')
</script>

<style scoped>
.pf-covers-title {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
}
</style>
