<template>
  <TheDashboardPageHeader title="Settings" content="What would you like to change?" />

  <div class="grid">
    <!-- Change my username button -->
    <router-link :to="{ name: 'Change Name' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline" @click="buttonLoading($event)"><i
          class="fa-regular fa-pen-to-square"></i> Change my display name</button>
    </router-link>
    <!-- Change my password button -->
    <router-link :to="{ name: 'Change Password' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline" @click="buttonLoading($event)"><i
          class="fa-regular fa-pen-to-square"></i> Change my password</button>
    </router-link>
    <!-- Delete my account button -->
    <button @click="notifyDelete" class="menuButton outline"
      style="color: #d81b60 !important; border-color: #d81b60 !important;"><i class="fa-regular fa-trash-can"></i> Delete
      my account</button>
  </div>
</template>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import { notify } from '@/services/notificator.js';

// Define a method to call notify with specific arguments
function notifyDelete() {
  notify('Nothing happened: It\'s not ready yet.', 'danger');
}

//To add loading animation when clicking in the buttons.
function buttonLoading(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
}
</script>

<style></style>