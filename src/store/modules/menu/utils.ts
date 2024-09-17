/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getStorage, isValueType } from '@/utils'
import { APP_CATCH_KEY, APP_MENU_CONFIG } from '@/app-config'
import { useAppRoot } from '@/hooks'
import { ZRIcon } from '@/components'
import type { AppMenuKey, AppMenuOption } from '@/types'

/**
 *
 * @returns 获取缓存的菜单 key
 *
 * @description
 * 获取缓存的菜单 key，如果没有缓存，则返回根路径
 *
 * @example
 * getCatchMenuKey() // '/dashboard'
 */
export const getCatchMenuKey = () => {
  const { getRootPath } = useAppRoot()
  const cacheMenuKey = getStorage<AppMenuKey>(APP_CATCH_KEY.appMenuKey, 'sessionStorage', {
    defaultValue: getRootPath.value
  })

  return cacheMenuKey
}

/**
 *
 * @param node 当前节点
 * @param key 动态字段
 * @param value 匹配值
 *
 * @description
 * 检查是否为所需项。
 */
const isMatch = (node: AppMenuOption, key: string | number, value: string | number) => {
  if (!node || typeof node !== 'object') {
    return false
  }
  // @ts-ignore
  return node[key] === value
}

/**
 *
 * @param options 节点数组
 * @param key 动态字段
 * @param value 匹配值
 *
 * @description
 * 匹配所有节点。
 */
const findMatchingNodes = (
  options: AppMenuOption,
  key: string | number,
  value: string | number
) => {
  const temp: AppMenuOption[] = []

  // 检查当前节点是否匹配值
  if (isMatch(options, key, value)) {
    temp.push(options)

    return temp
  }

  // 遍历子节点
  if (options.children && options.children.length > 0) {
    for (const it of options.children) {
      // 子节点递归调用
      const innerTemp = findMatchingNodes(it, key, value)

      // 如果子节点匹配到了，则将当前节点加入数组
      if (innerTemp.length > 0) {
        temp.push(options, ...innerTemp)
      }
    }
  }

  return temp
}

/**
 *
 * @param options 节点数组
 * @param key 动态字段
 * @param value 匹配值
 *
 * @description
 * 反向查找匹配的节点，允许从子节点，查找到完整的父子节点。
 * 查找的完整节点路径，会平铺展开，返回一个一维数组。
 */
export const parseAndFindMatchingNodes = (
  options: AppMenuOption[],
  key: string | number,
  value: string | number
) => {
  const temp: AppMenuOption[] = []

  for (const it of options) {
    const innerTemp = findMatchingNodes(it, key, value)

    if (innerTemp.length > 0) {
      temp.push(...innerTemp)
    }
  }

  return temp
}

/**
 *
 * @param option menu option
 *
 * @description
 * 动态修改浏览器标题。
 * 会自动拼接 sideBarLogo.title。
 */
export const updateDocumentTitle = (option: AppMenuOption) => {
  const { breadcrumbLabel } = option

  if (!breadcrumbLabel) {
    return
  }

  const {
    layout: { sideBarLogo }
  } = __APP_CFG__
  const spliceTitle = sideBarLogo ? sideBarLogo.title : ''

  document.title = breadcrumbLabel + ' - ' + spliceTitle
}

/**
 *
 * @param option menu option
 *
 * @description
 * 创建菜单图标，接受一个 AppMenuOption 类型的参数，或者一个包含 AppMenuOption 核心数据的对象。
 *
 * @example
 * createMenuIcon({ ...AppMenuOption })
 */
export const createMenuIcon = (option: AppMenuOption) => {
  const {
    meta: { icon }
  } = option

  if (!icon) {
    return
  }

  if (isValueType<object>(icon, 'Object')) {
    return () => icon
  }

  const _icon = h(
    ZRIcon,
    {
      name: icon,
      size: APP_MENU_CONFIG.menuCollapsedIconSize,
      cursor: 'pointer'
    },
    {}
  )

  return () => _icon
}
