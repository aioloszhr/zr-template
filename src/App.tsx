import { RouterView } from 'vue-router'
import AppGlobalSpin from '@/app-components/app/AppGlobalSpin'
import AppStyleProvider from '@/app-components/provider/AppStyleProvider'
import AppNaiveGlobalProvider from './app-components/provider/AppNaiveGlobalProvider'

export default defineComponent({
  name: 'App',
  render() {
    return (
      <AppNaiveGlobalProvider>
        <AppStyleProvider />
        <AppGlobalSpin>
          {{
            default: () => <RouterView />
          }}
        </AppGlobalSpin>
      </AppNaiveGlobalProvider>
    )
  }
})
