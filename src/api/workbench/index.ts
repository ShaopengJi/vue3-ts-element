import request from "@/utils/request"
import { type AxiosPromise } from "axios"

/**
 * 查询设备档案列表
 * @param query
 * @returns {*}
 */

export const catalogue = (query: string | number): AxiosPromise => {
  return request({
    url: "/workbench/document/catalogue/" + query
  })
}
