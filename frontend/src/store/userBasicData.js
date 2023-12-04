import { getToken, checkToken } from '@/services/authenticator.js';
import axios from 'axios';
import { reactive } from 'vue';

// Declare userData without initialization
const userData = reactive({
  name: '',
  email: '',
  userDataIsLoading: true,
  updateUserData() {
    // Below reset states.
    this.name = '';
    this.email = '';
    this.userDataIsLoading = true;
    // Get info from server
    axios.get(import.meta.env.VITE_BASE_BACKEND_URL + '/api/user', {
      headers: {
        'Authorization': 'Bearer ' + getToken(),
      },
      timeout: 10000
    }).then(response => {
      this.name = response.data.name;
      this.email = response.data.email;
      this.userDataIsLoading = false;
    }).catch(err => {
      // If error check if user is authenticated.
      checkToken(true);
    })
  },
});

// If this store is called, the userData is auto updated, but it needs first to wait for the authenticator to fully load.
import('@/services/authenticator.js').then(authenticatorModule => {
  userData.updateUserData()
});

// Now, you can use userData in your template
export { userData };