<template>
  <!-- Dashboard's navbar -->
  <nav class="container">
    <ul>
      <li><strong></strong></li>
    </ul>
    <ul>
      <!-- Toggle Dark/Light Switch-->
      <ToggleDarkSwitch :absolutePosition="false" style="margin-right: 10px;" />
      <li>
        <router-link to="/">Main</router-link>
      </li>
      <li>
        <a @click="executeLogout($event)" href="#" @click.prevent>Logout</a>
      </li>
    </ul>
  </nav>

  <!-- Below adds session expired modal that will be available for all dashboard pages. -->
  <SessionExpiredModal />

  <!-- Below is the main body for the rest of the dashboard platform -->
  <main class="container" id="docs">
    <router-view />
  </main>
</template>

<style scoped></style>

<script setup>
//Adds toggleDark.
import { isDark, toggleDark } from '@/helpers/toggleDark.js';
import { logout } from '@/services/authenticator.js';
import SessionExpiredModal from "@/components/SessionExpiredModal.vue";
import ToggleDarkSwitch from "@/components/ToggleDarkSwitch.vue";

// Groups all actions into the function below.
function executeLogout(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
  logout();
}
</script>