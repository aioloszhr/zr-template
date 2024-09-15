import type { VNodeChild } from 'vue'
import type { ServerOptions, BuildOptions, AliasOptions, UserConfigExport } from 'vite'
import type { GlobalThemeOverrides } from 'naive-ui'

export interface PreloadingConfig {
  title?: string
  tagColor?: string
  titleColor?: string
}

export interface HTMLTitle {
  name: string
  transformIndexHtml: (title: string) => string
}

export type LayoutCopyright = string | number | VNodeChild

export interface LayoutSideBarLogo {
  icon?: string | VNode
  title?: string
  url?: string
  jumpType?: 'station' | 'outsideStation'
}

export interface AppPrimaryColor {
  primaryColor: string
  primaryFadeColor: string
}

export interface Config {
  server?: ServerOptions
  buildOptions?: (mode: string) => BuildOptions
  alias: AliasOptions
  title: HTMLTitle
  copyright?: LayoutCopyright
  sideBarLogo?: LayoutSideBarLogo
  mixinCSS?: string
  preloadingConfig?: PreloadingConfig
  base?: string
  appPrimaryColor?: AppPrimaryColor
}

export type AppConfigExport = Config & UserConfigExport

export interface AppTheme {
  appThemeColors: string[]
  appPrimaryColor: AppPrimaryColor
  appNaiveUIThemeOverrides: {
    dark: GlobalThemeOverrides
    light: GlobalThemeOverrides
  }
  echartTheme: string
  appNaiveUIThemeOverridesCommon: {
    dark: GlobalThemeOverrides['common']
    light: GlobalThemeOverrides['common']
  }
}

/**
 *
 * 全局注入配置
 *
 * 使用示例:
 * const { layout } = __APP_CFG__
 */
export interface AppConfig {
  layout: {
    sideBarLogo?: LayoutSideBarLogo
  }
  base?: string
  appPrimaryColor: AppPrimaryColor
}
