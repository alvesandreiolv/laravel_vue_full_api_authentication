<template>
  <DashPageHeader title="Settings" content="What would you like to change?" />

  <div class="grid">
    <!-- Change my username button -->
    <router-link :to="{ name: 'Change Username' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline"><i class="fa-regular fa-pen-to-square"></i> Change my username</button>
    </router-link>
    <!-- Change my password button -->
    <router-link :to="{ name: 'Change Password' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline"><i class="fa-regular fa-pen-to-square"></i> Change my password</button>
    </router-link>
    <!-- Delete my account button -->
    <button @click="notifyDelete" class="menuButton outline"
      style="color: #d81b60 !important; border-color: #d81b60 !important;"><i class="fa-regular fa-trash-can"></i> Delete
      my account</button>
  </div>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
import { notify } from '@/services/notificator.js';

// Define a method to call notify with specific arguments
function notifyDelete() {
  notify('Nothing happened: It\'s not ready yet.', 'danger');
}
</script>

<style></style>