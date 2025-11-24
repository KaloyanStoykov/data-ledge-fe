import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DashboardOverviewPage from '@/pages/DashboardOverviewPage.vue'
import DashboardMenuLayout from '@/pages/DashboardMenuLayout.vue'
import DataSourcesPage from '@/pages/DataSourcesPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import { useAuthStore } from '@/hooks/authStore.ts'
import SignUpPage from '@/pages/SignUpPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage},
    {
      path: '/dashboard',
      component: DashboardMenuLayout,
      children: [
        {
          path: '', // Renders when the path is exactly '/dashboard'
          name: 'dashboard-home',
          component: DashboardOverviewPage, // Create this new component
        },
        {
          path: 'datasources',
          name: 'datasources',
          component: DataSourcesPage,
        }
      ],
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignUpPage,
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // 1. If the user is null, they might just be "refreshed" out of state.
  //    Try to fetch the user from the backend cookie before deciding.
  if (!auth.isAuthenticated) {
    await auth.checkAuth()
  }

  // 2. Now check if route requires auth
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // User is genuinely not logged in
    next('/login')
  }
  else if ((to.path === '/login' || to.path === '/signup') && auth.isAuthenticated) {
    // User is logged in but trying to visit login page
    next('/dashboard')
  }
  else {
    // Allow navigation
    next()
  }
})

export default router
