import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login() {
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});