import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // eslint插件配置
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/**/*.ts'], // 指定需要检查的文件
      exclude: ['node_modules/**', 'dist/**'], // 指定不需要检查的文件
      fix: true, // 是否自动修复
      cache: false // 是否启用缓存
    })
  ]
})
