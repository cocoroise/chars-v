import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/index",
    name: "index",
    hidden: true,
    component: () => import(/* webpackChunkName: "login" */ "../views/main/index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
