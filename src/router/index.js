import Vue from 'vue'
import firebase from 'firebase'
import VueRouter from 'vue-router'
import { log } from 'util';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
    meta: { 
      guest: true
    }
  },
  {
    path: '/admin',
    redirect: '/admin/home'
  },
  {
    path: '/admin/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/Home.vue'),
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/admin/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "User" */ '../views/User.vue'),
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/admin/user/create',
    name: 'user-add',
    component: () => import(/* webpackChunkName: "User" */ '../views/UserAdd.vue'),
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/admin/user/:id',
    name: 'user-manage',
    component: () => import(/* webpackChunkName: "UserManage" */ '../views/UserManage.vue'),
    meta: {
      requiresAuth : true
    },
  },
  {
    path: '/admin/products',
    name: 'products',
    component: () => import(/* webpackChunkName: "Products" */ '../views/Products.vue'),
    meta: {
      requiresAuth : true
    }
  },
  {
    path: '/admin/products/:id',
    name: 'products-manage',
    component: () => import(/* webpackChunkName: "ProductsManage" */ '../views/ProductsManage.vue'),
    meta: {
      requiresAuth : true
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) =>{
  // console.log(localStorage.getItem("isLogin"));
  const currentUser = localStorage.getItem("isLogin")
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const guest = to.matched.some(record => record.meta.guest)

  if(requiresAuth){
    if(currentUser == 'null'){
      next({name : 'login'})
    }else{
      next()
    }
  }else if(guest){
    if(currentUser == 'null'){
      next()
    }else{
      next({name : 'home'})
    }
  }else{
    next()
  }
})

export default router
