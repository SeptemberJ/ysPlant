<template>
  <div class="AddOrder">
    <el-form ref="formAdd" :model="formAdd" :rules="AddRules" label-width="110px" label-position="left">
      <!-- fh -->
      <el-card class="box-card">
        <div slot="header" class="clearfix TextAlignL">
          <span>发货人信息</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="fhName" label="发货人">
                <el-input v-model="formAdd.fhName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="fhTelephone" label="发货人手机">
                <el-input v-model="formAdd.fhTelephone" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="fprovince" label="发货省">
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
              <el-form-item prop="fcity" label="发货市">
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
              <el-form-item prop="farea" label="发货区">
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
          <el-form-item prop="fhAddress" label="街道">
            <el-input v-model="formAdd.fhAddress" clearable></el-input>
          </el-form-item>
        </div>
      </el-card>
      <!-- sh -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>收货人信息</span>
        </div>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="shName" label="收货人">
                <el-input v-model="formAdd.shName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="shTelephone" label="收货人手机">
                <el-input v-model="formAdd.shTelephone" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-form-item prop="shArea" label="收货地">
            <el-input v-model="formAdd.shArea" clearable></el-input>
          </el-form-item> -->
          <!-- <el-row>
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
                <el-select v-model="formAdd.sarea" placeholder="请选择">
                  <el-option
                    v-for="(sarea, idx) in sareaList"
                    :key="idx"
                    :label="sarea.name"
                    :value="sarea.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row> -->
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
          <el-form-item prop="shAddress" label="街道">
            <el-input v-model="formAdd.shAddress" clearable></el-input>
          </el-form-item>
        </div>
      </el-card>
      <!-- goods -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>货物信息</span>
        </div>
        <div>
          <p v-if="formAdd.orderGoodsList.length == 0" class="ColorWarn MarginTB_20">请添加货物信息</p>
          <el-row v-for="(Goods, idx) in formAdd.orderGoodsList" :key="idx">
            <el-col :span="8">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsName'" :rules="AddRules.goodsName" label="货物名称">
                <el-input v-model="Goods.goodsName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsSpace'" :rules="AddRules.goodsSpace"  label="货物面积(㎡)">
                <el-input v-model="Goods.goodsSpace" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsWeight'" :rules="AddRules.goodsWeight"  label="货物数量(kg)">
                <el-input v-model="Goods.goodsWeight" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="0">
              <el-button icon="el-icon-delete" style="border: 0px;" @click="deleteOneLine(idx)"></el-button>
            </el-col>
          </el-row>
          <el-button icon="el-icon-plus" class="MarginT_20" style="width: 100%;border:1px dashed #dcdfe6" @click="addOneLine">添加</el-button>
        </div>
      </el-card>
      <!-- goods -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>其它信息</span>
        </div>
        <div>
          <!-- goods -->
          <el-form-item prop="goodsName" label="货物类型">
            <el-select v-model="formAdd.goodsName" placeholder="请选择" style="width: 100%" @change="changeGoodsType">
              <el-option
                v-for="(goodsType, idx) in goodsTypeList"
                :key="idx"
                :label="goodsType.name"
                :value="goodsType.id">
              </el-option>
            </el-select>
            <!-- <el-input v-model="formAdd.goodsName" clearable></el-input> -->
          </el-form-item>
          <!-- car -->
          <el-form-item prop="carType" label="车型">
            <el-select v-model="formAdd.carType" placeholder="请选择" style="width: 100%" @change="changeCarType">
              <el-option
                v-for="(carType, idx) in carTypeList"
                :key="idx"
                :label="carType.typeName"
                :value="carType.id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- time -->
          <el-form-item prop="zhTime" label="装货日期">
            <el-date-picker  type="datetime" :picker-options="pickerOptionsStart" placeholder="选择装货日期" v-model="formAdd.zhTime" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="appointId" label="指派人员" class="TextAlignL">
            <span class="MarginR_10" v-if="appointName">{{appointName}}</span>
            <el-button type="text" size="small" @click="chooseSJ">选择<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
            <!-- <el-tooltip class="item" effect="dark" content="可以选择指定的承运商或司机来接受您的订单" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip> -->
          </el-form-item>
          <el-form-item label="开具发票" prop="isFapiao">
            <el-radio-group v-model="formAdd.isFapiao" style="float: left">
              <el-radio :label="0" border>不需要</el-radio>
              <el-radio :label="1" border>需要</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>
      <!-- cost -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>预估费用</span>
        </div>
        <div class="TextAlignL">
          <el-form-item label="支付方式" prop="isFapiao">
            <el-row class="TextAlignR">
              <el-col :span="1" :offset="18"><el-radio v-model="formAdd.payType" :label="0"><span style="color:#fff">0</span></el-radio></el-col>
              <el-col :span="1"><img src="../../../static/images/icon/zfb.png" style="width: 35px;margin-top:5px;"></el-col>
              <el-col :span="1" :offset="2"><el-radio v-model="formAdd.payType" :label="1"><span style="color:#fff">1</span></el-radio></el-col>
              <el-col :span="1"><img src="../../../static/images/icon/wx.png" style="width: 35px;margin-top:5px;"></el-col>
            </el-row>
          </el-form-item>
          <el-form-item prop="ffee" label="可接受最高价">
            <el-input v-model="formAdd.ffee" clearable>
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
          <el-form-item label="" v-if="formAdd.max_price > 0">
            <span style="float:right;margin-left: 10px;color: red">（最高限价 {{formAdd.max_price}}¥）</span>
          </el-form-item>
          <!-- <h4 class="ColorWarn"><span style="display:inline-block;width:50%">合计：</span><span style="display:inline-block;width:50%;text-align:right">{{totalSum}} ¥</span></h4> -->
          <!-- <p style="font-size: 12px;color: #909399;text-align:right">{{cityDistance}} (路程/km) * {{totalWeight/1000}} (重量/t) * {{unitPrice}} (单价/¥) = {{totalSum}} ¥</p> -->
        </div>
      </el-card>
      <!-- bt -->
      <el-row>
        <el-col :span="24" class="TextAlignC">
          <el-button type="primary" :loading="ifLoading" @click="onSubmit('formAdd')">提交订单</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- dialog -->
    <el-dialog title="指派查询" :visible.sync="dialogVisible" width="450px">
      <el-row>
        <el-col :span="6" class="TextAlignL">
          <span>指派类型：</span>
        </el-col>
         <el-col :span="17" :offset="1">
          <el-radio-group v-model="appointType" style="float: left">
            <el-radio :label="0">承运商</el-radio>
            <el-radio :label="1">个体司机</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row class="MarginTB_20">
        <el-col :span="6" class="TextAlignL">
          <span>承运商 / 司机手机号：</span>
        </el-col>
         <el-col :span="17" :offset="1">
          <el-input v-model="appointPhone" placeholder="请输入指派的司机/承运商手机号" clearable></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="getSJByPhone">指定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
export default {
  name: 'AddOrder',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确!'))
      } else {
        callback()
      }
    }
    var validateFee = (rule, value, callback) => {
      if (value > this.formAdd.max_price) {
        callback(new Error('超出了最高限价！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      ifLoading: false,
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
      cityDistance: 0,
      unitPrice: 0,
      totalSum: 0,
      appointType: 0, // 指派类型 0承运商 1个体司机
      appointName: '',
      appointPhone: '', // 13734567890
      formAdd2: {
        appointId: '', // 指派司机id
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        id: '',
        fstatus: '0',
        fcheck: '0',
        fmainId: '', // 主账号code
        fsubId: '', // 子账号code
        fhName: '',
        fhTelephone: '',
        fh: '', // 发货地id
        fhAddress: '',
        shName: '',
        shTelephone: '',
        sh: '', // 收货地id
        shArea: '',
        shAddress: '',
        carType: '',
        zhTime: '',
        goodsName: '',
        orderGoodsList: [],
        isFapiao: 0, // 0-不要 1-要
        payType: 0 // 0-支付宝 1-微信
      },
      formAdd: {
        appointId: '', // 指派司机id
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        id: '',
        fstatus: '0',
        fcheck: '0',
        fmainId: '', // 主账号code
        fsubId: '', // 子账号code
        fhName: '赵三',
        fhTelephone: '18234567890',
        fh: '', // 发货地id
        fhAddress: '南通',
        shName: '李四',
        shTelephone: '18234567898',
        sh: '', // 收货地id
        shArea: '上海',
        shAddress: '上海',
        carType: '',
        zhTime: '',
        goodsName: '',
        orderGoodsList: [
          {
            goodsName: '上装',
            goodsSpace: 11,
            goodsWeight: 12,
            id: '',
            orderId: ''
          },
          {
            goodsName: '下装',
            goodsSpace: 21,
            goodsWeight: 22,
            id: '',
            orderId: ''
          }
        ],
        isFapiao: 0, // 0-不要 1-要
        payType: 0, // 0-支付宝 1-微信
        ffee: '',
        max_price: 0
      },
      AddRules: {
        fhName: [
          { required: true, message: '请输入发货人!', trigger: 'blur' }
        ],
        fhTelephone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        fhAddress: [
          { required: true, message: '请输入发货人地址!', trigger: 'blur' }
        ],
        shName: [
          { required: true, message: '请输入收货人!', trigger: 'blur' }
        ],
        shTelephone: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        shArea: [
          { required: true, message: '请输入收货地!', trigger: 'blur' }
        ],
        shAddress: [
          { required: true, message: '请输入收货人地址!', trigger: 'blur' }
        ],
        carType: [
          { required: true, message: '请选择车型!', trigger: 'blur' }
        ],
        zhTime: [
          { required: true, message: '请选择装货日期!', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入货物名称!', trigger: 'blur' }
        ],
        goodsSpace: [
          { required: true, message: '请输入货物面积!', trigger: 'blur' }
        ],
        goodsWeight: [
          { required: true, message: '请输入货物数量!', trigger: 'blur' }
        ],
        isFapiao: [
          { required: true, message: '请选择是否需要开具发票!', trigger: 'blur' }
        ],
        ffee: [
          { required: true, validator: validateFee, trigger: 'blur' }
        ],
        fprovince: [
          { required: true, message: '请选择发货地所属省份!', trigger: 'change' }
        ],
        fcity: [
          { required: true, message: '请选择发货地所属市!', trigger: 'change' }
        ],
        farea: [
          { required: true, message: '请选择发货地所属区!', trigger: 'change' }
        ],
        sprovince: [
          { required: true, message: '请选择收货地所属省份!', trigger: 'change' }
        ],
        scity: [
          { required: true, message: '请选择收货地所属市!', trigger: 'change' }
        ],
        sarea: [
          { required: true, message: '请选择收货地所属区!', trigger: 'change' }
        ]
      },
      carTypeList: [],
      // carTypeId: '',
      goodsTypeList: [],
      // goodsTypeId: '',
      pickerOptionsStart: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode
    }),
    totalWeight: function () {
      let sum = 0
      this.formAdd.orderGoodsList.map(item => {
        sum += Number(item.goodsWeight)
      })
      return sum
    }
  },
  watch: {
    cityDistance: function (value) {
      this.totalSum = (value * this.totalWeight / 1000 * this.unitPrice).toFixed(2)
    },
    totalWeight: function (value) {
      this.totalSum = (this.cityDistance * value / 1000 * this.unitPrice).toFixed(2)
    },
    unitPrice: function (value) {
      this.totalSum = (this.cityDistance * this.totalWeight / 1000 * value).toFixed(2)
    }
  },
  created () {
    this.getProvince()
    this.getCarType()
    this.getGoodsType()
  },
  components: {
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    addOneLine () {
      let tempGoods = {
        goodsName: '',
        goodsSpace: '',
        goodsWeight: '',
        id: '',
        orderId: ''
      }
      this.formAdd.orderGoodsList.push(tempGoods)
    },
    deleteOneLine (idx) {
      this.formAdd.orderGoodsList.splice(idx, 1)
    },
    changeCarType (typeId) {
      this.carTypeList.map(item => {
        if (item.id === typeId) {
          this.unitPrice = item.fprice
          if (this.formAdd.goodsName !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    changeGoodsType (typeId) {
      this.goodsTypeList.map(item => {
        if (item.id === typeId) {
          if (this.formAdd.carType !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    getMaxFee () {
      send({
        name: '/zFareRuleController/getMaxPrice?goods_type=' + this.formAdd.goodsName + '&cartype=' + this.formAdd.carType + '&fkm=' + parseInt(this.cityDistance),
        method: 'GET',
        data: ''
      }).then(res => {
        if (res.data.code === 1) {
          this.formAdd.max_price = res.data.max_price
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
    chooseSJ () {
      this.dialogVisible = true
    },
    getSJByPhone () {
      send({
        name: '/zRegisterController/appointDriver?fmobile=' + this.appointPhone + '&ftype=' + this.appointType,
        method: 'GET',
        data: ''
      }).then(res => {
        if (res.data.code === 1) {
          this.formAdd.appointId = res.data.user.id
          this.appointName = res.data.user.fname
          this.dialogVisible = false
        } else {
          this.$message({
            message: '该司机或承运商不存在，请检查所选的类型和手机号是否匹配！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    onSubmit (formName) {
      if (this.formAdd.orderGoodsList.length === 0) {
        this.$message({
          message: '请至少添加一行货物信息！',
          type: 'warning'
        })
        return false
      }
      if (this.userRole === '1' || this.userRole === '2') {
        this.formAdd.fmainId = this.userCode
      }
      if (this.userRole === '4' || this.userRole === '5') {
        this.formAdd.fsubId = this.userCode
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.sureAdd()
        } else {
          this.$message({
            message: '请将信息填写完整！',
            type: 'warning'
          })
          return false
        }
      })
    },
    sureAdd () {
      let DATA = {
        appointId: this.formAdd.appointId,
        isAppoint: this.formAdd.appointId === '' ? 0 : 1,
        fmaxFee: this.formAdd.max_price,
        ffee: this.formAdd.ffee,
        fweight: this.totalWeight,
        id: this.formAdd.id,
        fstatus: this.formAdd.fstatus,
        fcheck: this.formAdd.fcheck,
        fmainId: this.formAdd.fmainId,
        fsubId: this.formAdd.fsubId,
        fhName: this.formAdd.fhName,
        fhTelephone: this.formAdd.fhTelephone,
        fh: this.formAdd.farea,
        fhAddress: this.formAdd.fhAddress,
        shName: this.formAdd.shName,
        shTelephone: this.formAdd.shTelephone,
        sh: this.formAdd.sarea,
        shArea: '', // this.formAdd.shArea,
        shAddress: this.formAdd.shAddress,
        carType: this.formAdd.carType,
        zhTime: this.formAdd.zhTime,
        goodsName: this.formAdd.goodsName,
        orderGoodsList: this.formAdd.orderGoodsList,
        isFapiao: this.formAdd.isFapiao
      }
      console.log(DATA)
      this.ifLoading = true
      send({
        name: '/orderController',
        method: 'POST',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '订单新增成功！',
            type: 'success'
          })
          this.clearDataABack()
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
    clearDataABack () {
      // clear data
      this.formAdd = {
        id: '',
        fstatus: '0',
        fcheck: '0',
        fmainId: '',
        fsubId: '',
        fhName: '',
        fhTelephone: '',
        fh: '',
        fhAddress: '',
        shName: '',
        shTelephone: '',
        sh: '',
        shArea: '',
        shAddress: '',
        carType: '',
        zhTime: '',
        goodsName: '',
        orderGoodsList: [
          {
            goodsName: '',
            goodsSpace: '',
            goodsWeight: '',
            id: '',
            orderId: ''
          }
        ],
        isFapiao: 0
      }
      // tolist
      this.changeSiderIdx('1-1')
    },
    changeFprovince (id) {
      console.log(id)
      this.getCity(id, 'fcityList')
      this.formAdd.fcity = ''
      this.formAdd.farea = ''
    },
    changeFcity (id) {
      console.log(id)
      this.getArea(id, 'fareaList')
      this.formAdd.farea = ''
    },
    changeFarea (id) {
      console.log(id)
      if (this.formAdd.scity !== '') {
        this.getDistance()
      }
    },
    changeSprovince (id) {
      this.getCity(id, 'scityList')
      this.formAdd.scity = ''
      this.formAdd.sarea = ''
    },
    changeScity (id) {
      this.getArea(id, 'sareaList')
      this.formAdd.sarea = ''
    },
    changeSarea (id) {
      console.log(id)
      if (this.formAdd.fcity !== '') {
        this.getDistance()
      }
    },
    getProvince () {
      send({
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
    getCity (id, property) {
      send({
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
    getArea (id, property) {
      send({
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
    getCarType () {
      send({
        name: '/zCarTypeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.carTypeList = res.data.data
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    getGoodsType () {
      send({
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
    getDistance () {
      send({
        name: '/orderController/cityDistance?fh=' + this.formAdd.farea + '&sh=' + this.formAdd.sarea,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.cityDistance = res.data.cityDistance
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
.AddOrder{
  margin: 20px 20px 60px 20px;
}
</style>
