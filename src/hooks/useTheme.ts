import { useSettingGetters, useSettingActions } from '@/store'
import { APP_THEME } from '@/app-config'

export type ThemeLabel = 'Dark' | 'Light'

export interface AppThemeInfo {
  /**
   *
   * @description
   * 当前主题状态，true 为暗色主题，false 为明色主题
   */
  theme: boolean
  /**
   *
   * @description
   * 当前主题描述，默认描述。
   */
  themeLabel: ThemeLabel
}

const setThemeOverrides = (theme: boolean) => {
  const { getPrimaryColorOverride } = useSettingGetters()
  const { updateSettingState } = useSettingActions()

  updateSettingState(
    'primaryColorOverride',
    theme
      ? Object.assign(
          {},
          getPrimaryColorOverride.value,
          APP_THEME.appNaiveUIThemeOverrides.dark,
          APP_THEME.appNaiveUIThemeOverridesCommon.dark
        )
      : Object.assign(
          {},
          getPrimaryColorOverride.value,
          APP_THEME.appNaiveUIThemeOverrides.light,
          APP_THEME.appNaiveUIThemeOverridesCommon.light
        )
  )
}

export const useTheme = () => {
  /**
   *
   * @description
   * 获取当前主题色与主题色描述
   * 并且描述会根据当前语言环境自动切换
   *
   * @example
   * getAppTheme() // { theme: true, themeLabel: '暗色' | 'Dark' }
   * getAppTheme() // { theme: false, themeLabel: '亮色' | 'Light' }
   */
  const getAppTheme = (): AppThemeInfo => {
    const { getAppTheme } = useSettingGetters()

    return {
      theme: getAppTheme.value,
      themeLabel: getAppTheme.value ? 'Dark' : 'Light'
    }
  }

  /**
   *
   * @description
   * 切换至暗色主题
   *
   * @example
   * darkTheme()
   */
  const darkTheme = () => {
    const { updateSettingState } = useSettingActions()

    updateSettingState('appTheme', true)
    setThemeOverrides(true)
  }

  /**
   *
   * @description
   * 切换至明色主题
   *
   * @example
   * lightTheme()
   */
  const lightTheme = () => {
    const { updateSettingState } = useSettingActions()

    updateSettingState('appTheme', false)
    setThemeOverrides(false)
  }

  return { getAppTheme, darkTheme, lightTheme }
}
