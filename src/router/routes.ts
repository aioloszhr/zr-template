export default [
  /**
   *
   * 首页（一般为 Login 页面）
   * 整个模板默认导航地址
   */
  {
    path: '/',
    name: 'ZRLogin',
    component: () => import('@/views/login/index.vue')
  }
]
