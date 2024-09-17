import Layout from '@/layout'

export default [
  /**
   *
   * 首页（一般为 Login 页面）
   * 整个模板默认导航地址
   */
  {
    path: '/',
    name: 'ZRLogin',
    component: () => import('@/views/login')
  },
  /**
   * App Layout 核心页面（一般为登陆后展示的页面）
   */
  {
    path: '/',
    name: 'ZRLayout',
    component: Layout,
    // 暂时写死，后面优化为动态路由方式
    children: [
      {
        path: '/dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          i18nKey: '首页',
          icon: 'dashboard',
          order: 0
        }
      }
    ]
  },
  {
    // 将匹配所有内容并将其放在 `route.params.pathMatch` 下
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('@/views/error')
  }
]
