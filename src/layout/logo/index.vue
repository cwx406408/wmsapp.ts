<template>
  <div class="layout-logo" v-if="setShowLogo" @click="onThemeConfigChange">
    <img src="@/assets/logo.svg" class="layout-logo-medium-img">
    <span>{{ getThemeConfig.globalTitle }}</span>
  </div>
  <div class="layout-logo-size" v-else @click="onThemeConfigChange">
    <img src="@/assets/logo.svg" class="layout-logo-size">
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, getCurrentInstance } from 'vue'
export default defineComponent({
  name: 'layoutLogo',
  setup () {
    const { proxy } = getCurrentInstance() as any
    const store = useStore()
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })

    const setShowLogo = computed(() => {
      const { isCollapse, layout } = store.state.themeConfig.themeConfig
      return !isCollapse || layout === 'classic' || document.body.clientWidth < 1000
    })

    const onThemeConfigChange = () => {
      if (store.state.themeConfig.themeConfig.layout === 'transverse') return false
      proxy.mittBus.emit('onMenuClick')
      store.state.themeConfig.themeConfig.isCollapse = !store.state.themeConfig.themeConfig.isCollapse
    }

    return { setShowLogo, getThemeConfig, onThemeConfigChange }
  }
})
</script>

<style scoped lang="scss">
.layout-logo {
  width: 220px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(0 21 41 / 2%) 0px 1px 4px;
  color: var(--color-primary);
  font-size: 16px;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  &:hover {
    span {
      color: var(--color-primary-light-2);
    }
  }
  &-medium-img {
    width: 20px;
    margin-right: 5px;
  }
}
.layout-logo-size {
  width: 100%;
  height: 50px;
  display: flex;
  cursor: pointer;
  animation: logoAnimation 0.3s ease-in-out;
  &-img {
    width: 20px;
    margin: auto;
  }
  &:hover {
    img {
      animation: logoAnimation 0.3s ease-in-out;
    }
  }
}
</style>
