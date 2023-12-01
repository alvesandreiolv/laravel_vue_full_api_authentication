<template>
  <TheDashboardPageHeader title="My information" content="This below is information regarding your account." />
  <p style="margin-bottom: 15px;">Name: <code :aria-busy="isLoadingInfo">{{ name }}</code></p>
  <p>Email: <code :aria-busy="isLoadingInfo">{{ email }}</code></p>
</template>

<script setup>
import axios from 'axios';
import { getToken, checkToken } from '@/services/authenticator.js';
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const isLoadingInfo = ref(true)

name.value = '';
email.value = '';

axios.get(import.meta.env.VITE_BASE_BACKEND_URL + '/api/user', {
  headers: {
    'Authorization': 'Bearer ' + getToken(),
  }
}).then(response => {
  //If returns data, replace username and email.
  name.value = response.data.name;
  email.value = response.data.email;
}).catch(error => {
  //If not, deals with the error and replace username and email.
  name.value = 'Error';
  email.value = 'Error';
  //If fails to retrieve data, checks authentication.
  checkToken(true);
}).finally(() => {
  isLoadingInfo.value = false;
});
</script>