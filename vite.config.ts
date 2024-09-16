import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import viteVueJSX from '@vitejs/plugin-vue-jsx'
import viteSvgLoader from 'vite-svg-loader'
import viteAutoImport from 'unplugin-auto-import/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { svgIconResolve } from './vite-helper'
import config from './vite.custom.config'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const { base, alias, mixinCSS, sideBarLogo, appPrimaryColor } = config

  const __APP_CFG__ = {
    layout: {
      sideBarLogo
    },
    appPrimaryColor
  }

  return {
    base: base || '/',
    define: {
      __APP_CFG__: JSON.stringify(__APP_CFG__),
      __DEV__: mode === 'development'
    },
    resolve: {
      alias
    },
    css: {
      preprocessorOptions: {
        scss: mixinCSS
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
      viteAutoImport({
        eslintrc: {
          enabled: true,
          filepath: './unplugin/.eslintrc-auto-import.json'
        },
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        dts: './unplugin/auto-imports.d.ts',
        imports: ['vue', 'vue-router', 'pinia']
        // resolvers: [NaiveUiResolver()],
      }),
      eslintPlugin({
        include: ['src/**/*.{vue,js,jsx,ts,tsx}'], // 指定需要检查的文件
        exclude: ['**/node_modules/**', 'dist/**', 'vite-env.d.ts', '*.md'], // 指定不需要检查的文件
        fix: true, // 是否自动修复
        cache: false, // 是否启用缓存
        lintOnStart: true,
        failOnError: true,
        failOnWarning: true
      })
    ]
  }
})
