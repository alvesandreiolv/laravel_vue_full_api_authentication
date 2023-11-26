<!-- MyComponent.vue -->
<template>
  <nav id="mainNavigator" aria-label="breadcrumb">
    <ul>
      <!-- Starts the for for looping the options -->
      <template v-for="(item, index) in breadcrumbs" :key="index">
        <!-- a. -->
        <router-link :to="item.path" v-if="item.text !== undefined">
          <li>{{ item.text }}</li>
        </router-link>
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

<script>
export default {
  props: {
    title: String,
    content: String,
  },
  computed: {
    breadcrumbs() {
      // Generate breadcrumb items based on the current route
      const routes = this.$route.matched;
      return routes.map(route => {
        return {
          text: route.name,
          path: route.path,
        };
      });
    },
  },
};
</script>

<style scoped>
#mainNavigator {
  padding-bottom: 20px;
}
</style>