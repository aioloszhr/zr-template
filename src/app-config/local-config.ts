import type { LocalOptions } from '@/types'

/**
 *
 * 语言包语种添加后, 需要在此文件配置语言包
 * 该配置中的 key 也会影响 naiveLocales 方法, 配置后请仔细核对一下
 *
 * 添加新的语言包后, 如果需要其类型提示, 需要在 AppCurrentAppMessages 中添加新的类型
 */
export const LOCAL_OPTIONS: LocalOptions = [
  {
    key: 'zh-CN',
    label: '中文(简体)'
  },
  {
    key: 'en-US',
    label: 'English(US)'
  }
]
