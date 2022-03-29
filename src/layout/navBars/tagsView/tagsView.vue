<template>
  <div class="layout-navbars-tagsview" :class="{ 'layout-navbars-tagsview-shadow': getThemeConfig.layout === 'classic' }">
    <el-scrollbar ref="scrollbarRef" @wheel.prevent="onHandleScroll">
      <ul class="layout-navbars-tagsview-ul" :class="setTagsStyle" ref="tagsUlRef">
        <li
          v-for="(v, k) in tagsViewList"
          :key="k"
          class="layout-navbars-tagsview-ul-li"
          :data-name="v.name"
          :class="{ 'is-active': isActive(v)}"
          @contextmenu.prevent="onContextmenu(v, $event)"
          @click="onTagsClick(v, k)"
          :ref="(el) => { if (el) tagRefs[k] = el}"
        >
          <i class="iconfont icon-webicon318 layout-navbars-tagsview-ul-li-iconfont font14" v-if="isActive(v)"></i>
          <i class="layout-navbars-tagsview-ul-li-iconfont" :class="v.meta.icon" v-if="!isActive(v) && getThemeConfig.isTagsviewIcon"></i>
          <span>{{ v.meta.title }}</span>
          <template v-if="isActive(v)">
            <i class="el-icon-refresh-right ml5" @click.stop="refreshCurrentTagsView($route.fullPath)"></i>
            <i
              class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-active"
              v-if="!v.meta.isAffix"
              @click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)"
            ></i>
          </template>
          <i
            class="el-icon-close layout-navbars-tagsview-ul-li-icon layout-icon-three"
            v-if="!v.meta.isAffix"
            @click.stop="closeCurrentTagsView(getThemeConfig.isShareTagsView ? v.path : v.url)"
          ></i>
        </li>
      </ul>
    </el-scrollbar>
    <ContextMenu :dropdown="dropdown" ref="contextMenuRef" @currentContextmenuClick="onCurrentContextmenuClick"></ContextMenu>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { TagsViewRouteData } from '@/store/interface'
import { isObjectValueEqual } from '@/utils/arrayOperations'
import { Session } from '@/utils/storage'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { defineComponent, getCurrentInstance, reactive, ref, computed, nextTick, onBeforeMount, onUnmounted, onBeforeUpdate, onMounted, watch, toRefs } from 'vue'
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, RouteRecordName, useRoute, useRouter } from 'vue-router'
import ContextMenu from './contextMenu.vue'
import { TagsViewRouteState } from './interface'

export default defineComponent({
  name: 'layoutTagsView',
  components: { ContextMenu },
  setup () {
    const { proxy } = getCurrentInstance() as any
    const tagRefs = ref<any>([])
    const scrollbarRef = ref()
    const contextMenuRef = ref()
    const tagsUlRef = ref()
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const state = reactive<TagsViewRouteState>({
      routeActive: '',
      routePath: route.path,
      dropdown: { x: '', y: '' },
      tagsRefsIndex: 0,
      tagsViewList: [],
      tagsViewRoutesList: []
    })

    // 动态设置 tagsView 风格样式
    const setTagsStyle = computed(() => {
      return store.state.themeConfig.themeConfig.tagsStyle
    })

    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    // 设置 tagsView 高亮
    const isActive = (v: TagsViewRouteData) => {
      if (getThemeConfig.value.isShareTagsView) {
        return v.path === state.routePath
      } else {
        return v.url ? v.url === state.routeActive : v.path === state.routeActive
      }
    }

    // 存储 tagsViewList 到浏览器临时缓存中，页面刷新时保留记录
    const addBrowserSession = (tagsViewList: Record<string, any>) => {
      Session.set('tagsViewList', tagsViewList)
    }

    // 处理单标签时，第二次的值未覆盖第一次的 tagsViewList 值
    const singleAddTagsView = (path: string, to: RouteLocationNormalizedLoaded) => {
      const isDynamicPath = to?.meta.isDynamic ? to?.meta.isDynamicPath : path
      state.tagsViewList.forEach(v => {
        if (v.path === isDynamicPath &&
        !isObjectValueEqual(to?.meta.isDynamic ? (v.params ? v.params : { a: null }) : (v.query ? v.query : { a: null }),
         to?.meta.isDynamic ? (to?.params ? to?.params : { b: null }) : (to?.query ? to?.query : { b: null }))) {
           to?.meta.isDynamic ? (v.params = to?.params) : (v.query = to?.query)
           v.url = setTagsViewHighlight(v)
           addBrowserSession(state.tagsViewList)
        }
      })
    }

    const solveAddTagsView = async (path: string, to: RouteLocationNormalizedLoaded) => {
      const isDynamicPath = to.meta.isDynamic ? to.meta.isDynamicPath : path
      const current = state.tagsViewList.filter(v => {
        v.path === isDynamicPath && isObjectValueEqual(
          to.meta.isDynamic ? (v.params ? v.params : { a: null }) : (v.query ? v.query : { a: null }),
          to.meta.isDynamic ? (to.params ? to.params : { b: null }) : (to.query ? to.query : { b: null })
        )
      })
      if (current.length < 0) {
        const findItem = state.tagsViewRoutesList.find(v => v.path === isDynamicPath)
        if (findItem?.meta.isAffix) return false
        if (findItem?.meta.isLink && !findItem.meta.isIframe) return false
        if (findItem) {
          to.meta.isDynamic ? (findItem.params = to.params) : (findItem.query = to.query)
          findItem.url = setTagsViewHighlight(findItem)
          state.tagsViewList.push(findItem)
          addBrowserSession(state.tagsViewList)
        }
      }
    }

    // vuex 中获取路由信息：如果设置了固定，进行初始化显示
    const initTagsView = async () => {
      if (Session.get('tagsViewList') && getThemeConfig.value.isCacheTagsView) {
        state.tagsViewList = await Session.get('tagsViewList')
      } else {
        await state.tagsViewRoutesList.map((v) => {
          if (v.meta.isAffix && !v.meta.isHide) {
            v.url = setTagsViewHighlight(v)
            state.tagsViewList.push(v)
          }
        })
        await addTagsView(route.path, route)
      }
    }

    // 获取 vuex 中的 tagsViewRoutes 列表
    const getTagsViewRoutes = async () => {
      state.routeActive = await setTagsViewHighlight(route as TagsViewRouteData)
      state.routePath = (await route.meta.isDynamic) ? String(route.meta.isDynamicPath) : route.path
      state.tagsViewList = []
      state.tagsViewRoutesList = store.state.tagsViewRoutes.tagsViewRoutes
      initTagsView()
    }

    // 1、添加 tagsView:未设置隐藏(isHide)也添加到 tagsView 中（可开启多标签详情，单标签详情）
    const addTagsView = (path: string, to: RouteLocationNormalizedLoaded) => {
      nextTick(async () => {
        if (to && to.meta.isDynamic) {
          if (!getThemeConfig.value.isShareTagsView) await solveAddTagsView(path, to)
          else await singleAddTagsView(path, to)

          if (state.tagsViewList.some(v => v.path === to.meta.isDynamicPath)) return false
        } else {
          if (!getThemeConfig.value.isShareTagsView) await solveAddTagsView(path, to)
          else await singleAddTagsView(path, to)

          if (state.tagsViewList.some(v => v.path === path)) return false
        }
        const item = state.tagsViewRoutesList.find(v => v.path === to.meta.isDynamicPath)
        if (item) {
          if (item.meta.isLink && !item.meta.isIframe) return false
          if (to && to.meta.isDynamic) item.params = to.params ? to.params : route.params
          else item.query = to.query ? to.query : route.query

          item.url = setTagsViewHighlight(item)
          await state.tagsViewList.push(item)
          await addBrowserSession(state.tagsViewList)
        }
      })
    }

    // 关闭当前 tagsview
    const refreshCurrentTagsView = (fullPath: string) => {
      proxy.mittBus.emit('onTagsViewRefreshRouterView', fullPath)
    }

    // 3、关闭当前tagsview: 如果设置了固定，则不可以关闭
    const closeCurrentTagsView = (path: string) => {
      state.tagsViewList.map((v, k, arr) => {
        if (!v.meta.isAffix) {
          if (getThemeConfig.value.isShareTagsView ? v.path === path : v.url === path) {
            state.tagsViewList.splice(k, 1)
            setTimeout(() => {
              if (state.tagsViewList.length === k && getThemeConfig.value.isShareTagsView ? state.routePath === path : state.routeActive === path) {
                if (arr[arr.length - 1].meta.isDynamic) {
                  if (k !== arr.length) router.push({ name: arr[k].name as any, params: arr[k].params })
                  else router.push({ name: arr[arr.length - 1].name as any, params: arr[arr.length - 1].params })
                } else {
                  if (k !== arr.length) router.push({ path: arr[k].path, query: arr[k].query })
                  else router.push({ path: arr[arr.length - 1].path, query: arr[arr.length - 1].query })
                }
              }
            }, 0)
          }
        }
      })
      addBrowserSession(state.tagsViewList)
    }

    // 4、关闭其它 tagsView：如果设置了固定，则不关闭
    const closeOtherTagsView = (path: string) => {
      state.tagsViewList = []
      state.tagsViewRoutesList.map((v) => {
        if (v.meta.isAffix && !v.meta.isHide) state.tagsViewList.push({ ...v })
      })
      addTagsView(path, route)
    }

    // 5、关闭全部tagsView：如果设置了固定，则不关闭
    const closeAllTagsView = () => {
      state.tagsViewList = []
      state.tagsViewRoutesList.map((v) => {
        if (v.meta.isAffix && !v.meta.isHide) {
          state.tagsViewList.push({ ...v })
        }
        if (state.tagsViewList.length !== 0) {
          const index = state.tagsViewList.length - 1
          router.push({ path: state.tagsViewList[index].path })
        }
      })
      addBrowserSession(state.tagsViewList)
    }

    const openCurrentFullScreen = async (path: string) => {
      const item = state.tagsViewList.find((v) => getThemeConfig.value.isShareTagsView ? v.path === path : v.url === path)
      if (item) {
        if (item.meta.isDynamic) await router.push({ name: item.name as any, params: item.params })
        else await router.push({ path: item.path, query: item.query })
      }
      store.dispatch('tagsViewRoutes/setCurrenFullscreen', true)
    }

    // 当前项右键菜单点击，拿当前点击的路由路径对比 浏览器缓存中的 tagsView 路由数组，取当前点击项的详细路由信息
    // 防止 tagsView 非当前页演示时，操作异常
    const getCurrentRouteItem = (path: string, cParams: Record<string, any>): TagsViewRouteData | undefined => {
      const itemRoute = Session.get('tagsViewList') ? Session.get('tagsViewList') as Array<TagsViewRouteData> : state.tagsViewList
      return itemRoute.find((v) => {
        if (v.path === path &&
        isObjectValueEqual(v.meta.isDynamic ? v.params : v.query, cParams)) return v
        else if (v.path === path && Object.keys(cParams).length <= 0) return v
      })
    }

    // 当前右键菜单
    const onCurrentContextmenuClick = async (item: TagsViewRouteData) => {
      const cParams = item.meta.isDynamic ? item.params : item.query
      const currentTagsViewRouteData = getCurrentRouteItem(item.path, cParams)
      if (!currentTagsViewRouteData) return ElMessage({ type: 'warning', message: '请正确输入路径及完整参数（query、params）' })
      const { path, name, params, query, meta, url } = currentTagsViewRouteData
      switch (item.contextMenuClickId) {
        case 0:
          // 刷新当前
          if (meta.isDynamic) await router.push({ name: name as RouteRecordName, params })
          else await router.push({ path, query })
          refreshCurrentTagsView(route.fullPath)
          break
        case 1:
          // 关闭当前
          closeCurrentTagsView(getThemeConfig.value.isShareTagsView ? path : url)
          break
        case 2:
          // 关闭其他
          if (meta.isDynamic) await router.push({ name: name as RouteRecordName, params })
          else await router.push({ path, query })
          closeOtherTagsView(path)
          break
        case 3:
          // 关闭所有
          closeAllTagsView()
          break
        case 4:
          // 当前全屏
          openCurrentFullScreen(getThemeConfig.value.isShareTagsView ? path : url)
          break
      }
    }

    // 右键点击时：传x,y坐标值到子组件中(props)
    const onContextmenu = (v: any, e: any) => {
      const { clientX, clientY } = e
      state.dropdown.x = clientX
      state.dropdown.y = clientY
      contextMenuRef.value.openContextmenu(v)
    }

    // 当前 tagsView 项点击时
    const onTagsClick = (v: any, k: number) => {
      state.tagsRefsIndex = k
      router.push(v)
    }

    // 处理 tagsView 高亮
    const setTagsViewHighlight = (v: RouteLocationNormalizedLoaded) => {
      const params = v.query && Object.keys(v.query).length > 0 ? v.query : v.params
      if (!params || Object.keys(params).length <= 0) return v.path
      let path = ''
      for (const i in params) {
        if (Object.prototype.hasOwnProperty.call(params, i)) {
          path += params[i]
        }
      }
      return `${v.meta.isDynamic ? v.meta.isDynamic : v.path}-${path}`
    }

    // 更新滚动条显示
    const updateScrollbar = () => {
      proxy.$refs.scrollbarRef.update()
    }

    // 鼠标滚轮滚动
    const onHandleScroll = (e: any) => {
      proxy.$refs.scrollbarRef.$refs.wrap.scrollLeft += e.wheelDelta / 4
    }

    // tagsView 横向滚动
    const tagsViewmoveToCurrentTag = () => {
      nextTick(() => {
        if (tagRefs.value.length <= 0) return false

        // 当前 li 元素
        const liDom = tagRefs.value[state.tagsRefsIndex]

        // 当前 li 元素下标
        const liIndex = state.tagsRefsIndex

        // 当前 ul 下 li 元素总长度
        const liLength = tagRefs.value.length

        // 最前 li 元素
        const liFirst: any = tagRefs.value[0]

        // 最后 li 元素
        const liLast: any = tagRefs.value[tagRefs.value.length - 1]

        // 当前滚动条的值
        const scrollRefs = proxy.$refs.scrollbarRef.$refs.wrap

        // 当前滚动条滚动宽度
        const scrollS = scrollRefs.scrollWidth

        // 当前滚动条偏移宽度
        const offsetW = scrollRefs.offsetWidth

        // 当前滚动条偏移距离
        const scrollL = scrollRefs.scrollLeft

        // 上一个 tags li dom
        const liPrevTag: any = tagRefs.value[state.tagsRefsIndex - 1]

        // 下一个 tags li dom
        const liNextTag: any = tagRefs.value[state.tagsRefsIndex + 1]

        // 上一个 tags li dom 的偏移距离
        let beforePrevL: any = ''

        // 下一个 tags li dom 的偏移距离
        let afterNextL: any = ''
        if (liDom === liFirst) {
          // 头部
          scrollRefs.scrollLeft = 0
        } else if (liDom === liLast) {
          // 尾部
          scrollRefs.scrollLeft = scrollS - offsetW
        } else {
          // 非头非尾
          if (liIndex === 0) beforePrevL = liFirst - 5
          else beforePrevL = liPrevTag?.offsetLeft - 5

          if (liIndex === liLength) afterNextL = liLast.offsetLeft + liLast.offsetWidth + 5
          else afterNextL = liNextTag.offsetLeft + liNextTag.offsetWidth + 5

          if (afterNextL > scrollL + offsetW) scrollRefs.scrollLeft = afterNextL - offsetW
          else if (beforePrevL < scrollL) scrollRefs.scrollLeft = beforePrevL
        }

        updateScrollbar()
      })
    }

    // 获取 tagsView 的下标：用于处理 tagsView 点击时的横向滚动
    const getTagsRefsIndex = (path: string) => {
      nextTick(async () => {
        const tagsViewList = await state.tagsViewList
        state.tagsRefsIndex = tagsViewList.findIndex((v) => {
          if (getThemeConfig.value.isShareTagsView) return v.path === path
          else return v.url === path
        })
        tagsViewmoveToCurrentTag()
      })
    }

    // 设置 tagsView 可以进行拖拽
    const initSortable = () => {
      const el = document.querySelector('.layout-navbars-tagsview-ul') as HTMLElement
      if (!el) return false
      state.sortable && state.sortable.destroy()
      state.sortable = Sortable.create(el, {
        animation: 300,
        dataIdAttr: 'data-name',
        disabled: getThemeConfig.value.isSortableTagsView,
        onEnd: () => {
          const sortEndList: Array<TagsViewRouteData> = []
          if (state.sortable) {
            state.sortable.toArray().map((vs) => {
              state.tagsViewList.map((vt) => {
                if (vs === vt.name) sortEndList.push(vt)
              })
            })
          }
          addBrowserSession(sortEndList)
        }
      })
    }

    const onSortableResize = () => {
      const clientWidth = document.body.clientWidth
      getThemeConfig.value.isSortableTagsView = (clientWidth >= 1000)
      initSortable()
    }

    onBeforeMount(() => {
      // 初始化，防止手机端直接访问时还可以拖拽
      onSortableResize()
      window.addEventListener('resize', onSortableResize)
      proxy.mittBus.on('onCurrentContextmenuClick', (data: TagsViewRouteData) => {
        onCurrentContextmenuClick(data)
      })
      proxy.mittBus.on('openOrCloseSortable', () => {
        initSortable()
      })
      proxy.mittBus.on('openShareTagsView', () => {
        if (getThemeConfig.value.isShareTagsView) {
          router.push('/home')
          state.tagsViewList = []
          state.tagsViewRoutesList.map((v) => {
            if (v.meta.isAffix && !v.meta.isHide) {
              v.url = setTagsViewHighlight(v)
              state.tagsViewList.push({ ...v })
            }
          })
        }
      })
    })

    onUnmounted(() => {
      proxy.mittBus.off('onCurrentContextmenuClick')
      proxy.mittBus.off('openOrCloseSortable')
      proxy.mittBus.off('openShareTagsView')
      window.removeEventListener('resize', onSortableResize)
    })

    onBeforeUpdate(() => {
      tagRefs.value = []
    })

    onMounted(() => {
      getTagsViewRoutes()
      initSortable()
    })

    onBeforeRouteUpdate(async (to) => {
      state.routeActive = setTagsViewHighlight(to)
      state.routePath = to.meta.isDynamic ? to.meta.dynamicPath as string : to.path
      await addTagsView(to.path, to)
      getTagsRefsIndex(getThemeConfig.value.isShareTagsView ? state.routePath : state.routeActive)
    })

    watch(store.state, (val) => {
      if (val.tagsViewRoutes.tagsViewRoutes.length === state.tagsViewRoutesList.length) return false
      getTagsViewRoutes()
    })

    return {
      isActive,
      onContextmenu,
      getTagsViewRoutes,
      onTagsClick,
      tagRefs,
      contextMenuRef,
      scrollbarRef,
      tagsUlRef,
      onHandleScroll,
      getThemeConfig,
      setTagsStyle,
      refreshCurrentTagsView,
      closeCurrentTagsView,
      onCurrentContextmenuClick,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.layout-navbars-tagsview {
  background-color: var(--el-color-white);
  border-bottom: 1px solid #f1f2f3;
  ::v-deep(.el-scrollbar__wrap) {
    overflow-x: auto !important;
  }
  &-ul {
    list-style: none;
    margin: 0;
    padding: 0;
    height: 34px;
    display: flex;
    align-items: center;
    color: var(--el-text-color-regular);
    font-size: 12px;
    white-space: nowrap;
    padding: 0 15px;
    &-li {
      height: 26px;
      line-height: 26px;
      display: flex;
      align-items: center;
      border: 1px solid #e6e6e6;
      padding: 0 15px;
      margin-right: 5px;
      border-radius: 2px;
      position: relative;
      z-index: 0;
      cursor: pointer;
      justify-content: space-between;
      &:hover {
        background-color: var(--color-primary-light-9);
        color: var(--color-primary);
        border-color: var(--color-primary-light-6);
      }
      &-iconfont {
        position: relative;
        left: -5px;
        font-size: 12px;
      }
      &-icon {
        border-radius: 100%;
        position: relative;
        height: 14px;
        width: 14px;
        text-align: center;
        line-height: 14px;
        right: -5px;
        &:hover {
          color: var(--color-whites);
          background-color: var(--color-primary-light-3);
        }
      }
      .layout-icon-active {
        display: block;
      }
      .layout-icon-three {
        display: none;
      }
    }
    .is-active {
      color: var(--color-whites);
      background: var(--color-primary);
      border-color: var(--color-primary);
      transition: border-color 3s ease;
    }
  }
  // 风格2
  .tags-style-two {
    .layout-navbars-tagsview-ul-li {
      height: 34px !important;
      line-height: 34px !important;
      border: none !important;
      .layout-navbars-tagsview-ul-li-iconfont {
        display: none;
      }
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
    }
    .is-active {
      background: none !important;
      color: var(--color-primary) !important;
      border-bottom: 2px solid !important;
      border-color: var(--color-primary) !important;
      border-radius: 0 !important;
    }
  }
  // 风格3
  .tags-style-three {
    .layout-navbars-tagsview-ul-li {
      height: 34px !important;
      line-height: 34px !important;
      border-right: 1px solid #f6f6f6 !important;
      border-top: none !important;
      border-bottom: none !important;
      border-left: none !important;
      border-radius: 0 !important;
      margin-right: 0 !important;
      &:first-of-type {
        border-left: 1px solid #f6f6f6 !important;
      }
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
    }
    .is-active {
      background: var(--el-color-white) !important;
      color: var(--color-primary) !important;
      border-top: 1px solid !important;
      border-top-color: var(--color-primary) !important;
    }
  }
  // 风格4
  .tags-style-four {
    .layout-navbars-tagsview-ul-li {
      margin-right: 0 !important;
      border: none !important;
      position: relative;
      border-radius: 3px !important;
      .layout-icon-active {
        display: none;
      }
      .layout-icon-three {
        display: block;
      }
      &:hover {
        background: none !important;
      }
    }
    .is-active {
      background: none !important;
      color: var(--color-primary) !important;
    }
  }
}
.layout-navbars-tagsview-shadow {
  box-shadow: rgb(0 21 41 / 4%) 0px 1px 4px;
}
</style>
