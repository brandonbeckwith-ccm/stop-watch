// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import StopWatch from "../components/StopWatch.vue";
import WorldClock from "../components/WorldClock.vue";

const routes = [
  {
    path: "/",
    name: "Stopwatch",
    component: StopWatch,
  },
  {
    path: "/world-clock",
    name: "WorldClock",
    component: WorldClock,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
