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
        path: "/index",
        name: "index",
        component: () => import("@/views/index/Index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/docsCenter",
        name: "docsCenter",
        component: () => import("@/views/docsCenter/Index.vue"),
        meta: {
          title: "文档中心"
        }
      },
      {
        path: "/demo",
        name: "demo",
        component: () => import("@/views/DemoIndex.vue"),
        meta: {
          title: "demo"
        }
      },
      {
        path: "/demo2",
        name: "demo2",
        component: () => import("@/views/Demodemo.vue")
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
export const whiteList = ["/login", "/home", "/demo", "/demo2", "/index", "/docsCenter"]
