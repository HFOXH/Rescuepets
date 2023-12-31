import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/login',
    name: 'Iniciar Sesion',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/adoptar',
    name: 'Adoptar',
    component: () => import('../views/Adoptar.vue')
  }
  ,
  {
    path: '/cuenta',
    name: 'Cuenta',
    component: () => import('../views/Cuenta.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
