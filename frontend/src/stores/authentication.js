import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    login(email, password) {
      // Use the obtained CSRF token to log in
      axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/login`, {
        email: email,
        password: password,
      });
      // Assuming the token is in the response data, adjust accordingly based on your API
      //setCookie('authToken', response.data.token, { secure: true });
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});