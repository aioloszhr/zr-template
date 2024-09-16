/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 *
 * 声明一个任意类型的对象
 *
 * @example
 * const A: Recordable = { a: 1, b: [] }
 */
export type Recordable<T = any> = Record<string, T>
