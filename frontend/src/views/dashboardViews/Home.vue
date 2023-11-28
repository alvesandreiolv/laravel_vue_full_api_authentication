<template>
  <DashPageHeader title="Dashboard home" content="Hi, xxxxxxx. How can we help you today?" />

  <div class="grid">
    <div>
      <router-link to="/myinfo" style="text-decoration: none; color: inherit;">
        <button class="menuButton secondary outline">
          <i class="fa-regular fa-user"></i> See my information
        </button>
      </router-link>
    </div>
    <div>
      <button class="menuButton secondary outline" @click="notifyEmail">
        <i class="fa-regular fa-envelope"></i> Send test email
      </button>
    </div>
    <div>
      <router-link to="/settings" style="text-decoration: none; color: inherit;">
        <button class="menuButton secondary outline">
          <i class="fa-regular fa-pen-to-square"></i> Change settings
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
import { notify } from '@/utils/notification.js';

// Define a method to call notify with specific arguments
function notifyEmail() {
  notify('Not sent: It\'s not ready yet.', 'danger');
}
</script>

<style></style>