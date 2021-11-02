import { store } from '@/store/index'
import { Session } from '@/utils/storage'
import { setAddRoute, setFilterMenuAndCacheTagsViewsRoutes } from '@/router/index'

export async function initBackEndControlRoutes ():Promise<void|boolean> {
  if (!Session.get('token')) return false

  store.dispatch('userInfos/setUserInfos')
  await setAddRoute()
  setFilterMenuAndCacheTagsViewsRoutes()
}
