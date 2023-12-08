<!-- MyComponent.vue -->
<template>
  <nav aria-label="breadcrumb">
    <ul>
      <!-- Starts the for for looping the options -->
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <!-- a. -->
        <template v-if="item.text !== undefined">
          <li><router-link :to="item.path" @click="buttonLoading($event)">{{ item.text }}</router-link></li>
        </template>
      </template>
    </ul>
  </nav>
  <header>
    <hgroup>
      <h2>{{ title }}</h2>
      <h2>{{ content }}</h2>
    </hgroup>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps(['title', 'content']);

// Reactive data
const breadcrumbs = ref([]);

// Method to generate breadcrumb items based on the current route
const routes = useRoute().matched;
breadcrumbs.value = routes.map(route => ({
  text: route.name,
  path: route.path,
}));

function buttonLoading(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
}

</script>

<style scoped></style>