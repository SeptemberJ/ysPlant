import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  locationIdx: 0, // 0 - Login 1 - Sign 2 - Home
  locationIdxSecond: '', // 0 - Login 1 - Sign 2 - Home
  menuIndex: '1'
}
// actions
const actions = {
  changeLocationIdx ({commit, state}, Location) {
    commit('setLocationIdx', Location)
  }
}

// mutations
const mutations = {
  setLocationIdx (state, Location) {
    state.locationIdx = Location.idxF
    state.locationIdxSecond = Location.idxS
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
