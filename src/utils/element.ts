import { APP_REGEX } from '@/app-config'
import { isValueType } from '@/utils'

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
