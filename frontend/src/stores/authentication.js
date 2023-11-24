import { defineStore } from 'pinia';

export const authenticationStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' || false,
  }),
  actions: {
    login(token) {
      // Implement your login logic here
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
    },
    logout(token) {
      // Implement your logout logic here
      this.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
    },
    checkAuth(token) {
      // Implement your checkAuth logic here
      // You might want to check the token validity or perform other checks
      // this.isAuthenticated = /* your check logic */;
      //localStorage.setItem('isAuthenticated', this.isAuthenticated.toString());
    },
  },
});

function setAuthToken(actualToken) {

}

function getAuthToken() {

}

function removeAuthToken() {

}