<template>
  <!-- Below adds session expired modal that will be available for all dashboard pages. -->
  <dialog id="modalSessionExpired">
    <article>
      <h3 id="modalSessionExpiredTitle">
        You session has expired.
      </h3>
      <p id="modalSessionExpiredMainText">
        It appears that your authentication is no longer valid. To continue using this service, please log in again.
      </p>
      <footer>
        <a id="modalSessionExpiredCancelButton" href="#" @click.prevent="toggleSessionModal('modalSessionExpired')"
          role="button" class="secondary" data-target="modal-example">
          Cancel
        </a>
        <router-link id="modalSessionExpiredConfirmButton" data-target="modal-example" to="/login" role="button">
          Go to Login
        </router-link>
      </footer>
    </article>
  </dialog>
</template>

<script setup>
import { closeModal } from '@/helpers/modal.js';

function toggleSessionModal(modalName) {
  closeModal(document.getElementById(modalName));
}
</script>