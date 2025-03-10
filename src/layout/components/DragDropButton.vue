<template>
  <el-button
    ref="draggableButton"
    class="draggable"
    :style="buttonStyle"
    draggable="true"
    :dark="true"
    :color="buttonColor"
    @dragstart="dragStart"
    @dragover.prevent="dragOver"
    @dragend="dragEnd"
  >
    <div>帮助中心</div>
    <!-- <div>{{ route.meta.title }}</div> -->
  </el-button>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue"
import { useRoute } from "vue-router"
const route = useRoute()
const top = ref(window.innerHeight / 2)
const left = ref(window.innerWidth)
const isDown = ref(false)
const draggableButton = ref(null)
const isLeftButton = ref(false)

const buttonStyle = computed(() => ({
  top: `${top.value}px`,
  left: `${left.value}px`,
  opacity: isDown.value ? 0 : 1
}))

const buttonColor = computed(() => (isLeftButton.value ? "white" : "var(--bg-color)"))

function dragStart(event: DragEvent) {
  isDown.value = true
  event.dataTransfer.effectAllowed = "move"
}

function dragOver(event: DragEvent) {
  event.preventDefault()
  event.dataTransfer.dropEffect = "move"
}

function dragEnd(event: DragEvent) {
  isDown.value = false
  top.value = event.clientY
  left.value = event.clientX

  nextTick(() => {
    const result = left.value > window.innerWidth / 2
    left.value = result ? window.innerWidth - draggableButton.value.ref.clientWidth : 0
    isLeftButton.value = !result
  })
}

function handleResize() {
  left.value = window.innerWidth - draggableButton.value.ref.clientWidth
  top.value = window.innerHeight / 2
}

onMounted(() => {
  document.body.addEventListener("dragover", (e) => {
    e.preventDefault()
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.dropEffect = "move"
  })
  window.addEventListener("resize", handleResize)
  nextTick(() => {
    handleResize()
  })
})

onUnmounted(() => {
  document.body.removeEventListener("dragover", (e) => e.preventDefault())
  window.removeEventListener("resize", handleResize)
})
watch(
  () => route.path,
  (value) => {
    nextTick(() => {
      left.value = window.innerWidth - draggableButton.value.ref.clientWidth
      top.value = window.innerHeight / 2
    })
  }
)
</script>

<style scoped>
.draggable {
  position: fixed;
  padding: 10px;
  cursor: v-bind('isDown ? "move" : "pointer"') !important;
  transition: all 0.3s;
}
</style>
