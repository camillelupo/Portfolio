<script setup>
</script>

<template>
  <div class="test">
    <div class="innerSidebar">
      <div>
        <router-link class="item" to="/">
          Home
        </router-link>
        <div class="item">
          About
        </div>
        <div class="item">
          PortFolio
        </div>
        <div class="item">
          Contact
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test {
  width: 400px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 10;
  padding: 0 100px;
  background-color: black;
  color: white;
}

.innerSidebar {
  width: 100%;
  height: auto;
}

.name {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}
.item{
  padding: 5px;
}

</style>