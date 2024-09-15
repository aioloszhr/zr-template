import { APP_REGEX } from '@/app-config'
import { isValueType, unrefElement, effectDispose } from '@/utils'

import type { BasicTarget } from '@/types'

/**
 *
 * @param size css size
 * @param unit 自动填充 css 尺寸单位
 *
 * @description
 * 自动补全尺寸。
 */
export const completeSize = (size: number | string, unit = 'px') => {
  if (size === 'auto') {
    return size
  }

  if (typeof size === 'number') {
    return size.toString() + unit
  } else if (isValueType<string>(size, 'String') && APP_REGEX.cssUnit.test(size)) {
    return size
  } else {
    return size + unit
  }
}

/**
 *
 * @param color 颜色格式
 * @param alpha 透明度
 *
 * @description
 * 将任意颜色值转为 rgba，如果本身为 rgba 或者其它非法颜色值则直接返回。
 *
 * @example
 * colorToRgba('#123632', 0.8) // rgba(18, 54, 50, 0.8)
 * colorToRgba('rgb(18, 54, 50)', 0.8) // rgba(18, 54, 50, 0.8)
 * colorToRgba('#ee4f12', 0.3) // rgba(238, 79, 18, 0.3)
 * colorToRgba('rgba(238, 79, 18, 0.3)', 0.3) // rgba(238, 79, 18, 0.3)
 * colorToRgba('not a color', 0.3) // not a color
 */
export const colorToRgba = (color: string, alpha = 1) => {
  if (color.includes('rgba')) {
    return color
  }

  if (color.includes('rgb')) {
    return color.replace('rgb', 'rgba').replace(')', `, ${alpha})`)
  }

  if (color.includes('#')) {
    const hex = color.replace('#', '')

    switch (hex.length) {
      case 3:
        return `rgba(${parseInt(hex[0] + hex[0], 16)}, ${parseInt(hex[1] + hex[1], 16)}, ${parseInt(hex[2] + hex[2], 16)}, ${alpha})`

      case 6:
        return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${alpha})`

      case 8:
        return `rgba(${parseInt(hex.slice(0, 2), 16)}, ${parseInt(hex.slice(2, 4), 16)}, ${parseInt(hex.slice(4, 6), 16)}, ${(parseInt(hex.slice(6, 8), 16) / 255).toFixed(2)})`

      default:
        return color
    }
  }

  return color
}

/**
 *
 * @param target 目标元素或 ref 注册元素
 * @param className 所需删除类名
 *
 * @description
 * 为目标元素删除类名。
 *
 * @example
 * // targetDom 当前 class: a-class b-class
 * removeClass(targetDom, 'a-class') // b-class
 * removeClass(targetDom, ['a-class', 'b-class']) // null
 * removeClass(targetDom, 'removeAllClass') // null
 */
export const removeClass = (
  target: BasicTarget<Element | HTMLElement | SVGAElement>,
  classNames: string | 'removeAllClass' | string[]
) => {
  const update = () => {
    const element = unrefElement(target)

    if (element) {
      if (classNames === 'removeAllClass') {
        const classList = element.classList

        classList.forEach((curr) => classList.remove(curr))
      } else {
        const classes = typeof classNames === 'string' ? classNames.trim().split(' ') : classNames

        classes.forEach((item) => {
          if (item) {
            element.classList.remove(item)
          }
        })
      }
    }
  }

  const watcher = watch(() => unrefElement(target), update, {
    immediate: true
  })

  effectDispose(watcher)
}

/**
 *
 * @param target 目标元素或 ref 注册元素
 * @param classNames 所需添加类名
 *
 * @description
 * 为目标元素添加类名。
 *
 * @example
 * // targetDom 当前 class: a-class b-class
 * setClass(targetDom, 'c-class') // a-class b-class c-class
 * setClass(targetDom, ['c-class', 'c-class']) // a-class b-class c-class
 */
export const setClass = (
  target: BasicTarget<Element | HTMLElement | SVGAElement>,
  classNames: string | string[]
) => {
  const update = () => {
    const element = unrefElement(target)

    if (element) {
      const classes = typeof classNames === 'string' ? classNames.trim().split(' ') : classNames

      classes.forEach((item) => {
        if (item) {
          element.classList.add(item)
        }
      })
    }
  }

  const watcher = watch(() => unrefElement(target), update, {
    immediate: true
  })

  effectDispose(watcher)
}
