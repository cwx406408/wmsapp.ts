import { RouteData } from '@/store/interface'

/**
 * 递归筛选未隐藏的路由
 * @param arr 路由数组
 * @returns 未隐藏的路由
 */
export function filterRoutesFun (arr: Array<RouteData>): Array<RouteData> {
  return arr.filter((item) => item.meta?.isHide)
    .map((item) => {
      if (item.children) item.children = filterRoutesFun(item.children)
      return item
    })
}
