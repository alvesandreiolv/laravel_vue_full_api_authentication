<template>
  <TheDashboardPageHeader title="Change password" content="Please fill the required fields below." />

  <form @submit.prevent="toggleUpdatePasswordModal('open')">
    <!-- Grid -->
    <div class="grid">
      <!-- Markup example 1: input is inside label -->
      <label for="newpassword">
        New password:
        <input type="password" id="newpassword" name="newpassword" placeholder="New" v-model="newpassword" required>
      </label>
      <label for="confirmnewpassword">
        Confirm password: <span id="passwordsDoesntMatchAlert" v-if="passwordsDoesntMatch">Passwords doesn't
          match</span>
        <input type="password" id="confirmnewpassword" name="confirmnewpassword" placeholder="Confirm"
          v-model="confirmnewpassword" :aria-invalid="passwordsDoesntMatch" required>
      </label>
    </div>
    <small>Password must be 8-20 characters, with a mix of uppercase and lowercase letters, numbers, and symbols.</small>
    <!-- Small text passwords doesnt match -->
    <!-- Button -->
    <button type="submit" :disabled="passwordsDoesntMatch">Save password</button>
  </form>

  <!-- The modal used for this page's form. -->
  <dialog id="UpdatePasswordModal">
    <article>
      <h3>Confirm your action</h3>
      <label for="currentpassword">
        <small>In order to proceed, please insert you current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleUpdatePasswordModal('close'), executeUpdatePassword()"
          required autofocus>
      </label>
      <footer>
        <a href="#" role="button" @click="toggleUpdatePasswordModal('close')" class="secondary">Cancel</a>
        <a href="#" role="button" @click="toggleUpdatePasswordModal('close'), executeUpdatePassword()">Confirm</a>
      </footer>
    </article>
  </dialog>
</template>

<style>
#passwordsDoesntMatchAlert {
  color: red;
  font-size: 16px;
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
    // Resets password fields.
    newpassword.value = '';
    confirmnewpassword.value = '';
    // Opens notification
    notify('Your password was updated successfully', 'success');
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
    // Whatever happens, reset currentpassword and confirmnewpassword ref.
    currentpassword.value = '';
    confirmnewpassword.value = '';
  })
}

// Check if username input has changed, if yes, removes error from screen. 
watch([newpassword, confirmnewpassword], () => {
  // Hide error block element
  displayErrors.value = null;
  // If confirm new password is not empty and doesnt match, show alert.
  if ((confirmnewpassword.value !== '') && (newpassword.value !== confirmnewpassword.value)) {
    passwordsDoesntMatch.value = true;
  } else {
    passwordsDoesntMatch.value = null;
  }
})

</script>