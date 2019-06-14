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
                <el-input v-model="formAdd.fhName" clearable placeholder="请输入发货人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="fhTelephone" label="发货人手机">
                <el-input v-model="formAdd.fhTelephone" clearable placeholder="请输入发货人手机"></el-input>
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
            <el-input v-model="formAdd.fhAddress" clearable placeholder="请输入发货地街道信息"></el-input>
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
                <el-input v-model="formAdd.shName" clearable placeholder="请输入收货人姓名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11" :offset="1">
              <el-form-item prop="shTelephone" label="收货人手机">
                <el-input v-model="formAdd.shTelephone" clearable placeholder="请输入收货人手机"></el-input>
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
          <el-form-item prop="shAddress" label="街道">
            <el-input v-model="formAdd.shAddress" clearable placeholder="请输入收货地街道信息"></el-input>
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
                <el-input v-model="Goods.goodsName" clearable placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsSpace'" :rules="AddRules.goodsSpace"  label="货物面积(㎡)">
                <el-input v-model="Goods.goodsSpace" clearable placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6" :offset="1">
              <el-form-item :prop="'orderGoodsList.' + idx + '.goodsWeight'" :rules="AddRules.goodsWeight"  label="货物数量(kg)">
                <el-input v-model="Goods.goodsWeight" clearable placeholder=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2" :offset="0">
              <el-button icon="el-icon-delete" style="border: 0px;" @click="deleteOneLine(idx)"></el-button>
            </el-col>
          </el-row>
          <el-button icon="el-icon-plus" class="MarginT_20" style="width: 100%;border:1px dashed #dcdfe6" @click="addOneLine">添加</el-button>
        </div>
      </el-card>
      <!-- other -->
      <el-card class="box-card MarginTB_20">
        <div slot="header" class="clearfix TextAlignL">
          <span>其它信息</span>
        </div>
        <div>
          <!-- goods type -->
          <el-form-item prop="goodsName" label="货物类型">
            <div class="TextAlignL">{{formAdd.goodsName == '4d2881f66850132a01685013f0100001' ? '普货' : (formAdd.goodsName == '4d2881f66850132a01685014c6e40007' ? '危险品' : (formAdd.goodsName == '2c90b4e368db5b460168db617b760000' ? '冷藏品' : '其他类型'))}}</div>
            <!-- 原本下拉选择货物类型
            <el-select v-model="formAdd.goodsName" placeholder="请选择" style="width: 100%" @change="changeGoodsType">
              <el-option
                v-for="(goodsType, idx) in goodsTypeList"
                :key="idx"
                :label="goodsType.name"
                :value="goodsType.id">
              </el-option>
            </el-select> -->
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
            <el-date-picker  type="date" :picker-options="pickerOptionsStart" placeholder="选择装货日期" v-model="formAdd.zhTime" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="appointId" label="指派人员" class="TextAlignL">
            <span class="MarginR_10" v-if="appointName">{{appointName}}</span>
            <el-button type="text" size="small" @click="chooseSJ">去选择<i class="el-icon-d-arrow-right el-icon--right"></i></el-button>
            <!-- 提示框
            <el-tooltip class="item" effect="dark" content="可以选择指定的承运商或司机来接受您的订单" placement="bottom">
              <i class="el-icon-question"></i>
            </el-tooltip> -->
          </el-form-item>
          <!-- <el-form-item label="开具发票" prop="isFapiao">
            <el-radio-group v-model="formAdd.isFapiao" style="float: left">
              <el-radio :label="0" border>不需要</el-radio>
              <el-radio :label="1" border>需要</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <el-form-item label="支付方式" prop="payWay">
            <el-radio-group v-model="formAdd.payWay" style="float: left">
              <el-radio :label="0" border>线上</el-radio>
              <el-radio :label="1" border>线下</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="接受拼箱" prop="isBox">
            <el-radio-group v-model="formAdd.isBox" style="float: left">
              <el-radio :label="1" border>不接受</el-radio>
              <el-radio :label="0" border>接受</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-card>
      <!-- cost -->
      <el-card class="box-card MarginTB_20" v-if="formAdd.payWay == 0">
        <div slot="header" class="clearfix TextAlignL">
          <span>预估费用</span>
        </div>
        <div class="TextAlignL">
          <!-- <el-form-item label="支付方式" prop="isFapiao">
            <el-row class="TextAlignR">
              <el-col :span="1" :offset="18"><el-radio v-model="formAdd.payType" :label="0"><span style="color:#fff">0</span></el-radio></el-col>
              <el-col :span="1"><img src="../../../static/images/icon/zfb.png" style="width: 35px;margin-top:5px;"></el-col>
              <el-col :span="1" :offset="2"><el-radio v-model="formAdd.payType" :label="1"><span style="color:#fff">1</span></el-radio></el-col>
              <el-col :span="1"><img src="../../../static/images/icon/wx.png" style="width: 35px;margin-top:5px;"></el-col>
            </el-row>
          </el-form-item> -->
          <el-form-item prop="oilCard" label="是否使用油卡">
            <span style="color: red">(油卡部分的金额无法开票)</span>
            <el-input v-model="formAdd.oilCard" clearable v-if="formAdd.ifUseOilCard == 1" style="width: 200px;float:right;margin-left:20px;">
              <template slot="append">¥</template>
            </el-input>
            <el-radio-group v-model="formAdd.ifUseOilCard" style="float: right">
              <el-radio :label="0" border>不使用</el-radio>
              <el-radio :label="1" border>使用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="ffee" label="报价">
            <el-input v-model="formAdd.ffee" clearable placeholder="请输入您的报价">
              <template slot="append">¥</template>
            </el-input>
          </el-form-item>
          <!-- 原本显示最高限价
          <el-form-item label="">
            <span style="float:right;margin-left: 10px;color: red" v-if="formAdd.max_price > 0">（最高限价 {{formAdd.max_price}}¥）</span>
            <span style="float:right;margin-left: 10px;color: red" v-if="formAdd.max_price == '' || formAdd.max_price == 0">（最高限价 信息不未填完整或运输距离太近）</span>
          </el-form-item> -->
          <!-- 原本按距离计算合计
          <h4 class="ColorWarn"><span style="display:inline-block;width:50%">合计：</span><span style="display:inline-block;width:50%;text-align:right">{{totalSum}} ¥</span></h4>
          <p style="font-size: 12px;color: #909399;text-align:right">{{cityDistance}} (路程/km) * {{totalWeight/1000}} (重量/t) * {{unitPrice}} (单价/¥) = {{totalSum}} ¥</p> -->
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
    <el-dialog title="指派查询" :visible.sync="dialogVisible" width="650px">
      <el-row>
        <el-col :span="4" class="TextAlignL">
          <span>指派类型：</span>
        </el-col>
         <el-col :span="19" :offset="1">
          <el-radio-group v-model="appointType" style="float: left">
            <el-radio :label="0">承运商</el-radio>
            <el-radio :label="1">个体司机</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <p class="TextAlignL MarginB_20 colorRed" >请选择输入一个查询条件进行查询</p>
      <!-- carrier -->
      <el-row class="MarginTB_20" v-if="appointType == 0">
        <el-col :span="12" class="TextAlignL">
          <span>公司名称：</span>
          <el-input class="MarginT_10" v-model="appointCompany" placeholder="" clearable></el-input>
        </el-col>
        <el-col :span="11" :offset="1" class="TextAlignL">
          <span>承运商手机号：</span>
          <el-input class="MarginT_10" v-model="appointCompanyPhone" placeholder="" clearable></el-input>
        </el-col>
      </el-row>
      <!-- driver -->
      <el-row class="MarginTB_20" v-if="appointType == 1">
        <el-col :span="7" class="TextAlignL">
          <span>司机手机号：</span>
          <el-input class="MarginT_10" v-model="appointPhoneSJ" placeholder="" clearable></el-input>
        </el-col>
        <el-col :span="7" :offset="1" class="TextAlignL">
          <span>司机姓名：</span>
          <el-input class="MarginT_10" v-model="appointNameSJ" placeholder="" clearable></el-input>
        </el-col>
        <el-col :span="8" :offset="1" class="TextAlignL">
          <span>司机身份证：</span>
          <el-input class="MarginT_10" v-model="appointIDSJ" placeholder="" clearable></el-input>
        </el-col>
      </el-row>
      <!-- result -->
      <h4 v-if="appointSearchResultC.length > 0 && appointType == 0">查询结果</h4>
      <el-row class="MarginTB_20" v-if="appointSearchResultC.length > 0 && appointType == 0">
        <el-table
          :data="appointSearchResultC"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="fname"
            label="公司名称">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="手机号">
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureChoose(scope.$index, scope.row)">指定</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-row>
      <h4 v-if="appointSearchResultG.length > 0 && appointType == 1">查询结果</h4>
      <el-row class="MarginTB_20" v-if="appointSearchResultG.length > 0 && appointType == 1">
        <el-table
          :data="appointSearchResultG"
          height="250"
          border
          style="width: 100%">
          <el-table-column
            prop="fname"
            label="司机名称">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="id_number"
            label="身份证号">
          </el-table-column>
          <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="sureChoose(scope.$index, scope.row)">指定</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-button type="primary" @click="searchAppoint">查询</el-button>
      </el-row>
    </el-dialog>
    <!-- 缴纳押金提示 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisibleCharge"
      :show-close='false'
      :close-on-click-modal='false'
      width="350px">
      <!-- 主账户 -->
      <div v-if="userRole == 2 || userRole == 3" style="margin-top: -30px;">
        <p class="TextAlignL" style="line-height: 24px;">您还未缴纳押金或押金还未到账，请先去个人中心进行充值或确认是否到账。</p>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="toCenter" class="MarginT_10">确 定</el-button>
        </span>
      </div>
      <!-- 子账户 -->
      <div v-if="userRole == 5" style="margin-top: -30px;">
        <p class="TextAlignL">您所属的承运商主账号还未缴纳押金或押金还未到账，请先和所属的承运商进行确认。</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'AddOrder',
  props: ['orderType'],
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
      } else if (value.trim() === '' || value === 0) {
        callback(new Error('请输入报价！'))
      } else {
        callback()
      }
    }
    return {
      dialogVisible: false,
      dialogVisibleCharge: false,
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
      // totalSum: 0,
      appointType: 0, // 指派类型 0_承运商 1_个体司机
      appointName: '',
      appointPhone: '',
      appointCompany: '', // 公司名称
      appointCompanyPhone: '', // 承运商手机号
      appointNameSJ: '', // 司机姓名
      appointPhoneSJ: '', // 司机手机号
      appointIDSJ: '', // 司机身份证号
      appointSearchResultC: [],
      appointSearchResultG: [],
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
        payWay: 0, // 0_线上 1_线下
        isFapiao: 0, // 0_不要 1_要
        isBox: 0, // 0_要 1_不要
        boxNo: '',
        // payType: 0, // 0_支付宝 1_微信
        ffee: '',
        ifUseOilCard: 0, // 0 不使用 1 使用
        oilCard: 0, // 油卡金额
        max_price: 0
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
          { required: true, message: '请选择支付方式！', trigger: 'change' }
        ],
        isFapiao: [
          { required: true, message: '请选择是否需要开具发票！', trigger: 'change' }
        ],
        oilCard: [
          { required: true, message: '请选择是否使用油卡！', trigger: 'change' }
        ],
        isBox: [
          { required: true, message: '请选择是否需接受拼箱！', trigger: 'change' }
        ],
        ffee: [
          { required: true, validator: validateFee, trigger: 'change' }
        ],
        fprovince: [
          { required: true, message: '请选择发货地所属省份！', trigger: 'change' }
        ],
        fcity: [
          { required: true, message: '请选择发货地所属市！', trigger: 'change' }
        ],
        farea: [
          { required: true, message: '请选择发货地所属区！', trigger: 'change' }
        ],
        sprovince: [
          { required: true, message: '请选择收货地所属省份！', trigger: 'change' }
        ],
        scity: [
          { required: true, message: '请选择收货地所属市！', trigger: 'change' }
        ],
        sarea: [
          { required: true, message: '请选择收货地所属区！', trigger: 'change' }
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
      userCode: state => state.userCode,
      userFdepsta: state => state.userFdepsta,
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
    orderType: function (value) {
      this.diffOrderType(value)
    },
    appointCompany: function (value) {
      this.appointSearchResultC = []
    },
    appointCompanyPhone: function (value) {
      this.appointSearchResultC = []
    },
    appointNameSJ: function (value) {
      this.appointSearchResultG = []
    },
    appointPhoneSJ: function (value) {
      this.appointSearchResultG = []
    },
    appointIDSJ: function (value) {
      this.appointSearchResultG = []
    },
    'formAdd.ifUseOilCard': function (value) {
      if (value === 0) {
        this.formAdd.oilCard = 0
      }
    }
  },
  created () {
    // 没缴纳押金需先去缴纳押金
    if (this.userFdepsta === '0') {
      this.dialogVisibleCharge = true
    }
    this.getProvince()
    // 判断下单的类型
    this.diffOrderType(this.orderType)
  },
  components: {
  },
  methods: {
    ...mapActions([
      'changeSiderIdx'
    ]),
    toCenter () {
      this.changeSiderIdx('3-1')
    },
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
          this.unitPrice = item.fprice
          if (this.formAdd.goodsName !== '' && this.formAdd.farea !== '' && this.formAdd.sarea !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    // 改变货物类型
    changeGoodsType (typeId) {
      this.goodsTypeList.map(item => {
        if (item.id === typeId) {
          if (this.formAdd.carType !== '' && this.formAdd.farea !== '' && this.formAdd.sarea !== '') {
            this.getMaxFee()
          }
        }
      })
    },
    // 获取最高限价
    getMaxFee () {
      this.send({
        name: '/zFareRuleController/getMaxPrice?goods_type=' + this.formAdd.goodsName + '&cartype=' + this.formAdd.carType + '&fkm=' + parseInt(this.cityDistance),
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
    // 选择指定人员后关闭弹窗
    chooseSJ () {
      this.dialogVisible = true
    },
    // 区分新增的订单类型
    diffOrderType (type) {
      switch (type) {
        case '1-2-1':
          this.formAdd.goodsName = '4d2881f66850132a01685013f0100001' // 普货
          break
        case '1-2-2':
          this.formAdd.goodsName = '4d2881f66850132a01685014c6e40007' // 危险品
          break
        case '1-2-3':
          this.formAdd.goodsName = '2c90b4e368db5b460168db617b760000' // 冷藏品
          break
      }
    },
    // 查询指定承运商或个体司机
    searchAppoint () {
      if (this.appointType === 0) {
        // 承运商
        if (!this.appointCompany && !this.appointCompanyPhone) {
          this.$message({
            message: '请至少输入一个查询项！',
            type: 'warning'
          })
          return false
        }
        this.searchCYS()
      } else {
        // 个体司机
        if (!this.appointNameSJ && !this.appointPhoneSJ && !this.appointIDSJ) {
          this.$message({
            message: '请至少输入一个查询项！',
            type: 'warning'
          })
          return false
        }
        this.searchSJ()
      }
    },
    // 承运商查询
    searchCYS () {
      if (this.appointCompany && this.appointCompanyPhone) {
        this.$message({
          message: '请至少输入一个查询项！',
          type: 'warning'
        })
        return false
      }
      this.send({
        name: (this.appointCompany && !this.appointCompanyPhone ? '/zRegisterController/appointDriver?ftype=0&company_name=' + this.appointCompany : '/zRegisterController/appointDriver?ftype=0&fmobile_carrier=' + this.appointCompanyPhone),
        method: 'GET',
        data: ''
      }).then(res => {
        if (res.data.respCode === '0') {
          this.appointSearchResultC = res.data.data
        } else {
          this.appointSearchResultC = []
          this.$message({
            message: '该承运商不存在，请检查所填的信息是否匹配！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 个体司机查询
    searchSJ () {
      let url = ''
      let cd1 = this.appointNameSJ && this.appointPhoneSJ && this.appointIDSJ
      let cd2 = this.appointNameSJ && this.appointPhoneSJ
      let cd3 = this.appointNameSJ && this.appointIDSJ
      let cd4 = this.appointPhoneSJ && this.appointIDSJ
      if (cd1 || cd2 || cd3 || cd4) {
        this.$message({
          message: '请至少输入一个查询项！',
          type: 'warning'
        })
        return false
      }
      if (this.appointNameSJ && !this.appointPhoneSJ && !this.appointIDSJ) {
        url = '/zRegisterController/appointDriver?ftype=1&fname_individual=' + this.appointNameSJ
      }
      if (!this.appointNameSJ && this.appointPhoneSJ && !this.appointIDSJ) {
        url = '/zRegisterController/appointDriver?ftype=1&fmobile_individual=' + this.appointPhoneSJ
      }
      if (!this.appointNameSJ && !this.appointPhoneSJ && this.appointIDSJ) {
        url = '/zRegisterController/appointDriver?ftype=1&carNO_individual=' + this.appointIDSJ
      }
      this.send({
        name: url,
        method: 'GET',
        data: ''
      }).then(res => {
        if (res.data.code === 1) {
          this.appointSearchResultG = res.data.userList
        } else {
          this.appointSearchResultG = []
          this.$message({
            message: '该承运商不存在，请检查所填的信息是否匹配！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    // 确定指定人员
    sureChoose (index, row) {
      this.formAdd.appointId = row.id
      this.appointName = row.fname
      this.dialogVisible = false
    },
    // 新增订单
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
        ffee: this.formAdd.payWay === 0 ? this.formAdd.ffee : 0,
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
        ftype: this.formAdd.payWay, // 0_线上 1_线下
        // isFapiao: this.formAdd.isFapiao,
        boxNo: this.formAdd.boxNo,
        isBox: this.formAdd.isBox
      }
      this.ifLoading = true
      this.send({
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
    // 数据清空初始化
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
        isFapiao: 0
      }
      // 返回列表页面
      this.changeSiderIdx('1-1')
    },
    // 改变发货地省
    changeFprovince (id) {
      this.getCity(id, 'fcityList')
      this.formAdd.fcity = ''
      this.formAdd.farea = ''
      this.formAdd.max_price = ''
    },
    // 改变发货地市
    changeFcity (id) {
      this.getArea(id, 'fareaList')
      this.formAdd.farea = ''
      this.formAdd.max_price = ''
    },
    // 改变发货地区
    changeFarea (id) {
      if (this.formAdd.scity !== '') {
        this.getDistance()
      }
    },
    // 改变收货地省
    changeSprovince (id) {
      this.getCity(id, 'scityList')
      this.formAdd.scity = ''
      this.formAdd.sarea = ''
      this.formAdd.max_price = ''
    },
    // 改变收货地市
    changeScity (id) {
      this.getArea(id, 'sareaList')
      this.formAdd.sarea = ''
      this.formAdd.max_price = ''
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
        name: '/registerDriverController/regionSelect?pid=' + this.fProvincePid,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.fprovinceList = res.data.data
          this.sprovinceList = res.data.data
        } else {
          this.$message({
            message: '获取省份信息失败！',
            type: 'error'
          })
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
        } else {
          this.$message({
            message: '获取省份信息失败！',
            type: 'error'
          })
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
        } else {
          this.$message({
            message: '获取省份信息失败！',
            type: 'error'
          })
        }
      }).catch((res) => {
        console.log(res)
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
        if (res.data.respCode === '0') {
          this.cityDistance = res.data.data
          if (this.formAdd.goodsName !== '' && this.formAdd.carType !== '') {
            this.getMaxFee()
          }
        } else {
          this.$message({
            message: '获取发货地和收货地距离失败！',
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
.AddOrder{
  margin: 20px 20px 60px 20px;
}
</style>
