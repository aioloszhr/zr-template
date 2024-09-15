import { createRouter, createWebHistory } from 'vue-router'
import constantRoutes from './routes'

import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as unknown as RouteRecordRaw[]
  // scrollBehavior: (to) => {
  //   scrollViewToTop(to)
  // }
})

/**
 *
 * @param app vue instance
 *
 * @description
 * 该方法用于注册 vue-router，并且初始化一些配置方法。
 */
export const setupRouter = (app: App<Element>) => {
  app.use(router)
}
