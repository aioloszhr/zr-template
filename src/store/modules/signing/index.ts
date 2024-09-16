import { isEmpty } from 'lodash-es'
import { APP_CATCH_KEY } from '@/app-config'
import { removeStorage } from '@/utils'

import type { SigningCallback, SigningForm, SigningResponse } from './type'

export const piniaSigningStore = defineStore(
  'signing',
  () => {
    const state = reactive({
      /**
       *
       * 登陆返回信息(可以存放用户名、权限、头像等一些信息)
       * 路由鉴权依赖该属性中的 role 属性, 如果需要更改请同步更改: router/basic.ts、router/permission.ts
       */
      signingCallback: {} as SigningCallback
    })

    /**
     * 模拟登录接口
     * @param SigningForm 用户登录信息
     *
     * @description
     * 0: 登陆成功, 1: 登陆失败
     */
    const signing = (SigningForm: SigningForm): Promise<SigningResponse> => {
      return new Promise((resolve, reject) => {
        if (!isEmpty(SigningForm)) {
          state.signingCallback = {
            role: 'admin',
            name: SigningForm.name,
            avatar: 'https://avatars.githubusercontent.com/u/51957438?v=4'
          }

          resolve({
            code: 0,
            message: '登陆成功',
            data: state.signingCallback
          })
        } else {
          reject({
            code: 1,
            message: '登陆失败',
            data: null
          })
        }
      })
    }

    /**
     *
     * 退出登陆并且清空缓存数据
     * 延迟 300ms 后强制刷新当前系统
     */
    const logout = () => {
      // const { closeAll } = useSiderBar()
      const { appPiniaMenuStore, appPiniaSigningStore } = APP_CATCH_KEY

      // 提示信息
      // window.$message.info('账号退出中...')
      // 移除所有 sessionStorage 缓存
      removeStorage('__all_sessionStorage__', 'sessionStorage')
      // 移除指定 localStorage 缓存
      removeStorage(appPiniaMenuStore, 'localStorage')
      removeStorage(appPiniaSigningStore, 'localStorage')
      // 关闭所有侧边栏标签
      // closeAll()
      // 延迟 300ms 后强制刷新当前系统
      setTimeout(() => window.location.reload())
    }

    return {
      ...toRefs(state),
      signing,
      logout
    }
  },
  {
    persist: {
      key: APP_CATCH_KEY.appPiniaSigningStore,
      storage: window.localStorage
    }
  }
)
