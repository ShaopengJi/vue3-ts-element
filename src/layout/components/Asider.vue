<template>
  <el-aside class="layout-aside-Default">
    <div class="layout-aside-collapse" @click="onMenuCollapse">
      <el-icon>
        <CaretRight v-if="config.layout.menuCollapse" />
        <CaretLeft v-else />
      </el-icon>
    </div>
    <Logo />
    <MenuVertical />
  </el-aside>
</template>

<script setup lang="ts">
import Logo from "./LogoTop.vue"
import MenuVertical from "./menuVertical.vue"
import { useConfig } from "@/stores/config"
import { CaretRight, CaretLeft } from "@element-plus/icons-vue"

defineOptions({
  name: "LayoutAside"
})

const config = useConfig()

const menuWidth = computed(() => config.menuWidth())
const collapseWidth = computed(() => config.collapseWidth())
const onMenuCollapse = function () {
  // if (config.layout.shrink && !config.layout.menuCollapse) {
  //   closeShade()
  // }
  config.setLayout("menuCollapse", !config.layout.menuCollapse)
  // // 等待侧边栏动画结束后重新计算导航栏宽度
  // setTimeout(() => {
  //   setNavTabsWidth()
  // }, 350)
}
</script>

<style scoped lang="scss">
.layout-aside-Default {
  background: var(--bg-color);
  height: calc(100vh);
  box-shadow: var(--el-box-shadow-light);
  border-radius: 0 var(--el-border-radius-base) var(--el-border-radius-base) 0;
  overflow: hidden;
  transition: width 0.3s ease;
  width: v-bind(menuWidth);
}
.shrink {
  position: fixed;
  top: 0;
  left: 0;
  // z-index: 9999999;
}
.layout-aside-collapse {
  position: fixed;
  left: v-bind(collapseWidth);
  top: calc(50vh - 25px);
  z-index: 999;
  width: 12px;
  height: 50px;
  line-height: 52px;
  border-radius: 10px 0 0 10px;
  background-color: white;
  color: var(--bg-color);
  transition: left 0.3s ease;
}
.el-menu {
  background-color: var(--bg-color) !important;
  border-right: none !important;
}
.el-menu > .is-active {
  color: white !important;
}
.el-menu-item:hover {
  background-color: var(--hover-color) !important;
}
.el-sub-menu:hover {
  background-color: var(--hover-color) !important;
}
.el-sub-menu__title:hover {
  background-color: var(--hover-color) !important;
}
.el-icon {
  /* flex-shrink: v-bind(flexShrink) !important; */
  justify-content: flex-end !important;
}
</style>
