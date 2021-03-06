import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'
import router from '../router/index'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  locationIdx: 0, // 0_Login 1_Sign 2_Home 3_Information 4_Password
  siderIdx: '1-1', // 1_运单管理 2_用户管理 3-1_基本信息 3-2_密码修改
  addOrderType: '1-2-1', // 货主下单类型 普货 危险品 冷藏品
  mapSearchId: '', // 地图轨迹id 订单id或货主id
  menuIndex: '1',
  userId: '',
  userAccount: '',
  userRole: '', // 1_承运商主 2_货主主 3_个人 4_承运商子 5_货主子
  userTicketInfo: false, // true 补充过
  userPartyB: '', // 乙方
  userCode: '',
  checkStatus: null, // 用户信息认证状态 0_未认证 1_已认证 2_禁用 // -1_注册完未提交 0_未审核 1_通过 2_退回 3_再次提交 4_已缴押金 子账户null
  prohibitTips: '对不起，您的账户已被禁用，不能进行该操作！',
  userBalance: 0, // 账户余额
  userFdepsta: '', // 0_未缴 1_已缴 2_已退
  // userFsettle: '', // 0_现结，1_月结
  userFaccountid: null, // 是否支付认证过
  userFrate: 0, // 用户税额折扣
  ImgURL_PREFIX: 'http://120.27.3.205/',
  showDetail: false, // 是否显示订单详情页
  showMap: false, // 是否显示轨迹 货主
  ifSJOrderSearch: '', // 是否显示查询司机订单页面
  searchOrderId: '',
  searchSjId: '',
  accountKind: 0, // 用户管理切换新增用户类型tab索引 0_子账户1_司机
  PDFCompany: '',
  carTypeList: [],
  carLengthList: [],
  goodsTypeList: [],
  html: ''
}
// actions
const actions = {
  initCarType  ({commit, state}, CARTYPE) {
    commit('setCarTypeList', CARTYPE)
  },
  initCarLength  ({commit, state}, CARLENGTH) {
    commit('setCarLengthList', CARLENGTH)
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
  changeUserCheckStatus ({commit, state}, Status) {
    commit('setUserCheckStatus', Status)
  },
  changeUserBalance ({commit, state}, Money) {
    commit('setUserBalance', Money)
  },
  changeUserFdepsta ({commit, state}, Fdepsta) {
    commit('setUserFdepsta', Fdepsta)
  },
  changeUserFsettle ({commit, state}, Fsettle) {
    commit('setUserFsettle', Fsettle)
  },
  changeUserFaccountid ({commit, state}, Accountid) {
    commit('setUserFaccountid', Accountid)
  },
  changeUserFrate ({commit, state}, Frate) {
    commit('setUserFrate', Frate)
  },
  changeUserRole ({commit, state}, TYPE) {
    commit('setUserRole', TYPE)
  },
  changeUserTicketInfo ({commit, state}, STATUS) {
    commit('setUserTicketInfo', STATUS)
  },
  updatePartyB ({commit, state}, PartyBInfo) {
    commit('setPartyB', PartyBInfo)
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
  setCarLengthList (state, CARLENGTH) {
    state.carLengthList = CARLENGTH
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
  setUserCheckStatus (state, Status) {
    state.checkStatus = Status
  },
  setUserBalance (state, Money) {
    state.userBalance = Money
  },
  setUserFdepsta (state, Fdepsta) {
    state.userFdepsta = Fdepsta
  },
  setUserFsettle (state, Fsettle) {
    state.userFsettle = Fsettle
  },
  setUserFaccountid (state, Accountid) {
    state.userFaccountid = Accountid
  },
  setUserFrate (state, Frate) {
    state.userFrate = Frate
  },
  setUserRole (state, TYPE) {
    state.userRole = TYPE
  },
  setUserTicketInfo (state, Status) {
    state.userTicketInfo = Status
  },
  setPartyB (state, PartyBInfo) {
    state.userPartyB = PartyBInfo
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
