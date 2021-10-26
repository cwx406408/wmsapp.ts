import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { RootStateTypes } from './interface/index'
import { InjectionKey } from 'vue'

const moudulesFiles = require.context('./modules', true, /\.ts$/)

const modules = moudulesFiles.keys().reduce((modules: {[x: string]: any}, path) => {
  const name = path.replace(/^\.\/modules\/(.*)\.\w+$/, '$1')
  const value = moudulesFiles[path as keyof typeof moudulesFiles]
  modules[name] = value

  return modules
}, {})

export const key: InjectionKey<Store<RootStateTypes>> = Symbol('RootState')

export const store = createStore<RootStateTypes>({ modules })

export function useStore ():any {
  return baseUseStore(key)
}
