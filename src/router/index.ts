import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', name: 'Home', component: () => import('../pages/StopWatch.vue') },
    { path: '/laps', name: 'Laps', component: () => import('../pages/Laps.vue') },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
