
export interface SettingState{
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
  }
}

export default interface SidebarState {
  opened: boolean,
  withoutAnimation: boolean
}

export interface AppState{
  sidebar: SidebarState,
  device: string,
  size: string
}

export interface RootState{
  setting: SettingState,
  app: AppState
}
