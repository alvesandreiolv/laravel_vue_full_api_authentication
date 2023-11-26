<template>
  <DashPageHeader title="Settings" content="What settings would you like to change?" />

  <div class="grid">
    <router-link to="/settings/changeusername" style="text-decoration: none; color: inherit;">
      <button class="secondary">Change my username</button>
    </router-link>
    <router-link :to="{ name: 'Change Password' }" style="text-decoration: none; color: inherit;">
      <button class="secondary">Change my password</button>
    </router-link>
  </div>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
</script>

<style></style>