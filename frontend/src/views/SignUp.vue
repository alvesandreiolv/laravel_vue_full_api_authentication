<template>
  <!-- Toggle Dark/Light Switch-->
  <ToggleDarkSwitch :absolutePosition="true" />

  <!-- Main -->
  <main id="mainContainer" class="container">
    <GoBackToMainButton style="margin-bottom: 10px;" />

    <!-- Header title and text -->
    <hgroup>
      <h1>Sign up</h1>
      <h2>Complete the form below in order to create a new account.</h2>
    </hgroup>

    <!-- The sign up form. -->
    <form @submit.prevent="executeCreateAccount()" v-if="!showSuccessMessage">
      <!-- Grid -->
      <div class="grid">
        <!-- Markup example 1: input is inside label -->
        <label for="name">
          Display name
          <input v-model="name" type="text" id="name" name="name" placeholder="John Doe" required>
        </label>
        <!-- Markup example 2: input is after label -->
        <label for="email">Email address
          <input v-model="email" type="email" id="email" name="email" placeholder="example@example.com" required>
          <small>We'll never share your email with anyone else.</small>
        </label>
      </div>
      <!-- Grid -->
      <div class="grid">
        <!-- Markup example 1: input is inside label -->
        <label for="password">
          Password
          <input v-model="password" type="password" id="password" name="password" placeholder="Password" required>
          <small>Password must be 8-20 characters, with a mix of uppercase and lowercase letters, numbers, and
            symbols.</small>
        </label>

        <label for="confirmpassword">
          Confirm password <span id="passwordsDoesntMatchAlert" v-if="passwordsDoesntMatch">Passwords doesn't
            match</span>
          <input v-model="confirmpassword" type="password" id="confirmpassword" name="confirmpassword"
            placeholder="Confirm password" :aria-invalid="passwordsDoesntMatch" required>
        </label>
      </div>
      <!-- Shows errors -->
      <ul id="formErrorList">
        <div v-if="displayErrors && errorMessages.length > 0">
          <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
        </div>
      </ul>
      <!-- Button -->
      <button type="submit" :disabled="isExecuting || passwordsDoesntMatch" :aria-busy="isExecuting">Create
        account</button>
    </form>

    <!-- Success message -->
    <span v-if="showSuccessMessage">
      <p id="successTextTitle">Your new account was created successfully!</p>
      <p>You will be automatically redirected to the login page in 10 seconds, there you can securely log in.</p>
      <progress id="myProgressBar" style="height: 2px;"></progress>
      <router-link to="/login" role="button" style="margin-top: 15px;">Go to login page</router-link>
    </span>

  </main>
</template>

<style scoped>
#mainContainer {
  padding-top: calc(var(--block-spacing-vertical) + 3.5rem);
}

#successTextTitle {
  color: #43a047;
}
</style>

<script setup>
import ToggleDarkSwitch from "@/components/ToggleDarkSwitch.vue";
import GoBackToMainButton from "@/components/GoBackToMainButton.vue";
import axios from 'axios';
import { notify } from '@/services/notificator.js';
import { ref, watch } from 'vue'
import { getToken } from '@/services/authenticator.js';
import router from '@/router/index.js';

const name = ref('');
const email = ref('');
const password = ref('');
const confirmpassword = ref('');

const displayErrors = ref(null);
const errorMessages = ref([]);
const passwordsDoesntMatch = ref(null);
const showSuccessMessage = ref(false);
const isExecuting = ref(false);

function executeCreateAccount() {
  // Starts the loader
  isExecuting.value = true;
  // Send information to server.
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/register', {
    name: name.value,
    email: email.value,
    password: password.value,
  }, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
    timeout: 30000
  }).then(response => {
    // Opens notification
    notify('Sign up successful', 'success');
    // Show success messsage
    showSuccessMessage.value = true;
    //Sends user to login after x seconds.
    setTimeout(function () {
      router.push('/login');
    }, 10000);
  }).catch(err => {
    // Print errors
    if (typeof err.response.data !== 'undefined') {
      errorMessages.value = err.response.data.errors;
    }
    // Set to display error block element
    displayErrors.value = true;
    // Opens notification.
    notify('Sign up attempt failed', 'warning');
  }).finally(() => {
    // Whatever happens, reset password ref.
    password.value = '';
    confirmpassword.value = '';
    // Whatever happens, stops the loading.
    isExecuting.value = false;
  })
}

// Check if password input has changed, if yes, removes errors from screen. 
watch([password, confirmpassword], () => {
  // aiojsdijaiosd
  if ((password.value !== '') || (confirmpassword.value !== '')) {
    // Hide error block element
    displayErrors.value = null;
    //Show success message
  }
  // If confirm new password is not empty and doesnt match, show alert.
  if ((confirmpassword.value !== '') && (password.value !== confirmpassword.value)) {
    passwordsDoesntMatch.value = true;
  } else {
    passwordsDoesntMatch.value = null;
  }
})

</script>