<script setup>
import axios from 'axios';
import { ref } from 'vue';

const message = ref('Original message'); // Set an initial message

const fetchData = async () => {
  try {
    const response = await axios.get('https://evbkzynoncxd.neptune.trulywired.link/api/test');
    message.value = response.data.message;
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
        Modal example
      </header>
      <p>
        {{ message }}
      </p>
      <footer>
        <button @click="fetchData" class="secondary">Fetch Data</button>
      </footer>
    </article>
  </dialog>
</template>

<style scoped></style>
