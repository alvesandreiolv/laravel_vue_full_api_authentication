<template>
  <main id="mainContainer" class="container">
    <!-- Typography-->
    <section id="typography">
      <h2>This would be a website home page.</h2>
      <p>
        The porpuse of this is to test vue routes. I can now go to login page and dashboard page.
      </p>
      <p class="grid">
        <router-link to="/login" role="button">Go to login page</router-link>
        <a href="#" @click="toggleDark()" role="button" class="contrast">Toggle dark-light mode</a>
        <a href="#" @click="showNotification" role="button" class="contrast" id="testeBotao1">Test notification</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
#mainContainer {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>

<script setup>
//Adds toggleDark.
import { isDark, toggleDark } from '../assets/toggleDark.js';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css"

// Function to show the notification
const showNotification = () => {
  // Display a notification when the button is clicked
  Toastify({
    text: "Test notification clicked!",
    duration: 3000,
    gravity: "top", // Specify the gravity
    position: "right", // Specify the position
    style: {
      background: "linear-gradient(to right, rgb(0, 176, 155), rgb(150, 201, 61))",
      //background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
    },
  }).showToast();
};
</script>