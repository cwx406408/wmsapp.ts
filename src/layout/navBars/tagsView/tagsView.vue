<template>
  <div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { TagsViewRouteData } from '@/store/interface'
import { isObjectValueEqual } from '@/utils/arrayOperations'
import { Session } from '@/utils/storage'
import { defineComponent, getCurrentInstance, reactive, ref, computed, nextTick } from 'vue'
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router'
import ContextMenu from './contextMenu.vue'
import { TagsViewData, TagsViewRouteState } from './interface'

export default defineComponent({
  name: 'layoutTagsView',
  components: { ContextMenu },
  setup () {
    const proxy = getCurrentInstance()?.proxy
    const tagRefs = ref([])
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
      sortable: '',
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

    // 处理 tagsView 高亮
    const setTagsViewHighlight = (v: TagsViewRouteData) => {
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
      }
    }

    // 获取 vuex 中的 tagsViewRoutes 列表
    const getTagsViewRoutes = async () => {
      await setTagsViewHighlight(route as TagsViewRouteData)
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
  }
})
</script>
