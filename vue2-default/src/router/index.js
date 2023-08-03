import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/dayList',
  },
  {
    path: '/dayList',
    name: 'DayList',
    component: () => import('@/views/DayList.vue'),
  },
  {
    path: '/wordList/:dayId(\\d+)',
    name: 'WordList',
    component: () => import('@/views/WordList.vue'),
  },
  {
    path: '/createDay',
    name: 'CreateDay',
    component: () => import('@/views/CreateDay.vue'),
  },
  {
    path: '/createWord',
    name: 'CreateWord',
    component: () => import('@/views/CreateWord.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
