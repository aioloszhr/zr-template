import type { GlobalThemeOverrides } from 'naive-ui'

export interface AppRootRoute {
  name: string
  path: string
}

export interface SettingState {
  appTheme: boolean
  primaryColorOverride: GlobalThemeOverrides
  appRootRoute: AppRootRoute
}
