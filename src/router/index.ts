import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Clock.vue";
import WorldClock from "../views/WorldClock.vue";
import Calculator from "../views/Calculator.vue";
import Readme from "../views/Readme.vue";
import Stopwatch from "../components/Stopwatch.vue";
const routes = [
  {
    path: '/',
    component: Welcome,
    children: [
      {
        path: 'clock/stopwatch',
        component: Stopwatch,
      },
      {
        path: 'clock/worldClock',
        component: WorldClock,
      },
    ],
  },
  {
    path: '/calculator',
    component: Calculator,
  },
  {
    path: '/readme',
    component: Readme,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
