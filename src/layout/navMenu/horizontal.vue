<template>
  <div class="el-menu-horizontal-warp">
    <el-scrollbar @wheel="onElMenuHorizontalScroll" ref="elMenuHorizontalScrollRef">
      <el-menu router :default-active="defaultActive" background-color="transparent" mode="horizontal">
        <template v-for="val in menuLists" :key="val.path">
          <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0">
            <template #title>
              <i :class="val.meta?.icon"></i>
              <span>{{val.meta?.title}}</span>
            </template>
            <sub-item :chil="val.children"></sub-item>
          </el-sub-menu>
          <el-menu-item :index="val.path" v-else>
            <template #title v-if="!val.meta?.isLink || (val.meta.isLink && val.meta.isIframe)">
              <i :class="val.meta?.icon"></i>
              {{ val.meta?.title }}
            </template>
            <template #title v-else>
              <a :href="val.meta.link" target="_bland" rel="opener"></a>
              <i :class="val.meta?.icon"></i>
              {{ val.meta.title }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, onMounted, reactive, toRefs } from 'vue'
import SubItem from '@/layout/navMenu/subItem.vue'
import { RouteData, TagsViewRouteData } from '@/store/interface'
import { onBeforeRouteUpdate, RouteLocationNormalizedLoaded, useRoute } from 'vue-router'
import { useStore } from '@/store/index'
export default defineComponent({
  name: 'navMenuHorizontal',
  components: { SubItem },
  props: {
    menuList: (): Array<TagsViewRouteData> => []
  },
  setup (props) {
    const { proxy } = getCurrentInstance() as any
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      defaultActive: ''
    })

    // 获取父级菜单数据
    const menuLists = computed(() => {
      return props.menuList
    })

    // 设置横向滚动条可以鼠标滚轮滚动
    const onElMenuHorizontalScroll = (e: any) => {
      const eventData = e.wheelDelta || -e.deltaY * 40
      proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft = proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft + eventData
    }

    // 初始化数据，页面刷新时，滚动条滚动到对应位置
    const initElMenuOffsetLeft = () => {
      nextTick(() => {
        const els: any = document.querySelector('.el-menu.el-menu--horizontal li.is-active')
        if (!els) return false
        proxy.$refs.elMenuHorizontalScrollRef.$refs.wrap.scrollLeft = els.offsetLeft
      })
    }

    // 路由过滤递归函数
    const filterRoutesFun = (arr: Array<RouteData>) => {
      return arr.filter((item) => item.meta.isHide)
        .map((item) => {
          if (item.children) item.children = filterRoutesFun(item.children)
          return item
        })
    }

    // 传送当前子级数据到菜单
    const setSendClassicChildren = (path: string) => {
      const currentPathSplit = path.split('/')
      // const currentData: any = {}
      filterRoutesFun(store.state.routesList.routesList).map((v) => {
        if (v.path === `/${currentPathSplit[1]}`) {
          // currentData.item = [{ ...v }]
          // if (v.children) currentData.children = v.children
          return v
        }
      })

      // return currentData
    }

    // 设置页面当前路由高亮
    const setCurrentRouterHighlight = (currentRoute: RouteLocationNormalizedLoaded) => {
      const { path, meta } = currentRoute
      if (store.state.themeConfig.themeConfig.layout === 'classic') {
        state.defaultActive = `/${path.split('/')[1]}`
      } else {
        const pathSplit = meta.isDynamic ? (meta.dynamicPath as string).split('/') : path.split('/')
        if (pathSplit && pathSplit.length >= 4 && meta.isHide) state.defaultActive = pathSplit?.splice(0, 3).join('/')
        else state.defaultActive = path
      }
    }

    onBeforeMount(() => {
      setCurrentRouterHighlight(route)
    })

    onMounted(() => {
      initElMenuOffsetLeft()
    })

    onBeforeRouteUpdate((to) => {
      setCurrentRouterHighlight(to)
      proxy.mittBus.emit('onMenuClick')
      const { layout, isClassicSplitMenu } = store.state.themeConfig.themeConfig
      if (layout === 'classic' && isClassicSplitMenu) {
        proxy.mittBus.emit('setSendClassicChildren', setSendClassicChildren(to.path))
      }
    })

    return {
      menuLists,
      onElMenuHorizontalScroll,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.el-menu-horizontal-warp {
  flex: 1;
  overflow: hidden;
  margin-right: 30px;
  ::v-deep(.el-scrollbar__bar.is-vertical) {
    display: none;
  }
  ::v-deep(a) {
    width: 100%;
  }
  .el-menu.el-menu--horizontal {
    display: flex;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
