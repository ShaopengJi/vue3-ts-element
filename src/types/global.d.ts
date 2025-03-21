declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_USE_CDN: boolean
  VITE_DROP_CONSOLE: boolean
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none"
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean
  VITE_LEGACY: boolean
  VITE_USE_IMAGEMIN: boolean
  VITE_GENERATE_UI: string
  VITE_GLOB_STATIC_URL: string
  VITE_GLOB_BPMN_PROCESS_URL: string
  VITE_GLOB_SYS_URL: string
}
// 声明文件，定义全局变量
/* eslint-disable */
declare interface Window {
  nextLoading: boolean
}
// 声明 ref
declare type RefType<T = any> = T | null
interface anyObj {
  [key: string]: any
}
