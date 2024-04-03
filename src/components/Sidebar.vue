<script setup>


//todo: garder bold sur menu quand sur la page , js currentTab?
</script>

<template>
  <div class="leftPart">
    <div class="innerSidebar">
      <div class="logo">CAMILLE LUPO</div>
      <div class="menu">
        <router-link class="item" to="/">
          <img src="../assets/home-run.966e5d31.svg" class="icon" alt="home">
          <div class="text">Home</div>
        </router-link>
        <router-link class="item" to="/about">
          <img src="../assets/avatar.b8d92d86.svg" class="icon" alt="about">
          <div class="text">About</div>
        </router-link>
        <router-link class="item" to="/portfolio">
          <img src="../assets/briefcase.66307d98.svg" class="icon" alt="portFolio">
          <div class="text">PortFolio</div>
        </router-link>
        <router-link class="item" to="/contact">
          <img src="../assets/mail.b5a8d8d5.svg" class="icon" alt="contact">
          <div class="text">Contact</div>
        </router-link>
      </div>
      <p class="copyright">© 2024 Created by Camille Lupo</p>
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

  .logo {
    display: none;
    color: #f8f8f8;
    font-weight: bold;
  }
}

.icon {
  width: 25px;
  height: 25px;
  padding: 5px;
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
</style>