import { NFlex, NGradientText, NDropdown, NGrid, NGridItem, NCard } from 'naive-ui'
import Signing from './components/Signing'
import ThemeSwitch from '@/components/ThemeSwitch'
import { useWindowSize } from '@vueuse/core'
import { ZRIcon } from '@/components'
import { LOCAL_OPTIONS } from '@/app-config'

import './index.scss'

const Login = defineComponent({
  name: 'ZRLogin',
  setup() {
    const { height: windowHeight, width: windowWidth } = useWindowSize()
    return {
      windowHeight,
      windowWidth
    }
  },
  render() {
    return (
      <div
        class={['login']}
        style={[`height: ${this.windowHeight}px`, `--login-height: ${this.windowHeight}px`]}
      >
        <div class={['login-wrapper']}>
          <div class="login-wrapper__content">
            <NFlex align="center" class="login-title__wrapper">
              <ZRIcon name="zr" size="48" />
              <NGradientText class="login-title" type="info" size={28}>
                ZR Template
              </NGradientText>
            </NFlex>
            <NFlex align="center" class="login-action__wrapper">
              <ThemeSwitch />
              <NDropdown options={LOCAL_OPTIONS} trigger="click">
                <ZRIcon customClassName="login-icon" name="language" size="18" cursor="pointer" />
              </NDropdown>
            </NFlex>
            <NGrid cols={'s:1 m:1 l:2 xl:2 2xl:2'} itemResponsive={false} responsive="screen">
              <NGridItem span={'s:0 m:0 l:1 xl:1 2xl:1'} class="login__left-wrapper">
                <NFlex align="center" vertical>
                  <ZRIcon name="login_bg" width="368" height="368" />
                  <NGradientText class="login-title" type="info" size={36}>
                    开箱即用的中后台管理系统
                  </NGradientText>
                </NFlex>
              </NGridItem>
              <NGridItem span={1} class="login__right-wrapper">
                <NCard class="login__right-wrapper__content" embedded bordered={false}>
                  <Signing />
                </NCard>
              </NGridItem>
            </NGrid>
          </div>
        </div>
      </div>
    )
  }
})

export default Login
