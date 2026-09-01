<template>
  <div class="pf-page">
    <div class="pf-content">

      <div class="pf-phead">
        <span class="pf-lbl">{{ $t('message.contactLbl') }}</span>
        <h1>{{ $t('message.contactHeadline') }}</h1>
      </div>

      <div class="pf-grid">

        <section class="pf-tile pf-c4 pf-ct">
          <h2>{{ $t('message.contactTitle') }}</h2>
          <p>{{ $t('message.contactIntro') }}</p>
          <div class="pf-acts">
            <!-- Un vrai lien `mailto:` et non un bouton qui affecte
                 `window.location` : le clic droit, le clic milieu et le copier
                 de l'adresse fonctionnent, et le lien reste visible pour un
                 lecteur d'écran comme pour un robot. -->
            <a class="pf-btn pf-btn-primary" :href="`mailto:${email}`">
              {{ $t('message.contactButton') }}
            </a>
            <a class="pf-btn pf-btn-ghost" :href="githubUrl" rel="noopener">
              {{ $t('message.contactGithubCta') }}
            </a>
          </div>
        </section>

        <section class="pf-tile pf-c4">
          <span class="pf-lbl">{{ $t('message.contactOfferTitle') }}</span>
          <div class="pf-cols">
            <div>
              <h3>{{ $t('message.contactOfferMissionTitle') }}</h3>
              <p>{{ $t('message.contactOfferMissionText') }}</p>
              <ul class="pf-tags">
                <li class="pf-tag" v-for="tag in $tm('message.contactOfferMissionTags')" :key="$rt(tag)">
                  {{ $rt(tag) }}
                </li>
              </ul>
            </div>
            <div>
              <h3>{{ $t('message.contactOfferSitesTitle') }}</h3>
              <p>{{ $t('message.contactOfferSitesText') }}</p>
              <ul class="pf-tags">
                <li class="pf-tag" v-for="tag in $tm('message.contactOfferSitesTags')" :key="$rt(tag)">
                  {{ $rt(tag) }}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="pf-tile pf-c2 pf-coord">
          <span class="pf-lbl">{{ $t('message.contactEmailLabel') }}</span>
          <p class="pf-coord-v"><a :href="`mailto:${email}`">{{ email }}</a></p>
        </section>

        <section class="pf-tile pf-c2 pf-coord">
          <span class="pf-lbl">{{ $t('message.contactGithubLabel') }}</span>
          <p class="pf-coord-v"><a :href="githubUrl" rel="noopener">{{ githubHandle }}</a></p>
          <p class="pf-coord-h">{{ $t('message.contactGithubHint') }}</p>
        </section>

        <section class="pf-tile pf-c2 pf-coord">
          <span class="pf-lbl">{{ $t('message.contactLocationLabel') }}</span>
          <p class="pf-coord-v">{{ $t('message.contactLocationValue') }}</p>
          <p class="pf-coord-h">{{ $t('message.contactLocationHint') }}</p>
        </section>

        <section class="pf-tile pf-c2 pf-coord">
          <span class="pf-lbl">{{ $t('message.contactAvailabilityLabel') }}</span>
          <p class="pf-coord-v pf-coord-avail">
            <span class="pf-dot" aria-hidden="true"></span>
            {{ $t('message.contactAvailabilityValue') }}
          </p>
          <p class="pf-coord-h">{{ $t('message.contactAvailabilityHint') }}</p>
        </section>

      </div>

      <PfFooter />
    </div>
  </div>
</template>

<script setup>
import { usePageHead } from '@/composables/usePageHead.js'
import PfFooter from '@/components/PfFooter.vue'

usePageHead('contact', '/contact')

// Les deux seules coordonnées publiées. Elles sont déclarées ici et non dans
// les fichiers de locale : une adresse ne se traduit pas, et la répéter dans
// trois fichiers ouvrirait la porte à trois valeurs différentes.
const email = 'camille.lupo@hotmail.fr'
const githubHandle = 'github.com/camillelupo'
const githubUrl = `https://${githubHandle}`
</script>

<style scoped>
.pf-coord-avail {
  display: flex;
  align-items: center;
  gap: 9px;
}

/* Le lien d'une tuile de coordonnées est souligné : sans cela, rien ne le
   distingue du texte voisin, qui est de la même couleur (WCAG 1.4.1). */
.pf-coord-v a {
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: var(--pf-line-strong);
  transition: text-decoration-color 0.18s ease;
}

.pf-coord-v a:hover {
  text-decoration-color: var(--pf-ink);
}
</style>
