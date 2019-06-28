<template>
  <div class="OrderDetail">
    <el-row>
      <el-form ref="formAdd" :model="formAdd" :rules="AddRules" label-width="110px" label-position="left">
        <!-- 发货人信息 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix TextAlignL">
            <span>发货人信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="fhName" label="发货人">
                  <el-input v-model="formAdd.fhName" clearable placeholder="请输入发货人姓名" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item prop="fhTelephone" label="手机号">
                  <el-input v-model="formAdd.fhTelephone" clearable placeholder="请输入发货人手机" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="0">
                <el-form-item prop="fprovince" label="发货省">
                  <el-select v-model="formAdd.fprovince" placeholder="请选择" @change="changeFprovince" :disabled="formAdd.fstatus != 0">
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
                  <el-select v-model="formAdd.fcity" placeholder="请选择" @change="changeFcity" :disabled="formAdd.fstatus != 0">
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
                  <el-select v-model="formAdd.farea" placeholder="请选择" @change="changeFarea" :disabled="formAdd.fstatus != 0">
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
              <el-input v-model="formAdd.fhAddress" clearable placeholder="请输入发货地街道信息" :disabled="formAdd.fstatus != 0"></el-input>
            </el-form-item>
          </div>
        </el-card>
        <!-- 收货人信息 -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>收货人信息</span>
          </div>
          <div>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="shName" label="收货人">
                  <el-input v-model="formAdd.shName" clearable placeholder="请输入收货人姓名" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item prop="shTelephone" label="手机号">
                  <el-input v-model="formAdd.shTelephone" clearable placeholder="请输入收货人手机" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="0">
                <el-form-item prop="sprovince" label="收货省">
                  <el-select v-model="formAdd.sprovince" placeholder="请选择" @change="changeSprovince" :disabled="formAdd.fstatus != 0">
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
                  <el-select v-model="formAdd.scity" placeholder="请选择" @change="changeScity" :disabled="formAdd.fstatus != 0">
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
                  <el-select v-model="formAdd.sarea" placeholder="请选择" @change="changeSarea" :disabled="formAdd.fstatus != 0">
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
              <el-input v-model="formAdd.shAddress" clearable placeholder="请输入收货地街道信息" :disabled="formAdd.fstatus != 0"></el-input>
            </el-form-item>
          </div>
        </el-card>
        <!-- 货物信息 -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>货物信息</span>
          </div>
          <div>
            <p v-if="formAdd.orderGoodsList.length == 0" class="ColorWarn MarginTB_20">请添加货物信息</p>
            <el-row v-for="(Goods, idx) in formAdd.orderGoodsList" :key="idx">
              <el-col :span="8">
                <el-form-item :prop="'orderGoodsList.' + idx + '.goodsName'" :rules="AddRules.goodsName" label="货物名称">
                  <el-input v-model="Goods.goodsName" clearable placeholder="" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item :prop="'orderGoodsList.' + idx + '.goodsSpace'" :rules="AddRules.goodsSpace" type="number" label="货物面积(㎡)">
                  <el-input v-model="Goods.goodsSpace" clearable placeholder="" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item :prop="'orderGoodsList.' + idx + '.goodsWeight'" :rules="AddRules.goodsWeight" type="number" label="货物数量(kg)">
                  <el-input v-model="Goods.goodsWeight" clearable placeholder="" :disabled="formAdd.fstatus != 0"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="0">
                <el-button icon="el-icon-delete" style="border: 0px;" @click="deleteOneLine(idx)" :disabled="formAdd.fstatus != 0"></el-button>
              </el-col>
            </el-row>
            <el-button icon="el-icon-plus" class="MarginT_20" style="width: 100%;border:1px dashed #dcdfe6" @click="addOneLine" :disabled="formAdd.fstatus != 0">添加</el-button>
          </div>
        </el-card>
        <!-- 其它信息 -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>其它信息</span>
          </div>
          <div>
            <el-form-item prop="goodsName" label="货物类型">
              <el-select v-model="formAdd.goodsName" placeholder="请选择" style="width: 100%;" @change="changeGoodsType" :disabled="formAdd.fstatus != 0">
                <el-option
                  v-for="(goodsType, idx) in goodsTypeList"
                  :key="idx"
                  :label="goodsType.name"
                  :value="goodsType.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="carType" label="车型">
              <el-select v-model="formAdd.carType" placeholder="请选择" style="width: 100%" @change="changeCarType" :disabled="formAdd.fstatus != 0">
                <el-option
                  v-for="(carType, idx) in carTypeList"
                  :key="idx"
                  :label="carType.typeName"
                  :value="carType.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="zhTime" label="装货日期">
              <el-date-picker type="date" :picker-options="pickerOptionsStart" placeholder="选择装货日期" v-model="formAdd.zhTime" style="width: 100%;" :disabled="formAdd.fstatus != 0"></el-date-picker>
            </el-form-item>
            <el-form-item prop="appointId" label="指派人员" class="TextAlignL">
              <span class="MarginR_10" v-if="appointName">{{appointName}}</span>
              <!-- <el-button type="text" size="small" @click="chooseSJ">去选择<i class="el-icon-d-arrow-right el-icon--right"></i></el-button> -->
            </el-form-item>
            <!-- <el-form-item label="开具发票" prop="isFapiao">
              <el-radio-group v-model="formAdd.isFapiao" style="float: left">
                <el-radio label="0" border :disabled="formAdd.fstatus != 0">不需要</el-radio>
                <el-radio label="1" border :disabled="formAdd.fstatus != 0">需要</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="结算方式" prop="payWay">
              <el-radio-group v-model="formAdd.payWay" style="float: left">
                <el-radio :label="0" border :disabled="formAdd.fstatus != 0">现结</el-radio>
                <el-radio :label="1" border :disabled="formAdd.fstatus != 0">月结</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="接受拼箱" prop="isBox">
              <el-radio-group v-model="formAdd.isBox" style="float: left">
                <el-radio label="1" border disabled>不接受</el-radio>
                <el-radio label="0" border disabled>接受</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </el-card>
        <!-- 费用 -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>费用</span>
          </div>
          <div class="TextAlignL">
            <!-- 支付方式
            <el-form-item label="支付方式" prop="isFapiao">
              <el-row class="TextAlignR">
                <el-col :span="1" :offset="18"><el-radio v-model="formAdd.payType" :label="0" disabled><span style="color:#fff">0</span></el-radio></el-col>
                <el-col :span="1"><img src="../../../static/images/icon/zfb.png" style="width: 35px;margin-top:5px;"></el-col>
                <el-col :span="1" :offset="2"><el-radio v-model="formAdd.payType" :label="1" disabled><span style="color:#fff">1</span></el-radio></el-col>
                <el-col :span="1"><img src="../../../static/images/icon/wx.png" style="width: 35px;margin-top:5px;"></el-col>
              </el-row>
            </el-form-item> -->
            <el-form-item prop="oilCard" label="是否使用油卡">
              <span style="color: red">(油卡部分的金额无法开票)</span>
              <el-input v-model="formAdd.oilCard" clearable v-if="formAdd.ifUseOilCard == 1" style="width: 200px;float:right;margin-left:20px;">
                <template slot="append">¥</template>
              </el-input>
              <el-radio-group v-model="formAdd.ifUseOilCard" style="float: right">
                <el-radio :label="0" border :disabled="formAdd.fstatus != 0">不使用</el-radio>
                <el-radio :label="1" border :disabled="formAdd.fstatus != 0">使用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item prop="ffee" :label="formAdd.fstatus == 0 ? '报价' : '确认报价'">
              <el-input v-model="formAdd.ffee" clearable placeholder="请输入您的报价" :disabled="formAdd.fstatus != 0">
                <template slot="append">¥</template>
              </el-input>
            </el-form-item>
            <!-- 原本显示最高限价
            <el-form-item label="">
              <span style="float:right;margin-left: 10px;color: red">（最高限价 {{formAdd.fmaxFee}}¥）</span>
            </el-form-item> -->
           <!-- 原本按距离计算合计
           <h4 class="ColorWarn"><span style="display:inline-block;width:50%">合计：</span><span style="display:inline-block;width:50%;text-align:right">{{totalSum}} ¥</span></h4>
            <p style="font-size: 12px;color: #909399;text-align:right">{{cityDistance}} (路程/km) * {{totalWeight/1000}} (重量/t) * {{unitPrice}} (单价/¥) = {{totalSum}} ¥</p> -->
          </div>
        </el-card>
        <!-- 回单信息 -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>回单信息</span>
          </div>
          <div class="TextAlignL">
            <el-form-item prop="floadpics" label="装车照片">
              <img v-if="formAdd.floadpics" :src="formAdd.floadpics" style="height:250px;">
            </el-form-item>
            <el-form-item prop="floadtime" label="装车时间">
              <el-date-picker type="date"  v-model="formAdd.floadtime" style="width: 100%;" disabled></el-date-picker>
            </el-form-item>
            <el-form-item prop="frecepics" label="回单照片">
              <img v-if="formAdd.frecepics" :src="formAdd.frecepics" style="height:250px;">
            </el-form-item>
            <el-form-item prop="frecetime" label="回单时间">
              <el-date-picker type="date"  v-model="formAdd.frecetime" style="width: 100%;" disabled></el-date-picker>
            </el-form-item>
            <el-form-item prop="frecetime" label="回单确认">
              <el-button type="primary" v-if="formAdd.frece == 1" disabled>已确认</el-button>
              <el-button type="primary" v-else :disabled="!formAdd.frecepics" @click="huidanConfirm">确认</el-button>
            </el-form-item>
          </div>
        </el-card>
        <!-- operation bt -->
        <el-row>
          <el-col :span="12" class="TextAlignC" >
            <el-button type="primary" :loading="ifLoading" @click="onSubmit('formAdd')" v-if="formAdd.fstatus == 0">保存修改</el-button>
            <el-button type="primary" :loading="ifLoading" @click="payment" v-if="formAdd.frece == 1 && formAdd.fstatus != 7">确认支付</el-button>
            <el-button type="primary" :loading="ifLoading" disabled v-if="formAdd.fstatus == 7">已结单</el-button>
          </el-col>
          <el-col :span="12" class="TextAlignC" style="float:right;">
            <el-button @click="backOrderList" style="width: 100px;">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddOrder',
  data () {
    var validatePhone = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请输入手机号！'))
      } else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('手机号格式不正确！'))
      } else {
        callback()
      }
    }
    var validateFee = (rule, value, callback) => {
      if (value > this.formAdd.max_price) {
        callback(new Error('超出了最高限价！'))
      } else if (value === '' || value === 0) {
        callback(new Error('请输入报价！'))
      } else {
        callback()
      }
    }
    return {
      ifLoading: false,
      order_no: '', // 订单号
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
      // unitPrice: 0,
      // totalSum: 0,
      appointName: '',
      formAdd: {
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        id: '',
        fstatus: '',
        fcheck: '',
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
        goodsTypeList: [],
        payWay: 0, // 0_现结 1_月结
        isFapiao: '0', // 0_不要 1_要
        isBox: '', // 0-要 1-不要
        boxNo: '',
        payType: '0', // 0_支付宝 1_微信
        max_price: 0,
        ifUseOilCard: 0, // 0_不使用 1_使用
        oilCard: 0, // 油卡金额
        fmaxFee: 0,
        floadpics: '', // 装车照片
        floadtime: '', // 装车时间
        frecepics: '', // 回单照片
        frecetime: '', // 回单时间
        frece: '' // 回单确认
      },
      AddRules: {
        fhName: [
          { required: true, message: '请输入发货人！', trigger: 'change' }
        ],
        fhTelephone: [
          { required: true, validator: validatePhone, trigger: 'change' }
        ],
        fhAddress: [
          { required: true, message: '请输入发货人地址！', trigger: 'change' }
        ],
        shName: [
          { required: true, message: '请输入收货人！', trigger: 'change' }
        ],
        shTelephone: [
          { required: true, validator: validatePhone, trigger: 'change' }
        ],
        shArea: [
          { required: true, message: '请输入收货地！', trigger: 'change' }
        ],
        shAddress: [
          { required: true, message: '请输入收货人地址！', trigger: 'change' }
        ],
        carType: [
          { required: true, message: '请选择车型！', trigger: 'change' }
        ],
        zhTime: [
          { required: true, message: '请选择装货日期！', trigger: 'change' }
        ],
        goodsName: [
          { required: true, message: '请输入货物名称！', trigger: 'change' }
        ],
        goodsSpace: [
          { required: true, message: '请输入货物面积！', trigger: 'change' }
        ],
        goodsWeight: [
          { required: true, message: '请输入货物数量！', trigger: 'change' }
        ],
        payWay: [
          { required: true, message: '请选择结算方式！', trigger: 'change' }
        ],
        // isFapiao: [
        //   { required: true, message: '请选择是否需要开具发票!', trigger: 'change' }
        // ],
        isBox: [
          { required: true, message: '请选择是否需接受拼箱！', trigger: 'change' }
        ],
        ffee: [
          { required: true, validator: validateFee, trigger: 'change' }
        ],
        fprovince: [
          { required: true, message: '请选择所属省份！', trigger: 'change' }
        ],
        fcity: [
          { required: true, message: '请选择所属市！', trigger: 'change' }
        ],
        farea: [
          { required: true, message: '请选择所属区！', trigger: 'change' }
        ],
        sprovince: [
          { required: true, message: '请选择所属省份！', trigger: 'change' }
        ],
        scity: [
          { required: true, message: '请选择所属市！', trigger: 'change' }
        ],
        sarea: [
          { required: true, message: '请选择所属区！', trigger: 'change' }
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
      userRole: state => state.userRole,
      checkStatus: state => state.checkStatus,
      userCode: state => state.userCode,
      userId: state => state.userId,
      searchOrderId: state => state.searchOrderId,
      ImgURL_PREFIX: state => state.ImgURL_PREFIX,
      carTypeList: state => state.carTypeList,
      goodsTypeList: state => state.goodsTypeList
    }),
    totalWeight: function () {
      let sum = 0
      this.formAdd.orderGoodsList.map(item => {
        sum += Number(item.goodsWeight)
      })
      return sum
    }
  },
  created () {
    this.getOrderDetail()
  },
  watch: {
    // cityDistance: function (value) {
    //   this.totalSum = (value * this.totalWeight / 1000 * this.unitPrice).toFixed(2)
    // },
    // totalWeight: function (value) {
    //   this.totalSum = (this.cityDistance * value / 1000 * this.unitPrice).toFixed(2)
    // },
    // unitPrice: function (value) {
    //   this.totalSum = (this.cityDistance * this.totalWeight / 1000 * value).toFixed(2)
    // },
    'formAdd.ifUseOilCard': function (value) {
      if (value === 0) {
        this.formAdd.oilCard = 0
      }
    }
  },
  components: {
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    // 添加一行货物信息
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
    // 删除一行货物信息
    deleteOneLine (idx) {
      this.formAdd.orderGoodsList.splice(idx, 1)
    },
    // 改变车型
    changeCarType (typeId) {
      this.carTypeList.map(item => {
        if (item.id === typeId) {
          // this.unitPrice = item.fprice
          if (this.formAdd.goodsName !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    // 改变货物类型
    changeGoodsType (typeId) {
      this.goodsTypeList.map(item => {
        if (item.id === typeId) {
          if (this.formAdd.carType !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    // 获取最高限价
    getMaxFee () {
      this.send({
        name: '/zFareRuleController/getMaxPrice?goods_type=' + this.formAdd.goodsName + '&cartype=' + this.formAdd.carType + '&fkm=622',
        method: 'GET',
        data: ''
      }).then(res => {
        if (res.data.respCode === '0') {
          this.formAdd.max_price = res.data.data
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
    // 订单新增提交
    onSubmit (formName) {
      if (this.checkStatus === '1') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        if (this.formAdd.orderGoodsList.length === 0) {
          this.$message({
            message: '请至少添加一行货物信息！',
            type: 'warning'
          })
          return false
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
      }
    },
    sureAdd () {
      let DATA = {
        fmaxFee: this.formAdd.fmaxFee,
        ffee: this.formAdd.ffee,
        foilCard: this.formAdd.oilCard,
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
        ftype: this.formAdd.payWay, // 0_现结 1_月结
        // isFapiao: this.formAdd.isFapiao,
        boxNo: this.formAdd.boxNo,
        isBox: this.formAdd.isBox
      }
      this.ifLoading = true
      this.send({
        name: '/orderController/' + this.searchOrderId,
        method: 'PUT',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '订单修改成功！',
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
    // 付款
    payment () {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        this.$confirm('确认支付该订单的金额?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.surePay()
        }).catch(() => {
        })
      }
    },
    surePay () {
      this.send({
        name: '/orderController/pay/' + this.searchOrderId,
        method: 'POST',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '支付成功！',
            type: 'success'
          })
          this.getOrderDetail()
        } else {
          this.$message({
            message: '支付失败！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
        this.$message({
          message: 'interface error！',
          type: 'error'
        })
      })
    },
    // surePay () {
    //   this.send({
    //     name: '/zPayAccountRegisterController',
    //     method: 'POST',
    //     data: {
    //       fmoney: this.formAdd.ffee,
    //       payType: 1,
    //       orderNo: this.order_no,
    //       orderId: this.searchOrderId,
    //       registerId: this.userId
    //     }
    //   }).then(res => {
    //     if (res.data.respCode === '0') {
    //       this.$message({
    //         message: '支付成功！',
    //         type: 'success'
    //       })
    //     }
    //   }).catch((res) => {
    //     console.log(res)
    //   })
    // },
    // 数据清空恢复初始化
    clearDataABack () {
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
        isFapiao: 0,
        ifUseOilCard: 0,
        oilCard: 0
      }
      // 返回列表
      this.changeSiderIdx('1-1')
    },
    // 返回订单列表页
    backOrderList () {
      this.$emit('toggleOrderDetail')
    },
    // 获取订单详情
    getOrderDetail () {
      this.send({
        name: '/orderController/' + this.searchOrderId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          let Info = res.data.data
          this.order_no = Info.order_no
          let temp = Info
          temp.fmaxFee = Info.fmax_fee
          temp.ffee = Info.ffee
          temp.ifUseOilCard = (temp.foil_card === 0 ? 0 : 1) // 0_不使用 1_使用
          temp.oilCard = Info.foil_card
          temp.fprovince = Info.origin_province_id
          temp.fcity = Info.origin_city_id
          temp.farea = Info.origin_area_id
          temp.sprovince = Info.destination_province_id
          temp.scity = Info.destination_city_id
          temp.sarea = Info.destination_area_id
          temp.zhTime = new Date(Info.zh_time.time)
          temp.orderGoodsList = Info.ordergoods
          temp.carType = Info.car_type
          temp.fmainId = Info.fmain_id
          temp.fsubId = Info.fsub_id
          temp.goodsName = Info.goods_name
          temp.fhName = Info.fh_name
          temp.fhTelephone = Info.fh_telephone
          temp.fhAddress = Info.fh_address
          temp.shAddress = Info.sh_address
          temp.shArea = Info.sh_area
          temp.shName = Info.sh_name
          temp.shTelephone = Info.sh_telephone
          temp.payWay = Info.ftype
          temp.isFapiao = Info.is_fapiao
          temp.isBox = Info.is_box
          temp.boxNo = Info.box_no
          temp.floadpics = Info.floadpics ? (this.ImgURL_PREFIX + Info.floadpics) : null
          temp.floadtime = Info.floadtime
          temp.frecepics = Info.frecepics ? (this.ImgURL_PREFIX + Info.frecepics) : null
          temp.frecetime = Info.frecetime
          temp.frece = Info.frece
          // temp.payType = Info.payType ? Info.payType : 0
          this.appointName = Info.appoint_name ? Info.appoint_name : '未指定'
          this.formAdd = temp
          // 省市区
          this.getProvince()
          this.changeFprovince(temp.fprovince, 1)
          this.changeSprovince(temp.sprovince, 1)
          this.changeFcity(temp.fcity, 1)
          this.changeScity(temp.scity, 1)
          // 价格
          this.getDistanceDefault(temp.farea, temp.sarea)
          // 车型单价
          // this.getCartUnitPrice(Info.car_type)
          // 查询最高限价
          this.getMaxFee()
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
    // 回单确认
    huidanConfirm () {
      if (this.checkStatus === '2') {
        this.$message({
          message: this.$store.state.prohibitTips,
          type: 'warning'
        })
      } else {
        this.send({
          name: '/orderController/huidan/' + this.searchOrderId,
          method: 'POST'
        }).then(res => {
          if (res.data.respCode === '0') {
            this.$message({
              message: '回单确认成功！',
              type: 'success'
            })
            this.getOrderDetail()
          } else {
            this.$message({
              message: res.data.message + '！',
              type: 'error'
            })
          }
        }).catch((res) => {
          console.log(res)
          this.$message({
            message: '回单确认失败！',
            type: 'error'
          })
        })
      }
    },
    // 获取初始发货地与收货地的距离
    getDistanceDefault (fh, sh) {
      this.send({
        name: '/orderController/cityDistance?fh=' + fh + '&sh=' + sh,
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
    },
    // 改变收货地省
    changeFprovince (id, type) {
      this.getCity(id, 'fcityList')
      if (type !== 1) {
        this.formAdd.fcity = ''
        this.formAdd.farea = ''
      }
    },
    // 改变发货地市
    changeFcity (id, type) {
      this.getArea(id, 'fareaList')
      if (type !== 1) {
        this.formAdd.farea = ''
      }
    },
    // 改变发货地区
    changeFarea (id) {
      if (this.formAdd.scity !== '') {
        this.getDistance()
      }
    },
    // 改变发货地省
    changeSprovince (id, type) {
      this.getCity(id, 'scityList')
      if (type !== 1) {
        this.formAdd.scity = ''
        this.formAdd.sarea = ''
      }
    },
    // 改变收货地市
    changeScity (id, type) {
      this.getArea(id, 'sareaList')
      if (type !== 1) {
        this.formAdd.sarea = ''
      }
    },
    // 改变收货地区
    changeSarea (id) {
      if (this.formAdd.fcity !== '') {
        this.getDistance()
      }
    },
    // 获取省下拉
    getProvince () {
      this.send({
        name: '/registerDriverController/regionSelect?pid=1',
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
    // 获取车型单价
    getCartUnitPrice (carTypeId) {
      this.unitPrice = this.carTypeList.find(carType => {
        if (carType.id === carTypeId) {
          return carType.fprice
        }
      })
    },
    // 获取发货地与收货地的距离
    getDistance () {
      this.send({
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

<style lang="less" scoped>
.OrderDetail{
}
</style>
