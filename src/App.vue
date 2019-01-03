<template>
  <div id="app">
    <Header v-if="locationIdx != 0"/>
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
      locationIdx: state => state.locationIdx
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
