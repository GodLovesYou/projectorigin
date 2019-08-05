import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
]

export const asyncRoutes = [
  {
    path: '/projectMessage',
    component: Layout,
    redirect: '/projectMessage/index',
    children: [{
      path: 'index',
      name: 'ProjectMessage',
      component: () => import('@/views/projectMessage'),
      meta: { title: '导航1', icon: 'project-message' }
    }],
    meta: {
      menuName: 'projectMessage'
    }
  },
  {
    path: '/progressManage',
    component: Layout,
    redirect: '/progressManage/milestoneManage',
    name: 'ProgressManage',
    meta: { title: '导航2', icon: 'progress-manage', menuName: 'progressManage' },
    children: [
      {
        path: 'milestoneManage',
        name: 'ProgressManage.milestoneManage',
        component: () => import('@/views/progressManage/milestoneManage'),
        meta: { title: '选项1', icon: 'milestone', menuName: 'milestoneManage' },
      },
      {
        path: 'projectProgressManage',
        name: 'ProgressManage.ProjectProgressManage',
        component: () => import('@/views/progressManage/projectProgressManage'),
        meta: { title: '选项2', icon: 'project-progress-manage', menuName: 'projectProgressManage' },
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support

  linkActiveClass: 'link-active',
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
