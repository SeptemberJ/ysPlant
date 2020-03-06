<template>
  <div class='Login'>
    <img class='Logo' src='../../static/images/Partner_10.png'>
    <p class='ColorYellow FontSize_10'>登陆我的无车承运账户</p>
    <div class='MainBox'>
      <div class='InnerBox'>
        <el-row>
          <el-col :span='24' class='MarginTB_20'>
            <el-input style='width:250px;' v-model='phone' placeholder='请输入您的账户名' clearable @keyup.enter.native='enterEvent'></el-input>
          </el-col>
          <el-col :span='24' class=''>
            <el-input style='width:250px;' type='password' v-model='password' placeholder='请输入您的密码' clearable @keyup.enter.native='enterEvent'></el-input>
          </el-col>
          <el-col :span='24' class='MarginTB_20 TextAlignC'>
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
import {setCookie} from '../util/utils'
export default {
  name: 'Login',
  data () {
    return {
      ifLoading: false,
      phone: '', // 货主 18234567890 承运商 18234567891 18234567894 个人 18234567893
      password: ''
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
      'changeUserTicketInfo',
      'updatePartyB',
      'changeUserCode',
      'changeUserCheckStatus',
      'changeUserBalance',
      'changeUserFdepsta',
      // 'changeUserFsettle',
      'changeUserFaccountid',
      'changeUserFrate',
      'changeSiderIdx',
      'changeIfSJOrderSearch',
      'changeShowDetail'
    ]),
    // 前往注册
    ToSign () {
      this.$router.push({name: 'Sign'})
      this.changeLocationIdx(1)
    },
    // 前往密码修改
    ToModityPsd () {
      this.$router.push({name: 'Password'})
      this.changeLocationIdx(4)
    },
    enterEvent () {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode
      if (keyCode === 13) {
        this.Login()
      }
    },
    // 登陆
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
      this.send({
        name: '/tokens/registerLogin?fmobile=' + this.phone + '&password=' + this.password,
        method: 'POST',
        data: {
        }
      }).then(res => {
        console.log(res.data)
        switch (res.data.respCode) {
          case '0':
            let userInfo = res.data.data
            setCookie('btwccy_cookie', userInfo.token, 6)
            // mapUserId
            localStorage['MapId'] = userInfo.zRegister.id
            // 更新用户基本信息
            this.changeUserId(userInfo.zRegister.id)
            this.changeUserCode(userInfo.zRegister.usercode)
            this.changeUserCheckStatus(userInfo.zRegister.checkStatus)
            this.changeUserBalance(userInfo.zRegister.faccount)
            this.changeUserFdepsta(userInfo.zRegister.fdepsta)
            this.changeUserFrate(userInfo.zRegister.frate)
            this.changeUserFaccountid(userInfo.zRegister.faccountid)
            // this.changeUserFsettle(userInfo.zRegister.fsettle)
            // 1_承运商主 2_货主主 3_个人 4_承运商子 5_货主子
            this.changeUserRole(userInfo.zRegister.ftype)
            // 是否补充过信息
            if (userInfo.zRegister.taiTou) {
              this.changeUserTicketInfo(true)
            } else {
              this.changeUserTicketInfo(false)
            }
            this.ifLoading = false
            switch (userInfo.zRegister.ftype) { // ftype 1_承运商主 2_货主主 3_个人 4_承运商子 5_货主子 checkStatus 0_未审核 1_通过 2_退回 3_再次提交
              case '1':
                this.updatePartyB({name: userInfo.zRegister.companyName, ID: null})
                // 承运商主 直接登陆接单时认证
                this.changeUserAccount(this.phone)
                this.$router.push({name: 'Home'})
                this.changeLocationIdx(2)
                this.$message({
                  message: '登陆成功！',
                  type: 'success'
                })
                break
              case '2':
                // 货主主
                this.updatePartyB({name: userInfo.zRegister.companyName, ID: null})
                if (userInfo.zRegister.faccountid) {
                  this.changeUserAccount(this.phone)
                  this.$router.push({name: 'Home'})
                  this.changeLocationIdx(2)
                } else {
                  this.changeUserAccount(this.phone)
                  this.$router.push({name: 'Information'})
                  this.changeLocationIdx(3)
                }
                this.$message({
                  message: '登陆成功！',
                  type: 'success'
                })
                break
              case '3':
                // 个人
                this.updatePartyB({name: userInfo.zRegister.companyLxr, ID: userInfo.zRegister.fidentity})
                if (userInfo.zRegister.faccountid) {
                  this.changeUserAccount(this.phone)
                  this.$router.push({name: 'Home'})
                  this.changeLocationIdx(2)
                } else {
                  this.changeUserAccount(this.phone)
                  this.$router.push({name: 'Information'})
                  this.changeLocationIdx(3)
                }
                this.$message({
                  message: '登陆成功！',
                  type: 'success'
                })
                break
              case '4':
                // 承运商子 主账户认证下方能创建子账户 子账户无需认证和补充信息
                if (userInfo.zRegister.checkStatus === '2') {
                  this.$message({
                    message: '您所属的主账号被禁用故不能登陆，请联系您所属账号的联系人！',
                    type: 'warning'
                  })
                } else {
                  this.updatePartyB({name: userInfo.zRegister.companyName, ID: null})
                  this.changeUserAccount(userInfo.zRegister.usercode)
                  this.$router.push({name: 'Home'})
                  this.changeLocationIdx(2)
                  this.$message({
                    message: '登陆成功！',
                    type: 'success'
                  })
                }
                break
              case '5':
                // 货主子 主账户认证下方能创建子账户 子账户无需认证和补充信息
                if (userInfo.zRegister.checkStatus === '2') {
                  this.$message({
                    message: '您所属的主账号被禁用故不能登陆，请联系您所属账号的联系人！',
                    type: 'warning'
                  })
                } else {
                  this.updatePartyB({name: userInfo.companyname, ID: null})
                  this.changeUserAccount(userInfo.zRegister.usercode)
                  this.$router.push({name: 'Home'})
                  this.changeLocationIdx(2)
                  this.$message({
                    message: '登陆成功！',
                    type: 'success'
                  })
                }
                break
            }
            // if (userInfo.zRegister.checkStatus === '1' || userInfo.zRegister.checkStatus === '3') { // 主账户登陆
            //   // 主页
            //   this.changeUserAccount(this.phone)
            //   this.$router.push({name: 'Home'})
            //   this.changeLocationIdx(2)
            // } else if (userInfo.zRegister.checkStatus === undefined || userInfo.zRegister.checkStatus === null) { // 子账户登陆
            //   // 主页
            //   this.changeUserAccount(userInfo.zRegister.usercode)
            //   this.$router.push({name: 'Home'})
            //   this.changeLocationIdx(2)
            // } else { // 未通过审核
            //   // 信息页
            //   this.changeUserAccount(this.phone)
            //   this.$router.push({name: 'Information'})
            //   this.changeLocationIdx(3)
            // }
            // 判断进入的主页
            if (userInfo.zRegister.ftype === '1' || userInfo.zRegister.ftype === '4') {
              this.changeSiderIdx('1-3')
            } else {
              this.changeSiderIdx('1-1')
            }
            // 关闭详情页确保进入首页一级菜单
            this.changeIfSJOrderSearch(false)
            this.changeShowDetail(false)
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
    }
  }
}
</script>

<style lang='less' scoped>
.Login{
  width: 100%;
  overflow: hidden;
  text-align: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
      height: 300px;
      width: 120%;
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
