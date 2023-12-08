import { getToken, checkToken } from "@/services/authenticator.js";
import axios from "axios";
import { reactive } from "vue";

// Declare userData without initialization
const userData = reactive({
  name: "",
  email: "",
  userDataIsLoading: true,
});

function forceUpdateUserData() {
  // Below reset states.
  userData.name = "";
  userData.email = "";
  userData.userDataIsLoading = true;
  // Get info from server
  axios.get(import.meta.env.VITE_BASE_BACKEND_URL + "/api/user", {
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    timeout: 10000,
  }).then((response) => {
    userData.name = response.data.name;
    userData.email = response.data.email;
    userData.userDataIsLoading = false;
  }).catch((err) => {
    // If error check if user is authenticated.
    checkToken(true);
  });
}

//Does only update user data, if data is missing.
function updateMissingUserData() {
  if (!userData.name) {
    forceUpdateUserData();
  }
}

// Now, you can use userData in your template
export { userData, forceUpdateUserData, updateMissingUserData };
