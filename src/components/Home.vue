<template>
  <div class="home">
    <div class="container">
      <div class="centering">
        <div class="home-content">
          <div></div>
          <div class="name">CAMILLE LUPO</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  float: left;
  position: relative;
  background-color: #f8f8f8;
  padding-left: 450px;
}

.home-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line to center the content horizontally */
}

.centering {
  left: 150px;
  padding-bottom: 400px;
  padding-top: 250px;
}

.name {
  align-items: flex-end;
  padding-left: 25px;
  font-size: 30px;
  font-weight: bold;
}
</style>
