<template>
  <div class="AddOrder">
    <el-form ref="formAdd" :model="formAdd" :rules="AddRules" label-width="90px" label-position="left">
      <el-row>
        <el-col :span="24">
          <el-form-item prop="forderNo" label="订单号">
            <span class="TextAlignL SpanInlineBlock">{{formAdd.forderNo}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="ffee" label="运费金额">
            <el-input v-model="formAdd.ffee" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="ftransportPrice" label="运输单价">
            <el-input v-model="formAdd.ftransportPrice" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="ftransportCount" label="运输趟数">
            <el-input v-model="formAdd.ftransportCount" clearable>
              <template slot="append">趟</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="fsettlementCycle" label="运输周期">
            <el-input v-model="formAdd.fsettlementCycle" clearable>
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="foilCard" label="预付油卡">
            <el-input v-model="formAdd.foilCard" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="fpreFee" label="预付款">
            <el-input v-model="formAdd.fpreFee" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="freceiptDeposit" label="运单押金">
            <el-input v-model="formAdd.freceiptDeposit" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="ftransitHour" label="在途时限">
            <el-input v-model="formAdd.ftransitHour" clearable>
              <template slot="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="ffeeAdd" label="运费增补">
            <el-input v-model="formAdd.ffeeAdd" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="ffeeMinus" label="运费扣减">
            <el-input v-model="formAdd.ffeeMinus" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item prop="fsupplierName" label="供应商">
        <el-input v-model="formAdd.fsupplierName" clearable></el-input>
      </el-form-item>
      <el-form-item prop="fdriverId" label="承运司机">
        <el-select v-model="formAdd.fdriverId" placeholder="请选择" style="width:200px;float:left" @change="changeDriver">
          <el-option
            v-for="item in LogisticsList"
            :key="item.id"
            :label="item.fname"
            :value="item.id">
            <span style="float: left">{{ item.fname }}</span>
          </el-option>
        </el-select>
        <span style="width: 150px;display:inline-block">手机号：{{sjPhone}}</span>
        <span style="width: 150px;display:inline-block">牌照：{{sjLicensePlate}}</span>
      </el-form-item>
      <el-form-item prop="floadingTime" label="装货时间">
        <el-date-picker
          v-model="formAdd.floadingTime"
          type="date"
          style="width: 100%"
          :picker-options="pickerOptionsStart"
          placeholder="选择装货时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="fstartDate" label="起运时间">
        <el-date-picker
          v-model="formAdd.fstartDate"
          type="date"
          style="width: 100%"
          :picker-options="pickerOptionsAccordingTo"
          placeholder="选择起运时间">
        </el-date-picker>
      </el-form-item>
      <el-row>
        <el-col :span="7" :offset="0">
          <el-form-item prop="fprovince" label="始发省">
            <el-select v-model="formAdd.fprovince" placeholder="请选择" @change="changeFprovince">
              <el-option
                v-for="(fprovince, idx) in fprovinceList"
                :key="idx"
                :label="fprovince.name"
                :value="fprovince.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="fcity" label="始发市">
            <el-select v-model="formAdd.fcity" placeholder="请选择" @change="changeFcity">
              <el-option
                v-for="(fcity, idx) in fcityList"
                :key="idx"
                :label="fcity.name"
                :value="fcity.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="farea" label="始发区">
            <el-select v-model="formAdd.farea" placeholder="请选择" @change="changeFarea">
              <el-option
                v-for="(farea, idx) in fareaList"
                :key="idx"
                :label="farea.name"
                :value="farea.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="0">
          <el-form-item prop="sprovince" label="收货省">
            <el-select v-model="formAdd.sprovince" placeholder="请选择" @change="changeSprovince">
              <el-option
                v-for="(sprovince, idx) in sprovinceList"
                :key="idx"
                :label="sprovince.name"
                :value="sprovince.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="scity" label="收货市">
            <el-select v-model="formAdd.scity" placeholder="请选择" @change="changeScity">
              <el-option
                v-for="(scity, idx) in scityList"
                :key="idx"
                :label="scity.name"
                :value="scity.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item prop="sarea" label="收货区">
            <el-select v-model="formAdd.sarea" placeholder="请选择" @change="changeSarea">
              <el-option
                v-for="(sarea, idx) in sareaList"
                :key="idx"
                :label="sarea.name"
                :value="sarea.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="freceiptPeople" label="回单收件人">
        <el-input v-model="formAdd.freceiptPeople" clearable></el-input>
      </el-form-item>
      <el-form-item prop="freceiptAddr" label="回单地址">
        <el-input v-model="formAdd.freceiptAddr" clearable></el-input>
      </el-form-item>
      <el-form-item prop="ftrackStatus" label="跟踪状态">
        <el-select v-model="formAdd.ftrackStatus" placeholder="请选择" style="width: 100%">
          <el-option
            v-for="item in trackStatusList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="fgoodsName" label="货物名称">
            <el-select v-model="formAdd.fgoodsName" placeholder="请选择" style="width: 100%">
              <el-option
                v-for="(goodsType, idx) in goodsTypeList"
                :key="idx"
                :label="goodsType.name"
                :value="goodsType.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="1">
          <el-form-item prop="fgoodsNumber" label="货物数量">
            <el-input v-model="formAdd.fgoodsNumber" clearable>
              <template slot="append">kg</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item prop="fremarks" label="备注">
        <el-input type="textarea" v-model="formAdd.fremarks" :maxlength="50" placeholder="最多输入50个字"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="24" class="TextAlignC">
          <el-button type="primary" :loading="ifLoading" @click="onSubmit('formAdd')">保存修改</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Order',
  props: ['orderId'],
  data () {
    return {
      ifLoading: false,
      sjPhone: '',
      sjLicensePlate: '',
      trackStatusList: [
        {value: '0', label: '申请'},
        {value: '1', label: '未开始'},
        {value: '2', label: '运输中'},
        {value: '3', label: '已终结'}
      ],
      LogisticsList: [],
      goodsTypeList: [],
      fprovinceList: [],
      fcityList: [],
      fareaList: [],
      sprovinceList: [],
      scityList: [],
      sareaList: [],
      fProvincePid: 1,
      fcityPid: '',
      fareaPid: '',
      sProvincePid: 1,
      scityPid: '',
      sareaPid: '',
      formAdd: {
        fdestination: '',
        fdriverId: '',
        ffee: '',
        ffeeAdd: '',
        ffeeMinus: '',
        fgoodsName: '',
        fgoodsNumber: '',
        floadingTime: '',
        foilCard: '',
        forderNo: '',
        forigin: '',
        fpreFee: '',
        freceiptAddr: '',
        freceiptDeposit: '',
        freceiptPeople: '',
        fremarks: '',
        fsettlementCycle: '',
        fstartDate: '',
        fsupplierName: '',
        ftrackStatus: '',
        ftransitHour: '',
        ftransportCount: '',
        ftransportPrice: '',
        // id: '',
        zregisterId: '',
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: ''
      },
      AddRules: {
        ffee: [
          { required: true, message: '请输入运费金额!', trigger: 'blur' }
        ],
        fdriverId: [
          { required: true, message: '请选择承运司机!', trigger: 'blur' }
        ],
        forigin: [
          { required: true, message: '请选择始发地!', trigger: 'blur' }
        ],
        fdestination: [
          { required: true, message: '请选择目的城市!', trigger: 'blur' }
        ],
        ftransportCount: [
          { required: true, message: '请输入运输趟数!', trigger: 'blur' }
        ],
        fgoodsName: [
          { required: true, message: '请选择货物类型!', trigger: 'blur' }
        ],
        fgoodsNumber: [
          { required: true, message: '请输入货物数量!', trigger: 'blur' }
        ],
        fprovince: [
          { required: true, message: '请选择始发省份!', trigger: 'change' }
        ],
        fcity: [
          { required: true, message: '请选择始发市!', trigger: 'change' }
        ],
        farea: [
          { required: true, message: '请选择始发区!', trigger: 'change' }
        ],
        sprovince: [
          { required: true, message: '请选择收货省份!', trigger: 'change' }
        ],
        scity: [
          { required: true, message: '请选择收货市!', trigger: 'change' }
        ],
        sarea: [
          { required: true, message: '请选择收货区!', trigger: 'change' }
        ]
      },
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    }),
    pickerOptionsAccordingTo: function () {
      let floadingTime = this.formAdd.floadingTime
      let time = {
        disabledDate (time) {
          return time.getTime() < floadingTime
        }
      }
      return time
    }
  },
  watch: {
    orderId: function (val) {
      this.getOrderDetail()
    },
    'formAdd.floadingTime': function (newVal, oldVal) {
      // 初始化数据不执行 重新选择的日期并没有大于fstartDate的不执行
      if (oldVal !== '' && newVal.getTime() > this.formAdd.fstartDate.getTime()) {
        this.formAdd.fstartDate = ''
      }
    }
  },
  created () {
    this.getOrderDetail()
    this.getGoodsType()
    this.getDriverList()
  },
  methods: {
    // 获取货物类型下拉
    getGoodsType () {
      this.send({
        name: '/typeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.goodsTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 选择司机
    changeDriver (id) {
      this.LogisticsList.find(Logistic => {
        if (Logistic.id === id) {
          if (Logistic.fcarno === '' || !Logistic.fcarno) {
            this.$message({
              message: '该司机尚未绑定牌照！',
              type: 'error'
            })
            this.formAdd.fdriverId = ''
            this.sjPhone = ''
            this.sjLicensePlate = ''
          } else {
            this.sjLicensePlate = Logistic.fcarno
            this.sjPhone = Logistic.fmobile
          }
        }
      })
    },
    // 提交修改
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureModify()
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    // 数据清空初始化
    clearDataABack () {
      this.formAdd = {
        fdestination: '',
        fdriverId: '',
        ffee: '',
        ffeeAdd: '',
        ffeeMinus: '',
        fgoodsName: '',
        fgoodsNumber: '',
        floadingTime: '',
        foilCard: '',
        // forderNo: '',
        forigin: '',
        fpreFee: '',
        freceiptAddr: '',
        freceiptDeposit: '',
        freceiptPeople: '',
        fremarks: '',
        fsettlementCycle: '',
        fstartDate: '',
        fsupplierName: '',
        ftrackStatus: '',
        ftransitHour: '',
        ftransportCount: '',
        ftransportPrice: '',
        // id: '',
        zregisterId: '',
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: ''
      }
    },
    // 开票订单修改
    sureModify () {
      let DATA = {
        fdestination: this.formAdd.sarea,
        fdriverId: this.formAdd.fdriverId,
        ffee: this.formAdd.ffee,
        ffeeAdd: this.formAdd.ffeeAdd,
        ffeeMinus: this.formAdd.ffeeMinus,
        fgoodsName: this.formAdd.fgoodsName,
        fgoodsNumber: this.formAdd.fgoodsNumber,
        floadingTime: this.formAdd.floadingTime,
        foilCard: this.formAdd.foilCard,
        forderNo: this.formAdd.forderNo,
        forigin: this.formAdd.farea,
        fpreFee: this.formAdd.fpreFee,
        freceiptAddr: this.formAdd.freceiptAddr,
        freceiptDeposit: this.formAdd.freceiptDeposit,
        freceiptPeople: this.formAdd.freceiptPeople,
        fremarks: this.formAdd.fremarks,
        fsettlementCycle: this.formAdd.fsettlementCycle,
        fstartDate: this.formAdd.fstartDate,
        fsupplierName: this.formAdd.fsupplierName,
        ftrackStatus: this.formAdd.ftrackStatus,
        ftransitHour: this.formAdd.ftransitHour,
        ftransportCount: this.formAdd.ftransportCount,
        ftransportPrice: this.formAdd.ftransportPrice,
        id: this.orderId,
        fregisterId: this.userId
      }
      // console.log(DATA)
      this.ifLoading = true
      this.send({
        name: '/zInvoiceOrderController/' + this.orderId,
        method: 'PUT',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '开票订单修改成功！',
            type: 'success'
          })
          this.$emit('ToggleDialogModify')
          this.$emit('FreshList')
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
    // 改变发货地省
    changeFprovince (id, type) {
      this.getCity(id, 'fcityList')
      if (type !== 1) {
        this.formAdd.fcity = ''
        this.formAdd.farea = ''
      }
    },
    // 改变发货地区
    changeFcity (id, type) {
      this.getArea(id, 'fareaList')
      if (type !== 1) {
        this.formAdd.farea = ''
      }
    },
    changeFarea (id) {
    },
    // 改变收货地省
    changeSprovince (id, type) {
      this.getCity(id, 'scityList')
      if (type !== 1) {
        this.formAdd.scity = ''
        this.formAdd.sarea = ''
      }
    },
    // 改变收货地区
    changeScity (id, type) {
      this.getArea(id, 'sareaList')
      if (type !== 1) {
        this.formAdd.sarea = ''
      }
    },
    changeSarea (id) {
    },
    // 获取省下拉
    getProvince () {
      this.send({
        name: '/registerDriverController/regionSelect?pid=' + this.fProvincePid,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.fprovinceList = res.data.data
          this.sprovinceList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取市下拉
    getCity (id, property) {
      this.send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取区下拉
    getArea (id, property) {
      this.send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取司机下拉
    getDriverList () {
      this.send({
        name: '/zRegisterController/driverListNoPage?fid=' + this.userId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.LogisticsList = res.data.driverList
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
    // 获取开票订单详情
    getOrderDetail () {
      this.send({
        name: '/zInvoiceOrderController/invoiceDetail?id=' + this.orderId,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          let temp = res.data.invoiceOrder
          this.sjPhone = temp.fmobile
          this.sjLicensePlate = temp.fcarno
          this.formAdd = {
            fdestination: temp.destination_area_id,
            fdriverId: temp.fdriver_id,
            ffee: temp.ffee,
            ffeeAdd: temp.ffee_add,
            ffeeMinus: temp.ffee_minus,
            fgoodsName: temp.fgoods_name,
            fgoodsNumber: temp.fgoods_number,
            floadingTime: new Date(temp.floading_time.time),
            foilCard: temp.foil_card,
            forderNo: temp.forder_no,
            forigin: temp.origin_area_id,
            fpreFee: temp.fpre_fee,
            freceiptAddr: temp.freceipt_addr,
            freceiptDeposit: temp.freceipt_deposit,
            freceiptPeople: temp.freceipt_people,
            fremarks: temp.fremarks,
            fsettlementCycle: temp.fsettlement_cycle,
            fstartDate: new Date(temp.fstart_date.time),
            fsupplierName: temp.fsupplier_name,
            ftrackStatus: temp.ftrack_status,
            ftransitHour: temp.ftransit_hour,
            ftransportCount: temp.ftransport_count,
            ftransportPrice: temp.ftransport_price,
            // id: this.orderId,
            zregisterId: temp.z_register_id,
            fprovince: temp.origin_province_id,
            fcity: temp.origin_city_id,
            farea: temp.origin_area_id,
            sprovince: temp.destination_province_id,
            scity: temp.destination_city_id,
            sarea: temp.destination_area_id
          }
          // 省市区
          this.getProvince()
          this.changeFprovince(temp.origin_province_id, 1)
          this.changeSprovince(temp.destination_province_id, 1)
          this.changeFcity(temp.origin_city_id, 1)
          this.changeScity(temp.destination_city_id, 1)
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
.Order{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
}
</style>
