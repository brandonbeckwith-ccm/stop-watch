import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("../components/Home.vue"),
      },
      {
        path: "stopwatch",
        name: "Stopwatch",
        component: () => import("../components/Stopwatch.vue"),
      },
      {
        path: "worldclock",
        name: "World Clock",
        component: () => import("../components/WorldClock.vue"),
      },
    ],
  },
];

export const router = createRouter({
  routes,
  history: createWebHistory(),
});
