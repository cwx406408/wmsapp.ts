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

export interface MetaData {
  isDynamic?: boolean,
  dynamicPath?: string,
  isAffix?: boolean,
  isLink?: boolean,
  link?: string,
  isIframe?: boolean,
  isHide?: boolean,
  auth?: Array<string>,
  icon?: string,
  isKeepAlive?: boolean,
  title?: string
}

// 路由数据详情
export interface RouteData{
  name: string,
  path: string,
  meta: MetaData,
  children: Array<RouteData>
}

// 路由列表
export interface RoutesListState {
  routesList: Array<RouteData>;
  isColumnsMenuHover: boolean;
  isColumnsNavHover: boolean;
}

// 路由缓存列表
export interface KeepAliveNamesState {
  keepAliveNames: Array<string>;
}

export interface TagsViewRouteData {
  url: string,
  contextMenuClickId?: number,
  name?: string,
  path: string,
  query?: any,
  hash?: string,
  meta?: MetaData,
  fullPath?: string,
  params?: any,
  redirect?: string,
  children?: Array<TagsViewRouteData>
}
// TagsView 路由列表
export interface TagsViewRoutesState {
  tagsViewRoutes: Array<TagsViewRouteData>;
  isTagsViewCurrentFull: boolean;
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
