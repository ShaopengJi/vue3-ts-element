import { defineStore } from "pinia"
export const useAppStore = defineStore("app", () => {
  const app = reactive({
    sidebar: {
      opened: ref(false),
      withoutAnimation: ref(false),
      // 侧边栏折叠状态
      collapse: ref(false)
    }
  })
  const collapseSideBar = () => {
    app.sidebar.collapse = !app.sidebar.collapse
  }
  return {
    app,
    collapseSideBar
  }
})

export default useAppStore
