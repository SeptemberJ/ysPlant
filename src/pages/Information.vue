<template>
  <div class="InfoBox">
    <el-form class="FormBox" :model="formInfo" :rules="InfoRules" ref="formInfo" label-width="80px">
      <el-form-item label="账户类型" prop="role">
        <el-radio-group v-model="formInfo.role" size="medium">
          <el-radio border label="承运商"></el-radio>
          <el-radio border label="货主"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="公司名称" prop="company">
        <el-input v-model="formInfo.company" placeholder="请输入公司名称" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input v-model="formInfo.contact" placeholder="请输入联系人" clearable></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="formInfo.tel" placeholder="请输入联系人手机号" clearable></el-input>
      </el-form-item>
      <el-form-item  label="营业执照" prop="license">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="formInfo.license" :src="formInfo.license" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('formInfo')" style="width: 100px;">提交信息</el-button>
      </el-form-item>
      <div class="BgBlock"></div>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Info',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入联系人手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    return {
      formInfo: {
        company: '',
        contact: '',
        tel: '',
        license: '',
        role: '承运商'
      },
      InfoRules: {
        company: [
          { required: true, message: '请输入公司名称！', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人！', trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        license: [
          { required: true, message: '请选择要上传的营业执照！', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    handleAvatarSuccess (res, file) {
      // this.formInfo.license = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      console.log('-------------------')
      console.log(file)
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        // this.$Notice.warning({
        //   title: '图片大小警告',
        //   desc: '您上传的图片太大了, 请不要超过2M!'
        // })
        return false
      }
      reader.onload = function (e) {
        _this.formInfo.license = this.result
      }
    },
    // beforeAvatarUpload (file) {
    //   console.log('-------------------')
    //   console.log(file)
    //   // const isJPG = file.type === 'image/jpeg';
    //   const isLt2M = file.size / 1024 / 1024 < 2

    //   // if (!isJPG) {
    //   //   this.$message.error('上传头像图片只能是 JPG 格式!');
    //   // }
    //   if (!isLt2M) {
    //     this.$message.error('上传头像图片大小不能超过 2MB!')
    //   }
    //   return isLt2M
    //   // return isJPG && isLt2M
    // },
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.InfoBox{
  width: 400px;
  margin: 3rem auto 2rem auto;
  .FormBox{
    margin: 2rem auto;
    text-align: right;
  }
}
</style>
