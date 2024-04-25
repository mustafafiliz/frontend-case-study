import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/packages',
      name: 'packages',
      component: () => import('../views/PackagesView.vue')
    },
    {
      path: '/applied-packages',
      name: 'applied-packages',
      component: () => import('../views/AppliedPackagesView.vue')
    },
    {
      path: '/package-usages',
      name: 'package-usages',
      component: () => import('../views/PackageUsagesView.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
