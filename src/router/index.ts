import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Session } from '@/utils/storage'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: dynamicRoutes
})

/**
 * 把嵌套的多级路由改一维的路由
 * @param array 有嵌套的多级路由
 * @returns 处理后的一维路由数组
 */
export function formatFlatteningRoutes (array:Array<RouteRecordRaw>): boolean | RouteRecordRaw[] {
  if (array.length <= 0) return false
  for (let index = 0; index < array.length; index++) {
    if (array[index].children) {
      array = array.slice(0, index + 1).concat(array[index].children as RouteRecordRaw[], array.slice(index + 1))
    }
  }
  return array
}

router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  if (to.meta.title) NProgress.start()
  const token = Session.get('token')
  if (to.path === '/login' && !token) {
    next()
    NProgress.done()
  } else {
    if (!token) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
      Session.clear()
    }
  }
})

export default router
