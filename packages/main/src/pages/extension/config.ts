import { RouteRecordRaw } from 'vue-router'

export default {
  name: 'extension',
  path: '/extension/:name',
  component: () => import('@/pages/extension/src/extension.vue')
} as unknown as RouteRecordRaw
