/**
 *
 * 模板约定不直接操作 store 实例，所有操作都应在 hooks 中二次封装的 getters, actions
 *
 * 持久化存储 pinia 数据
 * 但是不能正常持久化 function 属性
 *
 * 官网地址:
 * @see https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 */
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import type { App } from 'vue'

// 该仓库导出，更多是为了 hooks 包中，在模板中尽量不直接操作 store 仓库
export * from './modules/setting'
export * from './modules/signing'
// 导出 getters, actions
export * from './hooks/useSettingStore'
export * from './hooks/useSigningStore'

/**
 *
 * 设置并且注册 pinia
 * pinia 天生支持在非 setup 环境中使用，只要在调用时已经注册
 */
export const setupStore = (app: App<Element>) => {
  const store = createPinia()

  app.use(store)
  store.use(piniaPluginPersistedstate)
}
