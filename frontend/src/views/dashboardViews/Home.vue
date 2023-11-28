<template>
  <DashPageHeader title="Dashboard home" content="Hi, xxxxxxx. How can we help you today?" />

  <div class="grid">
    <!-- See my info button -->
    <router-link to="/myinfo" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline">
        <i class="fa-regular fa-user"></i> See my information
      </button>
    </router-link>
    <!-- Send email button -->
    <button class="menuButton secondary outline" @click="notifyEmail">
      <i class="fa-regular fa-envelope"></i> Send test email
    </button>
    <!-- Change settings button -->
    <router-link to="/settings" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline">
        <i class="fa-regular fa-pen-to-square"></i> Change settings
      </button>
    </router-link>
    <!-- Test button -->
    <button class="menuButton secondary outline" @click="test123">
      <i class="fa-regular fa-star"></i> Test stuff here
    </button>
  </div>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
import { notify } from '@/services/notificator.js';

function test123() {
  //authenticationStore().returnToken()
  //console.log(authenticationStore().returnToken());
  notify('Nothing happened.', 'danger');
}

// Define a method to call notify with specific arguments
function notifyEmail() {
  notify('Not sent: It\'s not ready yet.', 'danger');
}
</script>

<style></style>