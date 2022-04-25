<template>
  <div class="layout-search-dialog">
    <el-dialog v-model="isShowSearch" width="300px" destroy-on-close :modal="false" fullscreen :show-close="false">
      <el-autocomplete
        v-model="menuQuery"
        :fetch-suggestions="menuSearch"
        placeholder="message.user.searchPlaceholder"
        prefix-icon="el-icon-search"
        ref="layoutMenuAutoCompleteRef"
        @select="onHandleSelect"
        @blur="onSearchBlur"
      >
        <template #default="{ item }">
          <div>
            <i :class="item.meta.icon" class="mr10"></i>{{item.meta.title}}
          </div>
        </template>
      </el-autocomplete>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import { TagsViewRouteData } from '@/store/interface'
import { defineComponent, nextTick, reactive, ref, toRefs } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'layoutBreadcrumbSearch',
  setup () {
    const layoutMenuAutoCompleteRef = ref()
    const store = useStore()
    const router = useRouter()
    type StateType = {
      isShowSearch: boolean,
      menuQuery: string,
      tagsViewList: Array<TagsViewRouteData>
    }
    const state = reactive<StateType>({
      isShowSearch: false,
      menuQuery: '',
      tagsViewList: []
    })

    const openSearch = () => {
      state.menuQuery = ''
      state.isShowSearch = true
      initTagsView()
      nextTick(() => {
        layoutMenuAutoCompleteRef.value.focus()
      })
    }

    const closeSearch = () => {
      state.isShowSearch = false
    }

    const menuSearch = (queryString: string, cb: any) => {
      const results = queryString ? state.tagsViewList.filter(createFilter(queryString)) : state.tagsViewList
      cb(results)
    }

    const createFilter = (queryString: string) => {
      return (restaurant: TagsViewRouteData) => {
        if (restaurant.path.toLowerCase().indexOf(queryString.toLocaleLowerCase()) > -1) {
          return true
        } else {
          return (restaurant.meta && restaurant.meta.title && restaurant.meta.title.toLowerCase().indexOf(queryString.toLocaleLowerCase()) > -1)
        }
      }
    }

    const initTagsView = () => {
      if (state.tagsViewList.length > 0) return false
      store.state.tagsViewRoutes.tagsViewRoutes.map((v) => {
        if (!v.meta?.isHide) state.tagsViewList.push(v)
      })
    }

    const onHandleSelect = (item: TagsViewRouteData) => {
      const { path, redirect } = item
      if (item.meta?.isLink && !item.meta?.isIframe) window.open(item.meta?.link)
      else if (redirect) router.push(path)
      closeSearch()
    }

    const onSearchBlur = () => {
      closeSearch()
    }

    return {
      layoutMenuAutoCompleteRef,
      openSearch,
      closeSearch,
      menuSearch,
      onHandleSelect,
      onSearchBlur,
      ...toRefs(state)
    }
  }
})
</script>

<style scoped lang="scss">
.layout-search-dialog {
  ::v-deep(.el-dialog) {
    box-shadow: unset !important;
    border-radius: 0 !important;
    background: rgba(0, 0, 0, 0.5);
  }
  ::v-deep(.el-autocomplete) {
    width: 560px;
    position: absolute;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
