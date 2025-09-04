import { createRouter, createWebHistory } from "vue-router";
import Clock from "../clock/Clock.vue";
import StopWatch from "../clock/StopWatch.vue";
import WorldClock from "../clock/WorldClock.vue";
import CustomRef from "../customRef/customRef.vue";
import Calculator from "../calculator/calculator.vue";

const routes = [
  {
    path: "/clock",
    name: "Clock",
    component: Clock,
    children: [
      { path: "stopwatch", name: "StopWatch", component: StopWatch },
      { path: "world", name: "WorldClock", component: WorldClock },
      { path: "", redirect: "/clock/stopwatch" },
    ],
  },
  {
    path: "/custom-ref",
    name: "CustomRef",
    component: CustomRef,
  },
  {
    path: "/calculator",
    name: "Calculator",
    component: Calculator,
  },
  { path: "/:pathMatch(.*)*", redirect: "/clock" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
