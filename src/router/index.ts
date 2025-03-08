import { createRouter, createWebHistory } from "vue-router";
import Meters from "../pages/Meters.vue";
import Readings from "../pages/Readings.vue";
import Bills from "../pages/Bills.vue";
import Tariffs from "../pages/Tariffs.vue";

const routes = [
  { path: "/", name: "meters", component: Meters },
  { path: "/readings/:meterId/:meterNumber", name: "readings", component: Readings, props: true },
  { path: "/bills/:meterId/:meterNumber", name: "bills", component: Bills, props: true },
  { path: "/tariffs", name: "tariffs", component: Tariffs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
