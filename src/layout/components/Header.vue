<template>
  <div>{{ route.meta.title }}</div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router"
const route = useRoute()
// console.log(route)
</script>
