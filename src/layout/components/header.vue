<template>
  <el-header class="layout-header" :height="setHeaderHeight" v-show="!isTagsViewCurrentFull"></el-header>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'layoutHeader',
  setup () {
    const store = useStore()

    const setHeaderHeight = computed(() => {
      const { isTagsview, layout } = store.state.themeConfig.themeConfig
      if (isTagsview && layout !== 'classic') return '84px'
      else return '50px'
    })

    const isTagsViewCurrentFull = computed(() => {
      return store.state.tagsViewRoutes.isTagsViewCurrentFull
    })

    return { setHeaderHeight, isTagsViewCurrentFull }
  }
})
</script>
