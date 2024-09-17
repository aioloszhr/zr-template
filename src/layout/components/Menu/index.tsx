import { NLayoutSider, NMenu } from 'naive-ui'
import { useMenuGetters } from '@/store'

import type { MenuInst } from 'naive-ui'

export default defineComponent({
  name: 'AppMenu',
  setup() {
    const menuRef = ref<MenuInst | null>(null)

    const { getMenuOptions, getCollapsed, getMenuKey } = useMenuGetters()

    console.log('getMenuOptions', getMenuOptions.value)

    const BasicMenu = () => (
      <NLayoutSider class="app-menu__sider" nativeScrollbar={false} collapsed={getCollapsed.value}>
        <NMenu
          ref={menuRef}
          class="r-menu--app"
          keyField="fullPath"
          v-model:value={getMenuKey.value}
          options={getMenuOptions.value}
          collapsed={getCollapsed.value}
        />
      </NLayoutSider>
    )

    return {
      BasicMenu
    }
  },
  render() {
    const { BasicMenu } = this

    return <BasicMenu />
  }
})
