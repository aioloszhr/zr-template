/**
 *
 * 全局注入 naive ui 提示性组件
 * 使用该组件注册后, 可以直接通过 window.$message、window.$notification、window.$dialog、window.$loadingBar 访问
 * 但是, 使用该组件注册后, 使用 window.$notification 组件时不能更改 placement 位置(只能默认右上角弹出)
 * 如果需要更改弹出位置, 需要在需要地方重新定义组件注册
 */

import { NConfigProvider, NGlobalStyle, darkTheme, createDiscreteApi } from 'naive-ui'

import { useSettingGetters } from '@/store'

export default defineComponent({
  name: 'GlobalProvider',
  setup(_, { expose }) {
    const { getPrimaryColorOverride, getAppTheme } = useSettingGetters()

    /**
     *
     * 使用 createDiscreteApi 脱离上下文 api 注入一些常用的组件
     * 通过 window.$message、window.$notification、window.$dialog、window.$loadingBar 访问
     * 但是，使用该组件注册后，使用 window.$notification 组件时不能更改 placement 位置（只能默认右上角弹出）
     *
     * 改为函数包裹，避免 `slot default invoked outside of render` 警告
     */
    const discreteApi = () => {
      const { message, notification, dialog, loadingBar } = createDiscreteApi(
        ['message', 'dialog', 'notification', 'loadingBar'],
        {
          configProviderProps: computed(() => ({
            theme: getAppTheme.value ? darkTheme : null
          }))
        }
      )

      window.$dialog = dialog // 注入 `dialog`
      window.$message = message // 注入 `message`
      window.$loadingBar = loadingBar // 注入 `loadingBar`
      window.$notification = notification // 注入 `notification`
    }

    expose()

    return {
      getPrimaryColorOverride,
      getAppTheme,
      discreteApi
    }
  },
  render() {
    const {
      $slots: { default: slotDefault },
      discreteApi
    } = this
    const { getPrimaryColorOverride, getAppTheme } = this

    return (
      <NConfigProvider
        themeOverrides={getPrimaryColorOverride}
        theme={getAppTheme ? darkTheme : null}
      >
        <NGlobalStyle />
        {slotDefault?.()}
        {discreteApi()}
      </NConfigProvider>
    )
  }
})
