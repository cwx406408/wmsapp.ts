import { RouteLocationNormalizedLoaded } from 'vue-router'

// 布局配置
export interface ThemeConfigState {
  themeConfig: {
    isDrawer: boolean;
    primary: string;
    success: string;
    info: string;
    warning: string;
    danger: string;
    topBar: string;
    menuBar: string;
    columnsMenuBar: string;
    topBarColor: string;
    menuBarColor: string;
    columnsMenuBarColor: string;
    isTopBarColorGradual: boolean;
    isMenuBarColorGradual: boolean;
    isColumnsMenuBarColorGradual: boolean;
    isMenuBarColorHighlight: boolean;
    isCollapse: boolean;
    isUniqueOpened: boolean;
    isFixedHeader: boolean;
    isFixedHeaderChange: boolean;
    isClassicSplitMenu: boolean;
    isLockScreen: boolean;
    lockScreenTime: number;
    isShowLogo: boolean;
    isShowLogoChange: boolean;
    isBreadcrumb: boolean;
    isTagsview: boolean;
    isBreadcrumbIcon: boolean;
    isTagsviewIcon: boolean;
    isCacheTagsView: boolean;
    isSortableTagsView: boolean;
    isShareTagsView: boolean;
    isFooter: boolean;
    isGrayscale: boolean;
    isInvert: boolean;
    isIsDark: boolean;
    isWartermark: boolean;
    wartermarkText: string;
    tagsStyle: string;
    animation: string;
    columnsAsideStyle: string;
    columnsAsideLayout: string;
    layout: string;
    isRequestRoutes: boolean;
    globalTitle: string;
    globalViceTitle: string;
    globalI18n: string;
    globalComponentSize: string;
  };
}

// 路由列表
export interface RoutesListState {
  routesList: Array<Record<string, any>>;
  isColumnsMenuHover: boolean;
  isColumnsNavHover: boolean;
}

// 路由缓存列表
export interface KeepAliveNamesState {
  keepAliveNames: Array<string>;
}

export interface MetaData {
  isDynamic: boolean,
  isAffix: boolean,
  isLink: boolean,
  isIframe: boolean,
  isHide: boolean
}

export interface TagsViewRouteData extends RouteLocationNormalizedLoaded {
  url: string,
}
// TagsView 路由列表
export interface TagsViewRoutesState {
  tagsViewRoutes: Array<TagsViewRouteData>;
  isTagsViewCurrenFull: boolean;
}

// 用户信息
export interface UserInfosState {
  userInfos: Record<string, any>;
}

// 后端返回原始路由(未处理时)
export interface RequestOldRoutesState {
  requestOldRoutes: Array<string>;
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
  themeConfig: ThemeConfigState;
  routesList: RoutesListState;
  keepAliveNames: KeepAliveNamesState;
  tagsViewRoutes: TagsViewRoutesState;
  userInfos: UserInfosState;
  requestOldRoutes: RequestOldRoutesState;
}
