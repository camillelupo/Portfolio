<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <main>
    <div class="select-container">
      <select v-model="$i18n.locale"  class="custom-select">
        <option value="en">🇬🇧 EN</option>
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
    background-color: #111111;
    top: 10px;
    right: 10px;
    z-index: 999;
    position: fixed;
  }
}
.custom-select {
  background-color: #111111;
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  appearance: none; /* Remove default arrow */
  -webkit-appearance: none; /* Remove default arrow for Safari */
}

.custom-select:focus {
  outline: none; /* Remove focus outline */
}
</style>



