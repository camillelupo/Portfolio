<template>
  <div class="rigthPart">
    <div class="container">
      <div class="centering">
        <div class="about-content">
          <div class="tab-content">
            <div class="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </div>
            <div class="informations">
              <ul>
                <li><span>Birthday</span> : 17/04/1988</li>
                <li><span>Age</span> : 35</li>
                <li><span>Address</span> : Rouen</li>
                <li><span>Email</span> : camille.lupo@hotmail.fr</li>
                <li><span>Phone</span> : +33682884761</li>
                <li><span>Study</span> : Need for School</li>
                <li><span>Freelance</span> : Available</li>
              </ul>
            </div>
          </div>
          <div class="skillsBox">
            <div class="skills">
              <img class="icon" src="../assets/Java_Logo.svg.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/javascript.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/Official PHP Logo.svg" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/reacNative.svg" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/wordpress.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/Vue.js_Logo_2.svg" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/Java_Logo.svg.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/javascript.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/Official PHP Logo.svg" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/reacNative.svg" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/wordpress.png" alt="" style="max-height: 80px">
              <img class="icon" src="../assets/Vue.js_Logo_2.svg" alt="" style="max-height: 80px">
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

.description {
  max-width: 750px;
  padding-bottom: 20px;
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

.about-content {
  color: #f8f8f8;
}

.centering {
  left: 150px;
  padding-bottom: 400px;
  padding-top: 250px;
  animation: slideIn 1s ease-out;
}

@media (max-width: 1200px) {
  .centering {
    width: 100%;
    align-items: center;
    animation: slideIn 1s ease-out;
    max-height: 400px;
  }
}

@media (max-width: 1200px) {
  .tab-content {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
}

@media (min-width: 1200px) {
  .tab-content {
    display: flex;
    align-items: center;
    flex-direction: row;
  }
}

.skillsBox {
  margin-top: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 100%;
  max-width: 750px;
}

.skills {
  animation: 12s linear 0s infinite normal none running slide
}

.skills {
  display: flex;
  height: 100%;
  margin: 0 auto;
  position: relative;
  -moz-box-align: center;
  align-items: center;
}

.icon {
  margin-right: 50px;
  transition: transform 1s, opacity 1s;
}

@keyframes slide {
  100% {
    transform: translateX(-50%);
  }
}
</style>
<script setup>
</script>