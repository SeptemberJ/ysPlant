<template>
  <div class="Order">
    <el-row v-if="!showDetail" style="background: #fff;padding: 20px;">
      <!-- <el-col :span="24"  class="MarginTB_20 TextAlignR">
        <el-input style='width:250px;' v-model='searOrderNo' placeholder='请输入查询的订单号' clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="searchOrder">查询</el-button>
      </el-col> -->
      <el-col :span="24"  class="MarginTB_20">
        <el-row>
          <el-col :span="12" :class="{'activeTab': searchType == 1, 'normalTab': searchType == 0, 'Padding_10': true}"><span @click="changeTab(1)">指定订单</span></el-col>
          <el-col :span="12" :class="{'activeTab': searchType == 0, 'normalTab': searchType == 1, 'Padding_10': true}"><span @click="changeTab(0)">未指定订单</span></el-col>
        </el-row>
      </el-col>
      <el-col :span="24"  class="MarginTB_20">
        <el-table
          ref="multipleTable"
          :data="OrderList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
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
            prop="ZHTime"
            width="170"
            label="装货日期">
          </el-table-column>
          <!-- <el-table-column
            prop="goodsName"
            label="货物名称"
            show-overflow-tooltip>
          </el-table-column> -->
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
              <!-- <el-button v-if="scope.row.fstatus == 0"
                size="mini"
                type="danger"
                @click="Receipt(scope.$index, scope.row)"> {{searchType == 0 ? '报价' : '接单'}}
              </el-button> -->
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="prev, pager, next, jumper"
        :total="sum">
        </el-pagination>
      </el-col>
    </el-row>
    <OrderDetail v-if="showDetail" :orderId="orderId" :searchType="searchType" @toggleOrderDetail='changeIfOrderDetail'/>
    <el-dialog title="派单" :visible.sync="dialogFormVisible" width="550px">
      <el-row>
        <el-col :span="4">
          <span style="line-height: 35px;">报价金额：</span>
        </el-col>
        <el-col :span="12" class="TextAlignL">
          <el-input v-model='offer' placeholder='请输入您的报价金额' clearable></el-input>
        </el-col>
        <el-col :span="8">
          <span style="line-height: 35px;color:red">（最高限价{{maxFee}}）</span>
        </el-col>
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
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureOffer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {send} from '../../util/send'
import {secondToFormat} from '../../util/utils'
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
      // fee: '',
      maxFee: '',
      orderIdReceipt: ''
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole,
      userCode: state => state.userCode,
      userId: state => state.userId,
      showDetail: state => state.showDetail
    })
  },
  created () {
    this.changeShowDetail(false)
    if (this.searchType === 0 || this.searchType === '0') {
      this.getOrderListNotAppoint()
    } else {
      this.getOrderList()
    }
  },
  watch: {
    searOrderNo: function (val) {
      if (val === '') {
        this.searchOrder()
      }
    }
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
    handleSizeChange () {
    },
    handleCurrentChange () {
      if (this.searchType === 0) {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
    },
    Receipt (idx, row) {
      this.orderIdReceipt = row.id
      this.maxFee = row.fmaxFee
      // this.fee = row.ffee
      this.dialogFormVisible = true
      this.getDriverList()
    },
    sureOffer () {
      if (this.maxFee < this.ffee) {
        this.$message({
          message: '报价超过了最高限价！',
          type: 'error'
        })
        return false
      }
      let DATA = {
        registerId: this.userId,
        driverId: this.choosedLogistic,
        orderId: this.orderIdReceipt,
        orderStatus: '5',
        ffee: this.offer,
        createDate: new Date()
      }
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
          if (this.searchType === 0 || this.searchType === '0') {
            this.getOrderListNotAppoint()
          } else {
            this.getOrderList()
          }
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
    // 货主
    // Assignment () {
    //   send({
    //     name: '/orderController/confirmOrder?driver_id=' + this.choosedLogistic + '&order_id=' + this.orderIdReceipt + '&ffee=' + this.fee,
    //     method: 'GET'
    //   }).then(res => {
    //     if (res.data.code === 1) {
    //       this.$message({
    //         message: '报价成功！',
    //         type: 'success'
    //       })
    //       if (this.searchType === 0 || this.searchType === '0') {
    //         this.getOrderListNotAppoint()
    //       } else {
    //         this.getOrderList()
    //       }
    //       this.dialogFormVisible = false
    //     } else {
    //       this.$message({
    //         message: res.data.message + '！',
    //         type: 'error'
    //       })
    //     }
    //   }).catch((res) => {
    //     console.log(res)
    //   })
    // },
    changeTab (type) {
      this.searchType = type
      this.currentPage = 1
      if (type === 0) {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
    },
    changeIfOrderDetail (searchType) {
      this.searchType = searchType
      if (searchType === 0 || searchType === '0') {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
      this.changeShowDetail(false)
    },
    ToDetail (idx, row) {
      this.changeShowDetail(true)
      this.orderId = row.id
      this.changeSearchOrderId(row.id)
    },
    searchOrder () {
      if (this.searchType === 0) {
        this.getOrderListNotAppoint()
      } else {
        this.getOrderList()
      }
    },
    getOrderList () {
      this.loading = true
      send({
        name: '/orderController/list/' + this.currentPage + '/10/1' + '/{appointId}?appointId=' + this.userId + '&order_no=' + this.searOrderNo,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          let temp = res.data.pageList
          temp.map(item => {
            item.ZHTime = secondToFormat(item.zhTime.time)
          })
          this.OrderList = temp
          this.sum = res.data.pageSize
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
    getOrderListNotAppoint () {
      this.loading = true
      send({
        name: '/orderController/list/' + this.currentPage + '/10/0' + '/{appointId}?appointId=' + '&order_no=' + this.searOrderNo,
        method: 'GET',
        data: {}
      }).then(res => {
        if (res.data.code === 1) {
          let temp = res.data.pageList
          temp.map(item => {
            item.ZHTime = secondToFormat(item.zhTime.time)
          })
          console.log(temp)
          this.OrderList = temp
          this.sum = res.data.pageSize
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}
</style>
