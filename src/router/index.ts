import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../layouts/default"),
    children: [
      {
        path: "table/:database/:table",
        name: "table-detail",
        component: () => import("../views/table"),
      },
    ],
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
