/*
 *@description: 扫描路由配置
 *@author: zyc
 *@date-time: 2023-09-11 19:08:04
 */

import { isArray } from 'lodash-es'
import { RouteRecordRaw } from 'vue-router'

export function genRoutes(): RouteRecordRaw[] {
  const configList = import.meta.glob<RouteRecordRaw | RouteRecordRaw[]>('@/pages/**/config.ts', {
    eager: true,
    import: 'default'
  })
  const keys = Object.keys(configList)
  const result: RouteRecordRaw[] = []
  for (const key of keys) {
    const config = configList[key]
    if (isArray(config)) {
      result.push(...config)
    } else {
      result.push(config)
    }
  }
  return result
}
