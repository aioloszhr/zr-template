/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

import type { AppConfig } from './modules/vite-custom-config'

export declare global {
  namespace JSX {
    export interface Element extends VNode {}
    export interface ElementClass {
      $props: {}
    }
    export interface ElementAttributesProperty {
      $props: {}
    }
    export interface IntrinsicElements extends NativeElements {
      // allow arbitrary elements
      [name: string]: any
    }
    export interface IntrinsicAttributes extends ReservedProps {}
  }

  declare const __DEV__: boolean

  declare const __APP_CFG__: AppConfig
}
