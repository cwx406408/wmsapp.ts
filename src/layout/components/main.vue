<template>
  <el-main class="layout-main">
    <el-scrollbar
    class="layout-scrollbar"
    ref="layoutScrollbarRef"
    :style="{
      minHeight: `calc(100vh - ${headerHeight})`,
      padding: currentRouteMeta.isLink && currentRouteMeta.isIframe ? 0 : '',
      transition: 'padding 0.3s ease-in-out'
    }"></el-scrollbar>
    <LayoutParentView />
    <Footer v-if="getThemeConfig.isFooter"></Footer>
  </el-main>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, getCurrentInstance, onBeforeMount, reactive, toRefs, watch } from 'vue'
import { RouteMeta, useRoute } from 'vue-router'
import LayoutParentView from '@/layout/routerView/parent.vue'
import Footer from '@/layout/footer/index.vue'
export default defineComponent({
  name: 'layoutMain',
  components: { LayoutParentView, Footer },
  setup () {
    const { proxy } = getCurrentInstance() as any
    const route = useRoute()
    const store = useStore()
    type StateType = { headerHeight: string, currentRouteMeta: RouteMeta}
    const state = reactive<StateType>({
      headerHeight: '',
      currentRouteMeta: {}
    })

    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    const initHeaderHeight = () => {
      if (getThemeConfig.value.isTagsview) state.headerHeight = '84px'
      else state.headerHeight = '50px'
    }

    const initMeta = () => {
      state.currentRouteMeta = route.meta
    }

    onBeforeMount(() => {
      initHeaderHeight()
      initMeta()
    })

    watch(store.state.themeConfig.themeConfig, (val) => {
      state.headerHeight = val.isTagsview ? '84px' : '50px'
      if (val.isFixedHeaderChange !== val.isFixedHeader) {
        if (!proxy.$refs.layoutScrollbarRef) return false
        proxy.$refs.layoutScrollbarRef.update()
      }
    })

    watch(() => route.path, () => { state.currentRouteMeta = route.meta })

    return { getThemeConfig, ...toRefs(state) }
  }
})
</script>
