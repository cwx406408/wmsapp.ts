<template>
  <div class="layout-breadcrumb-seting">
    <el-drawer title="设置" v-model="getThemeConfig.isDrawer" direction="rtl" destroy-on-close size="240px" @close="onDrawerClose">
      <el-scrollbar class="layout-breadcrumb-seting-bar">
        <el-divider content-position="left">Title</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.primary" size="small" @change="onColorPickerChange('primary')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.success" size="small" @change="onColorPickerChange('success')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.info" size="small" @change="onColorPickerChange('info')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.warning" size="small" @change="onColorPickerChange('warning')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.danger" size="small" @change="onColorPickerChange('danger')"></el-color-picker>
          </div>
        </div>

        <el-divider content-position="left">Title</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">topBar</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBar" size="small" @change="onBgColorPickerChange('topBar')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">menuBar</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBar" size="small" @change="onBgColorPickerChange('menuBar')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">columnsMenuBar</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.columnsMenuBar" size="small" @change="onBgColorPickerChange('columnsMenuBar')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">topBarColor</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.topBarColor" size="small" @change="onBgColorPickerChange('topBarColor')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">menuBarColor</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.menuBarColor" size="small" @change="onBgColorPickerChange('menuBarColor')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex">
          <div class="layout-breadcrumb-seting-bar-flex-label">columnsMenuBarColor</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-color-picker v-model="getThemeConfig.columnsMenuBarColor" size="small" @change="onBgColorPickerChange('columnsMenuBarColor')"></el-color-picker>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt10">
          <div class="layout-breadcrumb-seting-bar-flex-label">isTopBarColorGradual</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTopBarColorGradual" @change="onTopBarGradualChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt14">
          <div class="layout-breadcrumb-seting-bar-flex-label">isMenuBarColorGradual</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorGradual" @change="onMenuBarGradualChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt14">
          <div class="layout-breadcrumb-seting-bar-flex-label">isColumnsMenuBarColorGradual</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isColumnsMenuBarColorGradual" @change="onColorPickerChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt14">
          <div class="layout-breadcrumb-seting-bar-flex-label">isMenuBarColorHighlight</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isMenuBarColorHighlight" @change="onMenuBarHighlightChange"></el-switch>
          </div>
        </div>

        <!--界面设置-->
        <el-divider content-position="left">Title</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isCollapse</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCollapse" @change="onThemeConfigChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isUniqueOpened</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isUniqueOpened" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isCollapse</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFixedHeader" @change="onIsFixedHeaderChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15" :style="{ opacity: getThemeConfig.layout !== 'classic' ? 0.5 : 1}">
          <div class="layout-breadcrumb-seting-bar-flex-label">isClassicSplitMenu</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isClassicSplitMenu" :disabled="getThemeConfig.layout !== 'classic'" @change="onClassicSplitMenuChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isLockScreen</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isLockScreen" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt11">
          <div class="layout-breadcrumb-seting-bar-flex-label">lockScreenTime</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input-number
              v-model="getThemeConfig.lockScreenTime"
              controls-position="right"
              :min="1"
              :max="9999"
              @change="setLocalThemeConfig"
              size="mini"
              style="width: 90px"
            ></el-input-number>
          </div>
        </div>

        <!--界面显示-->
        <el-divider content-position="left">Title</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isShowLogo</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShowLogo" @change="onIsShowLogoChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15"
          :style="{ opacity: (getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse') ? 0.5 : 1}"
          >
          <div class="layout-breadcrumb-seting-bar-flex-label">isBreadcrumb</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isBreadcrumb"
              :disabled="(getThemeConfig.layout === 'classic' || getThemeConfig.layout === 'transverse')"
              @change="onIsBreadCrumbChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isBreadcrumbIcon</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isBreadcrumbIcon" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isTagsview</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsview" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isTagsviewIcon</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isTagsviewIcon" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isCacheTagsView</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isCacheTagsView" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isSortableTagsView</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isSortableTagsView" @change="onSortableTagsViewChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isShareTagsView</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isShareTagsView" @change="onShareTagsViewChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isFooter</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isFooter" @change="setLocalThemeConfig"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isGrayscale</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isGrayscale" @change="onAddFilterChange('grayscale')"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isInvert</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isInvert" @change="onAddFilterChange('invert')"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isIsDark</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isIsDark" @change="onAddDarkChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isWartermark</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-switch v-model="getThemeConfig.isWartermark" @change="onWatermarkChange"></el-switch>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">isWartermark</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-input v-model="getThemeConfig.wartermarkText" size="mini" style="width: 90px" @input="onWatermarkTextInput($event)"></el-input>
          </div>
        </div>

        <!--其他设置-->
        <el-divider content-position="left">Title</el-divider>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">tagsStyle</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.tagsStyle" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="风格1" value="tags-style-one"></el-option>
              <el-option label="风格2" value="tags-style-two"></el-option>
              <el-option label="风格3" value="tags-style-three"></el-option>
              <el-option label="风格4" value="tags-style-four"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">animation</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.animation" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="slide-right" value="slide-right"></el-option>
              <el-option label="slide-left" value="slide-left"></el-option>
              <el-option label="opacitys" value="opacitys"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15">
          <div class="layout-breadcrumb-seting-bar-flex-label">columnsAsideStyle</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.columnsAsideStyle" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="圆角" value="columns-round"></el-option>
              <el-option label="卡片" value="columns-card"></el-option>
            </el-select>
          </div>
        </div>
        <div class="layout-breadcrumb-seting-bar-flex mt15 mb27">
          <div class="layout-breadcrumb-seting-bar-flex-label">columnsAsideLayout</div>
          <div class="layout-breadcrumb-seting-bar-flex-value">
            <el-select v-model="getThemeConfig.columnsAsideLayout" placeholder="请选择" size="mini" style="width: 90px" @change="setLocalThemeConfig">
              <el-option label="水平" value="columns-horizontal"></el-option>
              <el-option label="垂直" value="columns-vertical"></el-option>
            </el-select>
          </div>
        </div>

        <!--布局切换-->
        <el-divider content-position="left">Title</el-divider>
        <div class="layout-drawer-content-flex">
          <div class="layout-drawer-content-item" @click="onSetLayout('defaults')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'defaults' }">
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'defaults' }">
              <div class="layout-tips-box">
                <p class="layout-tips-box">Defaults</p>
              </div>
            </div>
          </div>

          <div class="layout-drawer-content-item" @click="onSetLayout('classic')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'classic' }">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container is-vertical">
                <aside class="el-aside" style="width: 10px"></aside>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'classic' }">
              <div class="layout-tips-box">
                <p class="layout-tips-box">Classic</p>
              </div>
            </div>
          </div>

          <div class="layout-drawer-content-item" @click="onSetLayout('transverse')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'transverse' }">
              <header class="el-header" style="height: 10px"></header>
              <section class="el-container is-vertical">
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'transverse' }">
              <div class="layout-tips-box">
                <p class="layout-tips-box">Classic</p>
              </div>
            </div>
          </div>

          <div class="layout-drawer-content-item" @click="onSetLayout('columns')">
            <section class="el-container el-circular" :class="{ 'drawer-layout-active': getThemeConfig.layout === 'columns' }">
              <aside class="el-aside-dark" style="width: 10px"></aside>
              <aside class="el-aside" style="width: 20px"></aside>
              <section class="el-container is-vertical">
                <header class="el-header" style="height: 10px"></header>
                <main class="el-main"></main>
              </section>
            </section>
            <div class="layout-tips-warp" :class="{ 'layout-tips-warp-active': getThemeConfig.layout === 'columns' }">
              <div class="layout-tips-box">
                <p class="layout-tips-box">Columns</p>
              </div>
            </div>
          </div>
        </div>
        <div class="copy-config">
          <el-alert title="Tips" type="warning" :closable="false"></el-alert>
          <el-button
            size="small"
            class="copy-config-btn"
            icon="el-icon-document-copy"
            type="primary"
            ref="copyConfigBtnRef"
            @click="onCopyConfigClick"
          >Copy</el-button>
          <el-button size="small" class="copy-config-btn-reset" icon="el-icon-refresh-right" type="info" @click="onResetConfigClick"
          >Reset</el-button>
        </div>
      </el-scrollbar>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { useStore } from '@/store'
import commonFunction from '@/utils/commonFunction'
import { getLightColor } from '@/utils/theme'
import { Local } from '@/utils/storage'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, onUnmounted } from 'vue'
import watermark from '@/utils/watermark'
import { veritySpace } from '@/utils/toolsValidate'

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
      setDispatchThemeConfig()
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
      onTopBarGradualChange()
      onMenuBarGradualChange()
      onColumnsMenuBarGradualChange()
      setDispatchThemeConfig()
    }

    const onTopBarGradualChange = () => {
      setGradualFun('.layout-container-breadCrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar)
    }

    const onMenuBarGradualChange = () => {
      setGradualFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar)
    }

    const onColumnsMenuBarGradualChange = () => {
      setGradualFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar)
    }

    const setGradualFun = (el: string, isGradual: boolean, color: string) => {
      nextTick(() => {
        const els = document.querySelector(el)
        if (!els) return false
        if (isGradual) els.setAttribute('style', `background-image:linear-gradient(to bottom left , ${color}, ${getLightColor(color, 0.6)})`)
        else els.setAttribute('style', `background-image:${color}`)
        setLocalThemeConfig()
      })
    }

    const onMenuBarHighlightChange = () => {
      nextTick(() => {
        setTimeout(() => {
          const elsItems = document.querySelectorAll('.el-menu-item')
          const elActive = document.querySelector('.el-menu-item .is-active')
          if (!elActive) return false
          if (getThemeConfig.value.isMenuBarColorHighlight) {
            elsItems.forEach(element => element.setAttribute('id', ''))
            elActive.setAttribute('id', 'add-is-active')
            const id = elActive.getAttribute('id') as any
            Local.set('menuBarHighlightId', id)
          } else {
            elActive.setAttribute('id', '')
          }
          setLocalThemeConfig()
        }, 0)
      })
    }

    const onThemeConfigChange = () => {
      onMenuBarHighlightChange()
      setDispatchThemeConfig()
    }

    const onIsFixedHeaderChange = () => {
      getThemeConfig.value.isFixedHeaderChange = !getThemeConfig.value.isFixedHeader
      setLocalThemeConfig()
    }

    const onClassicSplitMenuChange = () => {
      getThemeConfig.value.isBreadcrumb = false
      setLocalThemeConfig()
      proxy.mittBus.emit('getBreadcrumbIndexSetFilterRoutes')
    }

    const onIsShowLogoChange = () => {
      getThemeConfig.value.isShowLogoChange = !getThemeConfig.value.isShowLogo
      setLocalThemeConfig()
    }

    const onIsBreadCrumbChange = () => {
      if (getThemeConfig.value.layout === 'classic') {
        getThemeConfig.value.isClassicSplitMenu = false
        setLocalThemeConfig()
      }
    }

    const onSortableTagsViewChange = () => {
      proxy.mittBus.emit('openOrCloseSortable')
      setLocalThemeConfig()
    }

    const onShareTagsViewChange = () => {
      proxy.mittBus.emit('openShareTagsView')
      setLocalThemeConfig()
    }

    const onAddFilterChange = (attr: string) => {
      if (attr === 'grayscale') {
        if (getThemeConfig.value.isGrayscale) getThemeConfig.value.isInvert = false
      } else {
        if (getThemeConfig.value.isInvert) getThemeConfig.value.isGrayscale = false
      }

      const cssAttr =
        attr === 'grayscale' ? `grayscale(${getThemeConfig.value.isGrayscale ? 1 : 0})` : `isInvert(${getThemeConfig.value.isInvert ? '80%' : '0%'})`
      const appEle = document.body
      appEle.setAttribute('style', `filter: ${cssAttr}`)
      setLocalThemeConfig()
    }

    const onAddDarkChange = () => {
      const body = document.documentElement
      if (getThemeConfig.value.isIsDark) body.setAttribute('data-theme', 'dark')
      else body.setAttribute('data-theme', '')
    }

    const onWatermarkChange = () => {
      if (getThemeConfig.value.isWartermark) {
        watermark.set(getThemeConfig.value.wartermarkText)
      } else {
        watermark.del()
      }
      setLocalThemeConfig()
    }

    const onWatermarkTextInput = (val: string) => {
      getThemeConfig.value.wartermarkText = veritySpace(val)
      if (getThemeConfig.value.wartermarkText === '') return false
      if (getThemeConfig.value.isWartermark) watermark.set(getThemeConfig.value.wartermarkText)
      setLocalThemeConfig()
    }

    const onSetLayout = (layout: string) => {
      Local.set('oldLayout', layout)
      if (getThemeConfig.value.layout === layout) return false
      getThemeConfig.value.layout = layout
      getThemeConfig.value.isDrawer = false
      initLayoutChangeFun()
      onMenuBarHighlightChange()
    }

    const initLayoutChangeFun = () => {
      onBgColorPickerChange('menuBar')
      onBgColorPickerChange('menuBarColor')
      onBgColorPickerChange('topBar')
      onBgColorPickerChange('topBarColor')
    }

    const onDrawerClose = () => {
      getThemeConfig.value.isFixedHeaderChange = false
      getThemeConfig.value.isShowLogoChange = false
      getThemeConfig.value.isDrawer = false
      setLocalThemeConfig()
    }

    const openDrawer = () => {
      getThemeConfig.value.isDrawer = true
    }

    const setDispatchThemeConfig = () => {
      setLocalThemeConfig()
      setLocalThemeConfigStyle()
    }

    const setLocalThemeConfig = () => {
      Local.remove('themeConfig')
      Local.set('themeConfig', getThemeConfig.value)
    }

    const setLocalThemeConfigStyle = () => {
      Local.set('themeConfigStyle', document.documentElement.style.cssText)
    }

    const onCopyConfigClick = () => {
      const copiedThemeConfig = Local.get('themeConfig') as typeof getThemeConfig.value
      copiedThemeConfig.isDrawer = false
      copyText(JSON.stringify(copiedThemeConfig)).then(() => {
        getThemeConfig.value.isDrawer = false
      })
    }

    const onResetConfigClick = () => {
      Local.clear()
      window.location.reload()
    }

    const initSetStyle = () => {
      setTimeout(() => {
        onTopBarGradualChange()
        onMenuBarGradualChange()
        onColumnsMenuBarGradualChange()
        onMenuBarHighlightChange()
      }, 1300)
    }

    onMounted(() => {
      nextTick(() => {
        if (!Local.get('frequency')) initLayoutChangeFun()
        Local.set('frequency', 1)
        proxy.mittBus.on('onSignInClick', () => {
          initSetStyle()
        })
        proxy.mittBus.on('onMenuClick', () => {
          onMenuBarHighlightChange()
        })
        proxy.mittBus.on('layoutMobileResize', (res: any) => {
          getThemeConfig.value.layout = res.layout
          getThemeConfig.value.isDrawer = false
          initLayoutChangeFun()
          onMenuBarHighlightChange()
        })
        setTimeout(() => {
          initSetStyle()
          if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale')
          if (getThemeConfig.value.isInvert) onAddFilterChange('invert')
          if (getThemeConfig.value.isIsDark) onAddDarkChange()
          onWatermarkChange()
        }, 100)
      })
    })
    onUnmounted(() => {
      proxy.mittBus.off('onMenuClick')
      proxy.mittBus.off('onSignInClick')
      proxy.mittBus.off('layoutMobileResize')
    })

    return {
      onColorPickerChange,
      onBgColorPickerChange,
      onTopBarGradualChange,
      onMenuBarGradualChange,
      onColumnsMenuBarGradualChange,
      onMenuBarHighlightChange,
      onThemeConfigChange,
      onIsFixedHeaderChange,
      onClassicSplitMenuChange,
      onIsShowLogoChange,
      onIsBreadCrumbChange,
      onSortableTagsViewChange,
      onShareTagsViewChange,
      onAddFilterChange,
      onAddDarkChange,
      onWatermarkChange,
      onWatermarkTextInput,
      onSetLayout,
      onDrawerClose,
      openDrawer,
      setLocalThemeConfig,
      onCopyConfigClick,
      onResetConfigClick,
      getThemeConfig
    }
  }
})
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
  height: calc(100vh - 50px);
  padding: 0 15px;
  ::v-deep(.el-scrollbar__view) {
    overflow-x: hidden !important;
  }
  .layout-breadcrumb-seting-bar-flex {
    display: flex;
    align-items: center;
    &-label {
      flex: 1;
      color: #666666;
    }
  }
  .layout-drawer-content-flex {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -5px;
    .layout-drawer-content-item {
      width: 50%;
      height: 70px;
      cursor: pointer;
      border: 1px solid transparent;
      position: relative;
      padding: 5px;
      .el-container {
        height: 100%;
        .el-aside-dark {
          background-color: #b3c0d1;
        }
        .el-aside {
          background-color: #d3dce6;
        }
        .el-header {
          background-color: #b3c0d1;
        }
        .el-main {
          background-color: #e9eef3;
        }
      }
      .el-circular {
        border-radius: 2px;
        overflow: hidden;
        border: 1px solid transparent;
        transition: all 0.3s ease-in-out;
      }
      .drawer-layout-active {
        border: 1px solid;
        border-color: var(--color-primary);
      }
      .layout-tips-warp,
      .layout-tips-warp-active {
        transition: all 0.3s ease-in-out;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid;
        border-color: var(--color-primary-light-4);
        border-radius: 100%;
        padding: 4px;
        .layout-tips-box {
          transition: inherit;
          width: 30px;
          height: 30px;
          z-index: 9;
          border: 1px solid;
          border-color: var(--color-primary-light-4);
          border-radius: 100%;
          .layout-tips-txt {
            transition: inherit;
            position: relative;
            top: 5px;
            font-size: 12px;
            line-height: 1;
            letter-spacing: 2px;
            white-space: nowrap;
            color: var(--color-primary-light-4);
            text-align: center;
            transform: rotate(30deg);
            left: -1px;
            background-color: #e9eef3;
            width: 32px;
            height: 17px;
            line-height: 17px;
          }
        }
      }
      .layout-tips-warp-active {
        border: 1px solid;
        border-color: var(--color-primary);
        .layout-tips-box {
          border: 1px solid;
          border-color: var(--color-primary);
          .layout-tips-txt {
            color: var(--color-primary) !important;
            background-color: #e9eef3 !important;
          }
        }
      }
      &:hover {
        .el-circular {
          transition: all 0.3s ease-in-out;
          border: 1px solid;
          border-color: var(--color-primary);
        }
        .layout-tips-warp {
          transition: all 0.3s ease-in-out;
          border-color: var(--color-primary);
          .layout-tips-box {
            transition: inherit;
            border-color: var(--color-primary);
            .layout-tips-txt {
              transition: inherit;
              color: var(--color-primary) !important;
              background-color: #e9eef3 !important;
            }
          }
        }
      }
    }
  }
  .copy-config {
    margin: 10px 0;
    .copy-config-btn {
      width: 100%;
      margin-top: 15px;
    }
    .copy-config-btn-reset {
      width: 100%;
      margin: 10px 0 0;
    }
  }
}
</style>
