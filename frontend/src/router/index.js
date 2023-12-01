import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Public Page',
    component: () => import('../views/PublicPage.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  //Below are all internal dashboard pages
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/dashboardViews/MainDashboard.vue'),
    children: [
      {
        path: '',
        name: '',
        component: () => import('../views/dashboardViews/Home.vue'),
      },
      {
        name: 'My Info',
        path: '/myinfo',
        component: () => import('../views/dashboardViews/MyInfo.vue'),
      },
      {
        name: 'Settings',
        path: '/settings',
        children: [
          {
            path: '',
            name: '',
            component: () => import('../views/dashboardViews/settingsViews/Settings.vue'),
          },
          {
            name: 'Change Password',
            path: 'changepassword',
            component: () => import('../views/dashboardViews/settingsViews/ChangePassword.vue'),
          },
          {
            name: 'Change Username',
            path: 'changeusername',
            component: () => import('../views/dashboardViews/settingsViews/ChangeUsername.vue'),
          },
        ]
      }
    ],
    meta: { requiresAuth: true } // Meta field for authentication at the parent level
  },
  //This page below must be at the bottom, with the lowest priority.
  {
    path: '/:pathMatch(.*)',
    name: 'Not Found',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

//Checks in every route change if the user is logged in.
router.beforeEach((to, from, next) => {
  //If the route requires AUTH, and isAuthenticated is NOT true, then go to login.
  if (to.meta.requiresAuth && (localStorage.getItem(import.meta.env.VITE_AUTHTOKEN_NAME) == null)) {
    next('/login');
  } else {
    //If not, so proceed to the route.
    next();
  }
});

export default router; // export the router instance