import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: { parser: tseslint.parser }
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off'
    }
  },
  ...pluginVue.configs['flat/essential'],
  // 自定义规则
  {
    rules: {
      indent: ['error', 2], // 缩进使用 2 个空格
      'linebreak-style': ['error', 'unix'], // 使用 Unix 风格的换行符
      quotes: ['error', 'single'], // 使用单引号
      semi: ['error', 'never'] // 语句末尾不加分号
    }
  },
  /**
   * prettier 配置
   * 会合并根目录下的prettier.config.js 文件
   * @see https://prettier.io/docs/en/options
   */
  eslintPluginPrettierRecommended
]
