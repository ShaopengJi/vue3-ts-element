<template>
  <div class="docs-main">
    <div class="docs-left">
      <el-tree
        ref="tree"
        class="docs-left"
        :data="treeData"
        :props="defaultProps"
        node-key="id"
        highlight-current
        @node-click="handleNodeClick"
      >
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span @click="() => console.log('!!!!!!!!!!!', data, node)">{{ node.label }}</span>
            <span> </span>
          </span>
        </template>
      </el-tree>
    </div>
    <div class="docs-right w-100">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="`breadcrumb${index}`">
          <a @click="resetData(item, index)">{{ item.label }}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <div class="flex flex-between flex-wrap docs-right-folder">
          <FolderCard
            v-for="(item, index) in folderResultList"
            v-bind="item"
            :key="`folder-card-${index}`"
            @click="() => console.log('click', item)"
          />
        </div>
        <div class="flex flex-end">
          <el-button link>更多</el-button>
        </div>
      </div>
      <el-table
        virtual-scroll
        ref="tableRef"
        row-key="date"
        :data="tableData"
        style="width: 100%; height: calc(100vh - 190px)"
      >
        <el-table-column
          prop="date"
          label="Date"
          sortable
          width="180"
          column-key="date"
          :filters="filtersList"
          :filter-method="filterHandler"
        />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" :formatter="formatter" />
        <el-table-column
          prop="tag"
          label="Tag"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'" disable-transitions>{{
              scope.row.tag
            }}</el-tag>
          </template>
        </el-table-column>
        <FilterColumn
          prop="tag"
          label="Tag"
          width="100"
          :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' }
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? 'primary' : 'success'" disable-transitions>{{
              scope.row.tag
            }}</el-tag>
          </template>
        </FilterColumn>
        <AutoColumn
          :options="[
            { label: 'date', value: 'date' },
            { label: 'tag', value: 'tag' }
          ]"
        />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import type { TableColumnCtx, TableInstance } from "element-plus"
import AutoColumn from "@/components/AutoColumn.vue"
import FilterColumn from "@/components/FilterColumn.vue"
import { ArrowRight } from "@element-plus/icons-vue"
import FolderCard from "@/components/FolderCard.vue"
import { FilesItem, Tree } from "./index.data"
import { catalogue } from "@/api/workbench/index"
const tree = ref()
const breadcrumbFirst = { label: "文档中心", id: "0" }
const breadcrumbList = ref([breadcrumbFirst])
// 选中节点下所有文件夹
const folderList = [
  {
    name: "string",
    value: "string"
  },
  {
    name: "string",
    value: "string"
  },
  {
    name: "string",
    value: "string"
  },
  {
    name: "string",
    value: "string"
  }
]
// 选中节点下展示文件夹
const folderResultList = ref(
  folderList.filter((item, index) => {
    return index < 12
  })
)
// 文件夹区域高度
const folderHeight = ref("0px")
const treeData = ref<Tree[]>([
  {
    label: "Level one 1",
    id: "Level one 1",
    children: [
      {
        label: "Level two 1-1",
        id: "Level two 1-1",
        children: [
          {
            id: "Level three 1-1-1",
            label: "Level three 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "Level one 2",
    id: "Level one 2",
    children: [
      {
        label: "Level two 2-1",
        id: "Level two 2-1",
        children: [
          {
            id: "Level two 2-1-1",
            label: "Level two 2-1-1"
          }
        ]
      },
      {
        label: "Level two 2-2",
        id: "Level two 2-2",
        children: [
          {
            id: "Level three 2-2-1",
            label: "Level three 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "Level one 3",
    id: "Level one 3",
    children: [
      {
        label: "Level two 3-1",
        id: "Level two 3-1",
        children: [
          {
            id: "Level three 3-1-1",
            label: "Level three 3-1-1"
          }
        ]
      },
      {
        label: "Level two 3-2",
        id: "Level two 3-2",
        children: [
          {
            id: "Level three 3-2-1",
            label: "Level three 3-2-1"
          }
        ]
      }
    ]
  }
])
const filtersList = ref([
  { text: "2016-05-01", value: "2016-05-01" },
  { text: "2016-05-02", value: "2016-05-02" },
  { text: "2016-05-03", value: "2016-05-03" },
  { text: "2016-05-04", value: "2016-05-04" }
])
const tableData = ref<FilesItem[]>([])
const tableRef = ref<TableInstance>()

const resetDateFilter = () => {
  tableRef.value!.clearFilter(["date"])
}
const clearFilter = () => {
  tableRef.value!.clearFilter()
}
const formatter = (row: FilesItem, column: TableColumnCtx<FilesItem>) => {
  return row.address
}
const filterTag = (value: string, row: FilesItem) => {
  return row.tag === value
}
const filterChange = (value: string) => {
  console.log("filterChange", value)
}
const filterHandler = (value: string, row: FilesItem, column: TableColumnCtx<FilesItem>) => {
  const property = column["property"]
  return row[property] === value
}
onMounted(() => {
  catalogue(0)
  folderHeight.value =
    (folderResultList.value.length / 4 > 2 ? 3 : folderResultList.value.length / 4 > 1 ? 2 : 1) *
      74 +
    "px"
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      tag: "Home"
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      tag: "Office"
    },
    {
      date: "2016-05-04",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      tag: "Home"
    },
    {
      date: "2016-05-01",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
      tag: "Office"
    }
  ]
})

const handleNodeClick = (nodeData, nodeInstance) => {
  // 1. 获取所有父节点数据
  const parentNodes = []
  let parent = nodeInstance.parent
  while (parent && parent.data) {
    parentNodes.unshift(parent.data)
    parent = parent.parent
  }
  const result = parentNodes.filter((item): item is Tree => {
    return "label" in item && "id" in item // 检查Tree接口的必要属性
  })
  result.push(nodeData)
  result.unshift(breadcrumbFirst)
  // 2、修改面包屑数据
  breadcrumbList.value = result
  console.log("父节点链:", result)
  // 3、获取文件夹、文档数据
  // TODO获取表格、文件夹数据
}

const defaultProps = {
  children: "children",
  label: "label",
  id: "id"
}
function resetData(item, index) {
  breadcrumbList.value = breadcrumbList.value.slice(0, index + 1)
  tree.value.setCurrentKey(item.id, true)
  // TODO获取表格、文件夹数据
}
</script>
<style lang="scss" scoped>
.docs-main {
  display: flex;
  margin: 0 20px;
  width: calc(100% - 40px);
  height: calc(100vh - 60px);
}
.docs-left {
  background-color: var(--bg-color);
}
.docs-right-folder {
  height: v-bind(folderHeight);
}
</style>
