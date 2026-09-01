<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main>
    <!-- Le sélecteur de langue flottant a disparu : il est passé dans le pied
         du rail, avec le sélecteur de thème, sous forme de vrais liens vers
         les URL des autres langues (voir Sidebar.vue). -->
    <Sidebar></Sidebar>
    <router-view></router-view>
  </main>
</template>

<style>
/* Styles globaux du document. Tout le reste de l'habillage vit soit dans
   `src/assets/portfolio.css` (primitives `pf-`), soit dans le bloc `scoped`
   du composant concerné.

   Bootstrap n'est plus chargé : après la refonte, plus une seule classe `bs-`
   ne subsistait dans `src/`, et les deux feuilles maison (`pf-`, `kq-`)
   déclarent déjà leur propre typographie. Restaient trois règles de Reboot sur
   lesquelles le rail — qui vit hors de `.pf-page` — s'appuyait encore ; elles
   sont reprises ici, ce qui remplace 231 Ko de CSS par une dizaine de lignes. */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Sans cela, un <button> reprend la police du système et non celle du site. */
button,
input,
select,
textarea {
  font: inherit;
  margin: 0;
}

body {
  margin: 0;
  background: var(--pf-paper);
  color: var(--pf-ink);
  /* La pile de polices n'est plus celle des émojis : les drapeaux du
     <select> étaient la seule raison de charger Twemoji (1,08 Mo, soit la
     moitié du bundle), et le rail les remplace par « FR / EN / 日本語 ». */
  font-family: var(--pf-sans);
}
</style>
