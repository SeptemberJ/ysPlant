<template>
  <div class="Order">
    <!-- 司机列表 -->
    <el-row>
      <el-col :span="24" class="BgWhite MarginTB_10 TextAlignR">
       <el-button type="primary" icon="el-icon-plus" @click="toAddOrderC">新增</el-button>
       <el-button type="success" icon="el-icon-printer" @click="exportExcell">导出</el-button>
      </el-col>
      <el-col :span="24"  class="MarginB_20 MarginT_20">
        <el-table
          ref="multipleTable"
          :data="ticketList"
          v-loading="loading"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-row class="expandBlock">
                <el-col :span="8">
                  <p>司机手机：{{props.row.fmobile}}</p>
                  <p>车辆牌照：{{props.row.fcarno}}</p>
                  <p>供应商：{{props.row.fsupplier_name}}</p>
                  <p>回单收件人：{{props.row.freceipt_people}}</p>
                  <p>回单地址：{{props.row.freceipt_addr}}</p>
                </el-col>
                <el-col :span="5">
                  <p>运输单价：{{props.row.ftransport_price}} ¥</p>
                  <p>运输趟数：{{props.row.ftransport_count}} 趟</p>
                  <p>运输周期：{{props.row.fsettlement_cycle}} 天</p>
                  <p>运费增补：{{props.row.ffee_add}} ¥</p>
                  <p>运费扣减：{{props.row.ffee_minus}} ¥</p>
                </el-col>
                <el-col :span="5">
                  <p>预付油卡：{{props.row.foil_card}} ¥</p>
                  <p>预付款：{{props.row.fpre_fee}} ¥</p>
                  <p>运单押金：{{props.row.freceipt_deposit}} ¥</p>
                  <p>在途时限：{{props.row.ftransit_hour}} 小时</p>
                </el-col>
                <el-col :span="6">
                  <p>货物名称：{{props.row.goodsNameTxt}}</p>
                  <p>货物数量：{{props.row.fgoods_number}} kg</p>
                  <p>起运时间：{{props.row.fstartDate}}</p>
                  <p>装货时间：{{props.row.floadingTime}}</p>
                  <p>备注：{{props.row.fremarks}}</p>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
          <el-table-column
            prop="forder_no"
            label="订单号"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="ffee"
            label="运费金额(¥)"
            width="100"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="fname"
            width="110"
            label="司机">
          </el-table-column>
          <!-- <el-table-column
            prop="ticketS"
            label="受票方"
            show-overflow-tooltip>
          </el-table-column> -->
          <el-table-column
            prop="destination"
            label="目的地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="origin"
            label="发货地"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            label="跟踪状态"
            width="80"
            >
            <template slot-scope="scope">
              <p class="TextAlignL">{{scope.row.ftrack_status == 0 ? '申请' : (scope.row.ftrack_status == 1 ? '未开始' : (scope.row.ftrack_status == 2 ? '运输中' : '已终结'))}}</p>
              <el-button
                type="text"
                @click="trajectory(scope.$index, scope.row)">查看轨迹
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="right"
            label="操作"
            width="180"
            >
            <template slot-scope="scope">
              <el-button
                type="text"
                :disabled="scope.row.ftrack_status != 0 && scope.row.ftrack_status != 1"
                @click="edit(scope.$index, scope.row)">修改
              </el-button>
              <el-button
                type="text"
                @click="handleCancel(scope.$index, scope.row)">删除
              </el-button>
              <el-button
                type="text"
                @click="receiptUpload(scope.$index, scope.row)">回单上传
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24" class="MarginTB_20 TextAlignR" v-if="ticketList.length > 0">
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
    <!-- add -->
    <el-dialog title="新增开票订单" :visible.sync="ifAdd" width="650px" :close-on-click-modal="false">
      <Add @ToggleDialogAdd="toAddOrderC" @FreshList="getTicketList"/>
    </el-dialog>
    <el-dialog title="开票订单详情" :visible.sync="ifModify" width="650px" :close-on-click-modal="false">
      <Modify @ToggleDialogModify="toModifyOrderC" @FreshList="getTicketList" :orderId="ModifyOrderId"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Add from './Add.vue'
import Modify from './Modify.vue'
import {secondToFormat} from '../../util/utils'
export default {
  name: 'Order',
  data () {
    return {
      loading: false,
      ifAdd: false,
      ifModify: false,
      ModifyOrderId: '',
      currentPage: 1,
      sum: 0,
      ticketList: [],
      selectedTicket: [],
      goodsTypeList: []
    }
  },
  computed: {
    ...mapState({
      userId: state => state.userId
    })
  },
  created () {
    this.getGoodsType()
    this.getTicketList()
  },
  watch: {
  },
  components: {
    Add,
    Modify
  },
  methods: {
    ...mapActions([
      'changeShowDetail',
      'changeIfSJOrderSearch',
      'changeSearchOrderId',
      'changeSearchSjId'
    ]),
    // 查看轨迹
    trajectory () {
    },
    // 回单上传
    receiptUpload () {
    },
    // 开票订单修改
    edit (idx, row) {
      this.ModifyOrderId = row.id
      this.toModifyOrderC()
    },
    // 删除开票订单
    handleCancel (idx, row) {
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sureCancel(row.id)
      }).catch(() => {
      })
    },
    // 删除
    sureCancel (id) {
      this.send({
        name: '/zInvoiceOrderController/delInvoiceOrder?id=' + id,
        method: 'DELETE',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          this.$message({
            message: '开票订单删除成功！',
            type: 'success'
          })
          this.getTicketList()
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
    // 选择记录改变
    handleSelectionChange (selection) {
      let tempChoosed = []
      selection.map((Order, idx) => {
        tempChoosed.push(Order)
      })
      this.selectedTicket = tempChoosed
    },
    // 导出记录
    exportExcell () {
      if (this.selectedTicket.length === 0) {
        this.$message({
          message: '请至少选择一条需要导出的记录！',
          type: 'warning'
        })
        return false
      }
      require.ensure([], () => {
        const { exportJsonToExcel } = require('@/vendor/Export2Excel.js')
        const tHeader = ['订单号', '运费金额(¥)', '司机', '司机手机', '车辆牌照', '目的地', '发货地', '回单收件人', '回单地址', '跟踪状态', '运输单价(¥)', '运输趟数(趟)', '运输周期(天)', '在途时限(小时)', '预付油卡(¥)', '预付款(¥)', '运单押金(¥)', '起运时间', '运费增补(¥)', '运费扣减(¥)', '供应商', '装货时间', '货物名称', '货物数量(kg)', '备注']
        const filterVal = ['forder_no', 'ffee', 'fname', 'fmobile', 'fcarno', 'destination', 'origin', 'freceipt_people', 'freceipt_addr', 'gzStatus', 'ftransport_price', 'ftransport_count', 'fsettlement_cycle', 'ftransit_hour', 'foil_card', 'fpre_fee', 'freceipt_deposit', 'fstartDate', 'ffee_add', 'ffee_minus', 'fsupplier_name', 'floadingTime', 'goodsNameTxt', 'fgoods_number', 'fremarks']
        const data = this.formatJson(filterVal, this.selectedTicket)
        exportJsonToExcel(tHeader, data, '开票订单')
      })
    },
    // json格式化
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    toAddOrderC () {
      this.ifAdd = !this.ifAdd
    },
    // 修改弹窗状态切换
    toModifyOrderC () {
      this.ifModify = !this.ifModify
    },
    // 获取货物类型下拉
    getGoodsType () {
      this.send({
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
    // 根据货物id返回中文名称
    checkGoodsType (goodsTypeId) {
      let len = this.goodsTypeList.length
      for (let i = 0; i < len; i++) {
        if (this.goodsTypeList[i].id === goodsTypeId) {
          return this.goodsTypeList[i].name
        }
      }
    },
    // 获取开票订单列表
    getTicketList () {
      this.send({
        name: '/zInvoiceOrderController/invoiceList?fregisterId=' + this.userId + '&number=10&page_num=' + this.currentPage,
        method: 'GET',
        data: {
        }
      }).then(res => {
        if (res.data.code === 1) {
          let temp = res.data.driverList
          temp.map(item => {
            item.goodsNameTxt = this.checkGoodsType(item.fgoods_name)
            item.fstartDate = secondToFormat(item.fstart_date.time)
            item.floadingTime = secondToFormat(item.floading_time.time)
            item.gzStatus = (item.ftrack_status === '0' ? '申请' : (item.ftrack_status === '1' ? '未开始' : (item.ftrack_status === '2' ? '运输中' : '已终结')))
          })
          this.ticketList = temp
          this.sum = res.data.sum_number
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
    // 页码改变重新获取开票订单列表
    handleCurrentChange () {
      this.getTicketList()
    }
  }
}
</script>

<style lang="less" scoped>
.Order{
  background: #fff;
  margin: 20px 20px 50px 20px;
  padding: 20px;
  .expandBlock p{
    color: #99a9bf;
  }
}
</style>
