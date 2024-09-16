export const SETUP_ROUTER_ACTION = {
  /** 是否启用路由切换时顶部加载条 */
  setupRouterLoadingBar: true,
  /** 是否启用路由守卫, 如果设置为 false 则不会触发路由切换校验 */
  setupRouterGuard: true
} as const

/**
 *
 * @description
 * 路由白名单(不进行权限校验路由)
 *
 * 路由表单白名单
 *
 * 如果需要启用该功能, 则需要配置路由 name 属性, 并且需要一一对应(对大小写敏感)
 * 并且在配置 route name 属性时, 如果 name 类型为 symbol 的话, 会认为该路由永远不与白名单列表进行匹配
 */
export const WHITE_ROUTES: string[] = ['ZRLogin', 'ErrorPage']

/**
 *
 * @description
 * 超级管理员
 * 配置默认超级管理员, 默认拥有全部最高权限
 */
export const SUPER_ADMIN: (string | number)[] = ['admin']
