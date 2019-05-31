<template>
  <div id="app">
    <Header v-if="locationIdx != 0"/>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from './components/Header.vue'
export default {
  name: 'App',
  components: {
    Header
  },
  computed: {
    ...mapState({
      locationIdx: state => state.locationIdx,
      siderIdx: state => state.siderIdx,
      userAccount: state => state.userAccount
    })
  },
  created () {
    this.getCarType()
    this.getGoodsType()
  },
  methods: {
    ...mapActions([
      'initCarType',
      'initGoodsType'
    ]),
    getCarType () {
      this.send({
        name: '/zCarTypeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.initCarType(res.data.data)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取货物类型下拉
    getGoodsType () {
      this.send({
        name: '/typeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.initGoodsType(res.data.data)
        }
      }).catch((res) => {
        console.log(res)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
