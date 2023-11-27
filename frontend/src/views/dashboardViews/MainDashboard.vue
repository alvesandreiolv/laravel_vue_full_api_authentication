<template>
  <!-- Dashboard's navbar -->
  <nav class="container">
    <ul>
      <li><strong></strong></li>
    </ul>
    <ul>
      <li class="contrast" @click="toggleDark()" id="lightSwitch">
        <img src="../../assets/lightSwitch.png" alt="Light Switch">
      </li>
      <li>
        <a @click="executeLogout()" href="#" @click.prevent>Logout</a>
      </li>
    </ul>
  </nav>

  <!-- Below is the session expired modal that will be available in all places inside the dashboard. -->
  <dialog id="modalSessionExpired">
    <article>
      <h3 id="modalSessionExpiredTitle">
        You session has expired.
      </h3>
      <p id="modalSessionExpiredMainText">
        It's been detected that your session is no longer valid. You need to login again in order to continue using this
        service.
      </p>
      <footer>
        <a id="modalSessionExpiredCancelButton" href="#" role="button" class="secondary" data-target="modal-example"
          onClick="">
          Cancel
        </a>
        <router-link id="modalSessionExpiredConfirmButton" data-target="modal-example" to="/login" role="button">
          Go to Login
        </router-link>
      </footer>
    </article>
  </dialog>

  <!-- Below is the main body for the rest of the dashboard platform -->
  <main class="container" id="docs">
    <router-view />
  </main>
</template>

<style scoped>
#lightSwitch {
  border-radius: 1000px;
  filter: drop-shadow(3px 3px 5px #7979798a);
  cursor: pointer;
  width: auto;
  height: auto;
  transition: 0.1s;
  opacity: 0.5;
}

#lightSwitch:hover {
  transform: scale(1.1);
  opacity: 1;
}

#lightSwitch:active {
  transform: scale(0.9);
}

#lightSwitch img {
  filter: invert(50%);
  user-select: none;
  width: 30px;
  height: 30px;
}
</style>

<script setup>
//Adds toggleDark.
import { isDark, toggleDark } from '../../utils/toggleDark.js';
import { authenticationStore } from '../../stores/authentication.js';
import { notify } from '@/utils/notification.js';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Get the router instance
const router = useRouter();

// Groups all actions into the function below.
function executeLogout() {
  // Runs logout in the server. Aks for token invalidation.
  axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/logout`, {
    //token: login.value
  }).catch(err => {
    // If logout fails
    notify('Warning: Session was already expired.', 'warning', 5000);
  })
  // Runs logout locally, sends request to remove token and cookie.
  authenticationStore().logout('please_put_token_here');
  // Navigate to the login page.
  router.push('/login');
  //Shows notification
  notify('You\'ve been logged out.');
  //authenticationStore().openModalForTests();
}
</script>