export interface DropdownData {
  contextMenuClickId: number,
  txt: string,
  affix: boolean,
  icon: string
}

export interface TagsViewData {
  isShow: boolean,
  dropdownList: Array<DropdownData>,
  item: any
}
