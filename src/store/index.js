import Vue from 'vue'
import Vuex from 'vuex'
import { asyncRoutes, constantRoutes } from '@/router'
Vue.use(Vuex)

const state = {
  menus: [],
  addRoutes: [],
  routes: []
}

const mutations = {
  SET_MENUS: (state, menus) => {
    state.menus = menus
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_MILE_PROJECT_STATE: (state,projectState) => {
    state.projectState = projectState
  }
}

const actions = {
  getMenuInfo({commit}) {
    return new Promise((resolve, reject) => {
      const menus = [{id: 1, typeId: '0', conent: 'menuA'},{id: 2, typeId: '0', conent: 'menuB'}]
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


const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
