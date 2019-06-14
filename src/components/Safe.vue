<template>
  <div class="Safe">
    <el-form class="SafeForm MarginT_40" :model="formSafe" :rules="SafeRules" ref="formSafe" label-width="120px" label-position="right">
      <el-form-item
        class="TextAlignR"
        label="手机号"
      >
        <el-input v-model="userAccount" :disabled="true" placeholder="请输入注册的手机号" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="code"
        label="验证码"
      >
        <el-row class="TextAlignR">
          <el-col :span="14" class="TextAlignR">
            <el-input v-model="formSafe.code" placeholder="请输入验证码" clearable></el-input>
          </el-col>
          <el-col :span="10" class="TextAlignC CursorPointer">
            <span @click="toGetCode" class="ColorYellow">{{haGetCode?CountDown + 's 后重新获取':'获取验证码'}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="password"
        label="新密码"
      >
        <el-input type="password" v-model="formSafe.password" placeholder="请输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="passwordAgain"
        label="确认新密码"
      >
        <el-input type="password" v-model="formSafe.passwordAgain" placeholder="请再次输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item class="TextAlignR">
        <el-button class="MarginT_40" type="primary" :loading="ifLoading" @click="onSubmit('formSafe')">保存修改</el-button>
      </el-form-item>
   </el-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {clearCookie} from '../util/utils'
export default {
  name: 'Safe',
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
      } else if (value !== this.formSafe.password) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      ifLoading: false,
      haGetCode: false,
      code_R: '',
      code: '',
      CountDown: 60,
      formSafe: {
        phone: '',
        code: '',
        password: '',
        passwordAgain: ''
      },
      SafeRules: {
        phone: [
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
  computed: {
    ...mapState({
      userAccount: state => state.userAccount,
      locationIdx: state => state.locationIdx
    })
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    toGetCode () {
      if (!this.haGetCode) {
        this.getCode()
      }
    },
    // 发送验证码
    getCode () {
      this.send({
        name: '/tokens/SMScode?fmobile=' + this.userAccount,
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
    },
    // 保存修改
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formSafe.code.trim() !== this.code_R) {
            this.$message({
              message: '验证码不正确！',
              type: 'warning'
            })
            return false
          }
          this.ifLoading = true
          this.send({
            name: '/tokens/registerChangePsw?fmobile=' + this.userAccount + '&fpassword=' + this.formSafe.password,
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
    }
  }
}
</script>

<style lang="less" scoped>
.Safe{
  background: #fff;
  margin: 20px 20px 60px 20px;
  padding: 20px;
}
</style>
