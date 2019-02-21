<template>
  <div class="Order">
    <el-row v-if="!showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24" class="BgWhite MarginT_10 TextAlignR">
        <!-- <el-button type="primary" icon="el-icon-plus" size="small">新增</el-button> -->
        <el-form :inline="true" :model="formCondition" class="demo-form-inline">
          <!-- <el-form-item label="订单号">
            <el-input v-model="formCondition.orderNo" placeholder="订单号" clearable></el-input>
          </el-form-item> -->
          <!-- <el-form-item label="起始日期">
            <el-date-picker type="date" placeholder="选择起始日期" v-model="formCondition.startDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期">
            <el-date-picker type="date" placeholder="选择结束日期" v-model="formCondition.endDate" style="width: 100%;"></el-date-picker>
          </el-form-item> -->
          <!-- <el-form-item label="活动区域">
            <el-select v-model="formCondition.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item> -->
          <el-form-item>
            <el-button type="success" icon="el-icon-printer" @click="exportExcell">导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24"  class="MarginB_20">
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          :data="orderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
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
            width="120"
            >
            <template slot-scope="scope">
              <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="ffee"
            label="预估价"
            show-overflow-tooltip>
          </el-table-column> -->
          <!-- <el-table-column
            prop="goods_name"
            label="货物类型"
            show-overflow-tooltip>
          </el-table-column> -->
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
            width="220"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                :disabled="scope.row.fstatus != 0"
                @click="handleCancel(scope.$index, scope.row)">取消
              </el-button>
              <el-button
                size="mini"
                type="warning"
                :disabled="scope.row.fstatus != 0"
                @click="getOfferList(scope.$index, scope.row)">报价
              </el-button>
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="orderList.length > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 报价列表 -->
    <el-dialog title="报价列表" :visible.sync="dialogFormVisible" width="550px">
      <el-row>
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          height="250"
          :data="offerList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            type="index"
            width="55">
          </el-table-column>
          <el-table-column
            prop="fname"
            label="司机">
          </el-table-column>
          <el-table-column
            prop="ffee"
            label="报价">
          </el-table-column>
          <el-table-column
            prop="fmobile"
            label="手机号">
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="100"
            >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="sureOffer(scope.$index, scope.row)">接受报价
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>
    <OrderDetail v-if="showDetail" @toggleOrderDetail='changeIfOrderDetail'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
import {secondToFormat} from '../../util/utils'
import OrderDetail from './OrderDetail.vue'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
// import expandRow from './TableExpand.vue'
// import JsonExcel from 'vue-json-to-excel'
export default {
  name: 'Order',
  data () {
    return {
      dialogFormVisible: false,
      loading: false,
      currentPage: 1,
      sum: 0,
      formCondition: {
        orderNo: '',
        startDate: '',
        endDate: ''
      },
      orderList: [],
      carTypeList: [],
      goodsTypeList: [],
      selectedOrder: [
      ],
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
      offerList: []
      // positionData: [{ID: '00', Name: '123'}]
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      showDetail: state => state.showDetail,
      searchOrderId: state => state.searchOrderId
    })
  },
  created () {
    this.getOrderList()
    this.getCarType()
    this.getGoodsType()
  },
  components: {
    // 'downloadExcel': JsonExcel,
    OrderDetail
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeSearchOrderId'
    ]),
    handleSelectionChange (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        let obj = {
          order_no: Order.order_no,
          fstatusTxt: Order.fstatusTxt,
          // goods_name: Order.goods_name,
          goods_name: this.checkGoodsType(Order.goods_name),
          fh_name: Order.fh_name,
          fh_telephone: Order.fh_telephone,
          origin: Order.origin,
          fh_address: Order.fh_address,
          sh_name: Order.sh_name,
          sh_telephone: Order.sh_telephone,
          destination: Order.destination,
          sh_address: Order.sh_address,
          carType: this.checkCarType(Order.car_type),
          zhTime: Order.zhDate,
          isFapiao: Order.is_fapiao === '0' ? '不需要' : '需要',
          ffee: Order.ffee
        }
        tempChoosed.push(obj)
      })
      this.selectedOrder = tempChoosed
    },
    changeIfOrderDetail () {
      this.changeShowDetail(false)
      this.getOrderList()
    },
    handleEdit (idx, row) {
      this.changeShowDetail(true)
      this.changeSearchOrderId(row.id)
    },
    // 查看报价
    getOfferList (idx, row) {
      send({
        name: '/orderController/driverPriceList?order_id=' + row.id,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          this.dialogFormVisible = true
          this.offerList = res.data.driverPriceList
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
    // 确认报价
    sureOffer (idx, row) {
      send({
        name: '/orderController/confirmOrder?driver_id=' + row.driver_id + '&order_id=' + row.order_id + '&ffee=' + row.ffee,
        method: 'GET'
      }).then(res => {
        if (res.data.code === 1) {
          this.dialogFormVisible = false
          this.$message({
            message: '确认成功！',
            type: 'success'
          })
          this.getOrderList()
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
    handleCancel (idx, row) {
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureCancel(row.id)
      }).catch(() => {
      })
    },
    sureCancel (id) {
      send({
        name: '/orderController/cancelOrder?id=' + id,
        method: 'POST',
        data: {}
      }).then(res => {
        if (res.data.code === '1' || res.data.code === 1) {
          this.getOrderList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
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
    handleSizeChange () {
    },
    handleCurrentChange () {
      this.getOrderList()
    },
    onSubmit () {
      console.log('submit!')
    },
    getOrderList () {
      this.loading = true
      let urlName = ''
      // 主账户
      if (this.userRole === '1' || this.userRole === '2' || this.userRole === '3') {
        urlName = '/orderController/orderList?number=10&page_num=' + this.currentPage + '&main_usercode=' + this.userCode
      }
      // 子账户
      if (this.userRole === '4' || this.userRole === '5') {
        urlName = '/orderController/subOrderList?number=10&page_num=' + this.currentPage + '&sub_usercode=' + this.userCode
      }
      send({
        name: urlName,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          this.sum = res.data.sum_number
          res.data.orderList.map(order => {
            order.zhDate = secondToFormat(order.zh_time.time)
            order.fstatusTxt = (order.fstatus === '0' ? '待接单' : (order.fstatus === '1' ? '已接单' : (order.fstatus === '2' ? '已撤单' : (order.fstatus === '3' ? '运输中' : (order.fstatus === '4' ? '已签收' : '已取消')))))
          })
          this.orderList = res.data.orderList
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
    checkCarType (carTypeId) {
      let len = this.carTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.carTypeList[i].id === carTypeId) {
          return this.carTypeList[i].typeName
        }
      }
    },
    checkGoodsType (goodsTypeId) {
      let len = this.goodsTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.goodsTypeList[i].id === goodsTypeId) {
          return this.goodsTypeList[i].name
        }
      }
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
        const tHeader = ['订单号', '订单状态', '货物类型', '发货人', '手机号', '发货地', '街道', '发货人', '手机号', '收货地', '街道', '车型', '装货日期', '开具发票', '报价']
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
