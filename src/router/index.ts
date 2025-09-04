import { createRouter, createWebHistory } from "vue-router";
import CustomRef from "../components/CustomRef.vue";
import StopWatch from "../components/StopWatch.vue";
import WorldClock from "../components/WorldClock.vue";
import Watch from "../components/Watch.vue";
import Calculator from "../components/Calculator.vue";

const routes = [
  {
    path: "/",
    redirect: "/watch/stopwatch",
  },
  {
    path: "/watch",
    component: Watch,
    children: [
      {
        path: "stopwatch",
        name: "WatchStopwatch",
        component: StopWatch,
      },
      {
        path: "world-clock",
        name: "WatchWorldClock",
        component: WorldClock,
      },
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
