import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { dynamicRoutes } from './route'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Session } from '@/utils/storage'
import { store } from '@/store'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: dynamicRoutes
})

/**
 * 定义404界面
 */
const pathMatch = {
  path: '/:path(.*)*',
  redirect: '/404'
}

/**
 * 添加动态路由
 */
export function setAddRoute (): void {
  let filteredRoutes = setFilterRouteEnd()
  if (filteredRoutes) {
    filteredRoutes = filteredRoutes as RouteRecordRaw[]
    filteredRoutes.forEach((route:RouteRecordRaw) => {
      const routeName = route.name
      routeName && !router.hasRoute(routeName) && router.addRoute(route)
    })
  }
}

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

/**
 * 一维数组处理成二级，keep-alive支持二级缓存
 * @param arr 一维路由菜单数组
 * @returns 返回一维数组处理成`定义动态路由(dynamicRoutes)`的格式
 */
export function formtTwoStageRoutes (arr:RouteRecordRaw[]): boolean | RouteRecordRaw[] {
  if (arr.length <= 0) return false
  const newArr: RouteRecordRaw[] = []
  const cacheList: string[] = []
  arr.forEach((v:RouteRecordRaw) => {
    if (v.path === '/') {
      newArr.push({ component: v.component, name: v.name, path: v.path, redirect: v.redirect, meta: v.meta, children: [] } as RouteRecordRaw)
    } else {
      if (v.path.indexOf('/:') > -1) {
        if (!v.meta) {
          v.meta = {
            isDynamic: true,
            isDynamicPath: v.path
          }
        } else {
          v.meta.isDynamic = true
          v.meta.isDynamicPath = v.path
        }
      }
      if (!newArr[0].children) newArr[0].children = [v]
      else newArr[0].children.push(v)
      if (newArr[0].meta && newArr[0].meta.isKeepAlive && v.meta && v.meta.isKeepAlive) {
        if (v.name) {
          cacheList.push(v.name as string)
          store.dispatch('keepAliveNames/setCacheKeepAlive', cacheList)
        }
      }
    }
  })

  return newArr
}

export function setFilterMenuAndCacheTagsViewsRoutes ():void {
  if (dynamicRoutes[0].children) {
    store.dispatch('routesList/setRoutesList', setFilterHasAuthMenu(dynamicRoutes[0].children, store.state.userInfos.userInfos.authPageList))
    setCacheTagsViewRoutes()
  }
}

export function setCacheTagsViewRoutes (): void {
  const authRoutes = setFilterHasAuthMenu(dynamicRoutes, store.state.userInfos.userInfos.authPageList)
  let flateningRoutes = formatFlatteningRoutes(authRoutes)
  if (flateningRoutes) {
    flateningRoutes = flateningRoutes as RouteRecordRaw[]
    let twoStageRoutes = formtTwoStageRoutes(flateningRoutes)
    if (twoStageRoutes) {
      twoStageRoutes = twoStageRoutes as RouteRecordRaw[]
      store.dispatch('tagsViewRoutes/setTagsViewRoutes', twoStageRoutes[0].children)
    }
  }
}

export function setFilterHasAuthMenu (routes:RouteRecordRaw[], auth: string[]): RouteRecordRaw[] {
  const menu: RouteRecordRaw[] = []
  routes.forEach((route: RouteRecordRaw) => {
    const item = { ...route }
    if (hasAuth(auth, item)) {
      if (item.children) item.children = setFilterHasAuthMenu(item.children, auth)
      menu.push(item)
    }
  })
  return menu
}

/**
 * 判断路由`meta.auth`中是否包含当前登录用户权限字段
 * @param auths 用户权限标识
 * @param route 当前路由
 * @returns 返回当前用户是否有当前路由权限
 */
export function hasAuth (auths:string[], route:RouteRecordRaw): boolean {
  if (route.meta && route.meta.auth) return auths.some((auth: string) => route.meta && (route.meta.auth as string[]).includes(auth))
  else return false
}

/**
 * 获取当前用户的权限标识，对原路由进行替换
 * @returns 替换后的路由
 */
export function setFilterRouteEnd ():boolean | RouteRecordRaw[] {
  const flatingRoutes = formatFlatteningRoutes(dynamicRoutes)
  if (flatingRoutes) {
    const filterRouteEnd: boolean | RouteRecordRaw[] = formtTwoStageRoutes(flatingRoutes as RouteRecordRaw[])
    if (filterRouteEnd) {
      const tempRoute = (filterRouteEnd as RouteRecordRaw[])
      if (tempRoute[0].children) {
        tempRoute[0].children = [...setFilterRoute(tempRoute[0].children), { ...pathMatch }]
        return tempRoute
      }
    }
    return filterRouteEnd
  }
  return flatingRoutes
}

/**
 * 获取路由表中用户有权限的路由列表
 * @param chil 顶级路由的子路由
 * @returns 返回当前用户有权限的路由列表
 */
export function setFilterRoute (chil:RouteRecordRaw[]):RouteRecordRaw[] {
  const filterRoute: RouteRecordRaw[] = []
  chil.forEach((route: RouteRecordRaw) => {
    if (route.meta && route.meta.auth) {
      (route.meta.auth as string[]).forEach(metaAuth => {
        (store.state.userInfos.userInfos.authPageList as string[]).forEach((a) => {
          if (metaAuth === a) filterRoute.push({ ...route })
        })
      })
    }
  })

  return filterRoute
}

/**
 * 删除路由
 */
export function resetRoute (): void{
  let filteredRoutes = setFilterRouteEnd()
  if (filteredRoutes) {
    filteredRoutes = filteredRoutes as RouteRecordRaw[]
    filteredRoutes.forEach((route:RouteRecordRaw) => {
      const routeName = route.name
      if (routeName) {
        router.hasRoute(routeName) && router.removeRoute(routeName)
      }
    })
  }
}

const { isRequestRoutes } = store.state.themeConfig.themeConfig

router.beforeEach(async (to, from, next) => {
  NProgress.configure({ showSpinner: false })
  if (to.meta.title) NProgress.start()
  const token = Session.get('token')
  if (to.path === '/login') {
    if (!token) {
      next()
    } else {
      next('/home')
    }
    NProgress.done()
  } else {
    if (!token) {
      next(`/login?redirect=${to.path}&params=${JSON.stringify(to.query ? to.query : to.params)}`)
      Session.clear()
      resetRoute()
    } else {
    }
  }
})

export default router
