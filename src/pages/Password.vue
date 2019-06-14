<template>
  <div class="Password">
    <el-form class="FormBox" :model="formPassword" :rules="PasswordRules" ref="formPassword" label-width="80px">
      <el-form-item label="手机号" prop="accountName">
        <el-input v-model="formPassword.accountName" placeholder="请输入注册的手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-row class="TextAlignL">
          <el-col :span="14"><el-input v-model="formPassword.code" placeholder="请输入验证码" clearable style="width: 100% !important;"></el-input></el-col>
          <el-col :span="10" class="TextAlignC CursorPointer"><span @click="toGetCode" class="ColorYellow">{{haGetCode?CountDown + 's 后重新获取':'获取验证码'}}</span></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="formPassword.password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordAgain">
        <el-input type="password" v-model="formPassword.passwordAgain" placeholder="请再次输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formPassword')" :loading="ifLoading" style="width: 100px;">确认修改</el-button>
        <el-button @click="backLogin" style="width: 100px;">返回登陆</el-button>
      </el-form-item>
      <div class="BgBlock"></div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {clearCookie} from '../util/utils'
export default {
  name: 'Password',
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
      } else if (value !== this.formPassword.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ifLoading: false,
      formPassword: {
        accountName: '',
        code: '',
        password: '',
        passwordAgain: ''
      },
      haGetCode: false,
      code_R: '',
      code: '',
      CountDown: 60,
      PasswordRules: {
        accountName: [
          { required: true, validator: validateAccountPhone, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'change' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符！', trigger: 'change' }
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
    // 提交
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formPassword.code !== this.code_R) {
            this.$message({
              message: '验证码不正确！',
              type: 'warning'
            })
            return false
          }
          this.ifLoading = true
          this.send({
            name: '/tokens/registerChangePsw?fmobile=' + this.formPassword.accountName + '&fpassword=' + this.formPassword.password,
            method: 'POST',
            data: {
            }
          }).then(res => {
            if (res.data.respCode === '0') {
              this.$message({
                message: '密码修改成功！',
                type: 'success'
              })
              this.$router.push({name: 'Login'})
              this.changeLocationIdx(0)
              clearCookie('btwccy_cookie')
              this.ifLoading = false
            } else {
              this.$message({
                message: res.data.message + '！',
                type: 'error'
              })
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
      if (this.formPassword.accountName.trim() === '') {
        this.$message({
          message: '请输入手机号！',
          type: 'warning'
        })
        return false
      }
      if (!(/^1[34578]\d{9}$/.test(this.formPassword.accountName))) {
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
    // 发送方验证码
    getCode () {
      this.send({
        name: '/tokens/SMScode?fmobile=' + this.formPassword.accountName,
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
.Password{
  width: 400px;
  margin: 5rem auto;
  /*
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  */
  .FormBox{
    height: 300px;
    position: relative;
    margin: 2rem auto;
    text-align: right;
    padding: 2rem;
    background: #fff;
    box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -webkit-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
    -moz-box-shadow: 0 0 10px 3px rgba(0,0,0,.1);
  }
  .BgBlock{
    width: 380px;
    height: calc(300px + 2rem + 90px);
    background: #e0b32b;
    position: absolute;
    top: -30px;
    right: -30px;
    z-index: -99;
  }
}
</style>
