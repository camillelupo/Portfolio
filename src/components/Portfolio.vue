<template>
  <div class="rigthPart">
    <div class="container">
      <div class="centering">

        <div class="about-content">

          <div class="tab-content">
            <div class="tabs">
              <button @click="selectTab(1)" :class="{ 'active': currentTab === 1 }">Mobile app</button>
              <button @click="selectTab(2)" :class="{ 'active': currentTab === 2 }">Website</button>
            </div>
            <div class="content-portfolio">
              <div v-show="currentTab === 2">
                <div class="website-tab">
                  <p>A website using wordpress on my first internship on programming. </p>
                  <img src="../assets/garsdelacale.png" alt="" class="photo-website">
                </div>
              </div>
            </div>
            <div class="content-portfolio" v-show="currentTab === 1">
              <div class="website-tab">
                <p>A mobile application project for learning japanese kanji.</p>
                <carousel>
                  <Slide v-for="(item, index) in items" :key="index" >
                    <!-- Your carousel item content here -->
                    <img class="item" :src="item.image" alt="Carousel Item"/>
                    <p>{{ item.caption }}</p>
                  </Slide>

                </carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

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

.item {
  max-height: 250px;
  background-color: white;
  color :white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.about-content {
  width: 100%;
  height: auto;
  clear: both;
  float: left;
  color: #f8f8f8;
}

.centering {
  width: 100%;
  left: 150px;
  animation: slideIn 1s ease-out;
  padding-top: 300px;
}
@media (max-width: 1200px) {
  .centering {
    width: 100%;
    align-items: center;
    animation: slideIn 1s ease-out;
    max-height: 400px;
  }
}
.tab-content {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

button {
  padding: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #111111;
  color: #f8f8f8;
}

button.active {
  background-color: #494444;
}

.website-tab {
  display: flex;
  align-items: center;
  flex-direction: column;
}

@media (max-width: 1200px) {
  .photo-website {
    max-width: 400px;
  }
}

@media (min-width: 1200px){
  .photo-website {
    max-width: 800px;
  }
}
</style>
<script>
import 'vue3-carousel/dist/carousel.css'
import {Carousel, Slide, Pagination, Navigation} from 'vue3-carousel'
import "vue3-carousel/dist/carousel.css";
export default {
  name: 'App',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  data() {
    return {
      currentTab: 1,
      items: [
        {
          image: 'src/assets/image3.png',
        },
        {
          image: 'src/assets/image1.png',
        },
        {
          image: 'src/assets/image2.png',
        },
        // Add more items as needed
      ],
    };
  },
  methods: {
    selectTab(tabNumber) {
      this.currentTab = tabNumber;
    },
  },
}
</script>