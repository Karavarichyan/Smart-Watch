// router.js
import { createRouter, createWebHistory } from "vue-router";
import SilderView from "@/views/SilderView.vue";
import StopwatchView from "../views/StopwatchView.vue";
import TimerPage1Views from "../views/TimerPage1Views.vue";
import TimerPage2Views from "../views/TimerPage2Views.vue";
import TimerPage4Views from "../views/TimerPage4Views.vue";
import TimerPage3Views from "../views/TimerPage3Views.vue";



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
    {
      path: '/timer1',
      name: "timer1",
      component: TimerPage1Views,
    },
    {
      path: '/timer2',
      name: "timer2",
      component: TimerPage2Views,
    },
    {
      path: '/timer3',
      name: "timer3",
      component: TimerPage3Views,
    },
    {
      path: '/timer4',
      name: "timer4",
      component: TimerPage4Views,
    },
   
  ],
});

export default router;
