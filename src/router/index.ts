import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DashboardOverviewPage from '@/pages/DashboardOverviewPage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import DataSourcesPage from '@/pages/DataSourcesPage.vue'
import LoginPage from '@/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage},
    {
      path: '/dashboard',
      component: DashboardPage,
      children: [
        // 1. ADD THIS DEFAULT CHILD ROUTE
        {
          path: '', // Renders when the path is exactly '/dashboard'
          name: 'dashboard-home',
          component: DashboardOverviewPage, // Create this new component
        },
        // 2. Your existing child route
        {
          path: 'datasources',
          name: 'datasources',
          component: DataSourcesPage,
        }
      ]
    },
    {
      path: '/login',
      component: LoginPage,
    }
  ],
})

export default router
