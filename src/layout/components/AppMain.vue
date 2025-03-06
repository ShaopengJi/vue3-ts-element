<template>
  <el-main class="layout-main">
    <el-scrollbar
      class="layout-main-scrollbar"
      :style="layoutMainScrollbarStyle"
      ref="layoutMainScrollbarRef"
    >
      <router-view v-slot="{ Component }">
        <transition :name="config.layout.mainAnimation" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </el-main>
</template>

<script setup lang="ts">
import { reactive, onMounted, watch, onBeforeMount, onUnmounted, nextTick } from "vue"
import { useRoute, type RouteLocationNormalized } from "vue-router"
import useCurrentInstance from "@/utils/useCurrentInstance"
import { useConfig } from "@/stores/config"
// import { useNavTabs } from "@/stores/navTabs"
import type { ScrollbarInstance } from "element-plus"
import type { CSSProperties } from "vue"
import { mainHeight } from "@/utils/layout"
/**
 * 前后台布局的主体的滚动条组件ref
 */
const layoutMainScrollbarRef = ref<ScrollbarInstance>()

/**
 * 前后台布局的主体滚动条的额外样式，包括高度
 */
const layoutMainScrollbarStyle = computed<CSSProperties>(() => mainHeight())

defineOptions({
  name: "layoutMain"
})

const { proxy } = useCurrentInstance()

const route = useRoute()
const config = useConfig()
// const navTabs = useNavTabs()

const state: {
  componentKey: string
  keepAliveComponentNameList: string[]
} = reactive({
  componentKey: route.fullPath,
  keepAliveComponentNameList: []
})

const addKeepAliveComponentName = function (keepAliveName: string | undefined) {
  if (keepAliveName) {
    let exist = state.keepAliveComponentNameList.find((name: string) => {
      return name === keepAliveName
    })
    if (exist) return
    state.keepAliveComponentNameList.push(keepAliveName)
  }
}

// const addActiveRouteKeepAlive = () => {
//   if (navTabs.state.activeRoute) {
//     const tabView = navTabs.getTabsViewDataByRoute(navTabs.state.activeRoute)
//     if (tabView && typeof tabView.meta?.keepalive == "string") {
//       addKeepAliveComponentName(tabView.meta.keepalive)
//     }
//   }
// }

// onBeforeMount(() => {
//   proxy.eventBus.on("onTabViewRefresh", (menu: RouteLocationNormalized) => {
//     state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter(
//       (name: string) => menu.meta.keepalive !== name
//     )
//     state.componentKey = ""
//     nextTick(() => {
//       state.componentKey = menu.fullPath
//       addKeepAliveComponentName(menu.meta.keepalive as string)
//     })
//   })
//   proxy.eventBus.on("onTabViewClose", (menu: RouteLocationNormalized) => {
//     state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter(
//       (name: string) => menu.meta.keepalive !== name
//     )
//   })
// })

onUnmounted(() => {
  // proxy.eventBus.off("onTabViewRefresh")
  // proxy.eventBus.off("onTabViewClose")
})

onMounted(() => {
  // 确保刷新页面时也能正确取得当前路由 keepalive 参数（热更新）
  // addActiveRouteKeepAlive()
})

watch(
  () => route.fullPath,
  () => {
    state.componentKey = route.fullPath
    // addActiveRouteKeepAlive()
  }
)
</script>

<style scoped lang="scss">
.layout-container .layout-main {
  padding: 0 !important;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.layout-main-scrollbar {
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
