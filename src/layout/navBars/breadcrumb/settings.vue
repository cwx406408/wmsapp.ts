<template>
  <div>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import commonFunction from '@/utils/commonFunction'
import { getLightColor } from '@/utils/theme'
import { computed, defineComponent, getCurrentInstance } from 'vue'

export default defineComponent({
  name: 'layoutBreadcrumSetting',
  setup () {
    const { proxy } = getCurrentInstance() as any
    const store = useStore()
    const { copyText } = commonFunction()
    const getThemeConfig = computed(() => {
      return store.state.themeConfig.themeConfig
    })
    const onColorPickerChange = (color: string) => {
      setPropertyFun(`--color-${color}`, getProperty(getThemeConfig.value, color as any))
    }

    const setPropertyFun = (color: string, targetVal: string) => {
      document.documentElement.style.setProperty(color, targetVal)
      for (let i = 1; i <= 9; i++) {
        document.documentElement.style.setProperty(`${color}-light-${i}`, getLightColor(targetVal, i / 10))
      }
    }

    const getProperty = <T, K extends keyof T>(o: T, name: K): T[K] => {
      return o[name]
    }

    const onBgColorPickerChange = (bg: string) => {
      setPropertyFun(`--bg-${bg}`, getProperty(getThemeConfig.value, bg as any))
    }
  }
})
</script>
