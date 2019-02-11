<template>
  <div class="Order">
    <el-row v-if="!showDetail" style="background: #fff;padding: 20px;">
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
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
            <el-button type="primary" @click="exportExcel">导出</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          id="rebateSetTable"
          ref="multipleTable"
          :data="orderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <!-- <el-table-column
            type="selection"
            width="55">
          </el-table-column> -->
          <el-table-column
            type="index"
            width="50">
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
              <!-- <el-button
                size="mini">{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}
              </el-button> -->
              <span>{{scope.row.fstatus == 0 ? '待接单' : (scope.row.fstatus == 1 ? '已接单' : (scope.row.fstatus == 2 ? '已撤单' : (scope.row.fstatus == 3 ? '运输中' : (scope.row.fstatus == 4 ? '已签收' : '已取消'))))}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_name"
            label="货物名称"
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
          <!-- <el-table-column
            prop="zhDate"
            label="装货日期"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            align="right"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
              <el-button v-if="scope.row.fstatus == 0"
                size="mini"
                type="danger"
                @click="handleCancel(scope.$index, scope.row)">取消订单
              </el-button>
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
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <OrderDetail v-if="showDetail" @toggleOrderDetail='changeIfOrderDetail'/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
import {secondToFormat} from '../../util/utils'
import OrderDetail from './OrderDetail.vue'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      currentPage: 1,
      sum: 0,
      formCondition: {
        orderNo: '',
        startDate: '',
        endDate: ''
      },
      orderList: []
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
  },
  components: {
    OrderDetail
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeSearchOrderId'
    ]),
    handleSelectionChange () {
    },
    changeIfOrderDetail () {
      this.changeShowDetail(false)
      this.getOrderList()
    },
    handleEdit (idx, row) {
      this.changeShowDetail(true)
      this.changeSearchOrderId(row.id)
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
    // 导出
    exportExcel () {
      /* generate workbook object from table */
      let wb = XLSX.utils.table_to_book(document.querySelector('#rebateSetTable'))
      /* get binary string as output */
      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '订单导出.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {

        }
        console.log(e, wbout)
      }
      return wbout
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
