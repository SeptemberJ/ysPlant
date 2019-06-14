<template>
  <div class="Sign">
    <el-row>
      <el-col :span="12" style="overflow: hidden">
        <img src="../../static/images/Strongth_1.jpg" class="leftImg">
      </el-col>
      <el-col :span="12">
        <el-form class="FormBox" :model="formSign" :rules="SignRules" ref="formSign" label-width="80px">
          <el-form-item label="账户类型" prop="role">
            <el-radio-group v-model="formSign.role">
              <el-radio :label="1">承运商</el-radio>
              <el-radio :label="2">货主</el-radio>
              <el-radio :label="3">个人</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户名" prop="accountName">
            <el-input v-model="formSign.accountName" placeholder="请输入手机号" clearable></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-row class="TextAlignL">
              <el-col :span="14"><el-input v-model="formSign.code" placeholder="请输入验证码" clearable style="width: 100% !important;"></el-input></el-col>
              <el-col :span="10" class="TextAlignC CursorPointer"><span @click="toGetCode" class="ColorYellow">{{haGetCode?CountDown + 's 后重新获取':'获取验证码'}}</span></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formSign.password" placeholder="请输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordAgain">
            <el-input type="password" v-model="formSign.passwordAgain" placeholder="请再次输入密码" clearable></el-input>
          </el-form-item>
          <el-form-item label="推荐人" prop="recommenderPhone">
            <el-input v-model="formSign.recommenderPhone" placeholder="请输入推荐人手机号" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('formSign')" :loading="ifLoading" style="width: 100px;">确认</el-button>
            <el-button @click="backLogin" style="width: 100px;">返回登陆</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Sign',
  data () {
    var validateAccountPhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    var validateConfirmPass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== this.formSign.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ifLoading: false,
      formSign: {
        role: 2, // 1-承运商 2-货主 3-个人
        accountName: '',
        code: '',
        password: '',
        passwordAgain: '',
        recommenderPhone: ''
      },
      haGetCode: false,
      code_R: '',
      code: '',
      CountDown: 60,
      SignRules: {
        accountName: [
          { required: true, validator: validateAccountPhone, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'change' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'change' }
        ],
        passwordAgain: [
          { required: true, validator: validateConfirmPass }
        ]
      }
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    // 提交注册
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formSign.code !== this.code_R) {
            this.$message({
              message: '验证码不正确！',
              type: 'warning'
            })
            return false
          }
          let DATA = {
            fmobile: this.formSign.accountName,
            password: this.formSign.password,
            recommd: this.formSign.recommenderPhone,
            ftype: this.formSign.role
          }
          let stObg = JSON.stringify(DATA)
          this.ifLoading = true
          this.send({
            name: '/tokens/register?zRegisterJson=' + stObg,
            method: 'POST',
            data: {
            }
          }).then(res => {
            if (res.data.respCode === '0') {
              this.$message({
                message: '注册成功！',
                type: 'success'
              })
              this.backLogin()
              this.ifLoading = false
            } else {
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
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 返回登陆
    backLogin () {
      this.$router.push({name: 'Login'})
      this.changeLocationIdx(0)
    },
    // 获取验证码
    toGetCode () {
      if (this.formSign.accountName.trim() === '') {
        this.$message({
          message: '请输入手机号！',
          type: 'warning'
        })
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.formSign.accountName))) {
        this.$message({
          message: '手机号格式不正确！',
          type: 'warning'
        })
        return false
      }
      if (!this.haGetCode) {
        this.getCode()
      }
    },
    // 发送验证码
    getCode () {
      this.send({
        name: '/tokens/SMScode?fmobile=' + this.formSign.accountName,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.result === 1) {
          this.code_R = res.data.code
          this.CountDownFN()
        } else {
          this.$message({
            message: '验证码获取失败！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 倒计时
    CountDownFN () {
      let Timer = setTimeout(() => {
        this.CountDownFN()
      }, 1000)
      let num = this.CountDown
      if (num === 1) {
        clearTimeout(Timer)
        this.CountDown = 60
        this.haGetCode = false
        return false
      } else {
        this.CountDown -= 1
        this.haGetCode = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.Sign{
  width:90%;
  margin: 3rem auto;
  /*background: url(../../static/images/Strongth_1.jpg) no-repeat center/cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  */
  .leftImg{
    height: calc(400px + 4rem);
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
  }
  .FormBox{
    height: 400px;
     /*position: relative;*/
    margin: 0rem auto;
    text-align: right;
    padding: 2rem;
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
  }
  .BgBlock{
    width: 380px;
    height: calc(400px + 2rem + 90px);
    background: #e0b32b;
    position: absolute;
    top: -30px;
    right: -30px;
    z-index: -99;
  }
}
</style>
