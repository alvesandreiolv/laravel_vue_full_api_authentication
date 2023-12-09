import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Public Page",
    component: () => import("../views/PublicPage.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "SignUp Page",
    component: () => import("../views/SignUp.vue"),
  },
  //Below are all internal dashboard pages
  {
    path: "/home",
    name: "Home",
    component: () => import("../views/dashboardViews/MainDashboard.vue"),
    children: [
      {
        path: "",
        component: () => import("../views/dashboardViews/Home.vue"),
      },
      {
        name: "My Info",
        path: "/myinfo",
        component: () => import("../views/dashboardViews/MyInfo.vue"),
      },
      {
        name: "Settings",
        path: "/settings",
        children: [
          {
            path: "",
            component: () =>
              import("../views/dashboardViews/settingsViews/Settings.vue"),
          },
          {
            name: "Change Password",
            path: "changepassword",
            component: () =>
              import(
                "../views/dashboardViews/settingsViews/ChangePassword.vue"
              ),
          },
          {
            name: "Change Name",
            path: "changename",
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
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
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
});

router.afterEach((to, from) => {
  //Adds loading stop
});

export default router; // export the router instance
