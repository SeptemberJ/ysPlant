<template>
  <div class="InfoBox">
    <el-form class="FormBox" :model="formInfo" :rules="InfoRules" ref="formInfo" label-width="200px">
      <!-- 承运商 -->
      <el-form-item v-if="userRole == 1" label="公司名称" prop="company">
        <el-input v-model="formInfo.company" placeholder="请输入公司名称" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="userRole == 1" label="法人姓名" prop="legalName">
        <el-input v-model="formInfo.legalName" placeholder="请输入法人姓名" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="userRole == 1" label="身份证号" prop="legalIdNo">
        <el-input v-model="formInfo.legalIdNo" placeholder="请输入身份证号" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="userRole == 1" label="统一社会信用代码" prop="organcode">
        <el-input v-model="formInfo.organcode" placeholder="请输入统一社会信用代码" clearable></el-input>
      </el-form-item>
      <el-form-item v-if="userRole == 1" label="营业执照" prop="license">
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
      <el-form-item v-if="userRole == 1">
        <el-checkbox v-model="agreed">我已阅读并同意</el-checkbox><span class="CursorPointer" style="color:#409EFF" @click="showAgreement">使用许可及服务协议</span>
      </el-form-item>
      <el-form-item v-if="userRole == 1">
        <el-button type="primary" @click="onSubmitRZ('formInfo')" style="width: 100px;" :loading="ifLoading">提交认证</el-button>
      </el-form-item>
    </el-form>
    <!-- 其它类型手机端认证 -->
    <h2 class="TextAlignC" v-if="userRole != 1">请去手机端进行信息认证</h2>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import {getCookie} from '../util/utils'
export default {
  name: 'Info',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入联系人手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    var validateID = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号！'))
      } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value))) {
        callback(new Error('身份证号格式不正确！'))
      } else {
        callback()
      }
    }
    return {
      agreed: false,
      ifLoading: false,
      checkStatus: 0,
      licenseImgName: '', // 图片服务器地址 执照和身份证正面
      contractImgName: '', // 图片服务器地址 合同和身份证反面
      hetongName: '', // 上传的合同文件的本地名称
      avatarName: '', // 图片服务器地址 头像
      formInfo: {
        organcode: '',
        company: '',
        bank: '',
        bankNo: '',
        faddress: '',
        taitou: '',
        tax: '',
        avatar: '',
        name: '',
        legalName: '',
        legalIdNo: '',
        ID: '',
        tel: '',
        license: '',
        contract: '',
        role: ''
      },
      InfoRules: {
        organcode: [
          { required: true, message: '请输入统一社会信用代码！', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '请输入公司名称！', trigger: 'blur' }
        ],
        taitou: [
          { required: true, message: '请输入抬头！', trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请输入开户行！', trigger: 'blur' }
        ],
        bankNo: [
          { required: true, message: '请输入银行账号！', trigger: 'blur' }
        ],
        faddress: [
          { required: true, message: '请输入开户地址！', trigger: 'blur' }
        ],
        tax: [
          { required: true, message: '请输入税号！', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入姓名！', trigger: 'blur' }
        ],
        legalName: [
          { required: true, message: '请输入法人姓名！', trigger: 'blur' }
        ],
        legalIdNo: [
          { required: true, validator: validateID, trigger: 'blur' }
        ],
        avatar: [
          { required: true, message: '请选择要上传的头像！', trigger: 'blur' }
        ],
        ID: [
          { required: true, validator: validateID, trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人！', trigger: 'blur' }
        ],
        tel: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        license: [
          { required: true, message: '请选择要上传的文件！', trigger: 'blur' }
        ],
        contract: [
          { required: true, message: '请选择要上传的文件！', trigger: 'blur' }
        ]
      }
      // rzForm: {
      //   name: '',
      //   ID: '',
      //   company: '',
      //   organcode: ''
      // },
      // rzRules: {
      //   name: [
      //     { required: true, message: '请输入姓名！', trigger: 'blur' }
      //   ],
      //   ID: [
      //     { required: true, message: '请输入身份证号！', trigger: 'blur' }
      //   ],
      //   company: [
      //     { required: true, message: '请输入公司名称！', trigger: 'blur' }
      //   ],
      //   organcode: [
      //     { required: true, message: '请输入统一社会信用代码！', trigger: 'blur' }
      //   ]
      // }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId,
      userRole: state => state.userRole,
      userFaccountid: state => state.userFaccountid,
      ImgURL_PREFIX: state => state.ImgURL_PREFIX
    }),
    ifShowPayRZ: function () {
      return (!this.userFaccountid)
    }
  },
  created () {
    // this.getBasicInfo()
  },
  methods: {
    ...mapActions([
      'changeLocationIdx',
      'changPDFCompany',
      'changeUserFaccountid'
    ]),
    handleAvatarSuccess (res, file) {
    },
    // 同意协议勾选
    showAgreement () {
      this.$alert('<div style="height: 300px;overflow-y:scroll;"><h5>一 服务条款确认</h5><p>在接受本服务条款之前，请您仔细阅读本服务条款的全部内容。如果您对本服务条款的条款有疑问的，无车承运将向您解释条款内容。如果您不同意本服务条款的任意内容，或者无法准确理解条款的解释，请不要进行后续操作。 本服务条款的效力范围及于无车承运的一切产品和服务，用户在享受无车承运任何单项服务时，应当受本服务条款的约束。当用户使用无车承运各单项服务时，用户的使用行为视为其对该单项服务的服务条款以及无车承运在该单项服务中发出的各类公告的同意。 用户通过进入注册程序使用服务，即表示用户与无车承运已达成协议，自愿接受本服务条款的所有内容。[1]</p><h5>二 声明及承诺 </h5><p>1 您以任何方式使用本公司所提供的服务，即表示您已充分阅读、理解并接受本协议的全部内容，一旦您使用本服务，即表示您同意遵循本协议之所有约定。</p><p>2 本公司可随时自行全权决定更改“条款”。如“条款”有任何变更，本公司将在其网站上刊载公告，无需另行单独通知您。公告后，一旦您继续使用“服务”，则表示您已接受经修订的“条款”，如您不同意相关变更，必须停止使用“服务”。</p><p>3 在您完成注册程序或以其他无车承运允许的方式实际使用无车承运服务时，您应当是具备完全民事行为权利和完全民事能力的自然人、法人或其他组织。若您不具备前述主体资格，则您及您的监护人应承担因此而导致的一切后果，且无车承运有权注销或永久冻结您的账户，并向您及您的监护人索偿相应损失。</p><h5>三 收费及续费</h5><p>1 无车承运保留在服务条款确认后，收取服务费用或者是改变服务费用的权利。本公司保留在无须发出书面通知，仅在无车承运官网网站公示的情况下，暂时或永久地更改或停止部分或全部“服务”的权利。</p><p>2 服务期满双方愿意继续合作的，您至少应在服务期满前7天内支付续费款项，以使服务得以继续进行。如续费时无车承运对无车承运服务体系、名称或价格进行调整的，双方同意按照届时有效的新的服务体系、名称或价格履行，但调整前您已经支付的款项不受影响。</p><p>3 延期续费 服务到期后，如果未续费，则视为服务终止。本公司没有义务替您保留账号及与之相关的数据，如果您超过60日没有支付相关费用，这些数据有可能被永久删除，本公司对此不承担任何责任。如果您延期续费，则需补全拖欠费用期间的与之相对应的服务费用。</p><p>4 无车承运保留在您未按照约定支付全部费用之前不向您提供服务和技术支持，或者终止服务和技术支持的权利。</p></div>', '使用许可及服务协议', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '关闭'
      })
    },
    // 查看合同PDF
    ToPdf () {
      this.changPDFCompany(this.formInfo.company)
      let routeData = this.$router.resolve({name: 'PDF', params: {name: this.formInfo.company}})
      window.open(routeData.href, '_blank')
    },
    // 营业执照
    beforeAvatarUpload (file) {
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let licenseImage = new FormData()
      licenseImage.append('file', file)
      this.uploadImg('licenseImgName', licenseImage, 'zhizhao', 1, 0)
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.formInfo.license = this.result
      }
    },
    // 合同
    beforeAvatarUploadC (file) {
      this.hetongName = file.name
      let fileName = file.name
      let index = fileName.indexOf('.')
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的文件太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let contractImage = new FormData()
      contractImage.append('file', file)
      switch (fileName.substring(index)) {
        case '.pdf':
          this.uploadImg('contractImgName', contractImage, 'hetong', 2, 0)
          break
        case '.PDF':
          this.uploadImg('contractImgName', contractImage, 'hetong', 2, 0)
          break
        case '.doc':
          this.uploadImg('contractImgName', contractImage, 'hetong', 3, 0)
          break
        case '.DOC':
          this.uploadImg('contractImgName', contractImage, 'hetong', 3, 0)
          break
      }
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.formInfo.contract = this.result
      }
    },
    // 头像
    beforeAvatarUploadAvatar (file) {
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let avatarFormData = new FormData()
      avatarFormData.append('file', file)
      this.uploadImg('avatarName', avatarFormData, 'Auth', 1, 1)
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.formInfo.avatar = this.result
      }
    },
    // 身份证正面
    beforeAvatarUploadSF (file) {
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let licenseImage = new FormData()
      licenseImage.append('file', file)
      this.uploadImg('licenseImgName', licenseImage, 'Auth', 1, 1)
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.formInfo.license = this.result
      }
    },
    // 身份证反面
    beforeAvatarUploadSB (file) {
      if (file.size > 1024000 * 2) {
        this.$message({
          message: '您上传的图片太大了, 请不要超过2M!',
          type: 'warning'
        })
        return false
      }
      let contractImage = new FormData()
      contractImage.append('file', file)
      this.uploadImg('contractImgName', contractImage, 'Auth', 1, 1)
      var _this = this
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        _this.formInfo.contract = this.result
      }
    },
    // 上传图片
    uploadImg (property, img, floder, type, kind) {
      axios.post(this.ImgURL_PREFIX + 'rest/registerDriverController/photo?kind=' + kind + '&folder=' + floder + '&type=' + type, img, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': getCookie('btwccy_cookie')
        }
      }).then((res) => {
        this[property] = res.data.data
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.agreed) {
            this.$message({
              message: '请先阅读并同意使用许可及服务协议！',
              type: 'warning'
            })
            return false
          }
          switch (this.userRole) {
            case '1':
              this.submitCYS()
              break
            case '2':
              this.submitHZ()
              break
            case '3':
              this.submitGR()
              break
          }
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    onSubmitRZ (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.agreed) {
            this.$message({
              message: '请先阅读并同意使用许可及服务协议！',
              type: 'warning'
            })
            return false
          }
          if (this.userRole === '3') {
            this.payRenZhengGR()
          } else {
            this.payRenZhengNotGR()
          }
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 货主信息提交
    submitHZ () {
      let DATA = {
        id: this.userId,
        company_name: this.formInfo.company,
        company_lxr: this.formInfo.contact,
        company_licence: this.licenseImgName,
        company_contract: this.contractImgName,
        company_phone: this.formInfo.tel,
        tai_tou: this.formInfo.taitou,
        f_bank: this.formInfo.bank,
        f_bank_no: this.formInfo.bankNo,
        faddress: this.formInfo.faddress,
        tax_number: this.formInfo.tax
      }
      let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/zRegisterController/doUpdateHZ?jsonHZ=' + stObg,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.checkStatus = 0
          this.$message({
            message: '信息提交成功，等待审核！',
            type: 'success'
          })
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
    },
    // 承运商信息提交
    submitCYS () {
      let DATA = {
        id: this.userId,
        company_name: this.formInfo.company,
        company_lxr: this.formInfo.contact,
        company_licence: this.licenseImgName,
        company_contract: this.contractImgName,
        company_phone: this.formInfo.tel,
        tai_tou: this.formInfo.taitou,
        f_bank: this.formInfo.bank,
        f_bank_no: this.formInfo.bankNo,
        faddress: this.formInfo.faddress,
        tax_number: this.formInfo.tax
      }
      let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/zRegisterController/doUpdatePersonal?jsonPersonal=' + stObg,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.checkStatus = 0
          this.$message({
            message: '信息提交成功，等待审核！',
            type: 'success'
          })
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
    },
    // 个人货主信息提交
    submitGR () {
      let DATA = {
        id: this.userId,
        fidentity: this.formInfo.ID,
        fidentity_front: this.licenseImgName,
        fidentity_back: this.contractImgName,
        headpic: this.avatarName
      }
      let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/zRegisterController/doUpdateLogistics?jsonLogistics=' + stObg,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.checkStatus = 0
          this.$message({
            message: '信息提交成功，等待审核！',
            type: 'success'
          })
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
    },
    // 个人支付认证
    payRenZhengGR () {
      let DATA = {
        id: this.userId,
        name: this.formInfo.name,
        idno: this.formInfo.ID,
        type: 0,
        front: this.licenseImgName,
        back: this.contractImgName
      }
      let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/eSignController/personAuth?personAuth=' + stObg,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.ifLoading = false
          this.changeUserFaccountid(res.data.data)
          this.$router.push({name: 'Home'})
        } else {
          this.ifLoading = false
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        this.ifLoading = false
        console.log(res)
      })
    },
    // 货主和承运商支付认证
    payRenZhengNotGR () {
      let DATA = {
        id: this.userId,
        name: this.formInfo.company,
        legalName: this.formInfo.legalName,
        legalIdNo: this.formInfo.legalIdNo,
        // organtype: 0,
        organCode: this.formInfo.organcode,
        // usertype: 0,
        companyLicence: this.licenseImgName
      }
      // let stObg = JSON.stringify(DATA)
      this.ifLoading = true
      this.send({
        name: '/eSignController/organizeAuth',
        method: 'POST',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.ifLoading = false
          this.changeUserFaccountid(res.data.data)
          this.$router.push({name: 'Home'})
        } else {
          this.ifLoading = false
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
      }).catch((res) => {
        this.ifLoading = false
        console.log(res)
      })
    },
    // 获取基本信息
    getBasicInfo () {
      this.send({
        name: '/zRegisterController/' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        // checkStatus -1_未填写  0_审核中  其他_审核未通过
        let Info = res.data.data
        this.checkStatus = Info.checkStatus
        if (res.data.respCode === '0') {
          this.changeUserFaccountid(Info.faccountid)
          if (Info.checkStatus === '1' || Info.checkStatus === '3') {
            this.$router.push({name: 'Home'})
            this.changeLocationIdx(2)
          }
          if ((Info.checkStatus === '0' && Info.companyContract) || (Info.checkStatus === '0' && Info.fbankNo)) {
            this.agreed = true
          }
          this.formInfo.company = Info.companyName
          this.formInfo.contact = Info.companyLxr
          this.formInfo.tel = Info.companyPhone

          this.formInfo.tax = Info.taxNumber
          this.formInfo.taitou = Info.taiTou
          this.formInfo.bank = Info.fbank
          this.formInfo.bankNo = Info.fbankNo
          this.formInfo.faddress = Info.faddress

          this.formInfo.ID = Info.fidentity
          // 货主 承运商
          if (this.userRole === '1' || this.userRole === '2') {
            this.formInfo.contract = Info.companyContract ? (this.ImgURL_PREFIX + Info.companyContract) : ''
            this.formInfo.license = Info.companyLicence ? (this.ImgURL_PREFIX + Info.companyLicence) : ''
            this.licenseImgName = Info.companyLicence
            this.contractImgName = Info.companyContract
          }
          // 个人货主
          if (this.userRole === '3') {
            this.formInfo.name = Info.companyLxr ? Info.companyLxr : ''
            this.formInfo.license = Info.fidentityFront ? (this.ImgURL_PREFIX + Info.fidentityFront) : ''
            this.formInfo.contract = Info.fidentityBack ? (this.ImgURL_PREFIX + Info.fidentityBack) : ''
            this.licenseImgName = Info.fidentityFront
            this.contractImgName = Info.fidentityBack
          }
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

<style lang="less" scoped>
.InfoBox{
  width: 600px;
  margin: 3rem auto 2rem auto;
  .FormBox{
    margin: 2rem auto;
    text-align: right;
  }
}
</style>
