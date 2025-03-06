import { defineStore } from "pinia"
import type { Layout } from "./interface"

export const useConfig = defineStore("config", () => {
  const layout: Layout = reactive({
    // 全局
    shrink: false,
    mainAnimation: "slide-right",
    isDark: false,

    // 侧边栏
    menuBackground: ["var(--bg-color)", "#1d1e1f"],
    menuColor: ["#303133", "#CFD3DC"],
    menuActiveBackground: ["#fff", "#1d1e1f"],
    menuActiveColor: ["#fff", "#000"],
    menuTopBarBackground: ["var(--bg-color)", "#1d1e1f"],
    menuWidth: 260,
    menuDefaultIcon: "fa fa-circle-o",
    menuCollapse: false,
    menuUniqueOpened: false,
    menuShowTopBar: true,

    // 顶栏
    headerBarTabColor: ["#000", "#CFD3DC"],
    headerBarTabActiveBackground: ["#fff", "#1d1e1f"],
    headerBarTabActiveColor: ["#000", "#409EFF"],
    headerBarBackground: ["#fff", "#1d1e1f"],
    headerBarHoverBackground: ["#f5f5f5", "#18222c"]
  })

  function menuWidth() {
    if (layout.shrink) {
      return layout.menuCollapse ? "0px" : layout.menuWidth + "px"
    }
    // 菜单是否折叠
    return layout.menuCollapse ? "64px" : layout.menuWidth + "px"
  }
  function collapseWidth() {
    if (layout.shrink) {
      return layout.menuCollapse ? "0px" : layout.menuWidth + "px"
    }
    // 菜单是否折叠
    return layout.menuCollapse ? "52px" : layout.menuWidth - 12 + "px"
  }
  const setLayout = (name: keyof Layout, value: any) => {
    layout[name] = value as never
  }

  const getColorVal = function (name: keyof Layout): string {
    const colors = layout[name] as string[]
    if (layout.isDark) {
      return colors[1]
    } else {
      return colors[0]
    }
  }

  return {
    layout,
    menuWidth,
    collapseWidth,
    setLayout,
    getColorVal
  }
})
