<template>
  <!-- Below adds loading bar for views sitewide. -->
  <ThePageProgressBar />
  <router-view></router-view>
</template>

<style scoped>
/* BELOW IS SITEWIDE CSS */
</style>

<script setup>
import ThePageProgressBar from "@/components/ThePageProgressBar.vue";
</script>