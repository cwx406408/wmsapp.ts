import { store } from '@/store'
import { judgmentSameArr } from './arrayOperations'

/**
 * 单个权限验证
 * @param value 权限值
 * @returns 是否有权限
 */
export function auth (value:string):boolean {
  return store.state.userInfos.userInfos.authBtnList.some((v:string) => v === value)
}

/**
 * 多个权限验证，满足一个则显示
 * @param value 权限数组
 * @returns 是否有一个满足
 */
export function auths (values:string[]):boolean {
  let flag = false
  store.state.userInfos.userInfos.authBtnList.map((v1:string) => {
    values.map((v2) => {
      if (v1 === v2) flag = true
    })
  })
  return flag
}

/**
 * 多个权限验证，全部满足则显示
 * @param values 权限数组
 * @returns 是否全部满足
 */
export function authAll (values:string[]):boolean {
  return judgmentSameArr(store.state.userInfos.userInfos.authBtnList, values)
}
