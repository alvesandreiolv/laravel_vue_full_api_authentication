<template>
  <DashPageHeader title="Change Username"
    content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." />

  <form>
    <label for="firstname">
      Your current username is: <code>xxxxxxx</code>
      <input type="text" id="firstname" name="firstname" placeholder="Insert new username" required>
      <small>Must be between 5 and 15 characters, only letters and numbers.</small>
    </label>

    <!-- Button -->
    <button type="submit">Save username</button>
  </form>
</template>

<script setup>
import DashPageHeader from "@/components/DashPageHeader.vue";
</script>

<style></style>