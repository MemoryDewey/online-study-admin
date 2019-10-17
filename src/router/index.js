import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/'),
      meta: { title: '主页', icon: 'dashboard' }
    }]
  },

  {
    path: '/banner',
    component: Layout,
    redirect: '/set',
    children: [{
      path: 'set',
      name: 'BannerSet',
      component: () => import('@/views/Banner/'),
      meta: { title: 'Banner', icon: 'eye-open' }
    }]
  },

  {
    path: '/course',
    component: Layout,
    redirect: '/course/system',
    name: 'Course',
    meta: { title: '课程管理', icon: 'example' },
    children: [
      {
        path: 'system',
        name: 'Table',
        component: () => import('@/views/CourseSystem/index'),
        meta: { title: '课程体系', icon: 'table' }
      },
      {
        path: 'type',
        name: 'List',
        component: () => import('@/views/CourseType/index'),
        meta: { title: '课程类别', icon: 'list' }
      }
    ]
  },
  /*{
    path: '/cash',
    component: Layout,
    redirect: '/cash/in',
    name: 'Payment',
    meta: { title: '支付管理', icon: 'money' },
    children: [
      {
        path: 'in',
        name: 'CashIn',
        component: () => import('@/views/Cash/CashIn/index'),
        meta: { title: '充值管理', icon: 'table' }
      },
      {
        path: 'out',
        name: 'CashOut',
        component: () => import('@/views/Cash/CashOut/index'),
        meta: { title: '提现管理', icon: 'list' }
      }
    ]
  },*/
  /* {
    path: '/mall',
    component: Layout,
    redirect: '/mall/commodity',
    name: 'PointMall',
    meta: { title: '积分商城', icon: 'cart' },
    children: [{
      path: 'commodity',
      name: 'PointCommodity',
      component: () => import('@/views/PointMall/commodity/index'),
      meta: { title: '商品管理', icon: 'list' }
    }, {
      path: 'order',
      name: 'PointOrder',
      component: () => import('@/views/PointMall/Order/index'),
      meta: { title: '订单管理', icon: 'table' }
    }]
  },*/

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '人员管理', icon: 'user' }
      }
    ]
  }

  /* {
    path: '/Project',
    component: Layout,
    children: [
      {
        path: 'ProjectApply',
        component: () => import('@/views/nested/ProjectApply/index'),
        meta: { title: '项目申请', icon: 'link' }
      }
    ]
  }*/
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
