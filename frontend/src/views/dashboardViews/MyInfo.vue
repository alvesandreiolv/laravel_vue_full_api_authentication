<template>
  <TheDashboardPageHeader title="My information" content="This below is information regarding your account." />
  Name: {{ name }}
  <br>
  Email: {{ email }}
</template>

<script setup>
import axios from 'axios';
import { getToken, checkToken } from '@/services/authenticator.js';
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import { ref } from 'vue'

const name = ref('')
const email = ref('')

name.value = '...';
email.value = '...';

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
  //If is authorization error, checks.
  checkToken();
});

</script>