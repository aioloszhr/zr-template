import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useAppRoot } from '@/hooks'
import { setStorage } from '@/utils'
// import { useI18n, useAppRoot } from '@/hooks'
import { APP_CATCH_KEY } from '@/app-config'
import { useSigningActions } from '@/store'

import type { FormInst } from 'naive-ui'

export default defineComponent({
  name: 'ZRSigning',
  setup() {
    const loginFormRef = ref<FormInst>()
    const router = useRouter()
    const { signing } = useSigningActions()
    const { getRootPath } = useAppRoot()
    const loading = ref(false)

    const useSigningForm = () => ({
      name: 'ZR Admin',
      pwd: '123456'
    })

    // const router = useRouter()
    const signingForm = ref(useSigningForm())

    const rules = {
      name: {
        required: true,
        message: '请输入用户名',
        trigger: ['blur', 'input']
      },
      pwd: {
        required: true,
        message: '请输入密码',
        trigger: ['blur', 'input']
      }
    }

    /** 普通登陆形式 */
    const handleLogin = () => {
      loginFormRef.value?.validate((valid) => {
        if (!valid) {
          loading.value = true

          signing(signingForm.value)
            .then((res) => {
              if (res.code === 0) {
                setTimeout(() => {
                  window.$message.success(`欢迎${signingForm.value.name}登陆~`)

                  setStorage(APP_CATCH_KEY.token, 'tokenValue', 'localStorage')
                  setStorage(APP_CATCH_KEY.signing, res.data, 'localStorage')

                  router.push(getRootPath.value)

                  loading.value = false
                }, 2 * 1000)
              }
            })
            .catch(() => {
              window.$message.error('不可以这样哟, 不可以哟')
            })
        }
      })
    }

    return {
      signingForm,
      loginFormRef,
      handleLogin,
      rules,
      loading
    }
  },
  render() {
    const { loading } = this

    return (
      <NForm model={this.signingForm} ref="loginFormRef" rules={this.rules}>
        <NFormItem label="用户名" path="name">
          <NInput v-model:value={this.signingForm.name} placeholder="请输入用户名" />
        </NFormItem>
        <NFormItem label="密码" path="pwd">
          <NInput
            v-model:value={this.signingForm.pwd}
            type="password"
            showPasswordOn="click"
            placeholder="请输入密码"
          />
        </NFormItem>
        <NButton
          style={['width: 100%', 'margin-to: 18px']}
          type="primary"
          onClick={this.handleLogin.bind(this)}
          loading={loading}
        >
          登录
        </NButton>
      </NForm>
    )
  }
})
