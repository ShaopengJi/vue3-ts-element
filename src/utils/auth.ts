import Cookies from "js-cookie"
export const TokenKey = "zhishigu-doc-token"

export const getToken = () => Cookies.get(TokenKey)

export const setToken = (access_token: string) => Cookies.set(TokenKey, access_token)

export const removeToken = () => Cookies.remove(TokenKey)
