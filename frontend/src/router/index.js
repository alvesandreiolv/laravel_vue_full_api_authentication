import { createRouter, createWebHistory } from 'vue-router'
import { authenticationStore } from '../stores/authentication.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'publicPage',
      component: () => import('../views/PublicPage.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      name: 'Dashboard',
      component: () => import('../views/dashboardViews/MainDashboard.vue'),
      children: [
        {
          name: 'Dashboard.Home',
          path: '/home',
          component: () => import('../views/dashboardViews/Home.vue'),
        },
        {
          name: 'Dashboard.Settings',
          path: '/settings',
          component: () => import('../views/dashboardViews/Settings.vue'),
        },
        {
          name: 'Dashboard.MyInfo',
          path: '/myinfo',
          component: () => import('../views/dashboardViews/MyInfo.vue'),
        },
      ],
      meta: { requiresAuth: true } // Meta field for authentication at the parent level
    },
    //This page below must be at the bottom, with the lowest priority.
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
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