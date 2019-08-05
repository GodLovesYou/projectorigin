import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
export const constantRoutes = [
]

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    children: [{
      path: 'index',
      name: 'menuA',
      component: () => import('@/views/menuA'),
      meta: { title: '导航1', icon: 'project-message' }
    }]
  },
  {
    path: '/menuB',
    component: Layout,
    redirect: '/menuB/optionA',
    name: 'menuB',
    meta: { title: '导航2', icon: 'progress-manage'},
    children: [
      {
        path: 'optionA',
        name: 'menuB.optionA',
        component: () => import('@/views/menuB/optionA'),
        meta: { title: '选项1', icon: 'milestone'},
      },
      {
        path: 'optionB',
        name: 'menuB.optionB',
        component: () => import('@/views/menuB/optionB'),
        meta: { title: '选项2', icon: 'project-progress-manage'},
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
  linkActiveClass: 'link-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
