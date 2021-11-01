import { RouteRecordRaw } from 'vue-router'

export const dynamicRoutes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/home',
    meta: {
      isKeepAlive: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: 'message.router.home',
          isLink: '',
          isHide: false,
          isKeepAlive: true,
          isAffix: true,
          isIframe: false,
          auth: ['admin', 'test'],
          icon: 'iconfont icon-home'
        }
      }
    ]
  }
]
