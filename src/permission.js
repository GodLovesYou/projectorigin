import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'
import store from '@/store'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

let getMenuInfoFlag
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  if (getMenuInfoFlag) {
    next()
  } else {
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    getMenuInfoFlag = true
    let menus = []
    try {
      menus = await store.dispatch('getMenuInfo')
    } catch (err) {
      console.log('获取菜单失败', err)
    }

    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('generateRoutes', menus)
    // dynamically add accessible routes
    router.addRoutes([
      ...accessRoutes,
      // {
      //   path: '*',
      //   redirect: '/404'
      // }
    ])
    if (menus && menus.length !== 0) {
      // hack method to ensure that addRoutes is complete
      // set the replace: true, so the navigation will not leave a history record
      if (to.path === '/' || menus.length === 0) {
        next({ ...accessRoutes[0], replace: true })
      } else {
        next({ ...to, replace: true })
      }
    } else {
      next('/noAuth')
    }
    NProgress.done()
  }
  next()
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
