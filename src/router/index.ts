import { createRouter, createWebHistory } from 'vue-router'
import Stopwatch from '../pages/Stopwatch.vue'
import Calculator from '../pages/Calculator.vue'
import Welcome from '../pages/Welcome.vue'



const router = createRouter({
  history: createWebHistory(''),
  routes: [
    {
      path: '/',
      name : 'Home',
      component : Welcome
    },
    {
      path: '/clocks',
      name : 'Clocks',
      component : () => import('../pages/Clocks.vue')
    },
    {
      path: '/stopwatch',
      name : 'Stopwatch',
      component : Stopwatch
    },
    {
      path: '/calculator',
      name : 'Calculator',
      component : Calculator
    },
  ],
})

export default router
