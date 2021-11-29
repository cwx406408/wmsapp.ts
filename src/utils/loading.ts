import { nextTick } from 'vue'
import loadingCss from '@/theme/loading.scss'

/**
 * 页面全局 Loading
 * @method setCss 载入 css
 * @method start 创建 loading
 * @method done 移除 loading
 */
export const NextLoding = {
  setCss: ():void => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = loadingCss
  },
  // 创建 loading
  start: ():void => {
    const bodys: Element = document.body
    const div = document.createElement('div')
    div.setAttribute('class', 'loading-next')
    const htmls = `
      <div class="loading-next-box">
      <div class="loading-next-box-warp">
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      <div class="loading-next-box-item"></div>
      </div>
      </div>
      `
    div.innerHTML = htmls
    bodys.insertBefore(div, bodys.childNodes[0])
    window.nextLoading = true
  },
  // 移除 loading
  done: ():void => {
    nextTick(() => {
      setTimeout(() => {
        window.nextLoading = false
        const el = document.querySelector('.loading-next')
        // eslint-disable-next-line no-unused-expressions
        el && el.parentNode?.removeChild(el)
      }, 1000)
    })
  }
}
