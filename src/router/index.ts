import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/StopWatch.vue"),
  },
  { path: "/laps", name: "Laps", component: () => import("../pages/Laps.vue") },
  {
    path: "/world-clock",
    component: () => import("../pages/WorldClock.vue"),
  },
  {
    path: "/calculator",
    component: () => import("../pages/Calculator.vue")
  }, 
  {
    path: "/refs",
    component: () => import("../pages/Ref.vue")
  }
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
