<template>
  <!-- Pied de page commun aux quatre pages du portfolio. Il vit dans un
       composant plutôt que dans App.vue parce qu'il fait partie de la colonne
       de contenu : `margin-top: auto` le colle au bas de `.pf-content`, ce
       qu'il ne pourrait pas faire depuis l'extérieur de cette colonne. -->
  <footer class="pf-footer">
    <span class="pf-mono">Camille Lupo — {{ $t('message.footerPlace') }}</span>
    <!-- Année calculée, pas écrite en dur : un « © 2026 » figé se périme tout
         seul et se remarque. -->
    <span class="pf-mono">© {{ year }}</span>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
