<template>
  <nav class="container">
    <ul>
      <li><strong></strong></li>
    </ul>
    <ul>
      <li @click="toggleDark()" style="cursor: pointer;">
        {{ isDark ? '🌞' : '🌚' }}
      </li>
      <li><a href="#">Settings</a></li>
      <li><a @click="executeLogout()" href="#" @click.prevent>Logout</a></li>
    </ul>
  </nav>

  <main class="container" id="docs">
    <nav aria-label="breadcrumb">
      <ul>
        <li><a href="#">Start</a></li>
        <li>Page</li>
      </ul>
    </nav>

    <hr>
    <header>
      <hgroup>
        <h1>Pico</h1>
        <h2>A starter example with all elements and components used in Pico design system.</h2>
      </hgroup>
    </header>

    <a href="#">Page example 1</a>
    <br>
    <a href="#">Page example 2</a>
    <br>
    <a href="#">Page example 3</a>

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
import { authenticationStore } from '../stores/authentication.js';
import { notify } from '../utils/notification.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Get the router instance
const router = useRouter();

// Groups all actions into the function below.
function executeLogout() {
  // Runs logout in the server. Aks for token invalidation.
  axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/logout`, {
    //token: login.value
  }).catch(err => {
    // If logout fails
    notify('Warning: Session was already expired.', 'warning', 5000);
  })
  // Runs logout locally, sends request to remove token and cookie.
  authenticationStore().logout('please_put_token_here');
  // Navigate to the login page.
  router.push('/login');
  //Shows notification
  notify('You\'ve been logged out.');
}
</script>