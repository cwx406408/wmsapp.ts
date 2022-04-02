import { Module } from 'vuex'
import { RoutesListState, RootStateTypes, RouteData } from '@/store/interface/index'

const routesListModule: Module<RoutesListState, RootStateTypes> = {
  namespaced: true,
  state: {
    routesList: [],
    isColumnsMenuHover: false,
    isColumnsNavHover: false
  },
  mutations: {
    // 设置路由
    SET_ROUTES_LIST (state: RoutesListState, data: Array<Record<string, any>>):void{
      state.routesList = data as Array<RouteData>
    },

    // 设置分栏布局，鼠标是否移入移出(菜单)
    SET_COLUMNS_MENU_HOVER (state: RoutesListState, data: boolean):void {
      state.isColumnsMenuHover = data
    },

    // 设置分栏布局，鼠标是否移入移出(导航)
    SET_COLUMNS_NAV_HOVER (state: RoutesListState, data:boolean):void{
      state.isColumnsNavHover = data
    }
  },
  actions: {
    // 设置路由
    async setRoutesList ({ commit }, data: Array<Record<string, string>>) {
      commit('SET_ROUTES_LIST', data)
    },
    // 设置分栏布局，鼠标是否移入移出(菜单)
    async setColumnsMenuHover ({ commit }, data: boolean) {
      commit('SET_COLUMNS_MENU_HOVER', data)
    },
    // 设置分栏布局，鼠标是否移入移出(导航)
    async setColumnsNavHover ({ commit }, data: boolean) {
      commit('SET_COLUMNS_NAV_HOVER', data)
    }
  }
}

export default routesListModule
