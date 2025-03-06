export interface Layout {
  /* 全局 - s */
  // 是否收缩布局（小屏设备）
  shrink: boolean
  // 后台主页面切换动画，可选值<slide-right|slide-left|el-fade-in-linear|el-fade-in|el-zoom-in-center|el-zoom-in-top|el-zoom-in-bottom>
  mainAnimation: string
  // 是否暗黑模式
  isDark: boolean
  /* 全局 - e */

  /* 侧边栏 - s */
  // 侧边菜单宽度（展开时），单位px
  menuWidth: number
  // 侧边菜单项默认图标
  menuDefaultIcon: string
  // 是否水平折叠收起菜单
  menuCollapse: boolean
  // 是否只保持一个子菜单的展开（手风琴）
  menuUniqueOpened: boolean
  // 显示菜单栏顶栏（LOGO）
  menuShowTopBar: boolean
  // 侧边菜单背景色
  menuBackground: string[]
  // 侧边菜单文字颜色
  menuColor: string[]
  // 侧边菜单激活项背景色
  menuActiveBackground: string[]
  // 侧边菜单激活项文字色
  menuActiveColor: string[]
  // 侧边菜单顶栏背景色
  menuTopBarBackground: string[]
  /* 侧边栏 - e */

  /* 顶栏 - s */
  // 顶栏文字色
  headerBarTabColor: string[]
  // 顶栏背景色
  headerBarBackground: string[]
  // 顶栏悬停时背景色
  headerBarHoverBackground: string[]
  // 顶栏激活项背景色
  headerBarTabActiveBackground: string[]
  // 顶栏激活项文字色
  headerBarTabActiveColor: string[]
  /* 顶栏 - e */
}
export interface UserInfo {
  id: number
  username: string
  nickname: string
  email: string
  mobile: string
  gender: number
  birthday: string
  money: number
  score: number
  avatar: string
  last_login_time: string
  last_login_ip: string
  join_time: string
  motto: string
  token: string
  refresh_token: string
}

export interface SiteConfig {
  siteName: string
  recordNumber?: string
  version: string
  cdnUrl: string
  apiUrl: string
  upload: {
    mode: string
    [key: string]: any
  }
  initialize: boolean
  userInitialize: boolean
}
