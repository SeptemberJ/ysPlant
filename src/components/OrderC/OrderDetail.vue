<template>
  <div class="OrderDetail">
    <el-row>
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
                  <el-input v-model="formAdd.fhName" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item prop="fhTelephone" label="手机号">
                  <el-input v-model="formAdd.fhTelephone" clearable disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="0">
                <el-form-item prop="fprovince" label="发货省">
                  <el-select v-model="formAdd.fprovince" placeholder="请选择"  @change="changeFprovince" disabled>
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
                  <el-select v-model="formAdd.fcity" placeholder="请选择" @change="changeFcity" disabled>
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
                  <el-select v-model="formAdd.farea" placeholder="请选择" @change="changeFarea" disabled>
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
              <el-input v-model="formAdd.fhAddress" clearable disabled></el-input>
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
                  <el-input v-model="formAdd.shName" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset="1">
                <el-form-item prop="shTelephone" label="手机号">
                  <el-input v-model="formAdd.shTelephone" clearable disabled></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="7" :offset="0">
                <el-form-item prop="sprovince" label="收货省">
                  <el-select v-model="formAdd.sprovince" placeholder="请选择" @change="changeSprovince" disabled>
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
                  <el-select v-model="formAdd.scity" placeholder="请选择" @change="changeScity" disabled>
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
                  <el-select v-model="formAdd.sarea" placeholder="请选择" @change="changeSarea" disabled>
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
              <el-input v-model="formAdd.shAddress" clearable disabled></el-input>
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
                  <el-input v-model="Goods.goodsName" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item :prop="'orderGoodsList.' + idx + '.goodsSpace'" :rules="AddRules.goodsSpace" type="number" label="货物面积(㎡)">
                  <el-input v-model="Goods.goodsSpace" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" :offset="1">
                <el-form-item :prop="'orderGoodsList.' + idx + '.goodsWeight'" :rules="AddRules.goodsWeight" type="number" label="货物数量(kg)">
                  <el-input v-model="Goods.goodsWeight" clearable disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="2" :offset="0">
                <el-button icon="el-icon-delete" style="border: 0px;" @click="deleteOneLine(idx)" disabled></el-button>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <!-- other -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>其它信息</span>
          </div>
          <div>
            <!-- goods -->
            <el-form-item prop="goodsName" label="货物类型">
              <el-select v-model="formAdd.goodsName" placeholder="请选择" style="width: 100%" disabled>
                <el-option
                  v-for="(goodsType, idx) in goodsTypeList"
                  :key="idx"
                  :label="goodsType.name"
                  :value="goodsType.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- car -->
            <el-form-item prop="carType" label="车型">
              <el-select v-model="formAdd.carType" placeholder="请选择" style="width: 100%" disabled>
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
              <el-date-picker type="date" :picker-options="pickerOptionsStart" placeholder="选择装货日期" v-model="formAdd.zhTime" disabled style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item prop="appointId" label="指派人员" class="TextAlignL">
              <span class="MarginR_10" v-if="appointName">{{appointName}}</span>
            </el-form-item>
            <el-form-item label="开具发票" prop="isFapiao">
              <el-radio-group v-model="formAdd.isFapiao" disabled style="float: left">
                <el-radio label="0" border>不需要</el-radio>
                <el-radio label="1" border>需要</el-radio>
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
        <!-- cost -->
        <el-card class="box-card MarginTB_20">
          <div slot="header" class="clearfix TextAlignL">
            <span>费用</span>
          </div>
          <div class="TextAlignL">
            <el-form-item prop="oilCard" label="是否使用油卡">
              <span style="color: red;width: 200px;">(油卡部分的金额无法开票)</span>
              <el-input v-model="formAdd.oilCard" clearable disabled v-if="formAdd.ifUseOilCard == 1" style="width: 200px;float:right;margin-left:20px;">
                <template slot="append">¥</template>
              </el-input>
              <el-radio-group v-model="formAdd.ifUseOilCard" style="float: right">
                <el-radio :label="0" border disabled>不使用</el-radio>
                <el-radio :label="1" border disabled>使用</el-radio>
              </el-radio-group>
            </el-form-item>
            <h4 class="ColorWarn"><span style="display:inline-block;width:50%">{{formAdd.fstatus == 0 ? '货主报价' : '确认报价'}}：</span><span style="display:inline-block;width:50%;text-align:right">{{formAdd.ffee}} ¥</span></h4>
            <!-- 原本计算的合计
            <p style="font-size: 12px;color: #909399;text-align:right">{{cityDistance}} (路程/km) * {{totalWeight/1000}} (重量/t) * {{unitPrice}} (单价/¥) = {{totalSum}} ¥</p> -->
          </div>
        </el-card>
        <!-- 回单 -->
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
          </div>
        </el-card>
        <!-- bt -->
        <el-row>
          <el-col :span="12" class="TextAlignC">
            <el-button type="primary" :loading="ifLoading" @click="showDialog" :disabled="hasOffered">{{hasOffered ? '已报价' : '报价'}}</el-button>
          </el-col>
          <el-col :span="12" class="TextAlignC">
            <el-button @click="backOrderList" style="width: 100px;">返回</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-dialog title="派单" :visible.sync="dialogFormVisible" width="550px">
      <el-row>
        <el-col :span="4">
          <span style="line-height: 35px;">报价金额：</span>
        </el-col>
        <el-col :span="20" class="TextAlignL">
          <el-input v-model='offer' placeholder='请输入您的报价金额' clearable></el-input>
        </el-col>
        <!-- 原本显示最高限价
        <el-col :span="8">
          <span style="line-height: 35px;color:red">（最高限价{{maxFee}}）</span>
        </el-col> -->
      </el-row>
      <el-row class="MarginT_10">
        <el-col :span="4">
          <span style="line-height: 35px;">选择司机：</span>
        </el-col>
        <el-col :span="20" class="TextAlignL">
          <el-select v-model="choosedLogistic" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in LogisticsList"
              :key="item.id"
              :label="item.fname"
              :value="item.id">
              <span style="float: left">{{ item.fname }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.company_name }} <span class="PaddingL_10">{{item.fmobile}}</span></span>
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row class="MarginT_10">
        <el-col :span="4">
          <span style="line-height: 35px;">备注：</span>
        </el-col>
        <el-col :span="20" class="TextAlignL">
          <el-input type="textarea" v-model='offerNote' placeholder='备注信息......'></el-input>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureOperation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
export default {
  name: 'AddOrder',
  props: ['searchType'],
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
    return {
      dialogFormVisible: false,
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
      appointName: '',
      // fprovinceName: '',
      // sprovinceName: '',
      // fcityName: '',
      // scityName: '',
      // fareaName: '',
      // sareaName: '',
      hasOffered: false, // 是否报过价
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
        isFapiao: '0', // 0-不要 1-要
        isBox: '', // 0-要 1-不要
        ifUseOilCard: 0, // 0 不使用 1 使用
        oilCard: 0, // 油卡金额
        boxNo: '',
        floadpics: '', // 装车照片
        floadtime: '', // 装车时间
        frecepics: '', // 回单照片
        frecetime: '', // 回单时间
        frece: '' // 回单确认
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
        isBox: [
          { required: true, message: '请选择是否需接受拼箱!', trigger: 'blur' }
        ],
        fprovince: [
          { required: true, message: '请选择所属省份!', trigger: 'change' }
        ],
        fcity: [
          { required: true, message: '请选择所属市!', trigger: 'change' }
        ],
        farea: [
          { required: true, message: '请选择所属区!', trigger: 'change' }
        ],
        sprovince: [
          { required: true, message: '请选择所属省份!', trigger: 'change' }
        ],
        scity: [
          { required: true, message: '请选择所属市!', trigger: 'change' }
        ],
        sarea: [
          { required: true, message: '请选择所属区!', trigger: 'change' }
        ]
      },
      maxFee: '',
      offer: '', // 输入的报价
      offerNote: '', // 报价备注
      carTypeList: [],
      goodsTypeList: [],
      LogisticsList: [],
      choosedLogistic: '',
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
      userId: state => state.userId,
      userCode: state => state.userCode,
      searchOrderId: state => state.searchOrderId,
      ImgURL_PREFIX: state => state.ImgURL_PREFIX
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
  components: {
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    // 返回订单列表页
    backOrderList () {
      this.$emit('toggleOrderDetail', this.searchType)
    },
    // 获取订单详情
    getOrderDetail () {
      send({
        // name: '/orderController/' + this.searchOrderId,
        name: '/orderController/orderDetail?id=' + this.searchOrderId + '&register_id=' + this.userId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          let Info = res.data.data
          let temp = Info
          temp.ffee = Info.ffee
          temp.ifUseOilCard = (temp.foilCard === 0 ? 0 : 1) // 0 不使用 1 使用
          temp.oilCard = Info.foilCard
          temp.fprovince = Info.origin_province_id
          temp.fcity = Info.origin_city_id
          temp.farea = Info.origin_area_id
          temp.sprovince = Info.destination_province_id
          temp.scity = Info.destination_city_id
          temp.sarea = Info.destination_area_id
          temp.zhTime = Info.zhTime // new Date(Info.zh_time.time)
          temp.orderGoodsList = Info.orderGoodsList // Info.ordergoods
          temp.carType = Info.carType
          temp.fmainId = Info.fmainId
          temp.fsubId = Info.fsubId
          temp.goodsName = Info.goodsName
          temp.fhName = Info.fhName
          temp.fhTelephone = Info.fhTelephone
          temp.fhAddress = Info.fhAddress
          temp.shAddress = Info.shAddress
          temp.shArea = Info.shArea
          temp.shName = Info.shName
          temp.shTelephone = Info.shTelephone
          temp.isFapiao = Info.isFapiao
          temp.isBox = Info.isBox
          temp.boxNo = Info.boxNo
          temp.floadpics = Info.floadpics ? (this.ImgURL_PREFIX + Info.floadpics) : null
          temp.floadtime = Info.floadtime
          temp.frecepics = Info.frecepics ? (this.ImgURL_PREFIX + Info.frecepics) : null
          temp.frecetime = Info.frecetime
          temp.frece = Info.frece
          this.appointName = Info.appointId ? Info.appointId : '未指定'
          this.formAdd = temp
          this.maxFee = Info.fmax_fee
          this.hasOffered = res.data.size === 1
          // 省市区
          this.getProvince()
          this.changeFprovince(temp.fprovince, 1)
          this.changeSprovince(temp.sprovince, 1)
          this.changeFcity(temp.fcity, 1)
          this.changeScity(temp.scity, 1)
          // 价格
          this.getDistanceDefault(temp.farea, temp.sarea)
          // 车型
          this.getCarType(Info.car_type)
          this.getGoodsType()
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
    // 获取初始发货地与收货地的距离
    getDistanceDefault (fh, sh) {
      send({
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
    // 改变发货地省
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
    // 改变收货地省
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
      send({
        name: '/registerDriverController/regionSelect?pid=1',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.fprovinceList = res.data.data
          this.sprovinceList = res.data.data
          // res.data.data.find(item => {
          //   if (item.id === this.formAdd.fprovince) {
          //     this.fprovinceName = item.name
          //   }
          //   if (item.id === this.formAdd.sprovince) {
          //     this.sprovinceName = item.name
          //   }
          // })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取市下拉
    getCity (id, property) {
      send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
          // res.data.data.find(item => {
          //   if (item.id === this.formAdd.fcity) {
          //     this.fcityName = item.name
          //   }
          //   if (item.id === this.formAdd.scity) {
          //     this.scityName = item.name
          //   }
          // })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取区下拉
    getArea (id, property) {
      send({
        name: '/registerDriverController/regionSelect?pid=' + id,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this[property] = res.data.data
          // res.data.data.find(item => {
          //   if (item.id === this.formAdd.farea) {
          //     this.fareaName = item.name
          //   }
          //   if (item.id === this.formAdd.sarea) {
          //     this.sareaName = item.name
          //   }
          // })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取车型下拉
    getCarType (carType) {
      send({
        name: '/zCarTypeController/list',
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          let carList = res.data.data
          this.carTypeList = carList
          carList.map(item => {
            if (item.typeValue === carType) {
              this.unitPrice = item.fprice
            }
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取货物类型下拉
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
    // 获取最高限价
    getMaxFee () {
      send({
        name: '/zFareRuleController/getMaxPrice?goods_type=' + this.formAdd.goodsName + '&cartype=' + this.formAdd.carType + '&fkm=622',
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
    // 获取发货地与收货地的距离
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
    },
    showDialog () {
      this.dialogFormVisible = true
      this.getDriverList()
    },
    sureOperation () {
      this.sureOffer()
      // if (this.hasOffered) {
      //   this.changeOffer()
      // } else {
      //   this.sureOffer()
      // }
    },
    // 报价
    sureOffer () {
      if (this.maxFee < this.offer) {
        this.$message({
          message: '报价超过了最高限价！',
          type: 'error'
        })
        return false
      }
      let DATA = {
        registerId: this.userId,
        driverId: this.choosedLogistic,
        orderId: this.searchOrderId,
        orderStatus: '5',
        ffee: this.offer,
        fnote: this.offerNote,
        createDate: new Date()
      }
      console.log(DATA)
      send({
        name: '/driverOrderController',
        method: 'POST',
        data: DATA
      }).then(res => {
        if (res.data.respCode === '0') {
          this.$message({
            message: '报价成功！',
            type: 'success'
          })
          this.backOrderList()
          this.dialogFormVisible = false
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
    // 修改报价
    changeOffer () {
      send({
        name: '/driverOrderController/modifyDriverOrderFfee?id=' + this.searchOrderId + '&ffee=' + this.offer,
        method: 'GET',
        data: {
        }
      }).then(res => {
        this.$message({
          message: '修改报价成功！',
          type: 'success'
        })
        this.backOrderList()
        this.dialogFormVisible = false
        // if (res.data.code === 1) {
        //   this.LogisticsList = res.data.driverList
        // } else {
        //   this.$message({
        //     message: res.data.message + '！',
        //     type: 'error'
        //   })
        // }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 获取司机下拉
    getDriverList () {
      send({
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
    }
  }
}
</script>

<style lang="less" scoped>
.OrderDetail{
  span{
    width: 100%;
    display:  inline-block;
    text-align: left;
  }
}
</style>
