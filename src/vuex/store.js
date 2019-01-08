import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  locationIdx: 0, // 0 - Login 1 - Sign 2 - Home 3 - Information
  locationIdxSecond: '', // 1 - 用户管理 2 - 运单管理 3-1 - 基本信息 3-2 - 密码修改
  siderIdx: '1', // 1 - 用户管理 2 - 运单管理 3-1 - 基本信息 3-2 - 密码修改
  menuIndex: '1',
  userId: '',
  userAccount: '',
  userRole: ''
}
// actions
const actions = {
  changeLocationIdx ({commit, state}, IDX) {
    commit('setLocationIdx', IDX)
  },
  changeSiderIdx ({commit, state}, IDX) {
    commit('setSiderIdx', IDX)
  },
  changeUserId ({commit, state}, ID) {
    commit('setUserId', ID)
  },
  changeUserRole ({commit, state}, TYPE) {
    commit('setUserRole', TYPE)
  },
  changeUserAccount ({commit, state}, Account) {
    commit('setUserAccount', Account)
  }
}

// mutations
const mutations = {
  setLocationIdx (state, IDX) {
    state.locationIdx = IDX
    localStorage['locationIdx'] = IDX
  },
  setSiderIdx (state, IDX) {
    state.siderIdx = IDX
  },
  setUserId (state, ID) {
    state.userId = ID
  },
  setUserRole (state, TYPE) {
    state.userRole = TYPE
  },
  setUserAccount (state, Account) {
    state.userAccount = Account
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexAlong]
  // plugins: debug ? [createLogger()] : []
})
