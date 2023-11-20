import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(token) {
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout(token) {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
    checkAuth(token) {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});