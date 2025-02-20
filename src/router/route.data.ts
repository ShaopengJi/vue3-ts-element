import Layout from "../layout/LayoutIndex.vue"
export const routesData = [
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home/HomeIndex.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/LoginIndex.vue")
  },
  {
    path: "/",
    name: "/",
    component: Layout,
    redirect: "/demo",
    children: [
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/views/Demo.vue")
      }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  // route level code-splitting
  // this generates a separate chunk (About.[hash].js) for this route
  // which is lazy-loaded when the route is visited.
  //   component: () => import('../views/AboutView.vue')
  // }
]
export const whiteList = ["/login", "/home"]
