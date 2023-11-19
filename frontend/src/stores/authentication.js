import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('authState') === 'true',
  }),
  actions: {
    login() {
      // Implement your login logic here
      this.isAuthenticated = true;
      localStorage.setItem('authState', 'true');
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
      localStorage.setItem('authState', 'false');
    },
  },
});
