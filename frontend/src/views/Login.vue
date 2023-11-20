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
          <input v-model="loginData.login" type="text" name="login" placeholder="Login" aria-label="Login"
            autocomplete="nickname" required />
          <input v-model="loginData.password" type="password" name="password" placeholder="Password" aria-label="Password"
            autocomplete="current-password" required />
          <fieldset>
            <label for="terms">
              <input type="checkbox" id="terms" name="terms" v-model="isDark" />
              Dark mode
            </label>
          </fieldset>
          <button type="submit" class="contrast">Login</button>
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

// Adds custom notify to variable.
const notifyLogin = () => {
  notify({
    text: 'You are logged in.',
    duration: 3000,
    gravity: 'top',
    position: 'right',
    style: { background: "linear-gradient(to right, #43a047, #43a047)" }
  });
};

// Data for the login form
const loginData = {
  login: '',
  password: '',
};

// Groups all actions into the function below.
function executeLogin() {
  useAuthStore().login(loginData.login, loginData.password);
}
</script>