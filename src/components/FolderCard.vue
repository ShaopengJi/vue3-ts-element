<template>
  <div class="folder-card flex flex-align-center">
    <div>
      <el-icon class="folder-card-icon">
        <component :is="getIcon()"></component>
      </el-icon>
    </div>
    <div class="folder-card-main flex flex-between flex-align-center w-100">
      <div class="folder-card-title">
        <div>
          {{ name }}
        </div>
        <div class="folder-card-describe">{{ value }}</div>
      </div>
      <div class="folder-card-more">
        <el-icon class="folder-card-more-icon"><MoreFilled /></el-icon>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MoreFilled } from "@element-plus/icons-vue"
const cardWidth = ref(`calc(100% / ${4} - 10px)`)
interface Folder {
  name: string
  value: string
}
const { name, value } = defineProps<Folder>()
function getIcon() {
  switch (name) {
    case "vue":
      return "el-icon-document-checked"
    case "js":
      return "el-icon-document-checked"
    case "ts":
      return "el-icon-document-checked"
    case "css":
      return "el-icon-document-checked"
    case "html":
      return "el-icon-document-checked"
  }
}
</script>
<style lang="scss" scoped>
.folder-card {
  padding: 10px;
  width: v-bind(cardWidth);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 5px;
  cursor: pointer;
}
.folder-card:hover {
  background-color: rgba(0, 0, 0, 0.05);
}
.folder-card-main {
}
.folder-card-more {
  cursor: pointer;
}
.folder-card-describe {
  font-size: 12px;
}
.folder-card-more-icon:hover {
  color: red;
}
</style>
