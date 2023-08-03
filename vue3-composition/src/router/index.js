import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
  ],
});

export default router;
