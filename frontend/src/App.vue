<script setup>
import { ref } from 'vue';

const message = ref('');

const fetchData = async () => {
  try {
    const response = await fetch('https://evbkzynoncxd.neptune.trulywired.link/api/test');
    const data = await response.json();
    message.value = data.message;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>

<template>
  <dialog open>
    <article>
      <header>
        <a href="#close" aria-label="Close" class="close"></a>
        Modal title
      </header>
      <p>{{ message }}</p>
      <footer>
        <button @click="fetchData" class="secondary">Fetch Data</button>
      </footer>
    </article>
  </dialog>
</template>

<style scoped>
/* Add your scoped styles here */
</style>