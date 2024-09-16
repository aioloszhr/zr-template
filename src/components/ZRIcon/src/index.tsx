import './index.scss'

import { completeSize, call } from '@/utils'
import props from './props'

export default defineComponent({
  name: 'ZRIcon',
  props,
  setup(props) {
    const symbolId = computed(() => `#${props.prefix}-${props.name}`)
    const cssVars = computed(() => {
      const cssVar = {
        '--zr-icon-width': props.width ? completeSize(props.width) : completeSize(props.size),
        '--zr-icon-height': props.height ? completeSize(props.height) : completeSize(props.size),
        '--zr-icon-depth': props.depth,
        '--zr-icon-cursor': props.cursor,
        '--zr-icon-color': props.color
      }

      return cssVar
    })

    const iconClick = (e: MouseEvent) => {
      const { onClick } = props

      if (onClick) {
        call(onClick, e)
      }
    }

    return {
      symbolId,
      cssVars,
      iconClick
    }
  },
  render() {
    return (
      <span
        class={['zr-icon', this.customClassName]}
        style={[this.cssVars]}
        onClick={this.iconClick.bind(this)}
      >
        <svg
          {...({
            ZrIconAttribute: 'zr-icon',
            ariaHidden: true
          } as object)}
        >
          <use
            {...{
              'xlink:href': this.symbolId
            }}
            fill={this.color}
          />
        </svg>
      </span>
    )
  }
})
