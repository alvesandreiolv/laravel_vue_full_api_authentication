<template>
  <TheDashboardPageHeader title="Dashboard home" content="Hi, xxxxxxx. How can we help you today?" />

  <div class="grid">
    <!-- See my info button -->
    <router-link to="/myinfo" style="text-decoration: none; color: inherit;">
      <button class="menuButton mbLink secondary outline" @click="buttonLoading($event)">
        <i class="fa-regular fa-user"></i> See my information
      </button>
    </router-link>
    <!-- Send email button -->
    <button class="menuButton secondary outline" @click="notifyEmail()">
      <i class="fa-regular fa-envelope"></i> Send test email
    </button>
    <!-- Change settings button -->
    <router-link to="/settings" style="text-decoration: none; color: inherit;">
      <button class="menuButton mbLink secondary outline" @click="buttonLoading($event)">
        <i class="fa-regular fa-pen-to-square"></i> Change settings
      </button>
    </router-link>
  </div>
</template>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import { notify } from '@/services/notificator.js';

//To add loading animation when clicking in the buttons.
function buttonLoading(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
}

// Define a method to call notify with specific arguments
function notifyEmail() {
  notify('Not sent: It\'s not ready yet.', 'danger');
}
</script>

<style></style>