<script>

</script>

<template>
  <div class="rigthPart">
    <div class="centering">
      <div class="container">
        <div class="home-content">
          <div class="avatar">
            <div class="photo"></div>
          </div>
          <div class=" details">
            <div class="name">CAMILLE LUPO</div>
            <p class="presentation">{{ $t("message.details") }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>

.avatar {
  min-width: 300px;
  min-height: 300px;
  position: relative;
  border-radius: 100%;
}

.presentation {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
}

@media (max-width: 1200px) {
  .avatar {
    min-width: 200px;
    min-height: 200px;
    position: relative;
    border-radius: 100%;
  }
}

@media (max-width: 1200px) {
  .details {
    padding-top: 20px;
    font-weight: 500;
    max-width: 450px;
    padding-bottom: 30px;
    color: #f8f8f8;
  }
}


@media (min-width: 1200px) {
  .details {
    padding-left: 100px;
    font-weight: 500;
    max-width: 600px;
    margin-bottom: 30px;
    color: #f8f8f8;
  }
}

@keyframes morph {
  0% {
    border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
    transform: scale(1);
  }
  50% {
    border-radius: 30% 60% 70% 40%/50% 60% 30% 60%;
    transform: scale(1.2);
  }
  100% {
    border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
    transform: scale(1);
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

.photo {
  background-image: url("../assets/photo_profil_500.webp");
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: cover;
  -webkit-animation: morph 7s ease-in-out 1s infinite;
  animation: morph 7s ease-in-out 1s infinite;
  background-blend-mode: multiply;
  box-shadow: inset 0 0 0 9px hsla(0, 0%, 100%, .3);
  border-radius: 60% 40% 30% 70%/60% 30% 70% 40%;
  overflow: hidden;
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
    padding-left: 300px;
    width: 100%;
    min-height: 100vh;
    float: left;
    position: relative;
    background-color: #111111;
  }
}


.home-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Add this line to center the content horizontally */
}

@media (max-width: 1200px) {
  .home-content {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
}

@media (min-width: 1200px) {
  .centering {
    width: 100%;
    left: 150px;
    animation: slideIn 1s ease-out;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
}

@media (max-width: 1200px) {
  .centering {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;;
    min-height: 100vh;
  }
}

.name {
  align-items: flex-end;
  font-size: 35px;
  font-weight: bold;
  color: #f8f8f8;
}

</style>
<script setup>
</script>