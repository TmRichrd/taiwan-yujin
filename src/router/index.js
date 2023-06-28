import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    meta: { title: "登錄", icon: "dashboard" },
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    meta: { title: "404", icon: "dashboard" },
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    meta: { title: "首頁", icon: "dashboard" },
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "首頁", icon: "dashboard" },
      },
    ],
  },
  {
    path: "/devices",
    component: Layout,
    redirect: "/devices/light",
    meta: {
      title: "設備管理",
      icon: "el-icon-s-tools",
    },
    alwaysShow: true,
    children: [
      {
        path: "light",
        name: "light",
        component: () => import("@/views/device/light/index.vue"),
        meta: { title: "閃光黃燈", icon: "el-icon-s-opportunity" },
      },
      {
        path: "lightDetail",
        name: "lightDetail",
        hidden: true,
        component: () => import("@/views/device/lightDetail/index.vue"),
        meta: { title: "閃光黃燈詳情", icon: "el-icon-s-opportunity" },
      },
    ],
  },
  {
    path: "/test",
    component: Layout,
    redirect: "/test/test1",
    meta: {
      title: "群組管理",
      icon: "el-icon-place",
    },
    alwaysShow: true,
    children: [
      {
        path: "test1",
        name: "test1",
        component: () => import("@/views/test/test1/index.vue"),
        meta: { title: "路段總況", icon: "el-icon-location-outline" },
      },
    ],
  },
  {
    path: "/device",
    component: Layout,
    redirect: "/device/light",
    meta: {
      title: "系統設定",
      icon: "el-icon-s-tools",
    },
    alwaysShow: true,
    children: [
      {
        path: "tcp",
        name: "tcp",
        component: () => import("@/views/device/tcp/index.vue"),
        meta: { title: "TCP設定", icon: "el-icon-s-platform" },
      },

      {
        path: "detail",
        name: "detail",
        hidden: true,
        component: () => import("@/views/device/detail/index.vue"),
        meta: { title: "路段詳情", icon: "dashboard" },
      },
      {
        path: "roadGroup",
        name: "roadGroup",
        component: () => import("@/views/device/roadGroup/index.vue"),
        meta: { title: "路段分組", icon: "el-icon-s-grid" },
      },
      {
        path: "timeControl",
        name: "timeControl",
        component: () => import("@/views/device/timeControl/index.vue"),
        meta: { title: "時段控制", icon: "el-icon-date" },
      },
      {
        path: "test2",
        name: "test2",
        component: () => import("@/views/test/test2/index.vue"),
        meta: { title: "能見度控制", icon: "el-icon-view" },
      },
      {
        path: "backups",
        name: "backups",
        component: () => import("@/views/device/backups/index.vue"),
        meta: { title: "資料備份", icon: "el-icon-document" },
      },
    ],
  },
  {
    path: "/userList",
    component: Layout,
    redirect: "/userList/role",
    meta: {
      title: "用戶管理",
      icon: "user",
    },
    alwaysShow: true,
    children: [
      {
        path: "role",
        name: "role",
        component: () => import("@/views/userList/role/index.vue"),
        meta: { title: "權限管理", icon: "el-icon-s-flag" },
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/userList/user/index.vue"),
        meta: { title: "用戶列表", icon: "el-icon-s-custom" },
      },
    ],
  },
  {
    path: "/reportForm",
    component: Layout,
    redirect: "/reportForm/densefog",
    meta: {
      title: "紀錄查詢",
      icon: "el-icon-data-line",
    },
    alwaysShow: true,
    children: [
      {
        path: "densefog",
        name: "densefog",
        component: () => import("@/views/reportForm/densefog/index.vue"),
        meta: { title: "濃霧事件", icon: "el-icon-data-line" },
      },
      {
        path: "online",
        name: "online",
        component: () => import("@/views/reportForm/online/index.vue"),
        meta: { title: "設備狀態", icon: "el-icon-alarm-clock" },
      },
      {
        path: "roadLog",
        name: "roadLog",
        component: () => import("@/views/reportForm/roadLog/index.vue"),
        meta: { title: "路段日誌", icon: "el-icon-time" },
      },
      {
        path: "operationLog",
        name: "operationLog",
        component: () => import("@/views/reportForm/operationLog/index.vue"),
        meta: { title: "操作事件", icon: "el-icon-set-up" },
      },
      {
        path: "personnel",
        name: "personnel",
        component: () => import("@/views/reportForm/personnel/index.vue"),
        meta: { title: "人員登入", icon: "el-icon-user-solid" },
      },
    ],
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       name: 'Menu2',
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  // { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
