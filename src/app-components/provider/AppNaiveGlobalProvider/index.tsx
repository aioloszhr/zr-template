/**
 *
 * 全局注入 naive ui 提示性组件
 * 使用该组件注册后, 可以直接通过 window.$message、window.$notification、window.$dialog、window.$loadingBar 访问
 * 但是, 使用该组件注册后, 使用 window.$notification 组件时不能更改 placement 位置(只能默认右上角弹出)
 * 如果需要更改弹出位置, 需要在需要地方重新定义组件注册
 */

import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui'

import { useSettingGetters } from '@/store'

export default defineComponent({
  name: 'GlobalProvider',
  setup(_, { expose }) {
    const { getPrimaryColorOverride, getAppTheme } = useSettingGetters()

    expose()

    return {
      getPrimaryColorOverride,
      getAppTheme
    }
  },
  render() {
    const {
      $slots: { default: slotDefault }
    } = this
    const { getPrimaryColorOverride, getAppTheme } = this

    return (
      <NConfigProvider
        themeOverrides={getPrimaryColorOverride}
        theme={getAppTheme ? darkTheme : null}
      >
        <NGlobalStyle />
        {slotDefault?.()}
      </NConfigProvider>
    )
  }
})
