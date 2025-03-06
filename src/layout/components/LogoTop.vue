<template>
  <div class="layout-logo">
    <img class="logo-img" src="../../assets/logo.svg" alt="logo" />
    <div
      v-if="!config.layout.menuCollapse"
      :style="{ color: config.getColorVal('menuActiveColor') }"
      class="website-name"
    >
      {{ siteConfig.siteName }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConfig } from "@/stores/config"
import { useSiteConfig } from "@/stores/siteConfig"
// import { closeShade } from "@/utils/pageShade"
// import { setNavTabsWidth } from "@/utils/layout"

const config = useConfig()
const siteConfig = useSiteConfig()
</script>

<style scoped lang="scss">
.layout-logo {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 10px;
  background: "transparent";
}
.logo-img {
  width: 28px;
}
.website-name {
  display: block;
  width: 180px;
  padding-left: 4px;
  font-size: var(--el-font-size-extra-large);
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fold {
  margin-left: auto;
}
.unfold {
  margin: 0 auto;
}
</style>
