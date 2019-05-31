import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import router from '../router/index'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  locationIdx: 0, // 0 - Login 1 - Sign 2 - Home 3 - Information 4 - Password
  siderIdx: '1-1', // 1 - 运单管理 2 - 用户管理 3-1 - 基本信息 3-2 - 密码修改
  addOrderType: '1-2-1', // 货主下单类型 普货 危险品 冷藏品
  mapSearchId: '', // 地图轨迹id 订单id或货主id
  menuIndex: '1',
  userId: '',
  userAccount: '',
  userRole: '', // 1-承运商主 2-货主主 4-承运商子 5-货主子 3-个人
  userCode: '',
  ImgURL_PREFIX: 'http://116.62.171.244:8082/yingsu/',
  // ImgURL_PREFIX: 'http://172.16.52.99:8083/yingsu',
  showDetail: false, // 是否显示订单详情页
  showMap: false, // 是否显示轨迹 货主
  ifSJOrderSearch: '', // 是否显示查询司机订单页面
  searchOrderId: '',
  searchSjId: '',
  accountKind: 0,
  PDFCompany: '',
  carTypeList: [],
  goodsTypeList: [],
  html: ''
}
// actions
const actions = {
  initCarType  ({commit, state}, CARTYPE) {
    commit('setCarTypeList', CARTYPE)
  },
  initGoodsType  ({commit, state}, GOODS) {
    commit('setGoodsTypeList', GOODS)
  },
  changePayHtml ({commit, state}, HTML) {
    commit('setPayHtml', HTML)
  },
  changeRouter () {
    router.push({name: 'Login'})
  },
  changeLocationIdx ({commit, state}, IDX) {
    commit('setLocationIdx', IDX)
  },
  changeSiderIdx ({commit, state}, IDX) {
    commit('setSiderIdx', IDX)
  },
  changeAddOrderType ({commit, state}, TYPE) {
    commit('setAddOrderType', TYPE)
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
  changeSearchOrderId ({commit, state}, ID) {
    commit('setSearchOrderId', ID)
  },
  changeSearchSjId ({commit, state}, ID) {
    commit('setSearchSjId', ID)
  },
  changeShowDetail ({commit, state}, STATUS) {
    commit('toggleShowDetail', STATUS)
  },
  changeShowMap ({commit, state}, STATUS) {
    commit('toggleShowMap', STATUS)
  },
  changeIfSJOrderSearch ({commit, state}, STATUS) {
    commit('toggleIfSJOrderSearch', STATUS)
  },
  changeAccountKind ({commit, state}, KIND) {
    commit('setAccountKind', KIND)
  },
  changPDFCompany ({commit, state}, NAME) {
    commit('setPDFCompany', NAME)
  },
  changeMapId ({commit, state}, ID) {
    commit('setMapId', ID)
  }
}

// mutations
const mutations = {
  setCarTypeList (state, CARTYPE) {
    state.carTypeList = CARTYPE
  },
  setGoodsTypeList (state, GOODS) {
    state.goodsTypeList = GOODS
  },
  setPayHtml (state, HTML) {
    state.html = HTML
  },
  setLocationIdx (state, IDX) {
    state.locationIdx = IDX
  },
  setSiderIdx (state, IDX) {
    state.siderIdx = IDX
  },
  setAddOrderType (state, TYPE) {
    state.addOrderType = TYPE
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
    state.accountKind = Account === '4' ? 1 : 0
  },
  setSearchOrderId (state, ID) {
    state.searchOrderId = ID
  },
  setSearchSjId (state, ID) {
    state.searchSjId = ID
  },
  toggleShowDetail (state, STATUS) {
    state.showDetail = STATUS
  },
  toggleShowMap (state, STATUS) {
    state.showMap = STATUS
  },
  toggleIfSJOrderSearch (state, STATUS) {
    state.ifSJOrderSearch = STATUS
  },
  setAccountKind (state, KIND) {
    state.accountKind = KIND
  },
  setPDFCompany (state, NAME) {
    state.PDFCompany = NAME
  },
  setMapId (state, ID) {
    state.mapSearchId = ID
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexAlong]
  // plugins: debug ? [createLogger()] : []
})
