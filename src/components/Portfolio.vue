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
              <p class="text">A website using wordpress on my first internship on programming. </p>
              <div class="content-app">
                <a href="https://garsdelacale.fr/"
                   target="_blank">
                  <img src="../assets/garsdelacale.png" alt="" class="img-other">
                </a>
              </div>
            </div>
            <div class="app">
              <h1 class="text">TropeventWeb</h1>
              <p class="text">Au sein de trop plus, j'ai participé au maintien et développement de cette application
                web développée à l'aide de Java Spring, Thymeleaf et MongoDB.
              </p>
              <div class="tropEventWeb-content">
                <img src="../assets/web.jpg" alt="" class="img-other">
                <img src="../assets/web_search.jpg" alt="" class="img-other">
              </div>
            </div>
            <div class="app">
              <h1 class="text">TropeventManager</h1>
              <p class="text">Dans la même entreprise , j'ai participé au maintien et développement de cette
                application web à l'aide de vueJs et bulma.
              </p>
              <div class="content-app">
                <img src="../assets/manager_web.jpg" alt="" class="img-other">
              </div>
            </div>
          </div>
        </div>
          <div class="content-portfolio" v-show="currentTab === 1">
            <div class="website-tab">
              <div class="app">
                <h1 class="text">Quizz kanji</h1>
                <p class="text">A mobile application project for learning japanese kanji.Developped in reactNative for
                  the
                  mobile part and python for the api</p>
                <div class="content-app">
                  <img src="../assets/image1.png" alt="" class="app-img">
                  <img src="../assets/image2.png" alt="" class="app-img">
                  <img src="../assets/image3.png" alt="" class="app-img">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventScan</h1>
                <p class="text">Au sein de l'entreprise TropPlus , j'ai participé au dévellopement de 3 applications
                  mobile.
                  Elles toutes été développeé en reactNative.
                  TropEventScan est une application permettant de scanner les billets à l'entrée de l'évènement.
                </p>
                <div class="content-app">
                  <img src="../assets/scan.jpg" alt="" class="img-other">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventSport</h1>
                <p class="text">TropEventSport est une application permettant qui permet de perfectionner un évènement
                  avec de nombreuses fonctionnalités : chronométrage, live-timing, résultats
                </p>
                <div class="content-app">
                  <img src="../assets/sport.jpg" alt="" class="img-other">
                </div>
              </div>
              <div class="app">
                <h1 class="text">TropeventCash</h1>
                <p class="text">TropEventCash est une application permettant de gérer et catégoriser les paiements
                  durant
                  un évènement.
                </p>
                <div class="content-app">
                  <img src="../assets/cashless.jpg" alt="" class="img-other">
                </div>
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
    margin: 15px;
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

@media (max-width: 1200px) {
  .photo-website {
    max-width: 300px;
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