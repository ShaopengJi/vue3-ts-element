<template>
  <el-scrollbar ref="layoutMenuScrollbarRef" class="vertical-menus-scrollbar">
    <el-menu
      class="layouts-menu-vertical"
      :collapse-transition="false"
      :unique-opened="config.layout.menuUniqueOpened"
      :default-active="state.defaultActive"
      :collapse="config.layout.menuCollapse"
      ref="layoutMenuRef"
    >
      <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu> -->
      <RouterLink to="/index">
        <el-menu-item route="/index" index="0">
          <el-icon><Document /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/docsCenter">
        <el-menu-item index="1">
          <el-icon><document /></el-icon>
          <template #title>文档中心</template>
        </el-menu-item>
      </RouterLink>
      <el-divider></el-divider>
      <div v-if="!config.layout.menuCollapse">知识库</div>
      <el-divider content-position="left">知识库</el-divider>
      <RouterLink to="/template">
        <el-menu-item index="2">
          <el-icon><Document /></el-icon>
          <template #title>模板库</template>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/module">
        <el-menu-item index="3">
          <el-icon><document /></el-icon>
          <template #title>模块库</template>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/sourceMaterial">
        <el-menu-item index="4">
          <el-icon><setting /></el-icon>
          <template #title>素材库</template>
        </el-menu-item>
      </RouterLink>
      <RouterLink to="/term">
        <el-menu-item index="5">
          <el-icon><Document /></el-icon>
          <template #title>术语库</template>
        </el-menu-item>
      </RouterLink>
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive } from "vue"
import { onBeforeRouteUpdate, useRoute, type RouteLocationNormalizedLoaded } from "vue-router"
import { useConfig } from "@/stores/config"
import { Location, Document, Setting } from "@element-plus/icons-vue"
// import { useNavTabs } from "@/stores/navTabs"
// import { layoutMenuRef, layoutMenuScrollbarRef } from "@/stores/refs"
// import { getMenuKey } from "@/utils/router"

const config = useConfig()
// const navTabs = useNavTabs()
const route = useRoute()

const state = reactive({
  defaultActive: ""
})

const verticalMenusScrollbarHeight = computed(() => {
  let menuTopBarHeight = 0
  if (config.layout.menuShowTopBar) {
    menuTopBarHeight = 50
  }
  return "calc(100vh - " + (32 + menuTopBarHeight) + "px)"
})

/**
 * 激活当前路由对应的菜单
 */
const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
  // 以路由 fullPath 匹配的菜单优先，且 fullPath 无匹配时，回退到 path 的匹配菜单
  //   const tabView = navTabs.getTabsViewDataByRoute(currentRoute)
  //   if (tabView) {
  //     state.defaultActive = getMenuKey(tabView, tabView.meta!.matched as string)
  //   }
}

// 滚动条滚动到激活菜单所在位置
const verticalMenusScroll = () => {
  //   nextTick(() => {
  //     let activeMenu: HTMLElement | null = document.querySelector(
  //       ".el-menu.layouts-menu-vertical li.is-active"
  //     )
  //     if (!activeMenu) return false
  //     layoutMenuScrollbarRef.value?.setScrollTop(activeMenu.offsetTop)
  //   })
}

onMounted(() => {
  currentRouteActive(route)
  verticalMenusScroll()
})

onBeforeRouteUpdate((to) => {
  currentRouteActive(to)
})
</script>
<style>
.vertical-menus-scrollbar {
  height: v-bind(verticalMenusScrollbarHeight);
  background-color: v-bind('config.getColorVal("menuBackground")');
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
.layouts-menu-vertical {
  border: 0;
  padding-bottom: 30px;
  --el-menu-bg-color: v-bind('config.getColorVal("menuBackground")');
  --el-menu-text-color: v-bind('config.getColorVal("menuColor")');
  --el-menu-active-color: v-bind('config.getColorVal("menuActiveColor")');
}
.el-sub-menu__icon-arrow {
  justify-content: flex-end;
}
.el-menu {
  margin: 0 8px !important;
}
.el-menu--collapse {
  margin: 0 !important;
}
</style>
