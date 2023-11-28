//Uses modal for session expire warning.
import { openModal } from '../helpers/modal.js';
import Cookies from 'js-cookie';
import { notify } from '@/services/notificator.js';
import axios from 'axios';
import router from '@/router/index.js';

//Login receives only the token, given that the request management is done in the components/views.
async function login(email, password) {

  //Tries to connect via API to retrieve the token. 
  await axios.post(`https://evbkzynoncxd.neptune.trulywired.link/api/login`, {
    email: email,
    password: password,
  }).then(response => {
    //Gives browser permission to access the dashboard.
    localStorage.setItem('isAuthenticated', 'true');
    //Sets in the browser a super secure cookie that holds authentication token.
    Cookies.set('authToken', response.data.token, { httpOnly: true, sameSite: 'None' });
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

function logout() {
  //IRevokes browser permission to the dashboard.
  localStorage.setItem('isAuthenticated', 'false');
  //Removes authentication token from browser.
  Cookies.remove('authToken');
  //Navigate to the login page.
  router.push('/login');
  //Sends notification.
  notify('You\'ve been logged out.');
}

function getAuthToken() {
  return Cookies.get('authToken');
}

export { login, logout, getAuthToken };