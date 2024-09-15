import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteVueJSX from '@vitejs/plugin-vue-jsx'
import path from 'node:path'

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
    vue(), // eslint插件配置
    viteVueJSX(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'], // 指定需要检查的文件
      exclude: ['node_modules/**', 'dist/**'], // 指定不需要检查的文件
      fix: true, // 是否自动修复
      cache: false // 是否启用缓存
    })
  ]
})
