<template>
  <TheDashboardPageHeader title="Change password" content="Please fill the required fields below." />

  <form @submit.prevent="toggleUpdatePasswordModal('open')">
    <!-- Grid -->
    <div class="grid">
      <!-- Markup example 1: input is inside label -->
      <label for="newpassword">
        New password:
        <input type="password" id="newpassword" name="newpassword" maxlength="20" placeholder="New" v-model="newpassword"
          required>
      </label>
      <label for="confirmnewpassword">
        Confirm password: <span id="passwordsDoesntMatchAlert" v-if="passwordsDoesntMatch">Passwords doesn't
          match</span>
        <input type="password" id="confirmnewpassword" name="confirmnewpassword" maxlength="20" placeholder="Confirm"
          v-model="confirmnewpassword" :aria-invalid="passwordsDoesntMatch" required>
      </label>
    </div>
    <small>Password must be 8-20 characters, with a mix of uppercase and lowercase letters, numbers, and symbols.</small>
    <!-- Show small success message -->
    <span style="color: #43a047;" v-if="showUpdateSuccessMessage">Update success!</span>
    <!-- Shows errors -->
    <ul id="formErrorList">
      <div v-if="displayErrors && errorMessages.length > 0">
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
      </div>
    </ul>
    <!-- Button -->
    <button type="submit" :aria-busy="isExecutingUpdate" :disabled="isExecutingUpdate || passwordsDoesntMatch">Save
      password</button>
  </form>

  <!-- The modal used for this page's form. -->
  <dialog id="UpdatePasswordModal">
    <article>
      <h3>Confirm your action</h3>
      <label for="currentpassword">
        <small>In order to proceed, please provide your current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" maxlength="20" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleUpdatePasswordModal('close'), executeUpdatePassword()"
          required autofocus>
      </label>
      <footer>
        <button role="button" @click="toggleUpdatePasswordModal('close')" class="secondary">Cancel</button>
        <button role="button" :disabled="!currentpassword"
          @click="toggleUpdatePasswordModal('close'), executeUpdatePassword()">Confirm</button>
      </footer>
    </article>
  </dialog>
</template>

<style>
#UpdatePasswordModal footer {
  margin-top: 0px;
}

#UpdatePasswordModal button {
  display: inline;
  width: fit-content;
}
</style>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
import axios from 'axios';
import { notify } from '@/services/notificator.js';
import { ref, watch } from 'vue'
import { getToken, checkToken } from '@/services/authenticator.js';
import { openModal, closeModal } from '@/helpers/modal.js';

// States used in this view.
const newpassword = ref('');
const confirmnewpassword = ref('');
const currentpassword = ref('');
const displayErrors = ref(null);
const errorMessages = ref([])
const passwordsDoesntMatch = ref(null);
const isExecutingUpdate = ref(false);
const showUpdateSuccessMessage = ref(false);

// Toggle modal for current password confirmation. 
function toggleUpdatePasswordModal(action) {
  if (action == 'open') {
    openModal(document.getElementById("UpdatePasswordModal"));
  } else {
    closeModal(document.getElementById("UpdatePasswordModal"));
  }
}

// In fact tries to update data in server.
function executeUpdatePassword() {
  // Starts the loader
  isExecutingUpdate.value = true;
  // Send information to server.
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/changepassword', {
    password: currentpassword.value,
    new_password: newpassword.value,
  }, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
    timeout: 30000
  }).then(response => {
    // Show update success messsage
    showUpdateSuccessMessage.value = true;
    // Opens notification
    notify('Your password was updated successfully', 'success');
  }).catch(err => {
    // Print errors
    if (typeof err.response.data !== 'undefined') {
      errorMessages.value = err.response.data.errors;
    }
    // Set to display error block element
    displayErrors.value = true;
    // Opens notification.
    notify('Password update failed', 'warning');
    //If the fail is a 402, will check if the password is correct.
    if (err.response.status == 401) {
      checkToken(true);
    }
  }).finally(() => {
    // Whatever happens, resets password fields.
    newpassword.value = '';
    confirmnewpassword.value = '';
    currentpassword.value = '';
    // Whatever happens, stops the loading.
    isExecutingUpdate.value = false;
  })
}

// Check if username input has changed, if yes, removes error from screen. 
watch([newpassword, confirmnewpassword], () => {
  // aiojsdijaiosd
  if ((newpassword.value !== '') || (confirmnewpassword.value !== '')) {
    // Hide error block element
    displayErrors.value = null;
    //Show success message
    showUpdateSuccessMessage.value = false;
  }
  // If confirm new password is not empty and doesnt match, show alert.
  if ((confirmnewpassword.value !== '') && (newpassword.value !== confirmnewpassword.value)) {
    passwordsDoesntMatch.value = true;
  } else {
    passwordsDoesntMatch.value = null;
  }
})

</script>