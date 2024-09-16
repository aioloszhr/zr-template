import type { AppRouteRecordRaw } from '@/router/types'

const dashboard: AppRouteRecordRaw = {
  path: '/dashboard',
  component: () => import('@/views/dashboard'),
  meta: {
    icon: 'dashboard',
    order: 0
  }
}

export default dashboard
