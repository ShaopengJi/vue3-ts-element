import { createRouter, createWebHistory } from "vue-router"
import { routesData, whiteList } from "./route.data"
import { NextLoading } from "@/utils/loading"

import Cookies from "js-cookie"
const baseUrl = import.meta.env.BASE_URL || "/"

const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: routesData
})
router.beforeEach((to, from, next) => {
  NextLoading.start()
  console.log("!!!!!!!!!!!!!!!!!!", to, from, next)
  const token = Cookies.get("token")
  if (whiteList.includes(to.path)) {
    return next()
  }
  if (!token) {
    return next({
      path: "/home"
    })
  }
  if (to.path === "/") {
    return token
      ? next({ path: "/demo" })
      : next({
          path: "/home"
        })
  }
})
export default router
