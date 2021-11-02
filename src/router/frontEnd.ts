import { store } from '@/store'
import { Session } from '@/utils/storage'
import { setAddRoute, setFilterMenuAndCacheTagsViewsRoutes } from './index'

export async function initFrontEndControlRoutes ():Promise<void | boolean> {
  if (!Session.get('token')) return false
  store.dispatch('userInfos/setUserInfos')
  await setAddRoute()
  setFilterMenuAndCacheTagsViewsRoutes()
}
