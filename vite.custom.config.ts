/**
 *
 * 系统配置文件入口
 *
 * 配置范围:
 *   - 构建: 开发构建、打包构建、预览构建、体积分析构建等
 *   - 系统: 根路由、标题、浏览器标题、别名等
 *   - 请求: 代理配置
 *
 * 如果需要新增相关内容, 需要在 src/types/modules/viteCustomConfig.ts 中进行类型配置
 * ```
 * interface Config // config 内容类型配置
 *
 * interface AppConfig // __APP_CFG__ 内容配置
 * ```
 *
 * __APP_CFG__ 说明
 * ```
 * 该属性是用于全局注入的配置方法
 *
 * const { appPrimaryColor } = __APP_CFG__
 *
 * 以上例子展示, 从 __APP_CFG__ 中解构取出 appPrimaryColor 根路由配置信息
 * __APP_CFG__ 会被挂载于全局变量 `window` 下(vite define 默认是挂载于 window 下)
 * ```
 */

import path from 'node:path'

import { htmlTitlePlugin, mixinCss } from './vite-helper'
import { APP_THEME } from './src/app-config'
import { PRE_LOADING_CONFIG } from './src/app-config'

import type { AppConfigExport } from './src/types'

const config: AppConfigExport = {
  /** 公共基础路径配置, 如果为空则会默认以 '/' 填充 */
  base: '/zr-template/',
  /** 默认主题色(不可省略, 必填), 也用于 ejs 注入 */
  appPrimaryColor: APP_THEME.appPrimaryColor,
  /**
   *
   * 预处理全局需要注入的 css 文件
   *
   * 预设:
   *   - ./src/styles/mixins.scss
   *   - ./src/styles/setting.scss
   *
   * 如果需要删除或者修改, 需要同步修改目录下的 css 文件
   */
  mixinCSS: mixinCss(['./src/styles/mixins.scss', './src/styles/setting.scss']),
  /**
   *
   * 浏览器标题
   */
  title: htmlTitlePlugin(PRE_LOADING_CONFIG.title || 'ZR Template'),
  /**
   *
   * 预设别名
   * - @: src 根目录
   * - @api: src/axios/api 根目录
   * - @images: src/assets/images 根目录
   * - @mock: mock 根目录
   */
  alias: {
    '@': path.resolve(__dirname, './src')
  }
}

export default config
