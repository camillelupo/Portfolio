<template>
  <div class="rigthPart">
    <div class="centering">
      <div class="about-content">
        <div class="tab-content">
          <div class="description">
            <p>Hello, I'm Camille Lupo, a passionate web developer dedicated to creating engaging and dynamic online
              experiences.
              With a deep understanding of both web and mobile technologies, I strive to create innovative solutions
              that captivate users and deliver value.</p>
            <p>I code with HTML, CSS, JavaScript, Java, Python and dive into VueJS, Symfony, Spring, Flask. On the
              mobile side, I'm into React Native.
              I love keeping up with tech trends and trying out new tools to build innovative solutions.</p>
            <p>Fascinated by Japan since young and after travelling there for about 3 month, I'm learning the language
              and culture to bring my skills to the vibrant Japanese work environment.
              I believe in clear communication and collaborative efforts to deliver awesome projects, be it on the web
              or mobile.</p>
            <p>On the lookout for exciting opportunities to contribute my skills to forward-thinking teams. Let's
              connect and make things happen!</p>
          </div>
          <div class="informations">
            <ul>
              <li><span>Birthday</span> : 17/04/1988</li>
              <li><span>Age</span> : 35</li>
              <li><span>Address</span> : Rouen</li>
              <li><span>Email</span> : camille.lupo@hotmail.fr</li>
              <li><span>Study</span>:<a href="https://www.needfor-school.com/" class="link" target="_blank"> Need for
                School</a></li>
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

.informations {
  font-family: 'Roboto Mono', Monaco, courier, monospace;
}

@media (min-width: 1200px) {
  .description {
    text-align: justify;
    max-width: 750px;
    padding: 20px;
    font-family: 'Roboto Mono', Monaco, courier, monospace;
  }
}

@media (max-width: 1200px) {
  .description {
    text-align: justify;
    max-width: 500px;
    padding: 20px;
    font-family: 'Roboto Mono', Monaco, courier, monospace;
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

.about-content {
  color: #f8f8f8;
  background-color: #111111;
}


@media (min-width: 1200px) {
  .centering {
    left: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    animation: slideIn 1s ease-out;
  }
}

@media (max-width: 1200px) {
  .centering {
    padding-top: 100px;
    width: 100%;
    align-items: center;
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

@media (max-width: 1200px) {
  .skillsBox {
    display: none;
  }
}

.skills {
  animation: 12s linear 1s infinite normal none running slide
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

.link {
  color: #f8f8f8;
  text-decoration: none;
}

@keyframes slide {
  100% {
    transform: translateX(-50%);
  }
}
</style>
<script setup>
</script>