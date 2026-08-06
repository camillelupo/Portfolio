<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main>
    <div class="select-container">
      <select v-model="$i18n.locale"  class="custom-select">
        <option value="en" >🇬🇧 EN</option>
        <option value="fr">🇫🇷 FR</option>
        <option value="jp">🇯🇵 日本語</option>
      </select>
    </div>
      <Sidebar></Sidebar>
      <router-view></router-view>
  </main>
</template>


<style>
@media (min-width: 1200px) {
  .select-container {
    width: auto;
    background-color: var(--pf-paper);
    top: 10px;
    right: 10px;
    z-index: 999;
    position: fixed;
  }
}
/* On desktop this is the ONLY language control on the page (Sidebar's bordered
   copy only renders below 1200px), and it sat on a --pf-paper container with a
   --pf-paper fill and no border: 1:1, nothing identified it as a control.
   --pf-line-strong is 3.57:1 on --pf-paper, clearing WCAG 1.4.11 — the same
   boundary `.rail .sel` and `.mbar .lg` draw in design/refonte/pages.html. */
.custom-select {
  background-color: var(--pf-paper);
  color: var(--pf-ink);
  border: 1px solid var(--pf-line-strong);
  padding: 8px;
  font-size: 16px;
  appearance: none; /* Remove default arrow */
  -webkit-appearance: none; /* Remove default arrow for Safari */
  font-family: twemoji, sans-serif;
}

/* This block is not scoped, so the old `outline: none` also stripped the focus
   ring off the burger menu's select. Replaced by the project's focus idiom,
   the one Portfolio.vue and Contact.vue use (WCAG 2.4.7). */
.custom-select:focus-visible {
  outline: 2px solid var(--pf-ink);
  outline-offset: 3px;
  border-radius: 2px;
}
@font-face {
  font-family: 'Twemoji';
  src: url('./assets/fonts/TwemojiMozilla.ttf') format('truetype');
  font-display: swap;
}

body {
  font-family: 'Twemoji', 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Segoe UI Symbol', 'Android Emoji', 'EmojiSymbols', sans-serif;
}
</style>



