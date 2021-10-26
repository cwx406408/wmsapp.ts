import { Module } from 'vuex'
import { TagsViewRoutesState, RootStateTypes } from '@/store/interface/index'

const tagsViewRoutesModule: Module<TagsViewRoutesState, RootStateTypes> = {
  namespaced: true,
  state: {
    tagsViewRoutes: [],
    isTagsViewCurrenFull: false
  },
  mutations: {
    // 设置TagsView路由
    SET_TAGS_VIEW_ROUTES (state, data): void{
      state.tagsViewRoutes = data
    },

    // 设置卡片全屏
    SET_CURRENT_FULLSCREEN (state, data):void {
      state.tagsViewRoutes = data
    }
  },
  actions: {
    // 设置TagsView路由
    async setTagsViewRoutes ({ commit }, data: Array<Record<string, string>>) {
      commit('SET_TAGS_VIEW_ROUTES', data)
    },
    // 设置TagsView路由
    async setCurrentFullscreen ({ commit }, data: boolean) {
      commit('SET_CURRENT_FULLSCREEN', data)
    }
  }
}

export default tagsViewRoutesModule
