import { createRouter, createWebHistory } from "vue-router"
import { routesData, whiteList } from "./route.data"
import { NextLoading } from "@/utils/loading"
import { TokenKey } from "@/utils/auth"

import Cookies from "js-cookie"
const baseUrl = import.meta.env.BASE_URL || "/"

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routesData
})
router.beforeEach((to, from, next) => {
  // NextLoading.start()
  const token = Cookies.get(TokenKey)
  console.log(token)
  if (whiteList.includes(to.path)) {
    return next()
  }
  if (!token) {
    return next({
      // path: "/home"
      path: "/login"
    })
  }
  if (to.path === "/") {
    return next({ path: "/index" })
  } else {
    next()
  }
})
export default router
