<template>
  <main id="mainContainer" class="container">
    <!-- Typography-->
    <section id="typography">
      <h2>This would be a public website page.</h2>
      <p>
        The porpuse of this is to test vue routes. I can now go to login page and dashboard page.
      </p>
      <p class="grid">
        <a href="/login" role="button">Go to login page</a>
        <a href="/home" role="button">Go to dashboard page</a>
        <a href="#" @click="toggleDark()" role="button" class="secondary">Toggle dark-light mode</a>
        <a href="#" @click="notify('This is a test notification.')" role="button" class="secondary" id="testeBotao1">Test
          notification</a>
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
</style>

<script setup>
//Adds toggleDark.
import { toggleDark } from '../helpers/toggleDark.js';
//Adds notification.
import { notify } from '@/services/notificator.js';
</script>