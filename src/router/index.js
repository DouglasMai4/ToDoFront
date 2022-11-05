import { createWebHistory, createRouter } from "vue-router"
import { supabase } from '../supabase'

import Home from "../views/Home.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import('../views/Login.vue')
  },
  {
    path: "/register",
    name: "Register",
    component: () => import('../views/Register.vue')
  },
  {
    path: "/itens",
    name: "Itens",
    component: () => import('../views/Itens.vue')
  },
  {
    path: "/conta",
    name: "Conta",
    component: () => import('../views/Conta.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const { data, error } = await supabase.auth.getSession()

  if (
    !data.session &&
    to.name !== 'Login' &&
    to.name !== 'Register' &&
    to.name !== 'Home'
  ) {
    return { name: 'Login' }
  } else if (
    data.session && to.name === 'Login' ||
    data.session && to.name === 'Register'
  ) {
    return { name: 'Itens' }
  }
})

export default router;