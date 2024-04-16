<template>
  <div class="rigthPart">
    <div class="tabs">
      <button @click="selectTab(1)" :class="{ 'active': currentTab === 1 }">Mobile app</button>
      <div class="line"></div>
      <button @click="selectTab(2)" :class="{ 'active': currentTab === 2 }">Website</button>
    </div>
    <div class="centering">
      <div class="tab-content">
        <div class="content-portfolio" v-show="currentTab === 2">
          <div class="website-tab">
            <div class="app">
              <h1 class="text">Les gars de la cale</h1>
              <p class="text">{{ $t("message.gars") }}</p>
              <div class="content-app">
                <a href="https://garsdelacale.fr/"
                   target="_blank">
                  <img src="../assets/garsdelacale.png" alt="" class="img-link">
                </a>
              </div>
            </div>
            <div class="app">
              <h1 class="text">TropeventWeb</h1>
              <p class="text">{{ $t("message.tropeventWeb") }}
              </p>
              <div class="tropEventWeb-content">
                <img @click="expandImage('../assets/web.jpg')" src="../assets/web.jpg" alt="" class="img-other">
                <img @click="expandImage('../assets/web_search.jpg')" src="../assets/web_search.jpg" alt="" class="img-other">
              </div>
            </div>
            <div class="app">
              <h1 class="text">TropeventManager</h1>
              <p class="text">{{ $t("message.tropeventManager") }}
              </p>
              <div class="content-app">
                <img @click="expandImage('../assets/manager_web.jpg')" src="../assets/manager_web.jpg" alt="" class="img-other">
              </div>
            </div>
          </div>
        </div>
          <div class="content-portfolio" v-show="currentTab === 1">
            <div class="website-tab">
              <div class="app">
                <h1 class="text">Quizz kanji</h1>
                <p class="text">{{ $t("message.quizz") }}</p>
                <div class="content-app">
                  <img @click="expandImage('../assets/image1.png')" src="../assets/image1.png" alt="" class="img-other">
                  <img @click="expandImage('../assets/image2.png')" src="../assets/image2.png" alt="" class="img-other">
                  <img @click="expandImage('../assets/image3.png')" src="../assets/image3.png" alt="" class="img-other">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventScan</h1>
                <p class="text">{{ $t("message.tropeventScan") }}
                </p>
                <div class="content-app">
                  <img @click="expandImage('../assets/scan.jpg')" src="../assets/scan.jpg" alt="" class="img-other">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventSport</h1>
                <p class="text">{{ $t("message.tropeventSport") }}
                </p>
                <div class="content-app">
                  <img @click="expandImage('../assets/sport.jpg')" src="../assets/sport.jpg" alt="" class="img-other">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventCash</h1>
                <p class="text">
                  {{ $t("message.tropeventCash") }}
                </p>
                <div class="content-app">
                  <img @click="expandImage('../assets/cashless.jpg')" src="../assets/cashless.jpg" alt="" class="img-other">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  <div v-if="isExpanded" class="expanded-image-overlay" @click="closeExpandedImage">
    <img :src="expandedImageSrc" alt="Expanded Image" class="expanded-image">
  </div>
</template>


<style scoped>
.content-app {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tropEventWeb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.app-img {
  max-width: 100px;
  max-height: 200px;
  padding: 10px;
}

.img-other {
  max-width: 300px;
  max-height: 200px;
  padding: 20px;
  cursor: zoom-in;
}
.img-link {
  max-width: 300px;
  max-height: 200px;
  padding: 20px;
}
.text {
  color: #f8f8f8;
  font-family: 'Roboto Mono', Monaco, courier, monospace;
}

@media (min-width: 1200px) {
  .app {
    display: flex;
    flex-direction: column; /* Set flex-direction to column */
    align-items: center;
    width: 60%;
    margin: 40px;
  }

}

@media (max-width: 1200px) {
  .app {
    display: flex;
    flex-direction: column; /* Set flex-direction to column */
  }
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
    float: left;
    position: relative;
    background-color: #111111;
  }
}

@media (min-width: 1200px) {
  .rigthPart {
    padding-left: 300px;
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
  text-align: center;
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
  justify-content: center;
  flex-wrap: wrap;
}

.expanded-image-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.expanded-image {
  max-width: 80%;
  max-height: 80%;
  cursor: zoom-out;
}
</style>
<script>

export default {
  data() {
    return {
      currentTab: 1,
      isExpanded: false,
      expandedImageSrc: ''
    };
  },
  methods: {
    selectTab(tabNumber) {
      this.currentTab = tabNumber;
    },
    expandImage(src) {
      this.isExpanded = true;
      this.expandedImageSrc = src;
    },
    closeExpandedImage() {
      this.isExpanded = false;
    }
  },
}
</script>