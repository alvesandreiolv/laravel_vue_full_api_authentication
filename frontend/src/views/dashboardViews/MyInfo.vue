<template>
  <DashPageHeader title="My information" content="This below is information regarding your account." />

  Username: {{ username }}
  <br>
  Email: {{ email }}
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
import { ref } from 'vue'
import axios from 'axios';
import Cookies from 'js-cookie';

const username = ref('')
const email = ref('')

username.value = '...';
email.value = '...';

axios.get('https://evbkzynoncxd.neptune.trulywired.link/api/user', {
  withCredentials: true, // Include cookies in the request
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.error('Request failed:', error);
});
</script>