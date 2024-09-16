import { NFlex, NTooltip, NSwitch } from 'naive-ui'
import { useTheme } from '@/hooks'
import { useSettingGetters } from '@/store'
import { ZRIcon } from '../ZRIcon'

export default defineComponent({
  name: 'ThemeSwitch',
  setup() {
    const { darkTheme, lightTheme } = useTheme()
    const { getAppTheme } = useSettingGetters()
    const modelAppThemeRef = ref(getAppTheme.value)

    const railStyle = ({ checked }: { checked: boolean }) => {
      return checked
        ? {
            backgroundColor: '#000000'
          }
        : {
            color: '#000000'
          }
    }

    return {
      darkTheme,
      lightTheme,
      getAppTheme,
      railStyle,
      modelAppThemeRef
    }
  },
  render() {
    const { darkTheme, lightTheme, railStyle } = this
    return (
      <NFlex justify="center">
        <NTooltip>
          {{
            trigger: () => (
              <NSwitch
                v-model:value={this.modelAppThemeRef}
                railStyle={railStyle.bind(this)}
                onUpdateValue={(bool: boolean) => (bool ? darkTheme() : lightTheme())}
              >
                {{
                  'checked-icon': () => <ZRIcon name="dark" />,
                  'unchecked-icon': () => <ZRIcon name="light" />,
                  checked: () => '亮',
                  unchecked: () => '暗'
                }}
              </NSwitch>
            ),
            default: () => (this.getAppTheme ? '暗色' : '明亮')
          }}
        </NTooltip>
      </NFlex>
    )
  }
})
