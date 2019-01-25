<template>
  <div class='Login'>
    <!-- <img class='Logo' src='../../static/images/Logo.png'> -->
    <img class='Logo' src='../../static/images/Partner_10.png'>
    <!-- <img class='Logo' src='https://cdn.loanpal.com/lpaprod/images/logo.svg'> -->
    <p class='ColorYellow FontSize_10'>登陆我的无车承运账户</p>
    <div class='MainBox'>
      <div class='InnerBox'>
        <el-row>
          <el-col :span='24' class='MarginTB_20'>
            <el-input style='width:250px;' v-model='phone' placeholder='请输入您的账户名' clearable></el-input>
          </el-col>
          <el-col :span='24' class=''>
            <el-input style='width:250px;' type='password' v-model='password' placeholder='请输入您的密码' clearable></el-input>
          </el-col>
          <el-col :span='24' class='MarginTB_20 TextAlignC'>
           <!--  <div class='loginBt CursorPointer' @click='Login'>登陆</div> -->
           <el-button class='loginBt CursorPointer' @click='Login' :loading='ifLoading'>登陆</el-button>
          </el-col>
          <el-col :span='24'>
            <el-row class='operation'>
              <el-col :span='12' class='TextAlignL'><span @click='ToModityPsd' class='CursorPointer'>忘记密码</span></el-col>
              <el-col :span='12' class='TextAlignR'><span @click='ToSign' class='CursorPointer'>去注册</span></el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {send} from '../util/send'
import {setCookie} from '../util/utils'
// import {setCookie, Encrypt, Decrypt} from '../util/utils'
export default {
  name: 'Login',
  data () {
    return {
      ifLoading: false,
      phone: '13734567890', // 货主 18534567899 18734567890 承运商 13734567890  17734567890 个人 18834567890
      password: '111111'
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'changeLocationIdx',
      'changeUserId',
      'changeUserAccount',
      'changeUserRole',
      'changeUserCode',
      'changeSiderIdx'
    ]),
    pay () {
      let DATA = {
        app_id: '2016090800462854',
        biz_content: '{"out_trade_no":"1548219783416","total_amount":"0.01","subject":"沙箱测试","product_code":"FAST_INSTANT_TRADE_PAY"}',
        charset: 'utf-8',
        method: 'alipay.trade.page.pay',
        sign_type: 'RSA2',
        timestamp: '2019-01-23 12:01:42',
        version: '1.0',
        sign: 'LU6rlg/+sYJa+Kpy6evknm+WK02AoWgJQcAheX1LFyCmyoc46cBJyO2G9GRCzl6s9QNzq76hFnoNnEpO2XgKSnNhu0x2CGnjvIPFs3CjF651Ghmoh/XbE+bRgJF4ZGY4+kpbz9bjXbQ5HHq8UCZgiAA3GUfOUx5rZPtRk+ULT8E7olkwIFAKKuu37LLLTTsA3SwyjxInZNKzFvG72R+B9fcWUILtVEi6t8b4Z0uvKlTJHTvLRHLwdSq+ozzEzjiwFNOE/QxIHhAfT1z/vpJdhbM73QQhR2BfwcfLyxJod9qqwhkjJYUqkMiYQacNzQUlqch2sQs2KMl7s5ActAV+SA=='
      }
      console.log(DATA)
      var temp = document.createElement('form')
      temp.action = 'http://openapi.alipaydev.com/gateway.do?charset=utf-8'
      temp.method = 'post'
      temp.style.display = 'none'
      for (var x in DATA) {
        var opt = document.createElement('input')
        opt.name = x
        opt.value = DATA[x]
        temp.appendChild(opt)
      }
      document.body.appendChild(temp)
      temp.submit()
      return temp
    },
    ToSign () {
      this.$router.push({name: 'Sign'})
      this.changeLocationIdx(1)
    },
    ToModityPsd () {
      this.$router.push({name: 'Password'})
      this.changeLocationIdx(4)
    },
    Login () {
      if (this.phone.trim() === '') {
        this.$message({
          message: '请输入账户名！',
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
      this.ifLoading = true
      send({
        name: '/tokens/registerLogin?fmobile=' + this.phone + '&password=' + this.password,
        // name: '/userLoginPC?mobile=18234567890&fpassword=111',
        method: 'POST',
        data: {
        }
      }).then(res => {
        switch (res.data.code) {
          case 1:
            setCookie('btwccy_cookie', res.data.token, 6)
            this.changeUserId(res.data.id)
            this.changeUserCode(res.data.usercode)
            // 1-承运商主 2-货主主 4-承运商子 5-货主子 3-个人
            this.changeUserRole(res.data.ftype)
            this.$message({
              message: '登陆成功！',
              type: 'success'
            })
            this.ifLoading = false
            // 0-未审核 1-通过 2-退回 3-再次提交
            if (res.data.checkStatus === '1' || res.data.checkStatus === '3') { // 主账户登陆
              // 主页
              this.changeUserAccount(this.phone)
              this.$router.push({name: 'Home'})
              this.changeLocationIdx(2)
            } else if (res.data.checkStatus === undefined) { // 子账户登陆
              // 主页
              this.changeUserAccount(res.data.usercode)
              this.$router.push({name: 'Home'})
              this.changeLocationIdx(2)
            } else { // 未通过审核
              // 信息页
              this.changeUserAccount(this.phone)
              this.$router.push({name: 'Information'})
              this.changeLocationIdx(3)
            }
            // 判断进入的主页
            if (res.data.ftype === '1' || res.data.ftype === '4') {
              this.changeSiderIdx('1-3')
            } else {
              this.changeSiderIdx('1-1')
            }
            // if (res.data.checkStatus === '1' || res.data.checkStatus === undefined) {
            //   // 主页
            //   this.$router.push({name: 'Home'})
            //   this.changeLocationIdx(2)
            // } else if (res.data.checkStatus === '0' || res.data.checkStatus === '2' || res.data.checkStatus === '3') {
            //   // 信息页
            //   this.$router.push({name: 'Information'})
            //   this.changeLocationIdx(3)
            // }
            break
          default:
            this.$message({
              message: res.data.message + '！',
              type: 'error'
            })
            this.ifLoading = false
        }
      }).catch((res) => {
        console.log(res)
        this.ifLoading = false
      })
      // this.$router.push({name: 'Home'})
      // this.changeLocationIdx(2)
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='less' scoped>
.Login{
  width: 100%;
  text-algin: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
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
