/* eslint-disable @typescript-eslint/no-explicit-any */
export {}

import type { MessageApi, DialogApi, LoadingBarApi, NotificationApi } from 'naive-ui'
import type { AppConfig } from './modules/vite-custom-config'

export declare global {
  declare interface UnknownObjectKey {
    [propName: string]: any
  }

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

  declare interface Window {
    $message: MessageApi
    $dialog: DialogApi
    $loadingBar: LoadingBarApi
    $notification: NotificationApi
  }
}
