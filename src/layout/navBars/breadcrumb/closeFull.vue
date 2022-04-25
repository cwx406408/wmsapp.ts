<template>
  <div class="layout-navbars-close-full" v-if="isCurrentTagsViewFull">
    <div class="layout-navbars-close-full-box" :title="'message.tagsView.closeFullscreen'" @click="onCloseFullscreen"></div>
      <i class="el-icon-close"></i>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'layoutCloseFull',
  setup () {
    const store = useStore()
    const state = reactive<any>({})

    const isCurrentTagsViewFull = computed(() => {
      return store.state.tagsViewRoutes.isTagsViewCurrentFull
    })

    const onCloseFullscreen = () => {
      store.dispatch('tagsViewRoutes/setCurrenFullscreen', false)
    }

    return { isCurrentTagsViewFull, onCloseFullscreen, ...toRefs(state) }
  }
})
</script>

<style scoped lang="scss">
.layout-navbars-close-full {
  position: fixed;
  z-index: 9999999999;
  right: -30px;
  top: -30px;
  .layout-navbars-close-full-box {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: relative;
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    i {
      position: absolute;
      left: 11px;
      top: 35px;
      color: #333333;
      transition: all 0.3s ease;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
      i {
        color: var(--color-primary);
        transition: all 0.3s ease;
      }
    }
  }
}
</style>
