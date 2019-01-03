<template>
  <div class="Sign">
    <el-form class="FormBox" :model="formSign" :rules="SignRules" ref="formSign" label-width="80px">
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
        <el-button type="primary" @click="onSubmit('formSign')" style="width: 100px;">确认</el-button>
        <el-button @click="backLogin" style="width: 100px;">返回登陆</el-button>
        <!-- <el-button  @click="onSubmit" style="background: #e0b32b !important;">确认</el-button> -->
      </el-form-item>
      <div class="BgBlock"></div>
    </el-form>
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
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    var validateConfirmPass = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formSign.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateRecommenderPhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入推荐人手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('推荐人手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      formSign: {
        accountName: '18234567890',
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
          { required: true, validator: validateAccountPhone, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码！', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码！', trigger: 'blur' },
          { min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, validator: validateConfirmPass }
        ],
        recommenderPhone: [
          { required: true, validator: validateRecommenderPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    backLogin () {
      this.$router.push({name: 'Login'})
      this.changeLocationIdx({idxF: 0, idxS: ''})
    },
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
        this.CountDownFN()
        // this.getCode()
      }
    },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Sign{
  width: 400px;
  margin: 3rem auto 2rem auto;
  .FormBox{
    height: 350px;
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
    height: calc(350px + 2rem + 90px);
    background: #e0b32b;
    position: absolute;
    top: -30px;
    right: -30px;
    z-index: -99;
  }
}
</style>
