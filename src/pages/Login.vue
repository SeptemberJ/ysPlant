<template>
  <div class="Login">
    <img class="Logo" src="../../static/images/Partner_10.png">
    <!-- <img class="Logo" src="https://cdn.loanpal.com/lpaprod/images/logo.svg"> -->
    <p class="ColorYellow FontSize_10">登陆我的无车承运账户</p>
    <div class="MainBox">
      <div class="InnerBox">
        <el-row>
          <el-col :span="24" class="MarginTB_20">
            <el-input style="width:250px;" v-model="phone" placeholder="请输入您的账户名" clearable></el-input>
          </el-col>
          <el-col :span="24" class="">
            <el-input style="width:250px;" type="password" v-model="password" placeholder="请输入您的密码" clearable></el-input>
          </el-col>
          <el-col :span="24" class="MarginTB_20 TextAlignC">
            <div class="loginBt CursorPointer" @click="Login">登陆</div>
          </el-col>
          <el-col :span="24">
            <el-row class="operation">
              <el-col :span="12" class="TextAlignL"><span class="CursorPointer">忘记密码</span></el-col>
              <el-col :span="12" class="TextAlignR"><span @click="ToSign" class="CursorPointer">去注册</span></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      phone: '18234567890',
      password: '111'
    }
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    ToSign () {
      this.$router.push({name: 'Sign'})
      this.changeLocationIdx({idxF: 1, idxS: ''})
    },
    Login () {
      if (this.phone.trim() === '') {
        this.$message({
          message: '请输入注册的手机号！',
          type: 'warning'
        })
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.phone))) {
        this.$message({
          message: '手机号格式不正确！',
          type: 'warning'
        })
        return false
      }
      if (this.password.trim() === '') {
        this.$message({
          message: '请输入密码！',
          type: 'warning'
        })
        return false
      }
      this.$router.push({name: 'Home'})
      this.changeLocationIdx({idxF: 2, idxS: ''})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Login{
  text-algin: center;
  .Logo{
    width: 280px;
    height: 132px;
  }
  .MainBox{
    height: 300px;
    position: relative;
    margin: 2rem auto;
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    border-radius: 40%;
    .InnerBox{
      width: 120%;
      height: 260px;
      padding: 20px;
      background: #fff;
      margin-left: -10%;
      position: relative;
      .loginBt{
        width: 250px;
        height: 40px;
        margin: 0 auto;
        text-align: center;
        line-height: 40px;
        background: #e0b32b;
        color: #fff;
        border-radius: 30px;
      }
      .operation{
        width: 200px;
        margin: 0 auto;
        span{
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
}
</style>
