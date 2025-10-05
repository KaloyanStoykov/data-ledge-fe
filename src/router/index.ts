import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import DashboardPage from '@/pages/DashboardPage.vue'
import DataSourcesPage from '@/pages/DataSourcesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePage},
    {
      path: '/dashboard',
      component: DashboardPage,
      children: [
        {
          path: 'datasources',
          name: 'datasources',
          component: DataSourcesPage,
        }
      ]
    }
  ],
})

export default router
