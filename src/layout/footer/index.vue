<template>
  <div class="layout-footer mt15" v-show="isDelayFooter">
    <div class="layout-footer-warp">
      <div>vue-next</div>
      <div class="mt5">{{ 'message.copyright.one5' }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { onBeforeRouteUpdate } from 'vue-router'

export default defineComponent({
  name: 'layoutFooter',
  setup () {
    const state = reactive({
      isDelayFooter: true
    })

    onBeforeRouteUpdate(() => {
      state.isDelayFooter = false
      setTimeout(() => {
        state.isDelayFooter = true
      }, 800)
    })

    return { ...toRefs(state) }
  }
})
</script>

<style scoped lang="scss">
.layout-footer {
  width: 100%;
  display: flex;
  &-warp {
    margin: auto;
    color: var(--el-text-color-secondary);
    text-align: center;
    animation: logoAnimation 0.3s ease-in-out;
  }
}
</style>
