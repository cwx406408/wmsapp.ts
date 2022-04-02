<template>
  <div class="h100" v-show="!isTagsViewCurrentFull">
    <el-aside class="layout-aside" :class="setCollapseStyle">
      <Logo v-if="setShowLogo"></Logo>
      <el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" @mouseenter="onAsideEnterLeave(true)" @mouseleave="onAsideEnterLeave(false)">
        <Vertical :menu-list="menuList"></Vertical>
      </el-scrollbar>
    </el-aside>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, toRefs, watch } from 'vue'
import Logo from '@/layout/logo/index.vue'
import Vertical from '@/layout/navMenu/vertical.vue'
import { useStore } from '@/store'
import { filterRoutesFun } from '../utils/filterRoutesFun'
import { RouteData } from '@/store/interface'

export default defineComponent({
  name: 'layoutAside',
  components: { Logo, Vertical },
  setup () {
    const { proxy } = getCurrentInstance() as any
    const store = useStore()
    type stateType = { menuList: Array<RouteData>, clientWidth: number }
    const state = reactive<stateType>({
      menuList: [],
      clientWidth: 0
    })

    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    const isTagsViewCurrentFull = computed(() => {
      return store.state.tagsViewRoutes.isTagsViewCurrentFull
    })

    const setCollapseStyle = computed(() => {
      const { layout, isCollapse, menuBar } = store.state.themeConfig.themeConfig
      const asideBarColor = menuBar === '#FFF' || menuBar === '#FFFFFF' || menuBar === '#fff' || menuBar === '#ffffff' ? 'layout-el-aside-br-color' : ''
      if (state.clientWidth <= 1000) {
        if (isCollapse) {
          document.body.setAttribute('class', 'el-popup-parent--hidden')
          const asideEl = document.querySelector('.layout-container') as HTMLElement
          const modeDivs = document.createElement('div')
          modeDivs.setAttribute('class', 'layout-aside-mobile-mode')
          asideEl.appendChild(modeDivs)
          modeDivs.addEventListener('click', closeLayoutAsideMobileMode)
          return [asideBarColor, 'layout-aside-mobile', 'layout-aside-mobile-open']
        } else {
          closeLayoutAsideMobileMode()
          return [asideBarColor, 'layout-aside-mobile', 'layout-aside-mobile-close']
        }
      } else {
        if (layout === 'columns') {
          if (isCollapse) return [asideBarColor, 'layout-aside-pc-1']
          else return [asideBarColor, 'layout-aside-pc-220']
        } else {
          if (isCollapse) return [asideBarColor, 'layout-aside-pc-64']
          else return [asideBarColor, 'layout-aside-pc-220']
        }
      }
    })

    const closeLayoutAsideMobileMode = () => {
      const el = document.querySelector('.layout-aside-mobile-mode')
      if (el && el.parentNode) el.parentNode.removeChild(el)
      const clientWidth = document.body.clientWidth
      if (clientWidth < 1000) store.state.themeConfig.themeConfig.isCollapse = false
      document.body.setAttribute('class', '')
    }

    const setShowLogo = computed(() => {
      const { layout, isShowLogo } = store.state.themeConfig.themeConfig
      return isShowLogo && (layout === 'defaults' || layout === 'columns')
    })

    const setFilterRoutes = () => {
      if (store.state.themeConfig.themeConfig.layout === 'columns') return false
      state.menuList = filterRoutesFun(store.state.routesList.routesList)
    }

    const initMenuFixed = (clientWidth: number) => {
      state.clientWidth = clientWidth
    }

    const onAsideEnterLeave = (bool: boolean) => {
      const { layout } = store.state.themeConfig.themeConfig
      if (layout !== 'columns') return false
      if (!bool) proxy.mittBus.emit('restoreDefalut')
      store.dispatch('routesList/setColumnsMenuHover', bool)
    }

    watch(store.state.themeConfig.themeConfig, (val) => {
      if (val.isShowLogoChange !== val.isShowLogo) {
        if (!proxy.$refs.layoutAsideScrollbarRef) return false
        proxy.$refs.layoutAsideScrollbarRef.update()
      }
    })

    watch(store.state, (val) => {
      const { layout, isClassicSplitMenu } = val.themeConfig.themeConfig
      if (layout === 'classic' && isClassicSplitMenu) return false
      setFilterRoutes()
    })

    onBeforeMount(() => {
      initMenuFixed(document.body.clientWidth)
      setFilterRoutes()
      proxy.mittBus.on('setSendColumnsChildren', (res: any) => {
        const { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig
        if (layout === 'classic' && isClassicSplitMenu) {
          state.menuList = []
          state.menuList = res.children
        }
      })
      proxy.mittBus.on('getBreadcrumbIndexSetFilterRoutes', () => {
        setFilterRoutes()
      })

      proxy.mittBus.on('layoutMobileResize', (res: any) => {
        initMenuFixed(res.clientWidth)
        closeLayoutAsideMobileMode()
      })
    })

    return { getThemeConfig, isTagsViewCurrentFull, setCollapseStyle, setShowLogo, onAsideEnterLeave, ...toRefs(state) }
  }
})
</script>
