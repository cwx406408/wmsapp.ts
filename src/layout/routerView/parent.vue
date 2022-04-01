<template>
  <div class="h100">
    <router-view v-slot="{ Component }">
      <transition :name="setTransitionName" mode="out-in">
        <keep-alive :include="keepAliveNameList">
          <component :is="Component" :key="refreshRouterViewKey" class="w100"></component>
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeMount, onUnmounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'layoutParentView',
  setup () {
    const { proxy } = getCurrentInstance() as any
    const route = useRoute()
    const store = useStore()
    type stateType = {
      refreshRouterViewKey: string | null,
      keepAliveNameList: Array<string>,
      keepAliveNameNewList: Array<string>
    }
    const state = reactive<stateType>({
      refreshRouterViewKey: null,
      keepAliveNameList: [],
      keepAliveNameNewList: []
    })

    // 设置主界面切换动画
    const setTransitionName = computed(() => {
      return store.state.themeConfig.themeConfig.animation
    })

    // 获取布局配置信息
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    // 获取组件缓存列表
    const getKeepAliveNames = computed(() => {
      return store.state.keepAliveNames.keepAliveNames
    })

    onBeforeMount(() => {
      state.keepAliveNameList = getKeepAliveNames.value
      proxy.mittBus.on('onTagsViewRefreshRouterView', (fullPath: string) => {
        state.keepAliveNameList = getKeepAliveNames.value.filter((name) => route.name !== name)
        state.refreshRouterViewKey = null
        nextTick(() => {
          state.refreshRouterViewKey = fullPath
          state.keepAliveNameList = getKeepAliveNames.value
        })
      })
    })

    onUnmounted(() => {
      proxy.mittBus.off('onTagsViewRefreshRouterView')
    })

    watch(() => route.fullPath, () => { state.refreshRouterViewKey = route.fullPath })

    return { setTransitionName, getThemeConfig, getKeepAliveNames, ...toRefs(state) }
  }
})
</script>
