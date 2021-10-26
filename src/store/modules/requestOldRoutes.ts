import { Module } from 'vuex'
import { RequestOldRoutesState, RootStateTypes } from '@/store/interface/index'

const requestOldRoutesModule: Module<RequestOldRoutesState, RootStateTypes> = {
  namespaced: true,
  state: {
    requestOldRoutes: []
  },
  mutations: {
    SET_BACKEND_CONTROL_ROUTES (state: RequestOldRoutesState, data: string[]): void{
      state.requestOldRoutes = data
    }
  },
  actions: {
    // 后端控制路由
    async setBackEndControlRoutes ({ commit }, routes: Array<string>) {
      commit('SET_BACKEND_CONTROL_ROUTES', routes)
    }
  }
}

export default requestOldRoutesModule
