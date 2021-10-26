import { Module } from 'vuex'
import { UserInfosState, RootStateTypes } from '@/store/interface/index'
import { Session } from '@/utils/storage'

const userInfosModule:Module<UserInfosState, RootStateTypes> = {
  namespaced: true,
  state: {
    userInfos: {
    }
  },
  mutations: {
    SET_USER_INFOS (state, data: Record<string, string>) {
      state.userInfos = data
    }
  },
  actions: {
    async setUserInfos ({ commit }, data:Record<string, string>) {
      if (data) {
        commit('SET_USER_INFOS', data)
      } else {
        const info = Session.get('userInfo')
        commit('SET_USER_INFOS', info)
      }
    }
  }
}

export default userInfosModule
