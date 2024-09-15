import { get } from 'lodash-es'
import { getStorage, colorToRgba, removeClass, setClass } from '@/utils'
import { APP_CATCH_KEY } from '@/app-config'
import { useSettingGetters } from '@/store'
import type { SettingState } from '@/store/modules/setting/type'

export default defineComponent({
  name: 'AppStyleProvider',
  setup: (_props, { expose }) => {
    const { getAppTheme } = useSettingGetters()

    /** 同步主题色变量至 body, 如果未获取到缓存值则已默认值填充 */
    const syncPrimaryColorToBody = () => {
      const {
        appPrimaryColor: { primaryColor, primaryFadeColor }
      } = __APP_CFG__ // 默认主题色
      const body = document.body

      const primaryColorOverride = getStorage<SettingState>(
        APP_CATCH_KEY.appPiniaSettingStore,
        'localStorage'
      ) // 获取缓存 naive ui 配置项

      if (primaryColorOverride) {
        const p = get(
          primaryColorOverride,
          'primaryColorOverride.common.primaryColor',
          primaryColor
        ) // 获取主色调
        const fp = colorToRgba(p, 0.38) // 将主色调任意颜色转换为 rgba 格式

        /** 设置全局主题色 css 变量 */
        body.style.setProperty('--zr-theme-primary-color', p) // 主色调
        body.style.setProperty('--zr-theme-primary-fade-color', fp || primaryFadeColor) // 降低透明度后的主色调
      }
    }

    /** 切换主题时, 同步更新 body class 以便于进行自定义 css 配置 */
    const updateGlobalThemeClass = (bool: boolean) => {
      /**
       *
       * 初始化时根据当前主题色进行初始化 body 的 class 属性
       *
       * 根据 getAppTheme 进行初始化
       */
      const body = document.body
      const darkClassName = 'zr-template--dark' // 暗色类名
      const lightClassName = 'zr-template--light' // 明亮色类名

      bool ? removeClass(body, lightClassName) : removeClass(body, darkClassName)

      setClass(body, bool ? darkClassName : lightClassName)
    }

    syncPrimaryColorToBody()

    // 当切换主题时，更新 body 当前的注入 class
    watch(
      () => getAppTheme.value,
      (ndata) => {
        updateGlobalThemeClass(ndata)
      },
      {
        immediate: true
      }
    )

    expose()
  },
  render() {
    console.log('this', this)
    return <div class="app-style-provider"></div>
  }
})
