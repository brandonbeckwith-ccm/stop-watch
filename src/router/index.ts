// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import StopWatch from "../components/StopWatch.vue";
import WorldClock from "../components/WorldClock.vue";

const routes = [
  {
    path: "/stopwatch",
    name: "Stopwatch",
    component: StopWatch,
  },
  {
    path: "/world-clock",
    name: "WorldClock",
    component: WorldClock,
  },
  {
    path: "/",
    redirect: "/stopwatch",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
