<!-- In this page, the user can change it's current username. -->
<template>
  <DashboardPageHeader title="Change display name" content="Please fill the required fields below." />

  <!-- The form itself -->
  <form @submit.prevent="toggleUpdateNameModal('open')">
    <label for="name">
      Your current display name is: <code :aria-busy="userData.userDataIsLoading">{{ userData.name }}</code>
      <input type="text" id="name" name="name" maxlength="25" placeholder="Insert new name" v-model="name"
        :aria-invalid="displayErrors" required>
      <small>Must be between 10 and 25 characters, only letters and numbers.</small>
      <!-- Show small success message -->
      <span style="color: #43a047;" v-if="showUpdateSuccessMessage">Update success!</span>
    </label>
    <!-- Shows errors -->
    <ul id="formErrorList">
      <div v-if="displayErrors && ((typeof errorMessages !== 'undefined') && (errorMessages.length > 0))">
        <li v-for="errorMessage in errorMessages" :key="errorMessage">{{ errorMessage }}</li>
      </div>
    </ul>
    <!-- Button -->
    <button type="submit" :aria-busy="isExecutingUpdate" :disabled="isExecutingUpdate">Save display name</button>
  </form>

  <!-- The modal used for this page's form. -->
  <dialog id="UpdateNameModal">
    <article>
      <h3>Confirm your action</h3>
      <label for="currentpassword">
        <small>In order to proceed, please provide your current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleUpdateNameModal('close'), executeUpdateName()" required
          autofocus>
      </label>
      <footer>
        <button @click="toggleUpdateNameModal('close')" role="button" class="secondary">Cancel</button>
        <button :disabled="!currentpassword" @click="toggleUpdateNameModal('close'), executeUpdateName()"
          role="button">Confirm</button>
      </footer>
    </article>
  </dialog>
</template>

<style>
#UpdateNameModal footer {
  margin-top: 0px;
}

#UpdateNameModal button {
  display: inline;
  width: fit-content;
}
</style>

<script setup>
import DashboardPageHeader from "@/components/DashboardPageHeader.vue";
import axios from 'axios';
import { userData, forceUpdateUserData, updateMissingUserData } from '@/store/userBasicData.js';
import { notify } from '@/services/notificator.js';
import { ref, watch } from 'vue'
import { getToken, checkToken } from '@/services/authenticator.js';
import { openModal, closeModal } from '@/helpers/modal.js';

// Update user data if it's missing
updateMissingUserData();

const name = ref('');
const currentpassword = ref('');
const displayErrors = ref(null);
const errorMessages = ref([])
const isExecutingUpdate = ref(false);
const showUpdateSuccessMessage = ref(false);

// Toggle modal for current password confirmation. 
function toggleUpdateNameModal(action) {
  if (action == 'open') {
    openModal(document.getElementById("UpdateNameModal"));
  } else {
    closeModal(document.getElementById("UpdateNameModal"));
  }
}

// In fact tries to update data in server.
function executeUpdateName() {
  // Starts the loader
  isExecutingUpdate.value = true;
  // Send information to server.
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/changename', {
    password: currentpassword.value,
    new_name: name.value,
  }, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
    timeout: 30000
  }).then(response => {
    // Resets name field.
    name.value = '';
    // Force update user basic data.
    forceUpdateUserData();
    // Opens notification
    notify('Your display name was updated successfully', 'success');
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
    notify('Display name update failed', 'warning');
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

// Check if name input has changed, if yes, removes error from screen. 
watch(name, () => {
  // Hide error block element
  displayErrors.value = null;
  // If name field is changed and is not empty 
  if (name.value !== '') {
    //Show success message
    showUpdateSuccessMessage.value = false;
  }
})

</script>