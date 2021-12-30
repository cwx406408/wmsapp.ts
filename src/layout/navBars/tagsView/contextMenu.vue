<template>
  <transition name="el-zoom-in-center">
    <div
      aria-hidden="true"
      class="el-dropdown__popper el-popper is-light is-pure custom-contextmenu"
      role="tooltip"
      data-popper-placement="bottom"
      :style="`top:${dropdowns.y + 5}px;left:${dropdowns.x}px`"
      :key='Math.random()'
      v-show="isShow"
    >
      <ul class="el-dropdown-menu">
        <template v-for="(v, k) in dropdownList">
          <li
            class="el-dropdown-menu__item"
            aria-disabled="false"
            tabindex="-1"
            :key="k"
            v-if="!v.affix"
            @click="onCurrentContextMenuClick(v.contextMenuClickId)"
          >
            <i :class="v.icon"></i>
            <span>{{v.txt}}</span>
          </li>
        </template>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onUnmounted, onMounted, toRefs } from 'vue'
import { DropdownData, TagsViewData } from './interface'

export default defineComponent({
  name: 'layoutTagsViewContextMenu',
  props: {
    dropdown: {
      type: Object
    }
  },
  setup (props, { emit }) {
    const state = reactive<TagsViewData>({
      isShow: false,
      dropdownList: [
        { contextMenuClickId: 0, txt: 'message.tagsView.refresh', affix: false, icon: 'el-icon-refresh-right' },
        { contextMenuClickId: 1, txt: 'message.tagsView.close', affix: false, icon: 'el-icon-close' },
        { contextMenuClickId: 2, txt: 'message.tagsView.closeOther', affix: false, icon: 'el-icon-circle-close' },
        { contextMenuClickId: 3, txt: 'message.tagsView.closeAll', affix: false, icon: 'el-icon-folder-delete' },
        {
          contextMenuClickId: 4,
          txt: 'message.tagsView.fullscreen',
          affix: false,
          icon: 'iconfont icon-fullscreen'
        }
      ],
      item: {}
    })

    // 父级传过来的坐标x,y值
    const dropdowns = computed(() => {
      return props.dropdown
    })

    // 当前项菜单点击
    const onCurrentContextMenuClick = (contextMenuClickId: number) => {
      emit('onCurrentContextMenuClick', Object.assign({}, { contextMenuClickId }, state.item))
    }

    // 打开右键菜单：判断是否固定，固定则不显示关闭按钮
    const openContextMenu = (item: DropdownData) => {
      state.item = item
      item.affix ? (state.dropdownList[1].affix = true) : (state.dropdownList[1].affix = false)
      closeContextMenu()
      setTimeout(() => {
        state.isShow = true
      }, 10)
    }

    // 关闭右键菜单
    const closeContextMenu = () => {
      state.isShow = false
    }

    // 监听页面进行右键菜单的关闭
    onMounted(() => {
      document.body.addEventListener('click', closeContextMenu)
    })

    // 页面卸载时，移除右键菜单监听事件
    onUnmounted(() => {
      document.body.removeEventListener('click', closeContextMenu)
    })

    return {
      dropdowns,
      openContextMenu,
      closeContextMenu,
      onCurrentContextMenuClick,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.custom-contextmenu {
  transform-origin: center top;
  z-index: 2190;
  position: fixed;
  .el-dropdown-menu__item {
    font-size: 12px !important;
    white-space: nowrap;
    i {
      font-size: 12px !important;
    }
  }
}
</style>
