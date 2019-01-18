import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import router from '../router/index'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  locationIdx: 0, // 0 - Login 1 - Sign 2 - Home 3 - Information 4 - Password
  // locationIdxSecond: '', // 1 - 用户管理 2 - 运单管理 3-1 - 基本信息 3-2 - 密码修改
  siderIdx: '1-1', // 1 - 运单管理 2 - 用户管理 3-1 - 基本信息 3-2 - 密码修改
  menuIndex: '1',
  userId: '',
  userAccount: '',
  userRole: '', // 1-承运商主 2-货主主 4-承运商子 5-货主子 3-个人
  userCode: '',
  ImgURL_PREFIX: 'http://116.62.171.244:8082/yingsu/',
  showDetail: false,
  PDFCompany: ''
}
// actions
const actions = {
  changeRouter () {
    router.push({name: 'Login'})
  },
  changeLocationIdx ({commit, state}, IDX) {
    commit('setLocationIdx', IDX)
  },
  changeSiderIdx ({commit, state}, IDX) {
    commit('setSiderIdx', IDX)
  },
  changeUserId ({commit, state}, ID) {
    commit('setUserId', ID)
  },
  changeUserCode ({commit, state}, Code) {
    commit('setUserCode', Code)
  },
  changeUserRole ({commit, state}, TYPE) {
    commit('setUserRole', TYPE)
  },
  changeUserAccount ({commit, state}, Account) {
    commit('setUserAccount', Account)
  },
  changeShowDetail ({commit, state}, STATUS) {
    commit('toggleShowDetail', STATUS)
  },
  changPDFCompany ({commit, state}, NAME) {
    commit('setPDFCompany', NAME)
  }
}

// mutations
const mutations = {
  setLocationIdx (state, IDX) {
    state.locationIdx = IDX
  },
  setSiderIdx (state, IDX) {
    state.siderIdx = IDX
  },
  setUserId (state, ID) {
    state.userId = ID
  },
  setUserCode (state, Code) {
    state.userCode = Code
  },
  setUserRole (state, TYPE) {
    state.userRole = TYPE
  },
  setUserAccount (state, Account) {
    state.userAccount = Account
  },
  toggleShowDetail (state, STATUS) {
    state.showDetail = STATUS
  },
  setPDFCompany (state, NAME) {
    state.PDFCompany = NAME
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
