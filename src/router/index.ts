import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Stopwatch from '../pages/Stopwatch.vue'
import Calculator from '../pages/Calculator.vue'


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
    {
      path: '/calculator',
      name : 'calculator',
      component : Calculator
    },
  ],
})

export default router
