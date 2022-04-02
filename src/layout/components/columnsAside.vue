<template>
  <div class="layout-columns-aside">
    <el-scrollbar>
      <ul @mouseleave="onColumnsAsideMenuMouseLeave()">
        <li
          v-for="(v, k) in columnsAsideList"
          :key="k"
          @click="onColumnsAsideMenuClick(v, k)"
          @mouseenter="onColumnsAsideMenuMouseenter(k, v)"
          :ref="(el) => { if(el) columnsAsideOffsetTopRefs[k] = el }"
          :class="{ 'layout-columns-active': liIndex === k, 'layout-columns-hover': liHoverIndex === k}"
          :title="v.meta.title"
        >
          <div :class="setColumnsAsideLayout" v-if="!v.meta.isLink || (v.meta.isLink && v.meta.isIframe)">
            <i :class="v.meta.icon"></i>
            <div class="columns-vertical-title font12">
              {{ v.meta.title}}
            </div>
          </div>
          <div :class="setColumnsAsideLayout" v-else>
            <a :href="v.meta.link" target="_blank">
              <i :class="v.meta.icon"></i>
              <div class="columns-vertical-title font12">{{ v.meta.title }}</div>
            </a>
          </div>
        </li>
        <div ref="columnsAsideActiveRef" :class="setColumnsAsideStyle"></div>
      </ul>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted, reactive, ref, toRefs, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from '@/store/index'
import { filterRoutesFun } from '../utils/filterRoutesFun'

export default defineComponent({
  name: 'layoutColumnsAside',
  setup () {
    const columnsAsideOffsetTopRefs = ref<Array<any>>([])
    const columnsAsideActiveRef = ref()
    const proxy = getCurrentInstance()?.proxy as any
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    type stateType = {
      columnsAsideList: Array<any>,
      liIndex: number,
      liOldIndex: null | number,
      liHoverIndex: null | number,
      liOldPath: string,
      difference: number,
      routeSplit: Array<string>,
      isNavHover: boolean
    }
    const state = reactive<stateType>({
      columnsAsideList: [],
      liIndex: 0,
      liOldIndex: null,
      liHoverIndex: null,
      liOldPath: '',
      difference: 0,
      routeSplit: [],
      isNavHover: false
    })

    const setColumnsAsideStyle = computed(() => {
      return store.state.themeConfig.themeConfig.columnsAsideStyle
    })

    const setColumnsAsideLayout = computed(() => {
      return store.state.themeConfig.themeConfig.columnsAsideStyle
    })

    const setColumnsAsideMove = (k: number) => {
      state.liIndex = k
      columnsAsideActiveRef.value.style.top = `${columnsAsideOffsetTopRefs.value[k].offsetTop + state.difference}px`
    }

    const onColumnsAsideMenuClick = (v: any, k: number) => {
      setColumnsAsideMove(k)
      const { path, redirect } = v
      if (redirect) router.push(redirect)
      else router.push(path)
    }

    const onColumnsAsideMenuMouseenter = (v: any, k: number) => {
      state.liOldPath = v.path
      state.liOldIndex = k
      state.liHoverIndex = k
      proxy.mittBus.emit('setSendColumnsChildred', setSendChildren(v.path))
      store.dispatch('routesList/setColumnsMenuHover', false)
      store.dispatch('routesList/setColumnsNavHover', true)
      state.isNavHover = true
    }

    const onColumnsAsideMenuMouseLeave = async () => {
      await store.dispatch('routesList/setColumnsNavHover', false)

      setTimeout(() => {
        const { isColumnsMenuHover, isColumnsNavHover } = store.state.routesList
        if (!isColumnsMenuHover && !isColumnsNavHover) proxy.mittBus.emit('restoreDefault')
      }, 100)
    }

    const onCulumnsAsideDown = (k: number) => {
      nextTick(() => {
        setColumnsAsideMove(k)
      })
    }

    const setFilterRoutes = () => {
      state.columnsAsideList = filterRoutesFun(store.state.routesList.routesList)
      const resData: any = setSendChildren(route.path)
      if (Object.keys(resData).length <= 0) return false
      onCulumnsAsideDown(resData.item[0].k)
      proxy.mittBus.emit('setSendColumnsChildren', resData)
    }

    const setSendChildren = (path: string) => {
      const currentPathSplit = path.split('/')
      const currentData: any = {}
      state.columnsAsideList.map((v, k) => {
        if (v.path === `/${currentPathSplit[1]}`) {
          v.k = k
          currentData.item = [{ ...v }]
          currentData.children = [{ ...v }]
          if (v.children) currentData.children = v.children
        }
      })

      return currentData
    }

    const setColumnsMenuHighlight = (path: string) => {
      state.routeSplit = path.split('/')
      const routeFirst = `/${state.routeSplit[1]}`
      const currentSplitRoute = state.columnsAsideList.find((v) => v.path === routeFirst)
      if (!currentSplitRoute) return false
      setTimeout(() => {
        onCulumnsAsideDown(currentSplitRoute.k)
      }, 100)
    }

    watch(store.state, (val) => {
      val.themeConfig.themeConfig.columnsAsideStyle === 'columnsRound' ? (state.difference = 3) : (state.difference = 0)
      if (!val.routesList.isColumnsMenuHover && !val.routesList.isColumnsNavHover) {
        state.liHoverIndex = null
        proxy.mittBus.emit('setSendColumnsChildren', setSendChildren(route.path))
      } else {
        state.liHoverIndex = state.liOldIndex
        if (!state.liOldPath) return false
        proxy.mittBus.emit('setSendColumnsChildren', setSendChildren(state.liOldPath))
      }
    })

    onMounted(() => {
      setFilterRoutes()
      proxy.mittBus.on('restoreDefault', () => {
        state.liOldIndex = null
        state.liOldPath = ''
      })
    })

    onUnmounted(() => {
      proxy.mittBus.off('restoreDefault')
    })

    onBeforeRouteUpdate((to) => {
      setColumnsMenuHighlight(to.path)
      proxy.mittBus.emit('setSendColumnsChildren', setSendChildren(to.path))
    })

    return {
      columnsAsideOffsetTopRefs,
      columnsAsideActiveRef,
      setColumnsAsideStyle,
      setColumnsAsideLayout,
      onColumnsAsideMenuClick,
      onColumnsAsideMenuMouseenter,
      onColumnsAsideMenuMouseLeave,
      onCulumnsAsideDown,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.layout-columns-aside {
  width: 70px;
  height: 100%;
  background: var(--bg-columnsMenuBar);
  ul {
    position: relative;
    li {
      color: var(--bg-columnsMenuBarColor);
      width: 100%;
      height: 50px;
      text-align: center;
      display: flex;
      cursor: pointer;
      position: relative;
      z-index: 1;
      .columns-vertical {
        margin: auto;
        .columns-vertical-title {
          padding-top: 1px;
        }
      }
      .columns-horizontal {
        display: flex;
        height: 50px;
        width: 100%;
        align-items: center;
        padding: 0 5px;
        i {
          margin-right: 3px;
        }
        a {
          display: flex;
          .columns-horizontal-title {
            padding-top: 1px;
          }
        }
      }
      a {
        text-decoration: none;
        color: var(--bg-columnsMenuBarColor);
      }
    }
    .layout-columns-active {
      color: var(--color-whites) !important;
      transition: 0.3s ease-in-out;
    }
    .layout-columns-hover {
      color: var(--color-primary);
      a {
        color: var(--color-primary);
      }
    }
    .columns-round {
      background: var(--color-primary);
      color: var(--color-whites);
      position: absolute;
      left: 50%;
      top: 2px;
      height: 44px;
      width: 65px;
      transform: translateX(-50%);
      z-index: 0;
      transition: 0.3s ease-in-out;
      border-radius: 5px;
    }
    .columns-card {
      @extend .columns-round;
      top: 0;
      height: 50px;
      width: 100%;
      border-radius: 0;
    }
  }
}
</style>
