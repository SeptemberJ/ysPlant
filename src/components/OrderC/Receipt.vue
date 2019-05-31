<template>
  <div class="Order">
    <el-row v-if="!showDetail" style="background: #fff;padding: 20px;">
      <!-- 原本可根据订单号查询某条订单
      <el-col :span="24"  class="MarginTB_20 TextAlignR">
        <el-input style='width:250px;' v-model='searOrderNo' placeholder='请输入查询的订单号' clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchOrder">查询</el-button>
      </el-col> -->
      <!-- 原本未指定和指定在同一页面
      <el-col :span="24"  class="MarginTB_20">
        <el-row>
          <el-col :span="12" :class="{'activeTab': searchType == 1, 'normalTab': searchType == 0, 'Padding_10': true}"><span @click="changeTab(1)">指定订单</span></el-col>
          <el-col :span="12" :class="{'activeTab': searchType == 0, 'normalTab': searchType == 1, 'Padding_10': true}"><span @click="changeTab(0)">未指定订单</span></el-col>
        </el-row>
      </el-col> -->
      <!-- 未指定订单查询筛选条件 -->
      <el-col v-if="siderIdx == '1-6'" :span="24"  class="MarginB_20">
        <el-form id="fromSearch" ref="fromSearch" :model="fromSearch" label-width="80px" label-position="left">
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="carType" label="车辆类型">
                <el-select size="mini" v-model="fromSearch.carType" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="(carType, idx) in carTypeList"
                    :key="idx"
                    :label="carType.typeName"
                    :value="carType.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="goodsName" label="货物类型">
                <el-select size="mini" v-model="fromSearch.goodsName" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="(goodsType, idx) in goodsTypeList"
                    :key="idx"
                    :label="goodsType.name"
                    :value="goodsType.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" :offset="1">
              <el-form-item prop="orderNumber" label="订单号">
                <el-input size="mini" v-model="fromSearch.orderNumber" clearable placeholder="请输入订单号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7" :offset="0">
              <el-form-item prop="fprovince" label="发货省">
                <el-select size="mini" v-model="fromSearch.fprovince" placeholder="请选择" @change="changeFprovince" style="width: 100%">
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
                <el-select size="mini" v-model="fromSearch.fcity" placeholder="请选择" @change="changeFcity" style="width: 100%">
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
                <el-select size="mini" v-model="fromSearch.farea" placeholder="请选择" style="width: 100%">
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
                <el-select size="mini" v-model="fromSearch.sprovince" placeholder="请选择" @change="changeSprovince" style="width: 100%">
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
                <el-select size="mini" v-model="fromSearch.scity" placeholder="请选择" @change="changeScity" style="width: 100%">
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
                <el-select size="mini" v-model="fromSearch.sarea" placeholder="请选择" style="width: 100%">
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
        </el-form>
      </el-col>
      <el-col v-if="siderIdx == '1-6'" :span="24">
        <el-button size="mini" icon="el-icon-refresh" @click="searchReset">重置</el-button>
        <el-button size="mini" type="primary" icon="el-icon-search" @click="searchOrder">查询</el-button>
      </el-col>
      <el-col v-if="siderIdx == '1-6'" :span="24"><div class="DividerLine"></div></el-col>
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="OrderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="orderNo"
            label="订单号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="zhTime"
            width="170"
            label="装货日期">
          </el-table-column>
          <el-table-column
            prop="fhName"
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="fhTelephone"
            label="发货人手机">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="ToDetail(scope.$index, scope.row)">查看详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="OrderList.length > 0">
        <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <OrderDetail v-if="showDetail" :orderId="orderId" :searchType="searchType" @toggleOrderDetail='changeIfOrderDetail'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrderDetail from './OrderDetail.vue'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      dialogFormVisible: false,
      searOrderNo: '', // 需要修改报价查询的订单号
      searchType: 1, // 0 未指定 1 指定
      orderId: '',
      currentPage: 1,
      sum: 0,
      OrderList: [],
      LogisticsList: [],
      choosedLogistic: '',
      offer: '',
      maxFee: '',
      orderIdReceipt: '',
      fromSearch: {
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        carType: '',
        goodsName: '',
        orderNumber: ''
      },
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
      sareaPid: ''
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      userId: state => state.userId,
      showDetail: state => state.showDetail,
      siderIdx: state => state.siderIdx,
      carTypeList: state => state.carTypeList,
      goodsTypeList: state => state.goodsTypeList
    })
  },
  created () {
    this.changeShowDetail(false)
    if (this.siderIdx === '1-6') {
      this.getOrderListNotAppoint()
    } else {
      this.getOrderList()
    }
    this.getProvince()
  },
  watch: {
    // 指定和未指定拆分后通过监听siderIdx的变化获取相应数据
    siderIdx: function (newVal) {
      if (newVal === '1-4') {
        this.getOrderList()
      }
      if (newVal === '1-6') {
        this.getOrderListNotAppoint()
      }
    }
    // searOrderNo: function (val) { // 若订单清空则查询当前类型的待接单
    //   if (val === '') {
    //     this.searchOrder()
    //   }
    // }
  },
  components: {
    OrderDetail
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeSearchOrderId'
    ]),
    // 页码改变重新获取订单列表
    handleCurrentChange () {
      if (this.searchType === 0) {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
    },
    // Tab事件
    changeTab (type) {
      this.searchType = type
      this.currentPage = 1
      if (type === 0) {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
    },
    // 查看详情
    changeIfOrderDetail (searchType) {
      this.searchType = searchType
      if (this.siderIdx === '1-6') {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
      this.changeShowDetail(false)
    },
    // 显示详情页
    ToDetail (idx, row) {
      this.changeShowDetail(true)
      this.orderId = row.id
      this.changeSearchOrderId(row.id)
    },
    // 重置
    searchReset () {
      this.fromSearch = {
        fprovince: '',
        fcity: '',
        farea: '',
        sprovince: '',
        scity: '',
        sarea: '',
        carType: '',
        goodsName: '',
        orderNumber: ''
      }
      this.getOrderListNotAppoint()
    },
    // 筛选订单
    searchOrder () {
      if (!this.fromSearch.farea && (this.fromSearch.fprovince || this.fromSearch.fcity)) {
        this.$message({
          message: '请将发货地选择完整！',
          type: 'warning'
        })
        return false
      }
      if (!this.fromSearch.sarea && (this.fromSearch.sprovince || this.fromSearch.scity)) {
        this.$message({
          message: '请将收货地选择完整！',
          type: 'warning'
        })
        return false
      }
      this.getOrderListNotAppoint()
    },
    // 获取指定的订单列表
    getOrderList () {
      this.loading = true
      this.send({
        name: '/orderController/list/' + this.currentPage + '/10/1' + '/{appointId}?appointId=' + this.userId,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.OrderList = res.data.data
          this.sum = res.data.size
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
        this.loading = false
      }).catch((res) => {
        console.log(res)
        this.loading = false
      })
    },
    // 获取未指定的订单列表
    getOrderListNotAppoint () {
      this.loading = true
      this.send({
        name: '/orderController/list/' + this.currentPage + '/10/0' + '/{appointId}?appointId=' + '&order_no=' + this.fromSearch.orderNumber + '&fh=' + this.fromSearch.farea + '&sh=' + this.fromSearch.sarea + '&goodstype=' + this.fromSearch.goodsName + '&cartype=' + this.fromSearch.carType,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.OrderList = res.data.data
          this.sum = res.data.size
        } else {
          this.$message({
            message: res.data.message + '！',
            type: 'error'
          })
        }
        this.loading = false
      }).catch((res) => {
        console.log(res)
        this.loading = false
      })
    },
    // 改变发货地省
    changeFprovince (id) {
      this.getCity(id, 'fcityList')
      this.fromSearch.fcity = ''
      this.fromSearch.farea = ''
    },
    // 改变发货地市
    changeFcity (id) {
      this.getArea(id, 'fareaList')
      this.fromSearch.farea = ''
    },
    // 改变收货地省
    changeSprovince (id) {
      this.getCity(id, 'scityList')
      this.fromSearch.scity = ''
      this.fromSearch.sarea = ''
    },
    // 改变收货地市
    changeScity (id) {
      this.getArea(id, 'sareaList')
      this.fromSearch.sarea = ''
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
    }
  }
}
</script>

<style lang="less" scoped>
.Order{
  margin: 20px 20px 60px 20px;
  .activeTab{
    border: 1px solid #e0b32b;
    background: #e0b32b;
    color: #fff;
    cursor: pointer;
    span{
      width: 100%;
      display: block;
    }
  }
  .normalTab{
    border: 1px solid #e0b32b;
    color: #e0b32b;
    cursor: pointer;
    span{
      width: 100%;
      display: block;
    }
  }
  #fromSearch .el-form-item {
    margin-bottom: 0 !important;
  }
}
</style>
