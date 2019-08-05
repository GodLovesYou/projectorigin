import Vue from 'vue'
import Vuex from 'vuex'
import { findDictionaryByParentValue } from '@/api/app'
import { getMenu } from '@/api/app'
import { asyncRoutes, constantRoutes } from '@/router'
Vue.use(Vuex)

const state = {
  projectStates: [],
  projectTypes: [],
  projectYears: [],
  projectMoneyTypes: [],
  menus: [],
  addRoutes: [],
  routes: [],
  projectState: '',
  btns: []
}

const mutations = {
  SET_PROJECT_STATES(state, data) {
    state.projectStates = data
  },
  SET_PROJECT_TYPES(state, data) {
    state.projectTypes = data
  },
  SET_PROJECT_YEARS(state, data) {
    state.projectYears = data
  },
  SET_PROJECT_MONEY_TYPES(state, data) {
    state.projectMoneyTypes = data
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MILE_PROJECT_STATE: (state,projectState) => {
    state.projectState = projectState
  },
  SET_BTNS: (state, btns) => {
    state.btns.push(btns)
  }
}

const actions = {
  fetchProjectDic({ commit }, payload) {
    return findDictionaryByParentValue({
      parentValue: payload.parentValue,
      sysCode: payload.sysCode
    }).then(res => {
      commit(payload.commit, res.data || [])
    }).catch(err => {

    })
  },
  getMenuInfo({commit}) {
    return new Promise((resolve, reject) => {
      // getMenu().then(response => {
      //   const { data, errorMsg, success } = response
      //   if (!success) {
      //     reject(errorMsg || '获取菜单失败')
      //   }
      //
      //   // roles must be a non-empty array
      //   if (!data || data.length <= 0) {
      //     reject('getInfo: menus must be a non-null array!')
      //   }
      //
      //   commit('SET_MENUS', data)
      //   // commit('SET_BTNS', filterBtns(commit, '', data))
      //   filterBtns(commit, '', data)
      //   // console.log(filterBtns('', data))
      //   resolve(data)
      // }).catch(error => {
      //   console.log('message', error.message)
      //   reject('获取菜单失败')
      // })

      const menus = [{id: 1, typeId: '0', conent: 'projectMessage'}, {id: 2, typeId: '0', conent: 'progressManage'}, {id: 2, typeId: '0', conent: 'milestoneManage'}, {id: 2, typeId: '0', conent: 'projectProgressManage'}, {id: 2, typeId: '0', conent: 'projectProgressManageEdit'}, {id: 2, typeId: '0', conent: 'projectProgressManageLook'}, {id: 2, typeId: '0', conent: 'milestoneManageEdit'}, {id: 2, typeId: '0', conent: 'milestoneManageDetails'},{id: 2, typeId: '0', conent: 'milestoneManageChange'},{id: 2, typeId: '0', conent: 'msgSet'},{id: 2, typeId: '0', conent: 'statisticsAnalyze'},{id: 2, typeId: '0', conent: 'milestonePlanApproval'},{id: 2, typeId: '0', conent: 'milestonePlanApprovalEdit'},{id: 2, typeId: '0', conent: 'milestonePlanApprovalUpdate'},{id: 2, typeId: '0', conent: 'milestonePlanApprovalUpdateList'},{id: 2, typeId: '0', conent: 'milestonePlanApprovalUpdateVerify'},{id: 2, typeId: '0', conent: 'milestonePlanApprovalUpdateCheck'}]
      setTimeout(() => {
        commit('SET_MENUS', menus)
        resolve(menus)
      }, 1000)
    })
  },
  generateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, menus)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export function filterAsyncRoutes(routes, menus) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(menus, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, menus)
      }
      res.push(tmp)
    }
  })
  return res
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(menus, route) {
  if (route.meta && route.meta.menuName) {
    return menus.some(menu => {
      if(menu.typeId === '0'){
        // if (route.meta.menuName.includes(menu.conent)){
        if (route.meta.menuName === menu.conent){
          return true
        }else if(menu.childs){
          return hasPermission(menu.childs, route)
        }
      }else {
        return false
      }
    })
  }else {
    return true
  }
}

function filterBtns (commit, parent, menus){
  menus.forEach(menu => {
    if(menu.typeId === '1') {
      commit('SET_BTNS', `${parent.conent}/${menu.conent}`)
    }else {
      if(menu.childs){
        menu.childs.forEach(childMenu => {
          if(childMenu.typeId === '0'){
            filterBtns(commit, childMenu, childMenu.childs)
          }else {
            commit('SET_BTNS', `${menu.conent}/${childMenu.conent}`)
          }
        })
      }
    }
  })
}


const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
