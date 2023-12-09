<template>
  <main id="mainContainer" class="container">
    <!-- Typography-->
    <section id="typography">
      <h2>This would be a public website page.</h2>
      <p>
        The porpuse of this is to test vue routes. I can now go to login page and dashboard page.
      </p>
      <p class="grid">
        <a href="/login" role="button">Go to login</a>
        <a href="/home" role="button">Go to dashboard</a>
        <a href="#" role="button" @click="toggleDark()" class="secondary">Toggle dark-light</a>
        <a href="/signup" role="button" class="contrast">Sign Up</a>
      </p>
    </section>
  </main>
</template>

<style scoped>
#mainContainer {
  padding-top: 100px;
  padding-bottom: 100px;
}

#mainContainer a {
  margin-bottom: var(--spacing);
  align-self: center;
}
</style>

<script setup>
//Adds toggleDark.
import { toggleDark } from '../helpers/toggleDark.js';
</script>