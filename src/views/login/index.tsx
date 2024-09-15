import { defineComponent } from 'vue'
import { NFlex, NGradientText } from 'naive-ui'
import { useWindowSize } from '@vueuse/core'
import { ZRIcon } from '@/components'

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
          <div class={['login-wrapper__content']}>
            <NFlex align="center" class="login-title__wrapper">
              <ZRIcon name="zr" size="48" />
              <NGradientText class="login-title" type="info" size={28}>
                Ray Template
              </NGradientText>
            </NFlex>
          </div>
        </div>
      </div>
    )
  }
})

export default Login
