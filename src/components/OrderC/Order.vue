<template>
  <div class="Order">
    <!-- 司机列表 -->
    <el-row v-if="!ifSJOrderSearch && !showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="LogisticsList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            prop="fname"
            label="司机姓名">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="手机号">
          </el-table-column>
          <!-- <el-table-column
            prop="company_name"
            label="所属公司">
          </el-table-column> -->
          <el-table-column
            align="right"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="seeDriverOrder(scope.$index, scope.row)">查看他的订单
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="LogisticsList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangeDriver"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 司机订单列表 -->
    <el-row v-if="ifSJOrderSearch && !showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24" class="BgWhite TextAlignR">
        <el-form :inline="true" :model="formCondition" class="demo-form-inline">
          <el-form-item label="订单状态">
            <el-select v-model="formCondition.status" placeholder="订单状态" size="mini" @change="searchOrder">
              <el-option label="已接单" value="1"></el-option>
              <el-option label="货主已发起协议" value="2"></el-option>
              <el-option label="已签署协议" value="3"></el-option>
              <el-option label="运输中" value="4"></el-option>
              <el-option label="已签收" value="5"></el-option>
              <el-option label="待货主确认" value="6"></el-option>
              <el-option label="已取消" value="7"></el-option>
              <el-option label="待支付" value="8"></el-option>
              <el-option label="已结单" value="9"></el-option>
              <!-- <el-option label="待接单" value="5"></el-option>
              <el-option label="已接单" value="0"></el-option>
              <el-option label="运输" value="1"></el-option>
              <el-option label="已取消" value="3"></el-option>
              <el-option label="签收" value="4"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="success" icon="el-icon-printer" @click="exportExcell">导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24"  class="">
        <el-table
          ref="multipleTable"
          :data="orderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChangeOrder">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="order_no"
            label="订单号"
            show-overflow-tooltip>
          </el-table-column>
           <el-table-column
            label="订单状态"
            width="120">
            <template slot-scope="scope">
              <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '货主已发起协议' : (scope.row.fstatus == 3 ? '已签署协议' : (scope.row.fstatus == 4 ? '运输中' : (scope.row.fstatus == 5 ? '已签收' : (scope.row.fstatus == 6 ? '待货主确认' : (scope.row.fstatus == 7 ? '已取消' : (scope.row.fstatus == 8 ? '待支付' : (scope.row.fstatus == 9 ? '已结单' : '其它')))))))))}}</span>
              <!-- <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}</span> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="fh_name"
            width="120"
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="ffee"
            width="100"
            label="报价(¥)"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="origin"
            label="发货地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="destination"
            label="收货地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleSeeSjOrderDetail(scope.$index, scope.row)">查看
              </el-button>
              <el-button v-if="scope.row.fstatus = 2"
                size="mini"
                type="info"
                @click="signAgreement(scope.$index, scope.row)">签署协议
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="orderList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChangeOrder"
        :current-page.sync="currentPageOrder"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="sumOrder">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 订单详情 -->
    <OrderDetail v-if="showDetail" @toggleOrderDetail='changeIfOrderDetail'/>
    <!-- 运输协议 -->
    <transportAgreement v-if="showTransportAgreement" :type="1" :orderId="orderId" @refreshList='getStatusOrderList' @closeTransportAgreement='closeTransportAgreement'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import OrderDetail from './OrderDetail.vue'
import transportAgreement from '../transportAgreement.vue'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      showTransportAgreement: false,
      currentPage: 1,
      currentPageOrder: 1,
      sum: 0,
      sumOrder: 0,
      formCondition: {
        status: '1'
      },
      LogisticsList: [],
      orderList: [],
      selectedOrder: [],
      orderId: null
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      showDetail: state => state.showDetail,
      userId: state => state.userId,
      ifSJOrderSearch: state => state.ifSJOrderSearch,
      searchOrderId: state => state.searchOrderId,
      searchSjId: state => state.searchSjId,
      carTypeList: state => state.carTypeList,
      goodsTypeList: state => state.goodsTypeList
    })
  },
  created () {
    this.getLogisticsList()
    if (this.ifSJOrderSearch) {
      this.getStatusOrderList()
    }
  },
  watch: {
    ifSJOrderSearch: function (val) {
      if (!val) {
        this.getLogisticsList()
        this.currentPageOrder = 1
        this.formCondition.status = '5'
      }
    }
  },
  components: {
    OrderDetail,
    transportAgreement
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeIfSJOrderSearch',
      'changeSearchOrderId',
      'changeSearchSjId'
    ]),
    handleSelectionChange () {
    },
    // 选中记录改变
    handleSelectionChangeOrder (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        let obj = {
          order_no: Order.order_no,
          fstatusTxt: (Order.fstatus === '0' ? '待接单' : (Order.fstatus === '1' ? '已接单' : (Order.fstatus === '2' ? '已撤单' : (Order.fstatus === '3' ? '运输中' : (Order.fstatus === '4' ? '已签收' : '已取消'))))),
          goods_name: Order.goods_name, // this.checkGoodsType(Order.goods_name)
          fh_name: Order.fh_name,
          fh_telephone: Order.fh_telephone,
          origin: Order.origin,
          fh_address: Order.fh_address,
          sh_name: Order.sh_name,
          sh_telephone: Order.sh_telephone,
          destination: Order.destination,
          sh_address: Order.sh_address,
          carType: Order.car_type, // this.checkCarType(Order.car_type)
          zhTime: Order.zh_time,
          isFapiao: Order.is_fapiao === '0' ? '不需要' : '需要',
          ffee: Order.ffee
        }
        tempChoosed.push(obj)
      })
      this.selectedOrder = tempChoosed
    },
    handleSizeChange () {
    },
    // 页码改变获取司机列表
    handleCurrentChangeDriver () {
      this.getLogisticsList()
    },
    // 页码改变获取司机列订单表
    handleCurrentChangeOrder () {
      this.getStatusOrderList()
    },
    // 获取司机列表
    getLogisticsList () {
      this.loading = true
      let oldPage = this.currentPage
      this.send({
        name: '/zRegisterController/driverList?fid=' + this.userId + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sum = res.data.size
          this.currentPage = oldPage
          this.LogisticsList = res.data.data
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
    // 查看司机订单详情
    handleSeeSjOrderDetail (idx, row) {
      this.changeShowDetail(true)
      this.changeSearchOrderId(row.id)
    },
    // 签署运输协议
    signAgreement (idx, row) {
      this.orderId = row.id
      this.showTransportAgreement = true
    },
    closeTransportAgreement () {
      this.showTransportAgreement = false
    },
    // 关闭详情
    changeIfOrderDetail () {
      this.changeShowDetail(false)
    },
    // 查看某司机某类订单列表
    seeDriverOrder (idx, row) {
      this.changeSearchSjId(row.id)
      this.changeIfSJOrderSearch(true)
      this.getStatusOrderList()
    },
    // 改变查看的司机订单类型
    searchOrder () {
      this.currentPageOrder = 1
      this.getStatusOrderList()
    },
    // 获取某司机某类订单列表
    getStatusOrderList () {
      this.loading = true
      this.send({
        name: '/driverOrderController/order/' + this.currentPageOrder + '/10?id=' + this.searchSjId + '&status=' + this.formCondition.status,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sumOrder = res.data.size
          this.orderList = res.data.data
        } else if (res.data.code === 0) {
          this.sumOrder = 0
          this.orderList = []
        } else if (res.data.respCode === '-1') {
          this.sumOrder = 0
          this.orderList = []
        } else {
          this.sumOrder = 0
          this.orderList = []
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
    // 获取车型名称
    checkCarType (carTypeId) {
      let len = this.carTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.carTypeList[i].id === carTypeId) {
          return this.carTypeList[i].typeName
        }
      }
    },
    // 获取货物类型名称
    checkGoodsType (goodsTypeId) {
      let len = this.goodsTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.goodsTypeList[i].id === goodsTypeId) {
          return this.goodsTypeList[i].name
        }
      }
    },
    // 导出记录
    exportExcell () {
      if (this.selectedOrder.length === 0) {
        this.$message({
          message: '请至少选择一条需要导出的记录！',
          type: 'warning'
        })
        return false
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel.js')
        const tHeader = ['订单号', '订单状态', '货物类型', '发货人', '手机号', '发货地', '街道', '发货人', '手机号', '收货地', '街道', '车型', '装货日期', '开具发票', '报价(¥)']
        const filterVal = ['order_no', 'fstatusTxt', 'goods_name', 'fh_name', 'fh_telephone', 'origin', 'fh_address', 'sh_name', 'sh_telephone', 'destination', 'sh_address', 'carType', 'zhTime', 'isFapiao', 'ffee']
        const data = this.formatJson(filterVal, this.selectedOrder)
        exportJsonToExcel(tHeader, data, '订单')
      })
    },
    // json格式化
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<style lang="less" scoped>
.Order{
  margin: 20px 20px 60px 20px;
}
</style>
