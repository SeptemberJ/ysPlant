<template>
  <div class="Center">
    <el-form class="CenterForm" :model="formInfo" :rules="CenterRules" ref="formInfo" label-width="120px">
      <el-form-item
        class="TextAlignR"
        prop="phone"
        label="账号"
      >
        <el-input v-model="formInfo.phone" placeholder="请输入注册的手机号" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="company"
        label="公司名称"
      >
        <el-input v-model="formInfo.company" placeholder="请输入公司名称" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="contact"
        label="联系人"
      >
        <el-input v-model="formInfo.contact" placeholder="请输入联系人" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="tel"
        label="联系电话"
      >
        <el-input v-model="formInfo.phone" placeholder="请输入联系人电话" clearable></el-input>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="license"
        label="营业执照"
      >
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload">
          <img v-if="formInfo.license" :src="formInfo.license" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item class="TextAlignR">
        <el-button type="primary" @click="onSubmit('formInfo')">保存修改</el-button>
      </el-form-item>
   </el-form>
  </div>
</template>

<script>
export default {
  name: 'Center',
  data () {
    return {
      formInfo: {
        phone: '',
        company: '',
        contact: '',
        tel: '',
        license: ''
      },
      CenterRules: {
        phone: [
          { required: true, message: '请输入手机号！', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入公司名称！', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人！', trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入联系人电话！', trigger: 'blur' }
        ],
        license: [
          { required: true, message: '请选择要上传的营业执照！', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
        return false
      }
      reader.onload = function (e) {
        _this.formInfo.license = this.result
      }
    },
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
.Center{
  background: #fff;
  margin: 20px;
  padding: 20px;
}
</style>
