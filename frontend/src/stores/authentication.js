import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      console.log(username, password);
      try {
        // Call your login API endpoint with Axios
        const response = await axios.post('https://evbkzynoncxd.neptune.trulywired.link/api/login', {
          username,
          password,
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        });
      } catch (error) {
        // Handle login error (e.g., display error message)
        console.error('Login failed:', error);
      }
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});