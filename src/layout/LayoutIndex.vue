<template>
  <el-container class="layout-container">
    <Asider />
    <el-container class="content-wrapper">
      <Header />
      <AppMain style="width: 100%" />
    </el-container>
  </el-container>
  <DragDropButton />
</template>

<script setup lang="ts">
import AppMain from "./components/AppMain.vue"
import Asider from "./components/Asider.vue"
import DragDropButton from "./components/DragDropButton.vue"
import Header from "./components/Header.vue"
// import Header from '/@/layouts/backend/components/header.vue'
</script>

<style scoped>
.layout-container {
  height: 100%;
  width: 100%;
}
.content-wrapper {
  flex-direction: column;
  width: 100%;
  height: 100%;
}
</style>
