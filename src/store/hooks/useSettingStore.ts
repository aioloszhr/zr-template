import { piniaSettingStore } from '../modules/setting'

export const useSettingGetters = () => {
  const variable = piniaSettingStore()
  /**
   *
   * @description
   * 获取 app 主题。
   */
  const getAppTheme = computed(() => variable.appTheme)

  /**
   *
   * @description
   * 获取 Naive UI 覆盖配置。
   */
  const getPrimaryColorOverride = computed(() => variable.primaryColorOverride)

  return {
    getAppTheme,
    getPrimaryColorOverride
  }
}

export const useSettingActions = () => {
  const { updateSettingState } = piniaSettingStore()
  return { updateSettingState }
}
