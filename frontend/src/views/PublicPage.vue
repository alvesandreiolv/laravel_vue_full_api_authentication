<template>
  <main id="mainContainer" class="container">
    <!-- Typography-->
    <section id="typography">
      <h2>This would be a public website page.</h2>
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
import { toggleDark } from '../helpers/toggleDark.js';
//Adds notification.
import { notify } from '@/services/notificator.js';

// Define a method to call notify with specific arguments
function notifyTest() {
  notify('This is a test notification.');
}
</script>