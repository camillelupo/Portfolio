<template>
  <div class="rigthPart">
    <div class="container">
      <div class="centering">
        <div class="about-content">
          <h1>Want to contact me !</h1>
            <button class="custom-button" @click="handleSendEmail">Send me an Email</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSendEmail() {
      window.location.href = `mailto:camille.lupo@hotmail.com?`;
    },
  },
};
</script>

<style scoped>
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
  width: 100%;
  height: auto;
  clear: both;
  float: left;
  padding: 100px 0 100px 0;
  color: #f8f8f8;
}

.centering {
  left: 150px;
  padding-bottom: 400px;
  padding-top: 250px;
  animation: slideIn 1s ease-out;
}
.custom-button {
  background-color: #505d67; /* Green background color */
  color: white; /* White text color */
  padding: 10px 20px; /* Padding for better appearance */
  font-size: 16px; /* Font size */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
}

.custom-button:hover {
  background-color: #216793; /* Darker green on hover */
}
@keyframes slideIn {
  0% {
    margin-left:  100px;
    opacity: 0.2;
  }
  100% {
    margin-left: 0px;
    opacity: 1;
  }

}
</style>
