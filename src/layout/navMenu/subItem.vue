<template>
  <template v-for="val in chils" :key="val.path">
    <el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0">
      <template #title>
        <i :class="val.meta?.icon"></i>
        <span>{{ val.meta?.title}}</span>
      </template>
      <sub-item :chil="val?.children"></sub-item>
    </el-sub-menu>
    <el-sub-menu :index="val.path" v-else>
      <template v-if="!val.meta?.isLink || (val.meta?.isLink && val.meta?.isIframe)">
        <i :class="val.meta?.icon"></i>
        <span>{{ val.meta?.title}}</span>
      </template>
      <template v-else>
        <a :href="val.meta?.link" target="_blank" rel="opener">
          <i :class="val.meta.icon"></i>
          {{val.meta?.title}}
        </a>
      </template>
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
import { RouteData } from '@/store/interface'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'navMenuSubItem',
  props: {
    chil: {
      default: (): Array<RouteData> => []
    }
  },
  setup (props) {
    const chils = computed(() => {
      return props.chil
    })

    return { chils }
  }
})
</script>
