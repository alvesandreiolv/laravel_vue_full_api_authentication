<template>
  <nav class="container">
    <ul>
      <li><strong></strong></li>
    </ul>
    <ul>
      <li @click="toggleDark()" :class="{ 'dark-mode': isDark }" style="cursor: pointer;">
        {{ isDark ? '🌞' : '🌚' }}
      </li>
      <li><a href="#">Settings</a></li>
      <li><router-link to="/">Logout</router-link></li>
    </ul>
  </nav>

  <main class="container" id="docs">
    <nav aria-label="breadcrumb">
      <ul>
        <li><a href="#">Start</a></li>
        <li>Page</li>
      </ul>
    </nav>

    <hr>
    <header>
      <hgroup>
        <h1>Pico</h1>
        <h2>A starter example with all elements and components used in Pico design system.</h2>
      </hgroup>
    </header>

    <a href="#">Page example 1</a>
    <br>
    <a href="#">Page example 2</a>
    <br>
    <a href="#">Page example 3</a>

  </main>
</template>

<style scoped>
#mainContainer {
  padding-top: 100px;
  padding-bottom: 100px;
}
</style>

<script setup>
//Adds toggleDark.
import { isDark, toggleDark } from '../assets/toggleDark.js';
//Adds authenticatrion.
import { useAuthStore } from '../stores/authentication.js';
</script>