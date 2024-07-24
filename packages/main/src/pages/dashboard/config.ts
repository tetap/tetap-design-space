import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'main',
  path: '/',
  redirect: '/dashboard',
  component: () => import('@/layout/BasicLayout.vue'),
  children: [
    {
      name: 'dashboard',
      path: 'dashboard',
      meta: {},
      component: () => import('@/pages/dashboard/src/home.vue')
    },
    {
      name: 'setting',
      path: 'setting',
      meta: {},
      component: () => import('@/pages/dashboard/src/setting.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/pages/dashboard/src/notFound.vue')
    }
  ]
} as unknown as RouteRecordRaw
