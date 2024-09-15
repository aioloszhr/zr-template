/* eslint-disable @typescript-eslint/no-explicit-any */

export type ValidateValueType =
  | 'BigUint64Array'
  | 'BigInt64Array'
  | 'Float64Array'
  | 'Float32Array'
  | 'Uint32Array'
  | 'Int32Array'
  | 'Uint16Array'
  | 'Int16Array'
  | 'Uint8ClampedArray'
  | 'Uint8Array'
  | 'Int8Array'
  | 'DataView'
  | 'ArrayBuffer'
  | 'WeakSet'
  | 'WeakMap'
  | 'Set'
  | 'Map'
  | 'Error'
  | 'Date'
  | 'RegExp'
  | 'Object'
  | 'Array'
  | 'Function'
  | 'BigInt'
  | 'Symbol'
  | 'String'
  | 'Number'
  | 'Boolean'
  | 'Null'
  | 'Undefined'

export type BasicTypes =
  | undefined
  | null
  | boolean
  | number
  | string
  | symbol
  | bigint
  | Function
  | any[]
  | object
  | RegExp
  | Date
  | Error
  | Map<any, any>
  | Set<any>
  | WeakMap<object, any>
  | WeakSet<object>
  | ArrayBuffer
  | DataView
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array

export type AnyFC<P = any, R = any> = (...args: P[]) => R

export type MaybeArray<T> = T | T[]
