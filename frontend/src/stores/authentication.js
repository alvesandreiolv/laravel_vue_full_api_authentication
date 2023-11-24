import { defineStore } from 'pinia';
//Uses modal for session expire warning.
import { openModal } from '../utils/modal.js';

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
      //openModal(document.getElementById('modalSessionExpired'));
    },
  },
});

function setAuthToken(actualToken) {

}

function getAuthToken() {

}

function removeAuthToken() {

}