import { store } from '@/store'
import { App } from 'vue'
import { judgmentSameArr } from './arrayOperations'

/**
 * 用户权限指令
 * @directive 单个权限验证（v-auth="xxx"）
 * @directive 多个权限验证，满足一个则显示（v-auths="[xxx,xxx]"）
 * @directive 多个权限验证，全部满足则显示（v-auth-all="[xxx,xxx]"）
 */
export function authDirective (app: App):void {
  // 单个权限验证
  app.directive('auth', {
    mounted (el, binding) {
      if (!store.state.userInfos.userInfos.authBtnList.some((v:string) => v === binding.value)) {
        el.parentNode.removeChild(el)
      }
    }
  })
  // 多个权限验证，满足一个则显示
  app.directive('auths', {
    mounted (el, binding) {
      let flag = false
      store.state.userInfos.userInfos.authBtnList.map((v1:string) => {
        binding.value.map((v2:string) => {
          if (v1 === v2) flag = true
        })
      })
      if (!flag) el.parentNode.removeChild(el)
    }
  })
  // 多个权限验证，全都满足才显示
  app.directive('auth-aa', {
    mounted (el, binding) {
      if (!judgmentSameArr(binding.value, store.state.userInfos.userInfos.authBtnList)) {
        el.parentNode.removeChild(el)
      }
    }
  })
}
