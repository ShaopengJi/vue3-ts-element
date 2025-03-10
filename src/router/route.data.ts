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
    redirect: "/index",
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
        path: "/template",
        name: "template",
        component: () => import("@/views/template/Index.vue"),
        meta: {
          title: "模板库"
        }
      },

      {
        path: "/module",
        name: "module",
        component: () => import("@/views/module/Index.vue"),
        meta: {
          title: "模块库"
        }
      },
      {
        path: "/sourceMaterial",
        name: "sourceMaterial",
        component: () => import("@/views/sourceMaterial/Index.vue"),
        meta: {
          title: "素材库"
        }
      },
      {
        path: "/term",
        name: "term",
        component: () => import("@/views/term/Index.vue"),
        meta: {
          title: "术语库"
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
export const whiteList = ["/login", "/home"]
