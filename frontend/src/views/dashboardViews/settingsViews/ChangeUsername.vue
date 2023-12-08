<!-- In this page, the user can change it's current username. -->
<template>
  <TheDashboardPageHeader title="Change username" content="Please fill the required fields below." />

  <!-- The form itself -->
  <form @submit.prevent="toggleUpdateUsernameModal('open')">
    <label for="username">
      Your current username is: <code :aria-busy="userData.userDataIsLoading">{{ userData.email }}</code>
      <input type="text" id="username" name="username" maxlength="25" placeholder="Insert new username" v-model="username"
        :aria-invalid="displayErrors" required>
      <small>Must be between 10 and 25 characters, only letters and numbers.</small>
      <!-- Show small success message -->
      <span style="color: #43a047;" v-if="showUpdateSuccessMessage">Update success!</span>
    </label>
    <!-- Shows errors -->
    <ul id="formErrorList">
      <div v-if="displayErrors && errorMessages.length > 0">
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
      </div>
    </ul>
    <!-- Button -->
    <button type="submit" :aria-busy="isExecutingUpdate" :disabled="isExecutingUpdate">Save username</button>
  </form>

  <!-- The modal used for this page's form. -->
  <dialog id="updateUsernameModal">
    <article>
      <h3>Confirm your action</h3>
      <label for="currentpassword">
        <small>In order to proceed, please provide your current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleUpdateUsernameModal('close'), executeUpdateUsername()"
          required autofocus>
      </label>
      <footer>
        <button @click="toggleUpdateUsernameModal('close')" role="button" class="secondary">Cancel</button>
        <button :disabled="!currentpassword" @click="toggleUpdateUsernameModal('close'), executeUpdateUsername()"
          role="button">Confirm</button>
      </footer>
    </article>
  </dialog>
</template>

<style>
#updateUsernameModal footer {
  margin-top: 0px;
}

#updateUsernameModal button {
  display: inline;
  width: fit-content;
}
</style>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import axios from 'axios';
import { userData, forceUpdateUserData, updateMissingUserData } from '@/store/userBasicData.js';
import { notify } from '@/services/notificator.js';
import { ref, watch } from 'vue'
import { getToken, checkToken } from '@/services/authenticator.js';
import { openModal, closeModal } from '@/helpers/modal.js';

// Update user data if it's missing
updateMissingUserData();

const username = ref('');
const currentpassword = ref('');
const displayErrors = ref(null);
const errorMessages = ref([])
const isExecutingUpdate = ref(false);
const showUpdateSuccessMessage = ref(false);

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
  // Starts the loader
  isExecutingUpdate.value = true;
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
    forceUpdateUserData();
    // Opens notification
    notify('Your username was updated successfully', 'success');
    // Show update success messsage
    showUpdateSuccessMessage.value = true;
  }).catch(err => {
    // Print errors
    if (typeof err.response.data !== 'undefined') {
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
  }).finally(() => {
    // Whatever happens, reset password ref.
    currentpassword.value = '';
    // Whatever happens, stops the loading.
    isExecutingUpdate.value = false;
  })
}

// Check if username input has changed, if yes, removes error from screen. 
watch(username, () => {
  // Hide error block element
  displayErrors.value = null;
  // If username field is changed and is not empty 
  if (username.value !== '') {
    //Show success message
    showUpdateSuccessMessage.value = false;
  }
})

</script>