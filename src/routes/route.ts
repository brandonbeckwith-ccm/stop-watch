import { createRouter, createWebHistory } from "vue-router";
import LapsView from "../pages/LapsView.vue";
import StopWatchView from "../pages/StopWatchView.vue";
import WorldClocksView from "../pages/WorldClocksView.vue";
import CalculatorView from "../pages/CalculatorView.vue";

const routes = [
    { path: '/', redirect: "/stopwatch" },
    { path: '/stopwatch', component: StopWatchView },
    { path: '/laps', component: LapsView },
    { path: '/worldClocks', component: WorldClocksView },
    { path: '/calculator', component: CalculatorView }
]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router