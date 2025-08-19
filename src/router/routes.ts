import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../pages/Home.vue") },
  { path: "/about", component: () => import("../pages/AboutUs.vue") },
  { path: "/stopwatch", component: () => import("../pages/Stopwatch.vue") },
  { path: "/worldclock", component: () => import("../pages/WorldClock.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
