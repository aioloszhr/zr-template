import { watchOnce } from '@vueuse/core'
import { APP_THEME, APP_CATCH_KEY } from '@/app-config'

import type { SettingState } from './type'

export const piniaSettingStore = defineStore(
  'setting',
  () => {
    const {
      appPrimaryColor: { primaryColor }
    } = __APP_CFG__ // 默认主题色

    const settingState = reactive<SettingState>({
      appTheme: false, // true 为黑夜主题, false 为明亮主题
      primaryColorOverride: {
        common: {
          primaryColor: primaryColor,
          primaryColorHover: primaryColor,
          primaryColorPressed: primaryColor
        }
      }
    })

    /**
     *
     * 初始化合并自定义主题色
     * 该方法会在初始化时执行一次，之后会在切换主题色时执行
     */
    watchOnce(
      () => settingState.appTheme,
      (ndata) => {
        ndata
          ? (settingState.primaryColorOverride = Object.assign(
              {},
              settingState.primaryColorOverride,
              APP_THEME.appNaiveUIThemeOverrides.dark,
              APP_THEME.appNaiveUIThemeOverridesCommon.dark
            ))
          : (settingState.primaryColorOverride = Object.assign(
              {},
              settingState.primaryColorOverride,
              APP_THEME.appNaiveUIThemeOverrides.light,
              APP_THEME.appNaiveUIThemeOverridesCommon.light
            ))
      },
      {
        immediate: true
      }
    )

    return {
      ...toRefs(settingState)
    }
  },
  {
    persist: {
      key: APP_CATCH_KEY.appPiniaSettingStore
    }
  }
)
