import { createRouter, createWebHistory } from 'vue-router'
import { authenticationStore } from '../stores/authentication.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
})

//Checks in every route change if the user is logged in.
router.beforeEach((to, from, next) => {
  const authStore = authenticationStore();
  //If the route has "meta auth true", and authenticated is true, then go to dashboard.
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Redirect to login if authentication is required but user is not authenticated
    next('/login');
  } else {
    next();
  }
});

export default router