import { createRouter, createWebHashHistory } from 'vue-router'
import { genRoutes } from './utils/scan'

const router = createRouter({
  history: createWebHashHistory(),
  routes: genRoutes()
})

export default router
