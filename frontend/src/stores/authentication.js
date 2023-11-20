import { defineStore } from 'pinia';
import axios from 'axios';

// Set Axios defaults for all requests
axios.defaults.withCredentials = true;

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(email, password) {
      console.log(email, password);
      // Use the obtained CSRF token to log in
      axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/login`, {
        email: email,
        password: password,
      });
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});