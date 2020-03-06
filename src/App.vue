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
    this.getCarLength()
    this.getGoodsType()
  },
  methods: {
    ...mapActions([
      'initCarType',
      'initGoodsType',
      'initCarLength'
    ]),
    // 车型
    getCarType () {
      this.send({
        name: '/typeController/tstype/2c90b4bf6c1ccde9016c1cdb2c4f000a',
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
    // 车长
    getCarLength () {
      this.send({
        name: '/typeController/tstype/2c90b4bf6c1ccde9016c1cdb66db000c',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.initCarLength(res.data.data)
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 货物类型
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
