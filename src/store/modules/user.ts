import store from "@/store"
import { getToken, removeToken, setToken } from "@/utils/auth"
import { type LoginData } from "@/api/types"
import { defineStore } from "pinia"

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
  const login = async (userInfo: LoginData): Promise<void> => {}
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
