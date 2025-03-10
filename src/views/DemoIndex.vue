<template>
  <div id="chart-container" style="height: 100vh; width: 100%"></div>
</template>
<script lang="ts" setup>
import * as echarts from "echarts"
// 视窗宽度
const windowWidth = ref(window.innerWidth)
// 取消默认右键行为
document.oncontextmenu = function () {
  return false
}
/**
 * 定义变量
 */
// 定义echarts容器变量
let myChart
// 定义连线节点数组
let addNode = []
// 定义高亮节点信息
let heightNode
// 是否高亮
let isLight = false
// 是否双击
let isDoubleClick = false
// demo节点数据
let treeData = [
  {
    name: "某某文件",
    x: windowWidth.value * 0.2,
    y: 500,
    children: [
      {
        name: "某某甲模块",
        children: [
          { name: "甲的子模块A", x: 800, y: 300, fixed: true },
          { name: "甲的子模块B", x: 800, y: 500, fixed: true }
        ],
        x: 600,
        y: 400,
        fixed: true
      },
      { name: "某某乙模块", x: 600, y: 600, fixed: true }
    ]
  },
  {
    name: "今天吃饭了吗",
    x: windowWidth.value * 0.8,
    y: 500,
    children: [
      {
        name: "吃了",
        x: windowWidth.value * 0.8 - 200,
        y: 400,
        value: "7328917918"
      },
      {
        name: "没吃",
        x: windowWidth.value * 0.8 - 200,
        y: 600,
        value: "7328917918"
      }
    ]
  }
]
// nodes节点数据 links线数据
let { nodes, links } = treeToGraphData(treeData)
// 树数据转换节点、线数据
function treeToGraphData(root) {
  let nodes = [],
    links: any = [
      {
        source: "甲的子模块A",
        target: "没吃",
        tooltip: { show: false },
        lineStyle: {
          type: "dashed"
        },
        ignoreForceLayout: true
      },
      {
        source: "甲的子模块A",
        target: "吃了",
        tooltip: { show: false },
        lineStyle: {
          type: "dashed"
        },
        ignoreForceLayout: true
      }
    ]
  // 递归处理层级 node:节点数据,parent:父节点数据 color:颜色
  const traverse = (node, parent, color, isFilesNode) => {
    nodes.push(
      Object.assign(
        {
          name: node.name,
          value: node.value,
          isLast: isFilesNode || !node.children || node.children.length === 0,
          color: color,
          itemStyle: {
            color: color
          }
        },
        { x: node.x, y: node.y, fixed: true }
      )
    )
    if (parent)
      links.push({
        source: parent.name as string,
        target: node.name as string,
        tooltip: { show: false }
      })
    if (node.children) node.children.forEach((child) => traverse(child, node, color, isFilesNode))
  }
  root.forEach((node, index) =>
    traverse(
      node,
      null,
      `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`,
      index === 0
    )
  )
  return { nodes, links }
}

// 配置模板
const option = reactive({
  tooltip: { trigger: "item" },
  series: [
    {
      type: "graph",
      // layout: "force",
      // force: {
      //   repulsion: 500,
      //   edgeLength: [100, 200],
      //   layoutAnimation: false // 禁用布局动画
      // },
      symbol: "circle",
      symbolSize: 40,
      roam: true,
      nodes: nodes.map((node) => ({
        ...node
      })),
      links: links,
      lineStyle: { color: "#999", width: 2, curveness: 0 },
      itemStyle: { color: "#3398DB" },
      label: {
        show: true,
        fontSize: 14
        // formatter: (params) => {
        //   console.log(, params)
        //   return params.dataIndex
        // }
      },
      // 关闭legend悬停触发高亮
      legendHoverLink: false,
      // 禁用默认emphasis效果
      emphasis: { disabled: true }
    }
  ]
})
// 高亮或者关闭高亮
function heightOrDark(params, toLight) {
  option.series[0].nodes.forEach((node) => {
    node.itemStyle.color = node.color
  })
  option.series[0].links.forEach((link) => {
    link.lineStyle && delete link.lineStyle.color
  })
  isLight = false
  if (toLight) {
    const clickedNode = params.data.name
    const hnodes = myChart.getOption().series[0].nodes
    const hlinks = myChart.getOption().series[0].links
    const relatedLinks = hlinks.filter(
      (link) =>
        (link.source === clickedNode || link.target === clickedNode) && link.ignoreForceLayout
    )
    if (relatedLinks.length === 0) return
    const relatedNodes = hnodes.filter(
      (node) =>
        relatedLinks.map((item) => item.source).includes(node.name) ||
        relatedLinks.map((item) => item.target).includes(node.name)
    )
    option.series[0].nodes.forEach((node) => {
      if (relatedNodes.map((item) => item.name).includes(node.name)) {
        console.log(node)
        node.itemStyle = { color: "red" }
      }
    })
    option.series[0].links.forEach((link) => {
      if (
        ((relatedLinks.map((item) => item.source).includes(link.source) &&
          relatedLinks.map((item) => item.target).includes(link.target)) ||
          (relatedLinks.map((item) => item.source).includes(link.target) &&
            relatedLinks.map((item) => item.target).includes(link.source))) &&
        link.ignoreForceLayout
      ) {
        console.log(link)
        link.lineStyle = { color: "red", type: "dashed" }
      }
    })

    isLight = true
  }
  myChart.setOption({ series: option.series })
}
onUnmounted(() => {
  window.removeEventListener("resize", () => {
    windowWidth.value = window.innerWidth
  })
})
onMounted(() => {
  // 添加窗口resize监听
  window.addEventListener("resize", () => {
    windowWidth.value = window.innerWidth
  })
  // 初始化echarts实例
  myChart = echarts.init(document.getElementById("chart-container"))
  nextTick(() => {
    myChart.setOption(option)
    // 点击事件（高亮）
    myChart.on("click", (params) => {
      // setTimeout(() => {
      //   if (isDoubleClick) {
      //     return
      //   } else {
      addNode = []
      console.log(heightNode, params.data.name)
      const isSimple = heightNode === params.data.name
      heightOrDark(params, !heightNode || !isSimple || !isLight)
      heightNode = params.data.name
      //   }
      // }, 200)
    })
    myChart.on("dblclick", function (param) {
      // console.log(param)
      isDoubleClick = true
      // TODO执行完逻辑后
      setTimeout(() => {
        isDoubleClick = false
      }, 1000)
    })
    // 右键连线/取消连线事件
    myChart.on("contextmenu", function (param) {
      option.series[0].links.forEach((link) => {
        link.lineStyle && delete link.lineStyle.color
      })
      isLight = false
      if (param.dataType === "edge") {
        links = links.filter((item) => {
          console.log(item.source === param.data.source && item.target === param.data.target)
          return !(item.source === param.data.source && item.target === param.data.target)
        })
        myChart.setOption({ series: [{ nodes, links }] })
        addNode = []
      } else {
        if (!param.data.isLast) {
          addNode = []
          return
        }
        const mouseEvent = param.event.event // 获取鼠标事件对象
        const clickX = mouseEvent.clientX // 右键点击的横坐标
        const clickY = mouseEvent.clientY // 右键点击的纵坐标

        addNode.push({
          name: param.data.name,
          fixed: true
        })
        if (addNode.length === 2) {
          const index = links.findIndex(
            (item) =>
              (item.source === addNode[0].name && item.target === addNode[1].name) ||
              (item.source === addNode[1].name && item.target === addNode[0].name)
          )
          console.log(index)
          if (index > -1) {
            links.splice(index, 1)
          } else {
            links.push({
              source: addNode[0].name,
              target: addNode[1].name,
              tooltip: { show: false },
              lineStyle: {
                type: "dashed"
              },
              ignoreForceLayout: true
            })
          }
          console.log(links)
          myChart.setOption({ series: [{ nodes, links }] })
          addNode = []
        }
      }

      console.log(param)
    })
  })
})
let timer
watch(windowWidth, (value) => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    console.log(value)
    treeData[1].x = value * 0.2
    treeData[1].x = value * 0.8
    treeData[1].children.forEach((item) => (item.x = value * 0.8 - 200))
    nodes = treeToGraphData(treeData).nodes
    option.series[0].nodes = nodes
    myChart.setOption(option)
  }, 200)
})
</script>
<style lang="scss">
// ::v-deep #chart-container div {
//   width: 100px !important;
// }
</style>
