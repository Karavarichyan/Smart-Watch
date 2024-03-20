import SilderView from "@/views/SilderView.vue";
import { createRouter, createWebHistory } from "vue-router";
import StopwatchView from "../views/StopwatchView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "slider",
      component: SilderView,
    },
    {
      path: "/stopwatch",
      name: "stopwatch",
      component: StopwatchView,
    },
  ],
});

export default router;
