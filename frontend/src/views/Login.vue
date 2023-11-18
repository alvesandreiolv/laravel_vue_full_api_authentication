<template>
  <!-- Main -->
  <main class="container">
    <article class="grid">
      <div>
        <hgroup>
          <h1>Sign in</h1>
          <h2>A minimalist layout for Login pages</h2>
        </hgroup>
        <form>
          <input type="text" name="login" placeholder="Login" aria-label="Login" autocomplete="nickname" required />
          <input type="password" name="password" placeholder="Password" aria-label="Password"
            autocomplete="current-password" required />
          <fieldset>
            <label for="terms">
              <input type="checkbox" id="terms" name="terms" v-model="isDark" />
              Dark mode
            </label>
          </fieldset>
          <!--<button type="submit" class="contrast" @click="login">Login</button>-->
          <router-link to="/dashboard" class="contrast" role="button" style="margin-bottom: 0px; width: 100%;">Login</router-link>
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
//Adds toggleDark.
import { isDark, toggleDark } from '../assets/toggleDark.js';
</script>