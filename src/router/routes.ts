import { createRouter, createWebHistory } from "vue-router";

import StopWatch from "../custom-component/Stopwatch.vue";
import WorldClock from "../custom-component/WorldClock.vue";
import CustomRef from "../custom-component/CustomRef.vue";
import Calculator from "../custom-component/Calculator.vue";

const routes = [
  { path: "/", redirect: "/clock/stopwatch" },
  {
    path: "/clock",
    children: [
      { path: "stopwatch", name: "StopWatch", component: StopWatch },
      { path: "worldClock", name: "WorldClock", component: WorldClock },
    ],
  },
  { path: "/customRef", name: "CustomRef", component: CustomRef },
  { path: "/calculator", name: "Calculator", component: Calculator },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
