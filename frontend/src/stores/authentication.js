import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
  }),
  actions: {
    async login(username, password) {
      console.log(username, password);

        const response = await axios.post('https://evbkzynoncxd.neptune.trulywired.link/api/login', {
          username,
          password,
        },
        {
          headers: {
            'Host': 'evbkzynoncxd.neptune.trulywired.link',
          },
        }
      );
      
      // Implement your login logic here
      this.isAuthenticated = true;
    },
    logout() {
      // Implement your logout logic here
      this.isAuthenticated = false;
    },
  },
});