import { getToken } from '@/services/authenticator.js';
import axios from 'axios';
import { reactive, onMounted } from 'vue';

// Declare userData without initialization
const userData = reactive({
  name: '',
  email: '',
  updateUserData() {
    const minutesToExpireData = 1;
    // Get info from server
    axios.get(import.meta.env.VITE_BASE_BACKEND_URL + '/api/user', {
      headers: {
        'Authorization': 'Bearer ' + getToken(),
      },
    }).then(response => {
      this.name = response.data.name;
      this.email = response.data.email;
    })
  },
});

//userData.updateUserData();

// Now, you can use userData in your template
export { userData };