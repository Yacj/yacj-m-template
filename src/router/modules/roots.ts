import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '/',
    redirect: '/home',
    component: () => import('@/layouts/index.vue'),
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/index.vue'),
        meta: {
          title: '首页',
          showTabbar: true,
        },
      },
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('@/pages/user.vue'),
        meta: {
          title: '个人中心',
        },
      },
    ],
  },
]
export default routes
