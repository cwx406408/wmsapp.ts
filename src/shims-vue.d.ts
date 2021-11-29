/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  nextLoading: boolean
}

declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module '*.scss'
declare module '*.ts'
declare module '*.js'