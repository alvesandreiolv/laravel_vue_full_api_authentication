//Uses modal for session expire warning.
import { openModal } from '../helpers/modal.js';
import { notify } from '@/services/notificator.js';
import axios from 'axios';
import router from '@/router/index.js';

//To not make show up authentication token name in console.
const authTokenName = import.meta.env.VITE_AUTHTOKEN_NAME;

//Login receives only the token, given that the request management is done in the components/views.
async function login(email, password) {
  //Tries to connect via API to retrieve the token. 
  await axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/login', {
    email: email,
    password: password,
  }).then(response => {
    //Stores the token in a super secure local storage.
    localStorage.setItem(authTokenName, encryptString(response.data.token));
    //Navigate to the dashboard page.
    router.push('/home');
    //Opens notification.
    notify('You have succefully logged in.', 'success');
  }).catch(err => {
    //If error, checks the kind of error and retuns message.
    if ((typeof err.response !== 'undefined') && err.response.data.message == 'Invalid credentials') {
      notify('Login Failed: Invalid credentials.', 'warning');
    } else {
      notify('Login Failed: Try again later.', 'warning');
      console.log(err)
    }
  })
}

//To logout and revoke the token from front and back end.
function logout() {
  //Removes authentication token from browser.
  localStorage.removeItem(authTokenName);
  //Navigate to the login page.
  router.push('/login');
  //Sends notification.
  notify('You\'ve been logged out.');
  //Tries logout in the server. 
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/logout', {}, {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken(),
    }
  }).catch(err => {
    notify('Your session was already expired.', 'warning', 5000);
  })
}

//To retrieve only the authentication token.
function getAuthToken() {
  return decryptString(localStorage.getItem(authTokenName));
}

//For easy encripting made by chatgpt.
function encryptString(text, shift = 9) {
  return btoa(text.replace(/[a-z]/gi, char => String.fromCharCode((char.charCodeAt(0) - (char < "a" ? 65 : 97) + shift) % 26 + (char < "a" ? 65 : 97))));
}
//For easy decripting made by chatgpt.
function decryptString(encodedText, shift = 9) {
  return atob(encodedText).replace(/[a-z]/gi, char => String.fromCharCode((char.charCodeAt(0) - (char < "a" ? 65 : 97) - shift + 26) % 26 + (char < "a" ? 65 : 97)));
}

export { login, logout, getAuthToken };