import request from "@/utils/request"
import { type AxiosPromise } from "axios"
import { type LoginForm } from "../types"

/**
 * 查询设备档案列表
 * @param query
 * @returns {*}
 */

export const login = (query: LoginForm): AxiosPromise => {
  return request({
    url: "/sso/base/login",
    headers: {
      isToken: false
    },
    method: "post",
    data: query
  })
}
