import { createApp } from 'vue'
import './style.css'
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
