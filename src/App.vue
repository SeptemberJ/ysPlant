<template>
  <div id="app">
    <Header v-if="locationIdx != 0"/>
    <!-- <p>locationIdx: {{locationIdx}} siderIdx: {{siderIdx}} {{userAccount}}</p> -->
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
