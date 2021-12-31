import { TagsViewRouteData } from '@/store/interface'

export interface DropdownData {
  contextMenuClickId: number,
  txt: string,
  affix: boolean,
  icon: string
}

export interface TagsViewData {
  isShow: boolean,
  dropdownList: Array<DropdownData>,
  item: TagsViewRouteData
}

export interface TagsViewRouteState {
  routeActive: string,
  routePath: string,
  dropdown: Record<string, string>,
  tagsRefsIndex: number,
  tagsViewList: Array<TagsViewRouteData>,
  sortable: '',
  tagsViewRoutesList: Array<TagsViewRouteData>
}
