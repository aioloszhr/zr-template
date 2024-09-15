import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteVueJSX from '@vitejs/plugin-vue-jsx'
import viteSvgLoader from 'vite-svg-loader'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { mixinCss, svgIconResolve } from './vite-helper'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
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
  },
  plugins: [
    vue(),
    viteVueJSX(),
    viteSvgLoader({
      defaultImport: 'url' // 默认以 url 形式导入 svg
    }),
    createSvgIconsPlugin({
      iconDirs: svgIconResolve(),
      symbolId: 'icon-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__svg__icons__dom__'
    }),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.tsx', 'src/**/*.ts'], // 指定需要检查的文件
      exclude: ['node_modules/**', 'dist/**'], // 指定不需要检查的文件
      fix: true, // 是否自动修复
      cache: false // 是否启用缓存
    })
  ],
  css: {
    preprocessorOptions: {
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
      scss: mixinCss(['./src/styles/mixins.scss', './src/styles/setting.scss'])
    }
  },
  build: {
    sourcemap: false
  }
})
