/**
 * pinia 类型定义
 */

// 用户信息
declare interface UserInfosState<T = any> {
  userInfos: {
    authBtnList: string[]
    photo: string
    roles: string[]
    time: number
    userName: string
    [key: string]: T
  }
}

// 路由缓存列表
declare interface KeepAliveNamesState {
  keepAliveNames: string[]
  cachedViews: string[]
}
