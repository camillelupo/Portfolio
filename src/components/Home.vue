<template>
  <div class="pf-page">
    <div class="pf-content">
      <div class="pf-grid">

        <!-- Bloc de présentation. Il occupe les quatre colonnes : c'est le seul
             contenu que la page d'accueil ait à porter, le reste du site est à
             un clic dans le rail. -->
        <section class="pf-tile pf-c4 pf-hero">
          <p class="pf-pill">
            <span class="pf-dot" aria-hidden="true"></span>
            {{ $t('message.homePill') }}
          </p>

          <div>
            <!-- Deux clés et un <br> plutôt qu'une chaîne à balise : la coupure
                 ne tombe pas au même endroit d'une langue à l'autre, elle fait
                 donc partie de la traduction. -->
            <h1>{{ $t('message.homeTitle1') }}<br>{{ $t('message.homeTitle2') }}</h1>
            <p>{{ $t('message.homeLead') }}</p>
            <div class="pf-acts">
              <router-link class="pf-btn pf-btn-primary" :to="$lp('/portfolio')">
                {{ $t('message.homeCtaProjects') }}
              </router-link>
              <router-link class="pf-btn pf-btn-ghost" :to="$lp('/contact')">
                {{ $t('message.homeCtaContact') }}
              </router-link>
            </div>
          </div>
        </section>

        <!-- Aperçu du projet en cours. -->
        <section class="pf-tile pf-c2 pf-prj">
          <p class="pf-badge">
            <span class="pf-dot" aria-hidden="true"></span>
            {{ $t('message.slotEmpty') }}
          </p>
          <h3>KanjiQuizz</h3>
          <p>{{ $t('message.quizz') }}</p>
          <ul class="pf-tags">
            <li class="pf-tag" v-for="tag in $tm('message.homeProjectTags')" :key="$rt(tag)">
              {{ $rt(tag) }}
            </li>
          </ul>
          <div class="pf-acts pf-acts-end">
            <!-- Le produit vit sur son propre domaine : c'est un lien
                 sortant, pas une route. Pas de `nofollow` — c'est un lien
                 legitime vers son propre produit, l'autorite doit passer. -->
            <a class="pf-btn pf-btn-ghost" :href="KANJIQUIZZ_URL" rel="noopener">
              {{ $t('message.projectPageCta') }}
            </a>
          </div>
        </section>

        <!-- Stack et renvoi vers le parcours. -->
        <section class="pf-tile pf-c2">
          <span class="pf-lbl">{{ $t('message.homeStackLabel') }}</span>
          <ul class="pf-tags">
            <li class="pf-tag" v-for="tech in $tm('message.homeStack')" :key="$rt(tech)">
              {{ $rt(tech) }}
            </li>
          </ul>
          <p class="pf-body">{{ $t('message.homeStackText') }}</p>
          <div class="pf-acts pf-acts-end">
            <router-link class="pf-btn pf-btn-ghost" :to="$lp('/about')">
              {{ $t('message.homeStackCta') }}
            </router-link>
          </div>
        </section>

      </div>

      <PfFooter />
    </div>
  </div>
</template>

<script setup>
import { usePageHead } from '@/composables/usePageHead.js'
import PfFooter from '@/components/PfFooter.vue'
import { KANJIQUIZZ_URL } from '@/config.js'

usePageHead('home', '/')
</script>

<style scoped>
/* Le sur-titre de la tuile « Stack principal » a besoin d'un peu d'air avant
   ses étiquettes ; `.pf-tags` en apporte déjà 20px aux autres tuiles, où il
   suit un paragraphe et non un libellé. */
.pf-lbl + .pf-tags {
  margin-top: 14px;
}
</style>
