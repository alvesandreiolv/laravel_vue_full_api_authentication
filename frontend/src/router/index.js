import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Public Page",
    meta: { title: 'Public' },
    component: () => import("../views/PublicPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: { title: 'Login' },
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp Page",
    meta: { title: 'Sign Up' },
    component: () => import("../views/SignUp.vue"),
  },
  //Below are all internal dashboard pages
  {
    path: "/home",
    name: "Home",
    meta: { title: 'Home' },
    component: () => import("../views/dashboardViews/MainDashboard.vue"),
    children: [
      {
        path: "",
        meta: { title: 'Home' },
        component: () => import("../views/dashboardViews/Home.vue"),
      },
      {
        name: "My Info",
        path: "/myinfo",
        meta: { title: 'My Info' },
        component: () => import("../views/dashboardViews/MyInfo.vue"),
      },
      {
        name: "Settings",
        path: "/settings",
        meta: { title: 'Settings' },
        children: [
          {
            path: "",
            component: () =>
              import("../views/dashboardViews/settingsViews/Settings.vue"),
          },
          {
            name: "Change Password",
            path: "changepassword",
            meta: { title: 'Change Password' },
            component: () =>
              import(
                "../views/dashboardViews/settingsViews/ChangePassword.vue"
              ),
          },
          {
            name: "Change Name",
            path: "changename",
            meta: { title: 'Change Display Name' },
            component: () =>
              import(
                "../views/dashboardViews/settingsViews/ChangeName.vue"
              ),
          },
        ],
      },
    ],
    meta: { requiresAuth: true }, // Meta field for authentication at the parent level
  },
  //This page below must be at the bottom, with the lowest priority.
  {
    path: "/:pathMatch(.*)",
    name: "Not Found",
    meta: { title: 'Not Found' },
    component: () => import("../views/NotFound.vue"),
  },
];
// Below is system related config
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Below is all related to what before next page is loaded.
router.beforeEach((to, from, next) => {

  /* Below is redirection log bloc */
  const authToken = localStorage.hasOwnProperty(import.meta.env.VITE_AUTHTOKEN_NAME);
  // If the user is authenticated and trying to access the login page, redirect to the dashboard home
  if (to.name === 'Login' && authToken) {
    next("/home");
  } else if (to.meta.requiresAuth && !authToken) {
    // If the route requires authentication and the token doesn't exist, redirect to login screen
    next("/login");
  } else {
    // Allow the user to continue
    next();
  }
  /* End of redirection log bloc */

  // Below adds page title if available
  document.title = to.meta?.title ?? '';

});

//Below is log after page loads, in case is necessary.
//router.afterEach((to, from) => {
//});

export default router; // export the router instance
