<!-- 下拉选择动态列 -->
<template>
  <el-table-column :prop="customizeProp" :label="customizeLabel">
    <template #header>
      <el-select
        suffix-icon=""
        v-model="customizeProp"
        @change="handleChange"
        @visible-change="() => (visable = !visable)"
      >
        <template #prefix>
          <el-icon><Sort /></el-icon>
        </template>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { Sort } from "@element-plus/icons-vue"
interface SelectOption {
  label: string
  value: string
}
const visable = ref(false)
const { options } = defineProps({
  options: {
    type: Array as () => SelectOption[],
    default: () => [] as SelectOption[]
  }
})
const customizeProp = ref(options[0].value)
const customizeLabel = ref(options[0].label)
const handleChange = (val: string) => {
  customizeProp.value = val
  customizeLabel.value = options.find((item) => item.value === val)?.label
}
</script>
<style lang="scss" scoped>
.el-select {
  border: none !important;
}
::v-deep .el-select__wrapper {
  box-shadow: none !important;

  //   width: 50% !important;
}
::v-deep .el-select__placeholder {
  color: var(--el-table-header-text-color) !important;
}
</style>
