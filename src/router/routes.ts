import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("../pages/Home.vue") },
  {
    path: "/stopwatch",
    name: "Stopwatch",
    component: () => import("../pages/Stopwatch.vue"),
  },
  {
    path: "/worldclock",
    name: "Worldclock",
    component: () => import("../pages/WorldClock.vue"),
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: () => import("../pages/Calculator.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
