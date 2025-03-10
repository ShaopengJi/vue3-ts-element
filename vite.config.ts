import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import AutoImport from "unplugin-auto-import/vite"
import { resolve } from "path"

// 加载环境变量
const getEnv = (mode: string) => loadEnv(mode, process.cwd())

// 简化路径解析函数
const resolvePath = (...args: string[]) => resolve(process.cwd(), ...args)

// 配置Vite插件
const configurePlugins = () => [
  vue(),
  vueJsx(),
  AutoImport({
    resolvers: [ElementPlusResolver()],
    imports: ["vue"],
    dts: resolvePath("src/auto-imports.d.ts")
  }),
  Components({
    resolvers: [ElementPlusResolver()]
  })
]

// 配置Vite构建选项
const configureBuildOptions = (env: Record<string, string>) => ({
  outDir: "dist",
  terserOptions: {
    compress: {
      keep_infinity: true,
      drop_console: env.VITE_DROP_CONSOLE === "true" || false
    }
  },
  chunkSizeWarningLimit: 2000
})

// 导出Vite配置
export default defineConfig(({ mode = "development" }) => {
  const env = getEnv(mode)
  return {
    plugins: configurePlugins(),
    define: {
      "process.env": {
        ...env,
        NODE_ENV: JSON.stringify(mode)
      }
    },
    resolve: {
      alias: {
        "@": resolve(process.cwd(), "src")
      },
      extensions: [".ts", ".js", ".vue"] // 添加 .ts 到扩展名列表
    },
    build: configureBuildOptions(env)
    // server: {
    //   proxy: {
    //     "/": {
    //       // 匹配所有请求路径
    //       target: env.VITE_API_BASEURL,
    //       changeOrigin: true,
    //       rewrite: (path) => `/api${path}` // 自动添加 `/api` 前缀
    //     }
    //   }
    // }
  }
})
