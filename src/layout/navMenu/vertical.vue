<template>
  <el-menu
    router
    :default-active="defaultActive"
    background-color="transparent"
    :collapse="isCollapse"
    :unique-opened="getThemeConfig.isUniqueOpened"
    :collapse-transition="false"
   >
    <template v-for="val in menuList" :key="val.path">
      <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0">
        <template #title>
          <i :class="val.meta?.icon"></i>
          <span>{{ val.meta?.title }}</span>
        </template>
        <SubItem :chil="val.children"></SubItem>
      </el-sub-menu>
      <el-sub-menu :index="val.path" v-else>
        <i :class="val.meta?.icon"></i>
        <template #title v-if="!val.meta?.isLink || (val.meta.isLink && val.meta.isIframe)">
          <span>{{ val.meta?.title}}</span>
        </template>
        <template #title v-else>
          <a :href="val.meta.link" target="_blank" rel="opener">{{ val.meta.title}}</a>
        </template>
      </el-sub-menu>
    </template>
   </el-menu>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs, watch } from 'vue'
import SubItem from '@/layout/navMenu/subItem.vue'
import { TagsViewRouteData } from '@/store/interface'
import { useStore } from '@/store'
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
export default defineComponent({
  name: 'navMenuVertical',
  components: { SubItem },
  props: {
    menuList: {
      default: (): Array<TagsViewRouteData> => []
    }
  },
  setup (props) {
    const proxy = getCurrentInstance()?.proxy as any
    const store = useStore()
    const route = useRoute()
    const state = reactive({
      defaultActive: route.meta.isDynamic ? route.meta.dynamicPath as string : route.path,
      isCollapse: false
    })
    // 获取父级菜单
    const menuLists = computed(() => {
      return props.menuList
    })

    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    // 菜单高亮（详情时，父级高亮）
    const setParentHighlight = (currentRoute: RouteLocationNormalizedLoaded) => {
      const { path, meta } = currentRoute
      const pathSplit = meta.isDynamic ? (meta.dynamicPath as string).split('/') : path.split('/')
      if (pathSplit.length >= 4 && meta.isHide) return pathSplit.splice(0, 3).join('/')
      else return path
    }

    // 设置菜单收起/展开
    watch(
      store.state.themeConfig.themeConfig,
      () => {
        document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = getThemeConfig.value.isCollapse)
      },
      {
        immediate: true
      }
    )

    onMounted(() => {
      state.defaultActive = setParentHighlight(route)
    })

    onBeforeRouteUpdate((to) => {
      state.defaultActive = setParentHighlight(to)
      proxy.mittBus.emit('onMenuClick')
      const clientWidth = document.body.clientWidth
      if (clientWidth < 1000) getThemeConfig.value.isCollapse = false
    })

    return {
      menuLists,
      getThemeConfig,
      ...toRefs(state)
    }
  }
})
</script>
