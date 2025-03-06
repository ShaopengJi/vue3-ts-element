/**
 * references
 * 全局提供：引用（指向）一些对象（组件）的句柄
 */
import type { ScrollbarInstance } from "element-plus"
import type { CSSProperties } from "vue"
import { mainHeight } from "@/utils/layout"

/**
 * 前后台布局的主体的滚动条组件ref
 */
export const layoutMainScrollbarRef = ref<ScrollbarInstance>()

/**
 * 前后台布局的主体滚动条的额外样式，包括高度
 */
export const layoutMainScrollbarStyle = computed<CSSProperties>(() => mainHeight())

/**
 * 前后台布局的菜单组件ref
 */
export const layoutMenuRef = ref<ScrollbarInstance>()

/**
 * 前后台布局的菜单栏滚动条组件ref
 */
export const layoutMenuScrollbarRef = ref<ScrollbarInstance>()
