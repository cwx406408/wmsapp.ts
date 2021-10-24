import Cookies from 'js-cookie'
import { Commit } from 'vuex'

export interface Sidebar {
  opened: boolean,
  withoutAnimation: boolean
}
export interface InterState{
  sidebar: Sidebar,
  device: string,
  size: string
}

const state:InterState = {
  sidebar: {
    opened: Boolean(Number(Cookies.get('sidebarStatus'))),
    withoutAnimation: Boolean(Cookies.get('withoutAnimation'))
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: (state: InterState):void => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', '1')
    } else {
      Cookies.set('sidebarStatus', '0')
    }
  },
  CLOSE_SIDEBAR: (state:InterState, withoutAnimation:boolean):void => {
    Cookies.set('sidebarStatus', '0')
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state:InterState, device:string):void => {
    state.device = device
  },
  SET_SIZE: (state:InterState, size: string):void => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar (context: { commit: Commit }):void {
    context.commit('TOGGLE_SIDEBAR')
  },
  closeSideBar (context: { commit: Commit }, value: { withoutAnimation:boolean}):void {
    context.commit('CLOSE_SIDEBAR', value.withoutAnimation)
  },
  toggleDevice (context:{ commit:Commit }, value: {device: string}):void {
    context.commit('TOGGLE_DEVICE', value.device)
  },
  setSize (context: { commit:Commit }, value: {size: string}):void {
    context.commit('SET_SIZE', value.size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
