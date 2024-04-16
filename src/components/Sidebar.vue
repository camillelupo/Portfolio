<template>
  <div class="leftPart">

    <div class="innerSidebar">
      <Slide v-if="showSlide">
        <router-link id="home" to="/">
          <img src="../assets/home-run.966e5d31.svg" class="icon" alt="home">
          <span>Home</span>
        </router-link>
        <router-link id="about" to="/about">
          <img src="../assets/avatar.b8d92d86.svg" class="icon" alt="about">
          <span>About</span>
        </router-link>
        <router-link id="portFolio" to="/portFolio">
          <img src="../assets/briefcase.66307d98.svg" class="icon" alt="portFolio">
          <span>PortFolio</span>
        </router-link>
        <router-link id="contact" to="/contact" >
          <img src="../assets/mail.b5a8d8d5.svg" class="icon" alt="contact">
          <span>Contact</span>
        </router-link>
        <div class="select-container">
          <select v-model="$i18n.locale" class="custom-select">
            <option value="en">🇬🇧 EN</option>
            <option value="fr">🇫🇷 FR</option>
            <option value="jp">🇯🇵 日本語</option>
          </select>
        </div>
      </Slide>
      <div v-if="!showSlide">
        <router-link class="item" :class="{ 'itemSelected': currentTab === 0 }" @click="setCurrentTab(0)" to="/">
          <img src="../assets/home-run.966e5d31.svg" class="icon" alt="home">
          <div class="text">Home</div>
        </router-link>
        <router-link class="item" :class="{ 'itemSelected': currentTab === 1 }" @click="setCurrentTab(1)" to="/about">
          <img src="../assets/avatar.b8d92d86.svg" class="icon" alt="about">
          <div class="text">About</div>
        </router-link>
        <router-link class="item" to="/portfolio" :class="{ 'itemSelected': currentTab === 2 }"
                     @click="setCurrentTab(2)">
          <img src="../assets/briefcase.66307d98.svg" class="icon" alt="portFolio">
          <div class="text">PortFolio</div>
        </router-link>
        <router-link class="item" to="/contact" :class="{ 'itemSelected': currentTab === 3 }" @click="setCurrentTab(3)">
          <img src="../assets/mail.b5a8d8d5.svg" class="icon" alt="contact">
          <div class="text">Contact</div>
        </router-link>
        <p class="copyright">© 2024 Created by Camille Lupo</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1200px) {
  .copyright {
    font-size: 10px !important;
  }
}

@media (max-width: 1200px) {
  .copyright {
    display: none;
  }
}

.leftPart {
  width: 300px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  padding: 0 100px;
  background-color: black;
  color: #aaaaaa;
}

@media (max-width: 1200px) {
  .leftPart {
    position: fixed;
    width: 100%;
    height: auto;
    padding: 0;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    color: #f8f8f8;
  }
}

.innerSidebar {
  width: 100%;
  height: auto;
}

@media (max-width: 1200px) {
  .innerSidebar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
  }
}

.item {
  font-size: 20px;
  letter-spacing: 2px;
  cursor: pointer;
  text-decoration: none;
  color: #aaaaaa;
  transition: all 0.3s ease;
}

@media (min-width: 1200px) {
  .icon {
    display: none;
  }
}

.icon {
  width: 25px;
  height: 25px;
  filter: invert(1);
}

.text {
  padding: 6px;
  font-family: 'Roboto Mono', Monaco, courier, monospace;
}

@media (max-width: 1200px) {
  .text {
    display: none;
    font-family: 'Roboto Mono', Monaco, courier, monospace;
  }
}
.item:hover {
  color: #fff;
  letter-spacing: 4px;
}

.itemSelected {
  color: #fff;
  letter-spacing: 4px;
}
.custom-select {
  background-color: #3f3f41;
  color: white;
  border: none;
  padding: 8px;
  font-size: 16px;
  appearance: none;
  -webkit-appearance: none;
}
</style>
<script setup>
import {ref, onMounted, onBeforeUnmount, watch} from 'vue';
import {Slide} from 'vue3-burger-menu';

const currentTab = ref(0);

function setCurrentTab(tabIndex) {
  currentTab.value = tabIndex;
}

const showSlide = ref(false);

const handleResize = () => {
  showSlide.value = window.innerWidth <= 1200;
};

onMounted(() => {
  handleResize(); // Call the function initially
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

// Debugging: Log showSlide changes
watch(showSlide, (newValue, oldValue) => {
  console.log('showSlide changed:', newValue);
});
</script>
<style>
.bm-burger-bars {
  background-color: white !important;
}
</style>