import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/register",
    name: "register",
    component: () => import('../views/Register.vue')
  },
  {
    path: "/itens",
    name: "itens",
    component: () => import('../views/Itens.vue')
  },
  {
    path: "/conta",
    name: "conta",
    component: () => import('../views/Conta.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;