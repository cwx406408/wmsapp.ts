<template>
  <div class="layout-navbars-breadcrumb" :style="{ dispaly: isShowBreadcrumb }">
    <i class="layout-navbars-breadcrumb-icon"
       :class="getThemeConfig.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
       @click="onThemeConfigChange"
    ></i>
    <el-breadcrumb class="layout-navbars-breadcrumb-hide">
      <transition-group name="breadcrumb" mode="out-in">
        <el-breadcrumb-item v-for="(v, k) in breadcrumbList" :key="v.meta.title">
          <span v-if="k === breadcrumbList.length - 1" class="layout-navbars-breadcrumb-span">
            <i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{v.meta.title}}
          </span>
          <a v-else @click.prevent="onBreadcrumbClick(v)">
            <i :class="v.meta.icon" class="layout-navbars-breadcrumb-iconfont" v-if="getThemeConfig.isBreadcrumbIcon"></i>{{v.meta.title}}
          </a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store/index'
import { RouteData } from '@/store/interface'
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

export default defineComponent({
  name: 'layoutBreadcrumb',
  setup () {
    const { proxy } = getCurrentInstance() as any
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    type StateType = {
      breadcrumbList: Array<RouteData>,
      routeSplit: string[],
      routeSplitFirst: string,
      routeSplitIndex: number }

    const state = reactive<StateType>({
      breadcrumbList: [],
      routeSplit: [],
      routeSplitFirst: '',
      routeSplitIndex: 1
    })

    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    const isShowBreadcrumb = computed(() => {
      initRouteSplit(route.path)
      const { layout, isBreadcrumb } = getThemeConfig.value
      if (layout === 'classic' || layout === 'transverse') {
        return 'none'
      } else {
        return isBreadcrumb ? '' : 'none'
      }
    })

    const onBreadcrumbClick = (v: RouteData) => {
      const { redirect, path } = v
      if (redirect) router.push(redirect)
      else router.push(path)
    }

    const onThemeConfigChange = () => {
      proxy.mittBus.emit('onMenuClick')
      store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse
    }

    const getBreadcrumb = (arr: Array<RouteData>) => {
      arr.map((item) => {
        state.routeSplit.map((v, k, arrs) => {
          if (state.routeSplitFirst === item.path) {
            state.routeSplitFirst += `/${arrs[state.routeSplitIndex]}`
            state.breadcrumbList.push(item)
            state.routeSplitIndex++
            if (item.children) getBreadcrumb(item.children)
          }
        })
      })
    }

    const initRouteSplit = (path: string) => {
      if (getThemeConfig.value.isBreadcrumb) return false
      state.breadcrumbList = [store.state.routesList.routesList[0]]
      state.routeSplit = path.split('/')
      state.routeSplit.shift()
      state.routeSplitFirst = `/${state.routeSplit[0]}`
      state.routeSplitIndex = 1
      getBreadcrumb(store.state.routesList.routesList)
    }

    onMounted(() => {
      initRouteSplit(route.path)
    })

    onBeforeRouteUpdate((to) => {
      initRouteSplit(to.path)
    })

    return {
      getThemeConfig,
      isShowBreadcrumb,
      onBreadcrumbClick,
      onThemeConfigChange,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
  flex: 1;
  height: inherit;
  display: flex;
  align-items: center;
  padding-left: 15px;
  .layout-navbars-breadcrumb-icon {
    cursor: pointer;
    font-size: 18px;
    margin-right: 15px;
    color: var(--bg-topBarColor);
  }
  .layout-navbars-breadcrumb-span {
    opacity: 0.7;
    color: var(--bg-topBarColor);
  }
  .layout-navbars-breadcrumb-iconfont {
    font-size: 14px;
    margin-right: 5px;
  }
  ::v-deep(.el-breadcrumb__separator) {
    opacity: 0.7;
    color: var(--bg-topBarColor);
  }
}
</style>
