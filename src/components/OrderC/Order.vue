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
          <el-table-column
            prop="company_name"
            label="所属公司">
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
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 司机订单列表 -->
    <el-row v-if="ifSJOrderSearch && !showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24" class="BgWhite TextAlignR">
        <el-form :inline="true" :model="formCondition" class="demo-form-inline">
          <!-- <el-form-item label="订单号">
            <el-input v-model="formCondition.orderNo" placeholder="订单号" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="订单状态">
            <el-select v-model="formCondition.status" placeholder="订单状态">
              <!-- <el-option label="待接单" value="0"></el-option> -->
              <el-option label="已接单" value="1"></el-option>
              <el-option label="已撤单" value="2"></el-option>
              <el-option label="运输中" value="3"></el-option>
              <el-option label="已签收" value="4"></el-option>
              <el-option label="待货主确认" value="5"></el-option>
               <el-option label="已取消" value="6"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="searchOrder">查询</el-button>
          </el-form-item>
          <el-form-item>
            <!-- <download-excel v-if="selectedOrder.length > 1"
              class = "btn btn-default"
              :data = "selectedOrder"
              :fields = "jsonFields"
              name = "司机订单列表.xls">
              <el-button type="success" icon="el-icon-printer">导出</el-button>
            </download-excel> -->
            <el-button type="success" icon="el-icon-printer" @click="exportExcell">导出</el-button>
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
            label="订单号">
          </el-table-column>
           <el-table-column
            label="订单状态"
            width="100"
            >
            <template slot-scope="scope">
              <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="fh_name"
            width="120"
            label="发货人">
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="货物类型"
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
            width="80"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">查看
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
        layout="prev, pager, next, jumper"
        :total="sumOrder">
        </el-pagination>
      </el-col>
    </el-row>
    <OrderDetail v-if="showDetail" @toggleOrderDetail='changeIfOrderDetail'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
// import {secondToFormat} from '../../util/utils'
import OrderDetail from './OrderDetail.vue'
// import JsonExcel from 'vue-json-to-excel'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      currentPage: 1,
      currentPageOrder: 1,
      sum: 0,
      sumOrder: 0,
      formCondition: {
        // orderNo: '',
        // startDate: '',
        // endDate: '',
        status: '1'
      },
      LogisticsList: [],
      orderList: [],
      selectedOrder: [],
      jsonFields: {
        order_no: 'String',
        fstatusTxt: 'String',
        goods_name: 'String',
        fh_name: 'String',
        fh_telephone: 'String',
        origin: 'String',
        fh_address: 'String',
        sh_name: 'String',
        sh_telephone: 'String',
        destination: 'String',
        sh_address: 'String',
        carType: 'String',
        zhTime: 'String',
        isFapiao: 'String',
        ffee: 'String'
      },
      json_meta: [
        [{
          key: 'charset',
          value: 'utf-8'
        }]
      ],
      carTypeList: []
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      showDetail: state => state.showDetail,
      userId: state => state.userId,
      ifSJOrderSearch: state => state.ifSJOrderSearch,
      searchOrderId: state => state.searchOrderId,
      searchSjId: state => state.searchSjId
    })
  },
  created () {
    this.getLogisticsList()
    this.getCarType()
    if (this.ifSJOrderSearch) {
      this.getStatusOrderList()
    }
  },
  watch: {
    ifSJOrderSearch: function (val) {
      if (!val) {
        this.getLogisticsList()
        this.currentPageOrder = 1
        this.formCondition.status = '1'
      }
    }
  },
  components: {
    // 'downloadExcel': JsonExcel,
    OrderDetail
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
    handleSelectionChangeOrder (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        let obj = {
          order_no: Order.order_no,
          fstatusTxt: (Order.fstatus === '0' ? '待接单' : (Order.fstatus === '1' ? '已接单' : (Order.fstatus === '2' ? '已撤单' : (Order.fstatus === '3' ? '运输中' : (Order.fstatus === '4' ? '已签收' : '已取消'))))),
          goods_name: Order.goods_name,
          fh_name: Order.fh_name,
          fh_telephone: Order.fh_telephone,
          origin: Order.origin,
          fh_address: Order.fh_address,
          sh_name: Order.sh_name,
          sh_telephone: Order.sh_telephone,
          destination: Order.destination,
          sh_address: Order.sh_address,
          carType: this.checkCarType(Order.car_type),
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
    handleCurrentChangeDriver () {
      this.getLogisticsList()
    },
    handleCurrentChangeOrder () {
      this.getStatusOrderList()
    },
    getLogisticsList () {
      this.loading = true
      let oldPage = this.currentPage
      send({
        name: '/zRegisterController/driverList?fid=' + this.userId + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.sum_number
          this.currentPage = oldPage
          this.LogisticsList = res.data.driverList
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
    handleEdit (idx, row) {
      this.changeShowDetail(true)
      this.changeSearchOrderId(row.id)
    },
    changeIfOrderDetail () {
      this.changeShowDetail(false)
    },
    seeDriverOrder (idx, row) {
      this.changeSearchSjId(row.id)
      this.changeIfSJOrderSearch(true)
      this.getStatusOrderList()
    },
    searchOrder () {
      this.currentPageOrder = 1
      this.getStatusOrderList()
    },
    getStatusOrderList () {
      this.loading = true
      send({
        name: '/driverOrderController/order/' + this.currentPageOrder + '/10?id=' + this.searchSjId + '&status=' + this.formCondition.status,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.respCode === '0') {
          this.sumOrder = res.data.size
          this.orderList = res.data.data
          // this.orderList = res.data.orderList
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
    getCarType (carType) {
      send({
        name: '/zCarTypeController/list/1/10',
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
    checkCarType (carType) {
      let len = this.carTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.carTypeList[i].typeValue === carType) {
          return this.carTypeList[i].typeName
        }
      }
    },
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
        const tHeader = ['订单号', '订单状态', '货物类型', '发货人', '手机号', '发货地', '街道', '发货人', '手机号', '收货地', '街道', '车型', '装货日期', '开具发票', '预估费用']
        const filterVal = ['order_no', 'fstatusTxt', 'goods_name', 'fh_name', 'fh_telephone', 'origin', 'fh_address', 'sh_name', 'sh_telephone', 'destination', 'sh_address', 'carType', 'zhTime', 'isFapiao', 'ffee']
        const data = this.formatJson(filterVal, this.selectedOrder)
        exportJsonToExcel(tHeader, data, '订单')
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.Order{
  margin: 20px 20px 60px 20px;
}
</style>
