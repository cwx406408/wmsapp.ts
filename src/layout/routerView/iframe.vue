<template>
  <div class="layout-view-bg-white flex mt1"
    :style="{ height: `calc(100vh - ${setIframeHeight}`, border: 'none'}"
    v-loading="iframeLoading">
    <iframe :src="iframeUrl" frameborder="0" height="100%" width="100%" id="iframe" v-show="!iframeLoading"></iframe>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store/index'
import { computed, defineComponent, nextTick, onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'layoutIframeView',
  setup () {
    const route = useRoute()
    const store = useStore()
    const state = reactive({
      iframeLoading: true,
      iframeUrl: ''
    })

    const initIframeLoad = () => {
      state.iframeUrl = route.meta.link as string
      nextTick(() => {
        state.iframeLoading = true
        const iframe = document.getElementById('iframe')
        if (!iframe) return false
        iframe.onload = () => {
          state.iframeLoading = false
        }
      })
    }

    const setIframeHeight = computed(() => {
      const { isTagsview } = store.state.themeConfig.themeConfig
      const { isTagsViewCurrentFull } = store.state.tagsViewRoutes
      if (isTagsViewCurrentFull) return '0px'
      else {
        if (isTagsview) return '83px'
        else return '49px'
      }
    })

    onMounted(() => {
      initIframeLoad()
    })

    watch(() => route.path, () => initIframeLoad())

    return { setIframeHeight, ...toRefs(state) }
  }
})
</script>
