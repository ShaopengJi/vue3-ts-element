<template>
  <el-table-column v-bind="bindAttrs" :filters="undefined" :filter-method="undefined">
    <template #header>
      <el-popover
        placement="bottom"
        title="Title"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
        @show="isShow = true"
      >
        <template #reference>
          <div class="m-2">{{ attrs.label }}</div>
        </template>
      </el-popover>
    </template>
    <template #default="scope">
      <slot v-bind="scope"></slot>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
const isShow = ref(false)
const props = defineProps({
  filters: {
    type: Array,
    default: () => []
  },
  filterMethod: {
    type: Function,
    default: () => {}
  },
  filterMultiple: {
    type: Boolean,
    default: false
  }
})
const attrs = useAttrs()
const bindAttrs = ref({})
const filterOptions = ref({})
const keys = Object.keys(attrs).filter((item) => {
  return !item.includes("filter")
})
keys.forEach((item) => {
  bindAttrs.value[item] = attrs[item]
})
const filterKeys = Object.keys(attrs).filter((item) => {
  return item.includes("filter")
})
filterKeys.forEach((item) => {
  filterOptions.value[item] = attrs[item]
})
console.log("!!!!!!!!!!!!!!!!", bindAttrs.value, filterOptions.value)
</script>
