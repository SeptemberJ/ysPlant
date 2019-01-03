<template>
  <div class="HeaderBar">
    <el-row>
      <el-col :span="12" class="block">
        <img class="Logo" style="width: 140px;height: 66px;" src="../../static/images/Partner_10.png">
      </el-col>
      <el-col :span="12" class="block TextAlignR">
        <div class="LogOut">你好， 123<span class="CursorPointer" @click="LogOut"><i class="fa fa-sign-out"></i></span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Header',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    LogOut () {
      localStorage.clear()
      this.$router.push({name: 'Login'})
      this.changeLocationIdx(0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.HeaderBar{
  width: 100%;
  height: 66px;
  border-bottom: 1px solid #efefef;
  text-align: left;
  .block{
    padding: 0 20px;
  }
  .Logo{
    width: 140px;
    height: 66px;
    display: inline-block;
  }
  .LogOut{
    height: 66px;
    line-height: 66px;
    font-size: 14px;
    span{
      padding-left: 10px;
    }
    img{
      width: 30px;
      height: 30px;
      margin-top: 18px;
      display: inline-block;
    }
  }
}
</style>
