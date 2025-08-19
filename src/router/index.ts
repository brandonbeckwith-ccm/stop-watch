import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Stopwatch from '../pages/Stopwatch.vue'


const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name : 'home',
      component : Home
    },
    {
      path: '/clocks',
      name : 'clocks',
      component : () => import('../pages/Clocks.vue')
    },
    {
      path: '/stopwatch',
      name : 'stopwatch',
      component : Stopwatch
    },
  ],
})

export default router
