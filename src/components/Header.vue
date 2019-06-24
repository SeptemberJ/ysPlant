<template>
  <div class="HeaderBar">
    <el-row style="background: #65c294;color: #fff">
      <el-col :span="12" class="block">
        <img class="Logo" style="width: 140px;height: 66px;" src="../../static/images/Partner_10.png">
      </el-col>
      <el-col :span="12" class="block TextAlignR">
        <!-- {{(userRole == 1 || userRole == 2) ? (userFsettle == 0 ? '（现结用户）' : '（月结用户）') : '' }} -->
        <div v-if="locationIdx != 0 & locationIdx != 1 & locationIdx != 4" class="LogOut">你好，{{userAccount}}<span class="CursorPointer" @click="LogOut"><i class="fa fa-sign-out"></i></span></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {clearCookie} from '../util/utils'
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      userAccount: state => state.userAccount,
      locationIdx: state => state.locationIdx,
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      userFsettle: state => state.userFsettle
    })
  },
  methods: {
    ...mapActions([
      'changeLocationIdx',
      'changeSiderIdx'
    ]),
    // 退出登陆
    LogOut () {
      this.$confirm('确定退出当前账号?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({name: 'Login'})
        this.changeLocationIdx(0)
        this.changeSiderIdx('1-1')
        clearCookie('btwccy_cookie')
      }).catch(() => {
      })
    }
  }
}
</script>

<style lang="less" scoped>
.HeaderBar{
  width: 100%;
  height: 66px;
  border-bottom: 1px solid #fff;
  text-align: left;
  overflow: hidden;
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
