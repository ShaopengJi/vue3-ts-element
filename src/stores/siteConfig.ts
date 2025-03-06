import { defineStore } from "pinia"
import type { SiteConfig } from "@/stores/interface"

export const useSiteConfig = defineStore("siteConfig", {
  state: (): SiteConfig => {
    return {
      siteName: "魔块文档",
      recordNumber: "",
      version: "",
      cdnUrl: "",
      apiUrl: "",
      upload: {
        mode: "local"
      },
      initialize: false,
      userInitialize: false
    }
  },
  actions: {
    dataFill(state: SiteConfig) {
      this.$state = state
    },
    setInitialize(initialize: boolean) {
      this.initialize = initialize
    },
    setUserInitialize(userInitialize: boolean) {
      this.userInitialize = userInitialize
    }
  }
})
