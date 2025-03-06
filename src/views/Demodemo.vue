<template>
  <el-button type="primary" @click="openDrawer = true">打开抽屉</el-button>
  <el-drawer
    append-to-body
    v-model="openDrawer"
    :show-close="false"
    style="background-color: var(--bg-color) !important; opacity: 1 !important"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass" style="color: white">This is a custom header!</h4>
      <el-button type="danger" @click="close">
        <el-icon class="el-icon--left"><CircleCloseFilled /></el-icon>
        Close
      </el-button>
    </template>
    <template #default>
      <div><span>想问的问题：</span><el-input /></div>
      <div>
        <span>问题类型</span
        ><el-select v-model="value" placeholder="Select" size="large" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div><span>选项值</span><el-input /></div>
    </template>
  </el-drawer>
</template>
<script setup lang="ts">
import { CircleCloseFilled } from "@element-plus/icons-vue"
const openDrawer = ref(false)
const value = ref("")

const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
]
</script>
<style lang="scss" scoped></style>
