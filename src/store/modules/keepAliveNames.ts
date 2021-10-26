import { Module } from 'vuex'
import { KeepAliveNamesState, RootStateTypes } from '@/store/interface/index'

const keepAliveNamesModule : Module<KeepAliveNamesState, RootStateTypes> = {
  namespaced: true,
  state: {
    keepAliveNames: []
  },
  mutations: {
    SET_CACHE_KEEP_ALIVE (state: KeepAliveNamesState, data: Array<string>):void{
      state.keepAliveNames = data
    }
  },
  actions: {
    async setCacheKeepAlive ({ commit }, data: Array<string>) {
      commit('SET_CACHE_KEEP_ALIVE', data)
    }
  }
}

export default keepAliveNamesModule
