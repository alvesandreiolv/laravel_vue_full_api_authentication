<template>
  <!-- Main -->
  <main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Sign in</h1>
          <h2>A minimalist layout for Login pages</h2>
        </hgroup>
        <form @submit.prevent="executeLogin">
          <input v-model="login" type="text" name="login" placeholder="Login" aria-label="Login" autocomplete="nickname"
            required />
          <input v-model="password" type="password" name="password" placeholder="Password" aria-label="Password"
            autocomplete="current-password" required />
          <fieldset>
            <label for="terms">
              <input type="checkbox" id="terms" name="terms" v-model="isDark" />
              Dark mode
            </label>
          </fieldset>
          <button type="submit" class="contrast" :aria-busy="isLoading">Login</button>
        </form>
      </div>
      <div></div>
    </article>
  </main>
  <!-- ./ Main -->
</template>

<style scoped>
/* My personal below */
.grid {
  margin: 0 20px;
}

/* Grid */
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: calc(100vh);
  padding: 1rem 0;
}

article {
  padding: 0;
  overflow: hidden;
}

article div {
  padding: 1rem;
}

@media (min-width: 576px) {
  main {
    padding: 1.25rem 0;
  }

  article div {
    padding: 1.25rem;
  }
}

@media (min-width: 768px) {
  main {
    padding: 1.5rem 0;
  }

  article div {
    padding: 1.5rem;
  }
}

@media (min-width: 992px) {
  main {
    padding: 1.75rem 0;
  }

  article div {
    padding: 1.75rem;
  }
}

@media (min-width: 1200px) {
  main {
    padding: 2rem 0;
  }

  article div {
    padding: 2rem;
  }
}

/* Nav */
summary[role="link"].secondary:is([aria-current], :hover, :active, :focus) {
  background-color: transparent;
  color: var(--secondary-hover);
}

/* Hero Image */
article div:nth-of-type(2) {
  display: none;
  background-color: #374956;
  background-image: url("../assets/techguy1.jpg");
  background-position: center;
  background-size: cover;
}

@media (min-width: 992px) {
  .grid>div:nth-of-type(2) {
    display: block;
  }
}

/* Footer */
body>footer {
  padding: 1rem 0;
}
</style>

<script setup>
// Adds toggleDark.
import { isDark } from '../utils/toggleDark.js';
// Adds authentication.
import { useAuthStore } from '../stores/authentication.js';
// Adds notification.
import { notify } from '../utils/notification.js';
// Adds Axios
import axios from 'axios';
// Adds ref
import { ref } from 'vue'

// Declares initial login and password fiels and make it reactive.
const login = ref('')
const password = ref('')
const isLoading = ref('false')

// Runs the login logic.
function executeLogin() {
  isLoading.value = 'true';
  // Runs the connection with api.
  axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/login`, {
    email: login.value,
    password: password.value,
  }).then(response => {
    //If success...
    console.log(response.data.token);
    notify('Login successful.', 'success');
    password.value = '';
  }).catch(error => {
    //If error, checks the kind of error and retuns message.
    if (error.response.data.message == 'Invalid credentials') {
      notify('Login Failed: Invalid credentials.', 'warning');
    } else {
      notify('Login Failed: Undefined.', 'warning');
    }
  }).finally(() => {
    // When finished...
    // Erases the password.
    password.value = '';
    // Stop loading effects.
    isLoading.value = 'false';
  });
}

</script>