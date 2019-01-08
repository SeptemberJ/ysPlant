<template>
  <div class="InfoBox">
    <p class="ColorYellow">{{checkStatus == -1 ? '请填写您的信息！' : (checkStatus == 0 ? '您的信息正在等待审核！' : '您的信息未通过审核，请重新填写！')}}</p>
    <el-form class="FormBox" :model="formInfo" :rules="InfoRules" ref="formInfo" label-width="80px">
     <!--  <el-form-item label="账户类型" prop="role">
        <el-radio-group v-model="formInfo.role" size="medium">
          <el-radio border label="承运商"></el-radio>
          <el-radio border label="货主"></el-radio>
        </el-radio-group>
      </el-form-item> -->
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
      <el-form-item  label="合同" prop="contract">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUploadC">
          <img v-if="formInfo.contract" :src="formInfo.contract" class="avatar">
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
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import {send} from '../util/send'
import {getCookie} from '../util/utils'
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
      checkStatus: 0,
      licenseImgName: '', // 图片服务器地址
      contractImgName: '', // 图片服务器地址
      formInfo: {
        company: '柏田',
        contact: '留白',
        tel: '18234567890',
        license: '',
        contract: '',
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
        ],
        contract: [
          { required: true, message: '请选择要上传的合同！', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  created () {
    this.getBasicInfo()
  },
  methods: {
    ...mapActions([
      'changeLocationIdx'
    ]),
    handleAvatarSuccess (res, file) {
      // this.formInfo.license = URL.createObjectURL(file.raw)
    },
    // 营业执照
    beforeAvatarUpload (file) {
      let licenseImage = new FormData()
      licenseImage.append('file', file)
      this.uploadImg('licenseImgName', licenseImage)
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
    // 合同
    beforeAvatarUploadC (file) {
      let contractImage = new FormData()
      contractImage.append('file', file)
      this.uploadImg('contractImgName', contractImage)
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
        _this.formInfo.contract = this.result
      }
    },
    // 上传图片
    uploadImg (property, img) {
      axios.post('http://172.16.52.99:8083/yingsu/rest/registerDriverController/photo', img, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': getCookie('btwccy_cookie')
        }
      }).then((res) => {
        this[property] = res.data
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let DATA = {
            id: this.userId,
            company_name: this.formInfo.company,
            company_lxr: this.formInfo.contact,
            company_licence: this.licenseImgName,
            company_contract: this.contractImgName,
            company_phone: this.formInfo.tel
          }
          let stObg = JSON.stringify(DATA)
          send({
            name: '/zRegisterController/doUpdateHZ?jsonHZ=' + stObg,
            method: 'POST',
            data: {
            }
          }).then(res => {
            if (res.data.code === 1) {
              this.checkStatus = 0
              this.$message({
                message: '信息提交成功，等待审核！',
                type: 'success'
              })
            } else {
              this.$message({
                message: res.data.message + '！',
                type: 'error'
              })
            }
          }).catch((res) => {
            console.log(res)
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
    // 获取基本信息
    getBasicInfo () {
      send({
        name: '/zRegisterController/' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        let Info = res.data.data
        if (res.data.ok) {
          if (Info.companyName) {
            this.checkStatus = Info.checkStatus
          } else {
            this.checkStatus = -1 // 未填写过信息
          }
          this.licenseImgName = Info.companyLicence
          this.contractImgName = Info.companyContract
          this.formInfo.company = Info.companyName
          this.formInfo.contact = Info.companyLxr
          this.formInfo.tel = Info.companyPhone
          this.formInfo.license = Info.companyLicence
          this.formInfo.contract = Info.companyContract
          this.formInfo.role = (Info.ftype === '1' ? '承运商' : '货主')
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
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
