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

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/login'
  }
})

export default router
