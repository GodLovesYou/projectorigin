
import store from '@/store'
export default function initialize() {
  store.dispatch('fetchProjectDic', {
    parentValue: 'project_status',
    sysCode: 'project_manage',
    commit: 'SET_PROJECT_STATES'
  })
  store.dispatch('fetchProjectDic', {
    parentValue: 'project_typeid',
    sysCode: 'project_manage',
    commit: 'SET_PROJECT_TYPES'
  })
  store.dispatch('fetchProjectDic', {
    parentValue: 'project_year',
    sysCode: 'project_manage',
    commit: 'SET_PROJECT_YEARS'
  })
  store.dispatch('fetchProjectDic', {
    parentValue: 'project_moneytype',
    sysCode: 'project_manage',
    commit: 'SET_PROJECT_MONEY_TYPES'
  })
}

