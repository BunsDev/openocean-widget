import Vue from 'vue'
import VueRouter from 'vue-router'

const Classic = () => import('../pages/ClassicV3/index.vue')

import init from '../init'
Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    redirect: "/classic"
  },
  {
    path: '/classic',
    name: 'Classic',
    component: Classic,
  },
  {
    path: '*',
    redirect: '/',
  },
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  window.addEventListener('load', () => {
    init();
  });
  return next();
})

export default router
