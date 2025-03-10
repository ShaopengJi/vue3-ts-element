/**
 * 登录请求
 */
export interface LoginForm {
  phoneNumber: string
  password: string
}
export interface RequestResponse {
  code: number
  msg: string
  pageNum: null | number
  pageSize: null | number
  result: any
  startIndex: null | number
  totalNum: null | number
  totalPageNum: null | number
  traceId: string
}
