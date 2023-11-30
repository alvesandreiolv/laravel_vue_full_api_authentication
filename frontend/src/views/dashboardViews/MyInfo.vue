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

axios.post('https://evbkzynoncxd.neptune.trulywired.link/api/user', {
  //asdasd
}).then(response => {
  console.log(response.data);
}).catch(error => {
  console.log('Request failed:', error);
});
</script>