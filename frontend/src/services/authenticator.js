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
  }, {
    timeout: 10000, // Set the timeout value in milliseconds (5 seconds in this example)
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
    }
    //Throws error so can be read by who called this function.
    throw new Error("Login failed.");
  })
}

//To logout and revoke the token from front and back end.
function logout() {
  //Tries logout in the server. 
  axios.post(import.meta.env.VITE_BASE_BACKEND_URL + '/api/logout', {}, {
    headers: {
      'Authorization': 'Bearer ' + getToken(),
    }
    timeout: 10000, // Set the timeout value in milliseconds (5 seconds in this example) 
  }).then(response => {
    //Sends success notification.
    notify('You have been logged out.');
  }).catch(err => {
    //If indeed not authenticated.
    if ((typeof err.request !== 'undefined') && (err.request.status == 401)) {
      notify('Your session may already be expired.', 'warning', 5000);
    } else {
      notify('Logout attempt failed: Unknown.', 'danger', 5000);
    }
  })
  //Removes auth token from browser.
  localStorage.removeItem(authTokenName);
  //Navigate to the login page.
  router.push('/login');

}

//To retrieve only the authentication token.
function getToken() {
  if (localStorage.getItem(authTokenName) !== null) {
    return decryptString(localStorage.getItem(authTokenName));
  }
  return false;
}

// To check if the token is still valid
async function checkToken(ifNotShowModal = false) {
  // Checks if the token exists in the first place.
  if (!getToken()) {
    return false;
  }
  try {
    // If the token exists, check with the server if the user is indeed logged in.
    await axios.get(import.meta.env.VITE_BASE_BACKEND_URL + '/api/checkauth', {
      headers: {
        'Authorization': 'Bearer ' + getToken(),
      },
      timeout: 5000, // Set the timeout value in milliseconds (5 seconds in this example)
    });
    // If the request is successful, the user is authenticated.
    return true;
  } catch (err) {
    // Handle authentication failure
    if (err.response && err.response.status === 401) {
      // Show the modal.
      if (ifNotShowModal) {
        openModal(document.getElementById('modalSessionExpired'));
      }
      // Removes the auth token from the browser.
      localStorage.removeItem(authTokenName);
    }
    // Throw an error to indicate authentication failure.
    return false;
  }
}

//For easy encripting made by chatgpt.
function encryptString(text, shift = 9) {
  return btoa(text.replace(/[a-z]/gi, char => String.fromCharCode((char.charCodeAt(0) - (char < "a" ? 65 : 97) + shift) % 26 + (char < "a" ? 65 : 97))));
}
//For easy decripting made by chatgpt.
function decryptString(encodedText, shift = 9) {
  return atob(encodedText).replace(/[a-z]/gi, char => String.fromCharCode((char.charCodeAt(0) - (char < "a" ? 65 : 97) - shift + 26) % 26 + (char < "a" ? 65 : 97)));
}

export { login, logout, getToken, checkToken };