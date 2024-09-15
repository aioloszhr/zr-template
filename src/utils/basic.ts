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
