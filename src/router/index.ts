import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../pages/Clock.vue') },
    {
        path: '/clock', name: 'Clock', component: () => import('../pages/Clock.vue'),
        children: [
            { path: 'stopwatch', component: () => import('../pages/StopWatch.vue') },
            // { path: '/laps', name: 'Laps', component: () => import('../pages/Laps.vue') },
            {
                path: 'world-clock', component: () => import('../pages/WorldClock.vue')
            },
        ]
    },
    { path: '/custom-ref-demo', component: () => import('../pages/CustomRefDemo.vue') },
    { path: '/calculator', component: () => import('../pages/Calculator.vue') }
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
