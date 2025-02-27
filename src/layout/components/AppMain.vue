<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <transition name="slide-right" mode="out-in">
        <keep-alive>
          <component :is="Component" class="w100" @hook:mounted="NextLoading.done(1)" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<script setup name="AppMain" lang="ts">
//   import useTagsViewStore from '@/store/modules/tagsView';
//   import useSettingsStore from '@/store/modules/settings';
import { ComponentInternalInstance } from "vue"
import { NextLoading } from "@/utils/loading"
const { proxy } = getCurrentInstance() as ComponentInternalInstance
// const tagsViewStore = useTagsViewStore();

// 随机动画集合
const animante = ref<string>("")
//   const animationEnable = ref(useSettingsStore().animationEnable);
//   watch(()=> useSettingsStore().animationEnable, (val) => {
//       animationEnable.value = val;
//       if (val) {
//           animante.value = proxy?.animate.animateList[Math.round(Math.random() * proxy?.animate.animateList.length)] as string;
//       } else {
//           animante.value = proxy?.animate.defaultAnimate as string;
//       }
//   }, { immediate: true });
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: calc(100vw);
  position: relative;
  overflow: hidden;
  background-color: #f5f7f9;
}
</style>
<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 15px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
