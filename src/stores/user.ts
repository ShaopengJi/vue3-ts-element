import store from "@/stores"
import { getToken, removeToken, setToken } from "@/utils/auth"
import type { LoginForm, RequestResponse } from "@/api/types"
import { defineStore } from "pinia"
import { login as userLogin } from "@/api/sso/base"

export const useUserStore = defineStore("user", () => {
  const token = ref(getToken())
  const name = ref("")
  const userId = ref<string | number>("")
  const avatar = ref("")
  const permissions = ref<Array<string>>([]) // 用户权限编码集合 → 判断按钮权限

  /**
   * 登录
   * @param userInfo
   * @returns
   */
  // 修改userStore代码：
  const login = async (userInfo: LoginForm): Promise<RequestResponse> => {
    const res = await userLogin(userInfo)
    console.log(res)
    const responseData = res as unknown as RequestResponse // 类型断言
    setToken(responseData.result?.token || "") // 根据实际数据结构访问
    return responseData // 返回符合类型声明的数据
  }
  // 获取用户信息
  const getInfo = async (): Promise<void> => {}

  // 注销
  const logout = async (): Promise<void> => {}

  return {
    userId,
    token,
    name,
    avatar,
    permissions,
    login,
    getInfo,
    logout
  }
})

export default useUserStore

// 非setup
export function useUserStoreHook() {
  return useUserStore(store)
}
