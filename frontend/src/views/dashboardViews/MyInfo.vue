<template>
  <DashPageHeader title="My information" content="This below is information regarding your account." />

  Username: {{ username }}
  <br>
  Email: {{ email }}
</template>

<script setup>
import axios from 'axios';
import { getAuthToken } from '@/services/authenticator.js';

import DashPageHeader from "@/components/DashPageHeader.vue";
import { ref } from 'vue'

const username = ref('')
const email = ref('')

username.value = '...';
email.value = '...';

axios.post('https://evbkzynoncxd.neptune.trulywired.link/api/user', {}, {
  headers: {
    'Authorization': 'Bearer ' + getAuthToken(),
  }
}).then(response => {
  username.value = response.data.name;
  email.value = response.data.email;
}).catch(error => {
  username.value = 'Error';
  email.value = 'Error';
});
</script>