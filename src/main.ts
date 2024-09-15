import { createApp } from 'vue'
import 'virtual:svg-icons-register' // vite-plugin-svg-icons 脚本，启用 svg 雪碧图
import '@/styles/base.scss' // 初始化一些基础样式
import App from './App'
import { setupRouter } from './router'

import type { App as AppType } from 'vue'

/**
 *
 * @param inst vue instance
 *
 * @description
 * 该方法注册所有模板插件。
 *
 * 注册时应该注意每个插件的加载顺序。
 */
const setupPlugins = async (inst: AppType<Element>) => {
  // 注册路由
  setupRouter(inst)
}

const setupTemplate = async () => {
  const app = createApp(App)
  await setupPlugins(app)
  app.mount('#app')
}

setupTemplate()
