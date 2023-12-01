<template>
  <TheDashboardPageHeader title="Change Password" content="Please fill the required fields below." />

  <form>
    <label for="firstname">
      Current password:
      <input type="text" id="firstname" name="firstname" placeholder="Current" required>
    </label>
    <!-- Grid -->
    <div class="grid">
      <!-- Markup example 1: input is inside label -->
      <label for="lastname">
        New password:
        <input type="text" id="lastname" name="lastname" placeholder="New" required>
      </label>
      <label for="lastname">
        Confirm password:
        <input type="text" id="lastname" name="lastname" placeholder="Confirm" required>
      </label>
    </div>
    <small>The password must contain at least 10 characters, letters and numbers.</small>
    <!-- Button -->
    <button type="submit">Save password</button>
  </form>
</template>

<script setup>
import TheDashboardPageHeader from "@/components/TheDashboardPageHeader.vue";
</script>

<style></style>