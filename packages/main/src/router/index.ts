import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const libs: any = import.meta.glob('./libs/*.ts', { eager: true })

const routes: RouteRecordRaw[] = []
for (const lib in libs) {
  routes.push(...libs[lib].default)
}

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
