<template>
  <main id="mainContainer" class="container">
    <!-- Typography-->
    <section id="typography">
      <h2>This would be a website home page.</h2>
      <p>
        The porpuse of this is to test vue routes. I can now go to login page and dashboard page.
      </p>
      <p class="grid">
        <a href="/login" role="button">Go to login page</a>
        <a href="#" @click="toggleDark()" role="button" class="contrast">Toggle dark-light mode</a>
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
</script>