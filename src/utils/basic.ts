import type { ValidateValueType, BasicTypes } from '@/types'

/**
 *
 * @param value 目标值
 * @param type 类型
 *
 * @example
 * isValueType<string>('123', 'String') // true
 * isValueType<object>({}, 'Object') // true
 * isValueType<number>([], 'Array') // true
 * isValueType<number>([], 'Object') // false
 * isValueType<undefined>(undefined, 'Undefined') // true
 * isValueType<null>(null, 'Null') // true
 */
export const isValueType = <T extends BasicTypes>(
  value: unknown,
  type: ValidateValueType
): value is T => {
  const valid = Object.prototype.toString.call(value)

  return valid.includes(type)
}

/**
 *
 * @description
 * 获取当前项目环境。
 *
 * 如果你只是想单纯的判断是否为开发环境，可以直接使用: __DEV__。
 *
 * @example
 * 是否为开发环境: __DEV__
 *
 * @example
 * // 获取 BASE_URL
 * const { BASE_URL } = getAppEnvironment()
 * // 获取 MODE，当前环境
 * const { MODE } = getAppEnvironment()
 * // 是否启用 SSR
 * const { SSR } = getAppEnvironment()
 * // 获取你自定义的配置项
 * const { your config } = getAppEnvironment()
 */
export const getAppEnvironment = () => {
  const env = import.meta.env

  return env
}
