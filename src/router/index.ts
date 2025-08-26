import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import StopwatchView from "../views/StopwatchView.vue";
import AboutView from "../views/AboutView.vue";
import WorldClockView from "../views/WorldClockView.vue";
import CalculatorView from "../views/CalculatorView.vue";


const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/stopwatch",
    name: "stopwatch",
    component: StopwatchView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/worldclock",
    name: "worldclock",
    component: WorldClockView,
  },
    {
    path: "/calculator",
    name: "calculator",
    component: CalculatorView,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
