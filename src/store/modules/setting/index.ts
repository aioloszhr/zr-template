import { watchOnce } from '@vueuse/core'
import { APP_THEME, APP_CATCH_KEY } from '@/app-config'

import type { SettingState } from './type'
import type { AnyFC } from '@/types'

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
      },
      appRootRoute: {
        name: 'Dashboard',
        path: '/dashboard'
      }
    })

    /**
     *
     * @param key settingState 的 key
     * @param value settingState 的 value
     * @param cb 回调函数
     *
     * 更新 settingState 的值，如果 key 不存在于 settingState 中，则不会更新
     * 但是不论是否更新成功，都会执行回调函数
     *
     * @example
     * updateSettingState('drawerPlacement', 'left')
     * updateSettingState('appTheme', true)
     */
    const updateSettingState = <
      T extends keyof SettingState,
      V extends typeof settingState,
      C extends AnyFC
    >(
      key: T,
      value: V[T],
      cb?: C
    ) => {
      if (Object.hasOwn(settingState, key)) {
        settingState[key] = value
      }

      cb?.()
    }

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
      ...toRefs(settingState),
      updateSettingState
    }
  },
  {
    persist: {
      key: APP_CATCH_KEY.appPiniaSettingStore
    }
  }
)
