/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export const Local = {
  // 设置永久缓存
  set (key: string, val: Record<string, unknown>):void {
    window.localStorage.setItem(key, JSON.stringify(val))
  },

  // 获取永久缓存
  get (key: string): any {
    const json: any = window.localStorage.getItem(key)
    return JSON.parse(json)
  },
  // 删除永久缓存
  remove (key: string): void {
    window.localStorage.removeItem(key)
  },
  // 删除全部永久缓存
  clear ():void {
    window.localStorage.clear()
  }
}

/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
export const Session = {
  // 设置临时缓存
  set (key: string, val: Record<string, unknown>):void {
    window.sessionStorage.setItem(key, JSON.stringify(val))
  },
  // 获取临时缓存
  get (key: string):any {
    const json:any = window.sessionStorage.getItem(key)
    JSON.parse(json)
  },
  // 删除临时缓存
  remove (key: string):void {
    window.sessionStorage.removeItem(key)
  },
  // 删除全部临时缓存
  clear ():void{
    window.sessionStorage.clear()
  }
}
