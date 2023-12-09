<template>
  <DashboardPageHeader title="My information" content="This below is information regarding your account." />
  <p style="margin-bottom: 15px;">Name: <code :aria-busy="userData.userDataIsLoading">{{ userData.name }}</code></p>
  <p>Email: <code :aria-busy="userData.userDataIsLoading">{{ userData.email }}</code></p>
</template>

<script setup>
import DashboardPageHeader from "@/components/DashboardPageHeader.vue";
import { userData, updateMissingUserData } from '@/store/userBasicData.js';

// Update user data if there isn't.
updateMissingUserData();
</script>