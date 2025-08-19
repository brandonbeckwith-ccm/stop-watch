import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Stopwatch from "../components/Stopwatch.vue";
import WorldClock from "../views/WorldClock.vue";

const routes = [
  { path: "/", name: "Welcome", component: Welcome },
  { path: "/stopwatch", name: "Stopwatch", component: Stopwatch },
  { path: "/world-clock", name: "WorldClock", component: WorldClock },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
