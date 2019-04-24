<template>
  <div class="Center">
    <el-row v-if="userRole == 1 || userRole == 2">
      <el-col :span="8" class="TextAlignL">
        <div class="MarginT_10">
          <span class="LeftTit">企业名称：</span>
          <span>{{formInfo.company}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">联系人员：</span>
          <span>{{formInfo.contact}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">联系电话：</span>
          <span>{{formInfo.tel}}</span>
        </div>
      </el-col>
      <el-col :span="8" class="TextAlignL">
        <div class="MarginT_10">
          <span class="LeftTit">抬头：</span>
          <span>{{formInfo.taitou}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">开户行：</span>
          <span>{{formInfo.bank}}</span>
        </div>
        <div class="MarginT_10">
          <span class="LeftTit">银行账号：</span>
          <span>{{formInfo.bankNo}}</span>
        </div>
      </el-col>
      <el-col :span="8" class="TextAlignL">
        <div class="MarginT_10">
          <span class="LeftTit">账户余额：</span>
          <span>{{formInfo.faccount}} (¥)</span>
          <el-button type = 'success' size="mini" class="MarginL_10" @click="recharge">充值</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 充值 -->
    <el-dialog
      title="账户充值"
      :visible.sync="dialogVisibleCharge"
      width="450px"
      :close-on-click-modal='false'
      :before-close="handleClose">
      <div>
        <el-form :model="formCharge" :rules="chargeRules" ref="formCharge" label-width="100px" class="demo-ruleForm">
          <el-form-item label="充值金额" prop="amount">
            <el-input style="width: 200px;float:left;margin-left: 10px;" v-model="formCharge.amount" clearable placeholder="请输入要充值的金额"></el-input>
            <span style="float:left;margin-left: 10px;">(¥)</span>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCharge = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit('formCharge')">确 定</el-button>
      </span>
    </el-dialog>
    <div style="width:100%;height:30px;border-bottom: 1px dashed #ddd;margin:30px 0 0 0;"></div>
    <!-- <el-row class="MarginT_40">
      <span class="PaddingR_10">操作时间</span>
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="选择开始日期">
      </el-date-picker>
      --
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="选择结束日期">
      </el-date-picker>
      <el-button type="primary" icon="el-icon-search">搜索</el-button>
    </el-row> -->
    <el-row>
      <el-col :span="24"><h3>交易记录明细</h3></el-col>
      <el-col :span="24">
        <el-table
        :data="CapitalFlowData"
        style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="addtime"
            label="交易时间">
          </el-table-column>
          <el-table-column
            prop="tradeSn"
            label="交易编号">
          </el-table-column>
          <el-table-column
            prop="fmoney"
            label="交易金额(¥)">
          </el-table-column>
          <el-table-column
            prop="typeTxt"
            label="交易类型"
            width="100">
          </el-table-column>
          <!-- <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="deleteChargeRecord(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="CapitalFlowData.length > 0">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>

    <!-- <el-form class="CenterForm MarginT_40" :model="formInfo" ref="formInfo" label-width="120px">
      <el-form-item
        v-if="userRole == 1 || userRole == 2"
        class="TextAlignR"
        prop="company"
        label="公司名称："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.company}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 1 || userRole == 2"
        class="TextAlignR"
        prop="contact"
        label="联系人："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.contact}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 3"
        class="TextAlignR"
        prop="contact"
        label="身份证："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.ID}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 1 || userRole == 2"
        class="TextAlignR"
        prop="tel"
        label="联系电话："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.tel}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 2"
        class="TextAlignR"
        prop="contact"
        label="抬头："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.taitou}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 2"
        class="TextAlignR"
        prop="contact"
        label="开户行："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.bank}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 2"
        class="TextAlignR"
        prop="contact"
        label="银行账号："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.bankNo}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="userRole == 2"
        class="TextAlignR"
        prop="contact"
        label="税号："
      >
        <el-row>
          <el-col class="TextAlignR" :span="24">
            <span class="Padding_20">{{formInfo.tax}}</span>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="license"
        :label="userRole == 3 ? '身份证正面：' : '营业执照：'"
      >
        <el-row>
          <el-col class="TextAlignR Padding_20" :span="24">
            <img style="float: right" :src="formInfo.license" class="avatar">
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        class="TextAlignR"
        prop="contract"
        :label="userRole == 3 ? '身份证反面：' : '合同：'"
      >
        <el-row>
          <el-col class="TextAlignR Padding_20" :span="24">
            <img style="float: right" :src="formInfo.contract" class="avatar">
          </el-col>
        </el-row>
      </el-form-item>
   </el-form> -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {send} from '../util/send'
export default {
  name: 'Center',
  data () {
    return {
      startDate: '',
      endDate: '',
      formInfo: {
        phone: '',
        bank: '',
        bankNo: '',
        taitou: '',
        faccount: '',
        tax: '',
        ID: '',
        company: '',
        contact: '',
        tel: '',
        license: '',
        contract: '',
        role: ''
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
      },
      dialogVisibleCharge: false,
      formCharge: {
        amount: 2000
      },
      chargeRules: {
        amount: [
          { required: true, message: '请输入要充值的金额!', trigger: 'blur' }
        ]
      },
      CapitalFlowData: [],
      currentPage: 1,
      pageSize: 15,
      sum: 0
    }
  },
  computed: {
    ...mapState({
      userAccount: state => state.userAccount,
      userId: state => state.userId,
      userRole: state => state.userRole,
      ImgURL_PREFIX: state => state.ImgURL_PREFIX
    })
  },
  created () {
    this.getBasicInfo()
    this.getCapitalFlow()
  },
  methods: {
    // 充值
    recharge () {
      this.dialogVisibleCharge = true
    },
    handleClose (done) {
      this.$confirm('确认取消充值？').then(_ => {
        done()
      }).catch(_ => {})
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureRecharge()
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    sureRecharge () {
      send({
        name: '/zPayAccountRegisterController',
        method: 'POST',
        data: {
          fmoney: this.formCharge.amount,
          payType: 0,
          registerId: this.userId
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '充值成功!',
            type: 'success'
          })
          this.dialogVisibleCharge = false
          this.getBasicInfo()
          this.getCapitalFlow()
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 查看明细
    deleteChargeRecord (index, row) {

    },
    // 获取基本信息
    getBasicInfo () {
      send({
        // name: '/zRegisterController/registerInfo?id=' + this.userId,
        name: '/zRegisterController/' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        let Info = res.data.data
        if (res.data.respCode === '0') {
          // this.formInfo.company = Info.companyName
          // this.formInfo.contact = Info.companyLxr
          // this.formInfo.tel = Info.companyPhone
          // this.formInfo.contract = this.ImgURL_PREFIX + Info.companyContract
          // this.formInfo.license = this.ImgURL_PREFIX + Info.companyLicence
          // this.formInfo.role = (Info.ftype === '1' ? '承运商' : '货主')
          this.formInfo.company = Info.companyName
          this.formInfo.contact = Info.companyLxr
          this.formInfo.tel = Info.companyPhone

          this.formInfo.tax = Info.taxNumber
          this.formInfo.taitou = Info.taiTou
          this.formInfo.bank = Info.fBank
          this.formInfo.bankNo = Info.fBankNO
          this.formInfo.faccount = Info.faccount

          this.formInfo.ID = Info.fIdentity
          // 货主 承运商
          if (this.userRole === '1' || this.userRole === '2') {
            this.formInfo.license = Info.companyContract ? (this.ImgURL_PREFIX + Info.companyContract) : ''
            this.formInfo.contract = Info.companyLicence ? (this.ImgURL_PREFIX + Info.companyLicence) : ''
          }
          // 个人
          if (this.userRole === '3') {
            this.formInfo.license = Info.fIdentityFront ? (this.ImgURL_PREFIX + Info.fIdentityFront) : ''
            this.formInfo.contract = Info.fIdentityBack ? (this.ImgURL_PREFIX + Info.fIdentityBack) : ''
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
    },
    handleCurrentChange () {
      this.getCapitalFlow()
    },
    getCapitalFlow () {
      send({
        name: '/zPayAccountRegisterController/list/' + this.currentPage + '/' + this.pageSize + '/' + this.userId + '/{pay_type}',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          this.CapitalFlowData = res.data.data.map((item) => {
            item.typeTxt = (item.payType === '1' ? '结单扣款' : '充值')
            return item
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
.Center{
  background: #fff;
  margin: 20px 20px 60px 20px;
  padding: 20px;
  .LeftTit{
    width: 100px;
    text-align: right;
    color: #909399;
    font-weight: bold;
    display: inline-block;
  }
}
</style>
