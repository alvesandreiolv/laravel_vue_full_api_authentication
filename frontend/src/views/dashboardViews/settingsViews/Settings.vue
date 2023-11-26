<template>
  <DashPageHeader title="Settings" content="What would you like to change?" />

  <div class="grid">
    <router-link :to="{ name: 'Change Username' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline"><i class="fa-regular fa-user"></i> Change my username</button>
    </router-link>
    <router-link :to="{ name: 'Change Password' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline"><i class="fa-regular fa-eye"></i> Change my password</button>
    </router-link>
  </div>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
</script>

<style></style>