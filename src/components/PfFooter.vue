<template>
  <!-- Pied de page commun aux quatre pages du portfolio. Il vit dans un
       composant plutôt que dans App.vue parce qu'il fait partie de la colonne
       de contenu : `margin-top: auto` le colle au bas de `.pf-content`, ce
       qu'il ne pourrait pas faire depuis l'extérieur de cette colonne. -->
  <footer class="pf-footer">
    <span class="pf-mono">Camille Lupo - {{ $t('message.footerPlace') }}</span>
    <!-- Mentions légales (LCEN art. 6-III) : page statique servie par Caddy
         depuis api/public/ du dépôt AppKanjiQuizz, pas par ce SPA. Donc un
         <a href> et jamais un <router-link>, qui la résoudrait côté client et
         tomberait sur la page d'accueil. Français seulement : c'est le texte
         qui fait foi. -->
    <a class="pf-mono pf-footer-link" href="/mentions-legales" hreflang="fr">{{ $t('message.footerLegal') }}</a>
    <!-- Année calculée, pas écrite en dur : un « © 2026 » figé se périme tout
         seul et se remarque. -->
    <span class="pf-mono">© {{ year }}</span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
