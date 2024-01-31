<template>
  <div class="rigthPart">
    <div class="tabs">
      <button @click="selectTab(1)" :class="{ 'active': currentTab === 1 }">Mobile app</button>
      <div class="line"></div>
      <button @click="selectTab(2)" :class="{ 'active': currentTab === 2 }">Website</button>
    </div>
    <div class="centering">
      <div class="tab-content">
        <div class="content-portfolio">
          <div v-show="currentTab === 2">
            <div class="website-tab">
              <p class="text">A website using wordpress on my first internship on programming. </p>
              <a href="https://garsdelacale.fr/"
                 target="_blank">
                <img src="../assets/garsdelacale.png" alt="" class="photo-website">
              </a>
            </div>
          </div>
        </div>
        <div class="content-portfolio" v-show="currentTab === 1">
          <div class="website-tab">
            <p class="text">A mobile application project for learning japanese kanji.</p>
            <div class="content-app">
              <img src="../assets/image1.png" alt="" class="app-img">
              <img src="../assets/image2.png" alt="" class="app-img">
              <img src="../assets/image3.png" alt="" class="app-img">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.content-app {
  display: flex;
}

.app-img {
  max-width: 200px;
  max-height: 300px;
  padding: 20px;
}

.text {
  color: #f8f8f8;
  font-family: 'Roboto Mono', Monaco, courier, monospace;
}

@keyframes slideIn {
  0% {
    margin-left: 100px;
    opacity: 0.2;
  }
  100% {
    margin-left: 0px;
    opacity: 1;
  }
}

@media (max-width: 1200px) {
  .rigthPart {
    padding-left: 0px;
    min-height: 100vh;
    width: 100%;
    float: left;
    position: relative;
    background-color: #111111;
  }
}

@media (min-width: 1200px) {
  .rigthPart {
    padding-left: 400px;
    width: 100%;
    min-height: 100vh;
    float: left;
    position: relative;
    background-color: #111111;
  }
}

@media (min-width: 1200px) {
  .item {
    min-height: 400px;
  }
}

.line {
  border: #f8f8f8;
  width: 1px;
  background-color: #f8f8f8;
}

.item {
  max-height: 250px;
  background-color: white;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (min-width: 1200px) {
  .centering {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    animation: slideIn 1s ease-out;
  }
}

@media (max-width: 1200px) {
  .centering {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
  }
}

.tab-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 1200px) {
  .tabs {
    display: flex;
    margin-top: 30px;
    justify-content: center;
    font-size: 20px;
    font-family: 'Roboto Mono', Monaco, courier, monospace;
  }
}

@media (max-width: 1200px) {
  .tabs {
    display: flex;
    margin-top: 100px;
    justify-content: center;
    font-size: 15px;
  }
}


button {
  padding: 10px;
  cursor: pointer;
  border: transparent;
  background-color: #111111;
  color: #f8f8f8;
}

button.active:after {
  content: ''; /* Create a pseudo-element */
  display: block;
  width: 100%; /* Full width of the element */
  border-bottom: 1px solid #ffffff; /* Underline */ /* Padding below the underline */


//todo: animation sur la ligne grandi a partir du centre
}

.website-tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
}

@media (max-width: 1200px) {
  .photo-website {
    max-width: 400px;
    cursor: pointer;
  }
}

@media (max-width: 1200px) {
  .app-img {
    max-width: 120px;
    max-height: 200px;
    padding: 20px;
  }
}

@media (min-width: 1200px) {
  .photo-website {
    max-width: 800px;
    cursor: pointer;
  }
}
</style>
<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import "vue3-carousel/dist/carousel.css";
import process from "process";

export default {
  data() {
    return {
      currentTab: 1,
    };
  },
  methods: {
    selectTab(tabNumber) {
      this.currentTab = tabNumber;
    },
  },
}
</script>