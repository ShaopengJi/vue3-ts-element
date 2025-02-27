<template>
  这是首页
  <el-card> </el-card>
</template>
<script setup lang="ts">
import { NextLoading } from "@/utils/loading"
onMounted(() => {
  NextLoading.done()
})
</script>
