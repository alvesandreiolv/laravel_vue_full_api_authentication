<!-- In this page, the user can change it's current username. -->
<template>
  <TheDashboardPageHeader title="Change username" content="Please fill the required fields below." />

  <!-- The form itself -->
  <form @submit.prevent="toggleUpdateUsernameModal('open')">
    <label for="username">
      Your current username is: <code :aria-busy="userData.userDataIsLoading">{{ userData.email }}</code>
      <input type="text" id="username" name="username" placeholder="Insert new username" v-model="username"
        :aria-invalid="displayErrors" required>
      <small>Must be between 10 and 25 characters, only letters and numbers.</small>
    </label>
    <ul id="formErrorList">
      <div v-if="displayErrors && errorMessages.length > 0">
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
      </div>
    </ul>
    <!-- Button -->
    <button type="submit">Save username</button>
  </form>

  <!-- The modal used for this page's form. -->
  <dialog id="updateUsernameModal">
    <article>
      <h3>Confirm your action</h3>
      <label for="currentpassword">
        <small>In order to proceed, please insert you current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleUpdateUsernameModal('close'), executeUpdateUsername()"
          required autofocus>
      </label>
      <footer>
        <a href="#" role="button" @click="toggleUpdateUsernameModal('close')" class="secondary">Cancel</a>
        <a href="#" role="button" @click="toggleUpdateUsernameModal('close'), executeUpdateUsername()">Confirm</a>
      </footer>
    </article>
  </dialog>
</template>

<style></style>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import axios from 'axios';
import { userData } from '@/store/userBasicData.js';
import { notify } from '@/services/notificator.js';
import { ref, watch } from 'vue'
import { getToken, checkToken } from '@/services/authenticator.js';
import { openModal, closeModal } from '@/helpers/modal.js';

const username = ref('');
const currentpassword = ref('');
const displayErrors = ref(null);
const errorMessages = ref([])

// Toggle modal for current password confirmation. 
function toggleUpdateUsernameModal(action) {
  if (action == 'open') {
    openModal(document.getElementById("updateUsernameModal"));
  } else {
    closeModal(document.getElementById("updateUsernameModal"));
  }
}

// In fact tries to update data in server.
function executeUpdateUsername() {
  // Send information to server.
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/changeusername', {
    password: currentpassword.value,
    new_username: username.value,
  }, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
    timeout: 30000
  }).then(response => {
    // Resets usernamed field.
    username.value = '';
    // Updates user basica data.
    userData.updateUserData();
    // Opens notification
    notify('Your username was updated successfully', 'success');
  }).catch(err => {
    // Print errors
    if (typeof err.response.data !== 'undefined') {
      //err.response.data.errors
      errorMessages.value = err.response.data.errors;
    }
    // Set to display error block element
    displayErrors.value = true;
    // Opens notification.
    notify('Username update failed', 'warning');
    //If the fail is a 402, will check if the password is correct.
    if (err.response.status == 401) {
      checkToken(true);
    }
    // Console for errrors
    //console.log(err);
  }).finally(() => {
    // Whatever happens, reset password ref.
    currentpassword.value = '';
  })
}

// Check if username input has changed, if yes, removes error from screen. 
watch(username, () => {
  // Hide error block element
  displayErrors.value = null;
})

</script>