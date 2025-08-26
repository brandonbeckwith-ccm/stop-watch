import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./views/HomeView.vue'),
    parentPath: '/',
  },
  {
    path: '/stopwatch',
    name: 'stopwatch',
    component: () => import('./views/StopwatchView.vue'),
    parentPath: '/',
  },
  {
    path: '/world-clock',
    name: 'world-clock',
    component: () => import('./views/WorldClockView.vue'),
    parentPath: '/',
  },
  {
    path: '/calculator',
    name: 'calculator',
    component: () => import('./views/CalculatorView.vue'),
    parentPath: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 