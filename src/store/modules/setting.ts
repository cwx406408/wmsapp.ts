import defaultSettings from '@/setting'
import { Commit } from 'vuex'

const { showSettings, tagsView, fixedHeader, sidebarLogo, theme, errorLog } = defaultSettings

export interface InterState{
  theme?: string,
  showSettings?: boolean,
  tagsView?: boolean,
  fixedHeader?: boolean,
  sidebarLogo?: boolean,
  errorLog?: string
}

const state: InterState = {
  theme: theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  errorLog: errorLog
}

const mutations = {
  CHANGE_SETTING: (state:InterState, par: { key:string, value: any}): void => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(par.key)) {
      state[par.key as keyof InterState] = par.value
    }
  }
}

const actions = {
  changeSetting (context: { commit:Commit }, data: { key:string, value: any}): void {
    context.commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
