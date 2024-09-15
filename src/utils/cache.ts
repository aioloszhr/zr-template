import { APP_CATCH_KEY_PREFIX } from '@/app-config'

import type { StorageLike, StorageOptions } from '@/types'

/**
 *
 * @param key 需要删除的缓存值key
 * @param type 需要删除的缓存类型
 * @param options 配置项
 *
 * @description
 * 获取缓存值。
 *
 * 默认获取 sessionStorage。
 *
 * 如果 key 为空，则会打印错误信息。
 *
 * @example
 * getStorage('demo') // 获取 session 中 demo 缓存字段
 * getStorage('demo', 'localStorage') // 获取 local 中 demo 缓存字段
 * getStorage('demo', 'sessionStorage', { prefix: true, prefixKey: 'ray' }) // 获取 session 中 ray_demo 缓存字段
 */
function getStorage<T = unknown>(
  key: string,
  storageType: StorageLike = 'sessionStorage',
  options?: StorageOptions<T>
): T | null {
  const { prefix, prefixKey, defaultValue } = options ?? {}
  const _prefix = prefix ? prefixKey || APP_CATCH_KEY_PREFIX : ''

  try {
    const data =
      storageType === 'localStorage'
        ? window.localStorage.getItem(_prefix + key)
        : window.sessionStorage.getItem(_prefix + key)

    if (data === null) {
      return defaultValue ?? null
    }

    return JSON.parse(data) as T
  } catch (error) {
    console.error(`[getStorage]: Failed to get stored data for key '${key}'`, error)

    return defaultValue ?? null
  }
}

export { getStorage }
