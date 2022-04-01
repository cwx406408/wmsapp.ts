<template>
  <div class="layout-view-bg-white flex layout-view-link" :style="{ height: `calc(100vh - ${setLinkHeight}`}">
    <a :href="currentRouteMeta.link" target="_blank" rel="opener" class="flex-margin">
      {{ currentRouteMeta.title }}：{{ currentRouteMeta.link }}
    </a>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store/index'

export default defineComponent({
  name: 'layoutLinkView',
  setup () {
    const route = useRoute()
    const store = useStore()
    type stateType = { currentRouteMeta: any }
    const state = reactive<stateType>({
      currentRouteMeta: {}
    })

    const setLinkHeight = computed(() => {
      const { isTagsview } = store.state.themeConfig.themeConfig
      if (isTagsview) return '114px'
      else return '80px'
    })

    watch(() => route.path, () => { state.currentRouteMeta = route.meta }, { immediate: true })

    return { setLinkHeight, ...toRefs(state) }
  }
})
</script>
