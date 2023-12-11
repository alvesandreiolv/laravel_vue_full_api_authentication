<template>
  <DashboardPageHeader title="Settings" content="What would you like to change?" />

  <div class="grid">
    <!-- Change my username button -->
    <router-link :to="{ name: 'Change Name' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline" @click="buttonLoading($event)"><i
          class="fa-regular fa-pen-to-square"></i> Change my display name</button>
    </router-link>
    <!-- Change my password button -->
    <router-link :to="{ name: 'Change Password' }" style="text-decoration: none; color: inherit;">
      <button class="menuButton secondary outline" @click="buttonLoading($event)"><i
          class="fa-regular fa-pen-to-square"></i> Change my password</button>
    </router-link>
    <!-- Delete my account button -->
    <button @click="toggleDeactivateModal('open')" class="menuButton outline"
      style="color: #d81b60 !important; border-color: #d81b60 !important;" :aria-busy="isExecutingDeactivation"><i
        class="fa-regular fa-trash-can"></i>
      Deactivate my account</button>
  </div>

  <!-- Deactivate account modal -->
  <dialog id="deactivateModal">
    <article>
      <h3>Confirm your action</h3>
      <p style="margin-bottom: 30px;">Please be aware that this action cannot be undone. After deactivation, all data
        associated with your account will be deleted. Also, you won't be able to use your email from this account again.
      </p>
      <label for="currentpassword">
        <small>In order to proceed, please provide your current password:</small>
        <input type="password" id="currentpassword" name="currentpassword" v-model="currentpassword"
          placeholder="Current password" v-on:keyup.enter="toggleDeactivateModal('close'), executeDeactivation()" required
          autofocus>
      </label>
      <footer>
        <button @click="toggleDeactivateModal('close')" role="button" class="secondary">Cancel</button>
        <button id="deactivateButton" :disabled="!currentpassword"
          @click="toggleDeactivateModal('close'), executeDeactivation()" role="button"> DEACTIVATE </button>
      </footer>
    </article>
  </dialog>
</template>

<script setup>
import DashboardPageHeader from "@/components/DashboardPageHeader.vue";
import { notify } from '@/services/notificator.js';
import { openModal, closeModal } from '@/helpers/modal.js';
import { ref } from 'vue'
import axios from 'axios';
import { getToken, checkToken, logout } from '@/services/authenticator.js';

/* account deactivation bloc below */

const currentpassword = ref('');
const isExecutingDeactivation = ref(false);

//To toggle the deactiation modal.
function toggleDeactivateModal(action) {
  if (action == 'open') {
    openModal(document.getElementById("deactivateModal"));
  } else {
    closeModal(document.getElementById("deactivateModal"));
  }
}

//Executes user deactivation
function executeDeactivation() {
  //Starts loading animation
  isExecutingDeactivation.value = true;
  // Send request to server.
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/deactivate', {
    password: currentpassword.value,
  }, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    },
    timeout: 30000
  }).then(response => {
    //logs user out
    logout();
    //show notification
    notify('Your account was sucessfully deactivated', 'default', '10000');
  }).catch(err => {
    //Check if error was caused by wrong password.
    if (err.response.status == 401) {
      notify('The password is incorrect', 'warning', '5000');
    } else {
      notify('Account deactivation attempt has failed', 'danger', '5000');
    }
    //If the fail is a 402, will check if the password is correct.
    if (err.response.status == 401) {
      checkToken(true);
    }
  }).finally(() => {
    //resets current password.
    currentpassword.value = '';
    isExecutingDeactivation.value = false;
  })
}

/* end of deactivation bloc */

//To add loading animation when clicking in the buttons.
function buttonLoading(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
}
</script>

<style>
#deactivateModal footer {
  margin-top: 0px;
}

#deactivateModal button {
  display: inline;
  width: fit-content;
}

#deactivateButton {
  background-color: #e53935;
  border-color: #e53935;
}

#deactivateButton:disabled {
  background-color: #5c1716;
  border-color: #5c1716;
}
</style>