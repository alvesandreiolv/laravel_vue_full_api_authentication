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
        <a href="#" @click="notifyTest" role="button" class="contrast" id="testeBotao1">Test notification</a>
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
import { isDark, toggleDark } from '../utils/toggleDark.js';
//Adds notification.
import { notify } from '../utils/notification.js';

// Define a method to call notify with specific arguments
const notifyTest = () => {
  notify({
    text: 'This is a test notification',
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: { background: "linear-gradient(to right, #1e88e5, #1e88e5)" }
  });
};

</script>