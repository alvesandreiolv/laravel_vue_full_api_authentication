<template>
  <DashboardPageHeader title="Dashboard home" content="How can we help you today?" />
  <!---->

  <div class="grid">
    <!-- See my info button -->
    <router-link to="/myinfo" style="text-decoration: none; color: inherit;">
      <button class="menuButton mbLink secondary outline" @click="buttonLoading($event)">
        <i class="fa-regular fa-user"></i> See my information
      </button>
    </router-link>
    <!-- Change settings button -->
    <router-link to="/settings" style="text-decoration: none; color: inherit;">
      <button class="menuButton mbLink secondary outline" @click="buttonLoading($event)">
        <i class="fa-regular fa-pen-to-square"></i> Change settings
      </button>
    </router-link>
  </div>
</template>

<style>
#footerText {
  font-size: medium;
  color: var(--muted-color);
}
</style>

<script setup>
import DashboardPageHeader from "@/components/DashboardPageHeader.vue";

//To add loading animation when clicking in the buttons.
function buttonLoading(event) {
  event.target.setAttribute('aria-busy', 'true');
  event.target.innerHTML = '';
}
</script>

